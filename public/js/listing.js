const api_key = '93jqxwkb7mqslat27k6yi91j';
let images = {};


let largest_id = 0;  // last item rendered
let results_html = {}; //store key pairs EX: {1 : <div><h1>TSHIRT</h1></div>}
let listings = {}; //additional information
let username;
var description;

$(document).ready(function() {
    GetListingImages();
    renderTags();
    renderDescription();
    GetUserProfile();
    GetShopProfile()
})



function renderDescription(){
    description = info.description
        .replace(/(?:\r\n|\r|\n)/g, '<br>')
        .replace(/\n/g, "<br />")
        .replace(/\\r\\n/g, "<br>");
    $('.description').html(description);
}

/*
Create a Request to etsy using jquery ajax
datatype has to be jsonp due to issues with cross origin requests and brower nonsense
all responses will be a 200 so data has to be validated
*/
function renderTags(){
    let tags_html = '';
    let itter;
     (info.tags.length > 5) ? itter = 5 : itter = info.tags.length
    for (i = 0; i < itter; i++){
        tags_html += `<div class="tag">#${info.tags[i]}</div>`
    }
    $('.tag-holder').html(tags_html);
}

function GetListingImages(){
    let ITEM_URL = `https://openapi.etsy.com/v2/listings/${info.listing_id}/images.js?api_key=${api_key}`
    $.ajax({
        url: ITEM_URL,
        dataType: 'JSONP',
        success: (data) => {
            ValidateResponse(data)
        }
    })
};

function GetUserProfile() {
    let url = `https://openapi.etsy.com/v2/users/${info.user_id}.js?api_key=${api_key}`
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            if (data.ok) {
                if (data.count > 0){
                    buildUserProfile(data)
                    }
            }
        }
    })
}

function GetShopProfile() {
    let url = `https://openapi.etsy.com/v2/shops/listing/${info.listing_id}.js?api_key=${api_key}`
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            if (data.ok) {
                if (data.count > 0){
                    console.log(data)
                    buildShopProfile(data)
                    }
            }
        }
    })
}

function GetRelatedListings(shop_id) {
    let url = `https://openapi.etsy.com/v2/shops/${shop_id}/listings/active/.js?&includes=Images:1&api_key=93jqxwkb7mqslat27k6yi91j`
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            if (data.ok) {
                if (data.count > 0){
                    console.log(data)
                    buildRelatedItems(data);
                    }
            }
        }
    })
}


function buildRelatedItems(result){
    let items = result.results;
    for (i = 0; i < items.length; i++) {
        
        largest_id++;
        let current = items[i];
        if(!current.error_messages && current.price){
            results_html[largest_id] = `
                <div class="item-container" id="${current.listing_id}">
                    <a href="${window.location.origin}/loading/${current.listing_id}" target="_blank">
                    <img src="${current.Images[0].url_170x135}"></img>
                    <h1>${current.title}</h1>
                    <h3>$${current.price}</h3>
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
            $('.shop-profile').append(results_html[largest_id]);
        }
    }
};


function buildShopProfile(data){
    let shop = data.results[0];
    let name;
    //console.log(shop)
    let shop_info = shop.announcement
    if (shop_info) {
        shop_info.replace(/(?:\r\n|\r|\n)/g, '<br>')
        .replace(/\*\*(\S(.*?\S)?)\*\*/gm, '<strong>$1</strong>')
        .replace(/\*/g,'');
    }
    else {
        shop_info = description;
    }
    (shop.shop_name) ? name = shop.shop_name : username;
    $('.user-img').html(`<img src="${data.results[3].image_url_75x75}"></img`)
    $('.display-4').text(shop.shop_name)
    $('.lead').html(shop_info)
    GetRelatedListings(shop.shop_id);
}

function buildUserProfile(data) {
    let user = data.results[0];
    username = user.login_name;
    console.log(user.feedback_info)
    getStarRaiting(user.feedback_info);
    $('.username').html(`<h3>${user.login_name}</h3`)

}

function getStarRaiting(info){
    var star_html = '';
    score = info.score
    for (let i = 0; i < 5; i++){
        let star;
        (score >= 15) ? star = 'fa-star' : undefined;
        (score >= 5 & score < 15) ? star = 'fa-star-half-o' : undefined;
        (score < 5) ? star = 'fa-star-o' : undefined;
        star_html += `<div class="star"><i class="fa ${star}"></i></div>`
        score -= 20;
    }
    star_html += `<div><h4>(${info.count})</h4></div>`
    $('.star-container').html(star_html);
}

/*
if data object[ok] == True then continue
empty old search results and generate new results...
*/
function ValidateResponse(data) {
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

function controlCaroursel(){
    $('.img-wrapper').first().addClass('active');
    $('.carousel-control-next').click(() =>{
        //let current_img = $('.img-wrapper.active').attr('value');
        
        let current = $('.carousel-item.active')
        let current_id = $(current).attr('id');
        current.removeClass('active')
        let next = ($('.carousel-item').length -1 > current_id++) ? current_id++ : 0;
        $('.img-wrapper').removeClass('active');
        $(`#wrapper-${next}`).addClass('active');
        $(`.carousel-inner #${next}`).addClass('active');
        $('.carousel-indicators li').removeClass('active');
        $(`#${next}-indicator`).addClass('active');
    })
    $('.carousel-control-prev').click(() =>{
        let current = $('.carousel-item.active')
        let current_id = $(current).attr('id');
        current.removeClass('active')
        let prev = (current_id-- > 0) ? current_id-- : $('.carousel-item').length -1;
        $('.img-wrapper').removeClass('active');
        $(`#wrapper-${prev}`).addClass('active');
        $(`.carousel-inner #${prev}`).addClass('active');
        $('.carousel-indicators li').removeClass('active');
        $(`#${prev}-indicator`).addClass('active');
    })
    $('.img-wrapper').click(function (){
        if (! $(this).hasClass('active')) {
            let current_id = $(this).attr('value');
            $('.img-wrapper').removeClass('active');
            $('.carousel-item').removeClass('active');
            $(`.carousel-inner #${current_id}`).addClass('active');
            $('.carousel-indicators li').removeClass('active');
            $(`#${current_id}-indicator`).addClass('active');
            $(this).addClass('active');
            //alert($(this).attr('value'));
        }
    })
    $('.carousel-indicators li').click(function (){
        if (! $(this).hasClass('active')) {
            let current_id = $(this).attr('value');
            $('.img-wrapper').removeClass('active');
            $('.carousel-item').removeClass('active');
            $(`.carousel-inner #${current_id}`).addClass('active');
            $('.carousel-indicators li').removeClass('active');
            $(`#wrapper-${current_id}`).addClass('active');
            $(this).addClass('active');
        }
    })
    $(document).on('click', '.carousel-item img', function(){
        let current_id = $(this).parent().attr('id');
        $(`#${current_id}-modal`).modal('show');
    })
    $(document).on('click', '.modal-backdrop', function(){
        let modal_id =  $('.modal.show').attr('id');
        $(`#${modal_id}`).modal('hide')
        $('.modal.show').modal('hide');
    })
}


function createModal(id, url){
    $('body').append(`
    <div class="modal fade" id="${id}-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="modal-close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
    <div class="modal-body">
    <img src="${url}"></img>
    </div>
    <div class="modal-dialog"></div>
    </div>
    `)
}


function renderResult(listing) {
    listing = listing.results;
    console.log(listing)
    for (i = 0; i < listing.length; i++){
        createModal(i, listing[i].url_fullxfull)
        let active = (i == 0) ? 'active' : ''
        $('.images').append(`
            <div class='img-wrapper' id="wrapper-${i}" value="${i}">
                <img src="${listing[i].url_75x75}"></img>
            </div>`)
        $('.carousel-indicators').append(`<li id=${i}-indicator value="${i}" class="${active}"></li>`)
        $('.carousel-inner').append(`
        <div class="carousel-item ${active}" id="${i}">
            <img class="d-block w-100" src="${listing[i].url_570xN}">
        </div>
        `)
    }
    controlCaroursel();
}