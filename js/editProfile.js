$(window).load(() => {
  $(document).ready(function () {
    let Id = localStorage.getItem('id');
    let userName = localStorage.getItem('name');
    let userEmail = localStorage.getItem('email');

    let login = localStorage.getItem('login');

    if (login) {
      $('#user_email').val(userEmail);
      $('#logout')
        .append()
        .html('<span class="m-1 homwNavLink" >Logout</span>');
      $('#userNavName').html(`<span>Welcome ${userName}<span>`);

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

          console.log('done');
        },
      });
    });

    //logout
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
});
