import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class Application extends Controller {
  @service session
  @service currentUser

  @action
  logout() {
    this.session.invalidate();
  }
}
