var console = console || {
    log  :function () {},
    warn :function () {},
    error:function () {}
};
var app = new ( Backbone.View.extend( {

    // TODO: Implement a Router
    // TODO: Implement a GUI that allows adding and deleting items
    // TODO: Break up GUI items into reasonable blocks
    // TODO: Implement authentication in Firebase
    // TODO: Integrate with Bootstrap front end, focusing on Mobile First
    // TODO: Enable multiple shopping sessions, storing a shopping list

    models:{
        todoList :{},
        loginAuth:{}
    },

    views:{
        todoListView:{},
        loginForm   :{}
    },

    events:{
    },

    firebase:new Firebase( "https://xq9zmp23.firebaseio.com/" ),

    run   :function () {
        this.models.loginAuth = new LoginAuth( {
            firebase:this.firebase
        } );
        this.listenTo( this.models.loginAuth, 'AuthUserIsLoggedOut', this.login );
        this.listenTo( this.models.loginAuth, 'AuthUserIsLoggedIn', this.start );
        this.models.loginAuth.authResult()
    },
    login :function () {
        if ( !window.localStorage.username ) {
            this.views.loginForm = new LoginView( {model:this.models.loginAuth} );
            this.views.loginForm.setElement( $( '#main-display' ) ).render();
        } else {
            app.models.loginAuth.authenticate( window.localStorage.username, window.localStorage.password );
        }
    },
    logout:function () {
        this.models.loginAuth.auth.logout();
    },

    start:function () {

        this.stopListening( this.models.loginAuth );
        this.models.todoList = new TodoList( null, {firebase:this.firebase,
            name                                            :'Shopping List'} );
        this.views.todoListView = new TodoListView( {
            collection:this.models.todoList,
            el        :$( '#main-display' )
        } );
    }

} ) )( {el:$( '#main' )} );