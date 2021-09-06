function start(){
	
	var pos, $id=function(d){ return document.getElementById(d);};
	
	
	var tierra = new PhiloGL.O3D.Sphere(
		{
			
			nlat:30,
			nlong:30,
			radius:3,
			textures: 'https://lizgar.github.io/A3D/js/earth.jpg'
		}
	);
	
	
PhiloGL('glCanvas',
		{
	camera: {
		position: {
			x:0, y:0, z:-10
		}
	},
	
	textures:{
		
		src: ['https://lizgar.github.io/A3D/js/earth.jpg'],
		parameters: [{
			name: 'TEXTURE_MAG_FILTER',
			value: 'LINEAR'
		},{
			
			name: 'TEXTURE_MIN_FILTER',
			value: 'LINEAR_MIPMAP_NEAREST',
			generateMipmap: true
		}
			
		]
	},
	
	//Eventos Mouse
	 events: {
		 
		 onDragStart: function(e){
			 
			pos ={
				
				x: e.x,
				y: e.y
			}; 
		 },
		 
		onDragMove: function(e){
			var z = this.camera.position.z,
            sign = Math.abs(z) / z;
			
			tierra.rotation.y += -(pos.x - e.x) / 100;
			tierra.rotation.x += sign * (pos.y - e.y) / 100;
       		tierra.update();
        	pos.x = e.x;
        	pos.y = e.y;
			},
		 
		onMouseWheel: function(e) {
			e.stop();
			var camera = this.camera;
			camera.position.z += e.wheel;
			camera.update();
      		}
		 
},
//Fin evento mouse	
	
	onLoad: function(app){
		
		var gl= app.gl,
			program = app.program,
			scene = app.scene,
			canvas = app.canvas,
			camera = app.camera;
		
		//Iluminación
		lighting = $id('luz'),
          ambient = {
            r: 0.5,
            g: 0.4,
            b: 0.4
          },
          direction = {
            x: -1.0,
            y: -1.0,
            z: -1.0,
          
            r: 0.0,
            g: 1.0,
            b: 1.0
          };
		//Fin Iluminación
		
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.viewport(0,0, +canvas.width, +canvas.height);
	
		tierra.rotation.x=3.15;
		tierra.rotation.y=0.3;
		tierra.update();
		scene.add(tierra);
		draw();
		
		function draw(){
			
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPHT_BUFFER_BIT);
			
			//Visualización
			var lights = scene.config.lights;
        	/*lights.enable = lighting.checked;*/
        	/*lights.ambient = {
          		r: +ambient.r,
          		g: +ambient.g,
          		b: +ambient.b
			};
        	lights.directional = {
          		color: {
            		r: +direction.r,
            		g: +direction.g,
            		b: +direction.b
				},
				direction: {
            		x: +direction.x,
            		y: +direction.y,
            		z: +direction.z
          		}
        	};*/
			//Fin Visualización 
			
			scene.render();
			
			PhiloGL.Fx.requestAnimationFrame(draw);
		}
		
		
	}
	
	
} );
}
