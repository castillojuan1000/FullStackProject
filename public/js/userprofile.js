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
})


//! 






