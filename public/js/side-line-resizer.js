$(document).ready(function(){
	checkLineSize();
});

$( window ).resize(function() {
	checkLineSize();
});

function checkLineSize(){
	var wid=$(window).outerWidth();
	//console.log("width: "+wid);
	if(wid<=390){
		$(".side-line").each(function(){
			var curHeight=$(this).parents().children('.project-image-container').outerHeight();
			//console.log("curHeight: "+$(this).parents().children('.project-image-container').outerHeight());
			$(this).height(curHeight+7);
		});
	}
}
