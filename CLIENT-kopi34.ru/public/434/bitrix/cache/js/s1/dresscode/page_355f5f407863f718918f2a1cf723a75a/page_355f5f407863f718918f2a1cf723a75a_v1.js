
; /* Start:"a:4:{s:4:"full";s:98:"/local/templates/.default/components/dresscode/catalog.item/serviceDetail/script.js?16594438381142";s:6:"source";s:83:"/local/templates/.default/components/dresscode/catalog.item/serviceDetail/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$( document ).ready(function() {

	$(".service-table td").mouseout(function() {
		var tds = $(this).parent().find("td"),
		index = tds.index(this);						
		$(".service-table").find("td:nth-child(" + (index + 1) + ")").removeClass('hover');
		$(".service-table").find("th:nth-child(" + (index + 1) + ")").removeClass('hover');
	});
	
	$(".service-table td").mouseover(function() {
		var tds = $(this).parent().find("td"),
		index = tds.index(this);
		$(".service-table").find("td:nth-child(" + (index + 1) + ")").addClass('hover');
		$(".service-table").find("th:nth-child(" + (index + 1) + ")").addClass('hover');
		$(this).removeClass('hover');
	});
	
});

var setOrderFormData = function(event){

	var $this = $(this);
	var orderFormId = 4;
	var $orderForm = $("#webFormDwModal_" + orderFormId);
	var $orderProductName = $(".order-product-name");
	var $orderProductNameField = $orderForm.find(".product-auto-name").parents(".webFormItem").find(".inputtext");

	$orderProductNameField.val($orderProductName.text()).prop("readonly", "readonly");

};

$(document).on("click", ".order-service", setOrderFormData);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:115:"/local/templates/.default/components/dresscode/catalog.item/serviceDetail/js/morePicturesCarousel.js?16262889241882";s:6:"source";s:100:"/local/templates/.default/components/dresscode/catalog.item/serviceDetail/js/morePicturesCarousel.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
	
	var startMorePicturesElementCarousel;

	$(function(){

		startMorePicturesElementCarousel = function(){

			//settings
			var maxVisibleElements = 3;

			var $moreImagesCarousel = $("#moreImagesCarousel").addClass("show");
			var $moreImagesSlideBox = $moreImagesCarousel.find(".slideBox");
			var $moreImagesItems = $moreImagesSlideBox.find(".item");

			var elementsCount = $moreImagesItems.length;
			var maxPosition = $moreImagesItems.length - maxVisibleElements;
			var currentPosition = 0;
			var startPosition = 0;

			$moreImagesItems.eq(0).addClass("selected")
									.find("a").addClass("zoom");

			if(elementsCount <= maxVisibleElements){
				$("#moreImagesRightButton, #moreImagesLeftButton").hide();
				startPosition = 100 / maxVisibleElements * ((maxVisibleElements - elementsCount) /2);
			}else{
				$("#moreImagesRightButton, #moreImagesLeftButton").show();
			}

			$moreImagesSlideBox.css({
				width: elementsCount * 100 + "%",
				left: startPosition + "%"
			});

			$moreImagesItems.css({
				width: 100 / elementsCount / maxVisibleElements + "%"
			});

			var carouselMoving = function(to){
				$moreImagesSlideBox.finish().animate({
					left: "-" + 100 / maxVisibleElements * to + "%"
				}, 200);
			};

			var leftMoveCarousel = function(event){
				if(--currentPosition < 0){
					currentPosition = maxPosition;
				}				
				return event.preventDefault(carouselMoving(currentPosition));
			};

			var rightMoveCarousel = function(event){
				if(++currentPosition > maxPosition){
					currentPosition = 0;
				}				
				return event.preventDefault(carouselMoving(currentPosition));
			};

			$(document).on("click", "#moreImagesRightButton", rightMoveCarousel);
			$(document).on("click", "#moreImagesLeftButton", leftMoveCarousel);
		}

		startMorePicturesElementCarousel();

	});
/* End */
;
; /* Start:"a:4:{s:4:"full";s:108:"/local/templates/.default/components/dresscode/catalog.item/serviceDetail/js/pictureSlider.js?16262889241606";s:6:"source";s:93:"/local/templates/.default/components/dresscode/catalog.item/serviceDetail/js/pictureSlider.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
	
	// global function var
	var startPictureElementSlider;
	
	$(function(){

		startPictureElementSlider = function(){

			var $pictureContainer = $("#pictureContainer");
			var $pictureSlider = $pictureContainer.find(".pictureSlider");
			var $pictureSliderElements = $pictureSlider.find(".item");

			var $moreImagesCarousel = $("#moreImagesCarousel");
			var $itemClickToEvent = $moreImagesCarousel.find(".item");

			var elementsCount = $pictureSliderElements.length;
			var currentPosition = 0;

			// add styles
			$pictureContainer.css({
				overflow: "hidden",
				width: "100%",
			});

			$pictureSlider.css({
				width: elementsCount * 100 + "%",
				position: "relative",
				overflow: "hidden",
				display: "table",
				left: "0px"
			});

			$pictureSliderElements.css({
				width: 100 / elementsCount + "%",
				display: "table-cell",
				position: "relative",
				textAlign: "center"
			});


			var slideCalcToMove = function(event){
							
				$this = $(this);
				
				if(!$this.hasClass("selected")){
					$this.siblings(".item").removeClass("selected").find("a").removeClass("zoom");
					$this.addClass("selected").find("a").addClass("zoom");
					event.stopImmediatePropagation();
				}
				
				return event.preventDefault(slideMove($this.index()));
			
			}

			var slideMove = function(to){
				
				$pictureSlider.animate({
					left: "-" + to * 100 + "%"
				}, 250);

				return true;
			
			};

			$itemClickToEvent.on("click", slideCalcToMove);
		}

		startPictureElementSlider(); // start slider =)

	});
/* End */
;
; /* Start:"a:4:{s:4:"full";s:102:"/local/templates/.default/components/dresscode/catalog.item/serviceDetail/js/zoomer.js?162628892411150";s:6:"source";s:86:"/local/templates/.default/components/dresscode/catalog.item/serviceDetail/js/zoomer.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
	//zoomer

	var createZoomer;

	$(function(){

		createZoomer = function(){
			$body = $("body");
			$morePhotos =  $("#pictureContainer");
			$morePhotosElements = $morePhotos.find(".zoom");

			slidePosition = 0;
			slideElementsWidth = 0;
			slideCarouselWidth = 0;
			slideElementsCount = $morePhotosElements.length - 1;
		}

		var $body = $("body");
		var $morePhotos =  $("#pictureContainer");
		var $morePhotosElements = $morePhotos.find(".zoom");

		var $zoomer;
		var $imageContainer;
		var $imageContainerSlider;
		var $zoomerMoreImagesContainer;
		var $zoomerMoreImagesContainerWrapper;
		var $zoomerMoreImagesContainerWrapperElements;

		var slidePosition = 0;
		var slideElementsWidth = 0;
		var slideCarouselWidth = 0;
		var slideElementsCount = $morePhotosElements.length - 1;

		//touch global
		var carouselStartPosition;
		var touchStartPosition;
		var touchStartedFlag;

        var loadingPictureControl = function(imagePath, callBack){
        
            if(imagePath){
                var newImage = new Image();
                $(newImage).one("load", callBack);
                newImage.src = imagePath;
            }
       
        };

		var openZoomer = function(event){
			
			var $this = $(this);

			startPosition = $this.parents(".item").index();

			$zoomer = $("<div />", {id: "zoomer"}).css({
				backgroundColor: "#ffffff",
				position: "fixed",
				height: "100%",
				width: "100%",
				zIndex: 9999,
				left: 0,
				top: 0
			})

			$imageContainer = $("<div />", {id:"zoomerImageContainer"}).css({
				transform: "translateX(-50%) translateY(-50%)",
				position: "absolute",
				height: "100%",
				width: "100%",
				left: "50%",
				top: "50%"
			});
			
			$imageContainerSlider = $("<div />", {id: "imageContainerSlider"});

			$zoomerMoreImagesContainer = $("<div />", {id: "zoomerMoreImagesContainer"}).css({
				border: "1px solid #e7e8ea",
				position: "absolute", 
				textAlign: "center",
				lineHeight: "100px",
				overflowX: "auto",
				overflowY: "hidden",
				height: "100px",
				width: "100%",
				bottom: "0px",
				zIndex: "99",
				left: "0px"
			}); 

			$zoomerMoreImagesContainerWrapper = $("<div />", {id: "zoomerMoreImagesContainerWrapper"}).css({
				boxSizing: "border-box",
			    display: "inline-block",
			    verticalAlign: "middle",
			    position: "relative",
			    padding: "0px 80px",
			    height: "100px",
			    width: "auto"
			});

		
			$imageContainerSlider.css({
				width: $morePhotosElements.length * 100 + "%",
				height: $(window).height() - 120,
				position: "relative",
				overflow: "hidden",
				cursor: "move",
				left: "-" + startPosition * 100 + "%"
			});
			
			var ix = 0;

			$morePhotosElements.each(function(i, nextElement){
				
				var $nextElement = $(nextElement);
				var nextElementPictureSrc = $nextElement.data("large-picture");
				var nextElementPictureSmallSrc = $nextElement.data("small-picture");
				
				if(nextElementPictureSrc !=""){
					var $nextElementLink = $("<a />", {class: "link", href: "#"}).css({
						backgroundImage: "url(" + nextElementPictureSmallSrc + ")",
						backgroundPosition: "50% 50%",
						backgroundRepeat: "no-repeat",
					    backgroundSize: "contain",
					    display: "inline-block",
					    verticalAlign: "middle",
					    position: "relative",
					    height: "50px",
					    width: "70px"
					});

					var $nextElementItem = $("<div />", {class: "item"}).css({
						boxSizing: "border-box",
						overflow: "hidden",
					    lineHeight: "100px",
					    marginLeft: (ix == 0 ? "0px" : "12px"),
					    height: "100px",
					    float: "left",
					    width: "80px",
					    opacity: "0.6"
					});

					var $nextElementBigItem = $("<div />", {class: "item"}).css({
						width: 100 / $morePhotosElements.length + "%",
						position: "relative",
						textAlign: "center",
						height: "100%",
						float: "left"
					}).append(
						$("<img />", {src: nextElementPictureSrc}).css({
							position: "absolute",
							maxHeight: "90%",
							maxWidth: "90%",
							margin: "auto",
							bottom: "0",
							right: "0",
							left: "0",
							top: "0"
						})
					);

					if(ix == startPosition){
						$nextElementItem.addClass("selected");
					}

					$imageContainerSlider.append($nextElementBigItem);

					$zoomerMoreImagesContainerWrapper.append(
						$nextElementItem.append($nextElementLink)
					);

					ix++;

				}
		
			});

			if($morePhotosElements.length > 1){

				var $zoomerBigNextMore = $("<a />", {id: "zoomerBigNextMore"}).css({
					transform: "translateY(-50%)",
					position: "absolute",
					cursor: "pointer",
					right: "24px",
					height: "110px",
					width: "57px",
					top: "50%"
				});
				
				var $zoomerBigPrevMore = $("<a />", {id: "zoomerBigPrevMore"}).css({
					transform: "translateY(-50%)",
					position: "absolute",
					cursor: "pointer",
					height: "110px",
					width: "57px",
					left: "24px",
					top: "50%"
				});
			
				var $zoomerNextMore = $("<a />", {id: "zoomerNextMore"}).css({
					transform: "translateY(-50%)",
					position: "absolute",
					cursor: "pointer",
					right: "0px",
					height: "60px",
					width: "80px",
					top: "50%"
				});
				
				var $zoomerPrevMore = $("<a />", {id: "zoomerPrevMore"}).css({
					transform: "translateY(-50%)",
					position: "absolute",
					cursor: "pointer",
					height: "60px",
					width: "80px",
					left: "0px",
					top: "50%"
				});

				$imageContainer.append($zoomerBigPrevMore).append($zoomerBigNextMore);
				$zoomerMoreImagesContainerWrapper.append($zoomerNextMore).append($zoomerPrevMore);

			}
			
			$zoomerMoreImagesContainerWrapperElements = $zoomerMoreImagesContainerWrapper.find(".item");

			var $zoomerExitLink =  $("<a />", {href: "#", id: "zoomerExitLink"}).css({
				position: "absolute",
				right: "24px",
				top: "24px"
			});

			$body.append(
				$zoomer.append(
					$imageContainer.prepend($imageContainerSlider)
				).append(
					$zoomerMoreImagesContainer.append(
						$zoomerMoreImagesContainerWrapper
					)
				).append($zoomerExitLink)
			)
		
			setTimeout(function(){
				$zoomer.addClass("opened");
				// $body.css({overflow: "hidden"});
			}, 2);

			slideCarouselWidth = $imageContainerSlider[0].offsetWidth;
			slideElementsWidth = slideCarouselWidth / (slideElementsCount + 1);

			return event.preventDefault();

		};
		

		var closeZoomer = function(event){
			return event.preventDefault(
				// $("body").css({overflow: "auto"}).find("#zoomer").remove()
				$("#zoomer").remove()
			);
		};

		var nextSlide = function(event){

			if(++slidePosition > slideElementsCount){
				slidePosition = 0;
			}

			return event.preventDefault(
				slideMove(slidePosition)
			); // o_O
		};

		var prevSlide = function(event){

			if(--slidePosition < 0){
				slidePosition = slideElementsCount;
			}

			return event.preventDefault(
				slideMove(slidePosition)
			); // o_O
		};

		var nextSlideToEq = function(event){
			
			slidePosition = $(this).index();
			slideMove(slidePosition);
		
			return event.preventDefault();
		
		};

		var slideMove = function(eq){
			var nextSlidePosition = eq * 100;

			$imageContainerSlider.finish().animate({
				left: "-" + nextSlidePosition + "%"
			}, 300);
			
			changeActiveMoreElement(eq);
			
			return event.preventDefault();
		};

		var changeActiveMoreElement = function(eq){
			$zoomerMoreImagesContainerWrapperElements.removeClass("selected").eq(eq).addClass("selected");
		};

		var zoomerKeyControl = function(event){
			if ($("#zoomer").is(":visible")) {
				if (event.which == 37 || event.which == 40 && $("#zoomer").is(":visible")) {
					return event.preventDefault(prevSlide(event));
				} else if (event.which == 39 || event.which == 38 && $("#zoomer").is(":visible")) {
					return event.preventDefault(nextSlide(event));
				} else if (event.which == 27 && $("#zoomer").is(":visible")) {
					return event.preventDefault(closeZoomer(event));
				}
			}
		};

		var zoomerStartTouch = function(event){
			event.pageX = event.type == "touchstart" ? event.originalEvent.touches[0].pageX : event.pageX;
			carouselStartPosition = parseInt($imageContainerSlider.css("left"), 10);
			touchStartPosition = event.pageX;
			touchStartedFlag = true;
			return event.preventDefault();
		};

		var zoomerTouchMove = function(event){
			if(touchStartedFlag){
				event.pageX = event.type == "touchmove" ? event.originalEvent.touches[0].pageX : event.pageX;
				$imageContainerSlider.css("left", (carouselStartPosition - (touchStartPosition - event.pageX)) + "px");
			}
		};

		var zoomerTouchEnd = function(event){
			if(touchStartedFlag){
				var carouselCurrentPosition = parseInt($imageContainerSlider.css("left"), 10);
				
				touchStartedFlag = false;

				if(carouselCurrentPosition > 0){
					
					$imageContainerSlider.finish().animate({
						left: 0
					}, 200);
					changeActiveMoreElement(0);
				
				}
				else if(slideCarouselWidth - slideElementsWidth < Math.abs(carouselCurrentPosition)){
					
					$imageContainerSlider.animate({
						left: "-" + slideElementsCount * 100 + "%"
					}, 200);
					changeActiveMoreElement(slideElementsCount);

				}else{
					var carouselMoveDistance = carouselStartPosition - carouselCurrentPosition;

					if(Math.abs(carouselMoveDistance) > 60){
						if(Math.abs(carouselMoveDistance) == carouselMoveDistance){
							var calcCurrentMove = Math.ceil(Math.abs(carouselCurrentPosition) / slideElementsWidth);
						}else{
							var calcCurrentMove = Math.floor(Math.abs(carouselCurrentPosition) / slideElementsWidth);
						}
					}else{
						var calcCurrentMove = Math.ceil(Math.abs(carouselStartPosition) / slideElementsWidth);
					}

					$imageContainerSlider.finish().animate({
						left: "-" + calcCurrentMove * 100 + "%"
					}, 200);
					changeActiveMoreElement(calcCurrentMove);
				}
			}

		};

		$(window).on("resize", function(){
			if($zoomer){
				$imageContainerSlider.height($(window).height() - 120);
				slideCarouselWidth = $imageContainerSlider[0].offsetWidth;
				slideElementsWidth = slideCarouselWidth / (slideElementsCount + 1);
			}

		}); //resize magic

		$(document).on("click", "#zoomer #zoomerMoreImagesContainer .item", nextSlideToEq);		
		$(document).on("click", "#zoomerNextMore, #zoomerBigNextMore", nextSlide);
		$(document).on("click", "#zoomerPrevMore, #zoomerBigPrevMore", prevSlide);
		$(document).on("click", "#zoomerExitLink", closeZoomer);
		$(document).on("click", ".zoom", openZoomer);
		$(document).on("keydown", zoomerKeyControl);
	
		$(document).on("mousedown touchstart", "#imageContainerSlider", zoomerStartTouch);
		$(document).on("mousemove touchmove", zoomerTouchMove);
		$(document).on("mouseup touchend", zoomerTouchEnd);

	});
/* End */
;; /* /local/templates/.default/components/dresscode/catalog.item/serviceDetail/script.js?16594438381142*/
; /* /local/templates/.default/components/dresscode/catalog.item/serviceDetail/js/morePicturesCarousel.js?16262889241882*/
; /* /local/templates/.default/components/dresscode/catalog.item/serviceDetail/js/pictureSlider.js?16262889241606*/
; /* /local/templates/.default/components/dresscode/catalog.item/serviceDetail/js/zoomer.js?162628892411150*/
