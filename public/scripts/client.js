// Fake data taken from initial-tweets.json
$(document).ready(function() {

  const tweetdata = [{
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const createTweetElement = function(tweetObj) {
    const $tweet = $(`
        <article class="tweet">
          <header>
            <div>
              <img src="${tweetObj.user.avatars}" alt="tweeter-user-icon">
              <p>${tweetObj.user.name}</p>
            </div>
            <p>${tweetObj.user.handle}</p>
          </header>
          <p>${tweetObj.content.text}</p>
          <footer>
            <p>${tweetObj.created_at}</p>
            <p>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </p>
          </footer>
        </article>
    `);
    $('.all-tweets').append($tweet);
    console.log($tweet);
    return $tweet;
 }

  const renderTweets = function(tweetObjArr) {
    // loops through tweets
    createTweetElement(tweetObjArr[1]);
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

  renderTweets(tweetdata);

});