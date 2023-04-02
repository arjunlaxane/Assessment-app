$(document).ready(function () {
  let loginVal = localStorage.getItem('login');
  let isAdmin = localStorage.getItem('isAdmin');
  let userEmail = localStorage.getItem('email');

  $('#quizHomebtn').click(() => {
    window.location = 'Home.html';
  });

  if (loginVal === 'true' && isAdmin === 'false') {
    $('#allResult').css({ display: 'none' });
    $('#testDetailsHome').hide();
    $('#allUser').hide();
    $('#createNewTest').hide();
  }

  if (loginVal === 'true' && isAdmin === 'false') {
    let userName = localStorage.getItem('name');
    let email = localStorage.getItem('email');

    $.when($.getJSON('http://localhost:3000/users')).done(result => {
      let firstAttempt = result.find(ele => ele.email === userEmail);
      $('#quizHomebtn').text('Home').css({
        'font-size': '1vmax',
        'font-weight': 500,
      });
      if (firstAttempt.testCount === '0') {
        $('#Quizbtn').text(' Start the quiz').css({
          'font-size': '1.4vmax',
          color: '#f1ecf0',
          'font-weight': 500,
        });
        $('#bestLuck').text('All the best').css({
          'font-size': '2vmax',
          color: '#c20cac',
          'font-weight': 500,
        });
      } else {
        $('#bestLuck')
          .html(
            'Unauthorized Access, Please contact admin <span id="userTestRequest">Click here to send Request</span>'
          )
          .css({
            'font-size': '1.5vmax',
            color: '#ef0324',
            'font-weight': 400,
          });

        $('#userTestRequest').css({
          'font-size': '1vmax',
          color: '#4126ad',
          cursor: 'pointer',
          'margin-left': '0.5vmax',
        });
        $('#Quizbtn').text('Start the quiz').css({
          'font-size': '1.4vmax',
          color: '#f1ecf0',
          'font-weight': 500,
        });

        $('#Quizbtn').attr('disabled', true);
      }

      //send request to admin

      $('#bestLuck').click(() => {
        var stringifiedRequest = JSON.stringify(firstAttempt);
        $.ajaxSetup({
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        $.ajax({
          url: `http://localhost:3000/testRequest`,
          type: 'POST',
          data: stringifiedRequest,
          dataType: 'json',
          success: function (data) {
            window.location = 'Home.html';
          },
        });
      });
    });

    $.when($.getJSON('http://localhost:3000/tests')).done(result => {
      let testData = JSON.stringify(result);
      localStorage.setItem('testData', testData);

      const questionOptions = result.filter(val => val.id >= 2);
      var currentQuestion = 0;
      var score = 0;
      let topic = result[0] ? result[0].test_Topic : ' ';
      let timeRemaining = result[0] ? +result[0].test_Seconds : 10;

      $('#userNavName').html(`<span>${userName}<span>`);
      $('#logout')
        .append()
        .html('<span class="m-1 homwNavLink" >Logout</span>');
      $('#getTestTopic')
        .text(`${topic}`)
        .css({ 'font-size': '3vmax', color: '#2e0edf', 'font-weight': 500 });
      $('#timer ').css({
        'font-size': '2vmax',
        color: 'red',
        'font-weight': 500,
      });
      $('#quiz_head').css({
        'font-size': '2vmax',
        color: 'red',
        'font-weight': 500,
      });
      $('#question').css({
        'font-size': '1.5vmax',
        color: '#e11fa5',
        'font-weight': 500,
      });

      $('#question label').css({
        'font-size': '2vmax',
        color: 'blue',
        'font-weight': 500,
      });

      $('#next').hide();
      $('#timer').hide();
      $('#quiz').hide();

      $('#finish').hide();
      $('#Result').hide();
      $('#showTimer').hide();
      button_manager();

      $('body').keypress(function (e) {
        if (e.which !== '') {
          $.when($.getJSON('http://localhost:3000/users')).done(result => {
            let firstAttempt = result.find(ele => ele.email === userEmail);

            $.ajax({
              url: `http://localhost:3000/users/${firstAttempt.id}`,
              method: 'PATCH',
              data: {
                testCount: 0,
              },

              error: function (xhr, status, error) {
                console.log(xhr.responseText); // log any errors to the console
              },
            });
          });
          window.location = 'Home.html';
        }
        return false;
      });

      document.addEventListener('keydown', function (event) {
        if (event.which === 27) {
          //Esc key was pressed
          $.when($.getJSON('http://localhost:3000/users')).done(result => {
            let firstAttempt = result.find(ele => ele.email === userEmail);

            $.ajax({
              url: `http://localhost:3000/users/${firstAttempt.id}`,
              method: 'PATCH',
              data: {
                testCount: 1,
              },

              error: function (xhr, status, error) {
                console.log(xhr.responseText); // log any errors to the console
              },
            });
          });
          window.location = 'Home.html';
        }
        return false;
      });
      //button manager

      function button_manager() {
        if (currentQuestion > 0) {
          $('#prev').show();

          if (currentQuestion === questionOptions.length - 1) {
            $('#next').hide();
            $('#finish').show();
          } else {
            $('#next').show();
            $('#finish').hide();
          }
        } else {
          $('#prev').hide();
        }
      }

      $('#Quizbtn').click(function () {
        $('#timer').show();
        $('#all_options').show();
        $('#quiz').show();

        // display first question
        displayQuestion(currentQuestion);

        $('.start_page').hide();
        $('#prev').hide();
        $('#next').show();
        var selectedAnswer = $("input[name='answer']:checked").val();

        checkAnswer('hh', selectedAnswer);
        // var a= $("")

        // start timer
        var timer = setInterval(function () {
          timeRemaining--;
          if (timeRemaining <= 0) {
            clearInterval(timer);
            finishQuiz();
          } else {
            $('#timer').text(formatTime(timeRemaining));
          }
        }, 1000);
      });

      // handle next button click
      $('#next').on('click', function () {
        var selectedAnswer = $("input[name='answer']:checked").val();
        if (selectedAnswer) {
          checkAnswer(selectedAnswer);
          currentQuestion++;
          $('#prev').show();
          button_manager();

          if (currentQuestion <= questionOptions.length) {
            displayQuestion(currentQuestion);
          } else {
            finishQuiz();
          }
        }
      });
      // previous questions

      $('#prev').click(function () {
        currentQuestion--;
        if (score > 0) {
          score = score - 1;
        }

        displayQuestion(currentQuestion);
        button_manager();
      });
      // handle finish button click

      $('#finish').on('click', function () {
        $.when($.getJSON('http://localhost:3000/users')).done(result => {
          let firstAttempt = result.find(ele => ele.email === userEmail);

          let data = { testCount: '1' };
          $.ajax({
            url: `http://localhost:3000/users/${firstAttempt.id}`,
            method: 'PATCH',

            data: JSON.stringify(data),

            success: function (data) {
              // alert(JSON.stringify(data));
            },

            error: function (xhr, status, error) {
              console.log(xhr.responseText); // log any errors to the console
            },
          });
        });

        finishQuiz();
      });
      var userAnswers = [];
      // display question and options
      function displayQuestion(q) {
        var question = questionOptions[q].question;
        var options = questionOptions[q].answers;

        var htmlQ = '<div><h2>' + question + '</h2></div>';
        var htmlOptions = '';
        for (var i = 0; i < options.length; i++) {
          if (options[i].option != 'Option not added') {
            htmlOptions +=
              `<div><label for="label-${i}"  value="${options[i].option}" id="labelID-${i}"> ${options[i].option} </label> ` +
              `<input type='radio'  name='answer' value='${options[i].correct}' id="label-${i}"/></div>`;
          }
        }

        $('#question').html(htmlQ).css({ 'margin-right': '1vmax' });

        $('#question')
          .append(`<div>${htmlOptions}</div>`)
          .css({ 'margin-right': '1vmax' });

        $('label').on('click', function () {
          var value = $(this).attr('value');

          userAnswers[q] = value;
          localStorage.setItem('testAnswer', userAnswers);
        });
      }

      // check answer and update score
      function checkAnswer(answer) {
        if (answer == 1) {
          score++;
        } else if (score < 0) {
          score = 0;
        }
      }

      // finish quiz and display result
      function finishQuiz() {
        var selectedAnswer = $("input[name='answer']:checked").val();
        if (selectedAnswer) {
          checkAnswer(selectedAnswer);
        }

        clearInterval(timer);
        let testDetails = JSON.parse(localStorage.getItem('testData'));
        let testData = {
          name: userName,
          score: score,
          total: questionOptions.length,
          email: email,
          testDetails: testDetails,
          answer: localStorage.getItem('testAnswer'),
        };
        localStorage.setItem('resultData', JSON.stringify(testData));

        var stringifiedFormData = JSON.stringify(testData);

        $('#quiz').hide();
        var html =
          ' Hi ' +
          userName +
          ',' +
          'Your score: ' +
          score +
          ' out of ' +
          questionOptions.length;
        alert(html);
        // $('#result').html(html);
        // setTimeout(() => {
        window.location = 'Home.html';
        // }, 1000);
        $.ajaxSetup({
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        $.ajax({
          url: `http://localhost:3000/result`,
          type: 'POST',
          data: stringifiedFormData,
          dataType: 'json',
        });
      }

      function formatTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
        return ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
      }
    });
  } else if (loginVal === 'true' && isAdmin === 'true') {
    Toastify({
      text: 'Sorry, You are not the user ',
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
  } else if (!loginVal) {
    window.location = 'Home.html';
  } else {
    Toastify({
      text: 'Access Denied, Please Login ',
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
      window.location = 'login.html';
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
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },
    }).showToast();

    setTimeout(() => {
      window.location = 'Home.html';
      $('#logout').css({ display: 'none' });
    }, 1000);
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
        // dataType: 'json',
      });
    }
  });
});
