import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  amount: DS.attr('number'),
  createdAt: DS.attr('date'),

  place: DS.belongsTo('place'),
  payments: DS.hasMany('payment')
});
