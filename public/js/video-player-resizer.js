$(document).ready(function(){
	checkVideoSize();
});

$( window ).resize(function() {
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
	if(!isMobile){
		offset=-10;
	}
	var wid=$(window).outerWidth();
	if(wid<=768 && wid>480){
		var curWid=$(".video-resize").outerWidth();
		$(".video-resize").height(offset+Math.floor((wid-30)*(9/16)));		
	}
	else if(wid<=480){
		var curWid=$(".video-resize").outerWidth();
		$(".video-resize").height(offset+Math.ceil((wid-30)*(9/16)));
	}
}
