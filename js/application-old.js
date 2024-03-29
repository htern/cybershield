
// on document ready
$(document).ready(function() {

    var $window = $(window)
    var $body   = $(document.body)

    var navHeight = $('.navbar').outerHeight(true) + 10

    $body.scrollspy({
      target: '.bs-sidebar',
      offset: navHeight
    })

    $window.on('load', function () {
      $body.scrollspy('refresh')
    })

    $('.bs-docs-container [href=#]').click(function (e) {
      e.preventDefault()
    })

    // back to top
    setTimeout(function () {
      var $sideBar = $('.bs-sidebar')

      $sideBar.affix({
        offset: {
          top: function () {
            var offsetTop      = $sideBar.offset().top
            var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10)
            var navOuterHeight = $('.bs-docs-nav').height()

            return (this.top = offsetTop - navOuterHeight - sideBarMargin)
          }
        , bottom: function () {
            return (this.bottom = $('.bs-footer').outerHeight(true))
          }
        }
      })
    }, 100)

    setTimeout(function () {
      $('.bs-top').affix()
    }, 100)

 

    // disable the link, use backbone instead
    $(".xnavbar a").click(function() {
        var pagetoget = $(this).attr("nextpage");
        /* document.write(pagetoget); */
        $("#mainTabs").load('templates/'+pagetoget);
    });

    function showOrHide() {
      var div = document.getElementById("showOrHideDiv");
      if (div.style.display == "block") {
          div.style.display = "none";
      }
      else {
          div.style.display = "block";
      }
    } 

});

