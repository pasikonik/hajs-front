import Route from '@ember/routing/route'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),

  model() {
    return this.get('currentUser').load().then((user) => {
      return user.get('user.place.dwellers');
    });
  },

  setupController(controller, model) {
    controller.set('dwellers', model);
  }
});
