requirejs.config({
    baseUrl: './',
    // urlArgs: 'v=' + Math.random(),
    paths: {
        text: 'js/lib/require-text',
        template: 'js/lib/art',
        jquery: 'js/lib/jquery',
        underscore: 'js/lib/underscore',
        backbone: 'js/lib/backbone'
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require([
    'js/app'
], function(app) {
    
});