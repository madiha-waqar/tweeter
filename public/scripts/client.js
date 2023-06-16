// Fake data taken from initial-tweets.json
$(document).ready(function () {

  const createTweetElement = function (tweetObj) {
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
            <p>${timeago.format(tweetObj.created_at)}</p>
            <p>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </p>
          </footer>
        </article>
    `);
    return $tweet;
  }

  const renderTweets = function (tweetObjArr) {
    for (const tweet of tweetObjArr) {
      const $tweet = createTweetElement(tweet);
      $('.all-tweets').append($tweet);
    }
  }

  const form = document.querySelector('form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const newTweetText = $(this).find('textarea').val();

    if (!newTweetText) {
      alert('Your tweet must not be empty. What would you like to tweet about today?');

    } else if (newTweetText.length > 140) {
      alert('Your tweet exceeds the maximum character limit of 140!');

    } else {
      const serializedData = $(this).serialize();
      $.post('/tweets', serializedData)
        .then(serializedData => {
          console.log(serializedData);
        })
        .catch(error => {
          console.error(error);
        });
    }
  });

  const loadTweets = () => {
  $.get('/tweets')

    .then(response => {
      console.log(response)
      renderTweets(response);
    })
    .catch(error => {
      console.error(error);
    });
};

loadTweets();

});