(() => {
	console.log("Fired");

	// Variable stack
	// Grab the shields at the bottom of the page
	const 	shields		= document.querySelectorAll('.sigil-container'),
			lightBox 	= document.querySelector('.lightbox'),
			video		= document.querySelector('video'),
			closeLB		= document.querySelector('.lightbox-close'),
			banners 	= document.querySelector('#houseImages'),
			houseName	= document.querySelector('.house-name'),
			houseInfo	= document.querySelector('.house-info');

	const houseData = [
		[`STARK`, `House Stark of Winterfell is a Great House of Westeros, ruling over the vast region known as the North from their seat in Winterfell. It is one of the oldest lines of Westerosi nobility by far, claiming a line of descent stretching back over eight thousand years. Before the Targaryen conquest, as well as during the War of the Five Kings and Daenerys Targaryen's invasion of Westeros, the leaders of House Stark ruled over the region as the Kings in the North.`],

		[`BARATHEON`, `House Baratheon of Storm's End is a legally extinct Great House of Westeros. A cadet branch was formerly the royal house, but House Lannister now controls the throne. House Baratheon traditionally ruled the Stormlands on the eastern coast of Westeros, aptly named for its frequent storms, from their seat of Storm's End.

		 House Baratheon became the royal house of the Seven Kingdoms after Robert Baratheon led a rebellion against the Targaryen dynasty. At the end of the rebellion, Robert ascended the Iron Throne as Robert I and married Cersei Lannister after the death of Lyanna Stark.`],

		[`LANNISTER`, `House Lannister of Casterly Rock is one of the Great Houses of Westeros, one of its richest and most powerful families and oldest dynasties. It is also the current royal house of the Seven Kingdoms following the extinction of House Baratheon of King's Landing, which had been their puppet house anyway.

		 	The Lannisters rule over the Westerlands. Their seat is Casterly Rock, a massive rocky promontory overlooking the Sunset Sea which has had habitations and fortifications built into it over the millennia. They are the Lords Paramount of the Westerlands and Wardens of the West. As the new royal house, they also rule directly over the Crownlands from their seat of the Red Keep in King's Landing, the traditional seat of the royal family.`],

		[`TULLY`, `House Tully of Riverrun is an exiled Great House of Westeros. Its most senior member carried the title of Lord of Riverrun and Lord Paramount of the Trident, until the Red Wedding. The current head is Lord Edmure Tully, son of the late Hoster Tully. The Tully sigil is a silver trout on a red and blue background. Their house words are "Family, Duty, Honor."`],

		[`GREYJOY`, `House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over the Iron Islands, a harsh and bleak collection of islands off the west coast of Westeros, from the castle at Pyke. The head of the house is the Lord Reaper of Pyke.

		 	House Greyjoy's sigil is traditionally a golden kraken on a black field. Their house words are "We Do Not Sow," although the phrase "What Is Dead May Never Die" is also closely associated with House Greyjoy and their bannermen, as they are associated with the faith of the Drowned God.`],

		[`ARRYN`, `House Arryn of the Eyrie is one of the Great Houses of Westeros. It has ruled over the Vale of Arryn for millennia, originally as the Kings of Mountain and Vale and more recently as Lords Paramount of the Vale and Wardens of the East under the Targaryen kings and Baratheon-Lannister kings. The nominal head of House Arryn is Robin Arryn, the Lord of the Eyrie, with his stepfather Petyr Baelish acting as Lord Protector until he reaches the age of majority.`]
	];

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
		TweenMax.from(lightBox, 0.5, {opacity: 0, scaleX: 0, scaleY: 0, y: -340, delay: 0.3});
	}

	function fadeOutLightbox() {
		// Fades lightbox out
		TweenMax.to(lightBox, 0.25, {opacity: 0, onComplete: hideLightbox});
	}

	function hideLightbox() {
		// Restores lightbox opacity
		TweenMax.to(lightBox, 0, {opacity: 1});

		// Hides lightbox
		lightBox.classList.remove("show-lightbox");

		// Rewind the video to the beginning and pause it
		video.currentTime = 0;
		video.pause();
	}

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

	// Sets initial house name and information
	houseName.textContent = `House ${houseData[0][0]}`;
	houseInfo.textContent = `${houseData[0][1]}`;

	// shields.forEach(shield => shield.addEventListener("click", showLightbox));
	shields.forEach(shield => shield.addEventListener("click", animateBanner));

	// Listen for end of video or click on x to close lightbox
	video.addEventListener("ended", fadeOutLightbox);
	closeLB.addEventListener("click", fadeOutLightbox);
})();