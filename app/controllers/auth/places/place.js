import moment from 'moment';
import Controller from '@ember/controller';
import NavigationMixin from '../../../mixins/navigation';
import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class Place extends Controller.extend(NavigationMixin) {
  @service ajax
  @service store
  @service currentUser
  @service flashMessages

  constructor() {
    super(...arguments);
    this.setProperties({
      billModalOpen: false,
      newBill: this.store.createRecord('bill')
    });
  }

  @alias('model')
  place

  @computed('month')
  get momentMonth() {
    const [month, year] = this.month.split(' ');
    return moment(`${year}-${month}-01`);
  }

  @computed('place.payer')
  get isPayer() {
    return this.get('currentUser.email') === this.get('place.payer.email');
  }

  @computed('month')
  get readableMonth() {
    return this.momentMonth.format('MMMM YYYY').capitalize();
  }

  @computed('place.bills.[]', 'month')
  get billsForMonth() {
    return this.place.bills.filter((bill) => {
      return moment(bill.createdAt).format('MM YYYY') === this.month;
    });
  }

  @action
  async generateRent() {
    const rents = await this.ajax.post('/payments/create_rent', {
      data: {
        place_id: this.place.id,
        month: this.month
      }
    });
    this.store.pushPayload(rents);
    this.flashMessages.success('generated successfully');
  }

  @action
  openBillModal() {
    this.toggleProperty('billModalOpen');
  }

  @action
  async createBill(bill) {
    bill.set('place', this.place);
    await bill.save();
    this.set('newBill', this.store.createRecord('bill'));
    this.set('billModalOpen', false);
    this.flashMessages.success('bill added successfully');
  }

  @action
  changeStatus(payment) {
    payment.changeStatus();
  }

  @action
  previousMonth() {
    const previous = this.get('momentMonth').subtract('1', 'month');
    this.set('month', previous.format('MM YYYY'));
  }

  @action
  nextMonth() {
    const previous = this.get('momentMonth').add('1', 'month');
    this.set('month', previous.format('MM YYYY'));
  }

  @action
  currentMonth() {
    this.set('month', moment().format('MM YYYY'));
  }
}
