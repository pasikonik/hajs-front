import RSVP from 'rsvp'
import JWT from 'ember-simple-auth-token/authenticators/jwt';
import Service from '@ember/service'
import { isEmpty } from '@ember/utils'
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Service.extend({
  session: service(),
  store: service(),

  id: alias('user.id'),
  email: alias('user.email'),
  username: alias('user.username'),
  placeId: alias('user.place.id'),
  isPayer: alias('user.payer'),
  isRenter: alias('user.isRenter'),
  debt: alias('user.debt'),

  async load() {
    const token = this.get('session.data.authenticated.token');

    if(!isEmpty(token)) {
      const userId = this._getUserIdFromToken(token);
      const user = await this.store.findRecord('user', userId);
      this.set('user', user)
      return user;
    } else {
      return RSVP.resolve();
    }
  },

  _getUserIdFromToken(token) {
    const jwt = JWT.create();
    const tokenData = jwt.getTokenData(token);
    return tokenData['user_id'];
  }
})
