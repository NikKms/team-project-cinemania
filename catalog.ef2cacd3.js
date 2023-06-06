function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},n={},i=e.parcelRequire8a95;null==i&&((i=function(t){if(t in a)return a[t].exports;if(t in n){var e=n[t];delete n[t];var i={id:t,exports:{}};return a[t]=i,e.call(i.exports,i,i.exports),i.exports}var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(t,e){n[t]=e},e.parcelRequire8a95=i),i("g7hbw");var s={};Object.defineProperty(s,"__esModule",{value:!0}),s.default=function(t,e,a){e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a;return t};const r={pagination:document.getElementById("pagination"),catalogFilms:document.querySelector(".catalog-films")},o=t=>{const e=t.map((t=>`<div data-id=${t.id} class="catalog-card">\n      <img src='https://image.tmdb.org/t/p/original${t.poster}' alt="${t.title}" loading="lazy" />\n      <div class="catalog-info">\n        <div>\n          <p class="catalog-info-name">\n            <b>${t.title}</b>\n          </p>\n          <p class="catalog-info-details">\n            <span>${t.genres}</span>\n            <span class="catalog-info-border" >${t.date}</span>\n          </p>\n        </div>\n        <div\n          class="Stars"\n          style="--rating: ${t.rating/2}"\n          aria-label="Rating of this product is 2.3 out of 5."\n        ></div>\n      </div>\n    </div>`)).join("");var a;a=e,r.catalogFilms.innerHTML=a};const l=async t=>{const e=await y(),a=t.map((({id:t,title:a,poster_path:n,vote_average:i,genre_ids:s,release_date:r})=>({id:t,title:a,poster:n,rating:i,genres:c(e,s),date:g(r)})));o(a)},c=(t,e)=>{const a=[];return t.map((({id:t,name:n})=>{-1!==e.indexOf(t)&&a.push(n)})),a.join(",")},g=t=>new Date(t).getFullYear(),d=(t,e)=>{try{const a=JSON.stringify(e);localStorage.setItem(t,a)}catch(t){console.error("Set state error: ",t.message)}},p=t=>{try{const e=localStorage.getItem(t);return null===e?void 0:JSON.parse(e)}catch(t){console.error("Get state error: ",t.message)}};class u{constructor(e,a,n){t(s)(this,"createButton",(()=>{if(this.totalPages<=1)return void this.reset();this.arrPaginationItems=[],this.addFirstPages(this.arrPaginationItems),this.totalPages>6&&(this.addEllipsisIfNeeded(this.arrPaginationItems),this.addMiddlePages(this.arrPaginationItems),this.addEllipsisIfNeeded(this.arrPaginationItems,!0),this.addLastPage(this.arrPaginationItems));const t=this.createPagination(this.arrPaginationItems.join(""));this.render(t),d("currentPage",this.currentPage),this.getMovies(this.currentPage)})),t(s)(this,"addFirstPages",(t=>{for(let e=1;e<=Math.min(3,this.totalPages);e++){const a=this.currentPage===e?"btn-active":"",n=this.createPaginationItem(e,a);t.push(n)}})),t(s)(this,"addMiddlePages",(t=>{const e=Math.max(4,this.currentPage-2),a=Math.min(this.currentPage+1,this.totalPages-1);for(let n=e;n<=a;n++){const e=this.currentPage===n?"btn-active":"",a=this.createPaginationItem(n,e);t.push(a)}})),t(s)(this,"addEllipsisIfNeeded",((t,e=!1)=>{(e&&this.currentPage<this.totalPages-2||!e&&this.currentPage>3)&&t.push('<li class="pagination-item">...</li>')})),t(s)(this,"addLastPage",(t=>{const e=this.totalPages,a=this.currentPage===e?"btn-active":"",n=this.createPaginationItem(e,a);t.push(n)})),t(s)(this,"createPaginationItem",((t,e)=>`<li class='pagination-item ${e}'>\n              <a href='#' data-page='${t}' class='pagination-btn'>${t}</a>\n            </li>`)),t(s)(this,"createPagination",(t=>`\n      <div class='pagination ${this.totalPages<=1?"pagination-hidden":""}'>\n        <div class="pagination-arrows ${this.totalPages<=1?"pagination-arrows-hidden":""}">\n          <button type="button" class='pagination-arrow pagination-arrows-prev'>prev</button>\n          <button type="button" class='pagination-arrow pagination-arrows-next'>next</button>\n        </div>\n        <ul class='pagination-list'>${t}</ul>\n      </div>`)),t(s)(this,"render",(t=>{this.reset(),r.catalogFilms.insertAdjacentHTML("afterend",t);const e=document.querySelector(".pagination"),a=document.querySelector(".pagination");e.addEventListener("click",this.handlerBtn),a.addEventListener("click",this.arrowHandler);const n=document.querySelector(".pagination-arrow.pagination-arrows-prev");1===this.currentPage?n.style.display="none":n.style.display="block";const i=document.querySelector(".pagination-arrow.pagination-arrows-next");this.currentPage===this.totalPages?i.style.display="none":i.style.display="block"})),t(s)(this,"arrowHandler",(t=>{const e=t.target;e.classList.contains("pagination-arrows-prev")&&this.prev(),e.classList.contains("pagination-arrows-next")&&this.next()})),t(s)(this,"reset",(()=>{const t=document.querySelector(".pagination");t&&t.remove()})),t(s)(this,"prev",(()=>{if(1===this.currentPage)return;this.currentPage-=1,this.createButton();const t=document.querySelector(".pagination-arrow.pagination-arrows-prev");1===this.currentPage?t.style.display="none":t.style.display="block"})),t(s)(this,"next",(()=>{if(this.currentPage===this.totalPages)return;this.currentPage+=1,this.createButton();const t=document.querySelector(".pagination-arrow.pagination-arrows-next");this.currentPage===this.totalPages?t.style.display="none":t.style.display="block"})),t(s)(this,"handlerBtn",(t=>{t.preventDefault();const e=parseInt(t.target.dataset.page);isNaN(e)||(this.currentPage=e,this.createButton())})),this.totalPages=e,this.currentPage=a,this.getMovies=n,this.arrPaginationItems=[]}}var h=i("19F3f"),m=i("2shzp");const P=async(t=1)=>{const e=p("searchTerm");console.log(t,e);const{results:a,total_pages:n,page:i}=await(0,h.getByQuery)(e,t);return l(a),{results:a,total_pages:n,page:i}},f=async t=>{const{data:e}=await m.default.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=88b8a7c5d221d3120fb29d734050dc7d&page=${t}&language=en-US`),{results:a,page:n,total_pages:i}=e;return l(a),{results:a,page:n,total_pages:i}},y=async()=>{const{data:t}=await m.default.get("https://api.themoviedb.org/3/genre/movie/list?api_key=88b8a7c5d221d3120fb29d734050dc7d"),{genres:e}=t;return e},v=document.querySelector(".search-form"),w=async()=>{const{page:t,total_pages:e}=await f();new u(e,t,f).createButton()},b=async t=>{const{page:e,total_pages:a}=await P();new u(a,e,P).createButton()};v.addEventListener("submit",(t=>{t.preventDefault();const e=new FormData(t.target),{searchMovies:a}=Object.fromEntries(e.entries());a.length?(d("searchTerm",a),b(a)):w()})),window.addEventListener("load",w),i("7Yg6P"),i("2tESM");
//# sourceMappingURL=catalog.ef2cacd3.js.map