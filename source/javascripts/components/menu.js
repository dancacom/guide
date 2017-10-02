(function() {
  var $menu = $('#menu-dropdown');

  $menu.on('click', '#open', function() {
    $menu.toggleClass('menu--active');
  });
})();
