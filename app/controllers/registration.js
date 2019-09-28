import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object'

export default class Registration extends Controller {
  @service session
  @service flashMessages

  @action
  async register() {
    const newUser = this.model;
    const user = await newUser.save();
    if (user) {
      this.flashMessages.success('Successfully registered');
      const credentials = {
        identification: newUser.email,
        password: newUser.password
      }
      await this.sessin.authenticate('authenticator:jwt', credentials)
      this.transitionToRoute('auth.places.index');
    } else {
      this.flashMessages.error('Something went wrong, please try again');
    }
  }
}
