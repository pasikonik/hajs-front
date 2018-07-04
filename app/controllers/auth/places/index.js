import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Controller.extend({
  currentUser: service(),

  actions: {
    show(place) {
      this.transitionToRoute('auth.places.place', place);
    },

    joinToPlace(place) {
      const user = get(this, 'currentUser.user');
      set(user, 'place', place);
      user.save();
    }
  }
})
