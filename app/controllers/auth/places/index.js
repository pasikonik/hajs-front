import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class Places extends Controller {
  @service currentUser

  @action
  async joinToPlace(place) {
    const user = this.get('currentUser.user');
    user.set('place', place);
    await user.save();
    this.transitionToRoute('auth.places.place', place);
  }
}
