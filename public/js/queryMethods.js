//Implementation of a GraphQL GET request with fetch
async function getUserLikes(id) {
    const query = `query{
        getUserLikes(userId: ${id}){
          listingId
          price
          title
          imgUrl
          user{
            name
            email
          }
        }}`
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    }
    const response = await fetch('/graphql', opts)
    return response.json()
}



function getuserSurveys(id) {
    const query = `query`
}
