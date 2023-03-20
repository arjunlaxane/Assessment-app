$(document).ready(function () {
  let login = localStorage.getItem('login');
  let isAdmin = localStorage.getItem('isAdmin');
  let userName = localStorage.getItem('name');

  if (login && isAdmin === 'true') {
    $('#userNavName').html(`<span>Welcome ${userName}<span>`);
    $('#logout').append().html('<span class="m-1 homwNavLink" >Logout</span>');

    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'GET',
      success: function (data) {
        window.localStorage.setItem('user', JSON.stringify(data));
      },
    });

    var details = window.localStorage.getItem('user');

    var parsedDetails = JSON.parse(details);

    $.each(parsedDetails, function (index, ele) {
      $('#myTable').append(`
    <tr>
            <td>${ele.id}</td>

        <td>${ele.name}</td>
        <td>${ele.email}</td>
        <td><button class="btn btn-primary" id="deleteUser${ele.id}">Delete</button></td>
            
        </tr>`);

      $(`#deleteUser${ele.id}`).click(() => {
        $.ajax({
          url: `http://localhost:3000/users/${ele.id}`,
          type: 'DELETE',
          success: function (data) {
            // console.log('done');
            // setTimeout(() => {
            window.location = 'Home.html';
            // }, 1000);
          },
        });
      });
    });

    $('#searchBar').on('keyup', function () {
      var value = $(this).val().toLowerCase();
      $('table tbody tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
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
        background: 'background-image:red',
      },
    }).showToast();

    setTimeout(() => {
      window.location = 'Home.html';
    }, 1000);
  }

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
