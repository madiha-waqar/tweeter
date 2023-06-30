// Create a new jQuery object representing an HTML article element with class "tweet"
const createTweetElement = function (tweetObj) {
  // Escape user-generated content to avoid cross-scripting attacks before inserting it into the HTML template
  const safeText = $("<div>").text(tweetObj.content.text).html();
  const $tweet = $(`
        <article class="tweet">
          <header>
            <div>
              <img src="${(tweetObj.user.avatars)}" alt="tweeter-user-icon">
              <p>${(tweetObj.user.name)}</p>
            </div>
            <p>${(tweetObj.user.handle)}</p>
          </header>
          <p>${safeText}</p>
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
  // Clears the tweet container before appending newly created tweets to prevent duplication
  $(".all-tweets").empty();
  
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

    // Get the text entered in the textarea of the form. It will remove leading and trailing whitespace from the text
    const newTweetText = $(this).find('textarea').val().trim();
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
    // Clears out text area after successful loading of tweet
    $('.new-tweet textarea').val('');
    // Sets the text of counter back to 140 after successful loading of tweet
    $('.counter').text('140');
  };

  // Load tweets from the server everytime server is started or page loads
  loadTweets();
});