import Controller from '@ember/controller';
import { get } from '@ember/object';

export default Controller.extend({
  actions: {
    revise() {
      const user = get(this, 'model');
      user.save().then(() => {
        this.notifications.success('updated successfully');
      });
    }
  }
})
