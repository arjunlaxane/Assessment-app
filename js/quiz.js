$(document).ready(function () {
  let loginVal = localStorage.getItem('login');
  let isAdmin = localStorage.getItem('isAdmin');

  if (loginVal === 'true' && isAdmin === 'false') {
    $('#testDetailsHome').hide();
    $('#allUser').hide();
  }

  if (loginVal === 'true') {
    let userName = localStorage.getItem('name');

    $.when($.getJSON('http://localhost:3000/tests')).done(result => {
      const questionOptions = result.filter(val => val.id >= 2);
      var currentQuestion = 0;
      var score = 0;
      let topic = result[0].test_Topic;
      let timeRemaining = +result[0].test_Seconds;

      $('#userNavName').html(`<span>Welcome ${userName}<span>`);
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

      $('#bestLuck')
        .text('All the best')
        .css({ 'font-size': '2vmax', color: '#c20cac', 'font-weight': 500 });
      $('#next').hide();
      $('#timer').hide();
      $('#quiz').hide();

      $('#finish').hide();
      $('#Result').hide();
      $('#showTimer').hide();
      $('#Quizbtn')
        .text(' Start the quiz')
        .css({ 'font-size': '1.5vmax', color: '#f1ecf0', 'font-weight': 500 });
      button_manager();

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

        checkAnswer(selectedAnswer);

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
        finishQuiz();
      });

      // display question and options
      function displayQuestion(q) {
        var question = questionOptions[q].question;
        var options = questionOptions[q].answers;
        console.log(options);
        var html = '<h2>' + question + '</h2>';
        for (var i = 0; i < options.length; i++) {
          if (options[i].option != 'Option not added') {
            html +=
              "<label><input type='radio'  name='answer' value='" +
              options[i].correct +
              "'>" +
              options[i].option +
              '</label><br>';
          }
        }
        $('#question').html(html).css({ 'margin-right': '1vmax' });
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
        clearInterval(timer);

        var selectedAnswer = $("input[name='answer']:checked").val();

        checkAnswer(selectedAnswer);
        $('#quiz').hide();
        var html =
          '<h2> Hi ' +
          userName +
          ',' +
          'Your score: ' +
          score +
          ' out of ' +
          questionOptions.length +
          '</h2>';
        $('#result').html(html);
      }

      // format time in minutes and seconds
      function formatTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
        return ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
      }
    });
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
