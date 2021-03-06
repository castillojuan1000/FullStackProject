const url = `/graphql`;
const opts = {
  method: "POST",
  headers: { "Content-Type": "application/json" }
};
/*
 * Implementation of a few GraphQL GET requests with fetch
 * Use the playground tool @ localhost:3000/graphql to test your queries.
 * Query Methods
 */

/**
 *
 * @param {Integer} id :Requires the user primary key.
 * @returns {Array} :Returns an array of user likes with all of the information for the rendering.
 */
async function getUserLikes(id) {
  const query = `query{
        getUserLikes(userId: ${Number(id)}){
          id
          listingId
          price
          title
          imgUrl
          user{
            name
            email
          }
        }}`;
  opts.body = JSON.stringify({ query });
  const response = await fetch(url, opts);
  return response.json();
}
/**
 *
 * @param {Integer} id Requires the primary key for a survey
 * @returns {Array} : Returns an array of user surveys including the name & answers
 */
async function getUserSurveys(id) {
  const query = `query{
    getSurvey(id: ${id}){
      answers{
        question
        answer
      }
      categories{
        name
      }
    }
  }`;
  opts.body = JSON.stringify({ query });
  const response = await fetch(url, opts);
  return response.json();
}

async function getSurveyById(id) {
  const query = `query{
    getSurvey(id: ${id}){
    name
    answers{
      question
      answer
    }
    categories{
      name
    }
  }  
}`;

  opts.body = JSON.stringify({ query })
  const response = await fetch(url, opts)
  return response.json()
}

//* Mutations

/**
 *
 * @param {Integer} listingId : Integer of the listing ID per Etsy's Page
 * @param {String} imgUrl :String with the url of the listing
 * @param {Integer} userId :PK of the user Integer
 * @param {String} title :Tilte for the listing
 * @param {Integer} price :Integer
 * @returns {String}
 */
async function addUserLike(listing, imgUrl, userId, title, price) {
  const query = `mutation{
        createUserLike(listing: ${Number(
    listing
  )} imgUrl: "${imgUrl}" userId: ${Number(
    userId
  )} title: "${title}" price: ${Number(price)}){
            id
        }
    }`;
  //! Important to use an object when Stringifying the body
  opts.body = JSON.stringify({ query });
  const response = await fetch(url, opts);
  return response.json();
}

/**
 *
 * @param {Integer} id This is the primary key for the like.
 * @returns {String}
 */

async function removeUserLike(id) {
  const query = `mutation{
        removeUserLike(id: ${Number(id)})
    }`;
  opts.body = JSON.stringify({ query });
  const response = await fetch(url, opts);
  return response.json();
}
/**
 *
 * @param {String} name :Requires the first answer of the survey
 * @param {Integer} userId :Uses the primary key of the user for association
 * @returns {Object} :Returns an object of the newly created
 */
async function createUserSurvey(name, userId) {
  const query = `mutation{
            createSurvey(name: "${name}", user_id: ${Number(userId)}){
                name
                id
            }
        }`;
  opts.body = JSON.stringify({ query });
  const response = await fetch(url, opts);
  return response.json();
}

/**
 *
 * @param {String} answer :String sepcifying the question
 * @param {String} question :User value submited
 * @param {Integer} surveyId :Integer representing the survey relation
 */
async function createAnswer(answer, question, surveyId) {
  const query = `mutation{
        createAnswer(answer: "${answer}" question: "${question}" surveyId: ${Number(
    surveyId
  )} required: false){
              id
        }
      }`;
  opts.body = JSON.stringify({ query });
  const response = await fetch(url, opts);
  return response.json();
}

async function addSurveyCategory(name, surveyId) {
  const query = `mutation{
    createCategory(name: "${name}" surveyId: ${Number(surveyId)}){
        survey{
        answers{
                question
                answer
                }
                user{
                    name 
                    email
                    }} 
    }`;
  opts.body = JSON.stringify({ query });
  const response = await fetch(url, opts);
  return response.json();
}
