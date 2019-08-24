var iterations = 0;

$(document).ready(function(){
    GetResult();
})

function GetResult() {
    iterations++;
    if (iterations == 20) {return}
    url = `${window.location.origin}/check/${ID}`
    $.ajax({
        url: url,
        dataType: 'JSON',
        success: (data) => {
            console.log("1")
            window.location.replace(`${window.location.origin}/listing/${ID}`)
        },
        error: (e) => {
            console.log(2)
            console.log(e);
            GetResult()
        }
    })
}