import Ember from 'ember';
import { generateData } from 'ember-dbmon/utils/dbmon-utils';
import Monitoring from  'ember-dbmon/utils/monitoring';

const { get, set } = Ember;

const monitoring = Monitoring();
let clear = null;

export default Ember.Controller.extend({
  model: null,
  playing: false,

  init() {
    this._super(...arguments);
    set(this, 'model', generateData());
  },

  loadSamples() {
    set(this, 'model', generateData(get(this, 'model.databaseArray')));
    monitoring.renderRate.ping();
    clear = Ember.run.later(this, 'loadSamples', 0);
    // clear = setTimeout(this.loadSamples, 0);
  },

  actions: {
    toggle() {
      if (get(this, 'playing')) {
        Ember.run.cancel(clear);
        // clearTimeout(clear);
        clear = null;
        set(this, 'playing', false);
      } else {
        this.loadSamples();
        // get(this, 'loadSamples')();
        set(this, 'playing', true);
      }
    }
  }
});
