var $ = $ || {};

$(document).ready(function() {

  function moveOffscreen($el, windowWidth, windowHeight) {
    var top, left, position = $el.position();
    if((position.top + 200) > (windowHeight / 2)) {
      top = (windowHeight + 500) + "px";
    } else {
      top = "-500px";
    }
    if((position.left + 200) > (windowWidth / 2)) {
      left = (windowWidth + 500) + "px";
    } else {
      left = "-500px";
    }
    // TODO hide once offscreen
    $el.animate({ top: top, left: left}, 400, "swing", function() {
      $el.hide();
    });
    $el.data('original-position', position);
  }



  function resetProjects(e) {
    $(".projects li").each(function () {
      var $this = $(this);
      $this.show().animate($this.data('original-position'));
    });
    $(".project-details").fadeOut(500);
  }

  $(document).on("keyup", function(e) {
    if(e.keyCode === 27) { // esc
      resetProjects();
    }
  });

  $(".projects li").on("click", function(e) {
    var $this = $(this),
        top = $this.position().top + 85,
        left = $this.position().left + 140,
        $project = $(".project-container");

    var $window = $(window),
        windowWidth = $window.width(),
        windowHeight = $window.height();

    $(".projects li").each(function() {
      moveOffscreen($(this), windowWidth, windowHeight);
    });

    $($this.data("target")).fadeIn(700);
  });

  $(".project-details-close").on("click", resetProjects);

});
