

let ulTag = document.querySelector(".pagination__list");
let totalPages = 15;


function elemes(totalPages, page){
let liTag = '';
let activeLi;
let beforePages = page - 1;
let afterPages = page + 1;
if(page > 1) {
liTag += `<li class="pagination__item pagination__btnPrev" onclick="elemes(totalPages, ${page - 1})">
<svg class="pagination__arrow" transform='rotate(180)'>
  <use xlink:href="#iconArrow"></use>
</svg>  
</li>`; 

}

for(let pageLength = beforePages; pageLength <= afterPages; pageLength++ ) {
  if(page == pageLength) {
    activeLi = "active"; 
   } else {
    activeLi = '';
   }
  liTag += `<li class="pagination__item pagination__numb ${activeLi}"><span class="pagination__val">${pageLength}</span></li>`
}

if(page < totalPages) {
  liTag += `<li class="pagination__item pagination__btnNext" onclick="elemes(totalPages, ${page + 1})">
  <svg class="pagination__arrow">
    <use xlink:href="#iconArrow"></use>
  </svg>  
  </li>`; 
  
  }
  ulTag.innerHTML = liTag;

};

elemes(totalPages, 5);


