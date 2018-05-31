import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    show(place) {
      this.transitionToRoute('auth.places.place', place);
    }
  }
})
