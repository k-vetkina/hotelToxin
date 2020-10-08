
$('.select').find('.select-list .select-option').each(function(){ // Проходим по всем .-option
  let data = { // Они содержат в себе атрибуты `data-`, получим их значения в массив:
    min: Number($(this).attr('data-min')),
    val: Number($(this).attr('data-val')) || 0,
    max: Number($(this).attr('data-max'))
  };
  
  // Некая защита, чтобы не было значения больше максимального или меньше минимального.
  if(data.val <= data.min) data.val = data.min;
  if(data.val >= data.max) data.val = data.max;
  
  // Так как "изначальная" запись `.-option` у нас упрощённая, то мы наполняем её содержимым, для того же изменения значений.
  $(this).html('<div class="select-title">'+$(this).attr('data-title')+'</div>\
    <div class="select-input">\
      <div class="select-button'+(data.val <= data.min ? ' --disabled' : '')+'" data-action="minus">-</div>\
      <div class="select-value">'+data.val+'</div>\
      <div class="select-button'+(data.val >= data.max ? ' --disabled' : '')+'" data-action="plus">+</div>\
    </div>');
});

// Обработчик кнопок..
$('.select').on('click', '.select-button', function(){
  if(!$(this).hasClass('--disabled')) { // Если кнопка не имеет "запрет" на себе, то работаем дальше..
    let action = $(this).attr('data-action'); // Получаем "действие" кнопки
    if(action === 'minus' || action === 'plus') { // Если это кнопка `-` или `+`, что находится в .-option, то
      let option = $(this).closest('.select-option'), // Получаем этот самый .-option..
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
        option.find('.select-button[data-action="minus"]').removeClass('--disabled');
      if(data.val <= data.min && action === 'minus') 
        option.find('.select-button[data-action="minus"]').addClass('--disabled');
      if(data.val < data.max && action === 'minus') 
        option.find('.select-button[data-action="plus"]').removeClass('--disabled');
      if(data.val >= data.max && action === 'plus') 
        option.find('.select-button[data-action="plus"]').addClass('--disabled');
        
      // Когда мы выше меняем value, то переписываем значения.
      option.attr('data-val', data.val);
      option.find('.select-input .select-value').text(data.val);
      // И если это дело меняется впервые, то мы показываем кнопку "Применить"
      if($('.select').find('.select-button[data-action="apply"]').hasClass('--disabled')) $('.select').find('.select-button[data-action="apply"]').removeClass('--disabled');
    }
    
    // Это действия кнопок "Очистить" и "Применить"
    if(action === 'clear' || action === 'apply') {
        if(action === 'clear') { // Если нажата "очистить", то мы всем -option ставим value = 0
        $('.select').find('.select-list .select-option').attr('data-val', 0);
        $('.select').find('.select-list .select-option .select-value').text(0);
      }
        NumGuests(); // Если нажата какая-то из этих кнопок, то мы выполняем функцию ниже..
    }
  }
});

// ..Вот эту
function NumGuests() {
  // Это то самое, что выводим в "шапку селектора" сообщение о количистве "гостей".
    let guests = 0, text = '', output = {};
  // Проходим по всем .-option и получаем значение
  $('.select').find('.select-list .select-option').each(function(){
    let val = Number($(this).attr('data-val')) || 0;
    output[$(this).attr('data-title')] = val;
    guests += val; // Прибавляем к guests
  });
  
  // Если гостей больше 0, то..
  if(guests > 0) {
    text = guests+' '+declOfNum(guests, ['гость', 'гостя', 'гостей']); // Оформляем сообщение
    $('.select').find('.select-button[data-action="clear"]').removeClass('--disabled'); // Показываем кнопку "Очистить"
  } else {
    text = 'Сколько гостей'; // Дефолтное сообщение о количистве гостей, даём понять пользователю, что нужно заполнить этот "селектор"
    $('.select').find('.select-button[data-action="clear"]').addClass('--disabled'); // Скрываем кнопку "Очистить", ибо зачем она нам, ведь гостей нет..
  }
  //
  $('.select').find('.select-label .select-title').text(text);
  $('.select').attr('data-guests', guests);
  $('.select').find('.select-button[data-action="apply"]').addClass('--disabled'); // прячем кнопку "применить", ибо мы только что изменили данные
  //
  console.clear();
  console.info(output); // Выходные данные в виде объекта
  $('.select').find('.select-output').val(JSON.stringify(output)); // Мы добавляем эти данные в input, который находится в теле селектора, предварительно "конвертим" объект в строку,  на сервере мы можем их распарсить.
} NumGuests();

// Этот код склоняет фразу `n гост[ь,я,ей]`, тем самым делая селектор "живее".
function declOfNum(number,titles){ 
  cases = [2,0,1,1,1,2]; 
  return titles[(number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5]]; 
}

// Это обработчик открытия\закрытия дропменю
$('.select .select-label').on('click', function() {
    $('.select').toggleClass('--drop');
});

// А это обработчик закрытия дропменю, если клик был вне его области
$(document).mouseup(function(e){
  if(!$('.select.--drop').is(e.target) && $('.select.--drop').has(e.target).length === 0) $('.select.--drop').removeClass('--drop');
});

//Цвет стрелки остается opacity 1 после нажатия
$('.select .select-label').on('click',function(){
  $('.select-arrow').toggleClass('active');
  
});


