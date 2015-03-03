define([
	'text!tpl/module/userlist.html'
], function(tpl){
	var Collection = Backbone.Collection.extend({

	});

	var View = Backbone.View.extend({
		tagName: 'ul',
		className: 'mod-userlist',
		initialize: function(options){
			this.options = options;
			var self = this;

			this.collection = new Collection();
			this.collection.on('change', function(){
				self.render();
			});
			self.render();
		},
		render: function(){
			var options = this.options;

			this.$el.html(template.compile(tpl)({items: this.collection.toJSON(), me: options.me}));
			options.renderTo.html(this.$el);
		}
	});

	return View;
});