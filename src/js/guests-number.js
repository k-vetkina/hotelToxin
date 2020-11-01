
$('.guestHosting__select').find('.guestHosting__list .guestHosting__list-option').each(function(){ // Проходим по всем .-option
  let data = { // Они содержат в себе атрибуты `data-`, получим их значения в массив:
    min: Number($(this).attr('data-min')),
    val: Number($(this).attr('data-val')) || 0,
    max: Number($(this).attr('data-max'))
  };
  
  // Некая защита, чтобы не было значения больше максимального или меньше минимального.
  if(data.val <= data.min) data.val = data.min;
  if(data.val >= data.max) data.val = data.max;
  
  // Так как "изначальная" запись `.-option` у нас упрощённая, то мы наполняем её содержимым, для того же изменения значений.
  $(this).html('<div class="guestHosting__subtitle">'+$(this).attr('data-title')+'</div>\
    <div class="-input">\
      <div class="changeState__btn'+(data.val <= data.min ? ' --disabled' : '')+'" data-action="minus">-</div>\
      <div class="-value">'+data.val+'</div>\
      <div class="changeState__btn'+(data.val >= data.max ? ' --disabled' : '')+'" data-action="plus">+</div>\
    </div>');
});

// Обработчик кнопок..
$('.guestHosting__select').on('click', '.changeState__btn', function(){
  if(!$(this).hasClass('--disabled')) { // Если кнопка не имеет "запрет" на себе, то работаем дальше..
    let action = $(this).attr('data-action'); // Получаем "действие" кнопки
    if(action === 'minus' || action === 'plus') { // Если это кнопка `-` или `+`, что находится в .-option, то
      let option = $(this).closest('.guestHosting__list-option'), // Получаем этот самый .-option..
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
        option.find('.changeState__btn[data-action="minus"]').removeClass('--disabled');
      if(data.val <= data.min && action === 'minus') 
        option.find('.changeState__btn[data-action="minus"]').addClass('--disabled');
      if(data.val < data.max && action === 'minus') 
        option.find('.changeState__btn[data-action="plus"]').removeClass('--disabled');
      if(data.val >= data.max && action === 'plus') 
        option.find('.changeState__btn[data-action="plus"]').addClass('--disabled');
        
      // Когда мы выше меняем value, то переписываем значения.
      option.attr('data-val', data.val);
      option.find('.-input .-value').text(data.val);
      // И если это дело меняется впервые, то мы показываем кнопку "Применить"
      if($('.guestHosting__select').find('.changeState__btn[data-action="apply"]').hasClass('--disabled')) $('.guestHosting__select').find('.changeState__btn[data-action="apply"]').removeClass('--disabled');
    }
    
    // Это действия кнопок "Очистить" и "Применить"
    if(action === 'clear' || action === 'apply') {
        if(action === 'clear') { // Если нажата "очистить", то мы всем -option ставим value = 0
        $('.guestHosting__select').find('.guestHosting__list .guestHosting__list-option').attr('data-val', 0);
        $('.guestHosting__select').find('.guestHosting__list .guestHosting__list-option .-value').text(0);
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
  $('.guestHosting__select').find('.guestHosting__list .guestHosting__list-option').each(function(){
    let val = Number($(this).attr('data-val')) || 0;
    output[$(this).attr('data-title')] = val;
    guests += val; // Прибавляем к guests
  });
  
  // Если гостей больше 0, то..
  if(guests > 0) {
    text = guests+' '+declOfNum(guests, ['гость', 'гостя', 'гостей']); // Оформляем сообщение
    $('.guestHosting__select').find('.changeState__btn[data-action="clear"]').removeClass('--disabled'); // Показываем кнопку "Очистить"
  } else {
    text = 'Сколько гостей'; // Дефолтное сообщение о количестве гостей, даём понять пользователю, что нужно заполнить этот "селектор"
    $('.guestHosting__select').find('.changeState__btn[data-action="clear"]').addClass('--disabled'); // Скрываем кнопку "Очистить", ибо зачем она нам, ведь гостей нет..
  }
  //
  $('.guestHosting__select').find('.guestHosting__label .guestHosting__subtitle').text(text);
  $('.guestHosting__select').attr('data-guests', guests);
  $('.guestHosting__select').find('.changeState__btn[data-action="apply"]').addClass('--disabled'); // прячем кнопку "применить", ибо мы только что изменили данные
  //
  console.clear();
  console.info(output); // Выходные данные в виде объекта
  $('.guestHosting__select').find('.guestHosting__output').val(JSON.stringify(output)); // Мы добавляем эти данные в input, который находится в теле селектора, предварительно "конвертим" объект в строку,  на сервере мы можем их распарсить.
} NumGuests();

// Этот код склоняет фразу `n гост[ь,я,ей]`, тем самым делая селектор "живее".
function declOfNum(number,titles){ 
  cases = [2,0,1,1,1,2]; 
  return titles[(number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5]]; 
}

// Это обработчик открытия\закрытия дропменю
$('.guestHosting__select .guestHosting__label').on('click', function() {
    $('.guestHosting__select').toggleClass('--drop');
});

// А это обработчик закрытия дропменю, если клик был вне его области
$(document).mouseup(function(e){
  if(!$('.guestHosting__select.--drop').is(e.target) && $('.guestHosting__select.--drop').has(e.target).length === 0) $('.guestHosting__select.--drop').removeClass('--drop');
});

//Цвет стрелки остается opacity 1 после нажатия
$('.guestHosting__select .guestHosting__label').on('click',function(){
  $('.arrowOpen-guests').toggleClass('active');
  
});


