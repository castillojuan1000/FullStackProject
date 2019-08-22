const api_key = 'API_KEY_HERE';


//API pagination vars
var COUNT_PER_PAGE; //results returned at once
var total_count; // total results available
let page_number; // current page number


//platform pagination variables
let largest_id = 0;  // last item rendered
let results_html = {}; //store key pairs EX: {1 : <div><h1>TSHIRT</h1></div>}
let listings = {}; //additional information

/*
On page load bind the search bar with the request function
*/
$(document).ready(function() {
    $('#etsy-search').bind('submit', function() {
        GenerateRequest()
        $('#etsy-images').empty();
        $('<p></p>').text('Searching for '+terms).appendTo('#etsy-images');
        return false;
    })
})


/*
Get the search terms from the bar and generate a url
*/
function GenerateRequest() {
    terms = $('#etsy-terms').val();
    etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords="+
        terms+"&limit=12&includes=Images:1&api_key="+api_key;
    return SearchEtsy(etsyURL);
}


/*
Create a Request to etsy using jquery ajax
datatype has to be jsonp due to issues with cross origin requests and brower nonsense
all responses will be a 200 so data has to be validated
*/
function SearchEtsy(etsyURL){
    $.ajax({
        url: etsyURL,
        dataType: 'jsonp',
        success: function(data) {
            ValidateResponse(data)
        }
    })
};


/*
if data object[ok] == True then continue
empty old search results and generate new results...
*/
function ValidateResponse(data) {
    if (data.ok) {
        $('#etsy-images').empty();
        if (data.count > 0) {
           generateResults(data)
            }
        else {
            $('#etsy-images').empty();
            alert(data.error);
            }
        } 
    else {
        $('<p>No results.</p>').appendTo('#etsy-images');
        }
};



/*
object is iterated through and to create a list of elements...
then it is passed to the render function...
*/
function generateResults(result){
    let items = result.results
    for (i = 0; i < items.length; i++) {
        largest_id++;
        let current = items[i]
        results_html[largest_id] = `
            <div class="item-container" id="${current.listing_id}">
                <img src="${current.Images[0].url_170x135}"></img>
                <h1><a href="${current.url}">${current.title}</a></h1>
                <h3>${current.price}</h3><span>${current.quantity}</span>
                <p>${current.description}</p>
            </div>`
        listings[current.listing_id] = {
            category_id : current.category_id, 
            category_path: current.category_path, 
            has_variations: current.has_variations, 
            is_customizable: current.is_customizable,
            materials : current.materials, 
            user_id: current.user_id,
            occasion: current.occasion,
            tags: current.tags,
            style: current.style,
            color: current.Images[0].hex_code}
        renderResults(results_html[largest_id]);
    
    }
};



/*
render here
*/
function renderResults(item) {
    $('#etsy-images').append(item);
} 
