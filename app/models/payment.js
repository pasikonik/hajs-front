import DS from 'ember-data';
import { get, set } from '@ember/object'
import { isPresent } from '@ember/utils'
import { inject as service } from '@ember/service';

export default DS.Model.extend({
  currentUser: service(),

  amount: DS.attr('number'),
  status: DS.attr('string'),
  createdAt: DS.attr('date'),

  user: DS.belongsTo('user'),
  bill: DS.belongsTo('bill'),
  place: DS.belongsTo('place'),

  changeStatus() {
    const doer = get(this, 'currentUser');
    if (doer.isPayer) {
      this._changeForPayer();
    } else {
      if (get(this, 'user.id') === doer.id) {
        this._changeForTenant();
      }
    }
    if (isPresent(this.changedAttributes().status)) {
      this.save();
    }
  },

  _changeForTenant() {
    if (this.status === 'wait') {
      set(this, 'status', 'sending')
    } else if (this.status === 'sending') {
      set(this, 'status', 'wait')
    }
  },
  _changeForPayer() {
    if (this.status === 'wait' || this.status === 'sending') {
      set(this, 'status', 'paid');
    } else if (this.status === 'paid') {
      set(this, 'status', 'wait')
    }
  }
});
