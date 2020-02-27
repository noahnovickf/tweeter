//GETs data from tweets
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
//renders tweets on the page
const renderTweets = function(tweets) {
  $("#tweet-list").empty();
  for (let tweet of tweets) {
    $("#tweet-list").prepend(createTweetElement(tweet));
  }
};
//creates tweet element that sets framework for displayed tweets
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
<span id="share-icon"><i class="fas fa-flag"><i class="fas fa-retweet"></i></i><i class="fas fa-heart"></i></span>
</footer>`;
  $tweet.append(html);
  return $tweet;
};
//protects against malicious tweets altering the HTML
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//everything after this will ocur after the page is loaded
$(document).ready(function() {
  loadTweets();
  //when submit button is hit, checks to see if tweet is valid and posts tweets for loadTweet function to get
  $("#new-tweet").submit(function(event) {
    event.preventDefault();
    if ($("textarea").val().length > 140) {
      $(".error2").text("");
      $(".error1")
        .text("WHY ARE YOU TALKING SO MUCH???")
        .fadeIn(300);
      return;
    } else if ($("textarea").val().length === 0) {
      $(".error1").text("");
      $(".error2")
        .text("WHY SO SHY???")
        .fadeIn(300);
      return;
    } else {
      $(".error2").text("");
      $(".error1").text("");
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
  //toggle new tweet button
  $(".new-button").click(() => {
    $(".new-tweet").slideToggle("slow");
    $(".new-tweet textarea").focus();
  });
});
