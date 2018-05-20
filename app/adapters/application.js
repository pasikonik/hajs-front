import JSONAPIAdapter from 'ember-data/adapters/json-api';
import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import ENV from '../config/environment';

export default JSONAPIAdapter.extend({
  session: service(),

  host: ENV.apiUrl,
  namespace: 'api/v1',

  authorize(xhr) {
    const { access_token } = get(this, 'session.data.authneticated');
    xhr.setRequestHeader('Authorization',  `Bearer ${access_token}`);
  },

  pathForType(type) {
    return pluralize(underscore(type));
  }
})
