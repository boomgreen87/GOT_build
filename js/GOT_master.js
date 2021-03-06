(() => {
	console.log("Fired");

	// Variable stack
	// Grab the shields at the bottom of the page
	const 	shields				= document.querySelectorAll('.sigil-container'),
			lightBox 			= document.querySelector('.lightbox'),
			video				= document.querySelector('video'),
			playButton 			= document.querySelector('.play'),
			pauseButton 		= document.querySelector('.pause'),
			rewindButton		= document.querySelector('.rewind'),
			fastForwardButton 	= document.querySelector('.fastForward'),
			volume 				= document.querySelector('.volume'),
			volumeSet			= document.querySelector('.volumeSet'),
			closeLB				= document.querySelector('.lightbox-close'),
			banners 			= document.querySelector('#houseImages'),
			houseName			= document.querySelector('.house-name'),
			houseInfo			= document.querySelector('.house-info');

	const houseData = [
		[`STARK`, `House Stark of Winterfell is a Great House of Westeros, ruling over the vast region known as the North from their seat in Winterfell. It is one of the oldest lines of Westerosi nobility by far, claiming a line of descent stretching back over eight thousand years. Before the Targaryen conquest, as well as during the War of the Five Kings and Daenerys Targaryen's invasion of Westeros, the leaders of House Stark ruled over the region as the Kings in the North.`],

		[`BARATHEON`, `House Baratheon of Storm's End is a legally extinct Great House of Westeros. A cadet branch was formerly the royal house, but House Lannister now controls the throne. House Baratheon traditionally ruled the Stormlands on the eastern coast of Westeros, aptly named for its frequent storms, from their seat of Storm's End.

		 House Baratheon became the royal house of the Seven Kingdoms after Robert Baratheon led a rebellion against the Targaryen dynasty. At the end of the rebellion, Robert ascended the Iron Throne as Robert I and married Cersei Lannister after the death of Lyanna Stark.`],

		[`LANNISTER`, `House Lannister of Casterly Rock is one of the Great Houses of Westeros, one of its richest and most powerful families and oldest dynasties. It is also the current royal house of the Seven Kingdoms following the extinction of House Baratheon of King's Landing, which had been their puppet house anyway.

		 	The Lannisters rule over the Westerlands. Their seat is Casterly Rock, a massive rocky promontory overlooking the Sunset Sea which has had habitations and fortifications built into it over the millennia. They are the Lords Paramount of the Westerlands and Wardens of the West. As the new royal house, they also rule directly over the Crownlands from their seat of the Red Keep in King's Landing, the traditional seat of the royal family.`],

		[`TULLY`, `House Tully of Riverrun is an exiled Great House of Westeros. Its most senior member carried the title of Lord of Riverrun and Lord Paramount of the Trident, until the Red Wedding. The current head is Lord Edmure Tully, son of the late Hoster Tully. The Tully sigil is a silver trout on a red and blue background. Their house words are "Family, Duty, Honor."`],

		[`GREYJOY`, `House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over the Iron Islands, a harsh and bleak collection of islands off the west coast of Westeros, from the castle at Pyke. The head of the house is the Lord Reaper of Pyke.

		 	House Greyjoy's sigil is traditionally a golden kraken on a black field. Their house words are "We Do Not Sow," although the phrase "What Is Dead May Never Die" is also closely associated with House Greyjoy and their bannermen, as they are associated with the faith of the Drowned God.`],

		[`ARRYN`, `House Arryn of the Eyrie is one of the Great Houses of Westeros. It has ruled over the Vale of Arryn for millennia, originally as the Kings of Mountain and Vale and more recently as Lords Paramount of the Vale and Wardens of the East under the Targaryen kings and Baratheon-Lannister kings. The nominal head of House Arryn is Robin Arryn, the Lord of the Eyrie, with his stepfather Petyr Baelish acting as Lord Protector until he reaches the age of majority.`],

		[`TARGARYEN`, `House Targaryen of Dragonstone is a Great House of Westeros and was the ruling royal House of the Seven Kingdoms for three centuries since it conquered and unified the realm, before it was deposed during Robert's Rebellion and House Baratheon replaced it as the new royal House. The few surviving Targaryens fled into exile to the Free Cities of Essos across the Narrow Sea. Currently based on Dragonstone off of the eastern coast of Westeros, House Targaryen seeks to retake the Seven Kingdoms from House Lannister, who formally replaced House Baratheon as the royal House following the destruction of the Great Sept of Baelor.`],

		[`FREY`, `House Frey of the Twins was the Great House of the Riverlands, having gained their position for their treachery against their former liege lords, House Tully, who were stripped of all their lands and titles for their rebellion against the Iron Throne; House Tully had supported the independence movement for the Kingdom of the North. The current head of the house is unknown following the assassinations of Lord Walder Frey and two of his sons, Lothar Frey and Walder Rivers, by the vengeful Arya Stark. This is made more complex by the subsequent assassination of all the male Freys soon after.`],

		[`TYRELL`, `House Tyrell of Highgarden is an extinct Great House of Westeros. It ruled over the Reach, a vast, fertile, and heavily-populated region of southwestern Westeros, from their castle-seat of Highgarden as Lords Paramount of the Reach and Wardens of the South after taking control of the region from House Gardener during the Targaryen conquest.`]
	];

	// Shows lightbox
	function showLightbox(shield) {
		// Grab the right video source
		// Get the lowercase house name from the class list
		let targetHouse = shield.className.split(" ")[1];

		// Make sure the names match - needs to be uppercase
		// stark become Stark => First make capital S then add ark (for any class name)
		let targetSrc = targetHouse.charAt(0).toUpperCase() + targetHouse.slice(1);
		video.src = `video/House-${targetSrc}.mp4`;

		// Shows lightbox
		lightBox.classList.add("show-lightbox");

		// Fades lightbox in
		TweenMax.from(lightBox, 0.5, {opacity: 0, scaleX: 0, scaleY: 0, y: -340, delay: 0.3, onComplete: playVideo});
	}

	// Plays video and changes play button to pause button
	function playVideo() {
		if (playButton.classList.contains('show')) {
			toggleShow();
		}
		video.play();
	}

	// Pauses video and changes pause button to play button
	function pauseVideo() {
		toggleShow();
		video.pause();
	}

	// Jumps to beginning of the video
	function rewindVideo() {
		video.currentTime = 0;
	}

	// Jumps to end of the video
	function fastForwardVideo() {
		video.currentTime = video.duration;
	}

	// Changes and displays volume
	function changeVolume(value) {
		video.volume = value * 0.01;
		volumeSet.textContent = `Volume: ${value}`;
	}

	// Fades out the lightbox
	function fadeOutLightbox() {
		// Fades lightbox out
		TweenMax.to(lightBox, 0.25, {opacity: 0, onComplete: hideLightbox});
	}

	// Hides the lightbox
	function hideLightbox() {
		// Restores lightbox opacity
		TweenMax.to(lightBox, 0, {opacity: 1});

		// Hides lightbox
		lightBox.classList.remove("show-lightbox");

		// Rewind the video to the beginning and pause it
		video.currentTime = 0;
		video.pause();

		// If play button is showing on close, toggle pause button on instead so it appears upon opening a new video
		if (playButton.classList.contains('show')) {
			toggleShow();
		}
	}

	// Animates the banner
	function animateBanner() {
		const offSet = 600; // This is the offset / width of one banner

		// This is the total distance the images need to move as a pixel value
		// data.offset is coming from each shield we click on.
		totalOffset = this.dataset.offset * offSet; // + "px";

		// Change the house name
		houseName.textContent = `House ${houseData[this.dataset.offset][0]}`;

		// Change the house info
		houseInfo.textContent = `${houseData[this.dataset.offset][1]}`;

		// Fades text in on change
		TweenMax.from(houseName, 0.25, {opacity: 0, scaleX: 3, scaleY: 3});
		TweenMax.from(houseInfo, 0.5, {opacity: 0, delay: 0.25});
		
		// GreenSock animation
		TweenMax.to(banners, 1, {right: totalOffset, onComplete: showLightbox, onCompleteParams: [this]});
	}

	// Toggles whether the play or pause button is showing
	function toggleShow() {
		playButton.classList.toggle('show');
		pauseButton.classList.toggle('show');
	}

	// Sets initial house name and information
	houseName.textContent = `House ${houseData[0][0]}`;
	houseInfo.textContent = `${houseData[0][1]}`;

	// Sets wheels in motion for opening video when shield is clicked
	shields.forEach(shield => shield.addEventListener("click", animateBanner));

	// Change the volume of the video
	changeVolume(volume.value);
	volume.addEventListener("input", function(){ changeVolume(volume.value) });

	// Go to beginning or end of video
	rewindButton.addEventListener("click", rewindVideo);
	fastForwardButton.addEventListener("click", fastForwardVideo);

	// Pause / play the video
	pauseButton.addEventListener("click", pauseVideo);
	playButton.addEventListener("click", playVideo);

	// Listen for end of video or click on x to close lightbox
	video.addEventListener("ended", fadeOutLightbox);
	closeLB.addEventListener("click", fadeOutLightbox);
})();