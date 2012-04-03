/**
 * The AI object implements an Strategy pattern. As a consequence,
 * the user can select different 'intelligence' levels for the
 * Avatar
 */
define([
    'ai/graph/graph',
    'ai/astar',
    'ai/backtrack'
    ], function(Graph, AStar, Backtrack) {
        var AI = {
            algorithms : {},
            findPath : function(grid, sx, sy, ex, ey, type) {
                /*var graph = new Graph(grid);
                        var start = graph.nodes[sx][sy];
                        var end = graph.nodes[ex][ey];*/

                var alg = this.algorithms[type];
                return alg.search(grid, sx, sy, ex, ey);
            }
        };
        //Next, the strategies for finding the path are implemented:
        //- smart -> A* algorithm (shortest-path)
        //- dumb -> backtracking algorithm
        AI.algorithms.smart = {
            search: function(grid, sx, sy, ex, ey) {
                var graph = new Graph(grid);
                var start = graph.nodes[sx][sy];
                var end = graph.nodes[ex][ey];
                return AStar.search(graph.nodes, start, end);
            }
        };
        // @TODO Remove Array references, use []
        AI.algorithms.dumb = {
            search: function(grid, sx, sy, ex, ey) {
                var visited = new Array(grid.length);
                for (var i=0, i1=grid.length; i< i1; i++)
                    visited[i] = new Array(grid[i].length);

                for (var x=0, x1=visited.length; x<x1; x++)
                    for (var y=0, y1=visited[x].length; y<y1; y++)
                        visited[x][y] = 0;
                return Backtrack.search(grid, sx, sy, ex, ey, [], visited);
            }
        }
        return AI;
    }
);
