(function() {
  var $menu = $('#menu-dropdown');
  var $overlay = $('.overlay');
  var $body = $('body');

  var triggerEvt = function() {
    $menu.toggleClass('menu--active');
    $overlay.fadeToggle(200);
    $body.toggleClass('body--no-scroll');
  };

  $menu.on('click', '#open', function() {
    triggerEvt();
  });

  $overlay.on('click', function() {
    triggerEvt();
  });
})();
