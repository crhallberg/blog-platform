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
          'www/style.min.css': ['reboot.css','style.css','highlight-github.css']
        }
      }
    },
    // Compile posts
    execute: {
      simple_target: {
        src: ['compile.js']
      }
    },
    /*/ Upload to sample.com
    'ftp-deploy': {
      build: {
        auth: {
          host: 'sample.com',
          port: 21,
          authKey: 'key1' // setup in .ftppass
        },
        src: 'www',
        dest: 'sample.com/blog'
      }
    } */
  });


  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  // Default task(s).
  grunt.registerTask('default', ['execute', 'cssmin'/*, 'ftp-deploy'*/]);
};
