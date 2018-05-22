import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import {
  get,
  set,
  getProperties
} from '@ember/object'

export default Controller.extend({
  session: service(),

  errorMessage: '',

  actions: {
    async authenticate() {
      const credentials = getProperties(this, 'identification', 'password');
      try {
        await get(this, 'session').authenticate('authenticator:jwt', credentials)
      } catch (e) {
        set(this, 'errorMessage', e.error.auth);
      }

    }
  }
});
