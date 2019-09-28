import Route from '@ember/routing/route';

export default class NewPlace extends Route {
  model() {
    return this.store.createRecord('place');
  }
}
