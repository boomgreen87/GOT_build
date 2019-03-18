(() => {
	console.log("Fired");

	// Variable stack
	// Grab the shields at the bottom of the page
	const 	shields		= document.querySelectorAll('.sigil-container'),
			lightBox 	= document.querySelector('.lightbox'),
			video		= document.querySelector('video'),
			closeLB		= document.querySelector('.lightbox-close'),
			banners 	= document.querySelector('#houseImages');

	function showLightbox() {
		// Grab the right video source
		// Get the lowercase house name from the class list
		let targetHouse = this.className.split(" ")[1];

		// Make sure the names match - needs to be uppercase
		// stark become Stark => First make capital S then add ark (for any class name)
		let targetSrc = targetHouse.charAt(0).toUpperCase() + targetHouse.slice(1);
		video.src = `video/House-${targetSrc}.mp4`;

		lightBox.classList.add("show-lightbox");
		video.load();
		video.play();
	}

	function hideLightbox() {
		lightBox.classList.remove("show-lightbox");

		// Rewind the video to the beginning and pause it
		video.currentTime = 0;
		video.pause();
	}

	function animateBanner() {
		const offSet = 600; // This is the offset / width of one banner

		// This is the total distance the images need to move as a pixel value
		// data.offset is coming from each shield we click on.
		totalOffset = this.dataset.offset * offSet + "px";
		banners.style.right = totalOffset;
	}

	// shields.forEach(shield => shield.addEventListener("click", showLightbox));
	shields.forEach(shield => shield.addEventListener("click", animateBanner));

	video.addEventListener("ended", hideLightbox);

	closeLB.addEventListener("click", hideLightbox);
})();