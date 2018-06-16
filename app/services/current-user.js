import RSVP from 'rsvp'
import Service from '@ember/service'
import { isEmpty } from '@ember/utils'
import { get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import JWT from 'ember-simple-auth-token/authenticators/jwt';

export default Service.extend({
  session: service(),
  store: service(),

  email: alias('user.email'),
  username: alias('user.username'),

  async load() {
    const token = get(this, 'session.data.authenticated.token');

    if(!isEmpty(token)) {
      const userId = this._getUserIdFromToken(token);
      const user = await get(this, 'store').findRecord('user', userId);
      set(this, 'user', user)
      return user;
    } else {
      return RSVP.resolve();
    }
  },

  _getUserIdFromToken(token) {
    const jwt = new JWT();
    const tokenData = jwt.getTokenData(token);
    return tokenData['user_id'];
  }
})
