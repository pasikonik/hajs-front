import DS from 'ember-data';
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

export default DS.Model.extend(Validations, {
  email: DS.attr('string'),
  username: DS.attr('string'),
  password: DS.attr('string'),
  ban: DS.attr('string'),
  maxPay: DS.attr('number'),
  payer: DS.attr('boolean'),

  place: DS.belongsTo('place'),
  payments: DS.hasMany('payment'),

  outstandingPayments: filterBy('payments', 'status', 'wait'),
  debt: computed('outstandingPayments.[]', function() {
    const debts = get(this, 'outstandingPayments');
    const values = debts.map(payment => get(payment, 'amount'));
    return values.reduce((a, b) => a + b, 0);
  }),
  isRenter: computed('place', function() {
    return !!get(this.place, 'id');
  }),
  bills: filter('payments', function(payment) {
    return !!get(payment.bill, 'id');
  }),
  rents: filter('payments', function(payment) {
    return !get(payment.bill, 'id');
  })
});
