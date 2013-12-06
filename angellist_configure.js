Template.configureLoginServiceDialogForAngelList.siteUrl = function () {
  // AngelList doesn't recognize localhost as a domain name
  return Meteor.absoluteUrl({replaceLocalhost: true});
};

Template.configureLoginServiceDialogForAngelList.fields = function () {
  return [
    {property: 'consumerKey', label: 'Consumer key'}, //This is the AngelList Client ID
    {property: 'secret', label: 'Consumer secret'}, //This is the AngelList Client Secret
    {property: 'name', label: 'Application Name'},
    {property: 'scope', label: 'Scope (or leave blank)'},
    {property: 'expiration', label: 'Expiration (or leave blank)'}
  ];
};