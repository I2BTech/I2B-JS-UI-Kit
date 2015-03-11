module.exports = function(grunt) {
 
  // configure the tasks
  grunt.initConfig({
 
    copy: {
      build: {
        cwd: 'source',
        src: [ '**', '!**/*.scss', '!**/*.jade', '!jade' ],
        dest: 'build',
        expand: true
      },
    },
 
    clean: {
      build: {
        src: [ 'build' ]
      },
      stylesheets: {
        src: [ 'build/**/*.css']
      },
      scripts: {
        src: [ 'build/**/*.js']
      },
    },   

    sass: {                              
      dist: {                            
        options: {                       
          style: 'expanded'
        },
        files: {                         
          'build/css/main.css': 'source/css/main.scss'
        }
      }
    },
 
    autoprefixer: {
      build: {
        expand: true,
        cwd: 'build',
        src: [ '**/*.css' ],
        dest: 'build'
      }
    },    
 
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {}
        },
        files: [{          
          expand: true,
          cwd: 'source',
          src: [ '*.jade' ],
          dest: 'build',
          ext: '.html'
        }]
      }
    },
 
    watch: {
      stylesheets: {
        files: 'source/**/*.scss',
        tasks: [ 'stylesheets' ]
      },
      jade: {
        files: 'source/**/*.jade',
        tasks: [ 'jade' ]
      },
      copy: {
        files: [ 'source/**', '!source/**/*.jade' ],
        tasks: [ 'copy' ]
      }
    },
 
    connect: {
      server: {
        options: {
          port: 4000,
          base: 'build',
          hostname: '*'
        }
      }
    }
 
  });
 
  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
 
  // define the tasks
  grunt.registerTask(
    'stylesheets', 
    'Compiles the stylesheets.', 
    [  'clean:stylesheets', 'sass', 'autoprefixer' ]
  ); 
 
  grunt.registerTask(
    'build', 
    'Compiles all of the assets and copies the files to the build directory.', 
    [ 'clean:build', 'copy', 'stylesheets', 'jade' ]
  );
 
  grunt.registerTask(
    'default', 
    'Watches the project for changes, automatically builds them and runs a server.', 
    [ 'build', 'connect', 'watch' ]
  );
};