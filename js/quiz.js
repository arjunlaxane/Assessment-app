$(document).ready(function () {
  let a = $('button').length;
  console.log(a);

  $.when($.getJSON('http://localhost:3000/tests')).done(result => {
    let login = localStorage.getItem('login');

    if (login) {
      let count = 0;
      let marks = 0;
      let timer;
      let topic = result[0].test_Topic;
      let testNum = result[0].test_Number;
      let testTime = +result[0].test_Seconds;
      $('#getTestTopic').text(`${topic}-${testNum}`);
      let answer = [];
      //main ready function...

      $('#finish').hide();
      $('#Result').hide();
      button_manager();

      //create function..

      function button_manager() {
        if (count > 0) {
          $('#prev').show();
          if (count === 4) {
            $('#next').hide();
            $('#finish').show();
          } else {
            $('#next').show();
          }
        } else {
          $('#prev').hide();
        }
      }

      //create question function...

      function adding_Questions(data, i) {
        if (i < 7) {
          $('#question').text(data[i + 1].writeQuestion);
          $('#options1').text(data[i + 1].option1);
          $('#options2').text(data[i + 1].option2);
          $('#options3').text(data[i + 1].option3);
          $('#options4').text(data[i + 1].option4);
          $('#number').text(Number(i + 1));
        }
      }
      // Answer selection question....

      function selected_Answer(data) {
        for (var i = 0; i < 4; i++) {
          var a = document.getElementById('options').children;
          // console.log(a[i].innerHTML);
          answer.push(a[i].innerHTML);
          // console.log(a[0].innerHTML);
          console.log(answer[0]);
          if (a[i].innerHTML === answer[count]) {
            console.log('hi');
            $('#options').children('button')[i].classList.add('active');
          } else {
            $('#options').children('button')[i].classList.remove('active');
          }
          console.log(answer[i]);
        }
      }

      // result
      function creating_result(data) {
        for (var i = 0; i < answer.length; i++) {
          marks += 5;
        }

        $('#main').hide();
        $('#marks').text(marks);

        $('#correct-answer').text(marks / 5);
        $('#correct-answer').text((marks / 25) * 100 + '%');
        $('#Result').show();
      }

      $('#options').hide();

      // attach api

      fetch('http://localhost:3000/tests')
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          $('#Quizbtn').click(function () {
            $('#options').show();

            adding_Questions(data, count);
            $('.start_page').hide();
            $('#prev').hide();

            timer = setInterval(timer_function, 1000);

            function timer_function() {
              $('#time').text(testTime);

              if (testTime < 1) {
                clearInterval(timer);
                alert('Out of Time');

                creating_result(data);
                $('#main').hide();
                $('#result').show();
              }
              testTime--;
            }
          });

          // next question...

          $('#next').click(function () {
            count++;
            adding_Questions(data, count);
            $('#prev').show();
            $('.option').removeClass('active');
            button_manager();
            selected_Answer(data);
          });

          // previous questions

          $('#prev').click(function () {
            count--;
            adding_Questions(data, count);
            button_manager();
            selected_Answer(data);
          });

          // finish quiz

          $('#finish').click(function () {
            creating_result(count);
            clearInterval(timer);
          });
        });
    } else {
      window.location.href = 'http://127.0.0.1:5500/html/Home.html';
    }
  });
});
