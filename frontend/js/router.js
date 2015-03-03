define([
    'backbone'
], function(Backbone, App) {
    return Backbone.Router.extend({
        routes: {
            '!/demo': 'demo'
        },
        demo: function() {
            require([
            	'js/page/demo'
            ], function(Demo){
            	var demo = new Demo();
            });
        }
    });
});
