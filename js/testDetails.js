$(document).ready(function () {
  let loginVal = localStorage.getItem('login');
  let admin = localStorage.getItem('isAdmin');

  if (loginVal === 'true' && admin === 'true') {
    let userName = localStorage.getItem('name');
    $('#userNavName').html(`<span>Welcome ${userName}<span>`);
    $('#logout').append().html('<span class="m-1 homwNavLink" >Logout</span>');

    $('#testDetailsBtn').click(() => {
      // event.stopImmediatePropagation();
      event.preventDefault();

      let test_Topic = $('#topicName').val();
      let test_Seconds = $('#secondsTime').val();
      // console.log(test_Number, test_Topic, test_Seconds);
      let a = [1, 2];
      // $.post(`http://localhost:3000/tests`, {

      // });

      let dataAll = {
        test_Topic: test_Topic,
        test_Seconds: test_Seconds,
      };

      let testDetails = JSON.stringify(dataAll);

      $.ajaxSetup({
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      $.ajax({
        url: 'http://localhost:3000/tests',
        type: 'post',
        data: testDetails,
        dataType: 'json',
        success: function (data) {
          console.info(data);
        },
      });

      // setTimeout(() => {
      window.location = 'createTest.html';
      // }, 1000);
    });
  } else {
    window.location = 'Home.html';
  }

  $('#logout').click(function () {
    localStorage.removeItem('login');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('id');

    setTimeout(() => {
      window.location = 'Home.html';
      $('#logout').css({ display: 'none' });
    }, 1000);
  });
});
