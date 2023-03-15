$(document).ready(function () {
  let name = $('#name').val();
  let email = $('#email').val();
  let password = $('#password').val();
  let userConfirmPassword = $('#confirmPassword').val();

  $.when($.getJSON('http://localhost:3000/users')).done(result => {
    $(result).each(function (i, field) {
      // console.log(field.email);
      $('#btn').click(function () {
        if (email !== field.email) {
          if (
            name === '' ||
            email === '' ||
            password === '' ||
            userConfirmPassword === ''
          ) {
            Toastify({
              text: 'Please enter credentials',
              duration: 1000,
              newWindow: true,
              close: true,
              gravity: 'top',
              position: 'right',
              stopOnFocus: true,
              style: {
                background: 'linear-gradient(to right, #00b09b, #96c93d)',
              },
            }).showToast();

            //  setTimeout(() => {
            //  window.location = 'Home.html';
            //  }, 1000);
          } else if (
            name !== '' &&
            email !== '' &&
            password !== '' &&
            password === userConfirmPassword
          ) {
            $.post('http://localhost:3000/users', {
              name,
              email,
              password,
              isAdmin: false,
            });

            Toastify({
              text: `Registration Success
               Please login again`,
              duration: 1000,
              newWindow: true,
              close: true,
              gravity: 'top',
              position: 'right',
              stopOnFocus: true,
              style: {
                background: 'linear-gradient(to right, #00b09b, #96c93d)',
              },
            }).showToast();

            setTimeout(() => {
              window.location = 'login.html';
            }, 1000);
          } else if (
            name !== '' &&
            email !== '' &&
            password !== '' &&
            password !== userConfirmPassword
          ) {
            Toastify({
              text: `Password doesn't match
               Please try again`,
              duration: 1000,
              newWindow: true,
              close: true,
              gravity: 'top',
              position: 'right',
              stopOnFocus: true,
              style: {
                background: 'linear-gradient(to right, #00b09b, #96c93d)',
              },
            }).showToast();

            setTimeout(() => {
              window.location = 'register.html';
            }, 1000);
          }
        } else {
          Toastify({
            text: 'User Already Exists',
            duration: 1000,
            newWindow: true,
            close: true,
            gravity: 'top',
            position: 'right',
            stopOnFocus: true,
            style: {
              background: 'linear-gradient(to right, #00b09b, #96c93d)',
            },
          }).showToast();
        }
      });
    });
  });
});
