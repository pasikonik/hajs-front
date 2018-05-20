import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import {
  get,
  getProperties
} from '@ember/object'

export default Controller.extend({
  session: service(),

  actions: {
    async authenticate() {
      const credentials = getProperties(this, 'identification', 'password');
      await get(this, 'session').authenticate('authenticator:jwt', credentials)
    }
  }
});
