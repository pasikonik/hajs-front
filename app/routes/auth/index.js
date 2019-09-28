import Route from '@ember/routing/route'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default class Places extends Route.extend(AuthenticatedRouteMixin) {
  @service currentUser

  model() {
    return this.get('currentUser').load().then((user) => {
      return this.store.findRecord('place', user.get('place.id'));
    });
  }

  setupController(controller, model) {
    controller.set('dwellers', model.get('dwellers'));
  }
}
