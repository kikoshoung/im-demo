define([
	'js/module/chat'
], function(Chat){
	var $main = $('#main');

	var View = Backbone.View.extend({
		initialize: function(){
			if(window.WebSocket){
				var chat = new Chat({
					renderTo: $main
				});
			} else {
				$main.html('<p class="notsupport-tip">WebSocket is not supported on your device</p>');
			}
		}
	});

	return View;
});