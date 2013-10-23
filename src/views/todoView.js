/*jslint browser: true*/
/*global $, jQuery, Backbone, Handlebars, console */
var TodoView;

TodoView = Backbone.View.extend( {

    tagName  :'tr',

    className:'todo-item row',

    template :Handlebars.compile( $( '#todo-item-template' ).html() ),

    events:{
        'click span'                  :'editItem',
        'keypress textArea'           :'doneEditing',
        'click input[type="checkbox"]':'completeItem',
        'click .todo-delete'          :'deleteItem'
    },

    initialize  :function () {
        this.listenTo( this.model, 'remove', this.remove );
        this.listenTo( this.model, 'change', this.render );
    },
    render      :function () {
        var html = this.template( this.model.attributes );
        this.$el.html(html);
        return this;
    },
    editItem    :function ( event ) {
        if ( !this.model.get( 'done' ) ) {
            this.$el.addClass( 'edit' );
            this.$el.find( '[data-id="todo-title"]' ).focus();
            event.stopPropagation();
        }
    },
    doneEditing :function ( event ) {
        if ( event.keyCode === 13 || event.type === 'focusout' ) {
            var $input = this.$el.find( 'textarea' );
            this.model.set( 'title', $input.val() );
            this.$el.removeClass( 'edit' );
        }
    },
    deleteItem      :function () {
        this.model.collection.remove( this.model );
        this.remove();
    },
    completeItem:function ( event ) {
        if ( $( event.target ).prop( 'checked' ) ){
            this.model.setComplete();
        } else {
            this.model.clearComplete();
        }
        event.stopPropagation();
    }

} );