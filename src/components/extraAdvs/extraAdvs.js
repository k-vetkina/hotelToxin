$(".dropdownList .dropdownList__header").on('click', function() {
  if($('.dropdownList__ul').is(":hidden")) {
    $(".dropdownList__ul").slideDown();
    $('.arrowMore').addClass('arrowMore-active');}
    else {
      $(".dropdownList__ul").slideUp();
    $('.arrowMore').removeClass('arrowMore-active');}
    });  
 

  

  /*$('.fieldInput-start').on('click', function(){
    $('.arrowMore-dateDropDown').addClass('arrowMore-active')
  });*/
  

  /*$(".dropdownList .dropdownList__ul").slideToggle();
  if ($('.dropdownList__ul').style.display = 'block') {
    $('.arrowMore').addClass('arrowMore-active');
} else 
  {$('.arrowMore').removeClass('arrowMore-active') }*/