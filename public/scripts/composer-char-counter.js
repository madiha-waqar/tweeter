// When DOM loads it is ready to execute JavaScript code
$(document).ready(() => {
  console.log("DOM is ready")

  $('.new-tweet textarea').on('input', function (e) {
    
    const numOfChar = $(this).val().length
    console.log(numOfChar);
    const remainingChars = 140 - numOfChar;
    console.log(remainingChars);
  })
})  