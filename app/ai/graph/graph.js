/* 	graph.js http://github.com/bgrins/javascript-astar
	MIT License

	Creates a Graph class used in the astar search algorithm.
	Includes Binary Heap (with modifications) from Marijn Haverbeke
		URL: http://eloquentjavascript.net/appendix2.html
		License: http://creativecommons.org/licenses/by/3.0/
*/
define([
    './graphnode'
    ], 
    function(GraphNode) {

        function Graph(grid) {
            this.elements = grid;
            this.nodes = [];

            for (var x = 0, len = grid.length; x < len; ++x) {
                var row = grid[x];
                this.nodes[x] = [];
                for (var y = 0, l = row.length; y < l; ++y) {
                    this.nodes[x].push(new GraphNode(x, y, row[y]));
                }
            }
        }
        
        Graph.prototype.toString = function() {
            var graphString = "\n";
            var nodes = this.nodes;
            for (var x = 0, len = nodes.length; x < len; ++x) {
                var rowDebug = "";
                var row = nodes[x];
                for (var y = 0, l = row.length; y < l; ++y) {
                    rowDebug += row[y].type + " ";
                }
                graphString = graphString + rowDebug + "\n";
            }
            return graphString;
        };
        
        return Graph;
    }
);
