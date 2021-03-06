//let counter = 0;
let likeBtn = $('.likeBtn');
let newBtn = $('.newBtn');
 


newBtn.on('click', function(){
  let newValue;
  let currentValue = +likeBtn.value;
  //console.log(currentValue);
  
  if (likeBtn.hasClass('likeBtn-active')) {
  likeBtn.removeClass('likeBtn-active');
  newValue = currentValue - 1;
}
else {likeBtn.addClass('likeBtn-active')
newValue = currentValue + 1;

}
 });