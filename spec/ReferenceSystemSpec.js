(function(undefined) {
    'use strict';

    var Point = tsp.math.vectors.Point;
    var Vector = tsp.math.vectors.Vector;
    var Particle = tsp.physics.particles.Particle;
    var Space = tsp.physics.particles.Space;
    
    describe('Particle Space', function() {

        it('contains a Particle', function() {
            var s = new Space();
            
            var p = new Particle();
            
            s.add(p);

            expect(s.objects.length).toBe(1);
        });
        
    });
    
    describe('Particle', function() {

        it('moves from [0,0] to [1,1] in one step when movement is [1,1]', function() {
            var s = new Space();
            
            var position = new Point(0, 0);
            var movement = new Point(1, 1);
            var vector = new Vector(position, movement);
            var particle = new Particle(vector);
            
            s.add(particle);
            
            s.step(1);
            
            expect(particle.vector.position.getX()).toBe(1);
            expect(particle.vector.position.getY()).toBe(1);
        });
        
        it('moves from [0,0] to [2,2] in one step when movement is [2,2]', function() {
            var s = new Space();
            
            var position = new Point(0, 0);
            var movement = new Point(2, 2);
            var vector = new Vector(position, movement);
            var particle = new Particle(vector);
            
            s.add(particle);
            
            s.step(1);
            
            expect(particle.vector.position.getX()).toBe(2);
            expect(particle.vector.position.getY()).toBe(2);
        });
        
        it('moves from [0,0] to [2,2] in two steps when movement is [1,1]', function() {
            var s = new Space();
            
            var position = new Point(0, 0);
            var movement = new Point(1, 1);
            var vector = new Vector(position, movement);
            var particle = new Particle(vector);
            
            s.add(particle);
            
            s.step(2);
            
            expect(particle.vector.position.getX()).toBe(2);
            expect(particle.vector.position.getY()).toBe(2);
        });
        
    });

}).call(this);
