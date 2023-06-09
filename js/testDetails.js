$(document).ready(function () {
  let loginVal = localStorage.getItem('login');
  let admin = localStorage.getItem('isAdmin');

  if (loginVal === 'true' && admin === 'true') {
    let userName = localStorage.getItem('name');
    $('#userNavName').html(`<span>${userName}<span>`);
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

      if (test_Topic !== '' && test_Seconds !== '') {
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
          type: 'POST',
          data: testDetails,
          dataType: 'json',
          success: function (data) {
            console.info(data);
            window.location = 'createTest.html';
          },
        });

        // setTimeout(() => {
        // window.location = 'createTest.html';
        // }, 1000);
      } else {
        Toastify({
          text: 'Please enter details correctly',
          duration: 1000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          // stopOnFocus: true,
          style: {
            background: 'background-image:red',
          },
        }).showToast();
        return false;
      }
    });
  } else {
    window.location = 'Home.html';
  }

  $('#logout').click(function () {
    localStorage.clear();

    Toastify({
      text: 'Logout Successfully',
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top',
      position: 'right',
      // stopOnFocus: true,
      style: {
        background: 'red',
      },
    }).showToast();

    setTimeout(() => {
      window.location = 'Home.html';
      $('#logout').css({ display: 'none' });
    }, 1000);
  });
});
