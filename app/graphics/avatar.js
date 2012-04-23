define([
    'core/config',
    'canvaswrapper'
    ],
    function(Config, CanvasWrapper) {
        var av = null,
            currentFrame = 0,
            maxFrames = 6,   //@TODO move to Config
            spriteWidth = 47, //@TODO move to Config
            spriteHeight = 64; //@TODO move to Config
        
        var Avatar = function() {
            this.canvas = CanvasWrapper.createBuffer();
            this.canvasCtx = this.canvas.getContext('2d');
            this.currX = 0;
            this.currY = 0;
        };

        /**
         * This method changes the Avatar's sprite according
         * to the current step and target coordinate
         */
        Avatar.prototype.move = function(x0, y0, x1, y1, step) {
            var w = Config.tileSize,
                h = Config.tileSize;

            this.canvasCtx.clearRect(0, 0, w, h);

            this.currX = x1*w;
            this.currY = y1*h;

            if (y0 != y1) {
                //move down
                if (y1 > y0) {
                    this.currY = y0 * h + h / step;
                    this.canvasCtx.drawImage(av, 
                        currentFrame * spriteWidth, 
                        spriteHeight * 2, spriteWidth, 
                        spriteHeight, 0, 0, w, h
                    );
                }
                else {
                //move up
                    this.currY = y0 * h - h / step;
                    this.canvasCtx.drawImage(av, 
                        currentFrame * spriteWidth, 
                        spriteHeight * 0, spriteWidth, 
                        spriteHeight, 0, 0, w, h
                    );
                }
            }
            else {
                if(x1 > x0) {
                //move right
                    this.currX = x0 * w + w / step;
                    this.canvasCtx.drawImage(av, 
                        currentFrame * spriteWidth, 
                        spriteHeight * 1, spriteWidth, 
                        spriteHeight, 0, 0, w, h
                    );
                } else {
                //move left
                    this.currX = x0 * w - w / step;
                    this.canvasCtx.drawImage(av, 
                        currentFrame * spriteWidth, 
                        spriteHeight * 3, spriteWidth, 
                        spriteHeight, 0, 0, w, h
                    );
                }
            }
            currentFrame++;
            if (currentFrame > maxFrames) {
                currentFrame = 0;
            }
        };
        
        Avatar.prototype.copyToCanvas = function() {
            var realCanvas = CanvasWrapper.canvas;
            realCanvas.drawImage(this.canvas, this.currX, this.currY);
        };
        
        Avatar.prototype.setImage = function(image) {
            av = image;
        }
        
        return Avatar;
    }
);
