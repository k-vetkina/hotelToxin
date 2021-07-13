window.addEventListener('load', function () {

let ulTag = document.querySelector(".pagination__list");
let totalPages = 15;
let currentPage = 3;


function elemes(totalPages, currentPage){
let liTag = '';
let activeLi;
let beforePages = currentPage - 1;
let afterPages = currentPage + 1;
if(currentPage > 1) {
liTag += `<li class="pagination__btnPrev" data-pagination="-1">
<svg class="pagination__arrow" transform='rotate(180)'>
  <use xlink:href="#iconArrow"></use>
</svg>  
</li>`; 

}

if(currentPage > 2){ //if page value is less than 2 then add 1 after the previous button
  liTag += `<li class="pagination__item pagination__numb" data-pagination="first"><span class="pagination__val">1</span></li>`; 
  if(currentPage > 3){
    liTag += `<li class="pagination__item pagination__dots"><span class="pagination__val">...</span></li>`;}

}

if(currentPage == totalPages) {
  beforePages = beforePages - 1;
} else if(currentPage == totalPages - 1) {
  beforePages = beforePages;
}

if(currentPage == 1) {
  afterPages = afterPages + 1;
} else if(currentPage == 2) {
  afterPages = afterPages;
}

for(let pageLength = beforePages; pageLength <= afterPages; pageLength++ ) {
  if(pageLength > totalPages) {
    continue;
  }
  if(pageLength == 0) {
    pageLength = pageLength + 1;
  }

  if(currentPage == pageLength) {
    activeLi = "active"; 
   } else {
    activeLi = '';
   }
  liTag += `<li class="pagination__item pagination__numb ${activeLi}" data-pagination="${pageLength - currentPage}"><span class="pagination__val">${pageLength}</span></li>`
}

if(currentPage < totalPages - 1){ 

if(currentPage < totalPages - 2) {
  liTag += `<li class="pagination__item pagination__dots"><span class="pagination__val">...</span></li>`;}

  liTag += `<li class="pagination__item pagination__numb" data-pagination="last"><span class="pagination__val">${totalPages}</span></li>`; 

}

if(currentPage < totalPages) {
  liTag += `<li class="pagination__btnNext" data-pagination="1">
  <svg class="pagination__arrow">
    <use xlink:href="#iconArrow"></use>
  </svg>  
  </li>`; 
  
  }
  ulTag.innerHTML = liTag;
  

};

elemes(totalPages, currentPage);




ulTag.addEventListener('click', function(e) {
  e.preventDefault();
  let btn = e.target.closest('li'), 
  param = btn.dataset.pagination
    
  if(!btn || !param) return;
  
  switch(param){
    case 'first':
      currentPage = 1;
      break; 
    case 'last':
      currentPage = totalPages; 
      break;
    default:
      currentPage += +param;
  }   

   elemes(totalPages, currentPage)

});


});






