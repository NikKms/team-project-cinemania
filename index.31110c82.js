!function(){function n(n){return n&&n.__esModule?n.default:n}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},a={},r=t.parcelRequire8a95;null==r&&((r=function(n){if(n in e)return e[n].exports;if(n in a){var t=a[n];delete a[n];var r={id:n,exports:{}};return e[n]=r,t.call(r.exports,r,r.exports),r.exports}var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(n,t){a[n]=t},t.parcelRequire8a95=r),r("i6wQM");var c=r("bpxeT"),i=r("2TvXO");r("1TFAy");var o=r("jyO6b"),s=(r("jyO6b"),o=r("jyO6b"),r("kaqNk")),p=document.querySelector(".weekly-cards-wrap"),d=document.querySelector(".upcoming_wrap"),u=(document.querySelector(".weekly-title-link"),null);function l(){return(l=n(c)(n(i).mark((function t(){var e;return n(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,o.getWeeklyTrending)();case 2:e=n.sent,v(g(e.results));case 5:case"end":return n.stop()}}),t)})))).apply(this,arguments)}function g(n){return n.slice(0,3)}function v(n){return f.apply(this,arguments)}function f(){return f=n(c)(n(i).mark((function t(e){var a;return n(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(e),t.next=3,Promise.all(e.map(function(){var t=n(c)(n(i).mark((function t(e){var a,r,c,o,s,p,d,u,l;return n(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.backdrop_path,a=e.title,r=e.release_date,c=e.genre_ids,o=e.id,s=e.poster_path,p=e.name,d=e.first_air_date,u=e.vote_average,c=k(c),n.next=4,m(c);case 4:return l=n.sent,n.abrupt("return",'<li class="weekly-card is-id" data-id='.concat(o,'>\n        <div class="weekly-container-image">\n          <img\n            class="weekly-card-image"\n           src="https://image.tmdb.org/t/p/original/').concat(s,'"\n            alt=""\n          />\n         <div class="overlay"></div>       \n        </div>\n  <div class="weekly-card-description">\n    <h3 class="weekly-card-description-title">').concat(a||p,"</h3>\n    <div class='weekly-card-description-wrap'>\n       <p class=\"weekly-card-description-other\">").concat(l," | ").concat(r?r.substring(0,4):d.substring(0,4),'</p>\n\n     <div class="Stars" style="--rating: ').concat(parseFloat((u/2).toFixed(1)),';" aria-label="Rating of this product is 2.3 out of 5."></div>\n      </div>\n  </div>\n      </li>'));case 6:case"end":return n.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}()));case 3:a=t.sent,p.innerHTML=a.join("");case 5:case"end":return t.stop()}}),t)}))),f.apply(this,arguments)}function m(n){return h.apply(this,arguments)}function h(){return(h=n(c)(n(i).mark((function t(e){var a,r,c;return n(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,o.getGenre)();case 2:return a=n.sent,r=a.genres,c=e.map((function(n){var t=r.find((function(t){return t.id===n}));return t?t.name:""})),n.abrupt("return",c.join(", "));case 6:case"end":return n.stop()}}),t)})))).apply(this,arguments)}function w(){return(w=n(c)(n(i).mark((function t(){var e,a,r,c;return n(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e=_(),a=e.formattedStartDate,r=e.formattedEndDate,n.prev=1,n.next=4,(0,o.getUpcoming)(a,r);case 4:c=n.sent,y(S(c.results)),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(1),d.insertAdjacentHTML("beforeend",'<p class="upcoming-not-found">OOPS...We are very sorry! We don’t have any results</p>');case 12:case"end":return n.stop()}}),t,null,[[1,9]])})))).apply(this,arguments)}function y(n){return b.apply(this,arguments)}function b(){return(b=n(c)(n(i).mark((function t(e){var a,r,c,o,p,l,g,v,f,h,w,y,b,_;return n(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=e.backdrop_path,r=e.poster_path,c=e.genre_ids,o=e.popularity,p=e.release_date,l=e.title,g=e.vote_average,v=e.vote_count,f=e.overview,console.log("upcomingFilm: ",e),c=k(c),n.next=5,m(c);case 5:h=n.sent,w=window.innerWidth<767,y=x(a,r,w),b='<div class="upcoming-card">\n\n            <img class="upcoming-card-img" src="'.concat(y,'" alt=" " />\n\n          <div class="upcoming-card-wrap">\n            <h3 class="upcoming-card-title">').concat(l,'</h3>\n\n            <div class="upcoming-card-numbers-wrap-top">\n              <div class="upcoming-card-release-wrap">\n                <span class="upcoming-card-release-text">Release date</span>\n                <span class="upcoming-card-release-data">').concat(p,'</span>\n              </div>\n\n              <div class="upcoming-card-vote-wrap">\n                <div class="upcoming-card-vote"><span>Vote / Votes</span></div>\n                <div class="upcoming-card-vote-data">\n                  <span>').concat(g,"</span> / <span>").concat(v,'</span>\n                </div>\n              </div>\n            </div>\n\n            <div class="upcoming-card-numbers-wrap-down">\n              <div class="upcoming-card-popularity-wrap">\n                <span class="upcoming-card-popularity-text">Popularity</span>\n                <span class="upcoming-card-popularity-data">').concat(o.toFixed(1),'</span>\n              </div>\n\n              <div class="upcoming-card-genre-wrap">\n                <span class="upcoming-card-genre-text">Genre</span>\n                <span class="upcoming-card-genre-data">').concat(h,'</span>\n              </div>\n            </div>\n \n            <span class="upcoming-card-about-title">About</span>\n\n            <p class="upcoming-card-about-text">').concat(f,'</p>\n\n            <button class="upcoming-button" id="add-to-lib" type="button">\n              Add to my library\n            </button>\n          </div>\n        </div>'),d.insertAdjacentHTML("beforeend",b),u=document.getElementById("add-to-lib"),_=function(n){(0,s.addFilmToStorage)(e)},u.addEventListener("click",_);case 13:case"end":return n.stop()}}),t)})))).apply(this,arguments)}function x(n,t,e){return!0===e&&null!==t?"https://image.tmdb.org/t/p/original/".concat(t):!1===e&&null!==n?"https://image.tmdb.org/t/p/original/".concat(n):!1===e&&null===n&&null!==t?"https://image.tmdb.org/t/p/original/".concat(t):!0===e&&null===t&&null!==n?"https://image.tmdb.org/t/p/original/".concat(n):"https://d2ths1nqi4sbhh.cloudfront.net/images/no-image.png?v=3884857787"}function k(n){return n.length>2?n.slice(0,2):n}function _(){var n=new Date,t=n.getFullYear(),e=String(n.getMonth()+1).padStart(2,"0"),a=String(n.getDate()).padStart(2,"0"),r="".concat(t,"-").concat(e,"-").concat(a),c=new Date(t,e,1),i=new Date(c-1).getDate(),o=String(i).padStart(2,"0");return{formattedStartDate:r,formattedEndDate:"".concat(t,"-").concat(e,"-").concat(o)}}function S(n){return n[Math.floor(Math.random()*n.length)]}window.addEventListener("DOMContentLoaded",(function(){return w.apply(this,arguments)})),window.addEventListener("DOMContentLoaded",(function(){return l.apply(this,arguments)})),r("hVzVa"),r("h8OCG"),r("3XXFj")}();
//# sourceMappingURL=index.31110c82.js.map