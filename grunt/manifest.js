'use strict';
module.exports = function (grunt) {
    grunt.registerTask('manifest', function() {
        this.requiresConfig('manifest.src');
        this.requiresConfig('manifest.dest');

        var pkg = grunt.file.readJSON('package.json');
        var src = grunt.file.readJSON(grunt.config('manifest.src'));
        var destPath = grunt.config('manifest.dest');

        src.name = pkg.name;
        src.description = pkg.description;
        src.version = pkg.version;

        grunt.file.write(destPath, JSON.stringify(src, undefined, 2));
    });
};
