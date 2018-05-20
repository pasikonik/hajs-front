import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  rent: DS.attr('number'),
  users: DS.hasMany('user')
});
