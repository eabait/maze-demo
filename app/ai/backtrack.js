/**
 * Backtracking algorithm implementation for finding the maze exit
 */
define(function() {
    var backtrack = {
        /**
         * This method implements a backtracking algorithm for
         * searching a path from (sx, sy) to (ex, ey). The
	 * visited array is used to avoid researching visited
	 * cells.
	 *
	 * @param grid bidimensional array (map)
	 * @param sx starting X coord
	 * @param sy starting Y coord
	 * @param ex ending X coord
	 * @param ey ending Y coord
	 * @param path walked list of coord
	 * @param visited bidimensional array, marks all visited places
	 *
	 * @returns a list with the path from the starting coord to
	 * 			the ending coord
	 */
        search: function(grid, sx, sy, ex, ey, path, visited) {
            if (sx == ex && sy == ey)
                return path;

            var res;
            //move right
            if (this.canMoveRight(sx, sy, grid, visited)) {
                path.push({
                    x : sx + 1,
                    y : sy
                });
                visited[sx][sy] = 1;
                res = this.search(grid, sx + 1, sy, ex, ey, path, visited);
                if (res != null)
                    return path;
                visited[sx][sy] = 0;
                path.pop();
            }
            //move left
            if (this.canMoveLeft(sx, sy, grid)) {
                path.push({
                    x : sx - 1,
                    y : sy
                });
                visited[sx][sy] = 1;
                res = this.search(grid, sx - 1, sy, ex, ey, path, visited);
                if (res != null)
                    return path;
                visited[sx][sy] = 0;
                path.pop();
            }
            //move down
            if (this.canMoveDown(sx, sy, grid, visited)) {
                path.push({
                    x : sx,
                    y : sy + 1
                });
                visited[sx][sy] = 1;
                res = this.search(grid, sx, sy + 1, ex, ey, path, visited);
                if (res != null)
                    return path;
                visited[sx][sy] = 0;
                path.pop();
            }
            //move up
            if (this.canMoveUp(sx, sy, grid)) {
                path.push({
                    x : sx,
                    y : sy - 1
                });
                visited[sx][sy] = 1;
                res = this.search(grid, sx, sy - 1, ex, ey, path, visited);
                if (res != null)
                    return path;
                visited[sx][sy] = 0;
                path.pop();
            }
            return null;
        },

        //The following methods test weather we can move to any
        //of the four possible directions from a given coordinate
        canMoveRight: function(sx, sy, grid, visited) {
            return sx+1 < grid.length && grid[sx+1][sy] === 0 && !visited[sx+1][sy];
        },

        canMoveDown: function(sx, sy, grid, visited) {
            return sy+1 < grid[sx].length && grid[sx][sy+1] === 0 && !visited[sx][sy+1];
        },

        canMoveLeft: function(sx, sy, grid) {
            return sx-1 >= 0 && grid[sx-1][sy] === 0;
        },

        canMoveUp: function(sx, sy, grid) {
            return sy-1 >= 0 && grid[sx][sy-1] === 0;
        }
    };
    return backtrack;
});
