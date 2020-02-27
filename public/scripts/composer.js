$(document).ready(function() {
  $(document).scroll(function() {
    if ($(document).scrollTop() > 400) {
      $(".topbtn").addClass("show");
      $(".new-button").removeClass("show2");
    }
    if ($(document).scrollTop() < 400) {
      $(".topbtn").removeClass("show");
      $(".new-button").addClass("show2");
    }
  });
  $(".topbtn").click(() => {
    $(document).scrollTop(0);
    $(".new-tweet textarea").focus();
  });
});
