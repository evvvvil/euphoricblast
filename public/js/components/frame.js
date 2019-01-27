AFRAME.registerComponent('frame', {
	dependencies: ['evil'],
	schema: {
		id: {type: 'string'},
		class: {type: 'string'},
		index: {type: 'number'},		
		amount: {type: 'number'},
    	geometry: {type: 'string'},
		material: {type: 'string'},
		hover: {type: 'string'},
		position: {type:'vec3'},
		rotation: {type:'vec3'},
		title: {type:'string',default:' broh '},
		image: {type:'string',default:''}
	},	
	init: function () {		
		var data = this.data, el = this.el,evil=this.evil=document.querySelector('[evil]').components.evil;
		el.setAttribute("id",data.id);
		el.setAttribute("class",data.class);
		el.setAttribute("position",data.position);
		el.setAttribute("rotation",data.rotation);
		el.setAttribute("scale","0 0 0");

		this.handleFrameEnter = AFRAME.utils.bind(this.handleFrameEnter, this);
		this.handleFrameLeave = AFRAME.utils.bind(this.handleFrameLeave, this);
		el.addEventListener('mouseenter',this.handleFrameEnter);
		el.addEventListener('mouseleave',this.handleFrameLeave);

		this.handleFrameanimationcomplete = eval("this.handle"+data.class+"animationcomplete");
		if(this.handleFrameanimationcomplete!==undefined) {
			this.handleFrameanimationcomplete = AFRAME.utils.bind(this.handleFrameanimationcomplete, this);
			el.addEventListener('animationcomplete', this.handleFrameanimationcomplete);	
		}

		this.handleFrameClick =eval("this.handle"+data.class+"Click");
		if(this.handleFrameClick!==undefined) {
			this.handleFrameClick = AFRAME.utils.bind(this.handleFrameClick, this);
			el.addEventListener('click', this.handleFrameClick);	
		}

	    evil.createAnimation("clicked",el,"position","project-clicked","project-stop","0.0 0.9 -1.95","2000");    	    	
    	evil.createAnimation("goout",el,"position","go-out","go-stop",data.position.x+" "+data.position.y+" 4","1000");
    	evil.createAnimation("fade-in",el,"scale","fade-in","fade-stop","1 1 1","500");
    	evil.createAnimation("fade-out-sca",el,"scale","fade-out","fade-stop","0 0 0","500");
    	evil.createAnimation("back",el,"scale","back-clicked","back-stop","1 1 1","2000");

		var ba=evil.createEntity(el,{'id':data.id+'-background','geometry':data.geometry,
			'class':data.class+'-backgrounds clickable'});
			ba.setAttribute("material","src",data.material);
			ba.setAttribute("material","side","double");
			evil.createAnimation("clicked-ba-sca",ba,"scale","project-clicked","project-stop","1.26 1.06 1.0","2000");		
			evil.createAnimation("clicked-ba-rot",ba,"rotation","project-clicked","project-stop","0 -405 0","2000");
			evil.createAnimation("back-ba-sca",ba,"scale","back-clicked","back-stop","1 1 1","1000");		
			evil.createAnimation("back-ba-pos",ba,"position","back-clicked","back-stop","0 0 0","2000");
			evil.createAnimation("back-ba-rot",ba,"rotation","back-clicked","back-stop","0 0 0","2000");
			ba.addEventListener('animationcomplete', evil.stopanimationcompletePropagation);	
			this.backgroundEl=ba;

		var te=evil.createEntity(el,{'id':data.id+'-title','geometry':"value:"+data.title+"; width: .8; height: auto; color: white;",
			'position':'.18 0.1 0.01','class':data.class+'-titles'});
			//TODO: make if else statement with category frame to have these settings:
			//		var te=evil.createEntity(el,{'id':data.id+'-title','geometry':"value:"+data.title+"; width: 1.2; height: auto; color: white;",
			//			'position':'.38 0.1 0.005','class':data.class+'-titles'});
			evil.createAnimation("reveal-te",te,"position","project-clicked","project-stop","0.45 0.2 0.05","2000");		
			evil.createAnimation("clicked-te-sca",te,"scale","project-clicked","project-stop","2.0 2.0 1.0","2000");
			evil.createAnimation("clicked-te-rot",te,"rotation","project-clicked","project-stop","0 360 0","2000");			
			evil.createAnimation("reverse-te",te,"position","back-clicked","back-stop",".18 0.1 0.01","2000");			
			evil.createAnimation("back-te-rot",te,"rotation","back-clicked","back-stop","0 0 0","2000");
			evil.createAnimation("back-te-sca",te,"scale","back-clicked","back-stop","1 1 1","2000");	
			te.addEventListener('animationcomplete', evil.stopanimationcompletePropagation);
			this.titleEl=te;	
			

		if(data.image!==''){

			var im=evil.createImage(el,{'id':data.id+'-image','class:':data.class+'-images',
			'src':data.image,'width':'.39','height':'.18','position':'0 -0.022 0.005'});
			evil.createAnimation("clicked-im-sca",im,"scale","project-clicked","project-stop","1.44 1.45 1.0","1500");			
			evil.createAnimation("clicked-im-rot",im,"rotation","project-clicked","project-stop","0 -405 0","2000");
			evil.createAnimation("back-im",im,"position","back-clicked","back-stop","0 -0.022 0.005","2000");
			evil.createAnimation("back-im-sca",im,"scale","back-clicked","back-stop","1 1 1","2000");
			evil.createAnimation("back-im-rot",im,"rotation","back-clicked","back-stop","0 0 0","2000");	
			im.addEventListener('animationcomplete', evil.stopanimationcompletePropagation);
			this.imageEl=im;
		}
	},
	handleFrameEnter: function (){
		this.backgroundEl.setAttribute('material','src',this.data.hover);
		outterRing.object3D.visible=true;
		outterRing.emit('circle-reveal',null,false);
	},
	handleFrameLeave: function () {		
		this.backgroundEl.setAttribute('material','src',this.data.material);
		outterRing.emit('circle-stop',null,false);
		outterRing.setAttribute('theta-length', 0.1);			
		outterRing.object3D.visible=false;
	},
	handleProjectsClick: function (event) {
		var data = this.data, el = this.el,evil=this.evil,par=this.el.parentNode;
		projectIndex=data.index;
	    outterRing.emit('circle-stop',null,false);
		outterRing.setAttribute('theta-length', 0.1);			
		outterRing.object3D.visible=false;
		
		var projos=par.querySelectorAll(".Projects");
			for (var i=0;i<projos.length;i++){
				if(i!=projectIndex) projos[i].emit('go-out',null,false);
			}
		var currentProject=projects[projectIndex];
		//console.log("video orginal:"+currentProject.video);
		evil.getProjectVideo(event,currentProject.video); 
		numOfImages=Math.min(6,currentProject.images.length);
		for(var i=0;i<numOfImages;i++){
			par.querySelector("#project-images-"+i).setAttribute("chamber_image","source",evil.wrangleImageSource(currentProject.images[i]));
		}	
		var projectText=par.querySelector("#project-text");
		projectText.setAttribute("scale","0 0 0");
		projectText.setAttribute("text_plane","content",evil.strip(currentProject.content.extended));
		projectText.emit("fade-in",null,false);
		var heighto=projectText.getAttribute("geometry").height,
		currentImage=this.imageEl,
		currentBackground=this.backgroundEl,currentId=data.id,
		imageAnim=currentImage.querySelector("#clicked-im-pos-"+currentId);

		if(imageAnim!==null) currentImage.removeChild(imageAnim);
		evil.createAnimation("clicked-im-pos-"+currentId,currentImage,"position","project-clicked","project-stop","0.95 "+(heighto-0.65)+" 0.635","2000");	
		
		imageAnim=currentBackground.querySelector("#clicked-ba-pos-"+currentId);
		if(imageAnim!==null) currentBackground.removeChild(imageAnim);	
		evil.createAnimation("clicked-ba-pos-"+currentId,currentBackground,"position","project-clicked","project-stop","0.95 "+(heighto-0.65)+" 0.63","2000");	
		
		currentBackground.setAttribute('material','src',data.material);
		$(".Projects-backgrounds").removeClass('clickable');
		projectShown=true;
		el.emit('project-clicked',null,false); 
		projectText.emit('fade-in',null,false);
		par.querySelector("#project-title-background").emit('fade-in',null,false);
		
		this.titleEl.emit('project-clicked',null,false); 	
		currentBackground.emit('project-clicked',null,false);
		currentImage.emit('project-clicked',null,false);
	},		
	handleCategoriesClick: function () {
		//console.log("category clicked!"+this.data.index);
		category=this.data.index;
		exiting=false;
		var allCats=chamber.querySelectorAll(".Categories");
		var allProjs=chamber.querySelectorAll(".Projects");
		
		for(var i=0;i<allProjs.length;i++){
			allProjs[i].emit("fade-out",null,false);
		}
		for(var i=0;i<allCats.length;i++){
			allCats[i].emit("fade-out",null,false);
		}
		if(projectShown){
			var allImages=chamber.querySelectorAll(".project-images");
			for(var i=0;i<allImages.length;i++){
				allImages[i].emit("fade-out",null,false);
			}
			chamber.querySelector("#project-title-background").emit("fade-out",null,false);
			chamber.querySelector("#project-text").emit("fade-out",null,false);
			if(projectHasVideo) {
				var vid=chamber.querySelector("#project-video-group");
				vid.emit("fade-stop",null,false);
				vid.setAttribute("scale","1 1 1");
				vid.emit("fade-out",null,false);
			}
			chamber.querySelector("#chamber-back-background0").emit("fade-out",null,false);
			chamber.querySelector("#chamber-back-background1").emit("fade-out",null,false);
		}
		chamber.querySelector("#chamber-sign-title").emit("fade-out",null,false);
		chamber.querySelector("#chamber-sign-back").emit("fade-out",null,false);
		chamber.querySelector("#chamber-exit-frame").emit("fade-out",null,false);		
	},
	handleCategoriesanimationcomplete: function (event) {
		var data = this.data, el = this.el,evil=this.evil,animID=event.detail.name;animID=animID.substring(11,animID.length);		
		if(animID=="fade-in"){
			if(data.index<=data.amount-1 || data.index===null){
				chamber.querySelector("#chamber-exit").emit('fade-in',null,false);
			}
		}
	},
	handleProjectsanimationcomplete: function (event) {		
		var data = this.data, el = this.el,evil=this.evil,par=this.el.parentNode,
		animID=event.detail.name;animID=animID.substring(11,animID.length);
		if(animID.startsWith("back")){		
			//console.log("handleProjectTitleAnimations reverse");	
			var projos=par.querySelectorAll(".Projects");
			for (var i=0;i<projos.length;i++){
				var pos = (-0.5+i%3*0.5)+" "+(.3+Math.floor(i/3)*0.3)+" "+(-1.95);
				$(projos[i].attributes).each(function() {
					var shortName=this.name; shortName=shortName.substring(11,shortName.length);
					if(this.name.startsWith("reset"))	projos[i].removeAttribute(this.name);
				});				
			  	evil.createAnimation("reset",projos[i],"position","move-back","move-stop",pos,"1000");
				projos[i].emit('move-back',null,false);
			}
		}else if(animID.startsWith("clic")){
			//console.log("handleProjectTitleAnimations reveal clicked project");	
			if(numOfImages>0){
				animCounter=0;evil.animateObjects(1,"project-images-",numOfImages,'A');
			}
			console.log("projectHasVideo? "+projectHasVideo);
			if(projectHasVideo) par.querySelector("#project-video-group").emit("fade-in");
			par.querySelector("#chamber-back-background0").emit('fade-in',null,false);
			par.querySelector("#chamber-back-background1").emit('fade-in',null,false);
		}else if(animID.startsWith("fade-in")){
			if(data.index==data.amount-1 || data.index===null){
				var catWall=chamber.querySelector("#chamber-cat-wall");
				if(catWall.getAttribute("scale").y<1){
					catWall.emit("fade-in",null,false);
				}else{
					catWall.emit("slide-in",null,false);
				}			
			}
		}else if(animID.startsWith("reset")){
			$(".Projects-backgrounds").addClass('clickable');	
			projectShown=false;
		}else if(animID.startsWith("fade-out")){
			chamber.querySelector("#chamber-cat-wall").emit("slide-out",null,false);
			chamber.querySelector("#chamber-stage").emit("slide-out",null,false);	
			chamber.querySelector("#chamber-left-decor").emit("slide-out",null,false);	
			chamber.querySelector("#chamber-right-decor").emit("slide-out",null,false);	
			if(!exiting)chamber.querySelector("#chamber-exit").emit("fade-out",null,false);		
		}		
	}	
}); 