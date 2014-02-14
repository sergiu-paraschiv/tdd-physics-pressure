(function(undefined) {
    'use strict';

    var Point = tsp.math.vectors.Point;
    var Vector = tsp.math.vectors.Vector;
    var Particle = tsp.physics.particles.Particle;
    var Wall = tsp.physics.particles.Wall;
    var Space = tsp.physics.particles.Space;
    var ReactiveSpace = tsp.physics.particles.ReactiveSpace;
    /*
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
        
        it('moves from [0,0] to [-2,-2] in two steps when movement is [-1,-1]', function() {
            var s = new Space();
            
            var position = new Point(0, 0);
            var movement = new Point(-1, -1);
            var vector = new Vector(position, movement);
            var particle = new Particle(vector);
            
            s.add(particle);
            
            s.step(2);
            
            expect(particle.vector.position.getX()).toBe(-2);
            expect(particle.vector.position.getY()).toBe(-2);
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
    
    describe('Particle -> Particle collision detection', function() {
    
        it('will not occur between [[0,0] [1,1]] and [[10,10] [-1,-1]] in 4 steps', function() {
            var s = new ReactiveSpace(new Space());
            
            var position1 = new Point(0, 0);
            var movement1 = new Point(1, 1);
            var particle1 = new Particle(new Vector(position1, movement1));
            
            var position2 = new Point(10, 10);
            var movement2 = new Point(-1, -1);
            var particle2 = new Particle(new Vector(position2, movement2));
            
            s.add(particle1);
            s.add(particle2);
            
            s.step(3, true);
            
            var collisions = s.detectCollisions();
            
            expect(collisions.length).toBe(0);
        });
        
        it('will occur between [[0,0] [1,1]] and [[10,10] [-1,-1]] in 5 steps', function() {
            var s = new ReactiveSpace(new Space());
            
            var position1 = new Point(0, 0);
            var movement1 = new Point(1, 1);
            var particle1 = new Particle(new Vector(position1, movement1));
            
            var position2 = new Point(10, 10);
            var movement2 = new Point(-1, -1);
            var particle2 = new Particle(new Vector(position2, movement2));
            
            s.add(particle1);
            s.add(particle2);
            
            s.step(4, true);
            
            var collisions = s.detectCollisions();
            
            expect(collisions.length).toBe(1);
        });
    });
    
    describe('Particle -> Wall collision detection', function() {

        it('will occur between [[0,40] [1,0]] and [[40,40] 0 11] in 39 steps', function() {
            var s = new ReactiveSpace(new Space());
            
            var position1 = new Point(0, 40);
            var movement = new Point(1, 0);
            var particle = new Particle(new Vector(position1, movement));
            
            var position2 = new Point(40, 40);
            var wall = new Wall(position2, 0, 11, false);
            
            s.add(particle);
            s.add(wall);
            
            s.step(39, true); 
            
            var collisions = s.detectCollisions();
            
            expect(collisions.length).toBe(1);
            
            expect(collisions[0].objects.length).toBe(2);
            expect(collisions[0].objects[0]).toBe(particle);
            expect(collisions[0].objects[1].parent).toBe(wall);
        });
    });
    
    describe('Particle -> Particle collision reaction', function() {

        it('[head-on#1] will occur in 6 steps', function() {
            var s = new ReactiveSpace(new Space());
            
            var position1 = new Point(0, 0);
            var movement1 = new Point(10, 10);
            var particle1 = new Particle(new Vector(position1, movement1));
            
            var position2 = new Point(100, 100);
            var movement2 = new Point(-10, -10);
            var particle2 = new Particle(new Vector(position2, movement2));
            
            s.add(particle1);
            s.add(particle2);
            
            s.step(6);

            expect(position1.getX()).toBe(20);
            expect(position1.getY()).toBe(20);
            
            expect(position2.getX()).toBe(80);
            expect(position2.getY()).toBe(80);
            
            expect(Math.round(movement1.getX())).toBe(-10);
            expect(Math.round(movement1.getY())).toBe(-10);
            
            expect(Math.round(movement2.getX())).toBe(10);
            expect(Math.round(movement2.getY())).toBe(10);
        });
        
        it('[head-on#2] will occur in 6 steps', function() {
            var s = new ReactiveSpace(new Space());
            
            var position1 = new Point(10, 0);
            var movement1 = new Point(10, 10);
            var particle1 = new Particle(new Vector(position1, movement1));
            
            var position2 = new Point(10, 100);
            var movement2 = new Point(10, -10);
            var particle2 = new Particle(new Vector(position2, movement2));
            
            s.add(particle1);
            s.add(particle2);
            
            s.step(6);

            expect(position1.getY()).toBe(20);
            expect(position2.getY()).toBe(80);
            
            expect(Math.round(movement1.getY())).toBe(-10);
            expect(Math.round(movement2.getY())).toBe(10);
        });
    });
    
    describe('Particle -> Wall collision reaction', function() {

        it('will occur between [[0,30] [10,0]] and [[40,40] 0 101] in 3 steps', function() {
            var s = new ReactiveSpace(new Space());
            
            var position1 = new Point(0, 30);
            var movement = new Point(10, 0);
            var particle = new Particle(new Vector(position1, movement));
            
            var position2 = new Point(40, 40);
            var wall = new Wall(position2, 0, 101, false);
            
            s.add(particle);
            s.add(wall);
            
            s.step(3);
            
            expect(position1.getX()).toBe(30);
            expect(Math.round(movement.getX())).toBe(-10);
        });
        
        it('will occur between [[0,30] [1,0]] and [[40,40] -1 101] in 39 steps', function() {
            var s = new ReactiveSpace(new Space());
            
            var position1 = new Point(0, 30);
            var movement = new Point(1, 0);
            var particle = new Particle(new Vector(position1, movement));
            
            var position2 = new Point(40, 40);
            var wall = new Wall(position2, -1, 101, false);
            
            s.add(particle);
            s.add(wall);
            
            s.step(39);
            
            expect(position1.getX()).toBe(39);
            expect(Math.round(movement.getX())).toBe(-1);
        });
    });
    */
    
    describe('QQQ', function() {
        it('zzz', function() {
            function randomBetween(min, max) {
                return min + Math.random() * max;
            }
            
            function avgSpeed(space) {
                var avg = 0;
                var n = 0;
                
                for(var i = 0; i < space.size(); i++) {
                    if(space.get(i) instanceof Particle) {
                        avg += space.get(i).magnitude();
                        n += 1;
                    }
                }
                
                return avg / n;
            }
            
            var space = new ReactiveSpace(new Space());
        
            var particle;
            for(var i = 0; i < 100; i++) {
                particle = new Particle(new Vector(new Point(randomBetween(10, 20), randomBetween(10, 20)), new Point(randomBetween(-0.1, 0.1), randomBetween(-0.1, 0.1))));
                space.add(particle);
            }

            var wall1 = new Wall(new Point(8, 20), 0.01, 24, false);
            var wall2 = new Wall(new Point(32, 20), -0.01, 24, false);
            var wall3 = new Wall(new Point(20, 8), 0.01, 24, true);
            var wall4 = new Wall(new Point(20, 32), -0.01, 24, true);
            
            space.add(wall1);
            space.add(wall2);
            space.add(wall3);
            space.add(wall4);
            
            console.log(avgSpeed(space));
            
            space.step(1000);
            
            console.log(avgSpeed(space));
        });
    });

}).call(this);
