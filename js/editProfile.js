$(document).ready(function () {
  let Id = localStorage.getItem('id');
  let userName = localStorage.getItem('name');
  let userEmail = localStorage.getItem('email');
  let isAdmin = localStorage.getItem('isAdmin');
  let login = localStorage.getItem('login');
  function generateOtp() {
    let digits = '0123456789';
    let otpLength = 4;
    let otp = '';
    for (let i = 1; i <= otpLength; i++) {
      let index = Math.floor(Math.random() * digits.length);

      otp = otp + digits[index];
    }
    return otp;
  }
  if (login && isAdmin === 'true') {
    $('#testDetailsHome').show();
    $('#allUser').show();
    $('#giveTest').css({ display: 'none' });
    $('#allResult').show();
  } else {
    $('#testDetailsHome').hide();
    $('#allUser').hide();
    $('#allResult').hide();
    $('#giveTest').css({ display: 'block' });
  }

  if (login) {
    $('#user_email').val(userEmail);
    $('#logout').append().html('<span class="m-1 homwNavLink" >Logout</span>');
    $('#userNavName').html(`<span>${userName}<span>`);
    $('#update-btn').attr('disabled', true);
    $('#user_Name').val(userName);
  } else {
    Toastify({
      text: 'Access Denied',
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
    }, 1000);
  }

  $('#user_email').on('keydown', () => {
    $('#update-btn').attr('disabled', false);
  });
  $('#user_Name').on('keydown', () => {
    $('#update-btn').attr('disabled', false);
  });

  $('#update-btn').on('click', event => {
    event.preventDefault();
    let otpIs = generateOtp();

    let a = $('#user_email').val();
    let user_Email = a.trim();
    let b = $('#user_Name').val();
    let user_Name = b.trim();
    alert(otpIs);
    let promptOtp = prompt('Please enter OTP:');

    if (otpIs === promptOtp) {
      $.ajax({
        url: `http://localhost:3000/users/${Id}`,
        method: 'PATCH',
        data: {
          name: user_Name,
          email: user_Email,
        },
        success: function (data) {
          localStorage.setItem('name', data.name);
          localStorage.setItem('email', data.email);
          localStorage.setItem('password', data.password);

          alert('data updated successfully');
        },
        error: function (xhr, status, error) {
          console.log(xhr.responseText); // log any errors to the console
        },
      });
    } else {
      alert('Incorrect OTP');
      window.location = 'editProfile.html';
    }
  });

  //go to home page

  $('#home-btn').click(() => {
    setTimeout(() => {
      window.location = 'Home.html';
    }, 1000);
  });

  //logout
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
