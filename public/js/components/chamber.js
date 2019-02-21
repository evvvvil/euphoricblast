AFRAME.registerComponent('chamber', {
	dependencies: ['evil'],
	schema: {
		id: {type:'string'},
		projects: {type: 'array'}, 
		position: {type:'vec3'},
		rotation: {type:'vec3'},
		title: {type:'string'}
	},
	init: function () {		
		var data = this.data, el = this.el,evil=this.evil=document.querySelector('[evil]').components.evil;
		if(data.projects!='') el.setAttribute("projects",data.projects);
		if(data.id!='') el.setAttribute("id",data.id);
		if(data.position!='') el.setAttribute("position",data.position);
		if(data.rotation!='') el.setAttribute("rotation",data.rotation);

		//CHAMBER SIGN
		var signOptions={
			'id': 'chamber-sign',
			'class': 'chamber-signs',			
			'geometry': 'primitive:plane;width:.66;height:.17',
			'title':'This should be a long text',
			'position': '0 0.04 -1.60',
			'material': '#333',
		};
		evil.createEntityWithComponent("chamber_sign",el,signOptions);
		
		//CHAMBER LOADING
		var loadingTitleOptions={'id': 'chamber-loading','title': 'align:center; value:LOADING; width: 1.6; height: auto; color: #333;',
		'position': '0 0.5 -1.45','class': 'chamber-loader'};
		evil.createEntityWithComponent("chamber_title",el,loadingTitleOptions);

		//CHAMBER MODELS
	    evil.createEntity(el,{'id':'chamber-door','geometry':'#chamber-door-model'});
	    var sta=evil.createEntity(el,{'id':'chamber-stage','geometry':'#chamber-stage-model','position':'0 0 -0.15'});
	    evil.createAnimation("slide-out-chamber-stage",sta,"position","slide-out","slide-stop","0 -0.3 -0.15","500");
	    evil.createAnimation("slide-in-chamber-stage",sta,"position","slide-in","slide-stop","0 0 -0.15","500");
	    this.handleStageanimationcomplete = AFRAME.utils.bind(this.handleStageanimationcomplete, this);
	    sta.addEventListener('animationcomplete', this.handleStageanimationcomplete);
	    this.sta=sta;

	    var lede=evil.createEntity(el,{'id':'chamber-left-decor','geometry':'#chamber-stage-model','rotation':'0 0 -90','position':'-1.96 -0.34 0'});
	    evil.createAnimation("slide-out-chamber-left-decor",lede,"position","slide-out","slide-stop","-2.1 -0.34 0","500");
	    evil.createAnimation("slide-in-chamber-left-decor",lede,"position","slide-in","slide-stop","-1.96 -0.34 0","500");
	    this.handleDecoranimationcomplete = AFRAME.utils.bind(this.handleDecoranimationcomplete, this);
		lede.addEventListener('animationcomplete', this.handleDecoranimationcomplete);
	    this.lede=lede;
	    var ride=evil.createEntity(el,{'id':'chamber-right-decor','geometry':'#chamber-stage-model','rotation':'0 0 90','position':'1.96 -0.34 0'});
	    evil.createAnimation("slide-out-chamber-right-decor",ride,"position","slide-out","slide-stop","2.1 -0.34 0","500");
	    evil.createAnimation("slide-in-chamber-right-decor",ride,"position","slide-in","slide-stop","1.96 -0.34 0","500");
		this.ride=ride;

	    var wal1=evil.createEntity(el,{'id':'chamber-walls1','geometry':'#chamber-walls-model'}),
	    	wal2=evil.createEntity(el,{'id':'chamber-walls2','geometry':'#chamber-walls-model'});
	    	//wal3=evil.createEntity(el,{'id':'chamber-walls2','geometry':'#chamber-walls-model','position':'-4 0 0'});
	    	evil.createAnimation("slide-in-chamber-walls1",wal1,"position","slide-in","slide-stop","-4 0 0","2000","easeInQuad","0 0 0");
	    	evil.createAnimation("slide-in-chamber-walls2",wal2,"position","slide-in","slide-stop","0 0 0","2000","easeInQuad","4 0 0");
	    	evil.createAnimation("exit-chamber-walls1",wal1,"position","exit","exit-stop","4 0 0","2000","easeInQuad","0 0 0");
	    	evil.createAnimation("exit-chamber-walls2",wal2,"position","exit","exit-stop","0.6 0 0","2000","easeInQuad","-4 0 0");
	    	
	    	//evil.createAnimation("sle-out-chamber-walls1",wal1,"position","exit","exit-stop","4 0 0","2000");
	    	//evil.createAnimation("sde-out-chamber-walls2",wal2,"position","exit","exit-stop","0 0 0","2000");
	    evil.createEntity(el,{'id':'chamber-floor','geometry':'primitive:plane;width:12;height:4','position':'0 -0.19 -2','rotation':'-90 0 0','material':'color:#DDD'});
		evil.createEntityWithComponent("chamber_exit",el,{'id': 'chamber-exit-group'});
		this.wal1=wal1;this.wal2=wal2;
		this.handleWallanimationcomplete = AFRAME.utils.bind(this.handleWallanimationcomplete, this);
		wal1.addEventListener('animationcomplete', this.handleWallanimationcomplete);
		
		//CHAMBER CATEGORIES WALL
		var caba = evil.createEntity(el,{'id':'chamber-cat-wall','geometry':'primitive:plane;width:1.08;height:1.4','position':'1.85 .51 -0.66','rotation':'0 -90 0','material':'color:#ffc800','scale':'1 0 1'});
		evil.createAnimation("fade-in-chamber-cat-wall",caba,"scale","fade-in","fade-stop","1 1 1","500");
		evil.createAnimation("slide-out-chamber-cat-wall",caba,"position","slide-out","slide-stop","1.85 -.8 -0.66","500");
		evil.createAnimation("slid-out-chamber-cat-wall",caba,"scale","slide-out","slide-stop",".9 1 1","500");
		evil.createAnimation("slide-in-chamber-cat-wall",caba,"position","slide-in","slide-stop","1.85 .51 -0.66","500");
		evil.createAnimation("slid-in-chamber-cat-wall",caba,"scale","slide-in","slide-stop","1 1 1","500");
		this.handleCatWallanimationcomplete = AFRAME.utils.bind(this.handleCatWallanimationcomplete, this);		
		caba.addEventListener('animationcomplete', this.handleCatWallanimationcomplete);
		this.caba=caba;
		//CHAMBER SIDE WALLS
		var chriwa = evil.createBox(el,{'id':'chamber-right-wall','depth':1.0353,'height':1.4,'width':0.1,'position':'2 .4 -0.66','material':'color:#fff'});
		var chlewa = evil.createBox(el,{'id':'chamber-left-wall','depth':1.0353,'height':1.4,'width':0.1,'position':'-2 .4 -0.66','material':'color:#fff'});
		this.chriwa=chriwa;this.chlewa=chlewa;
		evil.createAnimation("move-back-chamber-left-wall",chlewa,"position","move-back","move-stop","-2.6 .4 -0.66","1000");
		this.handleSideWallanimationcomplete = AFRAME.utils.bind(this.handleSideWallanimationcomplete, this);		
		chlewa.addEventListener('animationcomplete', this.handleSideWallanimationcomplete);

		/*evil.createAnimation("slide-in-chamber-right-wall",chriwa,"position","slide-in","slide-stop","2 .4 -0.66","1000");
		evil.createAnimation("slide-out-chamber-right-wall",chriwa,"position","slide-out","slide-stop","2 -1 -0.66","1000");		
		evil.createAnimation("slide-out-chamber-left-wall",chlewa,"position","slide-out","slide-stop","-2 -1 -0.66","1000");*/
		
		//CHAMBER CATEGORIES TITLE
		var categoriesTitleOptions={'id': 'chamber-category0','class':'Categories','title': 'align:left; value:Other\nsections:; width: 2.5; height: auto; color: white;',
		'position': '1.8 1.03 0.1','rotation': '0 -90 0'};
		evil.createEntityWithComponent("chamber_title",el,categoriesTitleOptions);		

		//CHAMBER GO BACK FRAME
		var backFrameOptions={
			'id': 'chamber-back-background0','class': 'Back','geometry': 'primitive:plane;width:0.36;height:0.18',
			'title':'BACK',	'width': '1.8','material':'#back-background-mat','hover': '#back-background-hover',
			'position':'-0.74 0.0 -1.56','rotation': '0 45 0','scale':'0 0 1','textflip':false,'textshift':'0.035 0'
		};
		evil.createEntityWithComponent("exit_frame",el,backFrameOptions);
		backFrameOptions.id='chamber-back-background1';
		backFrameOptions.textflip=true;
		backFrameOptions.position="0.74 0.0 -1.56";
		backFrameOptions.rotation="0 -225 0";
		evil.createEntityWithComponent("exit_frame",el,backFrameOptions);

		//CHAMBER PROJECT IMAGES
		for(var i=0;i<6;i++){
			var imgPos = (-0.5+i%3*0.5)+" "+(.3+Math.floor(i/3)*0.3)+" "+(-2.1),
			imageOptions={
				'id': 'project-images-'+i,
				'class': 'project-images',
				'geometry':'primitive:plane;width:.46;height:.23',
				'width': 0.43,
				'height': 0.21,
				'position': imgPos
			};
			evil.createEntityWithComponent("chamber_image",el,imageOptions);					
		}

		//CHAMBER PROJECT TITLE BACKGROUND
		var prtiba= evil.createEntity(el,{'id':'project-title-background','geometry':'primitive:plane;width:1.6;height:.17','position':'0.0 1.1 -4.0','material':'color:#000','scale':'0 0 1'});
		evil.createAnimation("fade-in-pos-project-title-background",prtiba,"position","fade-in","fade-stop","0.0 1.1 -2.17","2000");		
		evil.createAnimation("fade-in-project-title-background",prtiba,"scale","fade-in","fade-stop","1 1 1","2000");		
		//evil.createAnimation("fade-out-project-title-background",prtiba,"scale","fade-out","fade-stop","0 0 0","1000");		
		evil.createAnimation("back-project-title-background",prtiba,"scale","back-clicked","back-stop","0 0 0","1000");
		evil.createAnimation("back-pos-project-title-background",prtiba,"position","back-clicked","back-stop","0.0 1.1 -4.0","1000");
		prtiba.addEventListener('animationcomplete', evil.stopanimationcompletePropagation);

		//CHAMBER PROJECT TITLE CUBE
		var prticu= evil.createEntity(el,{'id':'project-title-cube','geometry':'primitive:plane;width:0.1;height:0.1','position':'-0.72 1.1 2.165','material':'color:#e0b716','scale':'0 0 1'});
		evil.createAnimation("fade-in-pos-project-title-cube",prticu,"position","fade-in","fade-stop","-0.72 1.1 -2.165","2000");		
		evil.createAnimation("fade-in-project-title-cube",prticu,"scale","fade-in","fade-stop","1 1 1","2000");		
		//evil.createAnimation("fade-out-project-title-cube",prticu,"scale","fade-out","fade-stop","0 0 0","1000");		
		evil.createAnimation("back-project-title-cube",prticu,"scale","back-clicked","back-stop","0 0 0","1000");
		evil.createAnimation("back-pos-project-title-cube",prticu,"position","back-clicked","back-stop","-0.72 1.1 2.165","1000");
		prticu.addEventListener('animationcomplete', evil.stopanimationcompletePropagation);
		prticu.setAttribute("material","shader","flat");
		//CHAMBER PROJECT TEXT PLANE
		evil.createEntityWithComponent("text_plane",el,{'padding':0.05,'id':'project-text','wrapCount':34,'width':'0.53','position':'0.9 0.1 -1.52','rotation':'0 -45 0','content':' '});

		//CHAMBER PROJECT VIDEO
		var vifi=document.createElement("video");
		vifi.setAttribute("id","project-video-file");
		vifi.setAttribute("autoplay","true");
		vifi.setAttribute("mute","true");
		vifi.setAttribute("loop","true");
		vifi.setAttribute("src","/videos/small_video.mp4");
		document.querySelector("a-assets").appendChild(vifi);

		var videoOptions={
			'id': 'project-video',
			'width': .7,
			'height': 0.39375,			
			'position': '-.95 0.308 -1.47',
			'rotation': '0 45 0'
		};
		var prvi=evil.createEntityWithComponent("chamber_video",el,videoOptions);
		prvi.setAttribute("material","shader","flat");
		//CHAMBER EXIT CORRIDORS

		var co1=evil.createEntity(el,{'id':'chamber-corridor-01','geometry':'#corridor','position':'-1.92 2 -0.66','rotation':'90 0 45','scale':'1 1 0'});
	    evil.createAnimation("fade-in-corridor-01",co1,"scale","fade-in","fade-stop","1 1 1","500");
	    evil.createAnimation("fade-in-pos-corridor-01",co1,"position","fade-in","fade-stop","-1.92 1.5 -0.66","500");
	    this.co1=co1;
	    var co2=evil.createEntity(el,{'id':'chamber-corridor-02','geometry':'#corridor','position':'-1.92 2.25 -0.66','rotation':'90 0 45','scale':'1 1 1'});
	    var co3=evil.createEntity(el,{'id':'chamber-corridor-03','geometry':'#corridor','position':'-2.326 2.824 -1.065','rotation':'0 45 0','scale':'1 1 1'});
	    var co4=evil.createEntity(el,{'id':'chamber-corridor-04','geometry':'#corridor','position':'-2.852 2.824 -1.591','rotation':'0 45 0','scale':'1 1 1'});
	    var co5=evil.createEntity(el,{'id':'chamber-corridor-05','geometry':'#corridor','position':'-3.252 2.3 -1.991','rotation':'90 0 45','scale':'1 1 1'});

	    var ki1=evil.createEntity(el,{'id':'chamber-kink-01','geometry':'#kink-model','position':'-1.92 2.824 -0.66','rotation':'0 45 0','scale':'1 1 1'});
	    var ki2=evil.createEntity(el,{'id':'chamber-kink-02','geometry':'#kink-model','position':'-3.252 2.824 -1.991','rotation':'0 225 0','scale':'1 1 1'});
	    var tr=evil.createEntity(ki2,{'id':'chamber-poster','geometry':'primitive:plane;width:.2;height:.2','position':'0 0 0.12','rotation':'0 180 0','scale':'1 1 1','material':'src:#eb-logo'});
	    //tr.setAttribute("material","src:#eb-logo");
	    tr.setAttribute("material","shader","flat");
	    this.ki1=ki1;this.ki2=ki2;    

	    for(var i=0;i<12;i++){
			var pos = (-0.5+i%3*0.5)+" "+(.3+Math.floor(i/3)*0.3)+" "+(-2.1);
			var projectOptions={
				'id':'project'+i,
				'class':'Projects',
				'index':i,
				'amount': 12,
				'geometry':'primitive:plane;width:.46;height:.25875',
				'material':'#category-background-mat',
				'hover':'#category-background-hover',
				'position':pos
			};
			evil.createEntityWithComponent("frame",el,projectOptions);
		}	
		posCounter=1;
		for(var i=0;i<categories.length;i++){
			if(i==category-1) continue;	
			var pos = 1.8+" "+(1.0+Math.floor(posCounter/2)*-0.3)+" "+(-0.9+posCounter%2*0.5),
				catElImage=document.querySelector("#cat-"+(i+1)).getAttribute("homecategory").image,
				categoriesOptions={
					'id': 'chamber-category'+(i+1),
					'class': 'Categories',
					'index':(i+1),
					'amount': categories.length,
					'geometry': 'primitive:plane;width:.46;height:.25875',
					'material': '#category-background-mat',
					'hover': '#category-background-hover',
					'position': pos,
					'rotation': '0 -90 0',
					'title': categories[i],
					'image':catElImage
				};
			posCounter++;
			evil.createEntityWithComponent("frame",el,categoriesOptions);
		}
	},
	update: function (oldData) {			
		var data=this.data,el=this.el,evil=this.evil,diff=AFRAME.utils.diff(oldData,data),changedKeys=Object.keys(diff);
		//console.log("we updated chamber - changedkeys are:"+changedKeys);
		//this next line is useful to ignore the very first update call happening just after init is called
		///5 is the number of total fields in the schema for this component
		if(changedKeys.length<5){			
			if(changedKeys.indexOf("title")>=0){
				el.querySelector('#chamber-sign').setAttribute('chamber_sign','text',data.title);	
			}else if(changedKeys.indexOf("position")>=0){
				el.setAttribute("position",data.position);								
			}else if(changedKeys.indexOf("rotation")>=0){								
				el.setAttribute("rotation",data.rotation);				
			}
		}		
	},
	handleCatWallanimationcomplete: function(event){	
		var animID=event.detail.name;animID=animID.substring(11,animID.length);	

		if(animID.startsWith("slide-out")){
			//this.wal1.removeAttribute("position");
			//this.wal2.setAttribute("position","4 0 0");
			if(exiting){
				this.wal1.emit("exit",null,false);
				this.wal2.emit("exit",null,false);

				var exitFrameWordlPos = new THREE.Vector3(),
				exitKink1WordlPos = new THREE.Vector3(),
				exitKink2WordlPos = new THREE.Vector3();
				exitFrameWordlPos.setFromMatrixPosition(chamber.querySelector("#chamber-exit-frame").object3D.matrixWorld);
				exitKink1WordlPos.setFromMatrixPosition(this.ki1.object3D.matrixWorld);
				exitKink2WordlPos.setFromMatrixPosition(this.ki2.object3D.matrixWorld);
				document.querySelector("#ambient-light").emit('fade-out',null,false);
				document.querySelector("#directional-light").emit('fade-in',null,false);
				document.querySelector('#corridor-01').setAttribute("rotation","0 0 0");
				document.querySelector('#corridor-02').setAttribute("rotation","0 0 0");
				evil.createAnimation("move-exit-anim",player,"position","move-exit","move-exit-stop",exitFrameWordlPos.x+" "+exitFrameWordlPos.y+" "+exitFrameWordlPos.z,"2000",'linear');
				evil.createAnimation("move-co-vert-anim",player,"position","move-vert","move-vert-stop",exitKink1WordlPos.x+" "+exitKink1WordlPos.y+" "+exitKink1WordlPos.z,"2000",'linear');
				evil.createAnimation("move-co-horz-anim",player,"position","move-horz","move-horz-stop",exitKink2WordlPos.x+" "+exitKink2WordlPos.y+" "+exitKink2WordlPos.z,"2000",'linear');
				evil.createAnimation("move-co-down-anim",player,"position","move-down","move-down-stop",originalPosition,"2000");
				player.emit("move-exit",null,false);
				this.chlewa.emit("move-back",null,false);
				this.co1.emit("fade-in",null,false);
				var allCats=document.querySelectorAll(".category-screens");
				for(var i=0;i<allCats.length;i++){
					allCats[i].setAttribute("scale","1 1 1");
				}
				var allTitles=document.querySelectorAll(".category-title");
				for(var i=0;i<allTitles.length;i++){
					allTitles[i].setAttribute("visible","true");
				}
				var allImages=document.querySelectorAll(".image-group");
				for(var i=0;i<allImages.length;i++){
					allImages[i].setAttribute("scale","1 1 1");
				}
				var allBacks=document.querySelectorAll(".category-backgrounds");
				for(var i=0;i<allBacks.length;i++){
					allBacks[i].setAttribute("scale","1 1 1");
				}			
			}else{
				this.wal1.emit("slide-in",null,false);
				this.wal2.emit("slide-in",null,false);
			}
			//
		}else if(animID.startsWith("slide-in")||animID.startsWith("fade-in")){
			animCounter=0;evil.animateObjects(1,"chamber-category",categories.length+1,category);
		};
		event.stopPropagation();
	},
	
	handleStageanimationcomplete: function(event){	
		var animID=event.detail.name;animID=animID.substring(11,animID.length);
			event.stopPropagation();
		if(animID.startsWith("slide-in")){
			//console.log("resetting projects and getting category data");
			projects=undefined;
			evil.getCategoryData();
			evil.waitForProjects();					
		}
	},	
	handleWallanimationcomplete: function(event){	
		var animID=event.detail.name;animID=animID.substring(11,animID.length);
			event.stopPropagation();
		if(animID.startsWith("slide-in")){
			this.sta.emit("slide-in",null,false);
			this.lede.object3D.visible = true;
			this.ride.object3D.visible = true;	
			this.lede.emit("slide-in",null,false);
			this.ride.emit("slide-in",null,false);
			//this.caba.emit("slide-in",null,false);			
		}
	},
	handleSideWallanimationcomplete: function(event){	
			var animID=event.detail.name;animID=animID.substring(11,animID.length);
			event.stopPropagation();
		if(animID.startsWith("move-back")){
			chamber.querySelector("#chamber-exit").emit("slide-out",null,false);	
		}
	},
	handleDecoranimationcomplete: function(event){	
		var animID=event.detail.name;animID=animID.substring(11,animID.length);
			event.stopPropagation();
		if(animID.startsWith("slide-out")){
			this.lede.object3D.visible = false;
			this.ride.object3D.visible = false;			
		}
	},
	remove: function () {
	// Do something the component or its entity is detached.
	},
	tick: function (time, timeDelta) {
	// Do something on every scene tick or frame.
	}	
}); 