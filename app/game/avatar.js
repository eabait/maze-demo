define([
    '../core/config'
    ],
    function(Config) {
        var Avatar = function(canvas) {
            this.av = new Image();
            this.av.src = "img/avatar.png";
            
            this.canvas = canvas;
            this.canvasCtx = canvas.getContext('2d');

            //Avatar's configuration
            this.currentFrame = 0;
            this.maxFrames = 5;
            this.spriteWidth = 47;
            this.spriteHeight = 64;

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
                    this.canvasCtx.drawImage(this.av, 
                        this.currentFrame * this.spriteWidth, 
                        this.spriteHeight * 2, this.spriteWidth, 
                        this.spriteHeight, 0, 0, w, h
                    );
                }
                else {
                //move up
                    this.currY = y0 * h - h / step;
                    this.canvasCtx.drawImage(this.av, 
                        this.currentFrame * this.spriteWidth, 
                        this.spriteHeight * 0, this.spriteWidth, 
                        this.spriteHeight, 0, 0, w, h
                    );
                }
            }
            else {
                if(x1 > x0) {
                //move right
                    this.currX = x0 * w + w / step;
                    this.canvasCtx.drawImage(this.av, 
                        this.currentFrame * this.spriteWidth, 
                        this.spriteHeight * 1, this.spriteWidth, 
                        this.spriteHeight, 0, 0, w, h
                    );
                } else {
                //move left
                    this.currX = x0 * w - w / step;
                    this.canvasCtx.drawImage(this.av, 
                        this.currentFrame * this.spriteWidth, 
                        this.spriteHeight * 3, this.spriteWidth, 
                        this.spriteHeight, 0, 0, w, h
                    );
                }
            }
            this.currentFrame++;
            if (this.currentFrame > this.maxFrames) {
                this.currentFrame = 0;
            }
        }
        return Avatar;
    }
);
