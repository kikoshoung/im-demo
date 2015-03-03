define([
	'template',
	'backbone',
	'js/router'
], function(template, Backbone, Router){
	var router = new Router();

	window.template = template;
	Backbone.history.start();

	return Backbone.View.extend({
		initialize: function(){

		}
	});
});