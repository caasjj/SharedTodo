/*jslint browser: true*/
/*global $, jQuery, Backbone, Handlebars, console */
var TodoListView;

TodoListView = Backbone.View.extend( {

    className:'row',

    template:Handlebars.compile( $( '#todo-list-template' ).html() ),

    events:{
        'click #nav-delete-items':'deleteDoneItems',
        'keypress #nav-new-item' :'createNewItem'
    },

    initialize     :function ( options ) {
        console.log( 'todoListView Initialize. Options Passed: ', options );
        this.$el.html( this.template( this.collection ) );
        this.listenTo( this.collection, 'add', this.addOne );
        this.listenTo( this.collection, 'reset', this.render );
    },
    render         :function () {
        this.addAll();
        return this;
    },
    addOne         :function ( todoItem ) {
        var view = new TodoView( { model:todoItem} );
        this.$( '#todo-list' ).append( view.render().el );
    },
    addAll         :function () {
        this.$( '#todo-list' ).empty();
        this.collection.forEach( this.addOne, this );
    },
    deleteDoneItems:function () {
        this.collection.deleteCompleted();
    },
    createNewItem  :function ( event ) {
        if ( event.keyCode === 13 ) {
            this.collection.createNewItem( this.$el.find( '#nav-new-item' ).val() );
            this.$el.find( '#nav-new-item' ).val( '' );
        }
    }

} );