AFRAME.registerComponent('player', {
	schema: {
		id: {type: 'string',default:'player'}
	},	
	init: function () {		
		var data = this.data, el = this.el;
		//el.setAttribute("id",data.id);
	    this.handlePlayerAnimationsComplete = AFRAME.utils.bind(this.handlePlayerAnimationsComplete, this);
		el.addEventListener('animationcomplete', this.handlePlayerAnimationsComplete);
	},
	handlePlayerAnimationsComplete: function (event){
		var animID=event.detail.name,pos;
		console.log("eventdetail is: "+animID);
		animID=animID.substring(11,animID.length);
		event.stopPropagation();
		if(animID=="move-cat-anim"){
			player.querySelector('#main-camera').setAttribute('near', 0.03);
			document.querySelector("#ambient-light").emit('fade-in',null,false);
			document.querySelector("#directional-light").emit('fade-out',null,false);
		    pos=evil.wrangleDestination(-3.33,4.386,-3.439,-1.156,.426,-4.230);
		    evil.createAnimation("move-tunnel-anim",player,"position","move-tunnel","move-tunnel-stop",pos,2000*speedMult,'linear');			
		    player.emit('move-tunnel',null,false);	    
		}else if(animID=="move-tunnel-anim"){
				arrows.object3D.visible=false;
				floor.object3D.visible=false;
				player.emit('move-corridor',null,false);
				document.querySelector('#corridor-01').emit('spin-corridor',null,false);
				document.querySelector('#corridor-02').emit('spin-corridor',null,false);
		}else if(animID=="move-corridor-anim"){
			if(projects==undefined){
				catLoad=document.querySelector("#chamber-loading");
				catLoad.emit("fade-in");			
			}
			evil.waitForProjects();
		}else if(animID=="move-exit-anim"){
			player.emit('move-vert',null,false);
		}else if(animID=="move-co-vert-anim"){
			player.emit('move-horz',null,false);
		}else if(animID=="move-co-horz-anim"){
			arrows.object3D.visible=true;
			floor.object3D.visible=true;
			player.object3D.position.set(-1, 5.4, 3);
			var kink=document.querySelector("#kink"),
			corridorEnd=document.querySelector("#corridor-end"),
			kink2=chamber.querySelector("#chamber-kink-02"),
			cor2=chamber.querySelector("#chamber-corridor-02"),
			kink2Rot=kink2.getAttribute("rotation"),
			corRot=cor2.getAttribute("rotation"),
			chamberRot=chamber.getAttribute("rotation"),
			rotX=kink2Rot.x+chamberRot.x,
			rotY=kink2Rot.y+chamberRot.y,
			rotZ=kink2Rot.z+chamberRot.z,
			rotCorX=corRot.x+chamberRot.x,
			rotCorY=corRot.y+chamberRot.y,
			rotCorZ=corRot.z+chamberRot.z;
			
			kink.object3D.rotation.set(
			  THREE.Math.degToRad(rotX),
			  THREE.Math.degToRad(rotY),
			  THREE.Math.degToRad(rotZ)
			);	
			corridorEnd.object3D.rotation.set(
			  THREE.Math.degToRad(rotCorX),
			  THREE.Math.degToRad(rotCorY),
			  THREE.Math.degToRad(rotCorZ)
			);				
			kink.object3D.visible = true;
			corridorEnd.object3D.visible = true;

			evil.createAnimation("change-near",cam,"near","adjust-near","adjust-near-stop","0.1",2000,"linear");	    
		    cam.emit('adjust-near',null,false);
			player.emit('move-down',null,false);	
		}else if(animID=="move-co-down-anim"){
			evil.removePlayerAnimations();
			evil.resetChamber();
		}	
	}	
}); 