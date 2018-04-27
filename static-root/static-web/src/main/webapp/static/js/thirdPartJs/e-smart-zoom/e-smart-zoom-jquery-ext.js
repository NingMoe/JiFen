/*
 *	jQuery zoom plugin
 *	Demo and documentation:
 *	http://e-smartdev.com/#!jsPluginList/panAndZoomJQuery
 *
 *	Copyright (c) 2012 Damien Corzani
 *	http://e-smartdev.com/
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 *
 *  extended version by litslink
 */
(function ($) {

  $.fn.smartZoom = function (method) {
    
    var targetElement = this; 
    var moveInParallel = [];
    var canMove = true;
    var publicEventList = {
      zoom : "zoom",
      afterContainerAdjsut : "afterContainerAdjsut"
    };

    /**
     * ESmartZoomEvent Class
     * define const use to dispatch zoom events
     */
    function ESmartZoomEvent(type) {
    }

    ESmartZoomEvent.ZOOM = "SmartZoom_ZOOM";
    ESmartZoomEvent.PAN = "SmartZoom_PAN";
    ESmartZoomEvent.START = "START";
    ESmartZoomEvent.END = "END";
    ESmartZoomEvent.DESTROYED = "SmartZoom_DESTROYED";

    /**
     * define public methods that user user could call
     */
    var publicMethods = {
      /**
       * initialize zoom component
       * @param {Object} options = {'top': '0' zoom target container top position in pixel
		  * 						   'left': '0' zoom target container left position in pixel
		  * 						   'width' : '100%' zoom target container width in pixel or in percent
		  * 						   'height' : '100%' zoom target container height in pixel or in percent
		  *                            'easing' : 'smartZoomEasing' jquery easing function used when the browser doesn't support css transitions
		  * 						   'initCallback' : null a callback function to call after plugin initilization
		  * 						   'maxScale' : 3 the max scale that will be applied on the zoom target
		  *							   'dblClickMaxScale' : 1.8 the max scale that will be applied on the zoom target on double click
		  *  				     	   'mouseEnabled' : true enable plugin mouse interaction
		  *					           'scrollEnabled' : true enable plugin mouse wheel behviour
		  *					           'dblClickEnabled' : true enable plugin mouse doubleClick behviour
		  *					           'mouseMoveEnabled' : true enable plugin target drag behviour
		  * 					       'moveCursorEnabled' : true show moveCursor for drag
		  * 					       'touchEnabled' : true enable plugin touch interaction
		  *						       'dblTapEnabled' : true enable plugin double tap behaviour
		  *							   'zoomOnSimpleClick': false enable zoom on simple click (if set to true dbl lick is disabled)
		  *						       'pinchEnabled' : true enable zoom when user pinch on target
		  *						       'touchMoveEnabled' : true enable target move via touch
		  *                            'containerBackground' : '#FFFFFF' zoom target container background color (if containerClass is not set)
		  *                            'containerClass' : '' class to apply to zoom target container if you whant to change background or borders (don't change size or position via the class)
		  * 						  }
       */
      init: function (options) {
        
        if (targetElement.data('smartZoomData'))
          return;

        
        settings = $.extend({
          'top': "0",
          'left': "0",
          'width': "100%",
          'height': "100%",
          'easing': "smartZoomEasing",
          'initCallback': null,
          'maxScale': 3,
          'dblClickMaxScale': 1.8,
          'mouseEnabled': true,
          'scrollEnabled': true,
          'dblClickEnabled': true,
          'mouseMoveEnabled': true,
          'moveCursorEnabled': true,
          'adjustOnResize': true,
          'touchEnabled': true,
          'dblTapEnabled': true,
          'zoomOnSimpleClick': false,
          'pinchEnabled': true,
          'touchMoveEnabled': true,
          'containerBackground': "#FFFFFF",
          'containerClass': "",
          'moveInParallel': [],
          'container' : null,
          'useContainerAsTarget' : false
        }, options);

        moveInParallel = settings.moveInParallel;

        

        var targetElementInitialStyles = targetElement.attr('style'); 

        
        var containerDiv;
        if( settings.container === null ){
          var zoomContainerId = "smartZoomContainer" + new Date().getTime();
          containerDiv = $('<div id="' + zoomContainerId + '" class="' + settings.containerClass + '"></div>');
          targetElement.before(containerDiv);
          targetElement.remove();
          containerDiv = $('#' + zoomContainerId);
          containerDiv.css({'overflow': 'hidden'});
          if (settings.containerClass == "")
            containerDiv.css({'background-color': settings.containerBackground});
          containerDiv.append(targetElement);
        } else {
          containerDiv = settings.container;
        }

        
        var touchInfos = new Object();
        touchInfos.lastTouchEndTime = 0; 
        touchInfos.lastTouchPositionArr = null; 
        touchInfos.touchMove = false; 
        touchInfos.touchPinch = false; 

        
        targetElement.data('smartZoomData', {
          settings: settings, 
          containerDiv: containerDiv, 
          originalSize: {width: targetElement.width(), height: targetElement.height()}, 
          originalPosition: targetElement.offset(), 
          transitionObject: getBrowserTransitionObject(), 
          touch: touchInfos, 
          mouseWheelDeltaFactor: 0.15, 
          currentWheelDelta: 0, 
          adjustedPosInfos: null, 
          moveCurrentPosition: null, 
          moveLastPosition: null, 
          mouseMoveForPan: false, 
          currentActionType: '', 
          initialStyles: targetElementInitialStyles, 
          currentActionStep: '' 
        });

        
        adjustToContainer();


        
        if (settings.touchEnabled == true){
          if( settings.useContainerAsTarget ){
            containerDiv.bind('touchstart.smartZoom', touchStartHandler);
          } else {
            targetElement.bind('touchstart.smartZoom', touchStartHandler);
          }
        }

        if (settings.mouseEnabled == true) {
          if (settings.mouseMoveEnabled == true){
            if( settings.useContainerAsTarget ){
              containerDiv.bind('mousedown.smartZoom', mouseDownHandler);
            } else {
              targetElement.bind('mousedown.smartZoom', mouseDownHandler);
            }
          }
          if (settings.scrollEnabled == true) {
            containerDiv.bind('mousewheel.smartZoom', mouseWheelHandler);
            containerDiv.bind('mousewheel.smartZoom DOMMouseScroll.smartZoom', containerMouseWheelHander);
          }
          if (settings.dblClickEnabled == true && settings.zoomOnSimpleClick == false)
            containerDiv.bind('dblclick.smartZoom', mouseDblClickHandler);
        }
        document.ondragstart = function () {
          return false;
        }; 
        if (settings.adjustOnResize == true)
          $(window).bind('resize.smartZoom', windowResizeEventHandler); 

        if (settings.initCallback != null) 
          settings.initCallback.apply(this, targetElement);
      },
      /**
       * zoom function used into the plugin and accessible via direct call (ex : $('#zoomImage').smartZoom('zoom', 0.2);)
       * @param {Number} scaleToAdd : the scale to add to the plugin target current scale (often < 1)
       * @param {Point} globalRequestedPosition {'x': global requested position in x
		  * 						                'y': global requested position in y
		  * 	   						           }  if this parameter is missing the zoom will target the object center
       * @param {Number} duration : zoom effect duration 700ms by default
       */
      zoom: function (scaleToAdd, globalRequestedPosition, duration) {
        
        
        

        var smartData = targetElement.data('smartZoomData');
        var globaRequestedX;
        var globaRequestedY;
        if (!globalRequestedPosition) { 
          var containerRect = getRect(smartData.containerDiv);
          globaRequestedX = containerRect.x + containerRect.width / 2;
          globaRequestedY = containerRect.y + containerRect.height / 2;
        } else {
          globaRequestedX = globalRequestedPosition.x;
          globaRequestedY = globalRequestedPosition.y;
        }

        
        stopAnim(ESmartZoomEvent.ZOOM);

        var targetRect = getTargetRect(true); 
        var originalSize = smartData.originalSize;
        var newScale = (targetRect.width / originalSize.width) + scaleToAdd; 

        
        newScale = Math.max(smartData.adjustedPosInfos.scale, newScale); 
        newScale = Math.min(smartData.settings.maxScale, newScale); 

        

        var newWidth = originalSize.width * newScale; 
        var newHeight = originalSize.height * newScale;

        var positionGlobalXDiff = globaRequestedX - targetRect.x; 
        var positionGlobalYDiff = globaRequestedY - targetRect.y;
        var sizeRatio = newWidth / targetRect.width;

        var newGlobalX = targetRect.x - ((positionGlobalXDiff * sizeRatio) - positionGlobalXDiff); 
        var newGlobalY = targetRect.y - ((positionGlobalYDiff * sizeRatio) - positionGlobalYDiff);
        var validPosition = getValidTargetElementPosition(newGlobalX, newGlobalY, newWidth, newHeight); 

        if (duration == null) 
          duration = 700;

        targetElement.trigger( publicEventList.zoom, [{
          scale : newScale
        }] );

        dispatchSmartZoomEvent(ESmartZoomEvent.ZOOM, ESmartZoomEvent.START, false);

        animate(targetElement, validPosition.x, validPosition.y, newWidth, newHeight, duration, function () { 
          smartData.currentWheelDelta = 0; 
          updateMouseMoveCursor(); 
          dispatchSmartZoomEvent(ESmartZoomEvent.ZOOM, ESmartZoomEvent.END, false);
        });

      },
      /**
       * pan function accessible via direct call (ex : $('#zoomImage').smartZoom('pan', 5, 0);)
       * @param {Number} xToAdd : a number to add to the object current position in X
       * @param {Point} yToAdd : a number to add to the object current position in Y
       * @param {Number} duration : move effect duration 700ms by default
       */
      pan: function (xToAdd, yToAdd, duration) {
        if (xToAdd == null || yToAdd == null) 
          return;

        if (duration == null) 
          duration = 700;
        var currentPosition = targetElement.offset();

        var targetRect = getTargetRect();
        var validPosition = getValidTargetElementPosition(currentPosition.left + xToAdd, currentPosition.top + yToAdd, targetRect.width, targetRect.height); 

        if (validPosition.x != currentPosition.left || validPosition.y != currentPosition.top) {
          
          stopAnim(ESmartZoomEvent.PAN);
          dispatchSmartZoomEvent(ESmartZoomEvent.PAN, ESmartZoomEvent.START, false);
          animate(targetElement, validPosition.x, validPosition.y, targetRect.width, targetRect.height, duration, function () { 
            dispatchSmartZoomEvent(ESmartZoomEvent.PAN, ESmartZoomEvent.END, false);
          });
        }
      },
      /**
       * destroy function accessible via direct call (ex : $('#zoomImage').smartZoom('destroy');)
       * use this function to clean and remove smartZoom plugin
       */
      destroy: function () {
        var smartData = targetElement.data('smartZoomData');
        if (!smartData)
          return;
        stopAnim(); 
        var containerDiv = smartData.containerDiv;
        
        targetElement.unbind('mousedown.smartZoom');
        targetElement.bind('touchstart.smartZoom');
        containerDiv.unbind('mousewheel.smartZoom');
        containerDiv.unbind('dblclick.smartZoom');
        containerDiv.unbind('mousewheel.smartZoom DOMMouseScroll.smartZoom');
        $(window).unbind('resize.smartZoom');
        $(document).unbind('mousemove.smartZoom');
        $(document).unbind('mouseup.smartZoom');
        $(document).unbind('touchmove.smartZoom');
        $(document).unbind('touchend.smartZoom');

        targetElement.css({"cursor": "default"}); 
        containerDiv.before(targetElement); 
        animate(targetElement, smartData.originalPosition.left, smartData.originalPosition.top, smartData.originalSize.width, smartData.originalSize.height, 5); 
        targetElement.removeData('smartZoomData');
        containerDiv.remove(); 
        targetElement.attr('style', smartData.initialStyles); 
        targetElement.trigger(ESmartZoomEvent.DESTROYED); 
      },
      /**
       * call this funcion to know if the plugin is used
       */
      isPluginActive: function () {
        return targetElement.data('smartZoomData') != undefined;
      }
    };

    if (publicMethods[method]) { 
      return publicMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) { 
      if (targetElement[0].tagName.toLowerCase() == "img" && !targetElement[0].complete) { 
        targetElement.bind('load.smartZoom', {arguments: arguments[0]}, imgLoadedHandler);
      } else {
        publicMethods.init.apply(targetElement, [arguments[0]]);
      }
    } else {
      $.error('Method ' + method + ' does not exist on e-smartzoom jquery plugin');
    }

    /**
     * call zoom function on mouse wheel event
     * @param {Object} e : mouse event
     * @param {Object} delta : wheel direction 1 or -1
     */
    function mouseWheelHandler(e, delta) {
      var smartData = targetElement.data('smartZoomData');
      if (smartData.currentWheelDelta * delta < 0) 
        smartData.currentWheelDelta = 0;
      smartData.currentWheelDelta += delta; 
      publicMethods.zoom(smartData.mouseWheelDeltaFactor * smartData.currentWheelDelta, {"x": e.pageX, "y": e.pageY}); 
    }

    /**
     * prevent page scroll when scrolling on zoomableContainer
     * @param {Object} e : mouse event
     */
    function containerMouseWheelHander(e) {
      e.preventDefault();
    }

    /**
     * update mouse cursor (move or default) if the zoom target is draggable
     */
    function updateMouseMoveCursor() {
      var smartData = targetElement.data('smartZoomData');
      if (smartData.settings.mouseMoveEnabled != true || smartData.settings.moveCursorEnabled != true)
        return;
      var targetRect = getTargetRect();
      var currentScale = (targetRect.width / smartData.originalSize.width);
      if (parseInt(currentScale * 100) > parseInt(smartData.adjustedPosInfos.scale * 100)) 
        targetElement.css({"cursor": "move"});
      else
        targetElement.css({"cursor": "default"});
    }

    /**
     * call "zoomOnDblClick" when user double click
     * @param {Object} e : mouse event
     */
    function mouseDblClickHandler(e) {
      zoomOnDblClick(e.pageX, e.pageY);
    }

    /**
     * save mouse position on mouse down (positions will be used in moveOnMotion function)
     * @param {Object} e : mouse event
     */
    function mouseDownHandler(e) {
      if( canMove ){
        e.preventDefault(); 
        $(document).on('mousemove.smartZoom', mouseMoveHandler); 
        $(document).bind('mouseup.smartZoom', mouseUpHandler);
        var smartData = targetElement.data('smartZoomData'); 
        smartData.moveCurrentPosition = new Point(e.pageX, e.pageY);
        smartData.moveLastPosition = new Point(e.pageX, e.pageY);
      }
    }

    /**
     * call "moveOnMotion" when the mouse move after mouseDown
     * @param {Object} e : mouse event
     */
    function mouseMoveHandler(e) {
      if( canMove ){
        var smartData = targetElement.data('smartZoomData');
        if (smartData.mouseMoveForPan || (!smartData.mouseMoveForPan && smartData.moveCurrentPosition.x != e.pageX && smartData.moveCurrentPosition.y != e.pageY)) {
          smartData.mouseMoveForPan = true;
          moveOnMotion(e.pageX, e.pageY, 0, false);
        }
      }
    }

    /**
     *  stop the drag on mouseup
     * @param {Object} e : mouse event
     */
    function mouseUpHandler(e) {

      var smartData = targetElement.data('smartZoomData');
      if (smartData.mouseMoveForPan) {
        smartData.mouseMoveForPan = false;
        if (smartData.moveLastPosition.distance(smartData.moveCurrentPosition) > 4) { 
          var interpolateP = smartData.moveLastPosition.interpolate(smartData.moveCurrentPosition, -4);
          moveOnMotion(interpolateP.x, interpolateP.y, 500, true);
        } else {
          moveOnMotion(smartData.moveLastPosition.x, smartData.moveLastPosition.y, 0, true);
        }
      } else if (smartData.settings.zoomOnSimpleClick) {
        zoomOnDblClick(e.pageX, e.pageY);
      }

      $(document).unbind('mousemove.smartZoom'); 
      $(document).unbind('mouseup.smartZoom');
    }

    /**
     * save touch position and init vars on touch start (information will be use in touchMoveHandler function and touch end)
     * @param {Object} e : touch event
     */
    function touchStartHandler(e) {
      if( canMove ){
        e.preventDefault(); 

        $(document).unbind('touchmove.smartZoom'); 
        $(document).unbind('touchend.smartZoom');

        $(document).bind('touchmove.smartZoom', touchMoveHandler); 
        $(document).bind('touchend.smartZoom', touchEndHandler);

        var touchList = e.originalEvent.touches; 
        var firstTouch = touchList[0];

        var smartData = targetElement.data('smartZoomData');
        smartData.touch.touchMove = false; 
        smartData.touch.touchPinch = false; 
        smartData.moveCurrentPosition = new Point(firstTouch.pageX, firstTouch.pageY); 
        smartData.moveLastPosition = new Point(firstTouch.pageX, firstTouch.pageY);
        smartData.touch.lastTouchPositionArr = new Array(); 
        var currentTouch;
        var nbTouch = touchList.length;
        for (var i = 0; i < nbTouch; ++i) {
          currentTouch = touchList[i];
          smartData.touch.lastTouchPositionArr.push(new Point(currentTouch.pageX, currentTouch.pageY));
        }
      }
    }

    /**
     *  manage pinch or drag when touch move
     * @param {Object} e : touch event
     */
    function touchMoveHandler(e) {
      
      e.preventDefault(); 

      var smartData = targetElement.data('smartZoomData');
      

      var touchListEv = e.originalEvent.touches; 
      var nbTouch = touchListEv.length;
      var currentFirstTouchEv = touchListEv[0];

      if (nbTouch == 1 && !smartData.touch.touchPinch && smartData.settings.touchMoveEnabled == true) { 
        if (!smartData.touch.touchMove) {
          var downLastPoint = smartData.touch.lastTouchPositionArr[0];
          if (downLastPoint.distance(new Point(currentFirstTouchEv.pageX, currentFirstTouchEv.pageY)) < 3) { 
            return;
          }
          else
            smartData.touch.touchMove = true;
        }
        moveOnMotion(currentFirstTouchEv.pageX, currentFirstTouchEv.pageY, 0, false);
      } else if (nbTouch == 2 && !smartData.touch.touchMove && smartData.settings.pinchEnabled == true) { 
        smartData.touch.touchPinch = true;

        var currentSecondTouchEv = touchListEv[1]; 
        var lastP1 = smartData.touch.lastTouchPositionArr[0];
        var lastP2 = smartData.touch.lastTouchPositionArr[1];
        var currentP1 = new Point(currentFirstTouchEv.pageX, currentFirstTouchEv.pageY);
        var currentP2 = new Point(currentSecondTouchEv.pageX, currentSecondTouchEv.pageY);

        var currentP1P2Distance = currentP1.distance(currentP2); 
        var lastP1P2Distance = lastP1.distance(lastP2); 
        var currentDistance = currentP1P2Distance - lastP1P2Distance; 

        if (Math.abs(currentDistance) < 3) 
          return;

        var middle = new Point((currentP1.x + currentP2.x) / 2, (currentP1.y + currentP2.y) / 2); 
        var targetRect = getTargetRect(); 
        var originSize = smartData.originalSize; 
        var currentScale = (targetRect.width / originSize.width); 
        var newZoomValueToAdd = currentP1P2Distance / lastP1P2Distance; 
        var newZoomScale = ((targetRect.width * newZoomValueToAdd) / originSize.width); 

        

        publicMethods.zoom(newZoomScale - currentScale, middle, 0); 

        smartData.touch.lastTouchPositionArr[0] = currentP1; 
        smartData.touch.lastTouchPositionArr[1] = currentP2;
      }
      
    }

    /**
     * manage touch move end or double tap at touch end
     * @param {Object} e : touch event
     */
    function touchEndHandler(e) {
      
      e.preventDefault(); 

      var nbTouchAtEnd = e.originalEvent.touches.length;
      if (nbTouchAtEnd == 0) { 
        $(document).unbind('touchmove.smartZoom');
        $(document).unbind('touchend.smartZoom');
      }
      var smartData = targetElement.data('smartZoomData');

      if (smartData.touch.touchPinch) 
        return;

      if (smartData.touch.touchMove) { 
        if (smartData.moveLastPosition.distance(smartData.moveCurrentPosition) > 2) { 
          var interpolateP = smartData.moveLastPosition.interpolate(smartData.moveCurrentPosition, -4); 
          moveOnMotion(interpolateP.x, interpolateP.y, 500, true);
        }
      } else {
        if (smartData.settings.dblTapEnabled == true && smartData.touch.lastTouchEndTime != 0 && new Date().getTime() - smartData.touch.lastTouchEndTime < 400) { 
          var lastStartPos = smartData.touch.lastTouchPositionArr[0];
          zoomOnDblClick(lastStartPos.x, lastStartPos.y);
        }
        smartData.touch.lastTouchEndTime = new Date().getTime();
      }
    }

    /**
     *  manage plugin target move after mouse or finger motion
     * @param {Number} xPos : new x position to set
     * @param {Number} yPos : new y position to set
     * @param {Number} duration : move effect duration
     * @motionEnd
     */
    function moveOnMotion(xPos, yPos, duration, motionEnd) {
      stopAnim(ESmartZoomEvent.PAN);

      var smartData = targetElement.data('smartZoomData');
      smartData.moveLastPosition.x = smartData.moveCurrentPosition.x; 
      smartData.moveLastPosition.y = smartData.moveCurrentPosition.y; 

      var currentPosition = targetElement.offset(); 
      var targetRect = getTargetRect(); 

      var newMarginLeft = currentPosition.left + (xPos - smartData.moveCurrentPosition.x); 
      var newMarginTop = currentPosition.top + (yPos - smartData.moveCurrentPosition.y);

      var validPosition = getValidTargetElementPosition(newMarginLeft, newMarginTop, targetRect.width, targetRect.height); 

      dispatchSmartZoomEvent(ESmartZoomEvent.PAN, ESmartZoomEvent.START, false);

      animate(targetElement, validPosition.x, validPosition.y, targetRect.width, targetRect.height, duration, motionEnd == true ? function () {
        dispatchSmartZoomEvent(ESmartZoomEvent.PAN, ESmartZoomEvent.END, false);
      } : null); 

      smartData.moveCurrentPosition.x = xPos; 
      smartData.moveCurrentPosition.y = yPos;
    }

    /**
     * manage zoom when user double click or double tap
     * @param {Number} pageX : double click (or tap) x position in page
     * @param {Number} pageY : double click (or tap) y position in page
     */
    function zoomOnDblClick(pageX, pageY) {
      var smartData = targetElement.data('smartZoomData');
      var originalSize = smartData.originalSize; 
      var targetRect = getTargetRect(); 
      var currentScale = (targetRect.width / originalSize.width); 
      var originalScale = smartData.adjustedPosInfos.scale; 
      var dblClickMaxScale = parseFloat(smartData.settings.dblClickMaxScale); 

      var scaleDiff; 
      if (currentScale.toFixed(2) > dblClickMaxScale.toFixed(2) || Math.abs(dblClickMaxScale - currentScale) > Math.abs(currentScale - originalScale)) {
        scaleDiff = dblClickMaxScale - currentScale;
      } else {
        scaleDiff = originalScale - currentScale;
      }

      publicMethods.zoom(scaleDiff, {"x": pageX, "y": pageY});
    }

    /**
     * stop the animation
     */
    function stopAnim(userActionType) {

      var smartData = targetElement.data('smartZoomData');
      if (smartData.transitionObject) { 
        if (smartData.transitionObject.cssAnimTimer) 
          clearTimeout(smartData.transitionObject.cssAnimTimer);
        var originalSize = smartData.originalSize; 
        var targetRect = getTargetRect(); 

        var cssObject = new Object(); 
        cssObject[smartData.transitionObject.transition] = 'all 0s'; 
        if (smartData.transitionObject.css3dSupported) {
          cssObject[smartData.transitionObject.transform] = 'translate3d(' + targetRect.x + 'px, ' + targetRect.y + 'px, 0) scale3d(' + targetRect.width / originalSize.width + ',' + targetRect.height / originalSize.height + ', 1)';
        } else {
          cssObject[smartData.transitionObject.transform] = 'translateX(' + targetRect.x + 'px) translateY(' + targetRect.y + 'px) scale(' + targetRect.width / originalSize.width + ',' + targetRect.height / originalSize.height + ')';
        }
        targetElement.css(cssObject);

      } else {
        targetElement.stop(); 
      }
      updateMouseMoveCursor(); 

      if (userActionType != null)
        dispatchSmartZoomEvent(userActionType, '', true);
    }

    /**
     * manage position validation
     * @param {Number} xPosition : global x position
     * @param {Number} yPosition : global y position
     * @param {Number} width : element width
     * @param {Number} height : element height
     */
    function getValidTargetElementPosition(xPosition, yPosition, width, height) {
      var smartData = targetElement.data('smartZoomData');
      
      var newMarginTop = Math.min(smartData.adjustedPosInfos.top, yPosition); 
      newMarginTop += Math.max(0, (smartData.adjustedPosInfos.top + smartData.adjustedPosInfos.height) - (newMarginTop + height)) 
      var newMarginLeft = Math.min(smartData.adjustedPosInfos.left, xPosition); 
      newMarginLeft += Math.max(0, (smartData.adjustedPosInfos.left + smartData.adjustedPosInfos.width) - (newMarginLeft + width)); 
      return new Point(newMarginLeft.toFixed(2), newMarginTop.toFixed(2));
    }

    /**
     * when the plugin target is an image we wait for image loading before initilization
     * @param {Object} e : load event
     */
    function imgLoadedHandler(e) {
      targetElement.unbind('load.smartZoom');
      publicMethods.init.apply(targetElement, [e.data.arguments]);
    }

    /**
     * this function fit the plugin target to the zoom container at initialization and when the window is resized
     */
    function adjustToContainer() {

      var smartData = targetElement.data('smartZoomData');
      var containerDiv = smartData.containerDiv; 
      var originalSize = smartData.originalSize; 

      
      var parentOffset = containerDiv.parent().offset();
      var containerDivNewLeft = getContainerDivPositionFromSettings(smartData.settings.left, parentOffset.left, containerDiv.parent().width());
      var containerDivNewTop = getContainerDivPositionFromSettings(smartData.settings.top, parentOffset.top, containerDiv.parent().height());

      containerDiv.offset({left: containerDivNewLeft, top: containerDivNewTop}); 
      containerDiv.width(getContainerDivSizeFromSettings(smartData.settings.width, containerDiv.parent().width(), containerDivNewLeft - parentOffset.left)); 
      containerDiv.height(getContainerDivSizeFromSettings(smartData.settings.height, containerDiv.parent().height(), containerDivNewTop - parentOffset.top));

      var containerRect = getRect(containerDiv); 
      var scaleToFit = Math.min(Math.min(containerRect.width / originalSize.width, containerRect.height / originalSize.height), 1).toFixed(2); 
      var newWidth = originalSize.width * scaleToFit; 
      var newHeight = originalSize.height * scaleToFit;

      
      smartData.adjustedPosInfos = {
        "left": (containerRect.width - newWidth) / 2 + parentOffset.left,
        "top": (containerRect.height - newHeight) / 2 + parentOffset.top,
        "width": newWidth,
        "height": newHeight,
        "scale": scaleToFit
      };

      

      targetElement.trigger( publicEventList.zoom, [{
        scale : scaleToFit
      }] );

      stopAnim();
      
      animate(targetElement, smartData.adjustedPosInfos.left, smartData.adjustedPosInfos.top, newWidth, newHeight, 0, function () {
        targetElement.css('visibility', 'visible'); 
      });

      updateMouseMoveCursor();
    }

    /**
     * animate the plugin target
     * @param {Object} target : the element to animate
     * @param {Number} globalLeft : the global x target position
     * @param {Number} globalTop : the global y target position
     * @param {Number} width : targeted width
     * @param {Number} height : targeted height
     * @param {Number} duration : effect duration
     * @param {Function} callback : function to call when effect end
     *
     */
    function animate(target, globalLeft, globalTop, width, height, duration, callback) {

      var smartData = targetElement.data('smartZoomData');
      var parentOffset = smartData.containerDiv.offset();
      var left = globalLeft - parentOffset.left; 
      var top = globalTop - parentOffset.top;

      if (smartData.transitionObject != null) { 
        var originalSize = smartData.originalSize;
        var cssObject = new Object();
        cssObject[smartData.transitionObject.transform + '-origin'] = '0 0';
        cssObject[smartData.transitionObject.transition] = 'all ' + duration / 1000 + 's'; 

        if (smartData.transitionObject.css3dSupported) 
          cssObject[smartData.transitionObject.transform] = 'translate3d(' + left + 'px, ' + top + 'px, 0) scale3d(' + width / originalSize.width + ',' + height / originalSize.height + ', 1)';
        else
          cssObject[smartData.transitionObject.transform] = 'translateX(' + left + 'px) translateY(' + top + 'px) scale(' + width / originalSize.width + ',' + height / originalSize.height + ')';
        target.css(cssObject); 

        if (moveInParallel.length > 0) {
          for (var i = 0; i < moveInParallel.length; i++) {
            moveInParallel[i].css(cssObject);
          }
        }

        if (callback != null) 
          smartData.transitionObject.cssAnimTimer = setTimeout(callback, duration);
      } else { 

        target.animate({"margin-left": left, "margin-top": top, "width": width, "height": height}, {
          duration: duration, easing: smartData.settings.easing, complete: function () {
            if (callback != null)
              callback();
          }
        });

        if (moveInParallel.length > 0) {
          for (var j = 0; j < moveInParallel.length; j++) {
            moveInParallel[j].animate({"margin-left": left, "margin-top": top, "width": width, "height": height}, {
              duration: duration, easing: smartData.settings.easing, complete: function () {
              }
            });
          }
        }
      }
    }

    /**
     * get the plugin target rectangle on screen
     * @param {Boolean} globalPosition : if true return global position else return relative position
     * @return {Object} {'x':'x Position', 'y':'y Position', 'width':' element width', 'height': 'element height'}
     */
    function getTargetRect(globalPosition) {
      var smartData = targetElement.data('smartZoomData');
      var width = targetElement.width(); 
      var height = targetElement.height();
      var position = targetElement.offset(); 
      var x = parseInt(position.left); 
      var y = parseInt(position.top);

      var parentOffset = smartData.containerDiv.offset(); 

      if (globalPosition != true) { 
        x = parseInt(x) - parentOffset.left;
        y = parseInt(y) - parentOffset.top;
      }

      if (smartData.transitionObject != null) { 
        var transformMatrix = targetElement.css(smartData.transitionObject.transform);
        if (transformMatrix && transformMatrix != "" && transformMatrix.search('matrix') != -1) { 
          var scale;
          var arrValues;
          if (transformMatrix.search('matrix3d') != -1) { 
            arrValues = transformMatrix.replace('matrix3d(', '').replace(')', '').split(',');
            scale = arrValues[0]; 
          } else {
            arrValues = transformMatrix.replace('matrix(', '').replace(')', '').split(',');
            scale = arrValues[3];
            x = parseFloat(arrValues[4]);
            y = parseFloat(arrValues[5]);
            if (globalPosition) { 
              x = parseFloat(x) + parentOffset.left;
              y = parseFloat(y) + parentOffset.top;
            }
          }
          width = scale * width; 
          height = scale * height;
        }
      }
      return {'x': x, 'y': y, 'width': width, 'height': height};
    }

    /**
     * dispatch zoom or pan event
     *
     **/
    function dispatchSmartZoomEvent(actionType, actionStep, stop) {
      var smartData = targetElement.data('smartZoomData');
      var eventTypeToDispatch = '';

      if (stop == true && smartData.currentActionType != actionType) { 
        eventTypeToDispatch = smartData.currentActionType + '_' + ESmartZoomEvent.END;
        smartData.currentActionType = '';
        smartData.currentActionStep = '';
      } else {
        if (smartData.currentActionType != actionType || smartData.currentActionStep == ESmartZoomEvent.END) { 
          smartData.currentActionType = actionType;
          smartData.currentActionStep = ESmartZoomEvent.START;
          eventTypeToDispatch = smartData.currentActionType + '_' + smartData.currentActionStep;
        } else if (smartData.currentActionType == actionType && actionStep == ESmartZoomEvent.END) { 
          smartData.currentActionStep = ESmartZoomEvent.END;
          eventTypeToDispatch = smartData.currentActionType + '_' + smartData.currentActionStep;
          smartData.currentActionType = '';
          smartData.currentActionStep = '';
        }
      }

      if (eventTypeToDispatch != '') { 
        var ev = jQuery.Event(eventTypeToDispatch);
        ev.targetRect = getTargetRect(true);
        ev.scale = ev.targetRect.width / smartData.originalSize.width;
        targetElement.trigger(ev);
        
      }
    }

    /**
     * return an object that contains the kind of CSS3 supported transition
     *  @return {Object} {'transition':'-webkit-transition', 'transform':'-webkit-transform', 'css3dSupported':'true'}
     */
    function getBrowserTransitionObject() {

      var pageBody = document.body || document.documentElement;
      var bodyStyle = pageBody.style;

      var transitionTestArr = ['transition', 'WebkitTransition', 'MozTransition', 'MsTransition', 'OTransition']; 
      var transitionArr = ['transition', '-webkit-transition', '-moz-transition', '-ms-transition', '-o-transition'];
      var transformArr = ['transform', '-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform'];

      var length = transitionTestArr.length;
      var transformObject;
      for (var i = 0; i < length; i++) { 
        if (bodyStyle[transitionTestArr[i]] != null) {
          transformStr = transformArr[i];
          var div = $('<div style="position:absolute;">Translate3d Test</div>');
          $('body').append(div); 
          transformObject = new Object();
          transformObject[transformArr[i]] = "translate3d(20px,0,0)";
          div.css(transformObject);
          css3dSupported = ((div.offset().left - $('body').offset().left) == 20); 
          div.empty().remove();
          if (css3dSupported) { 
            return {transition: transitionArr[i], transform: transformArr[i], css3dSupported: css3dSupported};
          }
        }
      }
      return null;
    }

    /**
     * get the plugin target rectangle on screen
     * @param {Object} settingsValue : a number or a string value given in plugin params
     * @param {Number} zoomableContainerParentValue : zoomable container parent width or height
     * @param {Number} divPosDiff : zoomable container parent and zoomable container position difference
     * @return {Number} return the zoomable container size (in pixel) from setting value (pixel or percent)
     */
    function getContainerDivSizeFromSettings(settingsValue, zoomableContainerParentValue, divPosDiff) {
      if (settingsValue.search && settingsValue.search("%") != -1)
        return (zoomableContainerParentValue - divPosDiff) * (parseInt(settingsValue) / 100);
      else
        return parseInt(settingsValue);
    }

    /**
     * get the plugin target rectangle on screen
     * @param {Object} settingsValue : a number or a string value given in plugin params
     * @param {Number} zoomableContainerParentPosValue : zoomable container parent global x  or y
     * @param {Number} zoomableContainerParentSizeValue : zoomable container parent width or height
     * @return {Number} return the zoomable container position (in pixel) from setting value (pixel or percent)
     */
    function getContainerDivPositionFromSettings(settingsValue, zoomableContainerParentPosValue, zoomableContainerParentSizeValue) {
      if (settingsValue.search && settingsValue.search("%") != -1)
        return zoomableContainerParentPosValue + zoomableContainerParentSizeValue * (parseInt(settingsValue) / 100);
      else
        return zoomableContainerParentPosValue + parseInt(settingsValue);
    }

    /**
     * reinit the component when the user resize the window
     */
    function windowResizeEventHandler() {
      adjustToContainer();
    }

    /**
     * return a retangle from a JQuery object
     * @param {Object} jqObject : a JQuery object like $('#myObject')
     * @return {Object} return {'x':objectX, 'y':objectY, 'width':objectWidth, 'height':objectHeight}
     */
    function getRect(jqObject) {
      var offset = jqObject.offset();
      if (!offset)
        return null;
      var formX = offset.left;
      var formY = offset.top;
      return {'x': formX, 'y': formY, 'width': jqObject.outerWidth(), 'height': jqObject.outerHeight()};
    }

    /**
     * Point Class
     * @param {Number} x : point position on X axis
     * @param {Number} y : point position on Y axis
     */
    function Point(x, y) {
      this.x = x;
      this.y = y;
      /**
       * return point informations into a string
       * @return {String} return (x=5, y=5)
       */
      this.toString = function () {
        return '(x=' + this.x + ', y=' + this.y + ')';
      };
      /**
       * return a new point who is the interpolation of this and the given point
       * the new point position is calculate thanks to percentInterpolate (the distance between this and pointToInterpolate in percent)
       * @return {Point} return {'x':interpolateX, 'y':interpolateY}
       */
      this.interpolate = function (pointToInterpolate, percentInterpolate) {
        var x = percentInterpolate * this.x + (1 - percentInterpolate) * pointToInterpolate.x;
        var y = percentInterpolate * this.y + (1 - percentInterpolate) * pointToInterpolate.y;
        return new Point(x, y);
      };
      /**
       * return the distance between "this" point and the given point
       * @return {Number} distance between this and "point"
       */
      this.distance = function (point) {
        if( typeof point === "undefined" ){
          console.log("suka");
        }
        return Math.sqrt(Math.pow((point.y - this.y), 2) + Math.pow((point.x - this.x), 2));
      }
    }

    return {
      instance : this,
      eventList : publicEventList,
      getSmartZoomData : function(){
        return targetElement.data('smartZoomData')
      },
      getScale : function(){
        return targetElement.data('smartZoomData').adjustedPosInfos.scale
      },
      setCanMove : function( newValue ){
        canMove = newValue;

        console.log("canMove: ", canMove);
      },
      mouseDblClickHandler: mouseDblClickHandler,
      touchStartHandler: touchStartHandler,
      mouseDownHandler: mouseDownHandler,
      mouseWheelHandler: mouseWheelHandler,
      containerMouseWheelHander: containerMouseWheelHander,
      windowResizeEventHandler: windowResizeEventHandler,
      mouseMoveHandler: mouseMoveHandler,
      mouseUpHandler: mouseUpHandler,
      touchMoveHandler: touchMoveHandler
    }

  };
})(jQuery);

/*
 * add smartZoomEasing and smartZoomOutQuad to jQuery easing function
 */
(function ($) {
  $.extend($.easing,
      {
        smartZoomEasing: function (x, t, b, c, d) {
          return $.easing['smartZoomOutQuad'](x, t, b, c, d);
        },
        smartZoomOutQuad: function (x, t, b, c, d) {
          return -c * (t /= d) * (t - 2) + b;
        }
      });
})(jQuery);

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */
(function (e) {
  function r(t) {
    var n = t || window.event, r = [].slice.call(arguments, 1), i = 0, s = true, o = 0, u = 0;
    t = e.event.fix(n);
    t.type = "mousewheel";
    if (n.wheelDelta) {
      i = n.wheelDelta / 120
    }
    if (n.detail) {
      i = -n.detail / 3
    }
    u = i;
    if (n.axis !== undefined && n.axis === n.HORIZONTAL_AXIS) {
      u = 0;
      o = -1 * i
    }
    if (n.wheelDeltaY !== undefined) {
      u = n.wheelDeltaY / 120
    }
    if (n.wheelDeltaX !== undefined) {
      o = -1 * n.wheelDeltaX / 120
    }
    r.unshift(t, i, o, u);
    return (e.event.dispatch || e.event.handle).apply(this, r)
  }

  var t = ["DOMMouseScroll", "mousewheel"];
  if (e.event.fixHooks) {
    for (var n = t.length; n;) {
      e.event.fixHooks[t[--n]] = e.event.mouseHooks
    }
  }
  e.event.special.mousewheel = {
    setup: function () {
      if (this.addEventListener) {
        for (var e = t.length; e;) {
          this.addEventListener(t[--e], r, false)
        }
      } else {
        this.onmousewheel = r
      }
    }, teardown: function () {
      if (this.removeEventListener) {
        for (var e = t.length; e;) {
          this.removeEventListener(t[--e], r, false)
        }
      } else {
        this.onmousewheel = null
      }
    }
  };
  e.fn.extend({
    mousewheel: function (e) {
      return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
    }, unmousewheel: function (e) {
      return this.unbind("mousewheel", e)
    }
  })
})(jQuery);
