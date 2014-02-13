(function(undefined) {
    'use strict';
    
    var Vector = tsp.math.vectors.Vector;
    var Point = tsp.math.vectors.Point;
    var Particle = tsp.physics.particles.Particle;
    
    function Wall(position, pressure, length, isHorizontal) {
        var self = this;
        
        this.vector = new Vector(position, new Point(0, pressure));
        this.length = length;
        this.isHorizontal = isHorizontal;
        
        this.get = function(i) {
            var offsetX = 0;
            var offsetY = 0;
            
            if(self.isHorizontal) {
                offsetX = i - (self.length - 1) / 2;
            }
            else {
                offsetY = i - (self.length - 1) / 2;
            }
            
            var particlePosition = new Point(self.vector.position.getX() + offsetX, self.vector.position.getY() + offsetY);
            var particleMovement = new Point(self.vector.movement.getX(), self.vector.movement.getY());
            var particleVector = new Vector(particlePosition, particleMovement);
            
            return new Particle(particleVector);
        };
        
        this.size = function() {
            return this.length;
        };
        
        this.step = function() {
            this.vector.position.add(this.vector.movement);
        };
        
    }
    
    this.extend('tsp.physics.particles.Wall', Wall);
    
}).call(this);