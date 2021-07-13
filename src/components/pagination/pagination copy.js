window.addEventListener('load', function () {

let ulTag = document.querySelector(".pagination__list");
let totalPages = 15;
let currentPage = 4;

let btnPrev = document.querySelector(".pagination__btnPrev");  
let btnNext = document.querySelector(".pagination__btnNext"); 



function element(totalPages, page){

let activeLi;
let beforePages = page - 1;
let afterPages = page + 1;
if(page > 1) { 

}

if(page > 2){ //if page value is less than 2 then add 1 after the previous button
  liTag += `<li class="pagination__item pagination__numb"><span class="pagination__val">1</span></li>`; 
  if(page > 3){
    liTag += `<li class="pagination__item pagination__dots"><span class="pagination__val">...</span></li>`;}

}

if(page == totalPages) {
  beforePages = beforePages - 1;
} else if(page == totalPages - 1) {
  beforePages = beforePages;
}

if(page == 1) {
  afterPages = afterPages + 1;
} else if(page == 2) {
  afterPages = afterPages;
}

for(let pageLength = beforePages; pageLength <= afterPages; pageLength++ ) {
  if(pageLength > totalPages) {
    continue;
  }
  if(pageLength == 0) {
    pageLength = pageLength + 1;
  }

  if(page == pageLength) {
    activeLi = "active"; 
   } else {
    activeLi = '';
   }
  liTag += `<li class="pagination__item pagination__numb ${activeLi}"><span class="pagination__val">${pageLength}</span></li>`
}

if(page < totalPages - 1){ 

if(page < totalPages - 2) {
  liTag += `<li class="pagination__item pagination__dots"><span class="pagination__val">...</span></li>`;}

  liTag += `<li class="pagination__item pagination__numb"><span class="pagination__val">${totalPages}</span></li>`; 

}

if(page < totalPages) {
  liTag += `<li class="pagination__btnNext" data-pagination="1">
  <svg class="pagination__arrow">
    <use xlink:href="#iconArrow"></use>
  </svg>  
  </li>`; 
  
  }
  //ulTag.innerHTML = liTag;
  

};

element(totalPages, currentPage);




/*ulTag.addEventListener('click', function(e) {
  e.preventDefault();

  let btn = e.target.closest('li'), 
    btnNumb = btn.classList.contains('active')
    btnPrev = btnNumb - 1,
    btnNext = btnNumb + 1,

    if (param) {
      currentPage = currentPage + +param} 
    else if (btnNumb) {
      
    }  
    
    //
    //console.log(btnPrev);
    /*btnNext = btnNumb + 1,
    param = btn.dataset.pagination;
  //if(!btn || !param) return;
  if (param) {
   currentPage = currentPage + +param} 
   else if (btnPrev) {currentPage = currentPage + 1}
   else if (btnNext) {currentPage = currentPage - 1}
   //else if (currentPage <= 0) {currentPage = 1}
   element(totalPages, currentPage)*

});*/


});

//




