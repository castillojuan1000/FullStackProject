//import { load } from "protobufjs";

const api_key = '93jqxwkb7mqslat27k6yi91j';
let loading = false;
//API pagination vars

var COUNT_PER_PAGE; //results returned at once
var total_count; // total results available
let page_number; // current page number


//platform pagination variables
let largest_id = 0;  // last item rendered
let results_html = {}; //store key pairs EX: {1 : <div><h1>TSHIRT</h1></div>}
let listings = {}; //additional information

/* 
let tags = '&tags=';
let categories = [];
(survey.vintage) ? tags += 'vintage' : '';
if (survey.gender == 'Male'){
    tags += ',men';
} else if (survey.gender == 'Female') {
    tags += ',women'
} else if (survey.gender == 'Child') {
    tags += ',children'
}
if 

params = {category= ['Art', 'Music', 'Candels'], tags = []}
 */

let category_lookup = {};
/*
On page load bind the search bar with the request function
*/
$(document).ready(function() {
    setupPriceSlider()
    GetCategories();
    GenerateRequest()
    setupRedirect();
    setupCategorySelection();
    setupPriceFilter();
    $('.toggle-btn').click(function(){
        $('.filter-section').toggleClass('hide-show');
    })
    $('.check-container').click(function(event){
       alert(0)
        let value = $(this).attr('value');
       event.preventDefault();
       $(this).prev('input').prop("checked", function(i, val){
           alert(1)
            return !val;
       })
       if ($(this).prev('input').prop("checked") == "checked") {
           alert(2)
       }
    })

    $(window).scroll(function() {
        if ($(window).scrollTop() > ($(document).height())*0.65 && loading==false){
            loading = true;
            GenerateRequest();
        }
    })
})

function setupPriceSlider() {
    $('.init').text(`$ ${survey.price[0]}`)
    $('.final').text(`$ ${survey.price[1]}`)
    $('#price-slider').attr('data-slider-max', survey.price[1])
    $('#price-slider').attr('data-slider-value', `[${survey.price[0]}, ${survey.price[1]}]`)
}

function setupPriceFilter(){
    $("#price-slider").slider({}).on('change', function(){
        var newvalue = $(this).attr('value').split(',');
        $('.init').text(`$ ${(newvalue[0])}`);
        $('.final').text(`$ ${newvalue[1] }`);
        FilterResults(newvalue[0], newvalue[1]);
    });
    $('.filter-section input').on('keyup', function(){
        let min = ($('.min-input').val()) ? $('.min-input').val() : survey.price[0];
        let max = $('.max-input').val() ? $('.max-input').val() : survey.price[1];
        if (min = 0) {min++;}
        console.log([parseInt(min),max])
       $('#price-slider').slider('setValue', [parseInt(min),parseInt(max)], true);
       FilterResults(parseInt(min),parseInt(max));
    }) 
}


function FilterResults(min, max){
    $('.item-container').each(function(){
        let id = $(this).attr('id');
        let price = $(`#${id} h3`).attr('value');
        if (price > max | price < min){
            $(this).addClass('hidden')
        }
        else if (price < max & price > min) {
            $(this).removeClass('hidden');
        }
    })

}

function setupCategorySelection(){
    $(document).on('click', '.list-group-item', function(){
        $(this).find('.fa').toggleClass('hidden')
    })
}

function GetCategories() {
    let url = 'https://openapi.etsy.com/v2/taxonomy/categories.js?api_key=93jqxwkb7mqslat27k6yi91j'
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            if (data.ok) {
                if (data.count > 0){
                    return renderCategories(data)
                    }
            }
        }
    })

}

function renderCategories(data){
    let categories = data.results;
    let cat_html = '';
    for (i = 0; i < categories.length; i++){
        category_lookup[categories[i].long_name] = categories[i].category_id
        cat_html += `<li class="list-group-item" id="${categories[i].category_id}"><span><i class="fa fa-check hidden"></i></span>${categories[i].long_name}</li>`
    }
    $('.cat-list').html(`<ul class="categories list-group">CATEGORIES${cat_html}</ul>`);
    return 
}


function setupRedirect() {
    $(document).on('click', '.item-container', function(){
        let item_dict = listings[$(this).attr('id')]
        let id = $(this).attr('id').toString();
        let base = window.location.origin.toString();
        let url = `${base}/listing/${id}`
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(item_dict),
            success: function(data) {
                console.log(1)
            }
        })
    })
}

/*
Get the search terms from the bar and generate a url
*/
function GenerateRequest() {
    //terms = $('#etsy-terms').val();
    terms = 'vintage';
    etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords="+
        terms+"&limit=50&includes=Images:1&api_key="+api_key;
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
            console.log(data)
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
function findVintage(is_vintage){
    let vintage = '';
    let vint_as_int =  parseInt(is_vintage.substring(0, is_vintage.length - 1));
    (is_vintage == 'before_2000') ? vintage = 'vintage' : '';

    if (vint_as_int < 1990) {
        vintage = 'vintage';
    }
    return vintage;
}


function generateResults(result){
    let items = result.results
    for (i = 0; i < items.length; i++) {
        
        largest_id++;
        let current = items[i]
        let handmade;
        let vintage;
        (current.who_made == 'i_did') ?  handmade = 'hand_made' : ""
        vintage = findVintage(current.when_made);

        console.log(vintage, handmade)
        results_html[largest_id] = `
            <div class="item-container ${handmade} ${vintage}" id="${current.listing_id}">
                <a href="${window.location.origin}/loading/${current.listing_id}" target="_blank">
                <img src="${current.Images[0].url_170x135}"></img>
                <h1>${current.title}</h1>
                <h3 value="${current.price}">$${current.price}</h3>
                </a>
            </div>`
        img_url = current.Images[0].url_170x135;
        var regex = /170x135/gi;
        img_url = img_url.replace(regex, '570xN')
        listings[current.listing_id] = {
            listing_id : current.listing_id,
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
            url : current.url,
            description: current.description,
            tags: current.tags,
            taxonomy_path: current.taxonomy_path,
        }
        renderResults(results_html[largest_id]);
    
    }
};



/*
render here
*/
function renderResults(item) {
    $('#etsy-images').append(item);
} 
