import datepicker from 'air-datepicker';

$(function(){
  let confirmBtn = $('.datepicker--button[data-action="apply"]')

$('.datepicker-here').datepicker({
  range: true,
  clearButton: true,
  
  

  prevHtml: '<svg class="arrow" transform=rotate(180)><use xlink:href="#iconArrow"></use></svg>',
  nextHtml: '<svg class="arrow"><use xlink:href="#iconArrow"></use></svg>',

  navTitles: {
    days: 'MM <i>yyyy</i>',
    months: 'yyyy',
    years: 'yyyy1 - yyyy2'
},

onShow: function (dp, animationCompleted) {
   
   

  if (!animationCompleted) {
    
   if (dp.$datepicker.find('.datepicker--button[data-action=apply]').html()===undefined) { 
   $('.datepicker--buttons').append('<span class="datepicker--button"  data-action="apply">Применить</span>');
   dp.$datepicker.find('.datepicker--button[data-action=apply]').click(function(event) {
      dp.hide();
        });
     }
   }
  },  
  
});

//Разделяем даты на 2 инпута
$('.datesHosting__field').datepicker({ 
  onSelect: function (fd, d, picker) { 
    $(".datesHosting__field").val(fd.split("-")[0]);
    $(".datesHosting__fieldEnd").val(fd.split("-")[1]);
  }
});

$('.datesHosting__field').on('click', function(){
  $('.arrowMore').addClass('arrowMore-active')
});

$(document).mouseup(function(e){
  const field = $(".datesHosting__field"),
  datepicker = $(".datepicker"),
  datepickerCh = $(".datepicker").find('.datepicker--button[data-action=apply]');
  if (!field.is(e.target)
  && field.has(e.target).length === 0
  && !datepicker.is(e.target)    
  && datepicker.not(datepickerCh).has(e.target).length === 0)

  //|| !confirmBtn.is(e.target)
   
   {$('.arrowMore').removeClass('arrowMore-active');
  }
});

  
    
    
   

});



  