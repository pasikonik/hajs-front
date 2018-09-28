import Controller from '@ember/controller'
import { get } from '@ember/object';

export default Controller.extend({
  actions: {
    create() {
      const place = get(this, 'model').save().then(() => {
        this.transitionToRoute('auth.places.place', place.id);
      });
    }
  }
})
