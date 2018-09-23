import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import moment from 'moment';

export default Controller.extend({
  ajax: service(),
  currentUser: service(),

  place: alias('model'),
  momentMonth: computed('month', function() {
    const [month, year] = this.month.split(' ');
    return moment(`${year}-${month}-01`);
  }),
  isPayer: computed('place.payer', function() {
    return get(this, 'currentUser.email') === get(this, 'place.payer.email');
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
    changeStatus(payment) {
      payment.changeStatus(this.currentUser);
      this.toggleProperty('changed');
    },
  }
})
