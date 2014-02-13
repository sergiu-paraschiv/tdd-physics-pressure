(function(fabric, undefined) {
    'use strict';
    
    var Point = tsp.math.vectors.Point;
    var Vector = tsp.math.vectors.Vector;
    var Particle = tsp.physics.particles.Particle;
    var Space = tsp.physics.particles.Space;
    
    var Canvas = fabric.StaticCanvas;
    var Line = fabric.Line;
    var Circle = fabric.Circle;
    
    var space;
    var canvas;
    
    function initialize() {
        space = new Space();
        
        var position = new Point(30, 30);
        var movement = new Point(10, 10);
        var vector = new Vector(position, movement);
        var particle = new Particle(vector);
        
        space.add(particle);
        
        canvas = new Canvas('canvas', {
            backgroundColor: '#000',
            renderOnAddition: false
        });
        
        fabric.Object.prototype.originX = 'left';
        fabric.Object.prototype.originY = 'top';
    }
    
    function addLine(vector) {
        var dimension = [
            0,
            0,
            vector.movement.getX(),
            vector.movement.getY()
        ];
        
        canvas.add(new Line(dimension, {
            stroke: '#fff',
            strokeWidth: 1,
            left: vector.position.getX(),
            top: vector.position.getY()
        }));
        
        canvas.add(new Circle( {
                stroke: '#fff',
                strokeWidth: 1,
                radius: 2,
                left: vector.position.getX() + vector.movement.getX(),
                top: vector.position.getY() + vector.movement.getY()
        }));
    }
    
    function redraw() {
        canvas.clear();
        
        var elements;
        for(var i in space.objects) {
            addLine(space.objects[i].vector);
        }
        
        canvas.renderAll();
    }
    
    function Main() {
        initialize();
        
        space.step(4);
        
        redraw();
    }
    
    Main.call(this);
    
}).call(this, fabric);