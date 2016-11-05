Package.describe({
  name: 'noland:lets-encrypt',
  version: '1.1.3',
  summary: 'Automatic issuing of Let\'s Encrypt free SSL certificates',
  git: 'https://github.com/nolandg/meteor-lets-encrypt',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2');
  api.use('ecmascript');
  api.mainModule('lets-encrypt.js', 'server');
});
