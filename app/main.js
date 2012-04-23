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
        'jquery' : '../libs/jquery/1.7.2/jquery-1.7.2.min',
        'soundmanager' : '../libs/soundmanager/soundmanager-wrapper',
        'pxloader' : '../libs/pxloader/pxloader-wrapper',
        'canvaswrapper' : '../app/graphics/canvaswrapper',
        'gamemenu' : '../app/graphics/gamemenu',
        'polyfills' : 'core/es5-polyfills'
    },
    baseUrl: 'app'
});


require(
    [
        'gamemenu',
        'app',
        'polyfills'
    ],
    function(GameMenu, app) {
        //domReady(function () {
            //Show progress message as soon as we can
            GameMenu.init();
            GameMenu.showProgress(0);

            //start application
            app.init();
        //});
    }
);
