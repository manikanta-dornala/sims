import Params from './params';
let params = new Params();
let sliders = [];
function addSlider(id, min, max, step = 0.01) {
    let sliderElem = document.getElementById(id) as HTMLInputElement;
    if (sliderElem) {
        sliderElem.type = 'range';
        sliderElem.id = id;
        sliderElem.className = 'slider';
        sliderElem.value = params[id];
        sliderElem.min = min;
        sliderElem.max = max;
        sliderElem.step = step.toString();
        sliderElem.addEventListener('mouseup', function () {
            window.frames[0].params[id] = parseFloat(sliderElem.value);
        });
        sliders.push(sliderElem);
    }
}
addSlider('MaxIterations', 0, 4 * params.MaxIterations);
