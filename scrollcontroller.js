$(function() {
    var controller = new ScrollMagic.Controller();
    var blockTween = new TweenMax.to('#block', 1.5, {
        backgroundColor: 'red'
    });
    
    var containerScene = new ScrollMagic.Scene({
        triggerElement: '#container'
    })
    .setTween(blockTween)
    .addIndicators()
    .addTo(controller);
});

function changeToPredictor(){
    window.location.href = "Projects/JS-Neural-Network/color_predictor_demo/color_demo.html";
}

function changeToXOR(){
    window.location.href = "Projects/JS-Neural-Network/xor_demo/xor_demo.html";
}