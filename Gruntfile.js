/*global module:false*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Task configuration.
		compass: {
			dist: {
				options: {
					sassDir: 'sass',
					cssDir: 'css'
				}
			}
		},

		watch: {
			js: {
				files: 'js/*.js',
				options: {
					livereload: true,
				}
			},
			css: {
				files: 'sass/*.scss',
				tasks: ['compass'],
				options: {
					livereload: true,
				}
			}
		},

		devserver: {
			server: {
				options: {
					'port' : 5000
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-devserver');

	//Run multiple tasks `grunt all` or `grunt build`
	// grunt.registerTask("serve", [ "devserver", "watch" ]);

	// Default task.
	grunt.registerTask("default", function() {
		var msg =	"What would you like to run? \n" +

					"\n grunt devserver \n" +
					" - This will start up a local dev server. \n" +

					"\n grunt watch \n" +
					" - This will compile your scss to css, watch for changes and use LiveReload to refresh your browser if it is connected. \n"

					// "\n grunt serve \n" +
					// " - This will run both the above commands - a devserver and watch your scss for changes. \n"

		grunt.log.write( msg );
	});

};