(function(undefined) {
    'use strict';
    
    function Space() {
        var self = this;
        
        this.objects = [];
        
        function takeOneStep() {
            for(var i in self.objects) {
                self.objects[i].step();
            }
        }
        
        this.add = function(object) {
            this.objects.push(object);
        };
        
        this.get = function(i) {
            return this.objects[i];
        };
        
        this.size = function() {
            return this.objects.length;
        };
        
        this.step = function(time) {
            for(var i = 0; i < time; i++) {
                takeOneStep();
            }
        };
    }
    
    this.extend('tsp.physics.particles.Space', Space);
    
}).call(this);