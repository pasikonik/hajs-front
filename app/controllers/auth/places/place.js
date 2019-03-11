import moment from 'moment';
import Controller from '@ember/controller';
import { on } from '@ember/object/evented';
import { computed, get, set, setProperties } from '@ember/object';
import { alias } from '@ember/object/computed';
import { EKMixin, keyDown } from 'ember-keyboard';
import { inject as service } from '@ember/service';

export default Controller.extend(EKMixin, {
  ajax: service(),
  currentUser: service(),
  flashMessages: service(),

  activateKeyboard: on('init', function() {
    set(this, 'keyboardActivated', true);
  }),
  previousMonthEvent: on(keyDown('ArrowLeft'), function() {
    this.send('previousMonth');
  }),
  nextMonthEvent: on(keyDown('ArrowRight'), function() {
    this.send('nextMonth');
  }),
  currentMonthEvent: on(keyDown('ArrowDown'), function() {
    this.send('currentMonth');
  }),

  place: alias('model'),
  momentMonth: computed('month', function() {
    const [month, year] = this.month.split(' ');
    return moment(`${year}-${month}-01`);
  }),
  isPayer: computed('place.payer', function() {
    return get(this, 'currentUser.email') === get(this, 'place.payer.email');
  }),
  readableMonth: computed('month', function() {
    return this.momentMonth.format('MMMM YYYY').capitalize();
  }),
  billsForMonth: computed('month', function() {
    return this.place.bills.filter((bill) => {
      return moment(bill.createdAt).format('MM YYYY') === this.month;
    });
  }),

  init() {
    this._super(...arguments);
    setProperties(this, {
      billModalOpen: false,
      newBill: this.store.createRecord('bill')
    });
  },

  actions: {
    async generateRent() {
      await this.ajax.post('/payments/create_rent', {
        data: {
          place_id: this.place.id,
          month: this.month
        }
      })
      this.flashMessages.success('generated successfully');
      this.place.reload();
    },
    openBillModal() {
      this.toggleProperty('billModalOpen');
    },
    createBill(bill) {
      set(bill, 'place', this.place);
      bill.save().then(() => {
        set(this, 'newBill', this.store.createRecord('bill'));
        set(this, 'billModalOpen', false);
        this.flashMessages.success('bill added successfully');
      });
    },
    changeStatus(payment) {
      payment.changeStatus();
    },
    previousMonth() {
      const previous = get(this, 'momentMonth').subtract('1', 'month');
      set(this, 'month', previous.format('MM YYYY'));
    },
    nextMonth() {
      const previous = get(this, 'momentMonth').add('1', 'month');
      set(this, 'month', previous.format('MM YYYY'));
    },
    currentMonth() {
      set(this, 'month', moment().format('MM YYYY'));
    }
  }
})
