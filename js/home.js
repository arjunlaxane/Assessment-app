let loginVal = localStorage.getItem('login');
let admin = localStorage.getItem('isAdmin');

$(document).ready(function () {
  let userName = localStorage.getItem('name');

  if (loginVal === 'true' && admin === 'true') {
    $('#userNavName').html(`<span>Welcome ${userName}<span>`);
    $('#signup').css({ display: 'none' });
    $('#login').css({ display: 'none' });
    $('#logout').append().html('<span class="m-1 homwNavLink" >Logout</span>');
    // $('#giveTest').css({ display: 'none' });
    $('#testDetailsHome').css({ display: 'block' });
    $('#allTestsHome').css({ display: 'block' });
    $('#testResultsHome').css({ display: 'block' });
    $('#allUser').css({ display: 'block' });
  } else if (loginVal === 'true' && admin === 'false') {
    $('#userNavName').html(`<span>Welcome ${userName}<span>`);
    $('#login').css({ display: 'none' });
    $('#signup').css({ display: 'none' });
    $('#giveTest').css({ display: 'block' });
    $('#testDetailsHome').css({ display: 'none' });
    $('#allTestsHome').css({ display: 'none' });
    $('#testResultsHome').css({ display: 'none' });
    $('#allUser').css({ display: 'none' });
    $('#logout').append().html('<span class="m-1 homwNavLink" >Logout</span>');
  } else {
    $('#signup').css({ display: 'block' });
    $('#login').css({ display: 'block' });
    $('#logout').css({ display: 'none' });
    $('#giveTest').css({ display: 'none' });
    $('#testDetailsHome').css({ display: 'none' });
    $('#allTestsHome').css({ display: 'none' });
    $('#allUser').css({ display: 'none' });
  }
});

// logout
$(document).ready(function () {
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
