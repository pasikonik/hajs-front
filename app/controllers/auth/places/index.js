import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Controller.extend({
  currentUser: service(),

  actions: {
    async joinToPlace(place) {
      const user0 = get(this, 'currentUser.user');

      const user = await this.store.findRecord('user', get(user0, 'id'));

      set(user, 'place', place);
      await user.save();
      this.transitionToRoute('auth.places.place', place);
    }
  }
})
