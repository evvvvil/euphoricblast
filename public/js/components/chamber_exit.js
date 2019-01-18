AFRAME.registerComponent('chamber_exit', {
	dependencies: ['evil'],
	schema: {		
		id: {type: 'string'},
		position: {type:'vec3'},
		rotation: {type:'vec3'}
	},
	init: function () {		
	var data = this.data, el = this.el,evil=this.evil=document.querySelector('[evil]').components.evil;

	el.setAttribute("id",data.id);
	el.setAttribute("position",data.position);
	el.setAttribute("rotation",data.rotation);

	var chex=evil.createEntity(el,{'id':'chamber-exit','geometry':'#chamber-exit-model','position':'0 -1 0','scale':'1 0 1'});
	evil.createAnimation("fadein-chamber-exit",chex,"scale","fade-in","fade-stop","1 1 1","1000");
	evil.createAnimation("fadein-pos-chamber-exit",chex,"position","fade-in","fade-stop","0 0 0","1000");
	evil.createAnimation("fadeout-chamber-exit",chex,"scale","fade-out","fade-stop","1 0 1","1000");
	evil.createAnimation("fadeout-pos-chamber-exit",chex,"position","fade-out","fade-stop","0 -1 0","1000");
	evil.createAnimation("slideout-chamber-exit",chex,"position","slide-out","slide-stop","0 0 -1","1000");
	this.handleFadeanimationcomplete = AFRAME.utils.bind(this.handleFadeanimationcomplete, this);
	chex.addEventListener('animationcomplete', this.handleFadeanimationcomplete);	
	
	var exitFrameOptions={
			'id': 'chamber-exit-frame',
			'class': 'Exits',			
			'geometry': 'primitive:plane;width:0.95;height:0.80',
			'title':'EXIT',
			'width': '5',
			'material':'#exit-background-mat',
			'hover': '#exit-background-hover',
			'position': '-1.92 0.45 -0.66',
			'rotation': '0 90 0',
			'textshift':'0.03 -0.25'
		};
	evil.createEntityWithComponent("exit_frame",el,exitFrameOptions);
    
	},
	handleFadeanimationcomplete: function () {
		var data = this.data, el = this.el,evil=this.evil,
		animID=event.detail.name;animID=animID.substring(11,animID.length);
		if(animID.startsWith("fadein-pos")){
			document.querySelector("#chamber-exit-frame").emit('fade-in',null,false); 		
		} 		
		event.stopPropagation();
	}
}); 