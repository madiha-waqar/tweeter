// When DOM loads, it is ready to execute JavaScript code
$(document).ready(() => {

  // Detect any scrolling on windows
  $(window).scroll(function () {

    // Check if the scroll position is greater than 0
    if ($(this).scrollTop() > 0) {
      // If scrolled, hide the 'Write a new tweet' nav element
      $('#right-nav').hide();
      // If scrolled, show the scroll-up button
      $('.scroll-up').show();

    } else {
      // If at the top, show the 'Write a new tweet' nav element
      $('#right-nav').show();
      // If at the top, hide the scroll-up button
      $('.scroll-up').hide();
    }
  });

  // Handle click event for the scroll-up button
  $('.scroll-up').click(() => {
    // Scroll to the top of the page
    $(window).scrollTop(0);
    // Clears the textarea of last input text
    $('.new-tweet textarea').val('');
    // Enable new tweet compose textarea
    $('.new-tweet textarea').focus();
  });
});