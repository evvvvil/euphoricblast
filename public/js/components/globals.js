//TODO: check how it works if you select category then while it flies cut off internet so the post fails, it sohuld retry every 10 seconds the post //while in chamber
var socket,evil,outterRing,player,scene,assets,cam,arrows,floor,chamber,projects,projectVideo,numOfProjects,numOfImages,catLoad,projectHasVideo=false,animCounter=0,category=0,projectIndex=-1,exiting=false,projectShown=false,
originalPosition="-0.8 0.2 2.5";
socket = io();
socket.on('projectsData', function (data) {
	projects=data;
	chamber.setAttribute("chamber","projects",projects);
	numOfProjects=projects.length;	
});
socket.on('projectVideo', function (data) {
	projectVideo=data.toString();
	evil.changeVideo(projectVideo);
});
function getEvil(){
	evil=document.querySelector('[evil]');	
	if(evil!==null){
		evil=document.querySelector('[evil]').components.evil;	
	}else{
		setTimeout(getEvil,200);
	}
}
function enteringVR(){
//we entering VR
}
function exitingVR(){
	console.log("exiting vr");
	cam.setAttribute("position","0 1.6 0");
}
function initfunc() {	
	resize();
	outterRing=document.querySelector('#outter-ring');
	player=document.querySelector('#player');
	cam=document.querySelector('#main-camera');
	assets=document.querySelector('a-assets');
	chamber=document.querySelector("#chamber");
	arrows=document.querySelector("#main-scene-arrows");
	floor=document.querySelector("#floor");		
	scene=document.querySelector("a-scene"); 		
	player.setAttribute("position",originalPosition);	
	getEvil();
}
function resize() {
  var hi=window.innerHeight,wi=window.innerWidth;  
  if (wi>hi){
  	if(wi<768)
  	{
  		cam.setAttribute("fov","50");
  	}else{  		
  		cam.setAttribute("fov","70");
  	}
  }else{
  		cam.setAttribute("fov","80");
  }
}
window.onload = initfunc;
window.onresize = resize;
scene=document.querySelector("a-scene"); 	
console.log("doc "+document);
console.log("sce "+scene);
	scene.addEventListener('enter-vr',enteringVR);
	scene.addEventListener('exit-vr',exitingVR);	
	scene.addEventListener('loaded',initfunc);	