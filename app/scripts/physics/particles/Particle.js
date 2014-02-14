(function(undefined) {
    'use strict';
    
    function Particle(vector, mass, radius) {
        var self = this;
        
        this.vector = vector;
        this.mass = mass || 1;
        this.radius = radius || 0.01;
        
        this.parent = null;

        this.step = function() {
            this.vector.position.add(this.vector.movement);
        };
        
        this.getParticles = function(particles) {
            particles.push(self);
        };
        
        this.magnitude = function() {
            return this.vector.movement.magnitude();
        };
        
        this.x = function() {
            return this.vector.position.getX();
        };
        
        this.y = function() {
            return this.vector.position.getY();
        };
        
        this.vx = function() {
            return this.vector.movement.getX();
        };
        
        this.vy = function() {
            return this.vector.movement.getY();
        };
        
        this.r = function() {
            return this.radius;
        };
        
        this.m = function() {
            return this.mass;
        };
        
        this.toString = function() {
            return this.vector.toString() + ', m:' + this.m() + ', r:' + this.r();
        };
    }
    
    this.extend('tsp.physics.particles.Particle', Particle);
    
}).call(this);