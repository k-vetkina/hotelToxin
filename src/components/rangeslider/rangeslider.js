import * as noUiSlider from 'nouislider/distribute/nouislider.js';

const rangeSlider = document.getElementById('rangeslider');

 if(rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [2000, 15000],
    connect: true,
    step: 100,
    range: {
        'min': [2000],
        'max': [15000]
    }
});
 

 const input0 = document.getElementById('inputPrice0');
 const input1 = document.getElementById('inputPrice1');
 const inputs = [input0, input1];

 rangeSlider.noUiSlider.on('update', function(values,handle) {
     inputs[handle].value = Math.round(values[handle]);
 })

}