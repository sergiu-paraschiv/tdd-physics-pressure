(function(undefined) {
    'use strict';
    
    function Vector(position, movement) {
        this.position = position;
        this.movement = movement;
        
        this.toString = function() {
            return this.position.toString() + '->' + this.movement.toString();
        };
    }
    
    this.extend('tsp.math.vectors.Vector', Vector);
    
}).call(this);