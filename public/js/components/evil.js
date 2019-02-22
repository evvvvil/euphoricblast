AFRAME.registerComponent('evil', {
	//TODO: rewrite this function to just pass _options like function below it
	createAnimation: function(_id,_parent,_attribute,_begin,_end,_to,_dur,_easing,_from){
		var animOptions={
			'property': _attribute,
			'startEvents':_begin,
			'pauseEvents': _end,
			'to':_to,
			'dur': _dur
		};
		if(_easing!==undefined) animOptions.easing=_easing;
		if(_from!==undefined) animOptions.from=_from;
		_parent.setAttribute("animation__"+_id,animOptions);
	},	
	createEntityWithComponent: function(_component,_parent,_options){
		//console.log("creating this: "+_options.id);
		var someshit = document.createElement("a-entity");
			someshit.setAttribute(_component,_options);
			_parent.appendChild(someshit);
			return someshit;
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
			//This fixes some weird bug where images become cubes, no idea why... brute force it into flat plane
			im.setAttribute("geometry","primitive: plane;");
			im.setAttribute("material","shader:flat;");	
			
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
	updateProjectsAndCategories: function(){
		for(var i=0;i<12;i++){			
			if(i<projects.length){

				var pos = (-0.5+i%3*0.5)+" "+(.3+Math.floor(i/3)*0.3)+" "+(-2.1);
				var curProj=chamber.querySelector('#project'+i),
				curProjImg=chamber.querySelector("#project"+i+"-image"),
				curProjTi=chamber.querySelector("#project"+i+"-title");
				curProjBa=chamber.querySelector("#project"+i+"-background");
			
				curProj.setAttribute("frame","amount",projects.length);
				curProj.setAttribute("frame","title",projects[i].title);
				curProj.setAttribute("frame","image",evil.wrangleImageSource(projects[i].mainImage));				
				curProj.setAttribute("position",pos);
				curProj.setAttribute("scale","0 0 0");

				curProjImg.setAttribute("position","0 -0.022 0.005");
				curProjImg.setAttribute("rotation","0 0 0");
				curProjImg.setAttribute("scale","1 1 1");				
				curProjTi.setAttribute("position","0.18 0.1 0.01");
				curProjTi.setAttribute("rotation","0 0 0");
				curProjTi.setAttribute("scale","1 1 1");
				curProjBa.setAttribute("position","0 0 0");
				curProjBa.setAttribute("rotation","0 0 0");
				curProjBa.setAttribute("scale","1 1 1");
				$(curProjBa).addClass('clickable');
				continue;
			}
			//chamber.querySelector('#project'+i).object3D.visible=false;			
		}	
		var posCounter=1;		
		for(var i=0;i<categories.length;i++){
			var curCat=chamber.querySelector('#chamber-category'+(i+1));
			curCat.object3D.visible=true;
			if(i==category-1) {
				curCat.object3D.visible=false;				
			}else{
				var pos = 1.8+" "+(1.0+Math.floor(posCounter/2)*-0.3)+" "+(-0.9+posCounter%2*0.5);
				chamber.querySelector('#chamber-category'+(i+1)).setAttribute("frame","position",pos);					
				posCounter++;				
			}			
		}		
	},	
	removePlayerAnimations: function(){
		$(player.attributes).each(function() {
			if(this.name.startsWith("anim"))player.removeAttribute(this.name);
		});
	},
	resetChamber: function(){
		//player.querySelector("#main-camera").setAttribute("near", 0.1);
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
		chamber.querySelector("#chamber-stage").setAttribute("position","0 0 -0.15");
		chamber.querySelector("#chamber-walls1").setAttribute("position","0 0 0");	
		chamber.querySelector("#chamber-walls2").setAttribute("position","0 0 0");	
		document.querySelector('#box-corridor-0'+category).object3D.visible=true;
		//chamber.object3D.visible=false;
		chamber.setAttribute("position","0 100 0");
		projectHasVideo=false;
	},
	changeVideo: function(projectVideoURL){
		var videoEl=document.querySelector("#project-video-file");
		videoEl.pause();
		videoEl.removeAttribute('src');
		videoEl.load();
		videoEl.setAttribute("src",projectVideoURL);
		videoEl.load();
		videoEl.volume=0;
		//videoEl.pause();
		videoEl.play();
	},
	strip: function(html)
	{
		html=html.replace(/&nbsp;/g,' ');
		html=html.replace(/<br\/>/g,' ');
		html=html.replace(/<br \/>/g,' ');
		html=html.replace( /<\/p>/g,'\n');
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		html= tmp.textContent || tmp.innerText;
	   if(html.length>666){
	   	html=html.substring(0,666);
	   	var finalSpace=html.lastIndexOf(' ');
	   	html=html.substring(0,finalSpace);
	   	html+="...";	   	
	   	//console.log(html);
	   }
		return html;
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
		if(category>=5) y=y2;
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
		if(videoURL==''||videoURL===null||videoURL===undefined||videoURL==" "){
			projectHasVideo=false;
		}else{
			projectHasVideo=true;
			if(videoURL.indexOf("vimeo") !== -1){
				$.ajax({
			      type: 'POST',
			      data: {
			       'message':'scrape_the_fuck_outta_vimeo',
			       'originalVideoURL': videoURL
			      },
			      dataType: 'json'
				});	
			}else{
				$.ajax({
			      type: 'POST',
			      data: {
			       'message':'scrape_the_fuck_outta_youtube',
			       'originalVideoURL': videoURL
			      },
			      dataType: 'json'
				});	
			}
		}
	},
	waitForProjects: function(){
		if(projects!==undefined){
			if(catLoad!==undefined) {
				catLoad.emit("fade-out");
				catLoad=undefined;
			}	
			var sign=document.querySelector("#chamber-sign");			
			sign.querySelector("#chamber-sign-title").setAttribute("scale","0 0 1");
			sign.querySelector("#chamber-sign-back").setAttribute("scale","0 0 1");
			sign.querySelector("#chamber-sign-ye1").setAttribute("scale","0 0 1");
			sign.querySelector("#chamber-sign-ye2").setAttribute("scale","0 0 1");
			sign.setAttribute("scale","1 1 1");
			sign.querySelector("#chamber-sign-back").emit("fade-in");	
			//evil.createProjectsAndCategories();
			evil.updateProjectsAndCategories();
			chamber.setAttribute("chamber","title",categories[category-1]);	
		}else{
			setTimeout(evil.waitForProjects,100);
		}
	},	
	stopanimationcompletePropagation: function(event){
		event.stopPropagation();
	}
}); 