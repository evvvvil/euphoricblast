var aspectX=16, aspectY=9;
$(document).ready(function(){
	if(aspect!==undefined){
		var aspectArr=aspect.split("/");
		aspectX=aspectArr[0];		
		if(aspectArr[1].length>1 && !Number.isNaN(aspectArr[1].charAt(1))){
			aspectY=Number(aspectArr[1].substring(0, 2));
		}else{
			aspectY=Number(aspectArr[1].charAt(0));
		}
		console.log("loaded aspectX from data.post.videoAspectRatio: "+aspectX);
		console.log("loaded aspectY from data.post.videoAspectRatio: "+aspectY);
	}
	checkVideoSize();
});

$(window).resize(function() {
	checkVideoSize();
});
function isMobile() {
  if (navigator.userAgent.match(/Mobi/)) {
    return true;
  }
  
  /*if ('screen' in window && window.screen.width < 1366) {
    return true;
  }*/

  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection && connection.type === 'cellular') {
    return true;
  }
  return false;
}

function checkVideoSize(){
	var offset=0;
	if(!isMobile()){
		offset=-10;
	}
	var wid=$(window).outerWidth();
	if(wid<=768 && wid>480){
		var curWid=$(".video-resize").outerWidth();
		$(".video-resize").height(offset+Math.floor((wid-30)*(aspectY/aspectX)));		
	}
	else if(wid<=480){
		var curWid=$(".video-resize").outerWidth();
		$(".video-resize").height(offset+Math.ceil((wid-30)*(aspectY/aspectX)));
	}
}
