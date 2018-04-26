$(document).ready(function(){
	checkVideoSize();
});

$( window ).resize(function() {
	checkVideoSize();
});

function checkVideoSize(){
	var wid=$(window).outerWidth();
	if(wid<=768 && wid>480){
		var curWid=$(".video-resize").outerWidth();
		$(".video-resize").height(Math.floor((wid-30)*(9/16)));		
	}
	else if(wid<=480){
		var curWid=$(".video-resize").outerWidth();
		$(".video-resize").height(Math.ceil((wid-30)*(9/16)));
	}
}
