import Controller from '@ember/controller';
import { computed, set } from '@ember/object';
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
      await this.ajax.post('/payments/create_rent', {
        data: {
          place_id: this.place.id,
          month: this.month
        }
      })
      this.notifications.success('generated successfully');
      this.place.reload();
    },
    changeStatus(rent) {
      set(rent, 'status', )
    }
  }
})
