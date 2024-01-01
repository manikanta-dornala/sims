import Params from './params';
let params = new Params();
let sliders = [];
function addSlider(id, min, max) {
    let sliderElem = document.getElementById(id) as HTMLInputElement;
    if (sliderElem) {
        sliderElem.type = 'range';
        sliderElem.id = id;
        sliderElem.className = 'slider';
        sliderElem.value = params[id];
        sliderElem.min = min;
        sliderElem.max = max;
        sliderElem.step = '0.01';
        sliderElem.addEventListener('mouseup', function () {
            window.frames[0].params[id] = parseFloat(sliderElem.value);
        });
        sliders.push(sliderElem);
        var slideroutputElem = document.getElementById(id + 'Value');
        if (slideroutputElem) {
            slideroutputElem.innerHTML = sliderElem.value;
            sliderElem.oninput = function () {
                slideroutputElem.innerHTML = Math.floor(sliderElem.value);
            };
        }
    }
}
addSlider('Segments', 1, 24);
