$(function() {

	var carouselList = $('#carousel ul'),
		carouselLi = carouselList.children(),
		dot = $('.dot'),
		timer,
		firstSlide,
		lastSlide,
		z,
		x,
		n,
		activeImg;
	
	timer = setInterval(function () {
		changeNSlidesNext(1)}
		, 4000);

	function changeNSlidesNext(n) {
		var x = -100 * n  + "vw"; 
		carouselList.animate({marginLeft: x }, 800, function() {
			moveFirstSlide(n);
		});
	};

	function changeNSlidesPrev(n) {
		var x = -100 * n  + "vw"; 
		carouselList.css({marginLeft: x});
		moveLastSlide(n);
	};

	function moveFirstSlide(n) {
		firstSlide = carouselList.find("li:lt(" + n + ")");
		lastSlide = carouselList.find("li:last");
		lastSlide.after(firstSlide);
		carouselList.css({marginLeft: 0});
		removeActiveClass(carouselLi);
		removeActiveClass(dot);
		addActiveClassImg();
		addActiveClassDot(checkActiveImg());
	};

	function moveLastSlide(n) {
		var x = 5 - (n +1),
		firstSlide = carouselList.find("li:first");
		lastSlide = carouselList.find("li:gt(" + x + ")");
		firstSlide.before(lastSlide);
		carouselList.animate({marginLeft: 0}, 800);
		removeActiveClass(carouselLi);
		removeActiveClass(dot);
		addActiveClassImg();
		addActiveClassDot(checkActiveImg());
	};

	function addActiveClassImg() {
		carouselList.find("li:first").addClass('active');
	};

	function addActiveClassDot(a) {
		$.each(dot, function(i, elem) {
			if ($(elem).attr('data-target') == a) {
				$(elem).addClass('active');
			};
		});
	}

	function removeActiveClass(elem) {
		$.each(elem, function(i, element) {
			$(this).removeClass('active');
		});
	};
	
	function checkActiveImg() {
		activeImg = carouselList.find("li.active").attr('data-item');	
		return activeImg;	
	};

	$('#control-right').on('click', function() {
		clearInterval(timer);
		changeNSlidesNext(1);
	});

	$('#control-left').on('click', function() {
		clearInterval(timer);
		changeNSlidesPrev(1);
	});
	
	$(dot).on('click', function() {
		clearInterval(timer);
		z = $(this).attr('data-target');
		x = z - checkActiveImg();
		
		if (x > 0 ) {
			changeNSlidesNext(x);
		}
		else {
			changeNSlidesPrev(-x);
		};
	})

});

