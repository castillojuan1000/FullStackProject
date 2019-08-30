
const giftReceiver = document.querySelector('#giftReceiver')
const receivers = ['Dad', 'Mom', 'Sister', 'Brother', 'Friend', 'Significant Other']
var loopCompleted = 0;

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





