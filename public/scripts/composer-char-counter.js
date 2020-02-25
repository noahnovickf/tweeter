$(document).ready(function() {
  const max = 140;
  $("textarea").keyup(function() {
    const count = $(this).val().length;
    const remaining = max - count;
    $(this)
      .siblings(".counter")
      .text(remaining);
    if (remaining < 0) {
      $(this)
        .siblings(".counter")
        .addClass("red-font");
    } else
      $(this)
        .siblings(".counter")
        .removeClass("red-font");
  });
});
