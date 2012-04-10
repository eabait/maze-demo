define([
    'core/config'
    ], function(Config) {
        var CanvasWrapper = {
            canvas : null,
            
            canvasContext : null,
            
            init : function(domEl) {
                if (!domEl) {
                    throw new Error('Error: a canvas element must be specified');
                }
                
                this.canvas = document.getElementById(domEl);
                this.canvasContext = this.canvas.getContext('2d');
            },
            
            createBuffer : function() {
                var canvasBuffer = document.createElement('canvas');
                canvasBuffer.width = this.canvas.width;
                canvasBuffer.height = this.canvas.height;
                
                return canvasBuffer;
            },
            
            copyBufferToCanvas : function(canvasBuffer, x, y) {
                this.canvasContext.drawImage(canvasBuffer, x, y)
            },
            //CSS canvas's style
            //position set to relative
            getCursorPosition : function(e) {
                var x, y, resX, resY;

                if(e.x) {
                    x = e.x;
                    y = e.y;
                } else {
                    /* FIREFOX */
                    x = e.clientX + document.body.scrollLeft +
                        document.documentElement.scrollLeft;
                    y = e.clientY + document.body.scrollTop +
                        document.documentElement.scrollTop; 
                }
                    
                x -= this.canvas.offsetLeft;
                y -= this.canvas.offsetTop;

                resY = Math.floor(y / Config.tileSize);
                resX = Math.floor(x / Config.tileSize);

                return {
                    x : resX,
                    y : resY
                };
            },
            
            clear : function() {
                var c = this.canvas;
                this.canvasContext.clearRect(0, 0, c.width, c.height);
            }
            
        };
        
        return CanvasWrapper;
    }
);
