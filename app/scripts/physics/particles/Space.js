(function(undefined) {
    'use strict';
    
    function Space() {
        var self = this;
        
        this.particles = [];
        
        function takeOneStep() {
            for(var i in self.particles) {
                self.particles[i].step();
            }
        }
        
        this.add = function(particle) {
            this.particles.push(particle);
        };
        
        this.step = function(time) {
            for(var i = 0; i < time; i++) {
                takeOneStep();
            }
        };
    }
    
    this.extend('tsp.physics.particles.Space', Space);
    
}).call(this);