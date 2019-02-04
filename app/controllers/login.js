import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, getProperties } from '@ember/object'

export default Controller.extend({
  session: service(),
  flashMessages: service(),

  actions: {
    async authenticate() {
      const credentials = getProperties(this, 'identification', 'password');
      try {
        await get(this, 'session').authenticate('authenticator:jwt', credentials)
        this.flashMessages.success('logged in');
      } catch (e) {
        const error = e.json.error.auth[0];
        this.flashMessages.danger(error);
      }
    }
  }
});
