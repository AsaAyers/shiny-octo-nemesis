'use strict';

module.exports = function (grunt) {
    require('jit-grunt')(grunt, {
        manifest: 'grunt/manifest.js'
    });

    grunt.initConfig({
        env: {
            NODE_ENV: 'development',
        },
        manifest: {
            src: 'src/manifest.json',
            dest: 'dist/manifest.json',
        },
        browserify: {
            options: {
                transform: [
                    'babelify',
                    [ 'envify', '<%= env %>' ],
                    // [ 'unreachable-branch-transform', unreachableConfig ],
                ],

                watch: true,
                postBundleCB: function (err, src, next) {
                    if (err) {
                        console.log(err.toString());
                        src = 'throw new Error("See grunt output for error.");';
                    }

                    next(null, src);
                },
                browserifyOptions: {
                    extensions: [ '.coffee' ],
                    debug: true,
                }
            },
            popup: {
                src: [
                    'src/popup.js'
                ],
                dest: 'dist/popup.js',
            }
        },
        watch: {
            project: {
                files: [
                    'dist/pupup.js',
                    'src/manifest.json',
                ],
                tasks: [
                    'manifest',
                    'copy',
                ],
                options: {
                    livereload: true,
                    atBegin: true,
                }
            }
        },
        copy: {
            project: {
                files: [
                    {
                        src: 'popup.html',
                        dest: 'dist/popup.html',
                    },
                    {
                        expand: true,
                        src: ['assets/**'],
                        dest: 'dist/',
                        filter: 'isFile'
                    },
                ]
            }
        },
    });

    grunt.registerTask('default', [
        'browserify',
        'watch',
    ]);
};
