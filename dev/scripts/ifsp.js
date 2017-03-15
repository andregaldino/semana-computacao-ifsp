function backgroundDraw() {
	var width, height, container, canvas, ctx, points, target, animateHeader = true;
	initContainer();
	initAnimation();
	addListeners();

	function initContainer() {
		container = document.getElementById('ifsp-container');
		container.style.height = height +'px';

		width = window.innerWidth;
		height = window.innerHeight;
		target = {x: width/2, y: height/2};

		canvas = document.getElementById('ifsp-animate');
		white = "#fff";
		black = "#000";
		canvas.width = width;
		canvas.height = height;
		ctx = canvas.getContext('2d');
		points = [];
		for(var x = 0; x < width * 2; x = x + width/3) {
			for(var y = 0; y < height * 2; y = y + height/3) {
				var px = x + Math.random()*width/3;
				var py = y + Math.random()*height/3;
				var p = {x: px, originX: px, y: py, originY: py };
				points.push(p);
			}
		}
		for(var i = 0; i < points.length; i++) {
			var closest = [];
			var p1 = points[i];
			for(var j = 0; j < points.length; j++) {
				var p2 = points[j]
				if(!(p1 == p2)) {
					var placed = false;
					for(var k = 0; k < 3; k++) {
						if(!placed) {
							if(closest[k] == undefined) {
								closest[k] = p2;
								placed = true;
							}
						}
					}

					for(var k = 0; k < 3; k++) {
						if(!placed) {
							if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
								closest[k] = p2;
								placed = true;
							}
						}
					}
				}
			}
			p1.closest = closest;
		}
		for(var i in points) {
			var c = new Circle(points[i], 2, 'rgba(255,255,255,0.5)');
			points[i].circle = c;
		}
	}
	function addListeners() {
		if(!('ontouchstart' in window)) {
			window.addEventListener('mousemove', mouseMove);
		}
		window.addEventListener('scroll', scrollCheck);
		window.addEventListener('resize', resize, false);
	}
	function mouseMove(e) {
		var posx = posy = 0;
		if (e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY)    {
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		target.x = posx;
		target.y = posy;
	}
	function scrollCheck() {
		if(document.body.scrollTop > height) animateHeader = false;
		else animateHeader = true;
	}
	function resize() {
		width = window.innerWidth;
		height = window.innerHeight;
		container.style.height = height+'px';
		canvas.width = width;
		canvas.height = height;
	}
	function initAnimation() {
		animate();
		for(var i in points) {
			shiftPoint(points[i]);
		}
	}
	function animate() {
		if(animateHeader) {
			ctx.clearRect(0,0,width,height);
			for(var i in points) {
				points[i].active = .12 ;
				points[i].circle.active = 1;
				drawLines(points[i]);
				points[i].circle.draw();
			}
		}
		requestAnimationFrame(animate);
	}
	function shiftPoint(p) {
		TweenLite.to(p, 1+1*Math.random(), {x:p.originX + getRandomInt(-10, 10),
			y: p.originY - getRandomInt(-10, 10), ease:Circ.easeInOut,
			onComplete: function() {
				shiftPoint(p);
			}});
	}
	function fauxZoom(p) {
		center = target;
		console.log(center);

	}
	function drawLines(p) {
		if(!p.active) return;
		for(var i in p.closest) {
			ctx.beginPath();
			ctx.moveTo(p.x, p.y);
			ctx.lineTo(p.closest[i].x, p.closest[i].y);
			ctx.strokeStyle = 'rgba(255,255,255,'+ p.active+')';
			ctx.stroke();
		}
	}
	function Circle(pos,rad,color) {
		var _this = this;
		(function() {
			_this.pos = pos || null;
			_this.radius = rad || null;
			_this.color = color || null;
		})();

		this.draw = function() {
			if(!_this.active) return;
			ctx.beginPath();
			ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
			ctx.fillStyle = 'rgba(255, 255, 255,'+ _this.active+')';
			ctx.fill();
		};
	}
	function getDistance(p1, p2) {
		return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
	}
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
};

$(document).ready(function() {
	backgroundDraw();

	$('#fullpage').fullpage({
		navigation: false,
		keyboardScrolling: true,
		verticalCentered: false,
		sectionSelector: '.fp-section',
		slideSelector: '.fp-slide',
		controlArrows: false,
		normalScrollElements: '.modal',
		onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
			$('.weekdays .btn[data-day='+slideIndex+']').addClass('outline');
			$('.weekdays .btn[data-day='+nextSlideIndex+']').removeClass('outline');
		}
	});

	$('#ifsp-title').typeIt({
		strings: ["Semana da Computação", "2017"],
		speed: 50,
		autoStart: false
	}); 

	$('.down').click(function () {
		$.fn.fullpage.moveSectionDown();
	});

	var scrollTo = 0;

	$('.weekdays .btn').click(function () {
		$this = $(this);
		$.fn.fullpage.moveTo(2, $this.data('day'));

		if($(window).width() < 710){
			var item = $this.parent();
			scrollTo =- item.position().left + $('.weekdays').width() / 2 - item.width() / 2;
			$('.weekdays ul').css('transform', 'translateX(' + scrollTo + 'px)');
		} else {
			$('.weekdays ul').css('transform', 'translateX(' + 0 + 'px)');
		}
	});

	$('nav a').click(function () {
		$this = $(this);
		if($this.data('section'))
			$.fn.fullpage.moveTo($this.data('section'));
	});

	$(window).resize(function() {
		if($(window).width() >= 710){
			$('.weekdays ul').css('transform', 'translateX(' + 0 + 'px)');
		}
	});

	$('.toggle').on('click', function () {
		var nav = '#'+$(this).data('activates');
		$(nav).toggleClass('visible');
	});

	$('.navbar-side li a').click(function () {
		$('.navbar-side').toggleClass('visible');
	});

	$('.modal').modal();
});
