import datepicker from 'air-datepicker';

$(function(){

$('.dateBirth').datepicker({
  
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
   

});