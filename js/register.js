$(document).ready(function () {
  let login = localStorage.getItem('login');

  if (login) {
    window.location = 'Home.html';
    return false;
  }

  $.when($.getJSON('http://localhost:3000/users')).done(result => {
    $('#btn').click(function () {
      let name = $('#name').val();
      let email = $('#email').val();
      let password = $('#password').val();

      let userConfirmPassword = $('#confirmPassword').val();
      const isUser = result.find(ele => email === ele.email);
      if (password !== '' && name !== '' && email !== '' && password !== '') {
        if (password.length <= 9) {
          Toastify({
            text: `Password should be at least 9 characters`,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: 'top',
            position: 'right',
            stopOnFocus: true,
            style: {
              background: 'linear-gradient(to right, #00b09b, #96c93d)',
            },
          }).showToast();
          return false;
        }
      }
      if (password !== userConfirmPassword) {
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
        return false;
      }

      if (!isUser) {
        if (
          name !== '' &&
          email !== '' &&
          password !== '' &&
          password === userConfirmPassword
        ) {
          event.stopImmediatePropagation();
          $.post('http://localhost:3000/users', {
            name,
            email,
            password,
            isAdmin: false,
            testCount: 0,
          });

          Toastify({
            text: `Registration Successful
                      Please login`,
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
          }, 2000);
        } else {
          Toastify({
            text: `Invalid Credentials
                      Please try again`,
            duration: 3000,
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
          text: `User already exists`,
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
    });
  });
});
