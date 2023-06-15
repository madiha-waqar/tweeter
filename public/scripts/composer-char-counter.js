// When DOM loads it is ready to execute JavaScript code
$(document).ready(() => {
  console.log("DOM is ready")

  $('.new-tweet textarea').on('input', function (e) {

    const numOfChar = $(this).val().length
    const remainingChars = 140 - numOfChar;
    const counter = $(this).parent().siblings().children()[1];
    counter.innerHTML = remainingChars
  })
})  