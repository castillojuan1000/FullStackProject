const giftReceiver = document.querySelector('#giftReceiver')
const receivers = ['Dad', 'Mom', 'Sister', 'Brother', 'Friend', 'Significant Other']
var loopCompleted = 0;

anime({
    targets: '#giftReceiver',
    opacity: '0.1',
    easing: 'linear',
    duration: 1500,
    loop: true,
    changeBegin: function (anim) {
        if (loopCompleted === receivers.length - 1) {
            loopCompleted = 0
        } else {
            loopCompleted++
        }
    },
    changeComplete: function (anim) {
        giftReceiver.textContent = receivers[loopCompleted]
    }
})