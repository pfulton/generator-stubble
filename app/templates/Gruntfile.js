module.exports = function (grunt) {
	'use strict';

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		compass: {
		  dev: {
		    options: {
		      sassDir: 'src/scss',
		      cssDir: 'src/css',
		      environment: 'development'
		    }
		  },
		  dist: {
		    options: {              
		      sassDir: 'dist/scss',
		      cssDir: 'dist/css',
		      environment: 'production'
		    }
		  }
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 versions']
			},
			dev: {
				files: [
					{ src: ['src/css/main.css'], dest: 'src/css/main.css' },
					{ src: ['src/css/errors.css'], dest: 'src/css/errors.css' }
				]
			},
			dist: {
				files: [
					{ src: ['src/css/main.css'], dest: 'dist/css/main.css' },
					{ src: ['src/css/errors.css'], dest: 'dist/css/errors.css' }
				]
			},
		},

		//Process Javascript

		modernizr: {
			"devFile" : "src/components/modernizr/modernizr.js",
			"outputFile" : "dist/js/vendor/modernizr.js",
			"extra" : {
		        "shiv" : true,
		        "printshiv" : false,
		        "load" : true,
		        "mq" : false,
		        "cssclasses" : true
			    },
	    "extensibility" : {
        "addtest" : false,
        "prefixed" : false,
        "testcss" : false,
        "testprops" : false,
        "testallprops" : false,
        "hasevents" : false,
        "prefixes" : false,
        "domprefixes" : false
      },
      "uglify" : true
		},

		uglify: {
			dist: {
				files:
				[
					{
						src: ['dist/js/main.js'],
						dest: 'dist/js/main.min.js'
					}
				]
			},
		},

		concat : {
			dist : {
				src : ['src/js/plugins/*.js', 'src/js/main.js'],
				dest : 'dist/js/main.js'
			},
		},

		//Process html
		useminPrepare: {
		  html: 'dist/index.html',
		  options: {
		  	uglify: 'uglify'
		  },
		},

		//clean dist folders
		clean: {
			dist: ['dist/js/*', 'dist/images/*', 'dist/css/*', 'dist/index.html']
		},

		usemin: {
		  html: 'dist/index.html'
		},

		htmlmin: {
		        dist: {
		            options: {
		                removeComments: true,
		                collapseWhitespace: true,
		                removeEmptyAttributes: true,
		                removeCommentsFromCDATA: true,
		                removeRedundantAttributes: true,
		                collapseBooleanAttributes: true
		            },
		            files: {
		                // Destination : Source
		                'dist/index.html': 'dist/index.html'
		            }
		        }
		    },

		//Process images
		imagemin: {
		    png: {
		      options: {
		        optimizationLevel: 7
		      },
		      files: [
		        {
		          expand: true,
		          cwd: 'src/images/',
		          src: ['**/*.png'],
		          dest: 'dist/images/',
		          ext: '.png'
		        }
		      ]
		    },
		    jpg: {
		      options: {
		        progressive: true
		      },
		      files: [
		        {
		          expand: true,
		          cwd: 'src/images/',
		          src: ['**/*.jpg'],
		          dest: 'dist/images/',
		          ext: '.jpg'
		        }
		      ]
		    }
		  },

		//copy files from components to js
		copy: {
			dist: {
				files:
				[
					{
						expand: true,
						cwd: 'src/components/jquery/',
						src: ['jquery.min.js'],
						dest: 'dist/js/vendor/'
					},
					{
						expand: true,
						cwd: 'src',
						src: ['index.html'],
						dest: 'dist/'
					}
				]
			},
		},
		watch: {
				/* watch to see if the sass files are changed, compile and add prefixes */
				css: {
					files: ['src/scss/**/*.{scss,sass}'],
					tasks: ['compass:dev', 'autoprefixer:dev']
				},

				/* watch our files for change, reload */
				livereload: {
					files: ['src/*.html', 'src/*.php', 'src/css/*.css', 'src/images/**/*.{png,jpg,jpeg,gif,webp,svg}', 'src/*.js'],
					options: {
						livereload: true
					},
				},
			},
		});

	//Task list
	grunt.registerTask('build', ['clean','copy:dist', 'compass:dist', 'autoprefixer:dist', 'modernizr', 'concat:dist', 'uglify:dist', 'useminPrepare', 'usemin', 'htmlmin:dist', 'imagemin']);
	grunt.registerTask('default', ['watch']);
};