AFRAME.registerComponent('chamber_video', {
	dependencies: ['evil'],
	schema: {		
		id: {type: 'string'},
		width: {type: 'string'},
		height: {type: 'string'},
		material: {type: 'string'},
		position: {type:'vec3'},
		rotation: {type:'vec3'},		
	},
	init: function () {		
		var data = this.data, el = this.el,evil=this.evil=document.querySelector('[evil]').components.evil;
		el.setAttribute("id",data.id+"-group");
		el.setAttribute("position",data.position);
		el.setAttribute("rotation",data.rotation);
		el.setAttribute("scale","0 0 0");
		var vi=document.createElement("a-video");
			vi.setAttribute("id",data.id);
			vi.setAttribute("src","#project-video-file");
			vi.setAttribute("width",data.width);
			vi.setAttribute("height",data.height);
		evil.createAnimation("fade-in",el,"scale","fade-in","fade-stop","1 1 1","2000"); 	
		evil.createAnimation("fade-out",el,"scale","fade-out","fade-stop","0 0 0","500");		
		el.appendChild(vi);

		//VIDEO OVERLAY
		/*var ov = evil.createEntity(el,{'id':data.id+'-overlay','geometry':'primitive:plane;width:'+(data.width)+';height:'+(data.height),
			'position':'0 0 0.002','material':'src:#video-placeholder-image;shader:flat'});
			evil.createAnimation("fadeout-overlay",ov,"scale","overlay-out","overlay-stop","1 0 1","500");
			ov.addEventListener('animationcomplete', evil.stopanimationcompletePropagation);*/

		//VIDEO BACKGROUND
		evil.createEntity(el,{'id':data.id+'-background',
			'geometry':'primitive:plane;width:'+(data.width+0.04)+';height:'+(data.height+0.025),
			'position':'0 0 -0.005','material':'color:#333'});		

		//this.handleVideoanimationcomplete = AFRAME.utils.bind(this.handleVideoanimationcomplete, this);
		el.addEventListener('animationcomplete', this.handleVideoanimationcomplete);			
	},
	handleVideoanimationcomplete: function(event){
	var animID=event.detail.name;animID=animID.substring(11,animID.length);	
		if(animID.startsWith("fade-out")){
			var videoEl=document.querySelector("#project-video-file");
			videoEl.pause();			
			videoEl.setAttribute("src","/videos/small_video.mp4");
			videoEl.load();
			videoEl.pause();
			//document.querySelector("#project-video-overlay").setAttribute("scale","1 1 1");
		}else{
			document.querySelector("#project-video-file").play();
			//document.querySelector("#project-video-overlay").emit("overlay-out",null,false);
		}
		event.stopPropagation();	
	}
}); 