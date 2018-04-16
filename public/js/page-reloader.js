var prev;
$(document).ready(function(){
	prev=$(window).outerWidth();
});
$( window ).resize(function() {
	checkForReload();
});
var prev;
function checkForReload(){
	if(prev>992 || prev<768)
	{
		var curWidth=$(window).outerWidth();
		if(curWidth<992&&curWidth>769)
		{
		location.reload();	
		}		
	}
	prev=$(window).outerWidth();
}

