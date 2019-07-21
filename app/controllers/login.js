import Controller from '@ember/controller';
import { action } from '@ember/object'
import { inject as service } from '@ember/service';

export default class Login extends Controller {
  @service session
  @service flashMessages

  @action
  async authenticate() {
    const credentials = this.getProperties('identification', 'password');
    try {
      await this.session.authenticate('authenticator:jwt', credentials);
      this.transitionToRoute('auth');
    } catch ({ json: { error: { auth } } }) {
      this.flashMessages.danger(auth[0]);
    }
  }
}
