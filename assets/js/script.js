
/*
$('nav ul li a:not(:only-child)').click(function(e) {
    $(this).siblings('.nav-dropdown').toggle();
    // Close one dropdown when selecting another
    $('.nav-dropdown').not($(this).siblings()).hide();
    e.stopPropagation();
  });
  // Clicking away from dropdown will remove the dropdown class
  $('html').click(function() {
    $('.nav-dropdown').hide();
  });
  // Toggle open and close nav styles on click
  $('#nav-toggle').click(function() {
    $('nav ul').slideToggle();
  });
  // Hamburger to X toggle
  $('#nav-toggle').on('click', function() {
    this.classList.toggle('active');
});
*/

$('video').each(function(index){

    const circlePlayButton = document.getElementById("circle-play-b");
    var video = $(this); 
    
    function togglePlay() {
        if (video.paused || video.ended) {
            video.play();
        } else {
            video.pause();
        }
    }
        

    $(this).next().on("click", function (e) {
        if (video.get(0).paused || video.get(0).ended) {
            video.get(0).play();
        } else {
            video.get(0).pause();
        }

    });

    $(this).on("playing", function (e) {
        $(this).next().css("opacity", "0");
    });

    $(this).on("pause", function (e) {
        $(this).next().css("opacity", "1");
    });
});




$('.toggle').click(function(e) {
    e.preventDefault();
    var $this = $(this);

    if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.removeClass('arrow-turn');
        $this.next().hide();
    } else {
        $this.parent().parent().find('li .inner').removeClass('show');
        $this.toggleClass('arrow-turn');
        $this.next().toggleClass('show');
        $this.next().toggle();
    }
});

$('.mobile-jump-links a').click(function(e) {

    e.preventDefault(); // prevent hard jump, the default behavior

    navHeight = 150+$('.mobile-jump-nav a').height()
console.log(navHeight);
    var target = $(this).attr("href"); // Set the target as variable

    // perform animated scrolling by getting top-position of target-element and set it as scroll target
    $('html, body').stop().animate({
            scrollTop: $(target).offset().top - navHeight
    }, 600, "swing", function() {
            location.hash = target; //attach the hash (#jumptarget) to the pageurl
    });

    $('.mobile-jump-nav .mobile-jump-links>div').show();

    $('.mobile-jump-nav .toggle').html('<div>' + $(this).text() + '  <img src="./assets/images/global/arrow-down-black.svg" alt=""></div>');
    $(this).parent('div').hide();
    $('.mobile-jump-nav .mobile-jump-links-overview').show();
    $('.mobile-jump-nav .toggle').removeClass('arrow-turn');
    $('.mobile-jump-nav .inner').removeClass('show');
    $('.mobile-jump-nav .inner').hide();
    
});

$('.mobile-jump-nav .mobile-jump-links-overview').click(function(e) {
    $('.mobile-jump-nav .mobile-jump-links-overview').hide();

});




$(function() {
    $('a[data-modal]').on('click', function() {
        $($(this).data('modal')).modal({
        fadeDuration: 250
    });
        return false;
    });
});


$(".back-to-top").click(function() {
    $('html, body').stop().animate({
            scrollTop: 0
    }, 600, "swing");
});
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
$(document).ready(function() {


    $('body').on('click', '.jump-nav a', function(e) {
            e.preventDefault(); // prevent hard jump, the default behavior

            var navHeight = 100 + $('.jump-nav').outerHeight() - 2;
            if ( $(window).width() < 992 )
              navHeight = 100 + $('.mobile-jump-nav').outerHeight();

            var target = $(this).attr("href"); // Set the target as variable

            // perform animated scrolling by getting top-position of target-element and set it as scroll target
            $('html, body').stop().animate({
                    scrollTop: $(target).offset().top - navHeight
            }, 600, "swing", function() {
                    location.hash = target; //attach the hash (#jumptarget) to the pageurl
            });

            return false;
    });
});
$(window).on('load', function() {
    if ( window.location.hash )
      var elem = $('#' + window.location.hash.replace('#', ''));
    var navHeight = 100 + $('.jump-nav').outerHeight() - 2;
    if ( $(window).width() < 992 )
      navHeight = 100 + $('.mobile-jump-nav').outerHeight();
    if(elem) {
         //$('html, body').scrollTo(elem.left, elem.top);
         $('html, body').stop().animate({
                  scrollTop: $(elem).offset().top - navHeight
          }, 600, "swing");
    }
  });
$(window).scroll(function() {

    //console.log($(window).scrollTop());

    if ( $(window).scrollTop() > 18 ) $('.tempheader').addClass('fixed');
    else $('.tempheader').removeClass('fixed');

    var navHeight = $('.tempheader').outerHeight() + $('.jump-nav').outerHeight();
    var scrollDistance = $(window).scrollTop() + navHeight;

    // Show/hide menu on scroll
    //if (scrollDistance >= 850) {
    //		$('nav').fadeIn("fast");
    //} else {
    //		$('nav').fadeOut("fast");
    //}

    // Assign active class to nav links while scolling
    $('.page-section').each(function(i) {
      if ($(this).position().top <= scrollDistance) {
        $('.jump-nav a.active').removeClass('active');
        $('.jump-nav a').eq(i).addClass('active');
      }
    });
});

$("div[data-vimeo]").each(function(index) {
  var vimeoURL = $(this).data('vimeo');
  // Endpoint: https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/
  $.getJSON('https://vimeo.com/api/oembed.json?url=' + vimeoURL, {
      format: "json",
      width: "640"
    },
    function(data) {
      $("div[data-vimeo='" + vimeoURL + "']").append('<img src="'+data.thumbnail_url+'" alt="" />');
    });
});