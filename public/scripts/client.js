/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//<script>alert('a')</script>
//const safeHTML = `<main>${escape(textFromUser)}</main>`;

const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    type: "GET",
    data: "JSON",
    success: response => {
      const renderedTweets = renderTweets(response);
      return renderedTweets;
    }
  });
};
const renderTweets = function(tweets) {
  $("#tweet-list").empty();
  for (let tweet of tweets) {
    $("#tweet-list").prepend(createTweetElement(tweet));
  }
};

const createTweetElement = function(tweet) {
  let $tweet = $("<article>").addClass("tweet");
  const html = `<header>
  <div>
  <img src="${tweet.user.avatars}">
<span>${tweet.user.name}</span>
  </div>
<span class="appear">${tweet.user.handle}</span>
</header>
<main>${escape(tweet.content.text)}</main>
<footer>
<span>${Math.round((Date.now() - tweet.created_at) / 86400000)} days ago</span>
<span>share</span>
</footer>`;
  $tweet.append(html);
  return $tweet;
};

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {
  loadTweets();

  $("#new-tweet").submit(function(event) {
    event.preventDefault();
    if ($("textarea").val().length > 140) {
      $(".error").text("WHY ARE YOU TALKING SO MUCH???");
      $(".counter").text(140);
      return;
    } else if ($("textarea").val().length === 0) {
      $(".error").text("WHY SO SHY???");
      return;
    }
    $.ajax({
      url: "/tweets/",
      type: "POST",
      data: $("textarea").serialize(),
      success: function() {
        loadTweets();
        $("textarea").val("");
        $(".counter").text(140);
        $(".error").text("");
      }
    });
  });
  $(".new-button").click(() => {
    $(".new-tweet").slideToggle("slow");
    $(".new-tweet textarea").focus();
  });
});
