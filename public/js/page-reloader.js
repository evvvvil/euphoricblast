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
		location.reload();
	}
	prev=$(window).outerWidth();
}

