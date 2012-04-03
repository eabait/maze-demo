/* 
 * Start application
 * @author Esteban S. Abait <estebanabait@gmail.com>
 */
define([
    'jquery',
    'game/game'
    ],
    function($, Game){
        var init = function(){
            var game = new Game();
            
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


