var querystring = Npm.require('querystring');

AngelList = {};

var urls = {
  requestToken: "https://trello.com/1/OAuthGetRequestToken", // TODO
  accessToken: "https://trello.com/1/OAuthGetAccessToken", // TODO

  authenticate: function(oauthBinding){
    var params = {}

    // allow for reading from config
    if(oauthBinding._config){
      if (oauthBinding._config.name)
        params['name'] = oauthBinding._config.name;
      if (oauthBinding._config.scope)
        params['scope'] = oauthBinding._config.scope;
      if (oauthBinding._config.expiration)
        params['expiration'] = oauthBinding._config.expiration;
    }

    params['oauth_token'] = oauthBinding.requestToken;

    return "https://trello.com/1/OAuthAuthorizeToken?" + querystring.stringify(params); // TODO
  }
};

// https://api.trello.com/1/members/me
AngelList.otherUsersWhitelistedFields = [ //TODO
  "id",
  "avatarHash",
  "bio",
  "fullName",
  "initials",
  "memberType",
  "status",
  "url",
  "username",
  "avatarSource",
  "gravatarHash",
  "idOrganizations",
  "prefs",
  "trophies",
  "uploadedAvatarHash"
];

// all of them
AngelList.loggedInUserWhitelistedFields = [  // TODO
  "id",
  "avatarHash",
  "bio",
  "confirmed",
  "fullName",
  "idPremOrgsAdmin",
  "initials",
  "memberType",
  "status",
  "url",
  "username",
  "avatarSource",
  "email",
  "gravatarHash",
  "idBoards",
  "idBoardsInvited",
  "idBoardsPinned",
  "idOrganizations",
  "idOrganizationsInvited",
  "loginTypes",
  "newEmail",
  "oneTimeMessagesDismissed",
  "prefs",
  "trophies",
  "uploadedAvatarHash"
];

Oauth.registerService('angellist', 1, urls, function(oauthBinding) {
  var identity = oauthBinding.get('https://api.trello.com/1/members/me').data; // TODO

  var serviceData = {
    id: identity.id,
    screenName: identity.fullName,
    accessToken: oauthBinding.accessToken,
    accessTokenSecret: oauthBinding.accessTokenSecret
  };

  // include helpful fields from angellist
  var fields = _.pick(identity, AngelList.loggedInUserWhitelistedFields);
  _.extend(serviceData, fields);

  return {
    serviceData: serviceData,
    options: {
      profile: {
        name: identity.fullName
      }
    }
  };
});


AngelList.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};
