import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dbmon-database', 'Integration | Component | dbmon database', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dbmon-database}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dbmon-database}}
      template block text
    {{/dbmon-database}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
