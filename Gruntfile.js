module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jasmine: {
            pivotal: {
                src: [
                    'app/components/lodash/dist/lodash.js',
                    'app/components/extend.js/index.js',
                    'app/scripts/**/*.js'
                ],
                options: {
                    specs: 'spec/*Spec.js'
                }
            }
        },

        jshint: {
            all: ['app/scripts/**/*.js']
        },
        
        watch: {
            files: ['app/scripts/**/*.js', 'spec/*Spec.js'],
            tasks: ['jshint', 'jasmine']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', [
        'jshint',
        'jasmine'
    ]);
    
    grunt.registerTask('dev', [
        'watch'
    ]);
};