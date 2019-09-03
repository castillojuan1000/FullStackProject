var iterations = 0;
const api_key = '93jqxwkb7mqslat27k6yi91j';

$(document).ready(function(){
    let split = window.location.href.split("/", );
    value = split[split.length -1]; 
    alert(value)
    GetResult();
})

function GetResult() {
    iterations++;
    if (iterations == 5) {
        GetListing();
    }
    if (iterations == 20) {return}
    url = `${window.location.origin}/check/${ID}`
    $.ajax({
        url: url,
        dataType: 'JSON',
        success: (data) => {
            data = JSON.parse(data)
            if (data.success == false) { 
                GetResult()
            }
            else{
                window.location.replace(`${window.location.origin}/listing/${ID}`)
            }
        },
        error: (e) => {
            console.log(2)
            console.log(e);
            GetResult()
        }
    })
}

function GetListing(){
    etsyURL = `https://openapi.etsy.com/v2/listings/${listing_id}/.js?&includes=Images:1&api_key=`+api_key;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            if (data.ok) {
                if (data.count > 0){
                    return PostData(data)
                    }
            }
        }
    })
}


function PostData(data){
    let current = data.results[0];
    let item  = {
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
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(item),
        success: function(data) {
            console.log(1)
            alert("success")
        }
    })
}