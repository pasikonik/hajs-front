import Controller from '@ember/controller';
import { getProperties, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    async register() {
      const {
        email,
        username,
        password
      } = getProperties(this, 'email', 'username', 'password');
      const newUser = this.store.createRecord('user', {
        email,
        username,
        password
      });

      const user = await newUser.save();
      if (user) {
        await get(this, 'session').authenticate('authenticator:jwt', email, password)
      }
    }
  }
})
