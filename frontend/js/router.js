define([
    'backbone',
    'js/page/demo'
], function(Backbone, Demo) {
    return Backbone.Router.extend({
        routes: {
            '!/demo': 'demo'
        },
        demo: function() {
            var demo = new Demo();
        }
    });
});
