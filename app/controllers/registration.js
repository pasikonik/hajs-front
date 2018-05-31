import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    async register() {
      const newUser = get(this, 'model');
      const user = await newUser.save();
      if (user) {
        get(this, 'notifications').success('successfully registered');
        const credentials = {
          identification: newUser.email,
          password: newUser.password
        }
        get(this, 'session').authenticate('authenticator:jwt', credentials)
      }
    }
  }
})
