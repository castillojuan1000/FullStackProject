// PROFILE USER BOTTONS 
const overviewBtn = document.getElementById('overview');
const accountSettingsBtn = document.getElementById('account-settings');
const wishListBtn = document.getElementById('wish-list');
const likedGiftsBtn = document.getElementById('liked-gifts');


// PROFILE CONTENT 
const overviewContent = document.getElementById("overview-content");
const accountSettingsContent = document.getElementById("accountSettings-content");
const wishListContent = document.getElementById('wishList-content');
const likedGiftsContent = document.getElementById('likedGifts-content');

const profileContentBtns = [overviewBtn, accountSettingsBtn, wishListBtn, likedGiftsBtn];

//UserID passed from the backend in an HTML element
const userId = Number(document.querySelector('#userName').getAttribute('data-userId'));


overviewBtn.addEventListener('click', function (event) {
  event.preventDefault();
  //add display=none to the content not selected 
  overviewContent.style.display = 'block';
  accountSettingsContent.style.display = "none";
  wishListContent.style.display = "none";
  likedGiftsContent.style.display = "none";

  //adding and removing class='active' to Bottons
  profileContentBtns.map(button => {
    if (button.classList.contains('active')) {
      return button.classList.remove('active');

    }
    return;
  })

  overviewBtn.classList.add("active");


  getuserSurveys(userId).then(surveys => {
    console.log(surveys)
  })
})


accountSettingsBtn.addEventListener('click', function (event) {
  event.preventDefault();

  //add display=none to the content not selected 
  overviewContent.style.display = 'none';
  accountSettingsContent.style.display = "block";
  wishListContent.style.display = "none";
  likedGiftsContent.style.display = "none";

  //adding and removing class='active' to Bottons
  profileContentBtns.map(button => {
    if (button.classList.contains('active')) {
      return button.classList.remove('active');

    }
    return;
  })

  accountSettingsBtn.classList.add("active");

})




wishListBtn.addEventListener('click', function (event) {
  event.preventDefault();

  //add display=none to the content not selected 
  overviewContent.style.display = 'none';
  accountSettingsContent.style.display = "none";
  wishListContent.style.display = "block";
  likedGiftsContent.style.display = "none";

  //adding and removing class='active' to Bottons
  profileContentBtns.map(button => {
    if (button.classList.contains('active')) {
      return button.classList.remove('active');

    }
    return;
  })

  wishListBtn.classList.add("active");


})





likesContainer = document.getElementById('likesContainer');
likedGiftsBtn.addEventListener('click', function (event) {
  event.preventDefault();
  //add display=none to the content not selected 
  overviewContent.style.display = 'none';
  accountSettingsContent.style.display = "none";
  wishListContent.style.display = "none";
  likedGiftsContent.style.display = "block";

  //adding and removing class='active' to Bottons
  profileContentBtns.map(button => {
    if (button.classList.contains('active')) {
      return button.classList.remove('active');
    }
    return;
  })
  likedGiftsBtn.classList.add("active");

  getUserLikes(userId).then(likes => {
    return likesContainer.innerHTML = likes.data.getUserLikes.map(like => {
      return `
      <div class="card" style="width: 18rem;">
      <img src="${like.imgUrl}" class="card-img-top" alt="..." style="height: 23vh">
      <div class="card-body">
        <h5 class="card-title" style="font-weight:bold">${like.title}</h5>
        <h5 class="card-title">Listing ID: ${like.listingId}</h5>
        <h5 class="card-title" style="font-weight: bold">$${like.price}</h5>


      </div>
    </div>
      `
    }).join("")
  })
})


//! 






