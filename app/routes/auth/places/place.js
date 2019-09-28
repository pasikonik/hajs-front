import Route from '@ember/routing/route'
import moment from 'moment';

export default class Place extends Route {
  model(params) {
    return this.store.findRecord('place', params.place_id)
  }

  setupController(controller, model) {
    controller.set('place', model);
    controller.set('month', moment().format('MM YYYY'));
  }
}
