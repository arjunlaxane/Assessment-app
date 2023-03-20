$(document).ready(function () {
  let login = localStorage.getItem('login');

  if (login) {
    window.location = 'Home.html';
    return false;
  }

  $.when($.getJSON('http://localhost:3000/users')).done(result => {
    $('#login-btn').click(function () {
      let email = $('#email').val();
      let password = $('#password').val();

      // event.stopImmediatePropagation();
      event.preventDefault();

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
        return false;
      }

      const findUser = result.find(
        ele => email === ele.email && password === ele.password
      );
      console.log(findUser);

      if (!findUser) {
        Toastify({
          text: 'Invalid Credentials',
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
        return true;
      }

      if (findUser && findUser.isAdmin === 'true') {
        let userName = findUser.name;
        localStorage.setItem('id', findUser.id);
        localStorage.setItem('name', userName);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('login', true);
        localStorage.setItem('isAdmin', true);

        Toastify({
          text: 'Admin Logged in sucessfully',
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
        return true;
      } else if (findUser && findUser.isAdmin === 'false') {
        let userName = findUser.name;
        localStorage.setItem('id', findUser.id);
        localStorage.setItem('name', userName);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('login', true);
        localStorage.setItem('isAdmin', false);

        Toastify({
          text: 'User Logged in sucessfully',
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
        return true;
      }
    });
  });
});
