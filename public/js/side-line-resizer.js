$(document).ready(function(){
	checkLineSize();
});

$( window ).resize(function() {
	checkLineSize();
});

function checkLineSize(){
	var wid=$(window).outerWidth();
	console.log("width: "+wid);
	if(wid<=390){
		$(".side-line").each(function( index, value ){
			var curHeight=$(this).closest().children('.project-image-container').outerHeight();
			console.log("curHeight: "+curHeight);
			$(this).height(curHeight+8);
		});
	}
}
