(function(undefined) {
    'use strict';
    
    function Particle(vector) {
        this.vector = vector;

        this.step = function() {
            this.vector.position.add(this.vector.movement);
        };
    }
    
    this.extend('tsp.physics.particles.Particle', Particle);
    
}).call(this);