import SessionService from 'ember-simple-auth/services/session';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed'
import {
  computed,
  get
} from '@ember/object'

export default SessionService.extend({
  store: service(),

  userEmail: alias('data.authenticated.email'),

  currentUser: computed('data.authenticated', function() {
    const users =  get(this, 'store').peekAll('user');
    return users.find((user) => {
      return get(user, 'email') === get(this, 'userEmail');
    });
  })
});
