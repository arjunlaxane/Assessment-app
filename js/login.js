$(document).ready(function () {
  $.when($.getJSON('http://localhost:3000/users')).done(result => {
    // console.log(result);

    $(result).each(function (i, field) {
      // console.log(field);

      $('#login-btn').click(function () {
        // event.stopImmediatePropagation();
        event.preventDefault();
        let email = $('#email').val();
        let password = $('#password').val();

        if (email === '' || password === '') {
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
        } else if (
          field.email === email &&
          field.password === password &&
          field.isAdmin === true
        ) {
          let userName = field.name;

          localStorage.setItem('id', field.id);
          localStorage.setItem('name', userName);
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          localStorage.setItem('login', true);
          localStorage.setItem('isAdmin', true);

          Toastify({
            text: 'Logged in sucessfully',
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
            window.location = 'Home.html';
          }, 1000);
        } else if (
          field.email === email &&
          field.password === password &&
          field.isAdmin === false
        ) {
          let userName = field.name;
          localStorage.setItem('id', field.id);
          localStorage.setItem('name', userName);
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          localStorage.setItem('login', true);
          localStorage.setItem('isAdmin', false);

          Toastify({
            text: 'Logged in sucessfully',
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
            window.location = 'Home.html';
          }, 1000);
        } else {
          Toastify({
            text: 'Incorrect Credentials',
            duration: 1000,
            newWindow: true,
            close: true,
            gravity: 'top',
            position: 'right',
            stopOnFocus: true,
            style: {
              background: 'brown',
            },
          }).showToast();

          setTimeout(() => {
            window.location = 'login.html';
          }, 1000);
        }
      });
    });
  });
});
