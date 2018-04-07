
$(window).on("load", function() {
	var iframe =$('#euphoric-video');
    var vplayer = new Vimeo.Player(iframe);
	//vplayer.setVolume(0);
	vplayer.play();
});
