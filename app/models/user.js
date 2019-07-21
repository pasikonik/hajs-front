import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed, get } from '@ember/object';
import { filter, filterBy } from '@ember/object/computed'
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  username: validator('presence', true),
  password: [
    validator('presence', true),
    validator('length', { min: 4 })
  ],
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ]
});

export default class User extends Model.extend(Validations) {
  @attr('string') email
  @attr('string') username
  @attr('string') password
  @attr('string') ban
  @attr('number') maxPay
  @attr('boolean') payer

  @belongsTo('place') place
  @hasMany('payment') payments

  @filterBy('payments', 'status', 'wait')
  outstandingPayments

  @computed('outstandingPayments.[]')
  get debt() {
    const debts = get(this, 'outstandingPayments');
    const values = debts.map(payment => get(payment, 'amount'));
    return values.reduce((a, b) => a + b, 0);
  }

  @computed('place')
  get isRenter() {
    return !!get(this.place, 'id');
  }

  @filter('payments', payment => !!get(payment.bill, 'id'))
  bills

  @filter('payments', payment => !get(payment.bill, 'id'))
  rents
}
