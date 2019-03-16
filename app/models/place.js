import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import { filterBy } from '@ember/object/computed';

const Validations = buildValidations({
  name: validator('presence', true),
  rent: validator('presence', true)
})

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  rent: DS.attr('number'),

  users: DS.hasMany('user'),
  bills: DS.hasMany('bill'),
  payments: DS.hasMany('payment'),

  dwellers: filterBy('users', 'payer', false)
});
