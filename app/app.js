/* 
 * Start application
 * @author Esteban S. Abait <estebanabait@gmail.com>
 */
define([
    'jquery',
    'soundmanager',
    'pxloader',
    'gamemenu',
    'game/game'
    ],
    function($, SM, PxLoader, GameMenu, Game){
        var init = function() {
            var game = new Game(),
                loader = new PxLoader();
            
            GameMenu.showProgress(0.1);
            
            // initialize the sound manager 
            SM.url = '../swf/'; 
            SM.flashVersion = 9; 
            SM.useHighPerformance = true; // reduces delays 

            // reduce the default 1 sec delay to 500 ms 
            SM.flashLoadTimeout = 500; 

            // mp3 is required by default, but we don't want any requirements 
            SM.audioFormats.mp3.required = false; 
            
            SM.useHTML5Audio = true; 
            SM.preferFlash = false; 
            SM.reboot(); 

            // flash may timeout if not installed or when flashblock is installed 
            SM.ontimeout(function(status) { 
                // no flash, go with HTML5 audio 
                SM.useHTML5Audio = true; 
                SM.preferFlash = false; 
                SM.reboot(); 
            }); 

            SM.onready(function() { 
                var avatar = loader.addImage('img/avatar.png');
                loader.addSound('marioMusic', 'sound/fresh.ogg.m3u');
     
                loader.addProgressListener(function(e) { 
                    GameMenu.showProgress(e.completedCount / e.totalCount);
                });

                loader.addCompletionListener(function() { 
                    GameMenu.showProgress(1);
                    game.loadContent(avatar); 
                });

                loader.start();
            });           
            
            $('#useSmart').click(function() {
                game.setAlgorithm('smart');
            });
            
            $('#useDumb').click(function() {
                game.setAlgorithm('dumb');
            });
            
            $('#playMusic').click(function() {
                game.startMusic();
            });
            
            $('#stopMusic').click(function() {
                game.stopMusic();
            });
        };

        return {
            init: init
        };
    }
);


