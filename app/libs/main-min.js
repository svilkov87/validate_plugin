$( document ).ready( function() {

    'use-strict';

    var $mainBurger = $('.b-nav__menu-block').find('.fa-bars');

    $mainBurger.on('click', function() {

        $('.b-nav__ul').toggleClass('active_menu');

    } );

    $('.b-nav__li_category').hover(
        function() {
            // $( this ).show();
            $('.b-nav__ul-child').addClass('active');
        },
        function() {
            // $('.b-nav__ul-child').hide();
            $('.b-nav__ul-child').removeClass('active');
        }
    );

} );

