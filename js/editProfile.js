$(window).load(() => {
  $(document).ready(function () {
    let Id = localStorage.getItem('id');
    let userName = localStorage.getItem('name');
    let userEmail = localStorage.getItem('email');
    let password = localStorage.getItem('password');
    let login = localStorage.getItem('login');

    if (login) {
      $('#user_email').val(userEmail);

      $('#user_Name').val(userName);
    } else {
      setTimeout(() => {
        window.location = 'Home.html';
      }, 1000);
    }

    $('#update-btn').click(() => {
      let a = $('#user_email').val();
      let user_Email = a + '';
      let b = $('#user_Name').val();
      let user_Name = b + '';
      console.log(user_Email, user_Name);

      console.log(Id);

      $.ajax({
        url: `http://localhost:3000/users/${Id}`,
        method: 'PUT',
        data: {
          name: user_Name,
          email: user_Email,
          password: password,
        },
        success: function (data) {
          localStorage.setItem('name', data.name);
          localStorage.setItem('email', data.email);
          localStorage.setItem('password', data.password);

          console.log('done');
        },
      });
    });
  });
});
