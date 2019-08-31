

//TODO: 1. Create a button that user must click in order for them to start the survey
//TODO: 2. Create a loop that will hide the questions until they are ready to answer the next one
//TODO: 3. Create the range  slider 
//TODO: 4. Grab the data from each question, once the user answers.

var questionNumber;

window.addEventListener('DOMContentLoaded', function () {
   document.getElementById('start').addEventListener('click', function () {
      questionNumber = 1;
      document.getElementById('question1').classList.toggle('hide');
      document.getElementById('answer1').classList.toggle('hide');
      questionNumber++;
   });

   const survey = document.forms.namedItem('surveyForm');

   // this will attach an event listener to this survey
   // we attach it the form because the form is the what emits the event when we click the button 
   // then creating a callback fucntion which will fire and take in the event object 
   survey.addEventListener('submit', function (e) {
      e.preventDefault();
      // in order to grab the user input i would need to use the .value property
      const questions = survey.querySelector('input[type="radio"]').value
      const questions1 = survey.querySelector('input[type="checkbox"]').value
      const questions2 = survey.querySelector('input[type="text"]').value
      const questions3 = survey.querySelector('input[type="range"]').value


      console.log(question1, question2, question3, questions);
   });

   // checkbox radio range text



})
function showNextQuestion() {
   document.getElementById(`question${questionNumber}`).classList.toggle('hide');
   document.getElementById(`answer${questionNumber}`).classList.toggle('hide');
   questionNumber++;
}
function showConsent() {
   $('#answer1').show();
   $('#answer2').show();
   $('#answer3').show();
   $('#answer4').show();
   $('#answer5').show();
   $('#answer6').show();
   $('#answer7').show();
   $('#answer8').show();
   $('#answer9').show();
   $('#answer10').show();
   $('#answer11').show();
   $('#answer12').show();
   $('#answer13').show();
   $('#answer14').show();
   $('#answer15').show();
   $('#question1').show();
   $('#question2').show();
   $('#question3').show();
   $('#question4').show();
   $('#question5').show();
   $('#question6').show();
   $('#question7').show();
   $('#question8').show();
   $('#question9').show();
   $('#question10').show();
   $('#question11').show();
   $('#question12').show();
   $('#question13').show();
   $('#question14').show();
   $('#question15').show();

}
//-----this is grabbing the data from the surveySET file on the backened 
$.get('/surveyData').then(res => {
   console.log(res);
   const survey = res; // this is grabbing data in the surveySet
   const container = document.getElementById('surveyForm'); // this is grabbing the container on the HTMl 
   container.innerHTML = survey.map((Question, i)=>{  
      const{question,type,choices} = Question;
      //creating a if and else statment but using switch method 
      switch(type){
         case 'checkbox': return renderCheckBox(Question,i+1)
         break;
         case 'range': return renderRangeButton(Question,i+1)
         break;
         case 'radio': return renderRadioButton(Question,i+1)
         break
         case 'text': return renderTextButton(Question,i+1)
      }

   }).join('')

})

//-----rendering each question type text , checkbox, radio , range 

function renderCheckBox(Question,num){
   const {question, type, choices}= Question;
   var checkBoxHTML = choices.map((choice)=> {
      return `
      <div>
      <input class="form-check-input" type="checkbox" value="Female" id="firstbox">
      <label class="form-check-label" for="firstbox">
      ${choice} 
      </label>
      </div>
      `
   })
   return `
   <div class="row">
         <div class="col hide" id="question${num}">
            <h2>${question}</h2>

          </div>
   </div>
      <br />
   <div class="row">
         <div class="col hide" id="answer${num}" >
         <div class="form-check">
         ${checkBoxHTML.join('')}
         </div>
         <br />
         <button type="button" onclick="showNextQuestion()" class="btn btn-primary">Next</button>
       </div>
   </div>`

}

function renderRadioButton(Question,num){
   const{question,type,choices}= Question;
   var radioButtonHTML = choices.map((choice)=> {
      return ` <div class=radioBox>
                <input type="${type}" value="${choice}"></input>
                </div>
                <div>
                ${choice}
                </div>
      `
   })
   return `
   <div class="row">
            <div class="col hide" id="question${num}">
                <h2>${question}</h2>
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col hide" id="answer${num}">
            <div class="d-flex flex-column w-25 mx-auto">
                ${radioButtonHTML.join('')}
                </div>
                <br />
                <br />
                <button type="button" onclick="showNextQuestion()" class="btn btn-primary">Next</button>
             </div>
        </div>
        <br /> 
   `
}

function renderTextButton(Question,num){
   const{question,type,choices}= Question;
   var textButtonHTML = choices.map((choice)=>{
      return `
          ${choice}: <input type="${type}" name="${choice}" value=""><br>
                 
      `
   })
   return `
   <div class="row">
            <div class="col hide" id="question${num}">
                <h2>${question}</h2>
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col hide" id="answer${num}">
                    <form action=" ">  <!-- Create a new route  -->
                       ${textButtonHTML.join('')}
                        <br />
                        <br />
                        <br />
                        <button type="button" onclick="showNextQuestion()" class="btn btn-primary">Next</button>
                    </form>
            </div>
        </div>
        <br />
   `
}

function renderRangeButton(Question,num){
   const{question,type,choices}= Question;
   var rangeButtonHTML = choices.map((choice)=>{
      return `
          <input type="${type}" min="10" max="1000" step="5" value="" data-orientation="vertical"></input>
      `
   })
   return `
    <div class="row">
            <div class="col hide" id="question${num}">
                <h2>${question}</h2>
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col hide" id="answer${num}">  <!-- Create a new route  -->
                ${rangeButtonHTML.join('')}
                <br />
                <br />
                <button type="button" onclick="showNextQuestion()" class="btn btn-primary">Next</button>
            </div>
        </div>
        <br />
   
   `
}
