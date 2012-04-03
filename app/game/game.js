define([
    'core/config',
    'core/publisher',
    'game/map',
    'game/avatar',
    'ai/ai'
    ],
    function(Config, Publisher, Map, Avatar, AI) {
        var canvas;
        var canvasContext;
        var canvasBuffer;
        var canvasBufferContext;
        
        var canvasAvatarBuffer;

        var map = null;
        var path = null;
        var avatar = null;
        var audio = null;
        var gameLoop;
        var started = false;

        //This variable is used for smoothing the Avatar
        //animation
        var step=3;
        //Next avatar position of the calculated path
        var next = 1;

        /**
         * Game object
         */
        var Game = function () {
            canvas = document.getElementById('canvas');

            if (canvas && canvas.getContext) {
                canvasContext = canvas.getContext('2d');
                //Maze canvas buffer
                canvasBuffer = document.createElement('canvas');
                canvasBuffer.width = canvas.width;
                canvasBuffer.height = canvas.height;
                canvasBufferContext = canvasBuffer.getContext('2d');

                //Avatar canvas buffer
                canvasAvatarBuffer = document.createElement('canvas');
                canvasAvatarBuffer.width = canvas.width;
                canvasAvatarBuffer.height = canvas.height;

                audio = new Audio('sound/mario_game.mp3');

                //Initialize objects
                map = new Map();
                avatar = new Avatar(canvasAvatarBuffer);

                step = Config.maxStep;

                //add subscriber methods to this object (mixin)
                Publisher.makePublisher(this);

                this.loadContent();

                return true;
            }
            return false;
        };

        /**
	 * Load media contents and draw initial map
	 */
        Game.prototype.loadContent = function () {
            map.init(canvas);
            
            //initial map draw
            map.drawInitialMap(canvasContext);

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
                audio.play();
                gameLoop = setInterval(runGameLoop, Config.interval);
            }
        }

        Game.prototype.startMusic = function() {
            audio.play();
        }

        Game.prototype.stopMusic = function() {
            audio.pause();
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
                audio.pause();
                started = false;
                map.drawEnding(canvasContext);
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

                map.draw(canvasBufferContext);

                avatar.move(x0, y0, x1, y1, step);

                //Copy buffer to the real canvas
                canvasContext.drawImage(canvasBuffer, 0, 0);
                canvasContext.drawImage(avatar.canvas, avatar.currX, avatar.currY);
            }
        }
        
        return Game;
    }
);
