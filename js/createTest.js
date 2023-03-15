// $(window).load(() => {
$(document).ready(function () {
  let loginVal = localStorage.getItem('login');
  let admin = localStorage.getItem('isAdmin');
  if (loginVal === 'true' && admin === 'true') {
    let totalInputs = $('span > input').length;

    $('#addOption').click(() => {
      if (totalInputs < 6) {
        totalInputs++;

        let newOption = $(document.createElement('div')).attr(
          'id',
          'optionDiv' + totalInputs
        );

        newOption
          .after()
          .html(
            `<input type="text" class="testDetailInputTag mb-3" name=option_${totalInputs} placeholder="Add option" value='' id="option_${totalInputs}"/>`
          );
        newOption.appendTo('#newInput');
      }
    });

    $('#removeOption').click(() => {
      console.log(totalInputs);
      if (totalInputs === 4) {
        return false;
      }
      $('#optionDiv' + totalInputs).remove();
      totalInputs--;
    });

    //trst finish

    $('#finish').click(() => {
      let questionNumber = $('#questionNumber').val();
      let anwswer = $('#answer').val();
      let writeQuestion = $('#writeQuestion').val();
      let option1 = $('#option_1').val();
      let option2 = $('#option_2').val();
      let option3 = $('#option_3').val();
      let option4 = $('#option_4').val();

      var optionsAdded = '';
      for (i = 5; i < totalInputs + 3; i++) {
        optionsAdded += $('#option_' + i).val() + ' ';
      }
      let optionsVal = optionsAdded.split(' ');
      console.log(optionsVal);
      let option5 = optionsVal[0] ?? '';
      let option6 = optionsVal[1] ?? '';

      // setTimeout(() => {
      // window.location = 'Home.html';
      // }, 1000);
      $.post(`http://localhost:3000/tests`, {
        writeQuestion,
        anwswer,
        option1,
        option2,
        option3,
        option4,
        option5,
        option6,
        questionNumber,
      });
      window.location = 'Home.html';
    });

    $('#addQuestion').click(() => {
      let questionNumber = $('#questionNumber').val();
      let anwswer = $('#answer').val();
      let writeQuestion = $('#writeQuestion').val();
      let option1 = $('#option_1').val();
      let option2 = $('#option_2').val();
      let option3 = $('#option_3').val();
      let option4 = $('#option_4').val();
      var optionsAdded = '';
      for (i = 5; i < totalInputs + 3; i++) {
        optionsAdded += $('#option_' + i).val() + ' ';
      }
      let optionsVal = optionsAdded.split(' ');
      console.log(optionsVal);
      let option5 = optionsVal[0] ?? '';
      let option6 = optionsVal[1] ?? '';

      $.post(`http://localhost:3000/tests`, {
        writeQuestion,
        anwswer,
        option1,
        option2,
        option3,
        option4,
        option5,
        option6,
        questionNumber,
      });
      setTimeout(() => {
        window.location = 'createTest.html';
      }, 1000);
    });
  } else {
    window.location = 'Home.html';
  }
});

// let map = new Map();
// var a = 1;
// let aa=map.set(`test${a}`, `[{a:1,b:2}]`);

// for (let [key, value] of aa) {
// console.log(key + " = " + value);
