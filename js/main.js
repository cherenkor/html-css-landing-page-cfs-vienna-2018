$(document).on('click', '#main-menu a[href^="#"]', function (event) {
    event.preventDefault();
    event.stopPropagation();

    let gap = 70;

    if ($.attr(this, 'href') === "#location") gap = 0;

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - gap
    }, 500);
});

$(document).on('click', '#main-menu .nav-item', function (event) {
    event.preventDefault();
    event.stopPropagation();
})

$(document).ready(function () {
    var sections = $('section')
        , nav = $('#top-menu')
        , nav_height = nav.outerHeight() + 50;

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            activeOnScroll(cur_pos, this);
        });
    });

    function activeOnScroll(cur_pos, that) {
        var top = $(that).offset().top - nav_height,
            bottom = top + $(that).outerHeight() + 50;

        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('active').blur();
            sections.each(function () {
                $(that).removeClass('active');
            })

            const positionFromTop = $(window).scrollTop();

            $(that).addClass('active');

            if ($(that).attr('id') === 'speakers-outer') {
                setActive(nav.find('a[href="#speakers"]'));
            } else if (positionFromTop < 180) {
                setActive(nav.find('a[href="#home"]'));
            } else if ($(that).find('div #registration').attr('id') === 'registration') {
                setActive(nav.find('a[href="#registration"]'));
            } else {
                setActive(nav.find('a[href="#' + $(that).attr('id') + '"]'));
            }
        }
    }

    function setActive(el) {
        el.addClass('active');
    }

    function initialize() {
        var myLatlng = new google.maps.LatLng(40.758895, -73.985),
            mapOptions = {
                zoom: 13,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var contentString = 'Times Square, Manhattan';
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 500
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
    }
    // google.maps.event.addDomListener(window, 'load', initialize);
})