define([
	'template',
	'backbone',
	'js/router'
], function(template, Backbone, Router){
	var router = new Router(),
		events = {
			click: 'ontouchstart' in window ? 'touchstart' : 'click'
		};

	window.template = template;
	Backbone.history.start();

	bindEvents();

	function bindEvents(){
		$('body').on(events.click, function(e){
			var $target = $(e.target);

			if(!$target.hasClass('mod-chat-input')){
				$('.mod-chat-input').blur();
			}
		});
	}
});