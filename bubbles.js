var rawHexR = "6789ABCD"; // numbers to use as a basis for generating #RR----
var rawHexG = "9ABCDE"; // numbers to use as a basis for generating #--GG--
var rawHexB = "CDEF"; // numbers to use as a basis for generating #----BB

/* simple start sphere with text */
AFRAME.registerComponent('startbubble', {
	
	schema: {
		radius: {type: 'number', default: 1},
		color: {type: 'color', default:'#00CCFF' }
	},
  
	init: function() {
		var el = this.el;
		var data = this.data;
		var popSound = document.getElementById('popsound');
		
		this.geometry = new THREE.SphereBufferGeometry(data.radius, 50, 50);
		this.material = new THREE.MeshStandardMaterial({color: data.color, transparent: true, depthWrite: false, opacity: 0.5});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		
		el.setObject3D('mesh', this.mesh);
		
		/* on click, play 'pop' sound and remove this component */
		el.addEventListener('click', function() {
			setInterval(createBubbles, 3000);
			popSound.components.sound.playSound();
			el.parentNode.removeChild(el);
			
		});
		    
	},   
	
	remove: function() {
		this.el.removeObject3D('mesh');	
		
	}
  
});


/* simple one-colour sphere
   pops on click */
AFRAME.registerComponent('bubble', {
	
	schema: {
		radius: {type: 'number', default: 1}
	},
  
	init: function() {
		var el = this.el;
		var data = this.data;
		var popSound = document.getElementById('popsound');
		
		this.geometry = new THREE.SphereBufferGeometry(data.radius, 50, 50);
		this.material = new THREE.MeshStandardMaterial({color: getRandomColor(), transparent: true, depthWrite: false, opacity: 0.5});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		
		el.setAttribute('position', getRandomPosition());
		el.setObject3D('mesh', this.mesh);
		
		/* on click, play 'pop' sound and remove this component */
		el.addEventListener('click', function() {
			
			popSound.components.sound.playSound();
			el.parentNode.removeChild(el);
			
		});
		    
	},   
	
	remove: function() {
		this.el.removeObject3D('mesh');	
		
	}
  
});

/* generate a pseudo-random pastelly hex colour */
function getRandomColor(){
	
	var c = '#'; 
	
	/* add red */
	for (var i = 0; i < 2; i++){
		c += rawHexR[Math.floor((Math.random() * 8))];
	}
	
	/* add green */
	for (var i=0; i < 2; i++){
		c += rawHexG[Math.floor((Math.random() * 6))];
	}
	
	/* add blue */
	for (var i=0; i < 2; i++){
	c += rawHexB[Math.floor((Math.random() * 4))];
	}
	
	return c;	
}

function getRandomPosition(){
	
	// generate x, y, z coordinates
	var x = (Math.floor((Math.random() * 20))) - 10;
	var y = (Math.floor((Math.random() * 20))) - 10;
	var z = (Math.floor((Math.random() * 20))) - 10;

	return {x, y, z};	
	
}


/* make a bubble and add it to the page */
function createBubbles(){
		var p = document.getElementById('scene')
		
		var newBubble = document.createElement('a-entity');
		newBubble.setAttribute('bubble', 'radius: 1');
		p.appendChild(newBubble);
}