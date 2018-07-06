import DS from 'ember-data';

export default DS.Model.extend({
  amount: DS.attr('number'),
  status: DS.attr('string'),
  createdAt: DS.attr('date'),
  user: DS.belongsTo('user'),
  bill: DS.belongsTo('bill')
});
