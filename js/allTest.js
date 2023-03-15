// $(window).load(() => {
//   $(document).ready(function () {
//     $.when($.getJSON('http://localhost:3000/tests')).done(result => {
//       $('#TestsearchBar').on('keyup', function () {
//         var value = $(this).val().toLowerCase();
//         let testsArr = Object.values(result);

//         let filteredData = [];

//         if (value != '') {
//           filteredData = testsArr.filter(result => {
//             let arr = Object.keys(result);
//             return arr[1].toLowerCase().includes(value.toLowerCase());
//           });

//           displayData(filteredData);
//         } else {
//           $('#TestfilterData').css({ display: 'none' });
//         }
//       });

//       let displayData = result => {
//         let temp = '';
//         // console.log(result);
//         for (let user of result) {
//           let arr1 = Object.keys(user);

//           temp += arr1[1] + '<br>';
//           $('#TestfilterData').append().html(temp);
//         }
//       };

//       $.each(result, function (index, data) {
//         let arr2 = Object.keys(data);
//         // console.log(arr2[1]);
//         $('<tr>')
//           .html(index + 1)
//           .appendTo('#idTd');
//         $('<tr>').html(arr2[1]).appendTo('#emailTd');
//       });
//     });
//     let loginVal = localStorage.getItem('login');

//     if (loginVal === 'true') {
//       // $(window).load(() => {

//       let userName = localStorage.getItem('name');

//       $('#userNavName').html(`<span>Welcome ${userName}<span>`);

//       $('#signup').css({ display: 'none' });
//       $('#login').css({ display: 'none' });
//       $('#logout')
//         .append()
//         .html('<span class="m-1 homwNavLink" >Logout</span>');
//     } else {
//       $('#signup').css({ display: 'block' });
//       $('#login').css({ display: 'block' });
//       $('#logout').css({ display: 'none' });
//     }
//   });
// });

//------------------------------------------

$(window).load(() => {
  $(document).ready(function () {
    let loginVal = localStorage.getItem('login');
    let admin = localStorage.getItem('isAdmin');

    if (loginVal === 'true' && admin === 'true') {
      $.when($.getJSON('http://localhost:3000/tests')).done(result => {
        $('#TestsearchBar').on('keyup', function () {
          var value = $(this).val().toLowerCase();

          let filteredData = [];

          if (value != '') {
            console.log(result);

            filteredData = result.filter(result => {
              return result.name.toLowerCase().includes(value.toLowerCase());
            });

            displayData(filteredData);
          } else {
            $('#TestfilterData').css({ display: 'none' });
          }
        });

        let displayData = result => {
          let temp = '';

          for (let user of result) {
            temp += user.name + '<br>';

            $('#TestfilterData').append().html(temp);
            // console.log(temp);
          }
        };

        $.each(result, function (index, data) {
          console.log(data);
          // console.log(data.id, data.name, data.email);
          // $('<tr>').html(data.id).appendTo('#idTd');
          // $('<tr>').html(data.name).appendTo('#nameTd');
          // $('<tr>').html(data.email).appendTo('#emailTd');
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
