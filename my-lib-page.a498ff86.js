!function(){function n(n){return n&&n.__esModule?n.default:n}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},r=e.parcelRequire8a95;null==r&&((r=function(n){if(n in t)return t[n].exports;if(n in i){var e=i[n];delete i[n];var r={id:n,exports:{}};return t[n]=r,e.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+n+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(n,e){i[n]=e},e.parcelRequire8a95=r),r("i6wQM"),r("hVzVa");var a=r("bpxeT"),s=r("2TvXO"),o=r("jyO6b"),l=r("kaqNk"),c=(u=r("5KpiF")).libRefs.libSelectEl,d=u.libRefs.libMoviesListEl,u=r("5KpiF"),f=r("8MBJY"),v=r("a2hTj"),b=r("hKHmD"),p=function(){"use strict";function e(t){var i=t.btnEl,r=t.isHidden,a=void 0!==r&&r;n(f)(this,e),this.button=i,a&&this.hideBtn()}return n(v)(e,[{key:"getBtn",value:function(n){return document.querySelector(n)}},{key:"hideBtn",value:function(){this.button.classList.add(e.classes.hidden)}},{key:"showBtn",value:function(){this.button.classList.remove(e.classes.hidden)}},{key:"disableBtn",value:function(){this.button.disabled=!0,this.button.textContent="Loading..."}},{key:"enableBtn",value:function(){this.button.disabled=!1,this.button.textContent="Load more"}}]),e}();n(b)(p,"classes",{hidden:"lib-btn-hidden"});var h,m=u.libRefs.libSelectEl,y=u.libRefs.libMoviesListEl,g=u.libRefs.libLoadMoreBtn,L=u.libRefs.libClearBtn,_=new p({btnEl:g}),w="1",k=0,x=(h=n(a)(n(s).mark((function e(t){var i;return n(s).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,o.getGenre)();case 2:return i=n.sent.genres,n.abrupt("return",i.filter((function(n){var e=n.id;return t.includes(e)})));case 4:case"end":return n.stop()}}),e)}))),function(n){return h.apply(this,arguments)}),B=function(){var e=n(a)(n(s).mark((function e(t){var i;return n(s).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,x(t);case 2:i=n.sent,e=void 0,e=i.map((function(n){return function(n){return'<option value="'.concat(n.id,'">').concat(n.name,"</option>")}(n)})),c.insertAdjacentHTML("beforeend",e.join(" "));case 4:case"end":return n.stop()}var e}),e)})));return function(n){return e.apply(this,arguments)}}(),E=function(n){var e,t=n.slice(k,k+9);k+=9,e=t.map((function(n){return t=(e=n).title,i=e.name,r=e.release_date,a=e.first_air_date,s=e.genres,o=e.poster_path,l=e.vote_average,c=e.id,d=s.map((function(n){return n.name})).slice(0,2),u=t||i,f=r||a,' <li class="mylibrary_movie ">\n  <div class="mylibrary_poster">\n  <img src="https://image.tmdb.org/t/p/original'.concat(o,'" alt="').concat(u,'" />\n      <div class="mylibrary_move_dark is-id" data-id=').concat(c,'></div>\n  </div>\n  <h3 class="mylibrary_movies_name">').concat(u,'</h3>\n  <p class="mylibrary_genre_movie">').concat(d.join(" ")," | ").concat(f.substring(0,4),'</p>\n  <div class="hero-star-raiting" >\n      <span>\n          <div class="Stars" style="--rating: ').concat(l/2,'; " aria-label="Rating of this product is ').concat((l/2).toFixed(1),' out of 5.">\n      </span>\n  </div>\n</li>');var e,t,i,r,a,s,o,l,c,d,u,f})),d.insertAdjacentHTML("beforeend",e.join(" "))},F=function(n){M(n)},M=function(n){if("1"===n)E(l.parsedFilms),T(l.parsedFilms);else{var e=l.parsedFilms.filter((function(e){return e.genres.some((function(e){return e.id===parseInt(n)}))}));E(e),T(e)}},T=function(n){n.length<=k?_.hideBtn():_.showBtn()},R=function(){y.innerHTML=""};m.addEventListener("change",(function(){w=m.value,k=0,R(),F(w)})),window.addEventListener("load",(function(){B(l.parsedFilmsGenreIds),E(l.parsedFilms),T(l.parsedFilms)})),g.addEventListener("click",(function(){_.disableBtn(),F(w),_.enableBtn()}));y.addEventListener("click",(function(n){console.log(n.target)})),L.addEventListener("click",(function(){(0,l.clearLibrary)()})),r("1TFAy"),r("h8OCG")}();
//# sourceMappingURL=my-lib-page.a498ff86.js.map