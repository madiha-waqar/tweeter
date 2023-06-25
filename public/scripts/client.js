
// Escape function to avoid cross-scripting attacks on user generated content before renedering in browser
const escape = function (str) {
  // Creating temporary container a HTML div element
  let div = document.createElement("div");
  // Creates a new text node and appends the text str inside the div element
  div.appendChild(document.createTextNode(str));
  // Return HTML content of div, ensuring that any special characters in the original string are escaped and represented correctly in HTML format
  return div.innerHTML;
};

// Create a new jQuery object representing an HTML article element with class "tweet"
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

// Render all tweets by adding them to the DOM in reverse order (newest first).
const renderTweets = function (tweetObjArr) {
  for (const tweet of tweetObjArr) {
    const $tweet = createTweetElement(tweet);
    // Prepend will add new tweet to the beginning
    $('.all-tweets').prepend($tweet);
  }
}

// When DOM loads, it is ready to execute JavaScript code
$(document).ready(function () {

  const form = document.querySelector('form');
  // Add an event listener to the form's submit event
  form.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the text entered in the textarea of the form
    const newTweetText = $(this).find('textarea').val();
    // Select the element for displaying error messages
    const errorMessage = $('.error-message');

    // Function to display an error message for a specified duration
    function displayErrorMessage(message, duration) {
      // Set the error message text
      errorMessage.text(message);
      // Display the error message element
      errorMessage.slideDown(600);
      // Slide up the error message after the specified duration
      setTimeout(() => {
        errorMessage.slideUp(600);
      }, duration);
    }

    //STRETCH ACTIVITY: jQuery function to toggle whole new-tweet section up or down when the button is clicked
    $('.arrow').click(() => {
      $('.new-tweet').slideToggle();
    })

    // Validation checks on the tweet text
    if (!newTweetText) {
      displayErrorMessage('Your tweet must not be empty. What would you like to tweet about today?', 3000);

    } else if (newTweetText.length > 140) {
      displayErrorMessage('Your tweet exceeds the maximum character limit. Please write a tweet of 140 or less characters.', 3000);

    } else {

      // If there are no validation errors, serialize the form data
      const serializedData = $(this).serialize();
      // Send a POST request to the server with the serialized form data to save the tweet
      $.post('/tweets', serializedData)
        // When the POST request is successful
        .then(serializedData => {
          // Log the returned serialized data to the console
          console.log(serializedData);
        })
        // After the successful POST request, load the updated tweets
        .then(loadTweets())
        // If any error occurs during the POST request
        .catch(error => {
          // Log the error to the console
          console.error(error);
        });
    }
    // Clears out text area after successful loading of tweet
    $('.new-tweet textarea').val('');
  });


  // Load tweets from the server
  const loadTweets = () => {
    // Send a GET request to the server to fetch tweets
    $.get('/tweets')
      // When the GET request is successful
      .then(response => {
        // Render the fetched tweets on the page
        renderTweets(response);
      })
      .catch(error => {
        // Log the error to the console
        console.error(error);
      });
  };

});