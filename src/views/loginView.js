/*jslint browser: true*/
/*global $, jQuery, Backbone, Handlebars, console */
var LoginView;

LoginView = Backbone.View.extend( {

	template:Handlebars.compile( $( '#login-form-template' ).html() ),

	events:{
		'submit':'authenticate'
	},

	authenticate:function (event) {
		console.log( 'Authenticating with Firebase Server' );
		this.model.authenticate( $('#login-form-get-username' ).val(), $('#login-form-get-password' ).val());
        window.localStorage.username = $('#login-form-get-username' ).val();
        window.localStorage.password = $('#login-form-get-password' ).val()
		event.preventDefault();
	},

	initialize:function ( options ) {
		console.log( 'loginView Initialize. Options Passed:', options );
		this.listenTo(this.model, 'AuthUserIsLoggedIn', this.clear);
		this.listenTo(this.model, 'AuthUserIsLoggedOut', this.render);
	},

	render:function () {
		this.$el.html( this.template() );
		return this;
	},

	clear: function() {
		this.$el.empty();
	}

} );