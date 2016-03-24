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

  function showProject(target) {
    var $project = $(".project-container"),
        $window = $(window),
        windowWidth = $window.width(),
        windowHeight = $window.height();

    $(".projects li").each(function() {
      moveOffscreen($(this), windowWidth, windowHeight);
    });

    $(target).fadeIn(700);
  }

  function resetProjects() {
    $("html, body").animate({ scrollTop: 0 }, 200, "swing", function() {
      $(".project-details").fadeOut(500);

      $(".projects li").each(function () {
        var $this = $(this),
            originalPosition = $this.data('original-position');
        if(originalPosition) {
          $this.show().animate(originalPosition);
        }
      });
    });
  }

  function escProject(e) {
    if(e.keyCode === 27) { // esc
      navigateTo("#projects");
    }
  }

  function switchToAbout() {
    $(".nav-about").fadeOut(500);
    $(".nav-projects").fadeIn(500);
    $(".projects-container").fadeOut(500);
    $(".about-container").fadeIn(500);
    $(document).off("keyup", escProject);
  }

  function switchToProjects() {
    $(".nav-projects").fadeOut(500);
    $(".nav-about").fadeIn(500);
    $(".about-container").fadeOut(500);
    $(".projects-container").fadeIn(500);
    $(document).on("keyup", escProject);
  }

  function navigateTo(newHash, oldHash) {
    console.log(newHash, oldHash);
    var isProject = newHash.indexOf("#project-") === 0;
    if (newHash === "#about") {
      switchToAbout();
    } else if (newHash === "#projects" && oldHash === "#about") {
      switchToProjects();
    } else if (newHash === "#projects") {
      resetProjects();
    } else if (!newHash || newHash === "#") { // Close X
      resetProjects();
    } else if (isProject && oldHash === "#about") {
      switchToProjects();
      showProject(newHash);
    } else if (isProject) {
      showProject(newHash);
    } else {
      console.log("Unknown hash:", newHash, oldHash);
    }
  }

  navigateTo(window.location.hash);

  $(document).on("keyup", escProject);

  $(window).on("hashchange", function(e) {
    var oldHash;
    try {
      oldHash = $("<a>").attr('href', e.originalEvent.oldURL)[0].hash;
    } catch (e) {}
    navigateTo(window.location.hash, oldHash);
  });
});
