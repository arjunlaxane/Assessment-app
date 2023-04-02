$(document).ready(function () {
  let login = localStorage.getItem('login');
  let isAdmin = localStorage.getItem('isAdmin');

  if (login && isAdmin === 'true') {
    $.when($.getJSON('http://localhost:3000/testRequest')).done(result => {
      if (result.length === 0) {
        $('#testRequestTable').hide();
        $('#searchBar').hide();
        $('#requestContainer').before().html('Currently, No Requests').css({
          'text-align': 'center',
          'font-size': '2vmax',
          color: 'green',
          'font-weight': 500,
        });
        $('#main-div-testRequestHome').show();
      } else {
        $('#main-div-testRequestHome').hide();
      }
      // let login = localStorage.getItem('login');
      // let isAdmin = localStorage.getItem('isAdmin');
      // let userName = localStorage.getItem('name');

      $('#searchBar').on('keyup', function () {
        var value = $(this).val().toLowerCase();

        $('table tbody tr').filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);

          // console.log($(this).text().toLowerCase().indexOf(value));
        });
      });

      //test request logic

      const findTestRequest = result.filter(ele => +ele.testCount === 1);

      $.each(findTestRequest, function (index, ele) {
        console.log(findTestRequest);
        $('#myTable').append(`
      <tr>
              <td>${index + 1}</td>

          <td>${ele.name}</td>
          <td>${ele.email}</td>

         <td><button class="btn btn-danger"  id="reject${
           ele.id
         }">Reject</button>
         <button class="btn btn-success ml-2"  id="approve${
           ele.id
         }">Approve</button>
         </td>

          </tr>`);
        if (ele.isReject === 'true') {
          $(`#reject${ele.id}`).attr('disabled', true);
          $(`#approve${ele.id}`).hide();
        } else {
          $(`#approve${ele.id}`).show();

          $(`#reject${ele.id}`).click(() => {
            $.ajax({
              url: `http://localhost:3000/testRequest/${ele.id}`,
              method: 'PATCH',
              data: {
                isReject: 'true',
              },
              success: function (data) {
                alert('Test Request rejected');
              },
              error: function (xhr, status, error) {
                console.log(xhr.responseText); // log any errors to the console
              },
            });
          });
        }

        if (ele.isApprove === 'true') {
          $(`#approve${ele.id}`).attr('disabled', true);
          $(`#reject${ele.id}`).hide();
        } else {
          $(`#approve${ele.id}`).click(() => {
            $.ajax({
              url: `http://localhost:3000/testRequest/${ele.id}`,
              method: 'PATCH',
              data: {
                isApprove: 'true',
              },
              success: function (data) {
                alert('Test Request accepted');
              },
              error: function (xhr, status, error) {
                console.log(xhr.responseText); // log any errors to the console
              },
            });

            //changing users testCount to 0

            $.ajax({
              url: `http://localhost:3000/users/${ele.id}`,
              method: 'PATCH',
              data: {
                testCount: 0,
              },

              error: function (xhr, status, error) {
                console.log(xhr.responseText); // log any errors to the console
              },
            });
          });
        }
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
});
