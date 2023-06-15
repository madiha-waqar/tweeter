// When DOM loads it is ready to execute JavaScript code
$(document).ready(() => {
  console.log("DOM am ready")

  $('.new-tweet textarea').on('click', function (e) {
    console.log("Text area is clicked")
  })

})  