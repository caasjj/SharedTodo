/*jslint browser: true*/
/*global $, jQuery, Handlebars, ShoppingItem */
var ShoppingItemFormView;

ShoppingItemFormView = Backbone.View.extend( {

	className:'todo-item',
	template :Handlebars.compile( $( '#todo-item-form-template' ).html() ),

	events:{
		'click button'   :'submit',
		'keyup input'    :'enter',
		'keypress select':'enter'
	},

	initialize:function ( options ) {
		console.log( 'itemForm Initialize. Options Passed:', options );
		this.options = options;
		this.render();
		this.$el.show();
	},

	enter:function ( event ) {
		if ( +event.keyCode === 27 ) {
			this.cancel();
		}
		if ( +event.keyCode === 13 || event.target.tagName.toLowerCase() === 'select' ) {
			event.stopPropagation();
			if ( '' + this.options.mode === 'add' ) {
				this.saveItem();
				$( '#todo-item-name' ).focus().val( '' );
				$( '#todo-item-quantity' ).val( '' );
			} else {
				this.updateItem();
				this.$el.hide();
			}
		}
	},

	submit:function ( event ) {
		if ( $( event.target ).hasClass( 'cancel' ) ) {
			this.cancel();
		} else {
			if ( '' + this.options.mode === 'add' ) {
				this.saveItem();
				$( '#todo-item-name' ).focus().val( '' );
				$( '#todo-item-quantity' ).val( '' );
			} else {
				this.updateItem();
				this.$el.hide();
			}
		}
	},

	saveItem:function () {
		var item = {
			name      :$( '#todo-item-name' ).val(),
			quantity  :$( '#todo-item-quantity' ).val(),
			quantifier:$( '#todo-form-quantifier' ).val(),
			bought: false
		};
		this.trigger( 'FormAddEvent', {item:item, mode:this.options.mode} );
	},

	updateItem:function () {
		var item = {
			name      :$( '#todo-item-name' ).val(),
			quantity  :$( '#todo-item-quantity' ).val(),
			quantifier:$( '#todo-form-quantifier' ).val()
		};
		this.trigger( 'FormUpdateEvent', {model:this.options.model, item:item, mode:this.options.mode} );
	},

	cancel:function () {
		this.trigger( 'FormCancelEvent', {item:null, mode:this.options.mode} );
		this.$el.hide();
	},

	render:function () {
		var quantifiers, html, quantifierIdx, item;
		quantifiers = ShoppingItem.prototype.quantifiers;
		quantifierIdx = 0;
		item = {
			name    :'',
			quantity:''
		};

		if ( this.options.model ) {
			item = this.options.model.attributes;
			item.name = item.name || 'item';
			item.quantity = item.quantity || 'quantity';
			item.quantifier = item.quantifier || '';
			quantifierIdx = Math.max( quantifiers.indexOf( item.quantifier + ' ' ), 0 );
		}

		html = this.template( {
			name      :item.name,
			quantity  :item.quantity,
			quantifier:ShoppingItem.prototype.quantifiers,
			mode      :this.options.mode
		} );
		this.$el.html( html );

		$( '#todo-form-quantifier' ).val(
            quantifiers[quantifierIdx].trim()
        );

		return this;
	}
} );