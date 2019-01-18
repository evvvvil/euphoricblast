AFRAME.registerComponent('evil', {
	updateValues:function(diff,changedKeys,el,secondTry){
		var values=Object.values(diff);
		for(var i=0;i<changedKeys.length;i++){
			//console.log("changing: "+changedKeys[i]+" for "+values[i]);
			if(el.getAttribute(changedKeys[i])!=null) {
				el.setAttribute(changedKeys[i],values[i]);
			}else{
				if(secondTry!==''&&el.getAttribute(secondTry)!==undefined){
					if(el.getAttribute(secondTry).hasOwnProperty(changedKeys[i])) {
						el.setAttribute(secondTry,changedKeys[i],values[i]);
					}
				}
			}		
		}
	},
	createAnimation: function(_id,_parent,_attribute,_begin,_end,_to,_dur,_easing){
		var anim = document.createElement("a-animation");
			anim.setAttribute("id",_id);
			anim.setAttribute("attribute",_attribute); 
			anim.setAttribute("begin",_begin);
			anim.setAttribute("end",_end);
			anim.setAttribute("to",_to);
			anim.setAttribute("dur",_dur);
			if(_easing!==undefined) anim.setAttribute("easing",_easing);
			_parent.appendChild(anim);	
	},	
	createAnimationFrom: function(_id,_parent,_attribute,_begin,_end,_to,_dur,_from){
		var anim = document.createElement("a-animation");
			anim.setAttribute("id",_id);
			anim.setAttribute("attribute",_attribute); 
			anim.setAttribute("begin",_begin);
			anim.setAttribute("end",_end);
			anim.setAttribute("from",_from);
			anim.setAttribute("to",_to);
			anim.setAttribute("dur",_dur);
			_parent.appendChild(anim);	
	},
	createEntityWithComponent: function(_component,_parent,_options){
		//console.log("creating this: "+_options.id);
		var someshit = document.createElement("a-entity");
			someshit.setAttribute(_component,_options);
			_parent.appendChild(someshit);
	},
	createEntity: function(_parent,_options){
		var someshit = document.createElement("a-entity");
			someshit.setAttribute("id",_options.id);
			if(_options.geometry!==undefined) {
				if(_options.geometry.charAt(0)=="#"){
					someshit.setAttribute("gltf-model",_options.geometry);     
				}else if(_options.geometry.indexOf("value")>=0){
					someshit.setAttribute("text",_options.geometry);
				}else{			
					someshit.setAttribute("geometry",_options.geometry);			
				}
			}		
			if(_options.position!==undefined) someshit.setAttribute("position",_options.position); 
			if(_options.rotation!==undefined) someshit.setAttribute("rotation",_options.rotation);
			if(_options.scale!==undefined) someshit.setAttribute("scale",_options.scale);
	    	if(_options.material!==undefined) someshit.setAttribute("material",_options.material);   
	    	if(_options.class!==undefined) someshit.setAttribute("class",_options.class);
	    	
	    	  	_parent.appendChild(someshit);
	    	return someshit;
	},
	createImage: function(_parent,_options){
		var im = document.createElement("a-image");
			im.setAttribute("id",_options.id);
			if(_options.class!='') im.setAttribute("class",_options.class);
			if(_options.src!='') im.setAttribute("src",_options.src);
			if(_options.width!='') im.setAttribute("width",_options.width);
			if(_options.height!='') im.setAttribute("height",_options.height);    				
			if(_options.position!='') im.setAttribute("position",_options.position);
			if(_options.rotation!='') im.setAttribute("rotation",_options.rotation);
			if(_options.side!='') im.setAttribute("side",_options.side);	
	    	_parent.appendChild(im);
	    	return im;
	},
	createBox: function(_parent,_options){
		var bo=document.createElement("a-box");
			bo.setAttribute("id",_options.id);
			if(_options.class!='') bo.setAttribute("class",_options.class);
			if(_options.width!='') bo.setAttribute("width",_options.width);
			if(_options.height!='') bo.setAttribute("height",_options.height);    				
			if(_options.depth!='') bo.setAttribute("depth",_options.depth);			
			if(_options.position!='') bo.setAttribute("position",_options.position);
			if(_options.rotation!='') bo.setAttribute("rotation",_options.rotation);
			if(_options.material!=='') bo.setAttribute("material",_options.material);
	    	_parent.appendChild(bo);
	    	return bo;
	},
	createProjectsAndCategories: function(){
		var ch=document.querySelector("#chamber");
		for(var i=0;i<projects.length;i++){
			var pos = (-0.5+i%3*0.5)+" "+(.3+Math.floor(i/3)*0.3)+" "+(-1.95);
			var projectOptions={
				'id':'project'+i,
				'class':'Projects',
				'index':i,
				'amount': projects.length,
				'geometry':'primitive:plane;width:.46;height:.25875',
				'material':'#category-background-mat',
				'hover':'#category-background-hover',
				'position':pos,
				'title':projects[i].title,
				'image':evil.wrangleImageSource(projects[i].mainImage)
			};
			evil.createEntityWithComponent("frame",ch,projectOptions);
		}	
		posCounter=1;
		for(var i=0;i<categories.length;i++){
			if(i==category-1) continue;	
			var pos = 1.8+" "+(1.0+Math.floor(posCounter/2)*-0.3)+" "+(-0.9+posCounter%2*0.5);
			posCounter++;			
			var catEl=document.querySelector("#cat-"+(i+1));
			var categoriesOptions={
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
				'image': catEl.getAttribute("homecategory","image")
			};
			evil.createEntityWithComponent("frame",ch,categoriesOptions);
		}
		chamber.setAttribute("chamber","title",categories[category-1]);	
	},
	removeProjectsAndCategories: function(){
		projects=undefined;

			var allProjs=chamber.querySelectorAll(".Projects");		
			for(var i=0;i<allProjs.length;i++){
				chamber.removeChild(allProjs[i]);
			}

			var allCats=chamber.querySelectorAll(".Categories");		
			for(var i=0;i<allCats.length;i++){
				if(allCats[i].id!="chamber-category0") chamber.removeChild(allCats[i]);
			}
	},
	removePlayerAnimations: function(){
			var allAnims=player.querySelectorAll("a-animation");
			for(var i=0;i<allAnims.length;i++){
				if(allAnims[i].id!="circle-reveal")	allAnims[i].parentNode.removeChild(allAnims[i]);
			}
	},
	resetChamber: function(){
		console.log("resrting");
		player.querySelector("#main-camera").setAttribute("near", 0.1);
		chamber.querySelector("#chamber-left-wall").setAttribute("position","-2 .4 -0.66");
		var catWall=chamber.querySelector("#chamber-cat-wall");
		catWall.setAttribute("position","1.85 .51 -0.66");
		catWall.setAttribute("scale","1 0 1");		
		var exit=chamber.querySelector("#chamber-exit");
		exit.setAttribute("position","0 -1 0");
		exit.setAttribute("scale","1 0 1");
		leftDecor=chamber.querySelector("#chamber-left-decor");
		leftDecor.setAttribute("position","-1.96 -0.34 0");
		leftDecor.object3D.visible=true;
		rightDecor=chamber.querySelector("#chamber-right-decor");
		rightDecor.setAttribute("position","1.96 -0.34 0");
		rightDecor.object3D.visible=true;
		var cor01=chamber.querySelector("#chamber-corridor-01");
		cor01.setAttribute("scale","1 1 0");
		cor01.setAttribute("position","-1.92 2 -0.66");
		chamber.querySelector("#chamber-stage").setAttribute("position","0 0 0");
		chamber.querySelector("#chamber-walls1").setAttribute("position","0 0 0");	
		chamber.querySelector("#chamber-walls2").setAttribute("position","0 0 0");	
		document.querySelector('#box-corridor-0'+category).object3D.visible=true;
		chamber.object3D.visible=false;

	},
	changeVideo: function(projectVideoURL){
		var videoEl=document.querySelector("#project-video-file");
		videoEl.pause();
		videoEl.removeAttribute('src');
		videoEl.load();
		videoEl.setAttribute("src",projectVideoURL);
		videoEl.load();
		videoEl.pause();
	},
	strip: function(html)
	{
	   var tmp = document.createElement("DIV"),
	   reducedHTML=html.replace(/<\/p>/gm, "\n");   
	   if(reducedHTML.length>592){
	   	reducedHTML=reducedHTML.substring(0,592)+"...";	
	   }
	   //reducedHTML="\n"+reducedHTML+"\n";   
	   tmp.innerHTML = reducedHTML;
	   return tmp.textContent||tmp.innerText;
	},
	animateObjects: function(direction,stringo,lengtho,indexToAvoid) {
		//console.log("animating this: "+stringo+" counter: "+animCounter+" lengtho: "+lengtho+" avoiding: "+indexToAvoid);
		var timeToWait=100;
		if(!isNaN(indexToAvoid) && animCounter==indexToAvoid){
			timeToWait=0;
		}else{
			if(direction>0){
				document.querySelector("#"+stringo+animCounter).emit('fade-in',null,false);  	
			}else{
				document.querySelector("#"+stringo+animCounter).parentNode.emit('fade-out',null,false);
			}	
		}	
	    animCounter++;
	    if( animCounter < lengtho ){
	    	setTimeout( function() {evil.animateObjects(direction,stringo,lengtho,indexToAvoid)},timeToWait);
	    }
	},
	wrangleDestination: function(x1,y1,z1,x2,y2,z2){
		var x=x1,y=y1,z=z1,modCat=(category-1)%4;
		if(category>5) y=y2;
		if(modCat>0&&modCat<3) {x=x2;z=z2;}
		if(modCat>1)x*=-1;
		return x+" "+y+" "+z+" ";
	},
	wrangleRotation: function(z1,z2){
		var modCat=(category-1)%4,y=30,z=z1;
			if(modCat>0&&modCat<3) y=10;
			if(modCat>1) {y*=-1;z=z2;}
			return 0+" "+y+" "+z;
	},
	wrangleImageSource: function(source){
		//from:
		//euphoricblast/6tutuytutu/euphoricblast-6tutuytutu-mainImage-1523467012837

		//to:
		//http://res.cloudinary.com/dtrroywwa/image/upload/c_fill,g_center,h_328,w_auto/v1/euphoricblast/6tutuytutu/euphoricblast-6tutuytutu-mainImage-1523467012837.jpg
		var result="http://res.cloudinary.com/dtrroywwa/image/upload/c_fill,g_center,h_256,w_512/v"+source.version+"/"+source.public_id+".jpg";
		return result;
	},
	wrangleAnimNumber: function(animID){
		var animNum=animID.charAt(animID.length-1),
		prevChar=animID.charAt(animID.length-2);
		if(!isNaN(prevChar)) animNum =prevChar+animNum;
		animNum=Number(animNum); return animNum; 
	},
	getCategoryData: function(){
		$.ajax({
	      type: 'POST',
	      data: {
	        message: "next_page_yo",
	        cat: category
	      },
	      dataType: 'json'
		});
	},
	getProjectVideo: function(evt,videoURL){		
		if(videoURL!=''&&videoURL!==null){
			$.ajax({
		      type: 'POST',
		      data: {
Framerate
raf
16.5
fps
59.94
Three.js - Memory
Geometries
479
Programs
13
Textures
46
Three.js - Render
Calls
1
Faces
2
Points
0
Vertices
6
A-Frame
Entities
661
Load Time

		       'message':'scrape_the_fuck_outta_vimeo',
		       'originalVideoURL': videoURL
		      },
		      dataType: 'json'
			});	
		}else{
			projectHasVideo=false;
		}	
	},
	waitForProjects: function(){
		if(projects!==undefined){
			if(catLoad!==undefined) {
				catLoad.emit("fade-out");
				catLoad=undefined;
			}	
			document.querySelector("#chamber-sign-back").emit("fade-in");	
			evil.createProjectsAndCategories();
		}else{
			setTimeout(evil.waitForProjects,100);
		}
	},	
	stopAnimationEndPropagation: function(event){
		event.stopPropagation();
	}
}); 