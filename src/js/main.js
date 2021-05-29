/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js ;

//= include ../lib/waypoints/index.js

// CUSTOM SCRIPTS

$(document).ready(function () {

    //MOBILE MENU
    var nav = $('.header__nav');

    $('.btn-burger').click(function (e) {
        e.preventDefault();
        nav.addClass('open');
        jQuery('.backdrop').fadeIn();
    });

    $('.btn-close, .backdrop').click(function (e) {
        e.preventDefault();
        nav.removeClass('open');
        jQuery('.backdrop').fadeOut();
    });

    $('.sub-menu__toggle').click(function (e) {
        $(this).toggleClass('sub-menu__toggle_active')
    });


    //HEADER SCROLL

    function onHeaderScrol() {
        scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > 40) {
            jQuery(".header").addClass('header_active');
        } else {
            jQuery(".header").removeClass('header_active');
        }
    }

    $(document).on('scroll', function () {
        onHeaderScrol()
    });

    var bannerSlider = new Swiper(".banner", {
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
        },
    });
    var sliderGallery = new Swiper("#gallery", {
        spaceBetween: 60,
        loop:true,
        pagination: {
            el: ".swiper-pagination",
        },
    });
    var sliderBuilding = new Swiper("#building", {
        spaceBetween: 60,
        loop:true,
        pagination: {
            el: ".swiper-pagination",
        },
    });

});
