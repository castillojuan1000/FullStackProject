

//TODO: 1. Create a button that user must click in order for them to start the survey
//TODO: 2. Create a loop that will hide the questions until they are ready to answer the next one
//TODO: 3. Create the range  slider 
//TODO: 4. Grab the data from each question, once the user answers.

var questionNumber= 1;

window.addEventListener('DOMContentLoaded', function () {
   document.getElementById('start').addEventListener('click', function () {
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
   document.getElementById(`form${questionNumber}`).classList.toggle('hide');
   // document.getElementById(`answer${questionNumber}`).classList.toggle('hide');
   questionNumber++;
}
//-----this is grabbing the data from the surveySET file on the backened 
$.get('/surveyData').then(res => {
   console.log(res);
   const survey = res; // this is grabbing data in the surveySet
   const container = document.getElementById('surveyForm'); // this is grabbing the container on the HTMl 
   container.innerHTML = survey.map((Question, i)=>{  
      const{question,type,choices} = Question;
      const questionNum = i
      if(i != 14){
         var buttonHTML = `<button type="submit" onclick="showNextQuestion()" class="btn btn-primary">Next</button>`
      }else{
         var buttonHTML = `<button type="submit" class="btn btn-primary">Submit</button>`
      }
      //creating a if and else statment but using switch method 
      switch(type){
         case 'checkbox': return `
         <form class="hide" id="form${questionNum}">
         ${renderCheckBox(Question,questionNum)}
         ${buttonHTML}
         </form>
         `
         break;
         
         case 'range': return `
         <form class="hide" id="form${questionNum}">
         ${renderRangeButton(Question,questionNum)}
         ${buttonHTML}
         </form>
         `
         break;

         case 'radio': return `
         <form  class="hide" id="form${questionNum}">
         ${renderRadioButton(Question,questionNum)}
         ${buttonHTML}
         </form>
         `
        
         break
         case 'text': return `
         <form  class="hide" id="form${questionNum}">
         ${renderTextButton(Question,questionNum)}
         <button type="submit" onclick="showNextQuestion()" class="btn btn-primary">Next</button>
         </form>
         `
      }
   }).join('')
}).then(()=>{
   //* Select all of the form childs inside of the id="surveyForm"
   const forms = document.querySelectorAll('#surveyForm form'); // queryselectorAll prints out a array and then it needs to loop through each element 
   forms.forEach((form)=>{
      form.onsubmit= (e)=>{
         e.preventDefault()
         console.log(form.elements.answer.value);
         if(form.querySelector(`[type="text"]`) != null){
            const values = form.querySelectorAll('[type="text"]')
            values.forEach(value => console.log(value.value))
         }
      }
   })


})

//-----rendering each question type text , checkbox, radio , range 

function renderCheckBox(Question,num){     
   const {question, type, choices}= Question;
   var checkBoxHTML = choices.map((choice)=> {
      return `
      <div>
      <input class="form-check-input" type="checkbox" value="Female" name="answer" id="firstbox">
      <label class="form-check-label" for="firstbox">
      ${choice}
      </label>
      </div>
      `
   })
   return `
   <div class="row">
         <div class="col" id="question${num}">
            <h2>${question}</h2>

          </div>
   </div>
      <br />
   <div class="row">
         <div class="col" id="answer${num}" >
         <div class="form-check">
         ${checkBoxHTML.join('')}
         </div>
         <br />
         
       </div>
   </div>`

}

function renderRadioButton(Question,num){
   const{question,type,choices}= Question;
   var radioButtonHTML = choices.map((choice)=> {
      return ` <div class=radioBox>
                <input type="${type}" value="${choice}" name="answer"></input>
                </div>
                <div>
                ${choice}
                </div>
      `
   })
   return `
   <div class="row">
            <div class="col" id="question${num}">
                <h2>${question}</h2>
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col" id="answer${num}">
            <div class="d-flex flex-column w-25 mx-auto">
                ${radioButtonHTML.join('')}
                </div>
                <br />
                <br />
                
             </div>
        </div>
        <br /> 
   `
}

function renderTextButton(Question,num){
   const{question,type,choices}= Question;
   var textButtonHTML = choices.map((choice)=>{
      return `
          <input type="${type}" name="answer" placeholder="${choice}">   
      `
   })
   return `
   <div class="row">
            <div class="col" id="question${num}">
                <h2>${question}</h2>
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col" id="answer${num}">  <!-- Create a new route  -->
                       ${textButtonHTML.join('<br/>')}
                        <br />
                        <br />
                        <br />
            </div>
        </div>
        <br />
   `
}

function renderRangeButton(Question,num){
   const{question,type,choices}= Question;
   var rangeButtonHTML = choices.map((choice)=>{
      return `
          <input type="${type}" min="10" max="1000" step="5"  name="answer" value="" data-orientation="vertical"></input>
      `
   })
   return `
    <div class="row">
            <div class="col" id="question${num}">
                <h2>${question}</h2>
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col" id="answer${num}">  <!-- Create a new route  -->
                ${rangeButtonHTML.join('')}
                <br />
                <br />
                
            </div>
        </div>
        <br />
   
   `
}


// adding a eventlistener to the buttons on the questions to grab the values  

// button1.addEventListener("click", function(){
//    const{question,type,choices};
//    document.querySelector(type).value;

// })
// button2.addEventListener("click", function(){
//    const{question,type,choices};
//    document.querySelector(type).value;
// })
// button3.addEventListener("click", function(){
//    const{question,type,choices};
//    document.querySelector(type).value;
//    console.log(document.querySelector(type).value)

   
// })
// button4.addEventListener("click", function(){
//    const{question,type,choices};
//    document.querySelector(type).value;
   
// })
