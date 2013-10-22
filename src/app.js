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

    login :function () {
        this.models.loginAuth = new LoginAuth( {
            firebase:this.firebase
        } );
        if ( !window.localStorage.username) {
        this.views.loginForm = new LoginView( {model:this.models.loginAuth} );
        this.views.loginForm.setElement( $( '#main-display' ) ).render();
        } else {
            app.models.loginAuth.authenticate( window.localStorage.username, window.localStorage.password );
        }
        this.listenTo( this.models.loginAuth, 'AuthUserIsLoggedIn', this.start );
    },
    logout:function () {
        this.models.loginAuth.auth.logout();
//        this.login();
    },
    start :function () {
        this.models.todoList = new TodoList( null, {firebase:this.firebase,
                name                                        :'Shop'} );
        this.views.todoListView = new TodoListView( {
            collection:this.models.todoList,
            el        :$( '#main-display' )
        } );
    }

} ) )( {el:$( '#main' )} );