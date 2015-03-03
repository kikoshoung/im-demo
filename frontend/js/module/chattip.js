define([

], function(tpl){
	var tpl = '{{data.name}} {{if data.leave}}leaved{{else}}joined{{/if}} this chatting room';

	var View = Backbone.View.extend({
		className: 'mod-chattip',
		initialize: function(options){
			this.$el.html(template.compile(tpl)({data: options.data}));
			options.renderTo.append(this.$el);
		}
	});

	return View;
});