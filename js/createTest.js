// $(window).load(() => {

$(document).ready(function () {
  let loginVal = localStorage.getItem('login');
  let admin = localStorage.getItem('isAdmin');
  if (loginVal === 'true' && admin === 'true') {
    let userName = localStorage.getItem('name');
    let totalInputs = $('#newInput > div > input[type="text"]').length;
    $('#userNavName').html(`<span>Welcome ${userName}<span>`);
    $('#logout').append().html('<span class="m-1 homwNavLink" >Logout</span>');

    $('#addOption').click(() => {
      if (totalInputs < 6) {
        totalInputs++;

        let newOption = $(document.createElement('div')).attr(
          'id',
          'optionDiv' + totalInputs
        );

        newOption.after().html(
          `<input type="text" class="testDetailInputTag mb-3" name=option_${totalInputs} placeholder="Add option ${totalInputs}" value='' id="option_${totalInputs}"/>
            
                       <label for="correct${totalInputs}">Right</label>
          <input type="radio" value="1" id="correct${totalInputs}" name="answer${totalInputs}" />
         `
        );
        //  <label for="incorrect${totalInputs}">Incorrect</label>
        // <input type="radio" value="0" id="incorrect${totalInputs}" name="answer${totalInputs}" />

        newOption.appendTo('#newInput');
      }
      console.log(totalInputs);
    });

    $('#removeOption').click(() => {
      console.log(totalInputs);
      if (totalInputs === 4) {
        return false;
      }
      $('#optionDiv' + totalInputs).remove();
      totalInputs--;
    });

    let answerArr1 = [];
    let answerArr2 = [];
    let answerArr3 = [];
    let answerArr4 = [];
    let answerArr5 = [];
    let answerArr6 = [];
    $('#correct1').click(() => {
      let c = $("input[name='answer1']:checked").val();
      console.log(c);
      answerArr1.push(c);
      $('#correct2').attr('disabled', true);
      $('#correct3').attr('disabled', true);
      $('#correct4').attr('disabled', true);
      $('#correct5').attr('disabled', true);
      $('#correct6').attr('disabled', true);
    });
    $('#correct2').click(() => {
      let c = $("input[name='answer2']:checked").val();
      console.log(c);
      answerArr2.push(c);
      $('#correct1').attr('disabled', true);
      $('#correct3').attr('disabled', true);
      $('#correct4').attr('disabled', true);
      $('#correct5').attr('disabled', true);
      $('#correct6').attr('disabled', true);
    });
    $('#correct3').click(() => {
      let c = $("input[name='answer3']:checked").val();

      console.log(c);
      answerArr3.push(c);
      $('#correct1').attr('disabled', true);
      $('#correct2').attr('disabled', true);
      $('#correct4').attr('disabled', true);
      $('#correct5').attr('disabled', true);
      $('#correct6').attr('disabled', true);
    });
    $('#correct4').click(() => {
      let c = $("input[name='answer4']:checked").val();

      console.log(c);
      answerArr4.push(c);
      $('#correct1').attr('disabled', true);
      $('#correct2').attr('disabled', true);
      $('#correct3').attr('disabled', true);
      $('#correct5').attr('disabled', true);
      $('#correct6').attr('disabled', true);
    });
    $('#correct5').click(() => {
      let c = $("input[name='answer5']:checked").val();

      console.log(c);
      answerArr5.push(c);
      $('#correct1').attr('disabled', true);
      $('#correct2').attr('disabled', true);
      $('#correct3').attr('disabled', true);
      $('#correct4').attr('disabled', true);
      $('#correct6').attr('disabled', true);
    });

    $('#correct6').click(() => {
      let c = $("input[name='answer6']:checked").val();

      console.log(c);
      answerArr6.push(c);
      $('#correct1').attr('disabled', true);
      $('#correct2').attr('disabled', true);
      $('#correct3').attr('disabled', true);
      $('#correct4').attr('disabled', true);
      $('#correct5').attr('disabled', true);
    });

    //test finish

    $('#finish').click(() => {
      let writeQuestion = $('#writeQuestion').val();
      let option1 = $('#option_1').val();
      let option2 = $('#option_2').val();
      let option3 = $('#option_3').val();
      let option4 = $('#option_4').val();
      if (
        writeQuestion !== '' &&
        option1 !== '' &&
        option2 !== '' &&
        option3 !== '' &&
        option4 !== ''
      ) {
        var optionsAdded = '';
        for (i = 5; i < totalInputs + 3; i++) {
          optionsAdded += $('#option_' + i).val() + '-';
        }
        let optionsVal = optionsAdded.split('-');
        console.log(optionsVal);
        let option5 = optionsVal[0] ?? undefined;
        let option6 = optionsVal[1] ?? undefined;

        console.log(optionsVal);

        var formData = {
          question: writeQuestion,
          answers: [
            { option: option1, correct: answerArr1[0] ?? 0 },
            { option: option2, correct: answerArr2[0] ?? 0 },
            { option: option3, correct: answerArr3[0] ?? 0 },
            { option: option4, correct: answerArr4[0] ?? 0 },
            {
              option: option5 === 'undefined' ? 'Option not added' : option5,
              correct: answerArr5[0] ?? 0,
            },
            {
              option: option6 === 'undefined' ? 'Option not added' : option6,
              correct: answerArr6[0] ?? 0,
            },
          ],
        };

        var stringifiedFormData = JSON.stringify(formData);

        $.ajaxSetup({
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        $.ajax({
          url: 'http://localhost:3000/tests',
          type: 'post',
          data: stringifiedFormData,
          dataType: 'json',
          success: function (data) {
            console.info(data);
          },
        });

        setTimeout(() => {
          window.location = 'Home.html';
        }, 1000);
      } else {
        Toastify({
          text: 'Please enter details correctly',
          duration: 1000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          // stopOnFocus: true,
          style: {
            background: 'background-image:red',
          },
        }).showToast();
        return false;
      }
    });

    $('#addQuestion').click(() => {
      let writeQuestion = $('#writeQuestion').val();
      let option1 = $('#option_1').val();
      let option2 = $('#option_2').val();
      let option3 = $('#option_3').val();
      let option4 = $('#option_4').val();

      if (
        writeQuestion !== '' &&
        option1 !== '' &&
        option2 !== '' &&
        option3 !== '' &&
        option4 !== ''
      ) {
        var optionsAdded = '';
        for (i = 5; i < totalInputs + 3; i++) {
          optionsAdded += $('#option_' + i).val() + '-';
        }
        let optionsVal = optionsAdded.split('-');
        console.log(optionsVal);
        let option5 = optionsVal[0] ?? undefined;
        let option6 = optionsVal[1] ?? undefined;

        console.log(optionsVal);

        var formData = {
          question: writeQuestion,
          answers: [
            { option: option1, correct: answerArr1[0] ?? 0 },
            { option: option2, correct: answerArr2[0] ?? 0 },
            { option: option3, correct: answerArr3[0] ?? 0 },
            { option: option4, correct: answerArr4[0] ?? 0 },
            {
              option: option5 === 'undefined' ? 'Option not added' : option5,
              correct: answerArr5[0] ?? 0,
            },
            {
              option: option6 === 'undefined' ? 'Option not added' : option6,
              correct: answerArr6[0] ?? 0,
            },
          ],
        };

        var stringifiedFormData = JSON.stringify(formData);

        $.ajaxSetup({
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        $.ajax({
          url: 'http://localhost:3000/tests',
          type: 'post',
          data: stringifiedFormData,
          dataType: 'json',
          success: function (data) {
            console.info(data);
          },
        });

        setTimeout(() => {
          window.location = 'createTest.html';
        }, 1000);
      } else {
        Toastify({
          text: 'Please enter details correctly',
          duration: 1000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          // stopOnFocus: true,
          style: {
            background: 'background-image:red',
          },
        }).showToast();
        return false;
      }
    });
  } else {
    window.location = 'Home.html';
  }

  //login

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
