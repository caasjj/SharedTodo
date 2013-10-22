/*jslint browser: true*/
/*global console */
var TodoItem;

TodoItem = Backbone.Model.extend( {

    defaults:{
        title   :'Test',
        done    :false
    },

    initialize:function () {
        'use strict';
        this.on( 'all', function () {
            console.log( 'EVENT: todoItem. Arguments: ', arguments );
        } );
    },
    setComplete: function() {
        this.set( 'done', true);
    },
    clearComplete: function() {
        this.set( 'done', false);
    }
} );