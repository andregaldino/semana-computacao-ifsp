function inherits(childCtor,parentCtor){function tempCtor(){}
tempCtor.prototype=parentCtor.prototype;childCtor.superClass_=parentCtor.prototype;childCtor.prototype=new tempCtor();childCtor.prototype.constructor=childCtor}
function MarkerLabel_(marker,crossURL,handCursorURL){this.marker_=marker;this.handCursorURL_=marker.handCursorURL;this.labelDiv_=document.createElement("div");this.labelDiv_.style.cssText="position: absolute; overflow: hidden;";this.crossDiv_=MarkerLabel_.getSharedCross(crossURL)}
inherits(MarkerLabel_,google.maps.OverlayView);MarkerLabel_.getSharedCross=function(crossURL){var div;if(typeof MarkerLabel_.getSharedCross.crossDiv==="undefined"){div=document.createElement("img");div.style.cssText="position: absolute; z-index: 1000002; display: none;";div.style.marginLeft="-8px";div.style.marginTop="-9px";div.src=crossURL;MarkerLabel_.getSharedCross.crossDiv=div}
return MarkerLabel_.getSharedCross.crossDiv};MarkerLabel_.prototype.onAdd=function(){var me=this;var cMouseIsDown=!1;var cDraggingLabel=!1;var cSavedZIndex;var cLatOffset,cLngOffset;var cIgnoreClick;var cRaiseEnabled;var cStartPosition;var cStartCenter;var cRaiseOffset=20;var cDraggingCursor="url("+this.handCursorURL_+")";var cAbortEvent=function(e){if(e.preventDefault){e.preventDefault()}
e.cancelBubble=!0;if(e.stopPropagation){e.stopPropagation()}};var cStopBounce=function(){me.marker_.setAnimation(null)};this.getPanes().markerLayer.appendChild(this.labelDiv_);if(typeof MarkerLabel_.getSharedCross.processed==="undefined"){this.getPanes().markerLayer.appendChild(this.crossDiv_);MarkerLabel_.getSharedCross.processed=!0}
this.listeners_=[google.maps.event.addDomListener(this.labelDiv_,"mouseover",function(e){if(me.marker_.getDraggable()||me.marker_.getClickable()){this.style.cursor="pointer";google.maps.event.trigger(me.marker_,"mouseover",e)}}),google.maps.event.addDomListener(this.labelDiv_,"mouseout",function(e){if((me.marker_.getDraggable()||me.marker_.getClickable())&&!cDraggingLabel){this.style.cursor=me.marker_.getCursor();google.maps.event.trigger(me.marker_,"mouseout",e)}}),google.maps.event.addDomListener(this.labelDiv_,"mousedown",function(e){cDraggingLabel=!1;if(me.marker_.getDraggable()){cMouseIsDown=!0;this.style.cursor=cDraggingCursor}
if(me.marker_.getDraggable()||me.marker_.getClickable()){google.maps.event.trigger(me.marker_,"mousedown",e);cAbortEvent(e)}}),google.maps.event.addDomListener(document,"mouseup",function(mEvent){var position;if(cMouseIsDown){cMouseIsDown=!1;me.eventDiv_.style.cursor="pointer";google.maps.event.trigger(me.marker_,"mouseup",mEvent)}
if(cDraggingLabel){if(cRaiseEnabled){position=me.getProjection().fromLatLngToDivPixel(me.marker_.getPosition());position.y+=cRaiseOffset;me.marker_.setPosition(me.getProjection().fromDivPixelToLatLng(position));try{me.marker_.setAnimation(google.maps.Animation.BOUNCE);setTimeout(cStopBounce,1406)}catch(e){}}
me.crossDiv_.style.display="none";me.marker_.setZIndex(cSavedZIndex);cIgnoreClick=!0;cDraggingLabel=!1;mEvent.latLng=me.marker_.getPosition();google.maps.event.trigger(me.marker_,"dragend",mEvent)}}),google.maps.event.addListener(me.marker_.getMap(),"mousemove",function(mEvent){var position;if(cMouseIsDown){if(cDraggingLabel){mEvent.latLng=new google.maps.LatLng(mEvent.latLng.lat()-cLatOffset,mEvent.latLng.lng()-cLngOffset);position=me.getProjection().fromLatLngToDivPixel(mEvent.latLng);if(cRaiseEnabled){me.crossDiv_.style.left=position.x+"px";me.crossDiv_.style.top=position.y+"px";me.crossDiv_.style.display="";position.y-=cRaiseOffset}
me.marker_.setPosition(me.getProjection().fromDivPixelToLatLng(position));if(cRaiseEnabled){me.eventDiv_.style.top=(position.y+cRaiseOffset)+"px"}
google.maps.event.trigger(me.marker_,"drag",mEvent)}else{cLatOffset=mEvent.latLng.lat()-me.marker_.getPosition().lat();cLngOffset=mEvent.latLng.lng()-me.marker_.getPosition().lng();cSavedZIndex=me.marker_.getZIndex();cStartPosition=me.marker_.getPosition();cStartCenter=me.marker_.getMap().getCenter();cRaiseEnabled=me.marker_.get("raiseOnDrag");cDraggingLabel=!0;me.marker_.setZIndex(1000000);mEvent.latLng=me.marker_.getPosition();google.maps.event.trigger(me.marker_,"dragstart",mEvent)}}}),google.maps.event.addDomListener(document,"keydown",function(e){if(cDraggingLabel){if(e.keyCode===27){cRaiseEnabled=!1;me.marker_.setPosition(cStartPosition);me.marker_.getMap().setCenter(cStartCenter);google.maps.event.trigger(document,"mouseup",e)}}}),google.maps.event.addDomListener(this.labelDiv_,"click",function(e){if(me.marker_.getDraggable()||me.marker_.getClickable()){if(cIgnoreClick){cIgnoreClick=!1}else{google.maps.event.trigger(me.marker_,"click",e);cAbortEvent(e)}}}),google.maps.event.addDomListener(this.labelDiv_,"dblclick",function(e){if(me.marker_.getDraggable()||me.marker_.getClickable()){google.maps.event.trigger(me.marker_,"dblclick",e);cAbortEvent(e)}}),google.maps.event.addListener(this.marker_,"dragstart",function(mEvent){if(!cDraggingLabel){cRaiseEnabled=this.get("raiseOnDrag")}}),google.maps.event.addListener(this.marker_,"drag",function(mEvent){if(!cDraggingLabel){if(cRaiseEnabled){me.setPosition(cRaiseOffset);me.labelDiv_.style.zIndex=1000000+(this.get("labelInBackground")?-1:+1)}}}),google.maps.event.addListener(this.marker_,"dragend",function(mEvent){if(!cDraggingLabel){if(cRaiseEnabled){me.setPosition(0)}}}),google.maps.event.addListener(this.marker_,"position_changed",function(){me.setPosition()}),google.maps.event.addListener(this.marker_,"zindex_changed",function(){me.setZIndex()}),google.maps.event.addListener(this.marker_,"visible_changed",function(){me.setVisible()}),google.maps.event.addListener(this.marker_,"labelvisible_changed",function(){me.setVisible()}),google.maps.event.addListener(this.marker_,"title_changed",function(){me.setTitle()}),google.maps.event.addListener(this.marker_,"labelcontent_changed",function(){me.setContent()}),google.maps.event.addListener(this.marker_,"labelanchor_changed",function(){me.setAnchor()}),google.maps.event.addListener(this.marker_,"labelclass_changed",function(){me.setStyles()}),google.maps.event.addListener(this.marker_,"labelstyle_changed",function(){me.setStyles()})]};MarkerLabel_.prototype.onRemove=function(){var i;this.labelDiv_.parentNode.removeChild(this.labelDiv_);for(i=0;i<this.listeners_.length;i++){google.maps.event.removeListener(this.listeners_[i])}};MarkerLabel_.prototype.draw=function(){this.setContent();this.setTitle();this.setStyles()};MarkerLabel_.prototype.setContent=function(){var content=this.marker_.get("labelContent");if(typeof content.nodeType==="undefined"){this.labelDiv_.innerHTML=content}else{this.labelDiv_.innerHTML="";this.labelDiv_.appendChild(content)}};MarkerLabel_.prototype.setTitle=function(){this.labelDiv_.title=this.marker_.getTitle()||""};MarkerLabel_.prototype.setStyles=function(){var i,labelStyle;this.labelDiv_.className=this.marker_.get("labelClass");this.labelDiv_.style.cssText="";labelStyle=this.marker_.get("labelStyle");for(i in labelStyle){if(labelStyle.hasOwnProperty(i)){this.labelDiv_.style[i]=labelStyle[i]}}
this.setMandatoryStyles()};MarkerLabel_.prototype.setMandatoryStyles=function(){this.labelDiv_.style.position="absolute";this.labelDiv_.style.overflow="hidden";if(typeof this.labelDiv_.style.opacity!=="undefined"&&this.labelDiv_.style.opacity!==""){this.labelDiv_.style.MsFilter="\"progid:DXImageTransform.Microsoft.Alpha(opacity="+(this.labelDiv_.style.opacity*100)+")\"";this.labelDiv_.style.filter="alpha(opacity="+(this.labelDiv_.style.opacity*100)+")"}
this.setAnchor();this.setPosition();this.setVisible()};MarkerLabel_.prototype.setAnchor=function(){var anchor=this.marker_.get("labelAnchor");this.labelDiv_.style.marginLeft=-anchor.x+"px";this.labelDiv_.style.marginTop=-anchor.y+"px"};MarkerLabel_.prototype.setPosition=function(yOffset){var position=this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());if(typeof yOffset==="undefined"){yOffset=0}
this.labelDiv_.style.left=Math.round(position.x)+"px";this.labelDiv_.style.top=Math.round(position.y-yOffset)+"px";this.setZIndex()};MarkerLabel_.prototype.setZIndex=function(){var zAdjust=(this.marker_.get("labelInBackground")?-1:+1);if(typeof this.marker_.getZIndex()==="undefined"){this.labelDiv_.style.zIndex=parseInt(this.labelDiv_.style.top,10)+zAdjust}else{this.labelDiv_.style.zIndex=this.marker_.getZIndex()+zAdjust}};MarkerLabel_.prototype.setVisible=function(){if(this.marker_.get("labelVisible")){this.labelDiv_.style.display=this.marker_.getVisible()?"block":"none"}else{this.labelDiv_.style.display="none"}};function MarkerWithLabel(opt_options){opt_options=opt_options||{};opt_options.labelContent=opt_options.labelContent||"";opt_options.labelAnchor=opt_options.labelAnchor||new google.maps.Point(0,0);opt_options.labelClass=opt_options.labelClass||"markerLabels";opt_options.labelStyle=opt_options.labelStyle||{};opt_options.labelInBackground=opt_options.labelInBackground||!1;if(typeof opt_options.labelVisible==="undefined"){opt_options.labelVisible=!0}
if(typeof opt_options.raiseOnDrag==="undefined"){opt_options.raiseOnDrag=!0}
if(typeof opt_options.clickable==="undefined"){opt_options.clickable=!0}
if(typeof opt_options.draggable==="undefined"){opt_options.draggable=!1}
if(typeof opt_options.optimized==="undefined"){opt_options.optimized=!1}
opt_options.crossImage=opt_options.crossImage||"http"+(document.location.protocol==="https:"?"s":"")+"://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png";opt_options.handCursor=opt_options.handCursor||"http"+(document.location.protocol==="https:"?"s":"")+"://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur";opt_options.optimized=!1;this.label=new MarkerLabel_(this,opt_options.crossImage,opt_options.handCursor);google.maps.Marker.apply(this,arguments)}
inherits(MarkerWithLabel,google.maps.Marker);MarkerWithLabel.prototype.setMap=function(theMap){google.maps.Marker.prototype.setMap.apply(this,arguments);this.label.setMap(theMap)}

var map, marker, center = new google.maps.LatLng(-22.693459, -47.625512);

function initialize() {
	var options = {
		center: center,
		zoom: 15,
		mapTypeControl: false,
		streetViewControl: false,
		zoomControl: true,
		scrollwheel: false,
		zoomControlOptions: {
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		styles: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#333333"},{"lightness":16}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"color":"#f3f4f4"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"labels.text.stroke","stylers":[{"color":"#333333"},{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"weight":0.9},{"visibility":"off"}]},{featureType: "poi",stylers: [{ visibility: "off" }]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#83cead"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#777777"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#fee379"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#fee379"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#7fc8ed"}]}]
	}

	map = new google.maps.Map(document.getElementById('map-canvas'), options);
	
	var infowindow = new google.maps.InfoWindow();

	marker = new MarkerWithLabel({
		draggable: false,
		map: map,
		icon: new google.maps.MarkerImage('./dist/images/mouse.svg', null, null, null, new google.maps.Size(40,40)),
		position: center
	});
}

google.maps.event.addDomListener(window, "load", initialize);
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
		// grey = "#2c2c2c";
		white = "#fff";
		black = "#000";
		canvas.width = width;
		canvas.height = height;
		// canvas.style.backgroundColor = grey;
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

		console.log(posx/width);
		console.log(posy/height);
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
		navigation: true,
		navigationPosition: 'right',
		keyboardScrolling: true,
		verticalCentered: false,
		sectionSelector: '.fp-section',
		slideSelector: '.fp-slide',
		controlArrows: false,
		onLeave: function(index, nextIndex, direction){
		},
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

	$(window).resize(function() {
		if($(window).width() >= 710){
			$('.weekdays ul').css('transform', 'translateX(' + 0 + 'px)');
		}
	});
});