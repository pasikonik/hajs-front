import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default class Registration extends Route.extend(UnauthenticatedRouteMixin) {
  model() {
    return this.store.createRecord('user');
  }
}
