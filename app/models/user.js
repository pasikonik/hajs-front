import DS from 'ember-data';
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
  place: DS.belongsTo('place')
});
