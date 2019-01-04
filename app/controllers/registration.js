import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  router: service(),

  actions: {
    async register() {
      const newUser = get(this, 'model');
      const user = await newUser.save();
      const notifications = get(this, 'notifications');
      if (user) {
        notifications.success('Successfully registered');
        const credentials = {
          identification: newUser.email,
          password: newUser.password
        }
        get(this, 'session').authenticate('authenticator:jwt', credentials).then(() => {
          get(this, 'router').transitionTo('auth.places.index');
        });
      } else {
        notifications.error('Something went wrong, please try again');
      }
    }
  }
})
