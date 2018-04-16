$(document).ready(function(){
	checkSize();
});

$( window ).resize(function() {
	checkSize();
});

function checkSize(){
var wid=$(".col-lg-4.video-col").outerWidth();
	console.log("wdith "+wid);
	if(wid<768){
		console.log("resizing video container!");
		$(".col-lg-4.video-col").height(Math.floor((wid-30)*(9/16)));
		console.log("resized to: "+Math.floor((wid-30)*(9/16)));
	}
}

/*var bro;
function checkHeight(bro){

	var numOfImages=($(".about-text-section>.container>.row>.about-image").length);
	var numOfRows=Math.ceil(numOfImages/bro);

	//if(numOfImages%bro==0){
		for(var i=0;i<numOfRows;i++){
			//console.log("i"+i);
				var maxHeight=0;
				for(var j=i*bro;j<(i+1)*bro;j++){
					//
					var currentHeight = $(".about-text-section>.container>.row>.about-image").eq(j).find( ".about-image-text-container").height();
					console.log("j "+j+" currentHeight="+currentHeight);
					if (maxHeight<currentHeight){	maxHeight= currentHeight;}
				}

				//for(var j=i*bro;j<(i+1)*bro;j++){
					//console.log("fuck "+j);
					//$(".about-text-section>.container>.row>.about-image").eq(j).find( ".about-image-text-container").height(maxHeight);
				//}
		}
	//}
}

function checkSize(){
	var wid=$( window ).outerWidth();
	if ($("body").height() > $(window).height()) {
				wid+=17;
		}
	console.log("browser width="+wid);
	if(wid>=992){
			checkHeight(6);
	}else if(wid>=768 && wid<992){
			checkHeight(4);
	}else if(wid>=480 && wid<768){
			checkHeight(3)
	}else if(wid<480){
			checkHeight(2);
	}
}
*/