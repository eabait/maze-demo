/**
 * Map object, main responsibilities:
 * 	-Draw map and messages
 *	-Handle mouse events
 *
 * Map notifies when the game starts since is responsible
 * of handling events. The Game object listen to this object
 * events.
 */
define([
    'jquery',
    'core/config',
    'game/mapfactory',
    'core/publisher'
    ],
    function($, Config, Factory, Publisher) {
        var map = null;
        var canvas=null;
        
        function Map() {
            this.loaded = false;
        }
        /**
	 * Draws the initial message
	 */
        Map.prototype.drawInitialMap = function(canvasCtx) {
            this.draw(canvasCtx);
            canvasCtx.font = Config.textProperties;
            canvasCtx.fillStyle = Config.textColor;
            canvasCtx.fillText("Welcome!", 220, 230);
            canvasCtx.fillText("Select an entry point", 155, 275);
        };

        /**
	 * Draws the final message
	 */
        Map.prototype.drawEnding = function(canvasCtx) {
            this.draw(canvasCtx);
            canvasCtx.font = Config.textProperties;
            canvasCtx.fillStyle = Config.textColor;
            canvasCtx.fillText("Play again!", 220, 230);
            canvasCtx.fillText("Select an entry point", 155, 275);
        };

        /**
	 * Draws the map
	 */
        Map.prototype.draw = function(canvasCtx) {

            var x0 = 0;
            var y0 = 0;
            var tileSize = Config.tileSize;
            var wall = Factory.factory('Wall');
            var empty = Factory.factory('EmptyWall');

            for (var y = 0, y1 = Config.height; y < y1; y++) {
                x0 = 0;
                for (var x = 0, x1 = Config.width; x < x1; x++) {

                    if (map[x][y] == 1) {
                        wall.drawElement(canvasCtx, x0, y0, tileSize, tileSize);
                    } else {
                        empty.drawElement(canvasCtx, x0, y0, tileSize, tileSize);
                    }

                    x0 += tileSize;
                }
                y0 += tileSize;
            }
        };

        Map.prototype.init = function(canvasElement) {
            map = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
                [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
                [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
                [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1]
            ];

            //Add observable functionality to this object
            Publisher.makePublisher(this);
            
            //mouseClick function is binded with Map object
            canvas = canvasElement;
            $(canvas).click(mouseClick.bind(this));
            $(canvas).mousemove(mouseOver);

            this.loaded = true;
        };

        Map.prototype.getGrid = function() {
            return map;
        };

        /**
             * If the user mouse is over one of the entry points
             * draws a circle
             */
        var mouseOver = function(e) {
            var pos = getCursorPosition(e);
            var entry = Factory.factory('EntryPoint');
            var empty = Factory.factory('EmptyWall');

            var canvasContext = canvas.getContext('2d');

            if (pos.x === 1 && pos.y === 0) {
                entry.drawElement(canvasContext, 30, 0, 30, 30);
            } else {
                empty.drawElement(canvasContext, 30, 0, 30, 30);
            }
            if (pos.x === 18 && pos.y === 17) {
                entry.drawElement(canvasContext, 540, 510, 30, 30);
            } else {
                empty.drawElement(canvasContext, 540, 510, 30, 30);
            }
        };

        /**
         * Test whether the user clicked in one of the entry points
         * and notifies accordingly
         */
        var mouseClick = function(e) {
            var pos = getCursorPosition(e),
                begin;
            if (pos.x === 1 && pos.y === 0) {
                begin = [pos.x, pos.y, 18, 17];
                this.publish(begin, 'startgame');
            }
            else {
                if (pos.x === 18 && pos.y === 17) {
                    begin = [pos.x, pos.y, 1, 0];
                    this.publish(begin, 'startgame');
                }
            }
        };

        //CSS canvas's style
        //position set to relative
        /**
          * Gets the click coordinate
          */
        var getCursorPosition = function(e) {
            var x, y, resX, resY;

            if(e.offsetX) {
                x = e.offsetX;
                y = e.offsetY;
            } else 
                if(e.layerX) {
                    x = e.layerX;
                    y = e.layerY;
                }

            resY = Math.floor(y / Config.tileSize);
            resX = Math.floor(x / Config.tileSize);

            return {
                x : resX,
                y : resY
            };
        };
        return Map;
    }
);
