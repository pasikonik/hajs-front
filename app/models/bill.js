import DS from 'ember-data';
const { attr, belongsTo, hasMany } = DS;

export default class Bill extends DS.Model {
  @attr('string') name
  @attr('number') amount
  @attr('date') createdAt

  @belongsTo('place') place
  @hasMany('payment') payments
}
