import Route from '@ember/routing/route'
import { get, set } from '@ember/object';
import moment from 'moment';

export default Route.extend({
  model(params) {
    return this.store.findRecord('place', params.place_id, { include: ['users', 'payments'] })
  },

  setupController(controller, model) {
    set(controller, 'place', model);
    set(controller, 'month', moment().format('MM YYYY'));
  }
})
