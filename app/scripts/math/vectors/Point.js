(function(Vector2, undefined) {
    'use strict';
    
    function Point(x, y) {
        return new Vector2(x, y);
    }
    
    this.extend('tsp.math.vectors.Point', Point);
    
}).call(this, Vector2);