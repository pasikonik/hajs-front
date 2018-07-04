import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  ajax: service(),

  actions: {
    async generateRent() {
      await get(this, 'ajax').post('/rent', {
        data: {
          place: get(this, 'model'),
          month: get(this, 'month')
        }
      })
    }
  }
})
