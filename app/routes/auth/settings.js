import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Settings extends Route {
  @service currentUser

  model() {
    return this.currentUser.load();
  }
}
