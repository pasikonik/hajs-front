import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { get } from '@ember/object'

export default Route.extend(UnauthenticatedRouteMixin, {
  model() {
    return get(this, 'store').createRecord('user');
  }
});
