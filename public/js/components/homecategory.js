AFRAME.registerComponent('homecategory', {
	dependencies:['evil'],
	schema: {		
		id: {type:'string'},  
		class: {type:'string'},
		position: {type:'vec3'},
		rotation: {type:'vec3'},
		corridorPosition: {type:'vec3'},
		corridorRotation: {type:'vec3'},
		width: {type:'number'},
		height: {type:'number'},
		title: {type:'string'},
		name: {type:'string'},
		image: {type:'string'},
		index: {type:'number'}
	},
	init: function () {
		var data = this.data, el = this.el,evil=this.evil=document.querySelector('[evil]').components.evil;
			el.setAttribute("id",data.id);
			el.setAttribute("class",data.class);
			el.setAttribute("position",data.position);
			el.setAttribute("rotation",data.rotation);
			
			//el.addEventListener('animationcomplete',this.handleCatAnimationsEnd);

		
		var baho=evil.createEntity(el,{'id':data.id+'-background-holder','class':'category-backgrounds','position':'0 -.25 0.003'})
		var ba=evil.createEntity(baho,{'id':data.id+'-background','geometry':'primitive:plane;width:'+data.width+";height:"+data.height,
			'class':'category-button clickable','position':'0 0.25 0'});
			ba.setAttribute("material","src","#category-background-mat");
			evil.createAnimation("ba-clicked"+data.id,baho,"scale","clicked","clicked-stop","1 0 1","500");
			
			this.handleFrameEnter = AFRAME.utils.bind(this.handleFrameEnter, this);
			this.handleFrameLeave = AFRAME.utils.bind(this.handleFrameLeave, this);
			this.handleCatClicked = AFRAME.utils.bind(this.handleCatClicked, this);	
			this.handleCatAnimationsEnd = AFRAME.utils.bind(this.handleCatAnimationsEnd, this);
			
			ba.addEventListener('mouseenter',this.handleFrameEnter);
			ba.addEventListener('mouseleave',this.handleFrameLeave);
			ba.addEventListener('click',this.handleCatClicked);

			baho.addEventListener('animationcomplete',this.handleCatAnimationsEnd);
			this.ba=ba;
			this.baho=baho;

		var sc1=evil.createEntity(el,{'id':data.id+'-category-screen0','class':'category-screens','geometry':'#screen','position':'-.345 0.25 -0.014'});
		sc1.setAttribute("material","roughness",1);
		sc1.setAttribute("material","metalness",0);
		evil.createAnimation("sc1-clicked-"+data.id,sc1,"scale","clicked","clicked-stop","0 0 1","500");
		this.sc1=sc1;
		sc1.addEventListener('animationcomplete',this.handleCatAnimationsEnd);

		var sc2=evil.createEntity(el,{'id':data.id+'-category-screen1','class':'category-screens','geometry':'#screen','position':'.345 -0.25 -0.014','rotation':'0 0 180'});
		sc2.setAttribute("material","roughness",1);
		sc2.setAttribute("material","metalness",0);
		evil.createAnimation("sc2-clicked-"+data.id,sc2,"scale","clicked","clicked-stop","0 0 1","500");
		this.sc2=sc2;
		sc2.addEventListener('animationcomplete',this.handleCatAnimationsEnd);

		var ti=evil.createEntity(el,{'id':data.id+'-category-title','class':'category-title','geometry':'value: '+data.title+'; width: 1.7; height: auto; color: white;','position':'.54 0.18 0.005'});
		evil.createAnimation("ti-clicked-"+data.id,ti,"scale","clicked","clicked-stop","0 0 1","500");
		this.ti=ti;

		if(data.image!==''){
			var imho=evil.createEntity(el,{'id':data.id+'-image-group','class':'image-group','position':'0 .1355 0.0031'});
			var im=evil.createImage(imho,{'id':data.id+'-image','class:':data.class+'-images',
			'src':data.image,'width':'.6','height':'.3375','position':'0 -.1755 0','side':'front'});
			evil.createAnimation("clicked-im-sca-"+data.id,imho,"scale","clicked","clicked-stop","1 0 1","500");			
			imho.addEventListener('animationcomplete', evil.stopanimationcompletePropagation);
			this.imho=imho;
		}

	},
	handleFrameEnter: function (){
		this.ba.setAttribute('material','src','#category-background-hover');
		this.ti.setAttribute('text','color','black');
		outterRing.object3D.visible=true;
		outterRing.emit('circle-reveal',null,false);	
	},
	handleFrameLeave: function () {		
		this.ba.setAttribute('material','src','#category-background-mat');
		this.ti.setAttribute('text','color','white');
		outterRing.emit('circle-stop',null,false);
		outterRing.setAttribute('theta-length', 0.1);			
		outterRing.object3D.visible=false;
	},
	handleCatAnimationsEnd: function(event) {		
		var data = this.data, el = this.el,evil=this.evil,
		animID=event.detail.name;animID=animID.substring(11,animID.length);
		
		if(animID.startsWith("ba-")){
			this.ti.setAttribute('visible','false');
			var screensArr=el.querySelectorAll('.category-screens');
			for(var i=0;i<screensArr.length;i++){
	    		screensArr[i].emit('clicked',null,false);
			}			
		}
		event.stopPropagation();
	},
	handleCatClicked: function(event) {
	    //console.log('I was clicked at: ', event.detail.intersection.point);
	    //TODO: only works with up to 9 CATEGORIES!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		category=this.data.index;
		evil.getCategoryData();
		this.baho.emit('clicked',null,false);
		var imho=this.imho;
		
		if(imho!==undefined){
			imho.emit('clicked',null,false);	
		}
		this.ti.setAttribute('visible','false');
		var playerTo=this.el.getAttribute('position'),
		pos=playerTo.x+" "+(playerTo.y-1.6)+" "+playerTo.z;		
		evil.createAnimation('move-cat-anim',player,'position','move-cat','move-cat-stop',pos,1500,'linear');

		//Create Corridors
	    scene.querySelector('#box-corridor-0'+category).object3D.visible=false;

		var cors = document.querySelector("#corridors");
			pos=evil.wrangleDestination(-4.16,4.386,-4.877,-1.445,.426,-5.865),
			rot=evil.wrangleRotation(-135,-135);		
	    	cors.setAttribute("position",pos);
	    	cors.setAttribute("rotation",rot);
			cors.object3D.visible = true;
	    pos=evil.wrangleDestination(-4.525,2.786,-5.508,-1.571,-1.174,-6.581);
		evil.createAnimation("move-corridor-anim",player,"position","move-corridor","move-corridor-stop",pos,3000,'linear');	    
    	pos=evil.wrangleDestination(-4.22,3.95,-4.97,-1.46,0.0,-5.95),
		rot=evil.wrangleRotation(0,0);
		chamber.setAttribute("position",pos);
		chamber.setAttribute("rotation",rot);	
		player.emit('move-cat');
		event.stopPropagation();
	}

}); 