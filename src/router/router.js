/*jslint browser: true*/
/*global $, jQuery, Backbone, Underscore, Handlebars, ShoppingItem */

var LoginAuth;
LoginAuth = Backbone.Model.extend( {

	creds: {},
	auth: {},

	initialize:function ( options ) {
		'use strict';
		this.on( 'all', function () {
			console.log( 'EVENT: loginAuth. Arguments: ', arguments );
		} );

		this.auth = new FirebaseSimpleLogin( options.firebase, _.bind( this.authResult, this ) );
	},

	authenticate:function ( username, password ) {
		console.log( 'loginAuth authenticating with firebase. Credentials: ', username, password );

		var emailRegExp = new RegExp( "@", "gi" );

		if ( !emailRegExp.test( username ) ) {
			username += '@gmail.com';
		}

		this.creds = this.auth.login( 'password', {
			email     :username,
			password  :password,
			rememberMe:false
		} );
	},

	authResult:function ( error, user ) {
		if (!error && user) {
			console.log('User ', user, ' is logged in!');
			this.trigger('AuthUserIsLoggedIn');
		} else {
			if (user) {
				console.log('Login Error');
			} else {
				this.trigger('AuthUserIsLoggedOut');
				console.log('Please log in');
			}
		}
	}

} );