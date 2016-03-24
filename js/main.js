var $ = $ || {};

$(document).ready(function() {
  console.debug("Load");

  var showLetterTimeout = null;

  function showLetter($container, word) {
    var letters = word.split(""),
        letter = letters.shift();
    if(showLetterTimeout) clearTimeout(showLetterTimeout);

    $("<span>").hide()
      .text(letter)
      .appendTo($container)
      .fadeIn(120);

    if(letters.length > 0) {
      showLetterTimeout = setTimeout(function() {
        showLetter($container, letters.join(""));
      }, 60);
    }

    return null;
  }

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
    $el.animate({ top: top, left: left});
  }

  $(".projects li").on("click", function(e) {
    var $this = $(this),
        top = $this.position().top + 85,
        left = $this.position().left + 140;
    // $(".active").removeClass("active");
    // $(".projects").addClass("active");
    // $this.addClass("active");
    $project = $(".project-container");

    var $window = $(window),
        windowWidth = $window.width(),
        windowHeight = $window.height();
    $(".projects li").each(function() {
      console.log(this);
      moveOffscreen($(this), windowWidth, windowHeight);
    });
    $($this.data("target")).fadeIn(700);

    // $project
    //   .css("top", top + "px")
    //   .css("left", left + "px")
    //   .text("")
    //   .show();
    // showLetter($project, $this.data("name"));
  });

  $(".project-details-close").on("click", function(e) {
    $(".projects li")
      .css("top", "")
      .css("left", "");
    $(".project-details").fadeOut(500);
  });

});
