AFRAME.registerComponent('chamber_image', {
	dependencies: ['evil'],
	schema: {		
		id: {type: 'string'},  
		class: {type: 'string'},
		source: {type:'string',default:'/images/loading_image.jpg'},
		geometry: {type: 'string'},
		width: {type: 'number'},
		height: {type: 'number'},
		position: {type:'vec3'},
		rotation: {type:'vec3'},
		scale: {type:'vec3',default:{x: 0, y: 0, z: 0}},		
	},
	init: function () {
		var data = this.data, el = this.el,evil=this.evil=document.querySelector('[evil]').components.evil;
		el.setAttribute("id",data.id);
		el.setAttribute("class",data.class);
		el.setAttribute("position",data.position);
		el.setAttribute("rotation",data.rotation);
		el.setAttribute("scale",data.scale);

		evil.createAnimation("fade-in-"+data.id,el,"scale","fade-in","fade-stop","1 1 1","500"); 	
		evil.createAnimation("fade-out-"+data.id,el,"scale","fade-out","fade-stop","0 0 0","500");	
		el.addEventListener('animationcomplete', evil.stopanimationcompletePropagation);	
		var ba=evil.createEntity(el,{'id':data.id+'-background','geometry':data.geometry,'class':data.class+'-backgrounds','material':'src:#images-background-mat'});
		var im=evil.createImage(el,{'id':data.id+'-image','position':'0 0 0.0001','width':data.width,'height':data.height,'src':data.source});
		if(data.source!==null) im.setAttribute("src",data.source);
		this.imageEl=im;
	},
	update: function (oldData) {	
		var data=this.data,el=this.el,evil=this.evil,diff=AFRAME.utils.diff(oldData,data),changedKeys=Object.keys(diff);
		if(changedKeys[0]=="source"){
			this.imageEl.setAttribute("src",data.source);
		}else{
			evil.updateValues(diff,changedKeys,el,'');
		}
	}
}); 