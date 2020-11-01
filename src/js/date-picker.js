import datepicker from 'air-datepicker';

$(function(){

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
   //let confirmBtn = $('.datepicker--button[data-action=apply]')
   

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

$('.datesHosting__field').on('click', function() {  
    if ($el.is(':visible')) {    
       $('.arrowOpen').addClass('active')} 
       else {$('.arrowOpen').removeClass('active');}
      });

  
    
    
   

});


/*$('.arrowOpen').addClass('active');
  $(document).mouseup(function (e){
    let field = $('.datesHosting__field'); 
    if (!field.is(e.target)) {
     $('.arrowOpen').removeClass('active');}*/