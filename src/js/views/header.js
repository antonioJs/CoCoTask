/*global define*/
define([
    'backbone',
    'tpl!../../templates/header.hbs',
    'bootstrapCollapse'
], function (Backbone, headerTemplate) {
    "use strict";

    return Backbone.View.extend({

        className: 'navbar navbar-inverse navbar-fixed-top',

        render: function () {
            this.$el.html(headerTemplate());

            return this;
        }

    });
});