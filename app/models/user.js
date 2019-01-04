import DS from 'ember-data';
import { computed, get } from '@ember/object';
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

  isRenter: computed('place', function() {
    return !!get(this.place, 'id');
  }),
  bills: computed.filter('payments', function(payment) {
    return !!get(payment.bill, 'id');
  }),
  rents: computed.filter('payments', function(payment) {
    return !get(payment.bill, 'id');
  })
});
