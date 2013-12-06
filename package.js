Package.describe({
  summary: "Login service for AngelList accounts"
});

Package.on_use(function(api) {
  // angellist
  api.use('oauth1', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('random', 'client');
  api.use('underscore', 'server');
  api.use('service-configuration', ['client', 'server']);

  api.export('AngelList');

  api.add_files(
    ['angellist_configure.html', 'angellist_configure.js'],
    'client');

  api.add_files('angellist_server.js', 'server');
  api.add_files('angellist_client.js', 'client');


  api.use('underscore', ['server']);

  // acounts-angellist
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);

  api.use('http', ['client', 'server']);
  api.use('templating', 'client');

  api.add_files('angellist_login_button.css', 'client');
  api.add_files("accounts-angellist.js");

});
