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
  place: DS.belongsTo('place', { inverse: 'users' }),
  payments: DS.hasMany('payment'),

  isPayer: computed('place', function() {
    return get(this, 'email') === get(this, 'place.payer.email');
  }),
  isRenter: computed('place', function() {
    return !!this.place.id;
  }),
  bills: computed.filter('payments', function(payment) {
    return !!payment.bill.id;
  }),
  rents: computed.filter('payments', function(payment) {
    return !payment.bill.id;
  })
});
