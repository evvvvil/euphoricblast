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

		this.handleFrameAnimationEnd = eval("this.handle"+data.class+"AnimationEnd");
		if(this.handleFrameAnimationEnd!==undefined) {
			this.handleFrameAnimationEnd = AFRAME.utils.bind(this.handleFrameAnimationEnd, this);
			el.addEventListener('animationend', this.handleFrameAnimationEnd);	
		}

		this.handleFrameClick =eval("this.handle"+data.class+"Click");
		if(this.handleFrameClick!==undefined) {
			this.handleFrameClick = AFRAME.utils.bind(this.handleFrameClick, this);
			el.addEventListener('click', this.handleFrameClick);	
		}

	    evil.createAnimation("H_clicked-"+data.id,el,"position","project-clicked","project-stop","0.0 0.9 -1.95","2000");    	    	
    	evil.createAnimation("H_goout-"+data.id,el,"position","go-out","go-stop",data.position.x+" "+data.position.y+" 4","1000");
    	evil.createAnimation("H_fadein-"+data.id,el,"scale","fade-in","fade-stop","1 1 1","500");
    	evil.createAnimation("H_fadeout-sca-"+data.id,el,"scale","fade-out","fade-stop","0 0 0","500");
    	evil.createAnimation("H_back-"+data.id,el,"scale","back-clicked","back-stop","1 1 1","2000");

		var ba=evil.createEntity(el,{'id':data.id+'-background','geometry':data.geometry,
			'class':data.class+'-backgrounds clickable'});
			ba.setAttribute("material","src",data.material);
			ba.setAttribute("material","side","double");
			evil.createAnimation("clicked-ba-sca-"+data.id,ba,"scale","project-clicked","project-stop","1.26 1.06 1.0","2000");		
			evil.createAnimation("clicked-ba-rot-"+data.id,ba,"rotation","project-clicked","project-stop","0 -405 0","2000");
			evil.createAnimation("back-ba-sca-"+data.id,ba,"scale","back-clicked","back-stop","1 1 1","1000");		
			evil.createAnimation("back-ba-pos-"+data.id,ba,"position","back-clicked","back-stop","0 0 0","2000");
			evil.createAnimation("back-ba-rot-"+data.id,ba,"rotation","back-clicked","back-stop","0 0 0","2000");
			ba.addEventListener('animationend', evil.stopAnimationEndPropagation);	
			this.backgroundEl=ba;

		var te=evil.createEntity(el,{'id':data.id+'-title','geometry':"value:"+data.title+"; width: .8; height: auto; color: white;",
			'position':'.18 0.1 0.01','class':data.class+'-titles'});
			//TODO: make if else statement with category frame to have these settings:
			//		var te=evil.createEntity(el,{'id':data.id+'-title','geometry':"value:"+data.title+"; width: 1.2; height: auto; color: white;",
			//			'position':'.38 0.1 0.005','class':data.class+'-titles'});
			evil.createAnimation("reveal-te-"+data.id,te,"position","project-clicked","project-stop","0.45 0.2 0.05","2000");		
			evil.createAnimation("clicked-te-sca-"+data.id,te,"scale","project-clicked","project-stop","2.0 2.0 1.0","2000");
			evil.createAnimation("clicked-te-rot-"+data.id,te,"rotation","project-clicked","project-stop","0 360 0","2000");
			evil.createAnimation("reverse-te-"+data.id,te,"position","back-clicked","back-stop",".38 0.1 0.01","2000");			
			evil.createAnimation("back-te-rot-"+data.id,te,"rotation","back-clicked","back-stop","0 0 0","2000");
			evil.createAnimation("back-te-sca-"+data.id,te,"scale","back-clicked","back-stop","1 1 1","2000");	
			te.addEventListener('animationend', evil.stopAnimationEndPropagation);
			this.titleEl=te;	
			

		if(data.image!==''){
			var im=evil.createImage(el,{'id':data.id+'-image','class:':data.class+'-images',
			'src':data.image,'width':'.39','height':'.18','position':'0 -0.022 0.005','side':'front'});
			evil.createAnimation("clicked-im-sca-"+data.id,im,"scale","project-clicked","project-stop","1.44 1.45 1.0","1500");			
			evil.createAnimation("clicked-im-rot-"+data.id,im,"rotation","project-clicked","project-stop","0 -405 0","2000");
			evil.createAnimation("back-im-"+data.id,im,"position","back-clicked","back-stop","0 -0.022 0.005","2000");
			evil.createAnimation("back-im-sca-"+data.id,im,"scale","back-clicked","back-stop","1 1 1","2000");
			evil.createAnimation("back-im-rot-"+data.id,im,"rotation","back-clicked","back-stop","0 0 0","2000");	
			im.addEventListener('animationend', evil.stopAnimationEndPropagation);
			this.imageEl=im;
		}
	},
	handleFrameEnter: function (){
		this.backgroundEl.setAttribute('material','src',this.data.hover);
		outterRing.emit('circle-reveal',null,false);	
	},
	handleFrameLeave: function () {		
		this.backgroundEl.setAttribute('material','src',this.data.material);
		outterRing.emit('circle-stop',null,false);
		outterRing.setAttribute('theta-length', 0);	
	},
	handleProjectsClick: function (event) {
		var data = this.data, el = this.el,evil=this.evil,par=this.el.parentNode;
		projectIndex=data.index;
	    outterRing.emit('circle-stop');
		outterRing.setAttribute('theta-length', 0);
		
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

		/*console.log("handleProjectclicked");
	var parent=event.target.parentNode,
    projectId=parent.id;
    if(parent.id.length<9) projectIndex=Number(projectId.charAt(7));
    if(parent.id.length>8) projectIndex=Number(projectId.charAt(7)+projectId.charAt(8));
    outterRing.emit('circle-stop');
	outterRing.setAttribute('theta-length', 0);
	animCounter=0;
	//animateObjects(-1,"project-background",numOfProjects,projectIndex);
	var projos=ch.querySelectorAll(".projects");
		for (var i=0;i<projos.length;i++){
			projos[i].emit('fade-out',null,false);
		}
	var currentProject=projects[projectIndex];
	getProjectVideo(event,currentProject.video);
	numOfImages=Math.min(6,currentProject.images.length);
	for(var i=0;i<numOfImages;i++){
		ch.querySelector("#project-images-"+i).setAttribute("src",evil.wrangleImageSource(currentProject.images[i]));
	}	
	var projectText=ch.querySelector("#project-text");
	projectText.setAttribute("text_plane","content",strip(currentProject.content.extended));
	
	var heighto=projectText.getAttribute("geometry").height,
	currentImage=parent.querySelector(".project-images"),
	currentBackground=parent.querySelector(".project-backgrounds"),

	imageAnim=currentImage.querySelector("#pr-im-pos-cli-"+projectIndex);
	if(imageAnim!==null) currentImage.removeChild(imageAnim);
	createChamberAnimation("pr-im-pos-cli-"+projectIndex,currentImage,"position","project-clicked","project-stop","0.95 "+(heighto-0.65)+" 0.635","2000",'');	
	imageAnim=currentBackground.querySelector("#pr-ba-pos-cli-"+projectIndex);

	if(imageAnim!==null) currentBackground.removeChild(imageAnim);
	createChamberAnimation("pr-ba-pos-cli-"+projectIndex,currentBackground,"position","project-clicked","project-stop","0.95 "+(heighto-0.65)+" 0.63","2000",'');
	
	parent.emit('project-clicked',null,false); 
	projectText.emit('fade-in',null,false);
	ch.querySelector("#project-title-background").emit('fade-in',null,false);
	parent.querySelector(".project-titles").emit('project-clicked',null,false); 	
	parent.querySelector(".project-backgrounds").emit('project-clicked',null,false);
	currentImage.emit('project-clicked',null,false); */
	},		
	handleCategoriesClick: function () {
		console.log("category clicked!"+this.data.index);
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
			chamber.querySelector("#project-video").emit("fade-out",null,false);
			chamber.querySelector("#chamber-back-background0").emit("fade-out",null,false);
			chamber.querySelector("#chamber-back-background1").emit("fade-out",null,false);
		}
		chamber.querySelector("#chamber-sign-title").emit("fade-out",null,false);
		chamber.querySelector("#chamber-sign-back").emit("fade-out",null,false);
		chamber.querySelector("#chamber-exit-frame").emit("fade-out",null,false);
		
	},
	handleCategoriesAnimationEnd: function (event) {
		var animStartedBy=event.target.getAttribute("begin"),data = this.data, el = this.el,evil=this.evil;
		if(animStartedBy=="fade-in"){
			if(data.index==data.amount-1 || data.index===null){
				chamber.querySelector("#chamber-exit").emit('fade-in',null,false);
				/*console.log("end of categories animation project0 scale"+chamber.querySelector("#project0").getAttribute("scale").x);
				if(chamber.querySelector("#project0").getAttribute("scale").x<0.1){
					animCounter=0;evil.animateObjects(1,"project",numOfProjects,'A');
				}	*/			
			}
		}
	},
	handleProjectsAnimationEnd: function (event) {		
		var animID=event.target.id,data = this.data, el = this.el,evil=this.evil,par=this.el.parentNode;
		if(animID.startsWith("H_back")){		
			//console.log("handleProjectTitleAnimations reverse");	
			var projos=par.querySelectorAll(".Projects");
			for (var i=0;i<projos.length;i++){
				var pos = (-0.5+i%3*0.5)+" "+(.3+Math.floor(i/3)*0.3)+" "+(-1.95);
				var moveBackAnim=projos[i].querySelector("#H_reset-"+i);
				if(moveBackAnim!==null) projos[i].removeChild(moveBackAnim);
			  	evil.createAnimation("H_reset-"+i,projos[i],"position","move-back","move-stop",pos,"1000");
				projos[i].emit('move-back',null,false);
			}
		}else if(animID.startsWith("H_clic")){
			//console.log("handleProjectTitleAnimations reveal clicked project");	
			if(numOfImages>0){
				animCounter=0;evil.animateObjects(1,"project-images-",numOfImages,'A');
			}
			//console.log("projectHasVideo? "+projectHasVideo);
			if(projectHasVideo) par.querySelector("#project-video-group").emit("fade-in");
			par.querySelector("#chamber-back-background0").emit('fade-in',null,false);
			par.querySelector("#chamber-back-background1").emit('fade-in',null,false);
		}else if(animID.startsWith("H_fadein")){
			if(data.index==data.amount-1 || data.index===null){
				var catWall=chamber.querySelector("#chamber-cat-wall");
				if(catWall.getAttribute("scale").y<1){
					catWall.emit("fade-in",null,false);
				}else{
					catWall.emit("slide-in",null,false);
				}
							
			}
		}else if(animID.startsWith("H_reset")){
			$(".Projects-backgrounds").addClass('clickable');	
			projectShown=false;
		}else if(animID.startsWith("H_fadeout")){
			chamber.querySelector("#chamber-cat-wall").emit("slide-out",null,false);
			chamber.querySelector("#chamber-stage").emit("slide-out",null,false);	
			chamber.querySelector("#chamber-left-decor").emit("slide-out",null,false);	
			chamber.querySelector("#chamber-right-decor").emit("slide-out",null,false);	
			if(!exiting)chamber.querySelector("#chamber-exit").emit("fade-out",null,false);		
		}		
	}	
}); 