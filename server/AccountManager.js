'use strict';

var auth = require('./Authentication.js');
var dbManager = require('./DBManager.js');
let dbLevelManager = require('./DBLevelManager.js');

module.exports.createUser = function(username, password, callback){

    auth.isUsernameTaken(username, function(taken){
        let accountStatus = {
            accountCreated : false,
            usernameStatus: "",
        };
        if(taken){
            console.log("Username taken");
            accountStatus.usernameStatus = "Username taken";
            return callback(accountStatus);
        }
        else{
            let encrypted = auth.encryptPassword(password);
            let userAccount = {
                userName: username,
                salt: encrypted.salt,
                hash: encrypted.passwordHash,
                levels:  [

				{
					"level" :  1,
					"length" : 0,
					"background": 0,
					"data " : "",
					"diffuculty" : 0,

				},
			    {
					"level" :  2,
					"length" : 0,
					"background": 0,
					"data " : "",
					"diffuculty" : 0,


				},
				{
					"level" :  3,
					"length" : 0,
					"background": 0,
					"data " : "",
					"diffuculty" : 0,


				},
				{
					"level" :  4,
					"length" : 0,
					"background": 0,
					"data " : "",
					"diffuculty" : 0,


				},
				{
					"level" :  5,
					"length" : 0,
					"background": 0,
					"data " : "",
					"diffuculty" : 0,


				},
				{
					"level" :  6,
					"length" : 0,
					"background": 0,
					"data " : "",
					"diffuculty" : 0,


				},
				{
					"level" :  7,
					"length" : 0,
					"background": 0,
					"data " : "",
					"diffuculty" : 0,


				},
				{
					"level" :  8,
					"length" : 0,
					"background": 0,
					"data " : "",
					"diffuculty" : 0,


				},
				{
					"level" :  9,
					"length" : 0,
					"background": 0,
					"data " : "",
					"diffuculty" : 0,


				},


				{
					"level" :  10,
					"length" : 0,
					"background": 0,
					"data " : "",
					"diffuculty" : 0,


				}



				]


                };
            dbManager.insertUser(userAccount);
            accountStatus.userName= username;
            accountStatus.accountCreated = true;
            accountStatus.usernameStatus = "Username available and used";
            return callback(accountStatus);
        }
    });
}

module.exports.signIn = function(username, password, callback){
    auth.authenticateUser(username, password, function(authenticated){
        let status = {
            userName:username,
            signedIn : false,
            token : "",

        }
        if(authenticated){

           status.token = auth.generateToken();
           dbManager.insertToken(username, status.token);

           status.signedIn = true;

           return callback(status);
        }
        return callback(status);
      });
}

module.exports.signOut = function(username, token, callback){
    auth.authenticateWithToken(username, token, function(status){
        if(status){
            dbManager.removeToken(username);
            return callback(status);
        }
        return callback(status);
    });

}

module.exports.saveLevel = function(username, token,level, callback){
    auth.authenticateWithToken(username, token, function(status){
        if(status){



			dbLevelManager.insertLevel(username,level);



            return callback(status);
        }
        return callback(status);
    });

}
