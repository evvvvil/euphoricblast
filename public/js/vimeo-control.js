/*function stopVimeoPlayer(iframeName){
  var iframe = $('#'+iframeName);
  var player = new Vimeo.Player(iframe);
	player.unload();
}

function startVimeoPlayer(iframeName){
  var iframe = $('#'+iframeName);
  var player = new Vimeo.Player(iframe);
  player.play();
}*/

$(window).on("load", function() {

	var vplayer = new Vimeo.Player($("#euphoric-video"));
    vplayer.on('play', function() {
        vplayer.setVolume(0)
    });

	});
