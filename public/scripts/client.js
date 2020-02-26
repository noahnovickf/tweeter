/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
<main>${tweet.content.text}</main>
<footer>
<span>${Math.round((Date.now() - tweet.created_at) / 86400000)} days ago</span>
<span>share</span>
</footer>`;
  $tweet.append(html);
  return $tweet;
};

$(document).ready(function() {
  loadTweets();
  $("#new-tweet").submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: "/tweets/",
      type: "POST",
      data: $("textarea").serialize(),
      success: function() {
        loadTweets();
        $("textarea").val("");
        $(".counter").text(140);
      }
    });
  });
});
