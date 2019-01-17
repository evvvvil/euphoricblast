AFRAME.registerComponent('chamber_sign', {
	dependencies: ['evil'],
	schema: {		
		id: {type: 'string'},		
		class: {type: 'string'},
		title: {type: 'string'},
		geometry: {type: 'string'},
		material: {type: 'color'},
		position: {type:'vec3'},
		rotation: {type:'vec3'},
		text: {type: 'string'},
		speed: {type:'number',default:500},
		autostart: {type:'boolean',default:false},
	},
	init: function () {		
		var data = this.data, el = this.el,evil=this.evil=document.querySelector('[evil]').components.evil;

		el.setAttribute("id",data.id);		
		if(data.class!='') el.setAttribute("class",data.class);
		if(data.position!='') el.setAttribute("position",data.position);
		if(data.rotation!='') el.setAttribute("rotation",data.rotation);
		
		//el.setAttribute("scale","0 0 0");
		this.handleSignAnimationEnd = AFRAME.utils.bind(this.handleSignAnimationEnd, this);
		//console.log(data.id+" data.title "+data.title);
		//console.log(data.id+" data.geometry "+data.geometry);
		var ti=evil.createEntity(el,{'id':data.id+'-title','geometry':data.title,'scale':'0 0 0'});
			evil.createAnimation("fadein-"+data.id+'-title',ti,"scale","fade-in","fade-stop","1 1 1",data.speed);
			evil.createAnimation("fadeout-"+data.id+'-title',ti,"scale","fade-out","fade-stop","0 0 0",data.speed);				
			ti.addEventListener('animationend', this.handleSignAnimationEnd);
			this.titleEl=ti;

		var ba=evil.createEntity(el,{'id':data.id+'-back','geometry':data.geometry,'scale':'0 0 0'});
		ba.setAttribute('material','color',data.material)
			evil.createAnimation("fadein-"+data.id+'-back',ba,"scale","fade-in","fade-stop","1 1 1",data.speed);
			evil.createAnimation("fadeout-"+data.id+'-back',ba,"scale","fade-out","fade-stop","0 0 0",data.speed);	
			ba.addEventListener('animationend', this.handleSignAnimationEnd);
			this.backgroundEl=ba;
			if(data.autostart) ba.emit("fade-in",null,false);
	},
	update: function (oldData) {	
		var data=this.data,el=this.el,evil=this.evil,diff=AFRAME.utils.diff(oldData,data),changedKeys=Object.keys(diff);
			if(changedKeys[0]=="text"){
				this.titleEl.setAttribute('text','value',data.text);	
			}else{
				evil.updateValues(diff,changedKeys,el,'');
			}
	},
	handleSignAnimationEnd: function (event){
		var tar=event.target;
		if(tar.id.indexOf("-back")>0) {
			if(tar.getAttribute("begin")=="fade-in") {
				this.titleEl.emit("fade-in",null,false);
			}			
		}else if(tar.id.indexOf("-title")>0) {
			if(tar.getAttribute("begin")=="fade-in") {
				if(numOfProjects>0){
					animCounter=0;evil.animateObjects(1,"project",numOfProjects,'A');
				}else{
					var catWall=chamber.querySelector("#chamber-cat-wall");
					if(catWall.getAttribute("scale").y<1){
						catWall.emit("fade-in",null,false);
					}else{
						catWall.emit("slide-in",null,false);
					}
				}				
			}			
		}
		event.stopPropagation();
	}
}); 