/*global define, setTimeout*/
define([
    'marionette',
    'tpl!../../../templates/task/header.hbs',
    '../../app',
    './taskItem',
    'queryUiDraggable'
], function (Marionette, taskTemplate, app, taskItemView) {
    "use strict";

    return Marionette.CompositeView.extend({

        className: 'm-task',

        itemView: taskItemView,

        template: taskTemplate,

        events: {
            'submit form': 'createTask',
            'sortreceive': 'onSortReceive',
            'sortremove': 'onSortRemove'
        },

        initialize: function () {
            this.collection = app.taskCollection;
            this.itemViewOptions = {
                compositeView: this
            };
        },

        serializeData: function () {
            var filteredTaskCollection = app.taskCollection.where({
                type: this.options.taskType
            });
            return {
                type: this.options.taskType,
                createTask: this.options.createTask,
                taskLength: filteredTaskCollection.length
            };
        },

        appendHtml: function (collectionView, itemView) {
            if (itemView.model.get('type') === this.options.taskType) {
                collectionView.$el.find('.task-list').append(itemView.el);
            }
        },

        createTask: function (event) {
            var form = event.currentTarget;

            event.preventDefault();
            if (form.checkValidity && form.checkValidity()) {
                this.collection.create({
                    name: this.$(form).find('input').val(),
                    type: this.options.taskType
                });
                // TODO the reset of input value should be done just on success
                this.$el.find('input').val('');
                this.render();
            }
        },

        onRender: function () {
            this.$el.find('ul.task-list').sortable({
                connectWith: '.connectedSortable'
            }).disableSelection();
        },

        onSortReceive: function (e, ui) {
            this.$(ui.item[0]).trigger('drop', this.options.taskType);
            this.render();
        },

        onSortRemove: function () {
            var self = this;
            setTimeout(function () {
                self.serializeData();
                self.render();
            }, 0);
        }

    });
});
