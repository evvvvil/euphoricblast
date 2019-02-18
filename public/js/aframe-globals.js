//TODO: check how it works if you select category then while it flies cut off internet so the post fails, it sohuld retry every 10 seconds the post //while in chamber
var socket,evil,outterRing,player,assets,cam,arrows,floor,chamber,projects,projectVideo,numOfProjects,numOfImages,catLoad,projectHasVideo=false,animCounter=0,category=0,projectIndex=-1,exiting=false,projectShown=false,originalPosition="-0.8 1.8 2.5";
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
function initfunc() {	
	outterRing=document.querySelector('#outter-ring');
	player=document.querySelector('#player');
	player.setAttribute("position",originalPosition);
	cam=player.querySelector('#main-camera');
	assets=document.querySelector('a-assets');
	evil=document.querySelector('[evil]');
	chamber=document.querySelector("#chamber");
	arrows=document.querySelector("#main-scene-arrows");
	floor=document.querySelector("#floor");
	if(evil!==null){
		evil=document.querySelector('[evil]').components.evil;	
	}else{
		setTimeout(initfunc,200);
	}
	resize();
}
function resize() {
  var hi=window.innerHeight,wi=window.innerWidth;
  if(cam!==undefined){
  if (wi>hi){
  	if(wi<768)
  	{
  		cam.setAttribute("fov","40");
  	}else{  		
  		cam.setAttribute("fov","70");
  	}
  }else{
  		cam.setAttribute("fov","80");
  }
}
}
window.onload = initfunc;
window.onresize = resize;