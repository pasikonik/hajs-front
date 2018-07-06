import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';

export default AjaxService.extend({
  session: service(),

  host: ENV.apiUrl,
  namespace: '/api/v1',

  headers: computed('session.authToken', {
    get() {
      let { token } = get(this, 'session.data.authenticated');
      let headers = {};
      headers['Authorization'] = `Bearer ${token}`;
      return headers;
    }
  })
});
