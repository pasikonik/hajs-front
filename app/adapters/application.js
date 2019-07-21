import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';
import { inject as service } from '@ember/service';
import ENV from '../config/environment';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  session: service(),

  namespace: 'api/v1',
  host: ENV.apiUrl,

  authorize(xhr) {
    let { token } = this.get('session.data.authenticated');
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  },

  pathForType(type) {
    return pluralize(underscore(type));
  }
})
