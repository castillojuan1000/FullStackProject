

const burger = document.querySelector('#nav-menu');
const menuIcon = document.getElementById('menuIcon');
let isMenuOpen = false

burger.addEventListener('click', (e) => {
    const navBar = document.querySelector('nav');
    isMenuOpen = !isMenuOpen;
    menuIcon.innerHTML = isMenuOpen ? '&#xf00d' : '&#xf0c9;'
    navBar.classList.toggle('nav-Open');
});


document.addEventListener('DOMContentLoaded', () => {
    const giftReceiver = document.querySelector('#giftReceiver')
    const receivers = ['Dad', 'Mom', 'Sister', 'Brother', 'Friend', 'Significant Other']
    var loopCompleted = 0;
    try {
        anime({
            targets: '#giftReceiver',
            translateY: 50,
            direction: 'reverse',
            opacity: 0,
            duration: 1500,
            delay: 2500,
            loop: true,
            loopBegin: function (anim) {
                giftReceiver.textContent = `${receivers[loopCompleted]}`
            },
            loopComplete: function (anim) {
                if (loopCompleted === receivers.length - 1) {
                    loopCompleted = 0
                } else {
                    loopCompleted++
                }
            }
        })
    } catch (error) {
        console.log("Not in welcome page");
    }
})











