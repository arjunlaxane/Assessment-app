$(window).load(() => {
  $(document).ready(function () {
    let loginVal = localStorage.getItem('login');
    let admin = localStorage.getItem('isAdmin');

    if (loginVal === 'true' && admin === 'true') {
      $.when($.getJSON('http://localhost:3000/users')).done(result => {
        $('#searchBar').on('keyup', function () {
          var value = $(this).val().toLowerCase();

          let filteredData = [];

          if (value != '') {
            filteredData = result.filter(result => {
              return result.name.toLowerCase().includes(value.toLowerCase());
            });

            displayData(filteredData);
          } else {
            $('#filterData').css({ display: 'none' });
          }
        });

        let displayData = result => {
          let temp = '';

          for (let user of result) {
            temp += user.name + '<br>';

            $('#filterData').append().html(temp);
            // console.log(temp);
          }
        };

        $.each(result, function (index, data) {
          // console.log(index);
          console.log(data.id, data.name, data.email);
          $('<tr>').html(data.id).appendTo('#idTd');
          $('<tr>').html(data.name).appendTo('#nameTd');
          $('<tr>').html(data.email).appendTo('#emailTd');
        });
      });

      // $(window).load(() => {

      let userName = localStorage.getItem('name');

      $('#userNavName').html(`<span>Welcome ${userName}<span>`);

      $('#signup').css({ display: 'none' });
      $('#login').css({ display: 'none' });
      $('#logout')
        .append()
        .html('<span class="m-1 homwNavLink" >Logout</span>');
    } else {
      $('#signup').css({ display: 'block' });
      $('#login').css({ display: 'block' });
      $('#logout').css({ display: 'none' });
      window.location = 'Home.html';
    }
  });
});
