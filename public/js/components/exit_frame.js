AFRAME.registerComponent('exit_frame', {
	dependencies: ['evil'],
	schema: {
		id: {type: 'string'},
		class: {type: 'string'},
    	geometry: {type: 'string'},
		width: {type: 'string',default:'1.2'},
		height: {type: 'string',default:'auto'},
		material: {type: 'string'},
		hover: {type: 'string'},
		position: {type:'vec3'},
		rotation: {type:'vec3'},
		scale: {type:'vec3',default:{x: 0, y: 0, z: 0}},
		title: {type:'string'},
		align: {type:'string',default:'center'},
		vertical: {type:'boolean',default:false},
		textflip: {type:'boolean',default:false},
		textshift: {type:'vec2'}
	},	
	init: function () {		
		var data = this.data, el = this.el,evil=this.evil=document.querySelector('[evil]').components.evil;
		el.setAttribute("id",data.id);
		el.setAttribute("class",data.class);
		el.setAttribute("position",data.position);
		el.setAttribute("rotation",data.rotation);
		el.setAttribute("scale",data.scale);

		this.handleFrameEnter = AFRAME.utils.bind(this.handleFrameEnter, this);
		this.handleFrameLeave = AFRAME.utils.bind(this.handleFrameLeave, this);
		el.addEventListener('mouseenter',this.handleFrameEnter);
		el.addEventListener('mouseleave',this.handleFrameLeave);

		this.handleFrameanimationcomplete = eval("this.handle"+data.class+"animationcomplete");		
		if(this.handleFrameanimationcomplete!==undefined) {
			this.handleFrameanimationcomplete = AFRAME.utils.bind(this.handleFrameanimationcomplete, this);
			el.addEventListener('animationcomplete', this.handleFrameanimationcomplete);	
		}else{
			el.addEventListener('animationcomplete', evil.stopanimationcompletePropagation);
		}

		this.handleFrameClick =eval("this.handle"+data.class+"Click");
		if(this.handleFrameClick!==undefined) {
			this.handleFrameClick = AFRAME.utils.bind(this.handleFrameClick, this);
			el.addEventListener('click', this.handleFrameClick);	
		}

	    evil.createAnimation("fadeout-"+data.id,el,"scale","fade-out","fade-stop","0 0 0","500");
    	evil.createAnimation("fadein-"+data.id,el,"scale","fade-in","fade-stop","1 1 1","500");

		var ba=evil.createEntity(el,{'id':data.id+'-background','geometry':data.geometry,'class':data.class+'-backgrounds clickable'});
			ba.setAttribute("material","src",data.material);
			ba.setAttribute("material","side","double");	
			this.background=ba;

		var rott="0 0 0",shiftt=data.textshift; 
		if(data.textflip) {rott="0 180 0";shiftt.x=0.035;};
		var te=evil.createEntity(el,{'id':data.id+'-title','geometry':"align:"+data.align+"; value:"+data.title+"; width:"+data.width+"; height: +"+data.height+"+; color: white;",
			'position':data.textshift.x+' '+data.textshift.y+' 0','rotation':rott,'class':data.class+'-titles'});

		if(data.vertical) te.setAttribute('rotation',"0 0 90");
	},
	handleFrameEnter: function (){
		this.background.setAttribute('material','src',this.data.hover);
		outterRing.object3D.visible=true;		
		outterRing.emit('circle-reveal',null,false);
		event.stopPropagation();	
	},
	handleFrameLeave: function () {		
		this.background.setAttribute('material','src',this.data.material);
		outterRing.emit('circle-stop',null,false);
		outterRing.setAttribute('theta-length', 0.1);			
		outterRing.object3D.visible=false;
		event.stopPropagation();
	},	
	handleExitsClick: function () {
		exiting=true;
		var allCats=chamber.querySelectorAll(".Categories");
		var allProjs=chamber.querySelectorAll(".Projects");
		if(projectShown) {
			chamber.querySelector("#project"+projectIndex+"-image").emit("back-clicked");			
			if(projectHasVideo) {
				var vid=chamber.querySelector("#project-video-group");
				vid.emit("fade-stop",null,false);
				vid.setAttribute("scale","1 1 1");
				vid.emit("fade-out",null,false);
			}
		}
		var imagesArr=chamber.querySelectorAll(".project-images");
			for (var i=0;i<numOfImages;i++){
				imagesArr[i].emit('fade-stop',null,false);				
				imagesArr[i].setAttribute("scale","1 1 1");
				imagesArr[i].emit('fade-out',null,false);
			}
		if(numOfProjects>0){
			for(var i=0;i<allProjs.length;i++){
				allProjs[i].emit("fade-out",null,false);
			}
		}else{
			chamber.querySelector("#chamber-cat-wall").emit("slide-out",null,false);
			chamber.querySelector("#chamber-stage").emit("slide-out",null,false);	
			chamber.querySelector("#chamber-left-decor").emit("slide-out",null,false);	
			chamber.querySelector("#chamber-right-decor").emit("slide-out",null,false);				
		}		
		for(var i=0;i<allCats.length;i++){
			allCats[i].emit("fade-out",null,false);
		}
		chamber.querySelector("#project-text").emit("fade-out",null,false);
		chamber.querySelector("#project-title-background").emit("back-clicked",null,false);
		chamber.querySelector("#project-title-cube").emit("back-clicked",null,false);
		chamber.querySelector("#chamber-sign").emit("fade-out",null,false);
		chamber.querySelector("#chamber-exit-frame").emit("fade-out",null,false);
		chamber.querySelector("#chamber-back-background0").emit('fade-out',null,false);
		chamber.querySelector("#chamber-back-background1").emit('fade-out',null,false);
	},
	handleBackClick: function(){
		var data = this.data, el = this.el,evil=this.evil,par=this.el.parentNode;
		par.querySelector("#project"+projectIndex+"-image").emit("back-clicked");
		var imagesArr=par.querySelectorAll(".project-images");
			for (var i=0;i<numOfImages;i++){
				imagesArr[i].emit('fade-stop',null,false);				
				imagesArr[i].setAttribute("scale","1 1 1");
				imagesArr[i].emit('fade-out',null,false);
			}
		if(projectHasVideo) {
			var vid=par.querySelector("#project-video-group");
			vid.emit("fade-stop",null,false);
			vid.setAttribute("scale","1 1 1");
			vid.emit("fade-out",null,false);
		}
		par.querySelector("#project"+projectIndex+"-title").emit("back-clicked",null,false);
		par.querySelector("#project-text").emit("fade-out",null,false);
		par.querySelector("#project-title-background").emit("back-clicked",null,false);
		par.querySelector("#project-title-cube").emit("back-clicked",null,false);
		par.querySelector("#project"+projectIndex+"-background").emit("back-clicked",null,false);
		par.querySelector("#chamber-back-background0").emit('fade-out',null,false);
		par.querySelector("#chamber-back-background1").emit('fade-out',null,false);
	    outterRing.emit('circle-stop',null,false);
		outterRing.setAttribute('theta-length', 0.1);			
		outterRing.object3D.visible=false;
		event.stopPropagation();
	}
}); 