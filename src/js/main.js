/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js
//= include ../../node_modules/lottie-web/build/player/lottie.js
//= include ../lib/jquery-nice-select-1.1.0/js/jquery.nice-select.js
//= include ../lib/lightbox2/js/lightbox.js
//= include ../lib/waypoints/index.js

// CUSTOM SCRIPTS

$(document).ready(function () {
    // let locationCards;
    let sliderAdvantages;
    let particularityCards;

    lightbox.option({
        disableScrolling: true,
        positionFromTop: 0
    });

    function hideHeader() {
        $('.header').addClass('header_active');
    }

    // HEADER SCROLL

    var header = $('.header'),
        scrollPrev = 0;

    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();

        if (scrolled > 100 && scrolled > scrollPrev) {
            header.addClass('header_active');
        } else {
            header.removeClass('header_active');
        }
        scrollPrev = scrolled;
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
            if (!particularityCards) {
                particularityCards = new Swiper('#particularityCards', {
                    pagination: {
                        el: '#particularityCards .swiper-pagination',
                        clickable: true,
                    }
                });
            }
        } else {
            if (particularityCards) {
                particularityCards.destroy(true, true);
                particularityCards = null;
            }
        }
    }

    slidersInit();

    $(window).on('resize', function () {
        slidersInit();
    });

    //MOBILE MENU
    const nav = $('.header__nav');

    $('.btn-burger').click(function (e) {
        e.preventDefault();
        nav.addClass('open');
        jQuery('.backdrop').fadeIn();
        $('body').addClass('modal_open');
    });

    $('.btn-close, .backdrop').click(function (e) {
        e.preventDefault();
        nav.removeClass('open');
        jQuery('.backdrop').fadeOut();
        $('body').removeClass('modal_open');
    });

    $('.sub-menu__toggle').click(function (e) {
        $(this).toggleClass('sub-menu__toggle_active')
    });

    // SMOOTH SCROLL TO ANCHOR
    function smoothScrollToAnchor(selector) {
        $(selector).on('click', function (event) {
            let anchor = $.attr(this, 'href')

            if (anchor.match(/^#/) && anchor !== '#') {
                event.preventDefault()
                let offsetSize = $("header").innerHeight();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - offsetSize
                }, 2000);
                nav.removeClass('open');
                jQuery('.backdrop').fadeOut();
            }
        })

    }

    smoothScrollToAnchor('.menu__link')

    //HEADER SCROLL

    function onHeaderScroll() {
        scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > 40) {
            jQuery(".header").addClass('header_active');
        } else {
            jQuery(".header").removeClass('header_active');
        }
    }

    onHeaderScroll();

    $(document).on('scroll', function () {
        onHeaderScroll()
    });


    //DOCUMENT LIST CHANGE
    $('#documents-list input').on('change', function () {
        const id = $(this).val();
        $('.section-documents .documents-list').fadeOut(700);
        setTimeout(function () {
            $('.section-documents .documents-list').hide().removeClass('active');
            $('#' + id).fadeIn(700).addClass('active');
        }, 701);
    });


    //SLIDERS

    let bannerSlider = new Swiper(".banner", {
        grabCursor: true,
        pagination: {
            el: "#mainBannerPagination",
            clickable: true
        },
    });

    let singleBannerSlider = new Swiper(".single-banner-slider", {
        grabCursor: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        spaceBetween: 10,
        loop: true,
        pagination: {
            el: "#singleBannerSlide",
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


    // POPUP
    $('.popup-trigger-consultation').click(function (e) {
        e.preventDefault();
        $('#popupConsultation').addClass('open_modal');
        $('#overlay').fadeIn();
        $('body').addClass('modal_open');
    })

    $('#closePopup,  #overlay').click(function () {
        $('#popupConsultation').removeClass('open_modal');
        $('#overlay').fadeOut();
        $('body').removeClass('modal_open');
    });

    //READ MORE BTN
    $('.btn_read-more').click(function (e) {
        e.preventDefault();
        $('.text-hide .mob-hide').removeClass('mob-hide');
        $(this).hide();
    });

    //CUSTOM SELECT
    $('.custom-select').niceSelect();

    //ANIMATION
    setTimeout(function () {
        $('.section-intro').addClass('banner_anim');
        $('.section-banner').addClass('banner_anim');
    }, 400);

    var waypoints = $('.section_anim').waypoint(function (direction) {
        $(this.element).addClass('active')
    }, {
        offset: '80%'
    });

    // window.addEventListener('resize', function() {
    //     window.require("lottie").lottie.resize();
    // });


    let animationDiv = document.getElementById('scrollingArea')
    animationDiv.style.display = "none";

    function map(div, pathLocation) {
        let animationMap = bodymovin.loadAnimation({
            container: document.getElementById('img_map'),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMax slice'
            },
            path: 'Map_animation.json'
        });
        animationMap.play();
    }

    window.addEventListener('scroll', () => {

        let scrollHeightPercent = document.documentElement.scrollHeight * 0.08
        let currentPOS = document.documentElement.scrollTop || document.body.scrollTop

        if (currentPOS >= scrollHeightPercent) {
            let animationDiv = document.getElementById('scrollingArea');
            if (animationDiv.style.display === 'none') {

                animationDiv.style.display = ""

                let bodyMotion1 = document.getElementById('lottie-scroll-1');
                map(bodyMotion1, 'Map_animation.json')
            };
        };
    });

    $('.btn_choose').click(function (e) {
        e.preventDefault();
        $('.search-table').addClass('open-choose');
        var items = $('.search-table__tbody .search-table__row');
        setTimeout(function () {
            for (var i = 0; i < items.length; i++) {
                $(items[i]).delay(i * 400).animate({opacity: 1}, 400);
            }
        }, 400);
    });
});