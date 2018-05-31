import RSVP from 'rsvp'
import Service from '@ember/service'
import { isEmpty } from '@ember/utils'
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Service.extend({
  session: service(),
  store: service(),

  async load() {
    const userId = get(this, 'session.data.authenticated.user_id');
    debugger;
    if(!isEmpty(userId)) {
      const user = await get(this, 'session').findRecord('user', userId);
      set(this, 'user', user)
      return user;
    } else {
      return RSVP.resolve();
    }
  }
})
