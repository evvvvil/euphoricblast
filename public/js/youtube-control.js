
function onYouTubeIframeAPIReady() {
    player = new YT.Player('euphoric-video', {
        events: {
		   'onReady': onPlayerReady
        }
    });
}
function onPlayerReady(event) {
	event.target.setVolume(0);
	event.target.playVideo();
}
var player;
$(window).on("load", function() {
var tag = document.createElement('script');
tag.src = "/js/vimeo-player.js";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});