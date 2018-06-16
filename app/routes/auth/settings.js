import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend({
  currentUser: service('current-user'),

  model() {
    return get(this, 'currentUser').load();
  }
});
