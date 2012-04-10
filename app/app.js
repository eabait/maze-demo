/* 
 * Start application
 * @author Esteban S. Abait <estebanabait@gmail.com>
 */
define([
    'jquery',
    'graphics/gamemenu',
    'game/game'
    ],
    function($, GameMenu, Game){
        var init = function() {
            var game = new Game(),
                loader = new PxLoader(),
                menu = new GameMenu();
            
            menu.showProgress(0);
            
            // initialize the sound manager 
            soundManager.url = '../swf/'; 
            soundManager.flashVersion = 9; 
            soundManager.useHighPerformance = true; // reduces delays 

            // reduce the default 1 sec delay to 500 ms 
            //soundManager.flashLoadTimeout = 500; 

            // mp3 is required by default, but we don't want any requirements 
            soundManager.audioFormats.mp3.required = false; 
            
            soundManager.useHTML5Audio = true; 
                soundManager.preferFlash = false; 
                soundManager.reboot(); 

            // flash may timeout if not installed or when flashblock is installed 
            soundManager.ontimeout(function(status) { 
                // no flash, go with HTML5 audio 
                soundManager.useHTML5Audio = true; 
                soundManager.preferFlash = false; 
                soundManager.reboot(); 
            }); 

            soundManager.onready(function() { 
                var avatar = loader.addImage('img/avatar.png');
                loader.addSound('marioMusic', 'sound/mario_game.mp3');
                loader.addSound('marioMusic', 'sound/mario_game.mp3');
                loader.addSound('marioMusic', 'sound/mario_game.mp3');
                loader.addSound('marioMusic', 'sound/mario_game.mp3');
                loader.addSound('marioMusic', 'sound/mario_game.mp3');
                loader.addSound('marioMusic', 'sound/mario_game.mp3');
                loader.addSound('marioMusic', 'sound/mario_game.mp3');
                
                
                          
                loader.addProgressListener(function(e) { 
                    menu.showProgress((e.completedCount / 8) * 100);
                });

                loader.addCompletionListener(function() { 
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


