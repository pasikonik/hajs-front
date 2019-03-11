import EmberObject from '@ember/object';
import NavigationMixin from 'hajs-front/mixins/navigation';
import { module, test } from 'qunit';

module('Unit | Mixin | navigation', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let NavigationObject = EmberObject.extend(NavigationMixin);
    let subject = NavigationObject.create();
    assert.ok(subject);
  });
});
