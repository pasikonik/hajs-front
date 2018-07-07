import Controller from '@ember/controller'
import { get } from '@ember/object';

export default Controller.extend({
  actions: {
    async create() {
      const place = await get(this, 'model').save();
      if (place) {
        this.transitionToRoute('auth.places.place', place.id);
      }
    }
  }
})