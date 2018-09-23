import DS from 'ember-data';
import { get, computed } from '@ember/object'
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  rent: validator('presence', true)
})

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  rent: DS.attr('number'),
  users: DS.hasMany('user', { inverse: 'place' }),
  payer: DS.belongsTo('user'),

  people: computed('users.[]', function() {
    return get(this, 'users').length;
  })
});
