$(document).ready(function () {
  // $.when($.getJSON('http://localhost:3000/result')).done(result => {
  let login = localStorage.getItem('login');
  let isAdmin = localStorage.getItem('isAdmin');
  let userName = localStorage.getItem('name');

  if (login && isAdmin === 'true') {
    // if (result.length > 0) {
    //   $('#createNewTest').css({ display: 'block' });
    // } else {
    //   $('#createNewTest').css({ display: 'none' });
    // }

    // if (result.length === 0) {
    //   $('#testDetailsHome').css({ display: 'block' });
    // } else {
    //   $('#testDetailsHome').css({ display: 'none' });
    // }

    $('#userNavName').html(`<span>${userName}<span>`);
    $('#logout').append().html('<span class="m-1 homwNavLink" >Logout</span>');

    $.ajax({
      url: 'http://localhost:3000/result',
      type: 'GET',
      success: function (data) {
        if (data.length === 0) {
          $('#testSearchBar').hide();
          $('#resultContainer').hide();

          $('#result-searchDiv')
            .after()
            .html('Currently, No Result available')
            .css({
              'text-align': 'center',
              'font-size': '2vmax',
              color: 'green',
              'font-weight': 500,
            });
        } else {
          $.each(data, function (index, ele) {
            $('#myTestTable').append(`
    <tr>
            <td>${ele.id}</td>

        <td>${ele.name}</td>
        <td>${ele.email}</td>
        
   
         <td><button class="btn btn-success"  id="download${ele.id}">Download</button></td>
                  
        </tr>`);

            $(`#download${ele.id}`).click(() => {
              let ID = ele.id;

              download(ID);
            });
          });

          function download(k) {
            fetch(`http://localhost:3000/result/${k}`)
              .then(response => response.json())
              .then(data => {
                // const jsonData = JSON.stringify(data);
                // console.log(jsonData.name);
                const data1 = `            
            Progress Report
            
            Name : ${data.name}

            Email : ${data.email}

            Your Score : ${data.score}

            Total Marks : ${data.total}

             Performance: ${
               data.score === data.total
                 ? 'Excellent'
                 : data.score < data.total / 2
                 ? 'Improvement Needed'
                 : 'Good'
             }`;
                const blob = new Blob([data1], { type: 'text/plain' });
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.addEventListener('loadend', () => {
                  const downloadLink = document.createElement('a');
                  downloadLink.href = reader.result;
                  downloadLink.download = 'Result.txt';
                  downloadLink.click();
                });
              });
          }

          $('#testSearchBar').on('keyup', function () {
            var value = $(this).val().toLowerCase();

            $('table tbody tr').filter(function () {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);

              // console.log($(this).text().toLowerCase().indexOf(value));
            });
          });
        }
      },
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
// });
