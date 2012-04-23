define([
    'core/config',
    'canvaswrapper'
    ],
    function (Config, CanvasWrapper) {

        var GameMenu = {     
            init : function() {
                this.canvas = CanvasWrapper.createBuffer();
                this.canvasCtx = this.canvas.getContext('2d');
            },

            showProgress : function(p) {
                this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                this.canvasCtx.font = Config.textProperties;
                this.canvasCtx.fillStyle = Config.textColor;
                this.canvasCtx.fillText('Loading resources', 170, 230);

                this.canvasCtx.fillRect(135, 275, 300 * p, 30);
                this.canvasCtx.strokeRect(135, 275, 300, 30);

                CanvasWrapper.copyBufferToCanvas(this.canvas, 0, 0);
            }
        }
        return GameMenu;
    }
);
