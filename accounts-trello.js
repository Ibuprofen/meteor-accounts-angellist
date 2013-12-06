Accounts.oauth.registerService('angellist');

if (Meteor.isClient) {
  Meteor.loginWithAngelList = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    AngelList.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  var forLoggedInUserAutopublishedFields = _.map(
    AngelList.loggedInUserWhitelistedFields.concat(['id', 'fullName']),
    function (subfield) { 
      return 'services.angellist.' + subfield;
    }
  );

  var forOtherUsersAutopublishedFields = _.map(
    AngelList.otherUsersWhitelistedFields.concat(['id', 'fullName']),
    function (subfield) { 
      return 'services.angellist.' + subfield;
    }
  );

  Accounts.addAutopublishFields({
    forLoggedInUser: forLoggedInUserAutopublishedFields,
    forOtherUsers: forOtherUsersAutopublishedFields
  });
}



