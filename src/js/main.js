/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js ;

//= include ../lib/lightbox2/js/lightbox.js
//= include ../lib/waypoints/index.js

// CUSTOM SCRIPTS

$(document).ready(function () {
    let locationCards;
    let sliderAdvantages;

    lightbox.option({
        disableScrolling: true,
        positionFromTop: 0
    });

    function slidersInit() {
        if ($(window).width() <= 1180) {
            if (!sliderAdvantages) {
                sliderAdvantages = new Swiper('#sliderAdvantages', {
                    slidesPerView: 1,
                    spaceBetween: 40,
                    breakpoints: {
                        760: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                    },
                    pagination: {
                        el: '#sliderAdvantages .swiper-pagination',
                        clickable: true,
                    }
                });
            }
        } else {
            if (sliderAdvantages) {
                sliderAdvantages.destroy(true, true);
                sliderAdvantages = null;
            }
        }
        if ($(window).width() <= 760) {
            if (!locationCards) {
                locationCards = new Swiper('#locationCards', {
                    pagination: {
                        el: '#locationCards .swiper-pagination',
                        clickable: true,
                    }
                });
            }
        } else {
            if (locationCards) {
                locationCards.destroy(true, true);
                locationCards = null;
            }
        }
    }

    slidersInit();

    $(window).on('resize', function () {
        slidersInit();
    });

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

    $('#documents-list input').on('change', function () {
        const id = $(this).val();
        $('.section-documents .documents-list').fadeOut(700);
        setTimeout(function () {
            $('.section-documents .documents-list').hide().removeClass('active');
            $('#' + id).fadeIn(700).addClass('active');
        }, 701);
    });

    let bannerSlider = new Swiper(".banner", {
        grabCursor: true,
        pagination: {
            el: "#mainBannerPagination",
            clickable: true
        },
    });

    let sliderGallery = new Swiper("#gallery", {
        spaceBetween: 60,
        loop: true,
        slidesPerView: "auto",
        centeredSlides: true,
        pagination: {
            el: "#gallery .swiper-pagination",
            clickable: true
        },
    });

    let sliderBuilding = new Swiper("#building", {
        spaceBetween: 60,
        loop: true,
        slidesPerView: "auto",
        centeredSlides: true,
        pagination: {
            el: "#building .swiper-pagination",
            clickable: true
        },
    });

    //ANIMATION

    var waypoints = $('.section_anim').waypoint(function (direction) {
        $(this.element).addClass('active')
    }, {
        offset: '75%'
    });
});
