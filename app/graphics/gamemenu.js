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
            canvasCtx.font = Config.textProperties;
            canvasCtx.fillStyle = Config.textColor;
            canvasCtx.fillText('Loading resources', 170, 230);
            canvasCtx.fillText(p + '%', 275, 275);
            
            CanvasWrapper.copyBufferToCanvas(canvas, 0, 0);
        };

        return GameMenu;
    }
);
