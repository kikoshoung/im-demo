define([
	'text!tpl/module/popup.html'
], function(tpl){
	var View = Backbone.View.extend({
		className: 'mod-popup',
		events: {
			'click .mod-btn-submit': 'submit',
			'keyup .input-name': 'onKeyup'
		},
		initialize: function(options){
			this.options = options;
			this.$el.html(tpl);
			options.renderTo.append(this.$el);
		},
		submit: function(e){
			var name = $.trim(this.$el.find('.input-name').val()),
				onsubmit = this.options.onsubmit;

			if(!name){
				alert('please enter your name');
				return;
			}
			this.$el.remove();
			onsubmit && onsubmit({name: name});
		},
		onKeyup: function(e){
			if(e.keyCode == 13){
				this.submit();
			}
		}
	});

	return View;
});