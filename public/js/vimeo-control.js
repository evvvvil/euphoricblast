function stopVimeoPlayer(iframeName){
  var iframe = $('#'+iframeName);
  var player = new Vimeo.Player(iframe);
	player.unload();
}

function startVimeoPlayer(iframeName){
  var iframe = $('#'+iframeName);
  var player = new Vimeo.Player(iframe);
  player.play();
}
