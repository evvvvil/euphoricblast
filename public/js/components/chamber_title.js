AFRAME.registerComponent('chamber_title', {
	dependencies: ['evil'],
	schema: {		
		id: {type: 'string'},		
		class: {type: 'string'},
		title: {type: 'string'},
		position: {type:'vec3'},
		rotation: {type:'vec3'},
		speed: {type:'number',default:500},
		autostart: {type:'boolean',default:false},
	},
	init: function () {		
			var data = this.data, el = this.el,evil=this.evil=document.querySelector('[evil]').components.evil;

			el.setAttribute("id",data.id);
			if(data.class!='') el.setAttribute("class",data.class);
			if(data.position!='') el.setAttribute("position",data.position);
			if(data.rotation!='') el.setAttribute("rotation",data.rotation);
			if(data.title!='') el.setAttribute("text",data.title);
			el.setAttribute("scale","0 0 0");
			
			evil.createAnimation("fadein-"+data.id,el,"scale","fade-in","fade-stop","1 1 1",data.speed);
			evil.createAnimation("fadeout-"+data.id,el,"scale","fade-out","fade-stop","0 0 0",data.speed);
			//this.handleTitleAnimationEnd = AFRAME.utils.bind(this.handleTitleAnimationEnd, this);
			el.addEventListener('animationend',this.handleTitleAnimationEnd);
			if(data.autostart) el.emit("fade-in",null,false);
			
		//console.log("after ");
	},
	handleTitleAnimationEnd: function (event){
		event.stopPropagation();	
	}
}); 