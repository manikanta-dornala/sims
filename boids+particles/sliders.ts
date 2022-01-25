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
addSlider('SeperationWeight', 0, 3 * params.SeperationWeight);
addSlider('CohesionWeight', 0, 1.3 * params.CohesionWeight);
addSlider('CohesionNeighborhood', 0, 2 * params.CohesionNeighborhood);
addSlider('AlignmentWeight', 0, 1.5 * params.AlignmentWeight);
addSlider('SphereOfInfluence', 0, 2 * params.SphereOfInfluence);
addSlider('DesiredSeperation', 0, 2 * params.DesiredSeperation);
addSlider('SimulationSpeed', 1, params.SimulationSpeed, 1);

function addNewboid(n) {}
