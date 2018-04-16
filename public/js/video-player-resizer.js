$(document).ready(function(){
	checkSize();
});

$( window ).resize(function() {
	checkSize();
});

function checkSize(){
var wid=$(".col-lg-4.video-col").outerWidth();
	if(wid<=768){
		$(".col-lg-4.video-col").height(Math.ceil((wid-30)*(9/16)));		
	}
}
