import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('registration');
  this.route('auth', { path: '' }, function() {
    this.route('settings');
    this.route('places', function() {
      this.route('place', { path: ':place_id' });
    });
  })
});

export default Router;
