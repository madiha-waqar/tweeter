
// escape function to avoid cross-scripting attacks on 
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweetObj) {
  const $tweet = $(`
        <article class="tweet">
          <header>
            <div>
              <img src="${escape(tweetObj.user.avatars)}" alt="tweeter-user-icon">
              <p>${escape(tweetObj.user.name)}</p>
            </div>
            <p>${escape(tweetObj.user.handle)}</p>
          </header>
          <p>${escape(tweetObj.content.text)}</p>
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
    $('.all-tweets').prepend($tweet); // prepend will add new tweet to the beginning
  }
}

$(document).ready(function () {

  const form = document.querySelector('form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const newTweetText = $(this).find('textarea').val();
    const errorMessage = $('.error-message');

    function displayErrorMessage(message, duration) {
      errorMessage.text(message);
      errorMessage.slideDown(600);
    
      setTimeout(() => {
        errorMessage.slideUp(600);
      }, duration);
    }

    $('.arrow').click(() => {
      $('.new-tweet').slideToggle();
    })
  
    if (!newTweetText) {
      displayErrorMessage('Your tweet must not be empty. What would you like to tweet about today?', 3000);

    } else if (newTweetText.length > 140) {
      displayErrorMessage('Your tweet exceeds the maximum character limit. Please write a tweet of 140 or less characters.', 3000);

    } else {
      const serializedData = $(this).serialize();
      $.post('/tweets', serializedData)
        .then(serializedData => {
          console.log(serializedData);
        })
        .then(loadTweets())
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

});