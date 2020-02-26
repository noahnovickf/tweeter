/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac"
      },
      content: {
        text:
          "If I have seen further it is by standing on the shoulders of giants"
      },
      created_at: 1461116232227
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd"
      },
      content: {
        text: "Je pense , donc je suis"
      },
      created_at: 1461113959088
    }
  ];

  $("#new-tweet").submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: "/tweets/",
      type: "POST",
      data: $("textarea").serialize()
    });
    loadTweets();
  });
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      type: "GET",
      data: "JSON"
    }).then(response => {
      const renderedTweets = renderTweets(response.data);
      return renderedTweets;
    });
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $("#tweet-list").append(createTweetElement(tweet));
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

  renderTweets(data);
});
