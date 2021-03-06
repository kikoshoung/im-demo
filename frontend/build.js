({
    baseUrl: './',
    paths: {
        text: 'js/lib/require-text',
        template: 'js/lib/art',
        jquery: 'js/lib/jquery',
        underscore: 'js/lib/underscore',
        backbone: 'js/lib/backbone'
    },
    shim: {
        backbone: {
            deps: ['underscore'],
            exports: 'Backbone'
        }
    },
    name: "js/init",
    out: "js/init-built.js"
})