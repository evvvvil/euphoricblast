AFRAME.registerComponent('text_plane', {
	dependencies: ['evil'],
	schema: {
		padding: {type: 'number'},
		id: {type: 'string'},
    	align: {type: 'string',default:'left'},
    	content: {type: 'string',default: ''},
		wrapCount: {type: 'number'},
		width: {type: 'string'},
		height: {type: 'string',default:'auto'},
		color: {type: 'color',default:'#333'},
		material: {type: 'color',default:'#FFF'},
		position: {type:'vec3'},
		rotation: {type:'vec3'}
	},
	init: function () {		
		var data = this.data, el = this.el,evil=this.evil=document.querySelector('[evil]').components.evil;		
		el.setAttribute("id",data.id);
		el.setAttribute("text","align",data.align);
		el.setAttribute("text","baseline","center");
		el.setAttribute("text","width",data.width);
		el.setAttribute("text","height",data.height);
		el.setAttribute("text","wrapCount",data.wrapCount);
		el.setAttribute("text","color",data.color);

		//TODO: change this
		el.setAttribute("material","color","#DDD");
		el.setAttribute("position",data.position);
		el.setAttribute("rotation",data.rotation);
		el.setAttribute("material","shader","flat");
		//el.setAttribute("geometry","primitive:plane;width:.53;height:0.02872");
		evil.createAnimation("fadein-"+data.id,el,"scale","fade-in","fade-stop","1 1 1","1000");		
		evil.createAnimation("fadeout-"+data.id,el,"scale","fade-out","fade-stop","0 0 0","1000");
		var dummyText='Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet';
		el.setAttribute("geometry","primitive:plane;width:auto;height:auto");
			
		el.setAttribute("text","value",dummyText);
		el.setAttribute("scale","0 0 0");
		//el.setAttribute("position",data.position.x+" "+(data.position.y+(0.02872+data.padding)/2)+" "+data.position.z);
		el.addEventListener('animationcomplete', this.handleVideoanimationcomplete);					
	},
	update: function (oldData) {	
		var data=this.data,el=this.el,evil=this.evil,diff=AFRAME.utils.diff(oldData,data),changedKeys=Object.keys(diff);
		if(changedKeys[0]=="content"){
			el.setAttribute("scale","1 1 1");
			el.setAttribute("geometry","primitive:plane;width:auto;height:auto");
			el.setAttribute("text","value",data.content);	
			var geomAtt=el.getAttribute("geometry"),
			widtho=geomAtt.width,
			heighto=geomAtt.height;
			el.setAttribute("geometry","height",heighto+data.padding);	
			el.setAttribute("geometry","width",widtho+data.padding);
			el.setAttribute("position",data.position.x+" "+(data.position.y+(heighto+data.padding)/2)+" "+data.position.z);
		}
	},
	remove: function () {
	// Do something the component or its entity is detached.
	},
	tick: function (time, timeDelta) {
	// Do something on every scene tick or frame.
	}	
}); 