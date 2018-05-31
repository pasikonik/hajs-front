import DS from 'ember-data';
import { get, computed } from '@ember/object'

export default DS.Model.extend({
  name: DS.attr('string'),
  rent: DS.attr('number'),
  users: DS.hasMany('user'),

  people: computed('users.[]', function() {
    return get(this, 'users').length;
  })
});
