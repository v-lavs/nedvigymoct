/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js
//= include ../lib/lottie.js
//= include ../lib/jquery-nice-select-1.1.0/js/jquery.nice-select.js
//= include ../lib/lightbox2/js/lightbox.js
//= include ../lib/waypoints/index.js

// CUSTOM SCRIPTS

$(document).ready(function () {
    // let locationCards;
    let sliderAdvantages;
    let particularityCards;

    function getStripPosition() {
        const $strip = $('#blendStrip');

        if ($strip.length > 0) {
            const $title = $('.section-intro__title');
            const topOffset = $title.offset().top - $('.section-intro__content').offset().top;
            const isActive = $('.banner_anim').length > 0;

            $strip.css({
                top: topOffset + 'px',
                left: isActive ? $title.offset().left - $(window).outerWidth() + $title.outerWidth() + 'px' : $title.outerWidth() + $title.offset().left + 'px',
                height: $title.outerHeight() + 'px'
            });
        }
    }

    getStripPosition();

    lightbox.option({
        disableScrolling: true,
        positionFromTop: 0
    });

    function hideHeader() {
        $('.header').addClass('header_active');
    }

    // HEADER SCROLL

    let header = $('.header'),
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
            if (particularityCards && $('#particularityCards').length > 0) {
                particularityCards.destroy(true, true);
                particularityCards = null;
            }
        }
    }

    slidersInit();

    let timerID;
    const transitionDelayTime = 1000;

    function onResize() {
        slidersInit();
        setTimeout(() => {
            getStripPosition();
        }, transitionDelayTime);
    }

    $(window).on('resize', function () {
        clearTimeout(timerID);
        timerID = setTimeout(onResize, 100);
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
                $('body').removeClass('modal_open');
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
        jQuery('.overlay').fadeIn();
        $('body').addClass('modal_open');
    })

    $('#closePopup,  .overlay').click(function () {
        $('#popupConsultation').removeClass('open_modal');
        jQuery('.overlay').fadeOut();
        $('body').removeClass('modal_open');
    });

    //READ MORE BTN
    $('.btn_read-more').click(function (e) {
        e.preventDefault();
        $('.text-hide .mob-hide').removeClass('mob-hide');
        $(this).hide();
    });

    $('.btn_choose').click(function (e) {
        e.preventDefault();
        $('.search-table').addClass('open-choose');
        var items = $('.search-table__tbody .search-table__row');
        setTimeout(function () {
            for (var i = 0; i < items.length; i++) {
                $(items[i]).delay((items.length - i + 1) * 200).animate({opacity: 1}, 400);
            }
        }, 100);
    });

    //CUSTOM SELECT
    $('.custom-select').niceSelect();

    //ANIMATION
    setTimeout(function () {
        $('.section-intro').addClass('banner_anim');
        $('.section-banner').addClass('banner_anim');
    }, 400);

    const animSections = $('.section_anim').waypoint(function (direction) {
        $(this.element).addClass('active')
    }, {
        offset: '80%'
    });

    const slideInSections = $('.slide-in-left').waypoint(function (direction) {
        $(this.element).addClass('active')
    }, {
        offset: '80%'
    });

    window.addEventListener('resize', function () {
        window.lottie.resize();
    });


//ANIMATION MAPS LOTTIE
    function renderMap(container, lottieObj) {
        if (container) {
            const inViewport = elementInViewport(container, .5);

            if (inViewport) {
                lottieObj.play();
            }
        }
    }

    function elementInViewport(element, offsetTop) {
        const bounds = element.getBoundingClientRect();
        return (
            (window.innerHeight - bounds.top - bounds.height * offsetTop > 0)
        );
    }

    const mapContainer = document.getElementById('img_map');
    const animationMapWhite = lottie.loadAnimation({
        container: mapContainer,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMax slice'
        },
        path: 'assets/animation/map_white.json'
    });
    const mapBlackContainer = document.getElementById('wrap_maps');
    const animationMapBlack = lottie.loadAnimation({
        container: mapBlackContainer,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
        path: 'assets/animation/map_black.json'
    });

    document.addEventListener('scroll', function () {
        renderMap(mapContainer, animationMapWhite);
        renderMap(mapBlackContainer, animationMapBlack);
    });


    function onHoverPlay(container, lottieObj) {
        if ($(window).width() >= 760) {

            if (container) {
                container.addEventListener("mouseenter", function () {
                    lottieObj.play();
                });
                container.addEventListener("mouseleave", function () {
                    lottieObj.stop();
                    animationIcon1.goToAndStop(130, true);
                });
            }
        } else {
            lottieObj.play();
        }
    }

    const iconContainer1 = document.getElementById('advantages1');
    const animationIcon1 = lottie.loadAnimation({
        container: iconContainer1,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'assets/animation/animation_icon_house.json',
    });
    animationIcon1.goToAndStop(128, true);


    const iconContainer2 = document.getElementById('advantages2');
    const animationIcon2 = lottie.loadAnimation({
        container: iconContainer2,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'assets/animation/animation_icon_androida.json'
    });

    const iconContainer3 = document.getElementById('advantages3');
    const animationIcon3 = lottie.loadAnimation({
        container: iconContainer3,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'assets/animation/animation_icon_car.json'
    });

    onHoverPlay(iconContainer1, animationIcon1);
    onHoverPlay(iconContainer2, animationIcon2);
    onHoverPlay(iconContainer3, animationIcon3);
});