define([
    'core/config',
    'core/publisher',
    'graphics/canvaswrapper',
    'graphics/map',
    'graphics/avatar',
    'ai/ai'
    ],
    function(Config, Publisher, CanvasWrapper, Map, Avatar, AI) {
        var map = null,
            path = null,
            avatar = null,
            audio = null,
            gameLoop,
            started = false;

        //This variable is used for smoothing the Avatar
        //animation
        var step=6;
        //Next avatar position of the calculated path
        var next = 1;

        /**
         * Game object
         */
        var Game = function () {
            //audio = new Audio('sound/mario_game.mp3');
            CanvasWrapper.init('canvas');

            //Initialize objects
            map = new Map();
            avatar = new Avatar();

            step = Config.maxStep;

            //add subscriber methods to this object (mixin)
            Publisher.makePublisher(this);
        };

        /**
	 * Load media contents and draw initial map
	 */
        Game.prototype.loadContent = function (img) {            
            //initial map draw
            map.drawInitialMap();
            //bind mouse event handlers
            map.bindEvents();
            
            avatar.setImage(img);

            //whenever the user clicks on the map
            //start the game loop
            map.subscribe(this.startGame, 'startgame');
        };

        /**
	 * Starts the game:
	 *  -find the exit path
	 *  -play music
	 *  -set the game loop to interval
	 */
        Game.prototype.startGame = function(pos) {
            if (!started) {
                next=1;
                started = true;
                path = AI.findPath(
                    map.getGrid(), 
                    pos[0], 
                    pos[1], 
                    pos[2], 
                    pos[3], 
                    Config.algorithm
                );
                //this.startMusic();
                gameLoop = setInterval(runGameLoop, Config.interval);
            }
        }

        Game.prototype.startMusic = function() {
            soundManager.play('marioMusic', {});
        }

        Game.prototype.stopMusic = function() {
            soundManager.stop('marioMusic');
        }

        Game.prototype.setAlgorithm = function(a) {
            Config.algorithm = a;
        }

        /**
	 * Starts the game loop
	 */
        var runGameLoop = function () {
            update();
            draw();
        }

        /**
	 * Updates the game state
	 */
        var update = function () {
            if (step === 1)
                next = next + 1;

            if (step <= 1)
                step = Config.maxStep;
            else
                step = step - 1;

            //Once finished, stop the loop
            if (next >= path.length) {
                clearInterval(gameLoop);
                //this.stopMusic();
                started = false;
                map.drawEnding();
                next = 1;
            }
        }

        /**
	 * draws the map and avatar for the current
	 * game state
	 */
        var draw = function () {
            if (started) {
                var x0 = path[next-1].x,
                y0 = path[next-1].y,
                x1 = path[next].x,
                y1 = path[next].y;

                map.draw();

                avatar.move(x0, y0, x1, y1, step);

                //Copy buffer to the real canvas
                CanvasWrapper.copyBufferToCanvas(map.canvas, 0, 0);
                CanvasWrapper.copyBufferToCanvas(avatar.canvas, avatar.currX, avatar.currY);
            }
        }
        
        return Game;
    }
);
