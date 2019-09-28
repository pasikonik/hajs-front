import Route from '@ember/routing/route'
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';

export default class Application extends Route.extend(ApplicationRouteMixin) {
  @service currentUser

  beforeModel() {
    return this._loadCurrentUser();
  }

  sessionAuthenticated() {
    super.sessionAuthenticated(...arguments);
    this._loadCurrentUser();
  }

  _loadCurrentUser() {
    this.currentUser.load();
  }
}
