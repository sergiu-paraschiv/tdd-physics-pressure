(function(Vector2, undefined) {
    'use strict';
    
    function ReactiveSpace(space) {
        var self = this;
        
        this.space = space;
        
        function getParticles(particles) {
            for(var i in self.space.objects) {
                self.space.objects[i].getParticles(particles);
            }
        }
        
        function stepsUntilObjectsWillCollide(b1, b2) {
            var square = function(n) {
                return Math.pow(n, 2);
            };
            
            var sqrt = function(n) {
                return Math.sqrt(n);
            };
            
            var a = square(b2.vx() - b1.vx()) + square(b2.vy() - b1.vy());
            var b = 2 * ((b2.x() - b1.x()) * (b2.vx() - b1.vx()) + (b2.y() - b1.y()) * (b2.vy() - b1.vy()));
            var c = square(b2.x() - b1.x()) + square(b2.y() - b1.y()) - square(b1.r() + b2.r());
            var det = square(b) - 4 * a * c;
            
            if(a !== 0) {
                var t = (-b - sqrt(det)) / (2 * a);
                
                if(t >= 0) {
                    return t;
                }
            }
            
            return 2;
        }
        
        function addWallCollision(wallParticle, particle, steps, wallCollisions) {
            var wall = wallParticle.parent;
            
            if(wallCollisions[wall.vector.position.toString()]) {
                if(wallCollisions[wall.vector.position.toString()].steps < steps) {
                    return;
                }
            }
            
            wallCollisions[wall.vector.position.toString()] = {
                particle: particle,
                wallParticle: wallParticle,
                steps: steps
            };
        }
        
        function detectCollisions() {
            var particles = [];
            var particleCollisions = [];
            var wallCollisions = {};
            var b1, b2;
            var steps;
            
            getParticles(particles);
            
            for(var i = 0; i < particles.length; i++) {
                for(var j = i + 1; j < particles.length; j++) {
                    if(particles[i].parent === null || particles[j].parent === null || particles[i].parent !== particles[j].parent) {
                        steps = stepsUntilObjectsWillCollide(particles[i], particles[j]);

                        if(steps <= 1) {
                            b1 = particles[i];
                            b2 = particles[j];
                            
                            if(b1.parent) {
                                addWallCollision(b1, b2, steps, wallCollisions);
                            }
                            else if(b2.parent) {
                                addWallCollision(b2, b1, steps, wallCollisions);
                            }
                            else {
                                particleCollisions.push({
                                    objects: [b1, b2]
                                });
                            }
                        }
                    }
                }
            }
            
            for(var wallId in wallCollisions) {
                particleCollisions.push({
                    objects: [
                        wallCollisions[wallId].particle,
                        wallCollisions[wallId].wallParticle
                    ]
                });
            }
            
            return particleCollisions;
        }
        
        function handleCollision(a, b) {
            if(a.m() === 0 && b.m() === 0) {
                return;
            }
            
            var b1 = a.vector.position.clone();
            var b2 = b.vector.position.clone();
            
            b1.subtract(a.vector.movement);
            b2.subtract(b.vector.movement);
            
            var v_n = b2.minusNew(b1);
            var v_un = v_n.clone().normalise();
            var v_ut = new Vector2(-v_un.y, v_un.x);
            
            var v1n = v_un.dot(a.vector.movement);
            var v1t = v_ut.dot(a.vector.movement);
            var v2n = v_un.dot(b.vector.movement);
            var v2t = v_ut.dot(b.vector.movement);
            
            var v1tPrime = v1t;
            var v2tPrime = v2t;
            
            var v1nPrime = (v1n * (a.m() - b.m()) + 2 * b.m() * v2n) / (a.m() + b.m());
            var v2nPrime = (v2n * (b.m() - a.m()) + 2 * a.m() * v1n) / (a.m() + b.m());
            
            var v_v1nPrime = v_un.multiplyNew(v1nPrime);
            var v_v1tPrime = v_ut.multiplyNew(v1tPrime);
            var v_v2nPrime = v_un.multiplyNew(v2nPrime);
            var v_v2tPrime = v_ut.multiplyNew(v2tPrime);
            
            if(a.parent) {
                a.parent.decreasePressure();
            }
            else {
                a.vector.movement.x = v_v1nPrime.x + v_v1tPrime.x;
                a.vector.movement.y = v_v1nPrime.y + v_v1tPrime.y;
            }
            
            if(b.parent) {
                console.log('w');
                b.parent.decreasePressure();
            }
            else {
                console.log('x');
                b.vector.movement.x = v_v2nPrime.x + v_v2tPrime.x;
                b.vector.movement.y = v_v2nPrime.y + v_v2tPrime.y;
            }
        }
        
        function takeOneStep(doNotResolveCollisions) {
            var i;
            
            self.space.step(1);
            
            var collisions = self.detectCollisions();
            
            if(!doNotResolveCollisions) {
                for(i = 0; i < collisions.length; i++) {
                    handleCollision(collisions[i].objects[0], collisions[i].objects[1]);
                }
            }
        }
        
        this.step = function(time, doNotResolveCollisions) {
            for(var i = 0; i < time; i++) {
                takeOneStep(doNotResolveCollisions);
            }
        };
        
        this.add = self.space.add;
        this.get = self.space.get;
        this.size = self.space.size;
        this.detectCollisions = detectCollisions;
    }
    
    this.extend('tsp.physics.particles.ReactiveSpace', ReactiveSpace);
    
}).call(this, Vector2);