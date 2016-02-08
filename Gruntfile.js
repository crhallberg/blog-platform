module.exports = function(grunt) {
  grunt.initConfig({
    // Compress CSS
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'www/style.min.css': 'www/style.css'
        }
      }
    },
    // Compile posts
    execute: {
      simple_target: {
        src: ['compile.js']
      }
    }
  });


  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-execute');

  // Default task(s).
  grunt.registerTask('default', ['execute', 'cssmin']);
};
