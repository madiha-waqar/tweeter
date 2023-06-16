// When DOM loads it is ready to execute JavaScript code
$(document).ready(() => {

  // Character counter updates on text input
  $('.new-tweet textarea').on('input', function (e) {

    // Get character count of input in the textarea
    const numOfChar = $(this).val().length;

    // Get remaining characters count out of 140 allowed characters
    const remainingChars = 140 - numOfChar;

    // Traverse throught the DOM tree to get to counter class
    const charCounter = $(this).parent().siblings().children('.counter');
    charCounter.text(remainingChars);

    // Turn character count red if user's entry goes over allowed character limit
    if (remainingChars < 0) {
      charCounter.addClass('over-limit');

    } else {
      charCounter.removeClass('over-limit');
    }
  })
});