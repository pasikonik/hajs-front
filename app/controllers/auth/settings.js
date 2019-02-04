import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  flashMessages: service(),

  actions: {
    revise() {
      const user = get(this, 'model');
      user.save().then(() => {
        this.flashMessages.success('updated successfully');
      });
    }
  }
})
