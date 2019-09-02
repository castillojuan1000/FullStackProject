

//TODO: 1. Create a button that user must click in order for them to start the survey
//TODO: 2. Create a loop that will hide the questions until they are ready to answer the next one
//TODO: 3. Create the range  slider 
//TODO: 4. Grab the data from each question, once the user answers.



$(document).ready(function () {
   
      $.get('/surveyData').then(res => {
         
         //The question  object is here!!
         const survey = res; // this is grabbing data in the surveySet
         const container = $('#surveyForm'); // this is grabbing the container on the HTMl
         //inside of this container i want to dislpay the questions  
         container.innerHTML = survey.map((Question, i)=>{  
            const{question,type,choices} = Question;
            const questionNum = i
            if(i != 14){
               var buttonHTML = `<button type="submit"  id="next" class="btn btn-primary ">Next</button>`
            }else{
               var buttonHTML = `<button type="submit" class="btn btn-primary">Submit</button>`
            }
            //creating a if and else statment but using switch method 
            switch(type){
               case 'checkbox': return `
               <form class="surveyContainer" id="form${questionNum}">
               ${renderCheckBox(Question,questionNum)}
               ${buttonHTML}
               </form>
               `
               break;
               
               case 'range': return `
               <form class="surveyContainer slidecontainer " id="form${questionNum}">
               ${renderRangeButton(Question,questionNum)}
               ${buttonHTML}
               </form>
               `
               break;
      
               case 'radio': return `
               <form  class="surveyContainer" id="form${questionNum}">
               ${renderRadioButton(Question,questionNum)}
               ${buttonHTML}
               </form>
               `
              
               break
               case 'text': return `
               <form  class="surveyContainer" id="form${questionNum}">
               ${renderTextButton(Question,questionNum)}
               <button type="submit"  class="btn btn-primary">Next</button>
               </form>
               `
            }
         }).join('')
         return survey
      }).then((survey)=>{
         //* Select all of the form childs inside of the id="surveyForm"
          //  prints out a array and then it needs to loop through each element 
          
          $("#surveyForm, form").each((form)=>{
            form.onsubmit= (e)=>{
               e.preventDefault()
               console.log(form.elements.answer.value);
               if(form.$("form input[type='text']") != null){
                  const values = form.$("form input[type='text']")
                  values.forEach(value => console.log(value.value))
               }
            }
         })
         var slider = $('#myRange');
         var output = $('#demo');
         output.innerHTML = slider.val();
      
          slider.oninput = function() {
           output.innerHTML = this.val();
           }
      return survey
      }).then((survey)=>{
         const currentQuestion = $(`.form${questionNumber}`)
         var questionNumber= 0;
         $('#start').click(function(){
            
            var totalQuestions = survey.length; // what does this suppose to do?
      
      
            //store the total number of qustions 
            //the CSS class has display none so the question are already hidden
            surveyContainer = $(".surveyContainer");
            //show the first question 
            currentQuestion.show();
            //attach the eventlistener
            $('#next').on("click", function() {
               currentQuestion.fadeOut(1000)
               questionNumber++
               currentQuestion.fadeIn(1000)
               if(questionNumber == totalQuestions -1 ){
                  questionNumber== 0
               }
            })


         })
            
      
         })
         
         
         const container =  $('#surveyForm');
         // this will attach an event listener to this survey
         // we attach it the form because the form is the what emits the event when we click the button 
         // then creating a callback fucntion which will fire and take in the event object 
      container.on('submit', function (e) {
         e.preventDefault();
         // in order to grab the user input i would need to use the .value property
         const questions = $("form input[type='radio']:checked").val();
         const questions1 = $("form input[type='checkbox']:checked").val();
         const questions2 = $("form input[type='text']").val();
         const questions3 = $("form input[type='range']").val();
      
      
         console.log(questions1, questions2, questions3, questions);
      }); 
         });
         
      
        
      
      
      
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
                <input type="${type}" min="1" max="1000" value="0"  name="answer" class="slider" id="myRange">
                <p>Value: <span id="demo"></span></p>
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
              <br />`
      }


