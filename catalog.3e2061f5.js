!function(){function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},n={},r=e.parcelRequire8a95;null==r&&((r=function(t){if(t in a)return a[t].exports;if(t in n){var e=n[t];delete n[t];var r={id:t,exports:{}};return a[t]=r,e.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){n[t]=e},e.parcelRequire8a95=r),r("i6wQM");var i=r("bpxeT"),o=r("2TvXO"),s=(r("bpxeT"),r("2TvXO"),r("8MBJY")),c=r("hKHmD"),u={pagination:document.getElementById("pagination"),catalogFilms:document.querySelector(".catalog-films")},l=(i=r("bpxeT"),o=r("2TvXO"),function(t){var e,a=t.map((function(t){return"<div data-id=".concat(t.id,' class="catalog-card">\n      <img src=\'https://image.tmdb.org/t/p/original').concat(t.poster,"' alt=\"").concat(t.title,'" loading="lazy" />\n      <div class="catalog-info">\n        <div>\n          <p class="catalog-info-name">\n            <b>').concat(t.title,'</b>\n          </p>\n          <p class="catalog-info-details">\n            <span>').concat(t.genres,'</span>\n            <span class="catalog-info-border" >').concat(t.date,'</span>\n          </p>\n        </div>\n        <div\n          class="Stars"\n          style="--rating: ').concat(t.rating/2,'"\n          aria-label="Rating of this product is 2.3 out of 5."\n        ></div>\n      </div>\n    </div>')})).join("");e=a,u.catalogFilms.innerHTML=e});var g,p=(g=t(i)(t(o).mark((function e(a){var n,r;return t(o).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,I();case 2:n=t.sent,r=a.map((function(t){var e=t.id,a=t.title,r=t.poster_path,i=t.vote_average,o=t.genre_ids,s=t.release_date;return{id:e,title:a,poster:r,rating:i,genres:d(n,o),date:f(s)}})),l(r);case 5:case"end":return t.stop()}}),e)}))),function(t){return g.apply(this,arguments)}),d=function(t,e){var a=[];return t.map((function(t){var n=t.id,r=t.name;-1!==e.indexOf(n)&&a.push(r)})),a.join(",")},f=function(t){return new Date(t).getFullYear()},v=function(t,e){try{var a=JSON.stringify(e);localStorage.setItem(t,a)}catch(t){console.error("Set state error: ",t.message)}},h=function(t){try{var e=localStorage.getItem(t);return null===e?void 0:JSON.parse(e)}catch(t){console.error("Get state error: ",t.message)}},m=function e(a,n,r){"use strict";var i=this;t(s)(this,e),t(c)(this,"createButton",(function(){if(i.totalPages<=1)i.reset();else{i.arrPaginationItems=[],i.addFirstPages(i.arrPaginationItems),i.totalPages>6&&(i.addEllipsisIfNeeded(i.arrPaginationItems),i.addMiddlePages(i.arrPaginationItems),i.addEllipsisIfNeeded(i.arrPaginationItems,!0),i.addLastPage(i.arrPaginationItems));var t=i.createPagination(i.arrPaginationItems.join(""));i.render(t),v("currentPage",i.currentPage),i.getMovies(i.currentPage)}})),t(c)(this,"addFirstPages",(function(t){for(var e=1;e<=Math.min(3,i.totalPages);e++){var a=i.currentPage===e?"btn-active":"",n=i.createPaginationItem(e,a);t.push(n)}})),t(c)(this,"addMiddlePages",(function(t){for(var e=Math.max(4,i.currentPage-2),a=Math.min(i.currentPage+1,i.totalPages-1),n=e;n<=a;n++){var r=i.currentPage===n?"btn-active":"",o=i.createPaginationItem(n,r);t.push(o)}})),t(c)(this,"addEllipsisIfNeeded",(function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];(e&&i.currentPage<i.totalPages-2||!e&&i.currentPage>3)&&t.push('<li class="pagination-item">...</li>')})),t(c)(this,"addLastPage",(function(t){var e=i.totalPages,a=i.currentPage===e?"btn-active":"",n=i.createPaginationItem(e,a);t.push(n)})),t(c)(this,"createPaginationItem",(function(t,e){return"<li class='pagination-item ".concat(e,"'>\n              <a href='#' data-page='").concat(t,"' class='pagination-btn'>").concat(t,"</a>\n            </li>")})),t(c)(this,"createPagination",(function(t){return"\n      <div class='pagination ".concat(i.totalPages<=1?"pagination-hidden":"","'>\n        <div class=\"pagination-arrows ").concat(i.totalPages<=1?"pagination-arrows-hidden":"","\">\n          <button type=\"button\" class='pagination-arrow pagination-arrows-prev'>prev</button>\n          <button type=\"button\" class='pagination-arrow pagination-arrows-next'>next</button>\n        </div>\n        <ul class='pagination-list'>").concat(t,"</ul>\n      </div>")})),t(c)(this,"render",(function(t){i.reset(),u.catalogFilms.insertAdjacentHTML("afterend",t);var e=document.querySelector(".pagination"),a=document.querySelector(".pagination");e.addEventListener("click",i.handlerBtn),a.addEventListener("click",i.arrowHandler),а;var n=document.querySelector(".pagination-arrow.pagination-arrows-prev");1===i.currentPage?n.style.display="none":n.style.display="block";var r=document.querySelector(".pagination-arrow.pagination-arrows-next");i.currentPage===i.totalPages?r.style.display="none":r.style.display="block"})),t(c)(this,"arrowHandler",(function(t){var e=t.target;e.classList.contains("pagination-arrows-prev")&&i.prev(),e.classList.contains("pagination-arrows-next")&&i.next()})),t(c)(this,"reset",(function(){var t=document.querySelector(".pagination");t&&t.remove()})),t(c)(this,"prev",(function(){if(1!==i.currentPage){i.currentPage-=1,i.createButton();var t=document.querySelector(".pagination-arrow.pagination-arrows-prev");1===i.currentPage?t.style.display="none":t.style.display="block"}})),t(c)(this,"next",(function(){if(i.currentPage!==i.totalPages){i.currentPage+=1,i.createButton();var t=document.querySelector(".pagination-arrow.pagination-arrows-next");i.currentPage===i.totalPages?t.style.display="none":t.style.display="block"}})),t(c)(this,"handlerBtn",(function(t){t.preventDefault();var e=parseInt(t.target.dataset.page);isNaN(e)||(i.currentPage=e,i.createButton())})),this.totalPages=a,this.currentPage=n,this.getMovies=r,this.arrPaginationItems=[]},P=r("jyO6b"),y=r("dIxxU"),w="88b8a7c5d221d3120fb29d734050dc7d",b=function(){var e=t(i)(t(o).mark((function e(){var a,n,r,i,s,c,u=arguments;return t(o).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=u.length>0&&void 0!==u[0]?u[0]:1,n=h("searchTerm"),console.log(a,n),t.next=5,(0,P.getByQuery)(n,a);case 5:return r=t.sent,i=r.results,s=r.total_pages,c=r.page,p(i),t.abrupt("return",{results:i,total_pages:s,page:c});case 11:case"end":return t.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),x=function(){var e=t(i)(t(o).mark((function e(a){var n,r,i,s;return t(o).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.default.get("https://api.themoviedb.org/3/movie/now_playing?api_key=".concat(w,"&page=").concat(a,"&language=en-US"));case 2:return n=t.sent.data,r=n.results,i=n.page,s=n.total_pages,p(r),t.abrupt("return",{results:r,page:i,total_pages:s});case 6:case"end":return t.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=t(i)(t(o).mark((function e(){var a,n;return t(o).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.default.get("https://api.themoviedb.org/3/genre/movie/list?api_key=".concat(w));case 2:return a=t.sent.data,n=a.genres,t.abrupt("return",n);case 5:case"end":return t.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=document.querySelector(".search-form"),S=function(){var e=t(i)(t(o).mark((function e(){var a,n,r;return t(o).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x();case 2:a=t.sent,n=a.page,r=a.total_pages,new m(r,n,x).createButton();case 7:case"end":return t.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=t(i)(t(o).mark((function e(a){var n,r,i;return t(o).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b();case 2:n=t.sent,r=n.page,i=n.total_pages,new m(i,r,b).createButton();case 7:case"end":return t.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();_.addEventListener("submit",(function(t){t.preventDefault();var e=new FormData(t.target),a=Object.fromEntries(e.entries()).searchMovies;a.length?(v("searchTerm",a),k(a)):S()})),window.addEventListener("load",S),r("hVzVa"),r("h8OCG")}();
//# sourceMappingURL=catalog.3e2061f5.js.map
