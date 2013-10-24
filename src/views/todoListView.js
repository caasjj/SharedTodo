/*jslint browser: true*/
/*global $, jQuery, Backbone, Handlebars, console */
var TodoListView;

TodoListView = Backbone.View.extend({

    className: 'row',

    listTemplate: Handlebars.compile($('#todo-list-template').html()),

    navTemplate: Handlebars.compile($('#todo-nav-template').html()),

    events: {
        'click #nav-delete-items': 'deleteDoneItems',
        'keypress #nav-new-item': 'createNewItem'
    },

    count: 0,

    initialize: function () {
        this.$el.html( this.navTemplate(this.collection));
        this.$el.append( this.listTemplate( this.collection ));
        this.listenTo(this.collection, 'add', this.addOne);
//        this.listenTo(this.collection, 'change', this.render);
        this.listenTo( this.collection, 'remove', this.updateCount);
    },
    render: function () {
        this.addAll();
        return this;
    },
    addOne: function (todoItem) {
        var view = new TodoView({ model: todoItem});
        this.$('#todo-list').append(view.render().el);
        this.updateCount();
    },
    addAll: function () {
        this.collection.forEach(this.addOne, this);
        this.updateCount();
    },
    deleteDoneItems: function () {
        this.collection.deleteCompleted();
        this.updateCount();
    },
    createNewItem: function (event) {
        if (event.keyCode === 13) {
            this.collection.createNewItem(this.$el.find('#nav-new-item').val());
            this.$el.find('#nav-new-item').val('');
        }
    },
    updateCount: function(  ) {
        this.$('#todo-nav-top').html( this.navTemplate(this.collection));
    }

});