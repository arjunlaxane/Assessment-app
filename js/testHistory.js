$(document).ready(function () {
  let login = localStorage.getItem('login');
  let userName = localStorage.getItem('name');
  let userEmail = localStorage.getItem('email');
  let isAdmin = localStorage.getItem('isAdmin');
  if (login && isAdmin === 'false') {
    $('#userNavName').html(`<span>${userName}<span>`);
    $('#logout').append().html('<span class="m-1 homwNavLink" >Logout</span>');
    $.when($.getJSON('http://localhost:3000/result')).done(result => {
      const testData = result.filter(ele => ele.email === userEmail);
      $('#testSearchBar').on('keyup', function () {
        var value = $(this).val().toLowerCase();

        $('table tbody tr').filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
      $.each(testData, function (index, ele) {
        $('#myTestHistoryTable').append(`
    <tr>
            <td>${index + 1}</td>

        <td>${ele.testDetails[0].test_Topic}</td>
        <td>${ele.score}</td>
        <td>${ele.total}</td>

         <td><button class="btn btn-success"  id="downloadTestHistory${
           ele.id
         }">Download</button></td>
           
        </tr>`);

        let arr = ele.testDetails.filter(ele => ele.id > 1);

        let quiz = [];
        //question
        let questionArr = arr.map(ele => ele.question);

        for (let i = 0; i < questionArr.length; i++) {
          let optionsArr = arr.map(ele => ele.answers.map(ele => ele.option));

          let answerArr = arr.map(ele =>
            ele.answers.filter(ele => ele.correct === '1')
          );

          let selectedAns = testData[index].answer.split(',');

          let data1 = '';

          data1 += `
        \n\n
            Q.${questionArr[i]}

            Options: ${optionsArr[i]}

            Selected option:${selectedAns[i]}

            Correct answer: ${answerArr[i][0].option}`;

          quiz.push(data1);
        }
        $(`#downloadTestHistory${ele.id}`).click(() => {
          downloadQuiz(ele.id, quiz, index, testData);
        });
      });

      function downloadQuiz(k, data1, index, testData) {
        fetch(`http://localhost:3000/result/${k}`)
          .then(response => response.json())
          .then(data => {
            let data2 = `                                                    Quiz Questions`;
            let data3 = ` \n\n\n                                Your Quiz Score is ${testData[index].score} out of ${testData[index].total}`;
            const quiz = [data2];
            quiz.push(data1);
            quiz.push(data3);

            const blob = new Blob(quiz, { type: 'text/plain' });
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.addEventListener('loadend', () => {
              const downloadLink = document.createElement('a');
              downloadLink.href = reader.result;
              downloadLink.download = `Quiz.txt`;

              downloadLink.click();
            });
          });
      }
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
