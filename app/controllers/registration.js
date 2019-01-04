import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    async register() {
      const newUser = get(this, 'model');
      const notifications = get(this, 'notifications');
      const user = await newUser.save();
      if (user) {
        notifications.success('Successfully registered');
        const credentials = {
          identification: newUser.email,
          password: newUser.password
        }
        await get(this, 'session').authenticate('authenticator:jwt', credentials)
        this.transitionToRoute('auth.places.index');
      } else {
        notifications.error('Something went wrong, please try again');
      }
    }
  }
})
