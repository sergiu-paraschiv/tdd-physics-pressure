(function(fabric, undefined) {
    'use strict';
    
    var Point = tsp.math.vectors.Point;
    var Vector = tsp.math.vectors.Vector;
    var Particle = tsp.physics.particles.Particle;
    var Wall = tsp.physics.particles.Wall;
    var Space = tsp.physics.particles.Space;
    var ReactiveSpace = tsp.physics.particles.ReactiveSpace;
    
    var Canvas = fabric.StaticCanvas;
    var Line = fabric.Line;
    var Circle = fabric.Circle;
    
    function Main() {
        var space;
        var canvas;
        var particle1;
        var particle2;
        var wall1, wall2, wall3, wall4;
        
        function randomBetween(min, max) {
            return min + Math.random() * max;
        }
        
        function initialize() {
            space = new ReactiveSpace(new Space());
            
            for(var i = 0; i < 100; i++) {
                particle1 = new Particle(new Vector(new Point(randomBetween(13, 14), randomBetween(13, 14)), new Point(randomBetween(-0.1, 0.1), randomBetween(-0.1, 0.1))));
                space.add(particle1);
            }

            wall1 = new Wall(new Point(8, 20), 0.01, 24, false);
            wall2 = new Wall(new Point(32, 20), -0.01, 24, false);
            wall3 = new Wall(new Point(20, 8), 0.01, 24, true);
            wall4 = new Wall(new Point(20, 32), -0.01, 24, true);
            
            space.add(wall1);
            space.add(wall2);
            space.add(wall3);
            space.add(wall4);
            
            canvas = new Canvas('canvas', {
                backgroundColor: '#000',
                renderOnAddition: false
            });
            
            fabric.Object.prototype.originX = 'center';
            fabric.Object.prototype.originY = 'center';
        }
        
        function addParticle(particle, color) {
            var vector = particle.vector;
            
            color = color || '#fff';
            
            var dimension = [
                vector.position.getX(),
                vector.position.getY(),
                vector.position.getX() + vector.movement.getX(),
                vector.position.getY() + vector.movement.getY()
            ];
            
            canvas.add(new Line(dimension, {
                stroke: color,
                strokeWidth: 1
            }));
            
            canvas.add(new Circle( {
                stroke: color,
                strokeWidth: 1,
                radius: particle.radius,
                left: vector.position.getX(),
                top: vector.position.getY()
            }));
        }
        
        function addWall(wall) {
            addParticle(wall.get((wall.size() - 1) / 2), '#ff0000');

            var dimension = [
                wall.vector.position.getX(),
                wall.vector.position.getY(),
                wall.vector.position.getX(),
                wall.vector.position.getY()
            ];
            
            if(wall.isHorizontal) {
                dimension[0] -= wall.length / 2;
                dimension[2] += wall.length / 2;
            }
            else {
                dimension[1] -= wall.length / 2;
                dimension[3] += wall.length / 2;
            }
            
            canvas.add(new Line(dimension, {
                stroke: '#ff0000',
                strokeWidth: 1
            }));
        }
        
        function redraw() {
            canvas.clear();
            
            var elements;
            for(var i = 0; i < space.size(); i++) {
                if(space.get(i) instanceof Particle) {
                    addParticle(space.get(i));
                }
                else if(space.get(i) instanceof Wall) {
                    addWall(space.get(i));
                }
            }
            
            canvas.renderAll();
        }
        
        function run() {
            initialize();
            
            space.step(100);

            redraw();
        }
        
        run.call(this);
    }
    
    Main.call(this);
    
}).call(this, fabric);