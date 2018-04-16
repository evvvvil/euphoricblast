$(document).ready(function(){
	checkSize();
});

$( window ).resize(function() {
	checkSize();
});

function checkSize(){
var wid=$(window).outerWidth();
//console.log("width: "+wid);
	if(wid<=768){
		var curWid=$(".col-lg-4.video-col").outerWidth();
		$(".col-lg-4.video-col").height(Math.ceil((wid-30)*(9/16)));		
	}else{
		$(".col-lg-4.video-col").height("100%");		
	}
}
