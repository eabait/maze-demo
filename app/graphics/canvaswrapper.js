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
            }
            
        };
        
        return CanvasWrapper;
    }
);
