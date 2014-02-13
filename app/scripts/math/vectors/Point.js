(function(Vec2D, undefined) {
    'use strict';
    
    function Point(x, y) {
        return Vec2D.create(x, y);
    }
    
    this.extend('tsp.math.vectors.Point', Point);
    
}).call(this, Vec2D);