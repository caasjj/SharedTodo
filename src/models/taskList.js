/*jslint browser: true*/
/*global console */
var TaskList;

TaskList = Backbone.Collection.extend( {

    model: TodoList,

    initialize:function () {
        'use strict';
        this.on( 'all', function () {
            console.log( 'EVENT: taskList. Arguments: ', arguments );
        } );
    }

} );