/*jslint browser: true*/
/*global TodoItem, console */
var TodoList;

TodoList = Backbone.Firebase.Collection.extend( {

    model     :TodoItem,

    initialize:function ( attr, options ) {
        'use strict';
        this.on( 'all', function () {
            console.log( 'EVENT: todoList. Arguments: ', arguments );
        } );

        this.firebase = options.firebase;
        this.name = options.name ;
        this.count = 0;
    },

    completed: function() {
       return this.models.filter( function(item) {
            return !!item.get('done');
        });
    },
    unCompleted: function() {
        return this.models.filter( function(item) {
            return !item.get('done');
        });
    },
    deleteCompleted: function() {
        this.completed().forEach( function(todo) {
           this.remove(todo);
        }, this);
    },
    createNewItem: function(todoText) {
        this.add( new TodoItem({ title: todoText }) );
    },
    updateCount: function() {
        this.count =   this.unCompleted().length ;
    }

} );