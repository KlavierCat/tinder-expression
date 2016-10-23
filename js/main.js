var profileStage = document.getElementById('profile-pic');

// Grab elements, create settings, etc.
var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	// Not adding `{ audio: true }` since we only want video now
	navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
		video.src = window.URL.createObjectURL(stream);
		video.play();
	});
}

// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');

var drawImage = function(){
	context.drawImage(video, 0, 0, 160, 120);
};

var iterateImages = function(){
	localStorage.setItem("tinder-expression", "[]");
	var howmanyTimes = 12;
	var i = 1;
	
	function changeSrc(){
		var fileName = "img/profile-" + i.toString() + ".jpg";
		profileStage.src = fileName;
		setTimeout(function(){
			drawImage();
			var capturedImg = canvas.toDataURL("image/png");
			var existingPictures = JSON.parse(localStorage.getItem("tinder-expression"));
			var newEntry = {};
			newEntry[fileName] = capturedImg;
			existingPictures.push(newEntry);
			localStorage.setItem("tinder-expression", JSON.stringify(existingPictures));
		}, 1800);
		i++;
		if(i < howmanyTimes){
			setTimeout(changeSrc, 2000);
		}
	}
	
	changeSrc();
};

document.body.onkeydown = function(e) {
	if(e.keyCode=32){
		drawImage();
	}
}

document.getElementById("start").addEventListener("click", function() {
	iterateImages();
})
