var $ = $ || {};

$(document).ready(function() {

  function showProject(target) {
    var $project = $(".project-container"),
        $window = $(window),
        windowWidth = $window.width(),
        windowHeight = $window.height();

    $(".projects li").fadeOut(500);
    $(target).fadeIn(500);
  }

  function resetProjects() {
    var scrollTime;

    if(document.body.scrollTop === 0) {
      scrollTime = 0;
    } else if(document.body.scrollTop < 100) {
      scrollTime = 100;
    } else {
      scrollTime = document.body.scrollTop / 10;
    }

    $("html, body").animate({ scrollTop: 0 }, scrollTime, "swing", function() {
      $(".project-details").fadeOut(500);

      $(".projects li").fadeIn(500);
    });
  }

  function escProject(e) {
    if(e.keyCode === 27) { // esc
      window.location.hash = "#projects";
    }
  }

  function switchToAbout() {
    $(".projects-container").fadeOut(500);
    $(".about-container").fadeIn(500);

    $(".nav-about").fadeOut(500);
    $(".nav-projects").fadeIn(500);

    $(document).off("keyup", escProject);
  }

  function switchToProjects() {
    $(".about-container").fadeOut(500);
    $(".projects-container").fadeIn(500);

    $(".nav-projects").fadeOut(500);
    $(".nav-about").fadeIn(500);

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

  function fixX() {
    var $body = $("body");
    if ($body[0].scrollTop > 215) {
      $body.addClass("fixed");
    } else {
      $body.removeClass("fixed");
    }
  }

  navigateTo(window.location.hash);
  fixX();

  $(document).on("keyup", escProject);

  $(window).on("hashchange", function(e) {
    var oldHash;
    try {
      oldHash = $("<a>").attr('href', e.originalEvent.oldURL)[0].hash;
    } catch (e) {}
    navigateTo(window.location.hash, oldHash);
  });

  $(document).on("scroll", fixX);
});
