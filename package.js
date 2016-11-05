Package.describe({
  name: 'noland:lets-encrypt',
  version: '1.1.0',
  summary: 'Automatic issuing of Let\'s Encrypt free SSL certificates',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2');
  api.use('ecmascript');
  api.mainModule('lets-encrypt.js', 'server');
});
