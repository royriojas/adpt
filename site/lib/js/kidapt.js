;(function($){
  var $win = $(window);
  var $doc = $(document);
  var $gallery = $('.gallery');
  
  function checkForFirstImageLoaded(cb) {
    var alreadyLoaded = false;
    
    //try to create the gallery as soon as the first image has been loaded
    $gallery.find('img:first').on('load', function (e){
      if (alreadyLoaded) return;
      alreadyLoaded = true; 
      cb && cb();
    });
    //try to wait until loaded as a fallback
    $win.on('load', function (e) {
      alreadyLoaded = true;
      cb && cb();
    });
  }
  
  $doc.on('appready', function (e, args){
    //check to create the carrousel
    checkForFirstImageLoaded(function (){
      var supportTransitions = args.supportTransitions;
      
      $gallery.addClass('shown');
      if (!supportTransitions) {
        $gallery.fadeIn();
      }
      $gallery.nivoSlider({ pauseTime : 4000, effect: 'fade' });
    });
    
    
    
  });
  
})(jQuery);
