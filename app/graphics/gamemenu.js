define([
    'core/config',
    'graphics/canvaswrapper'
    ],
    function (Config, CanvasWrapper) {
        var canvas,
            canvasCtx;

        function GameMenu() {
            canvas = CanvasWrapper.createBuffer();
            canvasCtx = canvas.getContext('2d');
        }

        GameMenu.prototype.showProgress = function(p) {
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            
            canvasCtx.font = Config.textProperties;
            canvasCtx.fillStyle = Config.textColor;
            canvasCtx.fillText('Loading resources', 170, 230);
            
            canvasCtx.fillRect(135, 275, 300 * p, 30);
            canvasCtx.strokeRect(135, 275, 300, 30);

            CanvasWrapper.copyBufferToCanvas(canvas, 0, 0);
        };

        return GameMenu;
    }
);
