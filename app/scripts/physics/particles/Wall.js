(function(undefined) {
    'use strict';
    
    var Vector = tsp.math.vectors.Vector;
    var Point = tsp.math.vectors.Point;
    var Particle = tsp.physics.particles.Particle;
    
    function Wall(vector, length, isHorizontal) {
        var self = this;
        
        this.vector = vector;
        this.length = length;
        
        this.particles = [];
        
        function initialize() {
            var particleVector, particlePosition, particleMovement;
            var offsetX, offsetY;
            
            for(var i = 0; i < length; i++) {
            
                offsetX = 0;
                offsetY = 0;
                
                if(isHorizontal) {
                    offsetX = i - (length - 1) / 2;
                }
                else {
                    offsetY = i - (length - 1) / 2;
                }
            
                particlePosition = new Point(self.vector.position.getX() + offsetX, self.vector.position.getY() + offsetY);
                particleMovement= new Point(self.vector.movement.getX() + offsetX, self.vector.movement.getY() + offsetY);
                particleVector = new Vector(particlePosition, particleMovement);
                
                self.particles.push(new Particle(particleVector));
            }
        }
        
        this.step = function() {
            
        };
        
        initialize.call(this);
    }
    
    this.extend('tsp.physics.particles.Wall', Wall);
    
}).call(this);