// When DOM loads it is ready to execute JavaScript code
$(document).ready(() => {
  console.log("DOM is ready")

  $('.new-tweet textarea').on('input', function (e) {

    const numOfChar = $(this).val().length
    const remainingChars = 140 - numOfChar;

    const charCounter = $(this).parent().siblings().children('.counter');
    charCounter.text(remainingChars);

    if (remainingChars < 0) {
      charCounter.addClass('over-limit');

    } else {
      charCounter.removeClass('over-limit');
    }
  })
});