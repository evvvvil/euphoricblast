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
			this.handleCatAnimationsEnd = AFRAME.utils.bind(this.handleCatAnimationsEnd, this);
			el.addEventListener('animationend',this.handleCatAnimationsEnd);

		
		var baho=evil.createEntity(el,{'id':data.id+'-background-holder','class':'category-backgrounds','position':'0 -.25 0.003'})
		var ba=evil.createEntity(baho,{'id':data.id+'-background','geometry':'primitive:plane;width:'+data.width+";height:"+data.height,
			'class':'category-button clickable','position':'0 0.25 0'});
			ba.setAttribute("material","src","#category-background-mat");
			evil.createAnimation("ba-clicked"+data.id,baho,"scale","clicked","clicked-stop","1 0 1","500");
			
			this.handleFrameEnter = AFRAME.utils.bind(this.handleFrameEnter, this);
			this.handleFrameLeave = AFRAME.utils.bind(this.handleFrameLeave, this);
			this.handleCatClicked = AFRAME.utils.bind(this.handleCatClicked, this);	
			
			ba.addEventListener('mouseenter',this.handleFrameEnter);
			ba.addEventListener('mouseleave',this.handleFrameLeave);
			ba.addEventListener('click',this.handleCatClicked);
			this.ba=ba;
			this.baho=baho;

		var sc1=evil.createEntity(el,{'id':data.id+'-category-screen0','class':'category-screens','geometry':'#screen','position':'-.345 0.25 -0.014'});
		sc1.setAttribute("material","roughness",1);
		sc1.setAttribute("material","metalness",0);
		evil.createAnimation("sc1-clicked-"+data.id,sc1,"scale","clicked","clicked-stop","0 0 1","500");
		this.sc1=sc1;

		var sc2=evil.createEntity(el,{'id':data.id+'-category-screen1','class':'category-screens','geometry':'#screen','position':'.345 -0.25 -0.014','rotation':'0 0 180'});
		sc2.setAttribute("material","roughness",1);
		sc2.setAttribute("material","metalness",0);
		evil.createAnimation("sc2-clicked-"+data.id,sc2,"scale","clicked","clicked-stop","0 0 1","500");
		this.sc2=sc2;

		var ti=evil.createEntity(el,{'id':data.id+'-category-title','class':'category-title','geometry':'value: '+data.title+'; width: 1.7; height: auto; color: white;','position':'.54 0.18 0.005'});
		evil.createAnimation("ti-clicked-"+data.id,ti,"scale","clicked","clicked-stop","0 0 1","500");
		this.ti=ti;

		if(data.image!==''){
			var imho=evil.createEntity(el,{'id':data.id+'-image-group','class':'image-group','position':'0 .1355 0.0031'});
			var im=evil.createImage(imho,{'id':data.id+'-image','class:':data.class+'-images',
			'src':data.image,'width':'.6','height':'.3375','position':'0 -.1755 0','side':'front'});
			evil.createAnimation("clicked-im-sca-"+data.id,imho,"scale","clicked","clicked-stop","1 0 1","500");			
			imho.addEventListener('animationend', evil.stopAnimationEndPropagation);
			this.imho=imho;
		}

/*		<a-entity anim-listener="listener:handleCatAnim" class="category-image-container" position="0 .1355 0.0031" material="src:#category-background-mat">
							<a-image class="category-image" src="{{cloudinaryUrl mainImage width='960' height='540' q='70' crop='fill' gravity='center'}}" width=".6" height=".3375" position="0 -.1755 0">
							<a-animation class="hover" attribute="scale" begin="hover" end="hover-stop" from="1 1 1" to="1.07 1.04 1.07" dur="400" easing="linear"></a-animation>
							</a-image>
							<a-animation class="clicked-image" attribute="scale" begin="clicked" end="clicked-stop" to="1 0 1" dur="500" easing="linear"></a-animation>
						</a-entity>*/

		/*var te=evil.createEntity(el,{'id':data.id+'-title','geometry':"value:"+data.title+"; width: 1.2; height: auto; color: white;",
			'position':'.38 0.1 0.005','class' :data.class+'-titles'});
			evil.createAnimation("reveal-te-"+data.id,te,"position","project-clicked","project-stop","0.45 0.2 0.05","2000");		
			evil.createAnimation("clicked-te-sca-"+data.id,te,"scale","project-clicked","project-stop","2.0 2.0 1.0","2000");
			evil.createAnimation("clicked-te-rot-"+data.id,te,"rotation","project-clicked","project-stop","0 360 0","2000");
			evil.createAnimation("reverse-te-"+data.id,te,"position","back-clicked","back-stop",".38 0.1 0.005","2000");			
			evil.createAnimation("back-te-rot-"+data.id,te,"rotation","back-clicked","back-stop","0 0 0","2000");
			evil.createAnimation("back-te-sca-"+data.id,te,"scale","back-clicked","back-stop","1 1 1","2000");	
			te.addEventListener('animationend', evil.stopAnimationEndPropagation);
			this.titleEl=te;*/

		/*  <a-entity class="category-container" id="cat-{{add @index 1}}" position="{{AFgetCategoriesPos @index 0 0}}" rotation="{{AFgetCategoriesRot @index 0 0}}">
			<!--CATEGORY PLANE-->	
			<a-entity category-listener class="category-button clickable" geometry="primitive:plane;width:.69;height:.5" position="0 0 0.003" visible="false"></a-entity>
			<a-entity anim-listener="listener:handleCatAnim" class="category-background-container" position="0 -.25 0.003">
				<a-entity class="category-background" geometry="primitive:plane;width:.69;height:.5" position="0 .25 0" material="src:#category-background-mat"></a-entity>
				<a-animation class="clicked-background" attribute="scale" begin="clicked" end="clicked-stop" from="1 1 1" to="1 0 1" dur="400" easing="linear"></a-animation>
			</a-entity>			
			<!--CATEGORY SCREENS-->	
			<a-entity class="category-screens" position="-.345 0.25 -0.014" gltf-model="#screen" material="roughness: 1; metalness: 0">
				<a-animation class="clicked-screen" attribute="scale" begin="clicked" end="clicked-stop" from="1 1 1" to="0 0 1" dur="500" easing="linear"></a-animation>
			</a-entity>
			<a-entity class="category-screens" position=".345 -0.25 -0.014" rotation="0 0 180" gltf-model="#screen" material="roughness: 1; metalness: 0">
				<a-animation class="clicked-screen" attribute="scale" begin="clicked" end="clicked-stop" from="1 1 1" to="0 0 1" dur="500" easing="linear"></a-animation>
			</a-entity>
			<!--CATEGORY TITLE-->	
			<a-entity class="category-title" position=".54 0.18 0.005" text="value: {{name}}; width: 1.7; height: auto; color: white;"></a-entity>			
			{{#each ../data.featuredPosts}}
				{{#ifPostIsInCategory categories ../name}}
					{{#if mainImage.exists}}	
						<!--CATEGORY IMAGE-->
						<a-entity anim-listener="listener:handleCatAnim" class="category-image-container" position="0 .1355 0.0031" material="src:#category-background-mat">
							<a-image class="category-image" src="{{cloudinaryUrl mainImage width='960' height='540' q='70' crop='fill' gravity='center'}}" width=".6" height=".3375" position="0 -.1755 0">
							<a-animation class="hover" attribute="scale" begin="hover" end="hover-stop" from="1 1 1" to="1.07 1.04 1.07" dur="400" easing="linear"></a-animation>
							</a-image>
							<a-animation class="clicked-image" attribute="scale" begin="clicked" end="clicked-stop" to="1 0 1" dur="500" easing="linear"></a-animation>
						</a-entity>
					{{/if}}	
				{{/ifPostIsInCategory}}
			{{/each}}					
		</a-entity>
		<a-box id="corridor-0{{add @index 1}}" depth="3" width=".4" height=".4" position="{{AFgetCorridorsPos @index -4.16 4.386 -4.877 -1.445 0.426 -5.865}}" rotation="{{AFgetCategoriesRot @index -144 -126}}" material="color: white"></a-box>
		{{/each}}*/
	},
	handleFrameEnter: function (){
		this.ba.setAttribute('material','src','#category-background-hover');
		outterRing.emit('circle-reveal',null,false);	
	},
	handleFrameLeave: function () {		
		this.ba.setAttribute('material','src','#category-background-mat');
		outterRing.emit('circle-stop',null,false);
		outterRing.setAttribute('theta-length', 0);	
	},
	handleCatAnimationsEnd: function(event) {		
		var data = this.data, el = this.el,evil=this.evil;
		if(event.target.id.startsWith("ba-")){
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
		outterRing.emit('circle-stop');
		outterRing.setAttribute('theta-length', 0);
		var playerTo=this.el.getAttribute('position'),
		pos=playerTo.x+" "+playerTo.y+" "+playerTo.z,
		an=evil.createAnimation('move-cat-anim',player,'position','move-cat','move-cat-stop',pos,2000*speedMult,'linear');
	
		player.emit('move-cat');
		event.stopPropagation();
	}

}); 