import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Controller.extend({
  currentUser: service(),

  actions: {
    async joinToPlace(place) {
      const user = get(this, 'currentUser.user');
      set(user, 'place', place);
      await user.save();
      this.transitionToRoute('auth.places.place', place);
    }
  }
})
