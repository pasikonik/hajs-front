import Controller from '@ember/controller'
import { action } from '@ember/object';

export default class NewPlace extends Controller {
  @action
  create() {
    this.get('model').save().then((place) => {
      this.transitionToRoute('auth.places.place', place.id);
    });
  }
}
