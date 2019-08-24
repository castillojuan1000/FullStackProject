const api_key = '93jqxwkb7mqslat27k6yi91j';

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
    GenerateRequest()
    $('#etsy-search').bind('submit', function() {
        GenerateRequest()
        $('#etsy-images').empty();
        $('<p></p>').text('Searching for '+terms).appendTo('#etsy-images');
        return false;
    })
    setupRedirect();
})


/*
For some stupid reason the Etsy API provides more information about a listing in the search endpoint
as apposed to the search item by id... I found a jquery plugin to redirect to a post request
with a object of relevent info to listing page//
*/
/* function setupRedirect() {
    $(document).on('click', '.item-container', function(){
        let item_dict = listings[$(this).attr('id')]
        $.redirect(
            `${window.location.origin}/listing/${$(this).attr('id')}`, item_dict
        )
    })
} */
function setupRedirect() {
    $(document).on('click', '.item-container', function(){
        let item_dict = listings[$(this).attr('id')]
        url = `${window.location.origin}/listing/${$(this).attr('id')}`
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(item_dict),
            success: function(data) {
                console.log(1)
                console.log(2)
            }
        })
    })
}
/*
Get the search terms from the bar and generate a url
*/
function GenerateRequest() {
    //terms = $('#etsy-terms').val();
    terms = 'tshirts';
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
                <a href="${window.location.origin}/loading/${current.listing_id}" target="_blank">
                <img src="${current.Images[0].url_170x135}"></img>
                <h1>${current.title}</h1>
                <h3>${current.price}</h3>
                </a>
            </div>`
        img_url = current.Images[0].url_170x135;
        var regex = /170x135/gi;
        img_url = img_url.replace(regex, '570xN')
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
            color: current.Images[0].hex_code,
            title: current.title,
            price: current.price,
            image: img_url,
            url : current.url}
        renderResults(results_html[largest_id]);
    
    }
};



/*
render here
*/
function renderResults(item) {
    $('#etsy-images').append(item);
} 
