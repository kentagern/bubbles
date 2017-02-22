
/* simple one-colour sphere
   pops on click */
AFRAME.registerComponent('bubble', {
	schema: {
		radius: {type: 'number', default: 1},
		color: {type: 'color', default: '#6699FF'}
	},
  
	init: function() {
		var el = this.el;
		var data = this.data;
		var scene = new THREE.Scene();
		var popSound = document.querySelector('#popsound');
		
		this.geometry = new THREE.SphereBufferGeometry(data.radius, 50, 50);
		this.material = new THREE.MeshStandardMaterial({color: data.color});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		
		el.setAttribute('position', '0 1.25 -5');
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
