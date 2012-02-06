/**
 * @author Roy Riojas
 * version : @VERSION
 */

(function ($) {
  $.windowLoaded = false;
  $.event.special.load = {
     add: function (handleObj) {
       var old_handler = handleObj.handler;
      if ( this.nodeType === 1 && this.tagName.toLowerCase() === 'img' && this.src !== '' ) {
        // Image is already complete, fire the hollaback (fixes browser issues were cached
        // images isn't triggering the load event)
        if ( this.complete || this.readyState === 4 ) {
          old_handler && old_handler.apply(this, arguments);
          return false;
        }
      }
      if (this == window) {
        if ($.windowLoaded) {
          old_handler && old_handler.apply(this, arguments);
          return false;
        }
      }
      handleObj.handler = function (e) {
        $.windowLoaded = true;
        old_handler && old_handler.apply(this, arguments);
      }
    }
  };
  
  
  $( function () {
    var $sections = $('#content > section'),
    current = null,
    $win = $(window),
    $body = $('body'),
    $html = $('html'),
    $doc = $(document);
    
    var supportCSSTransitions = Modernizr.csstransitions;
    // iterates over all tab widgets, changing the current tab as necessary.
    $win.on('hashchange', function(e) {
      var currentSection = e.getState('current') || 'home';
      var validAction = /\bhome\b|\baboutkidapt\b|\bteam\b|\bleospad\b/i.test(currentSection);
      currentSection = validAction ? currentSection : 'home';
      
      $body.removeClass('home aboutkidapt team leospad').addClass(currentSection);
      
      if (!supportCSSTransitions) {
        $sections.hide();
        $sections.filter('[data-id='+currentSection+']').fadeIn();
      }
      
      if (current) {
        $doc.triggerHandler('sectionhide', { section : current });
      }
      current = currentSection;
      setTimeout(function(){
        $doc.triggerHandler('sectionshow', { section : current });
      }, 1);
    })

    $win.triggerHandler('hashchange');
    
    /*
    var $gallery = $('.gallery').hide();
    $win.bind('load', function () {
      $gallery.fadeIn().nivoSlider({ pauseTime : 4000 });
    });*/
    
    $html.removeClass('not-ready');
    $doc.triggerHandler('appready', { supportTransitions: supportCSSTransitions });
  });
    
})(jQuery)
