(function(fabric, undefined) {
    'use strict';
    
    var Point = tsp.math.vectors.Point;
    var Vector = tsp.math.vectors.Vector;
    var Particle = tsp.physics.particles.Particle;
    var Wall = tsp.physics.particles.Wall;
    var Space = tsp.physics.particles.Space;
    
    var Canvas = fabric.StaticCanvas;
    var Line = fabric.Line;
    var Circle = fabric.Circle;
    
    function Main() {
        var space;
        var canvas;
        var particle;
        var wall;
        
        function initialize() {
            space = new Space();
            
            particle = new Particle(new Vector(new Point(10, 10), new Point(10, 10)));
            wall = new Wall(new Point(200, 50), 10, 101, true);
            
            space.add(particle);
            space.add(wall);
            
            canvas = new Canvas('canvas', {
                backgroundColor: '#000',
                renderOnAddition: false
            });
            
            fabric.Object.prototype.originX = 'left';
            fabric.Object.prototype.originY = 'top';
        }
        
        function addParticle(particle, color) {
            var vector = particle.vector;
            
            color = color || '#fff';
            
            var dimension = [
                0,
                0,
                vector.movement.getX(),
                vector.movement.getY()
            ];
            
            canvas.add(new Line(dimension, {
                stroke: color,
                strokeWidth: 1,
                left: vector.position.getX(),
                top: vector.position.getY()
            }));
            
            canvas.add(new Circle( {
                stroke: color,
                strokeWidth: 1,
                radius: 3,
                left: vector.position.getX() + vector.movement.getX() - 2,
                top: vector.position.getY() + vector.movement.getY() - 2
            }));
        }
        
        function addWall(wall) {
            addParticle(wall.get((wall.size() - 1) / 2), '#ff0000');

            var dimension = [0, 0, 0, 0];
            
            if(wall.isHorizontal) {
                dimension[2] = wall.size();
            }
            else {
                dimension[3] = wall.size();
            }
            
            canvas.add(new Line(dimension, {
                stroke: '#ff0000',
                strokeWidth: 1,
                left: wall.get(0).vector.position.getX(),
                top: wall.get(0).vector.position.getY()
            }));
        }
        
        function redraw() {
            canvas.clear();
            
            var elements;
            for(var i = 0; i < space.objects.length; i++) {
                if(space.objects[i] instanceof Particle) {
                    addParticle(space.objects[i]);
                }
                else if(space.objects[i] instanceof Wall) {
                    addWall(space.objects[i]);
                }
            }
            
            canvas.renderAll();
        }
        
        function run() {
            initialize();
            
            space.step(4);
            
            redraw();
        }
        
        run.call(this);
    }
    
    Main.call(this);
    
}).call(this, fabric);