const startButton = document.getElementById('startSurvey')
startButton.addEventListener('click', () => {
    axios.get('/surveyData').then(response => {
        const survey = response.data
        var main = document.getElementsByClassName('container')[0]
        main.innerHTML = survey.map(question => {
            //* This switch case is checking our question type {String}
            //* We return rendered html based on the question type.
            switch (question.type) {
                case 'checkbox': return checkBoxRender(question)
                    break;
                case 'radio': return readioRender(question)
                    break;
                case 'input': return inputRender(question)
                    break;
            }
        }).join("")
    })
})



/**
 * 
 * @param {Object} Question :This question has an interface with a string for the quest and an Array for the choices
 * @returns {String}: HTML rendering for survey question
 */

function checkBoxRender(Question) {
    const choices = Question.choices.map(choice => {
        return `<div class="row">
        <div class="col-8 survey-options">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="firstbox">
                    <label class="form-check-label" for="firstbox">
                        ${choice}
            </label>
        </div>`
    })
    return ` <div class="row">
        <div class="col-8 survey-question">
            <h2>${Question.question}</h2>
        </div>
        ${choices.join("")}
        <button type = "button" class= "btn btn-primary" > Next</button >
    </div> `
}

/**
 * 
 * @param {Object} Question :This question has an interface with a string for the quest and an Array for the choices
 * @returns {String}: HTML rendering for survey question
 */
function readioRender(Question) {
    const choices = Question.choices.map(choice => {
        return `        
        <input type="radio" value=""> ${choice}</input>
`
    })
    const renderedHTML = `      <div class="row">
            <div class="col-8 survey-question">
                <h2>${Question.question}</h2>
            </div>
        </div>
        <div class="row">
        <div class="col-8 survey-options">
        ${choices.join("")}
        <button type="button" class="btn btn-primary">Next</button>
        </div>
        </div>`
    return renderedHTML
}

/**
 * 
 * @param {Object} Question :This question has an interface with a string for the quest and an Array for the choices
 * @returns {String}: HTML rendering for survey question
 */
function inputRender(Question) {
    const choices = Question.choices.map(choice => {
        return `${choice}: <input type="text" name="${choice}" value=""><br></br>`
    })
    const renderedHTML = `
    <div class="row">
    <div class="col-8 survey-question">
        <h2>${Question.question}</h2>
    </div>
</div>
<div class="row">
            <div class="col-8 survey-options">
                    <form action=" ">
                    ${choices.join("")}
                    <button type="button" class="btn btn-primary">Next</button>
                    </form>
            </div>
        </div>      
        `
    return renderedHTML
}