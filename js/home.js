let loginVal = localStorage.getItem('login');
let admin = localStorage.getItem('isAdmin');

$(document).ready(function () {
  $.when($.getJSON('http://localhost:3000/tests')).done(result => {
    let userName = localStorage.getItem('name');

    if (loginVal === 'true' && admin === 'true') {
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
      $('#giveTest').css({ display: 'none' });
      $('#userNavName').html(`<span>${userName}<span>`);
      $('#signup').css({ display: 'none' });
      $('#login').css({ display: 'none' });
      $('#allResult').css({ display: 'block' });
      $('#testHistory').css({ display: 'none' });
      $('#logout')
        .append()
        .html('<span class="m-1 homwNavLink" >Logout</span>');

      $('#allTestsHome').css({ display: 'block' });
      $('#testResultsHome').css({ display: 'block' });
      $('#allUser').css({ display: 'block' });
    } else if (loginVal === 'true' && admin === 'false') {
      $('#userNavName').html(`<span>${userName}<span>`);
      $('#testHistory').css({ display: 'block' });
      $('#allResult').css({ display: 'none' });
      $('#login').css({ display: 'none' });
      $('#signup').css({ display: 'none' });
      $('#giveTest').css({ display: 'block' });
      $('#testDetailsHome').css({ display: 'none' });
      $('#allTestsHome').css({ display: 'none' });
      $('#testResultsHome').css({ display: 'none' });
      $('#allUser').css({ display: 'none' });
      $('#createNewTest').css({ display: 'none' });
      $('#logout')
        .append()
        .html('<span class="m-1 homwNavLink" >Logout</span>');
    } else {
      $('#createNewTest').css({ display: 'none' });
      $('#testHistory').css({ display: 'none' });
      $('#allResult').css({ display: 'none' });
      $('#signup').css({ display: 'block' });
      $('#login').css({ display: 'block' });
      $('#logout').css({ display: 'none' });
      $('#giveTest').css({ display: 'none' });
      $('#testDetailsHome').css({ display: 'none' });
      $('#allTestsHome').css({ display: 'none' });
      $('#allUser').css({ display: 'none' });
      $('#profile').css({ display: 'none' });
    }

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
          // dataType: 'json',
        });
      }
    });
  });

  // logout

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
