module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jasmine: {
            pivotal: {
                src: [
                    'app/components/lodash/dist/lodash.js',
                    'app/components/extend.js/index.js',
                    'app/components/vec2d/build/vec2d.js',
                    'app/scripts/**/*.js',
                    '!app/scripts/Main.js'
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
            test: {
                files: ['app/scripts/**/*.js', 'spec/*Spec.js'],
                tasks: ['jshint', 'jasmine']
            },
            server: {
                options: {
                    livereload: true
                },
                files: ['app/scripts/**/*.js', 'app/styles/**/*.css', 'app/index.html']
            }
        },
        
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'app'
                }
            }
        },
        
        open: {
            server: {
                path: 'http://localhost:9001/',
                app: 'Chrome'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('test', [
        'jshint',
        'jasmine'
    ]);
    
    grunt.registerTask('dev-server', [
        'connect:server',
        'open:server',
        'watch:server'
    ]);
    
    grunt.registerTask('dev-test', [
        'watch:test'
    ]);
};