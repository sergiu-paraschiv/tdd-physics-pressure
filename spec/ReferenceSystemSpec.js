(function(undefined) {
    'use strict';

    var Point = tsp.math.vectors.Point;
    var Vector = tsp.math.vectors.Vector;
    var Particle = tsp.physics.particles.Particle;
    var Wall = tsp.physics.particles.Wall;
    var Space = tsp.physics.particles.Space;
    
    describe('Particle Space', function() {

        it('contains a Particle', function() {
            var s = new Space();
            
            var p = new Particle();
            
            s.add(p);

            expect(s.size()).toBe(1);
        });
        
        it('contains a Wall with 10 Particles for length 10', function() {
            var s = new Space();
            
            var position = new Point(0, 0);
            var w = new Wall(position, 1, 10);
            
            s.add(w);

            expect(s.size()).toBe(1);
            expect(s.get(0).size()).toBe(10);
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
    
     describe('Wall', function() {

        it('contains 10 Particles for a width of 10', function() {
            var s = new Space();
            
            var position = new Point(50, 50);
            var wall = new Wall(position, 10, 10);
            
            s.add(wall);
            
            expect(wall.size()).toBe(10);
        });
        
        it('horizontally distributes 11 Particles accros the whole length of 11', function() {
            var s = new Space();
            
            var position = new Point(50, 50);
            var wall = new Wall(position, 0, 11, true);
            
            s.add(wall);
            
            for(var i = 0; i < 11; i++) {
                expect(wall.get(i).vector.position.getX()).toBe(position.getX() + i - 5);
            }
        });
        
        it('verticallly distributes 11 Particles accros the whole length of 11', function() {
            var s = new Space();
            
            var position = new Point(50, 50);
            var wall = new Wall(position, 0, 11, false);
            
            s.add(wall);
            
            for(var i = 0; i < 11; i++) {
                expect(wall.get(i).vector.position.getY()).toBe(position.getY() + i - 5);
            }
        });
    });

}).call(this);
