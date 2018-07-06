import Controller from '@ember/controller';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Controller.extend({
  ajax: service(),

  momentMonth: computed('month', function() {
    const [month, year] = this.month.split(' ');
    return moment(`${year}-${month}-01`);
  }),

  actions: {
    async generateRent() {
      await get(this, 'ajax').post('/payments/create_rent', {
        data: {
          place_id: get(this, 'place.id'),
          month: get(this, 'month')
        }
      })
      get(this, 'notifications').success('generated successfully');
      this.place.reload();
    }
  }
})
