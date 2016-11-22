import Ember from 'ember';
import { formatElapsed, elapsedClass, getCountClassName } from 'ember-dbmon/utils/dbmon-utils';

const { get } = Ember;

export default Ember.Component.extend({
  db: null,

  tagName: 'tr',

  queries: Ember.computed('db.samples', function() {
    let samples = get(this, 'db.samples');
    return samples[samples.length - 1].queries;
  }),

  topFiveQueries: Ember.computed('queries', function() {
    let queries = get(this, 'queries');
    let topFiveQueries = queries.slice(0, 5);

    while (topFiveQueries.length < 5) {
      topFiveQueries.push({ query: "" });
    }

    return topFiveQueries.map((query, index) => {
      return {
        key: index+'',
        query: query.query,
        elapsed: query.elapsed ? formatElapsed(query.elapsed) : '',
        className: elapsedClass(query.elapsed)
      };
    });
  }),

  countClassName: Ember.computed('queries', function() {
    let queries = get(this, 'queries');
    return getCountClassName(queries);
  })
});
