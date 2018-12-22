/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';

    ENV['simply-ssh'] = {
      host: process.env.SSH_HOST,
      port: process.env.SSH_PORT,
      username: process.env.SSH_USER,
      privateKey: process.env.SSH_KEY
    }
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
