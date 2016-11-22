define([
	'text!tpl/module/message.html',
	'js/util'
], function(tpl, util){
	var Model = Backbone.Model.extend({
		defaults: {
			text: '',
			time: '',
			mid: '',
			uid: '',
			uname: ''
		},
		initialize: function(options){
			if(!options.silent){
				this.sync();
			}
		},
		sync: function(){
			$.ajax({
				url: 'http://101.200.180.200:8100',
				type: 'POST',
				data: JSON.stringify(this.toJSON())
			}).done(function(){

			}).error(function(){

			});
		}
	});

	var View = Backbone.View.extend({
		className: 'mod-msg clearfix',
		initialize: function(options){
			this.options = options;
			this.model = new Model({
				text: options.text,
				time: options.time,
				mid: options.mid,
				uid: options.uid,
				uname: options.uname,
				silent: options.silent
			});
			this.render();
			this.$el.addClass(options.klass);	
		},
		render: function(){
			var container = this.options.renderTo;

			if(!container) return;
			this.$el.html(template.compile(tpl)(this.model.toJSON()));
			container.append(this.$el);
		}
	});

	return View;
});