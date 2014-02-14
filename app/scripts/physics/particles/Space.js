(function(undefined) {
    'use strict';
    
    function Space() {
        var self = this;
        
        this.objects = [];
        
        function takeOneStep() {
            for(var i = 0; i < self.objects.length; i++) {
                self.objects[i].step();
            }
        }
        
        this.add = function(object) {
            self.objects.push(object);
        };
        
        this.get = function(i) {
            return self.objects[i];
        };
        
        this.size = function() {
            return self.objects.length;
        };
        
        this.step = function(time) {
            for(var i = 0; i < time; i++) {
                takeOneStep();
            }
        };
    }
    
    this.extend('tsp.physics.particles.Space', Space);
    
}).call(this);