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
    'canvaswrapper',
    'graphics/mapfactory',
    'core/publisher'
    ],
    function($, Config, CanvasWrapper, Factory, Publisher) {
        var map = null;
        
        function Map() {
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


            this.canvas = CanvasWrapper.createBuffer();
            this.canvasCtx = this.canvas.getContext('2d');

            //Add observable functionality to this object
            Publisher.makePublisher(this);
        }
        
        /**
	 * Draws the initial message
	 */
        Map.prototype.drawInitialMap = function() {
            this.draw();
            this.canvasCtx.font = Config.textProperties;
            this.canvasCtx.fillStyle = Config.textColor;
            this.canvasCtx.fillText('Welcome!', 220, 230);
            this.canvasCtx.fillText('Select an entry point', 155, 275);
            CanvasWrapper.copyBufferToCanvas(this.canvas, 0, 0);
        };

        /**
	 * Draws the final message
	 */
        Map.prototype.drawEnding = function() {
            this.draw();
            this.canvasCtx.font = Config.textProperties;
            this.canvasCtx.fillStyle = Config.textColor;
            this.canvasCtx.fillText('Play again!', 220, 230);
            this.canvasCtx.fillText('Select an entry point', 155, 275);
            CanvasWrapper.copyBufferToCanvas(this.canvas, 0, 0);
        };

        /**
	 * Draws the map
	 */
        Map.prototype.draw = function() {
            var x0 = 0;
            var y0 = 0;
            var tileSize = Config.tileSize;
            var wall = Factory.factory('Wall');
            var empty = Factory.factory('EmptyWall');

            for (var y = 0, y1 = Config.height; y < y1; y++) {
                x0 = 0;
                for (var x = 0, x1 = Config.width; x < x1; x++) {

                    if (map[x][y] == 1) {
                        wall.drawElement(this.canvasCtx, x0, y0, tileSize, tileSize);
                    } else {
                        empty.drawElement(this.canvasCtx, x0, y0, tileSize, tileSize);
                    }

                    x0 += tileSize;
                }
                y0 += tileSize;
            }
        };
        
        Map.prototype.bindEvents = function() {
            var canvas = CanvasWrapper.canvas;
            $(canvas).bind('click', mouseClick.bind(this));
            $(canvas).bind('mousemove', mouseOver);
        };
        
        Map.prototype.unBindEvents = function() {
            var canvas = CanvasWrapper.canvas;
            $(canvas).unbind('click', mouseClick.bind(this));
            $(canvas).unbind('mousemove', mouseOver);
        };

        Map.prototype.getGrid = function() {
            return map;
        };

        /**
         * If the user mouse is over one of the entry points
         * draws a circle
         */
        var mouseOver = function(e) {
            var pos = CanvasWrapper.getCursorPosition(e);
            var entry = Factory.factory('EntryPoint');
            var empty = Factory.factory('EmptyWall');

            var canvasContext = CanvasWrapper.canvasContext;

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
            var pos = CanvasWrapper.getCursorPosition(e),
            begin;
            if (pos.x === 1 && pos.y === 0) {
                begin = [pos.x, pos.y, 18, 17];
                this.publish('startgame', begin);
            }
            else {
                if (pos.x === 18 && pos.y === 17) {
                    begin = [pos.x, pos.y, 1, 0];
                    this.publish('startgame', begin);
                }
            }
        };

        return Map;
    }
);
