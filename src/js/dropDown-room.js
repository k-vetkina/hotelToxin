const { data } = require("jquery");

$('.dropDown__select').find('.dropDown__list .dropDown__list-option').each(function(){ // Проходим по всем .-option
  let data = { // Они содержат в себе атрибуты `data-`, получим их значения в массив:
    min: Number($(this).attr('data-min')),
    val: Number($(this).attr('data-val')) || 0,
    max: Number($(this).attr('data-max')),
    title: $(this).attr('data-title')
  };
  
  // Некая защита, чтобы не было значения больше максимального или меньше минимального.
  if(data.val <= data.min) data.val = data.min;
  if(data.val >= data.max) data.val = data.max;
  
  // Так как "изначальная" запись `.-option` у нас упрощённая, то мы наполняем её содержимым, для того же изменения значений.
  $(this).html('<div class="dropDown__subtitle">'+data.title+'</div>\
    <div class="-input">\
      <div class="dropDown__btn'+(data.val <= data.min ? ' --disabled' : '')+'" data-action="minus">-</div>\
      <div class="-value">'+data.val+'</div>\
      <div class="dropDown__btn'+(data.val >= data.max ? ' --disabled' : '')+'" data-action="plus">+</div>\
    </div>');
});

// Обработчик кнопок..
$('.dropDown__select').on('click', '.dropDown__btn', function(){
  if(!$(this).hasClass('--disabled')) { // Если кнопка не имеет "запрет" на себе, то работаем дальше..
    let action = $(this).attr('data-action'); // Получаем "действие" кнопки
    if(action === 'minus' || action === 'plus') { // Если это кнопка `-` или `+`, что находится в .-option, то
      let option = $(this).closest('.dropDown__list-option'), // Получаем этот самый .-option..
          data = { //.. и его data значения
            min: Number(option.attr('data-min')),
            val: Number(option.attr('data-val')),
            max: Number(option.attr('data-max')),
            step: Number(option.attr('data-step')) || 1
          };
      // Если нажат "минус", то отнимаем число равное step (если оно есть, если нет то step == 1), если "плюс", то прибавляем step. (аналог как у input[type=number]
      data.val = action === 'minus' ? data.val - data.step : data.val + data.step;
      // Тут та же защита, чтобы не вылезать за приделы min или max
      data.val = data.val < data.min ? data.min : data.val > data.max ? data.max : data.val;
      
      // Тут механика, которая "блокирует" кнопку, если value дошёл до min или max
      if(data.val > data.min && action === 'plus') 
        option.find('.dropDown__btn[data-action="minus"]').removeClass('--disabled');
      if(data.val <= data.min && action === 'minus') 
        option.find('.dropDown__btn[data-action="minus"]').addClass('--disabled');
      if(data.val < data.max && action === 'minus') 
        option.find('.dropDown__btn[data-action="plus"]').removeClass('--disabled');
      if(data.val >= data.max && action === 'plus') 
        option.find('.dropDown__btn[data-action="plus"]').addClass('--disabled');
        
      // Когда мы выше меняем value, то переписываем значения.
      option.attr('data-val', data.val);
      option.find('.-input .-value').text(data.val);
      // И если это дело меняется впервые, то мы показываем кнопку "Применить"
      if($('.dropDown__select').find('.dropDown__btn[data-action="apply"]').hasClass('--disabled')) $('.dropDown__select').find('.dropDown__btn[data-action="apply"]').removeClass('--disabled');
    }
    
    // Это действия кнопок "Очистить" и "Применить"
    if(action === 'clear' || action === 'apply') {
        if(action === 'clear') { // Если нажата "очистить", то мы всем -option ставим value = 0
        $('.dropDown__select').find('.dropDown__list .dropDown__list-option').attr('data-val', 0);
        $('.dropDown__select').find('.dropDown__list .dropDown__list-option .-value').text(0);
      }
        NumGuests(); // Если нажата какая-то из этих кнопок, то мы выполняем функцию ниже..
    }
  }
});

// ..Вот эту
function NumGuests() {
  // Это то самое, что выводим в "шапку селектора" сообщение о количестве "гостей".
    let text = 'Что входит в номер', output = {};
    
  // Проходим по всем .-option и получаем значение
  $('.dropDown__select').find('.dropDown__list .dropDown__list-option').each(function(){
    let val = Number($(this).attr('data-val'));     
      output[$(this).attr('data-type')] = val;
      if (val == 0) {
        delete output[$(this).attr('data-type')]//убрать из объекта  элемент
      }    

  });
  
  
  // Если удобств больше 0, то..

  
    /*if(output.brooms > 0) {
    
        text = output.brooms+' '+declOfNum(output.brooms, ['спальня', 'спальни', 'спален']) 
       }
      
        
    else if (output.beds > 0 ) {
      text = output.beds +' '+declOfNum(output.beds, ['кровать', 'кровати', 'кроватей']) 
        }

    else if (output.baths > 0 ) {
      text = output.baths +' '+declOfNum(output.baths, ['ванная', 'ванные', 'ванн'])
        

      $('.dropDown__select').find('.dropDown__btn[data-action="clear"]').removeClass('--disabled'); }*/   

    

    if(output.brooms > 0 || output.beds > 0 || output.baths > 0) {
      text = output.brooms+' '+declOfNum(output.brooms, ['спальня', 'спальни', 'спален']) + ',' + ' ' + output.beds +' '+declOfNum(output.beds, ['кровать', 'кровати', 'кроватей']) + ',' + ' ' + output.baths +' '+declOfNum(output.baths, ['ванная', 'ванные', 'ванн']) ;

      
    $('.dropDown__select').find('.dropDown__btn[data-action="clear"]').removeClass('--disabled'); // Показываем кнопку "Очистить"
  } 
  
  
  else {
    text = 'Что входит в номер'; // Дефолтное сообщение о количестве гостей, даём понять пользователю, что нужно заполнить этот "селектор"

    $('.dropDown__select').find('.dropDown__btn[data-action="clear"]').addClass('--disabled'); // Скрываем кнопку "Очистить", ибо зачем она нам, ведь гостей нет..
  }
  //
  $('.dropDown__select').find('.dropDown__label .dropDown__title').text(text);
  //$('.dropDown__select').attr('data-guests', total);
  $('.dropDown__select').find('.dropDown__btn[data-action="apply"]').addClass('--disabled'); // прячем кнопку "применить", ибо мы только что изменили данные
  //
  //console.clear();
  console.info(output); // Выходные данные в виде объекта
  $('.dropDown__select').find('.dropDown__output').val(JSON.stringify(output));} // Мы добавляем эти данные в input, который находится в теле селектора, предварительно "конвертим" объект в строку,  на сервере мы можем их распарсить.
 NumGuests();

// Этот код склоняет фразу `n гост[ь,я,ей]`, тем самым делая селектор "живее".
function declOfNum(number,titles){ 
  cases = [2,0,1,1,1,2]; 
  return titles[(number%100>4 && number%100<20) ? 2 : cases[(number%10<5) ? number%10 : 5]]; 
}

// Это обработчик открытия\закрытия дропменю
$('.dropDown__select .dropDown__label').on('click', function() {
    $('.dropDown__select').toggleClass('--drop');
    //$('.dropDown__arrowMore').toggleClass('arrowMore-active');

});

// А это обработчик закрытия дропменю, если клик был вне его области
$(document).mouseup(function(e){
  if(!$('.dropDown__select.--drop').is(e.target) && $('.dropDown__select.--drop').has(e.target).length === 0) $('.dropDown__select.--drop').removeClass('--drop');
});



