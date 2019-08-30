const startButton = document.getElementById('startSurvey')

startButton.addEventListener('click', () => {
    axios.get('/surveyData').then(response => {
        const survey = response.data;
        var main = document.getElementsByClassName('container')[0]
        main.innerHTML = survey.map(Question => {
            const { type } = Question
            //* This switch case is checking our question type {String}
            //* We return rendered html based on the question type.
            switch (type) {
                case 'checkbox': return checkBoxRender(Question)
                    break;
                case 'radio': return readioRender(Question)
                    break;
                case 'input': return inputRender(Question)
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
    const { question, type, choices } = Question;
    const choicesHTML = choices.map(choice => {
        return `<div class="row">
        <div class="col-8 survey-options">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="firstbox">
                    <label class="form-check-label" for="firstbox">
                        ${choicesHTML}
            </label>
        </div>`
    })
    return ` <div class="row">
        <div class="col-8 survey-question">
            <h2>${question}</h2>
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
    const { question, type, choices } = Question;
    const choicesHTML = choices.map(choice => {
        return ` <input type="radio" value=""> ${choice}</input>`
    })
    const renderedHTML = `<div class="row">
            <div class="col-8 survey-question">
                <h2>${question}</h2>
            </div>
        </div>
        <div class="row">
        <div class="col-8 survey-options">
        ${choicesHTML.join("")}
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
    const { question, type, choices } = Question;
    const choicesHTML = choices.map(choice => {
        return `${choice}: <input type="text" name="${choice}" value=""><br></br>`
    })
    const renderedHTML = `
    <div class="row">
    <div class="col-8 survey-question">
        <h2>${question}</h2>
    </div>
</div>
<div class="row">
            <div class="col-8 survey-options">
                    <form action=" ">
                    ${choicesHTML.join("")}
                    <button type="button" class="btn btn-primary">Next</button>
                    </form>
            </div>
        </div>      
        `
    return renderedHTML
}