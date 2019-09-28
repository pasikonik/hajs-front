import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class Bill extends Model {
  @attr('string') name
  @attr('number') amount
  @attr('date') createdAt

  @belongsTo('place') place
  @hasMany('payment') payments
}
