(() => {
	console.log("Fired");

	// Variable stack
	// Grab the shields at the bottom of the page
	const 	shields		= document.querySelectorAll('.sigil-container'),
			lightBox 	= document.querySelector('.lightbox'),
			video		= document.querySelector('video');

	function showLightbox() {
		lightBox.classList.add("show-lightbox");
		video.play();
	}

	function hideLightbox() {
		lightBox.classList.remove("show-lightbox");

		// Rewind the video to the beginning and pause it
		video.currentTime = 0;
		video.pause();
	}

	shields.forEach(shield => shield.addEventListener("click", showLightbox));

	video.addEventListener("ended", hideLightbox);
})();