import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  flashMessages: service(),

  actions: {
    async register() {
      const newUser = get(this, 'model');
      const user = await newUser.save();
      if (user) {
        this.flashMessages.success('Successfully registered');
        const credentials = {
          identification: newUser.email,
          password: newUser.password
        }
        await get(this, 'session').authenticate('authenticator:jwt', credentials)
        this.transitionToRoute('auth.places.index');
      } else {
        this.flashMessages.error('Something went wrong, please try again');
      }
    }
  }
})
