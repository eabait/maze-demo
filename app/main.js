/**
 * This is the app entry point.
 * Here we'll define the initial structure and require needed javascript 
 * building blocks.
 * 
 * @author Esteban Abait <estebanabait@gmail.com>
 */
//------------------------------------------------------------------------------
require.config( {
    paths: {
        'jquery' : '../libs/jquery-1.7.1',
        'polyfills' : 'core/es5-polyfills'
    },
    baseUrl: 'app'
});

require(
    [
        'domReady',
        'app',
        'polyfills'
    ],
    function(domReady, app) {       
        domReady(function () {
            app.init();
        });
    } 
);


