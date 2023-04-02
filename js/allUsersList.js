$(document).ready(function () {
  let login = localStorage.getItem('login');
  let isAdmin = localStorage.getItem('isAdmin');
  let userName = localStorage.getItem('name');
  $.when($.getJSON('http://localhost:3000/tests')).done(result => {
    if (login && isAdmin === 'true') {
      if (result.length > 0) {
        $('#createNewTest').css({ display: 'block' });
      } else {
        $('#createNewTest').css({ display: 'none' });
      }

      if (result.length === 0) {
        $('#testDetailsHome').css({ display: 'block' });
      } else {
        $('#testDetailsHome').css({ display: 'none' });
      }
      $('#allResult').css({ display: 'block' });
      $('#userNavName').html(`<span>${userName}<span>`);
      $('#logout')
        .append()
        .html('<span class="m-1 homwNavLink" >Logout</span>');

      $.ajax({
        url: 'http://localhost:3000/users',
        type: 'GET',
        success: function (data) {
          $.each(data, function (index, ele) {
            $('#myTable').append(`
    <tr>
            <td>${ele.id}</td>

        <td>${ele.name}</td>
        <td>${ele.email}</td>

    
            
        </tr>`);
          });

          $('#searchBar').on('keyup', function () {
            var value = $(this).val().toLowerCase();

            $('table tbody tr').filter(function () {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
          });
        },
      });

      $('#createNewTest').click(() => {
        $('#testDetailsHome').show();

        let ans = result.filter(ele => ele.id >= 1);

        // $.ajaxSetup({
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Accept: 'application/json',
        //   },
        // });
        for (let i = 1; i <= ans.length; i++) {
          $.ajax({
            url: `http://localhost:3000/tests/${i}`,
            type: 'DELETE',
            dataType: 'json',
          });
        }
      });
    } else {
      $('#allResult').css({ display: 'none' });
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
});
