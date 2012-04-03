/**
 * Map elements factory
 *  -EntryPoint
 *  -Empty
 *  -Wall
 */
define([
    'core/config'
    ],
    function (Config) {
        
    var map = {
        EntryPoint: EntryPoint,
        EmptyWall: Empty,
        Wall : Wall
    };
        
    function EntryPoint() {
        this.drawElement = function(ctx, x, y, w, h) {
            ctx.beginPath();
            ctx.arc(x+w/2, y+w/2, w/2, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fillStyle = Config.entryColor;
            ctx.fill();
        };
    }

    function Empty() {
        this.drawElement = function(ctx, x, y, w, h) {
            ctx.fillStyle = Config.emptyColor;
            ctx.fillRect(x, y, w, h);
        };
    }

    function Wall() {
        this.drawElement = function(ctx, x, y, w, h) {
            ctx.fillStyle = Config.wallColor;
            ctx.fillRect(x, y, w, h);
        };
    }
        
    function factory(type) {
        var constr = type;
        if (typeof map[constr] != 'function') {
            throw {
                name: 'Error',
                message: constr + ' does not exist'
            };
        }
        return new map[constr]();
    }
        
    return {
        factory : factory
    }
}
);
