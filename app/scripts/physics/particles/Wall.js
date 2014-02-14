(function(undefined) {
    'use strict';
    
    var Vector = tsp.math.vectors.Vector;
    var Point = tsp.math.vectors.Point;
    var Particle = tsp.physics.particles.Particle;
    
    function Wall(position, pressure, length, isHorizontal) {
        var self = this;
        
        this.setPressure = function(pressure) {
            var movement;
            
            self.pressure = pressure;
            
            if(self.isHorizontal) {
                movement = new Point(0, self.pressure / self.length);
            }
            else {
                movement = new Point(self.pressure / self.length, 0);
            }
            
            self.vector = new Vector(position, movement);
        };
        
        this.decreasePressure = function() {
            var newPressure = self.pressure;
            var pressurePoint = Math.abs(self.pressure / self.length);

            if(newPressure > 0) {
                newPressure -= pressurePoint;
            }
            else if(newPressure < 0) {
                newPressure += pressurePoint;
            }
            
            self.setPressure(newPressure);
        };
        
        this.length = length;
        this.isHorizontal = isHorizontal;

        this.pressure = null;
        this.vector = null;
        
        this.setPressure(pressure);

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
            var movementPosition = new Point(self.vector.movement.getX(), self.vector.movement.getY());
            var particleVector = new Vector(particlePosition, movementPosition);
            
            var particle = new Particle(particleVector);
            particle.parent = self;
            particle.mass = self.length;
            return particle;
        };
        
        this.size = function() {
            return this.length;
        };
        
        this.step = function() {
            this.vector.position.add(this.vector.movement);
        };
        
        this.getParticles = function(particles) {
            for(var i = 0; i < self.length; i++) {
                particles.push(self.get(i));
            }
        };
        
    }
    
    this.extend('tsp.physics.particles.Wall', Wall);
    
}).call(this);