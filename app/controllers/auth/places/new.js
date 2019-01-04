import Controller from '@ember/controller'
import { get } from '@ember/object';

export default Controller.extend({
  actions: {
    create() {
      get(this, 'model').save().then((place) => {
        this.transitionToRoute('auth.places.place', place.id);
      });
    }
  }
})
