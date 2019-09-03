

//TODO: 1. Create a button that user must click in order for them to start the survey
//TODO: 2. Create a loop that will hide the questions until they are ready to answer the next one
//TODO: 3. Create the range  slider 
//TODO: 4. Grab the data from each question, once the user answers.

const finishedSurveyData = []


var questionNumber = 1;
$(document).ready(async function () {
   $.get('/surveyData').then(res => {
      //The question  object is here!!
      const surveyContainer = document.getElementById('surveyForm'); // this is grabbing the container on the HTMl
      const survey = res; // this is grabbing data in the surveySet
      console.log(survey.length)
      //inside of this container i want to dislpay the questions  
      const formsHTML = survey.map((Question, i) => {
         const { question, type, choices } = Question;
         const questionNum = i + 1
         var buttonHTML = `<button type="submit" id="" class="btn btn-primary next" onClick="">Next</button>`
         // if (i < survey.length - 1) {
         // } else {
         //    var buttonHTML = ``
         // }
         //creating a if and else statment but using switch method 
         switch (type) {
            case 'checkbox': return `
               <form class="surveyContainer question" id="form${questionNum}" data-type="${type}">
               ${renderCheckBox(Question, questionNum)}
               ${buttonHTML}
               </form>
               `
               break;
            case 'range': return `
               <form class="surveyContainer question slidecontainer" data-type="${type}" id="form${questionNum}">
               ${renderRangeButton(Question, questionNum)}
               ${buttonHTML}
               </form>
               `
               break;
            case 'radio': return `
               <form  class="surveyContainer question" data-type="${type}" id="form${questionNum}">
               ${renderRadioButton(Question, questionNum)}
               ${buttonHTML}
               </form>
               `
               break
            case 'text': return `
               <form  class="surveyContainer question" data-type="${type}" id="form${questionNum}">
               ${renderTextButton(Question, questionNum)}
               <button type="submit"  class="btn btn-primary">Next</button>
               </form>
               `
         }
      })
      //* Create a container to put all of the rendered questions in.
      const questionsContainer = document.createElement("div")
      //*Add the submit button outside of the questionsContainer
      formsHTML.push('<button id="submitSurvey"  style="display: none;" class="btn btn-primary">Submit</button>')
      questionsContainer.innerHTML = formsHTML.join('')

      //! Finally when all of the questions have been added to the questionsContainer
      //! Append the question container into the surveyContainer.
      surveyContainer.appendChild(questionsContainer)
      //* Add event listener to the start button.
      $('#start').click(function () {
         document.getElementById('surveyNameForm').style = 'display: none;'
         //* set the display of the survey header to none.
         document.getElementById('surveyHeader').style = 'display: none';
         //! questionNumber is a variable that we intiated at the top and it starts at 1.
         const currentQuestion = document.querySelector(`#form${questionNumber}`);
         //! Toggling the class surveyContainer shows the question with id of form1
         currentQuestion.classList.toggle('surveyContainer')
         //The surveyContainer has a CSS of display NONE
      })
      return survey
   }).then((survey) => {
      //! Select all of the questions and change the onSubmit for every one
      const allQuestions = document.querySelectorAll('.question')
      allQuestions.forEach(form => {
         form.onsubmit = e => {
            e.preventDefault();
            const questionType = form.getAttribute('data-type')
            const questionText = document.querySelector(`#question${questionNumber} h2`).textContent
            let values;
            switch (questionType) {
               case 'checkbox': values = Array.from(form.querySelectorAll('input[type=checkbox]:checked')).map(item => item.value);
                  console.log(values)
                  break;
               case 'text': values = Array.from(form.querySelectorAll('input[type=text]')).map(item => { return item.value })
                  console.log(values)
                  break;
               default: values = form.elements.answer.value
            }
            const answer = {
               question: questionText,
               answer: values
            }

            showNext();
            return finishedSurveyData.push(answer)
         }
      })
      var slider = $('#myRange');
      var output = $('#demo');
      output.innerHTML = slider.val();

      slider.oninput = function () {
         output.innerHTML = this.val();
      }
      return survey
   })
})


//After the document is ready we add an event listener to the start button.


function showNext(e) {
   // e.preventDefault()
   const thisQuestion = document.querySelector(`#form${questionNumber}`)
   if (thisQuestion.nextElementSibling.getAttribute('id') === 'submitSurvey') {
      thisQuestion.classList.toggle('surveyContainer')
      return document.getElementById('submitSurvey').style = 'display: block;'
   }
   thisQuestion.classList.toggle('surveyContainer')
   questionNumber++
   const nextQuestion = document.querySelector(`#form${questionNumber}`)
   nextQuestion.classList.toggle('surveyContainer')
}

const mainSurvey = document.getElementById('surveyForm')
mainSurvey.onsubmit = async function (e) {
   e.preventDefault();
   const userId = Number(this.getAttribute('data-user'))
   const surveyName = this.elements.surveyName.value.toString()
   const surveyDb = await createUserSurvey(surveyName, userId)
   const { id } = surveyDb.data.createSurvey;
   await Promise.all(finishedSurveyData.map(form => createAnswer(form.answer, form.question, id)))
}






//-----rendering each question type text , checkbox, radio , range 

function renderCheckBox(Question, num) {
   const { question, type, choices } = Question;
   var checkBoxHTML = choices.map((choice) => {
      return `
            <div class="">
            <label class="form-check-label mr-2" for="${choice}box">
            ${choice}
            </label>
            <input class="form-check-input" type="${type}" value="${choice}" name="answer" id="${choice}box">
            </div>
            `
   })
   return `
         <div class="row">
               <div class="col" id="question${num}">
                  <h2 name="question">${question}</h2>
      
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

function renderRadioButton(Question, num) {
   const { question, type, choices } = Question;
   var radioButtonHTML = choices.map((choice) => {
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
                      <h2 name="question" >${question}</h2>
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

function renderTextButton(Question, num) {
   const { question, type, choices } = Question;
   var textButtonHTML = choices.map((choice) => {
      return `
                <input type="${type}" name="answer" data-inputInfo="${choice}" placeholder="${choice}">   
            `
   })
   return `
         <div class="row">
                  <div class="col" id="question${num}">
                      <h2 name="question">${question}</h2>
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

function renderRangeButton(Question, num) {
   const { question, type, choices } = Question;
   var rangeButtonHTML = choices.map((choice) => {
      return `
                <input type="${type}" min="1" max="1000" value="0"  name="answer" class="slider" id="myRange">
                <p>Value: <span id="demo"></span></p>
            `
   })
   return `
          <div class="row">
                  <div class="col" id="question${num}">
                      <h2 name="question">${question}</h2>
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
              <br />`
}


