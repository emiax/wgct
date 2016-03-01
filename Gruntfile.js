module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      browserify: {
        files: ['js/*.js'],
        tasks: ['browserify'],
      }
    },
    browserify: {
      dist: {
        files: {
          'client.js': ['index.js'],
        },
        options: {
          transform: [],
          browserifyOptions: {
            debug: true
          }
        }
      }
    }
  });

  grunt.registerTask('default', ['browserify']);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
};
