import Controller from '@ember/controller';
import NavigationMixin from '../../../mixins/navigation';
import moment from 'moment';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

import { inject as service } from '@ember/service';

export default Controller.extend(NavigationMixin, {
  ajax: service(),
  currentUser: service(),
  flashMessages: service(),

  place: alias('model'),
  momentMonth: computed('month', function() {
    const [month, year] = this.month.split(' ');
    return moment(`${year}-${month}-01`);
  }),
  isPayer: computed('place.payer', function() {
    return this.get('currentUser.email') === this.get('place.payer.email');
  }),
  readableMonth: computed('month', function() {
    return this.momentMonth.format('MMMM YYYY').capitalize();
  }),
  billsForMonth: computed('place.bills.[]', 'month', function() {
    return this.place.bills.filter((bill) => {
      return moment(bill.createdAt).format('MM YYYY') === this.month;
    });
  }),

  init() {
    this._super(...arguments);
    this.setProperties({
      billModalOpen: false,
      newBill: this.store.createRecord('bill')
    });
  },

  actions: {
    async generateRent() {
      const rents = await this.ajax.post('/payments/create_rent', {
        data: {
          place_id: this.place.id,
          month: this.month
        }
      });
      this.store.pushPayload(rents);
      this.flashMessages.success('generated successfully');
    },
    openBillModal() {
      this.toggleProperty('billModalOpen');
    },
    createBill(bill) {
      bill.set('place', this.place);
      bill.save().then(() => {
        this.set('newBill', this.store.createRecord('bill'));
        this.set('billModalOpen', false);
        this.flashMessages.success('bill added successfully');
      });
    },
    changeStatus(payment) {
      payment.changeStatus();
    },
    previousMonth() {
      const previous = this.get('momentMonth').subtract('1', 'month');
      this.set('month', previous.format('MM YYYY'));
    },
    nextMonth() {
      const previous = this.get('momentMonth').add('1', 'month');
      this.set('month', previous.format('MM YYYY'));
    },
    currentMonth() {
      this.set('month', moment().format('MM YYYY'));
    }
  }
})
