import Route from '@ember/routing/route';

export default class Places extends Route {
  model() {
    return this.store.findAll('place');
  }
}
