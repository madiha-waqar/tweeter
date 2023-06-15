// When DOM loads it is ready to execute JavaScript code
$(document).ready(() => {
  console.log("DOM is ready")

  $('.new-tweet textarea').on('input', function (e) {

    const numOfChar = $(this).val().length
    console.log(numOfChar);
    const remainingChars = 140 - numOfChar;
    console.log(remainingChars);

    const counter = $(this).parent().siblings().children()[1];
    console.log(counter);

    console.log(counter.innerHTML);
    counter.innerHTML = remainingChars
    /*console.log(counter.innerHTML.remainingChars);*/
    /*console.log(counter.text.remainingChars);*/

  })
})  