import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Settings extends Controller {
  @service flashMessages

  @action
  async revise() {
    const user = this.get('model');
    await user.save();
    this.flashMessages.success('updated successfully');
  }
}
