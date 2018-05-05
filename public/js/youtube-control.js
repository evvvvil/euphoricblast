var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('euphoric-video', {
        events: {
		   'onReady': onPlayerReady
        }
    });
}
function onPlayerReady(event) {
	var fn = function(){event.target.playVideo(); }
    setTimeout(fn, 50);
}
$(window).on("load", function() {
	var tag = document.createElement('script');
	tag.src = "/js/youtube-player.js";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});