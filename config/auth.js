"use strict"

module.exports = {
    'facebookAuth' : {
        'clientID'      : '345818696295661', // your App ID
        'clientSecret'  : '175cef3846239e79538a013017ac920c', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },
}