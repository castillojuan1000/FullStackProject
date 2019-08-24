const api_key = '93jqxwkb7mqslat27k6yi91j';
const listing_id = '673656176'

$(document).ready(function() {
    //GetListing()
})


/*
Create a Request to etsy using jquery ajax
datatype has to be jsonp due to issues with cross origin requests and brower nonsense
all responses will be a 200 so data has to be validated
*/
function GetListing(){
    let ITEM_URL = `https://openapi.etsy.com/v2/listings/${listing_id}/?api_key=${api_key}`
    $.ajax({
        url: ITEM_URL,
        dataType: 'JSON',
        success: (data) => {
            console.log("1")
            ValidateResponse(JSON.parse(data))
        }
    })
};


/*
if data object[ok] == True then continue
empty old search results and generate new results...
*/
function ValidateResponse(data) {
    console.log(data)
    if (data.ok) {
        if (data.count > 0) {
           renderResult(data)
        } else {
            alert(data.error);
        }
    } 
    else {
        alert("youre a failure")
    }
};



function renderResult(listing) {
    console.log(listing)
}