var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('euphoric-video', {
        events: {
		   'onReady': onPlayerReady
        }
    });
}
function onPlayerReady(event) {
	console.log("broski loaded youtube player!");
	event.target.setVolume(50);
	var fn = function(){event.target.playVideo(); }
        setTimeout(fn, 1000);
	event.target.playVideo();
}
$(window).on("load", function() {
var tag = document.createElement('script');
tag.src = "/js/youtube-player.js";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});