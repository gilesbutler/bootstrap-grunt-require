
module.exports = function(grunt) {

    var  configObj = {}
        ,ROOT_DIR = "../../"
        // loads useful helper methods
        ,UTILS = require( ROOT_DIR + 'externals/grunt.jimd.utils/grunt.jimd.utils.js' )
        ,GET_VAR = function( configVar ) {
            // helper wrapper for getting grunt vars, with nested vars, get like <%= MY_VAR %> at any time.
            return UTILS.getNestedConfigVariable( configVar, configObj );
        };


    /**
     * Add plugins
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');



    grunt.registerTask('default', [ "rjs" ] );
    grunt.initConfig( configObj );


    grunt.registerTask('rjs', '', function() {

        var optDev = !!(grunt.option("dev"));

        var packageJSONFile = grunt.file.readJSON('package.json');

        UTILS.getCommonConfigVars( grunt, configObj, packageJSONFile, true, false, ROOT_DIR );
        UTILS.getCommonAngularJSConfigVars( grunt, configObj, packageJSONFile );

        // requirejsConfig gets decalred in this file and used for dev as well as production
        var fs = require('fs');
        eval(fs.readFileSync( GET_VAR('DIRS.DEV') + 'sharedconfigs/requirejsconfig.js')+'');


        // Unminified rjs build, because stripping out comments and stuff is too hard after
        configObj.requirejs = {
            development: {
                options: {
                     baseUrl:           "./"
                    ,paths:             requirejsConfig.paths
                    ,shim:              requirejsConfig.shim
                    ,name:              GET_VAR('DIRS.APP_DEV') + "core/js/_requirejsbootstrap.js"
                    ,exclude:           ["common", "vehicle", "webtrends", "gigya"]
                    ,inlineText:        true
                    ,optimize:          "none"
                    ,out: function (text) {
                        var  optimized = text
                            ,consoleOverride = "";

                        if( !optDev ) {
                            /**
                              * If building mminified production version, here it gets optimised before uglification.
                              * TODO: 
                              * - Remove console.logs & warns comletely
                              * - Strip out html comments (mainly for AngularJS partials)
                              * - Hook into svn and grab build number
                              */

                            /**
                              * Temporary mesure until a better way of stripping out console logs from build is found.
                              * Stops JS errors from appearing in browsers that don't support these properties, such as 
                              * IE8 and console.log, plus many browsers with console.warn.
                              */
                            consoleOverride = "if( !window.console )  window.console = { log:function(){}, warn:function(){} };" +
                                     "else if( !window.console.log )  window.console = { log:function(){}, warn:function(){} };" +
                                     "else if( !window.console.warn ) window.console = {                   warn:function(){} };";
                        }

                        grunt.file.write( GET_VAR('DIRS.PROD_JS') + "build-debug.js", consoleOverride + optimized );
                    }
                }
            }
        }


        // Manual minify, rather than using rjs, because stripping out comments and stuff is too hard after minified
        var files = {};
        files[ GET_VAR('DIRS.DEPLOY') + "build.js" ] = [ GET_VAR('DIRS.PROD_JS') + "build-debug.js" ];

        configObj.uglify = {
            options: {
                 banner: '/* '+ GET_VAR('BANNER_CONTENT') +' */\n'
                ,preserveComments: "some" // false
                ,compress: {
                    global_defs: {
                      "DEBUG": false
                    },
                    dead_code: true
                }
            },
            production: {
                files: files
            }
        }

        var tasks = [ "requirejs" ];
        if( !optDev ) tasks.push( "uglify" );

        grunt.initConfig( configObj );

        grunt.task.run( tasks );
    });
    
};
