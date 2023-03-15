$(document).ready(function () {
  let loginVal = localStorage.getItem('login');
  let admin = localStorage.getItem('isAdmin');

  if (loginVal === 'true' && admin === 'true') {
    $('#testDetailsBtn').click(() => {
      // event.stopImmediatePropagation();
      // event.preventDefault();

      let test_Number = $('#questionNumber').val();
      let test_Topic = $('#topicName').val();
      let test_Seconds = $('#secondsTime').val();
      
      $.post(`http://localhost:3000/tests}`, {
        test_Number: test_Number,
        test_Topic: test_Topic,
        test_Seconds: test_Seconds,
      });
      // setTimeout(() => {
      window.location = 'createTest.html';
      // }, 1000);
    });
  } else {
    window.location = 'Home.html';
  }
});
