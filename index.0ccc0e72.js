var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},e={},a=n.parcelRequire8a95;null==a&&((a=function(n){if(n in t)return t[n].exports;if(n in e){var a=e[n];delete e[n];var i={id:n,exports:{}};return t[n]=i,a.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+n+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(n,t){e[n]=t},n.parcelRequire8a95=a),a("g7hbw"),a("70ClL");var i=a("19F3f");const r={listOfFilms:document.querySelector(".weekly-cards-wrap"),upcomingWrapEl:document.querySelector(".upcoming_wrap"),seeAll:document.querySelector(".weekly-title-link")};var s=a("cl7Eh");const{upcomingWrapEl:o,listOfFilms:d}=r;let c=null;async function l(n){const t=await Promise.all(n.map((async({backdrop_path:n,title:t,release_date:e,genre_ids:a,id:i,poster_path:r,name:s,first_air_date:o,vote_average:d})=>{a=w(a);return`<li class="weekly-card is-id" data-id=${i}>\n        <div class="weekly-container-image">\n          <img\n            class="weekly-card-image"\n           src="https://image.tmdb.org/t/p/original/${r}"\n            alt=""\n          />\n         <div class="overlay"></div>       \n        </div>\n  <div class="weekly-card-description">\n    <h3 class="weekly-card-description-title">${t||s}</h3>\n    <div class='weekly-card-description-wrap'>\n       <p class="weekly-card-description-other">${await m(a)} | ${e?e.substring(0,4):o.substring(0,4)}</p>\n\n     <div class="Stars" style="--rating: ${parseFloat((d/2).toFixed(1))};" aria-label="Rating of this product is 2.3 out of 5."></div>\n      </div>\n  </div>\n      </li>`})));d.innerHTML=t.join("")}async function p(n){let{backdrop_path:t,poster_path:e,genre_ids:a,popularity:i,release_date:r,title:d,vote_average:l,vote_count:p,overview:u}=n;a=w(a);const g=await m(a);const f=`<div class="upcoming-card">\n\n            <img class="upcoming-card-img" src="${v(t,e,window.innerWidth<767)}" alt=" " />\n\n          <div class="upcoming-card-wrap">\n            <h3 class="upcoming-card-title">${d}</h3>\n\n            <div class="upcoming-card-numbers-wrap-top">\n              <div class="upcoming-card-release-wrap">\n                <span class="upcoming-card-release-text">Release date</span>\n                <span class="upcoming-card-release-data">${r}</span>\n              </div>\n\n              <div class="upcoming-card-vote-wrap">\n                <div class="upcoming-card-vote"><span>Vote / Votes</span></div>\n                <div class="upcoming-card-vote-data">\n                  <span>${l}</span> / <span>${p}</span>\n                </div>\n              </div>\n            </div>\n\n            <div class="upcoming-card-numbers-wrap-down">\n              <div class="upcoming-card-popularity-wrap">\n                <span class="upcoming-card-popularity-text">Popularity</span>\n                <span class="upcoming-card-popularity-data">${i.toFixed(1)}</span>\n              </div>\n\n              <div class="upcoming-card-genre-wrap">\n                <span class="upcoming-card-genre-text">Genre</span>\n                <span class="upcoming-card-genre-data">${g}</span>\n              </div>\n            </div>\n \n            <span class="upcoming-card-about-title">About</span>\n\n            <p class="upcoming-card-about-text">${u}</p>\n\n            <button class="upcoming-button" id="add-to-lib" type="button">\n              Add to my library\n            </button>\n          </div>\n        </div>`;o.insertAdjacentHTML("beforeend",f),c=document.getElementById("add-to-lib");c.addEventListener("click",(t=>{(0,s.addFilmToStorage)(n)}))}const{seeAll:u,upcomingWrapEl:g}=r;async function m(n){const t=(await(0,i.getGenre)()).genres;return n.map((n=>{const e=t.find((t=>t.id===n));return e?e.name:""})).join(", ")}function v(n,t,e){return!0===e&&null!==t?`https://image.tmdb.org/t/p/original/${t}`:!1===e&&null!==n?`https://image.tmdb.org/t/p/original/${n}`:!1===e&&null===n&&null!==t?`https://image.tmdb.org/t/p/original/${t}`:!0===e&&null===t&&null!==n?`https://image.tmdb.org/t/p/original/${n}`:"https://d2ths1nqi4sbhh.cloudfront.net/images/no-image.png?v=3884857787"}function w(n){return n.length>2?n.slice(0,2):n}u.addEventListener("click",(()=>{location.href="catalog.html"})),window.addEventListener("DOMContentLoaded",(async function(){const{formattedStartDate:n,formattedEndDate:t}=function(){const n=new Date,t=n.getFullYear(),e=String(n.getMonth()+1).padStart(2,"0"),a=String(n.getDate()).padStart(2,"0"),i=`${t}-${e}-${a}`,r=new Date(t,e,1),s=new Date(r-1).getDate(),o=String(s).padStart(2,"0");return{formattedStartDate:i,formattedEndDate:`${t}-${e}-${o}`}}();try{const e=await(0,i.getUpcoming)(n,t);p(function(n){const t=Math.floor(Math.random()*n.length);return n[t]}(e.results))}catch(n){g.insertAdjacentHTML("beforeend",'<p class="upcoming-not-found">OOPS...<br>We are very sorry!<br>We don’t have any results</p>')}})),window.addEventListener("DOMContentLoaded",(async function(){l((await(0,i.getWeeklyTrending)()).results.slice(0,3))})),a("7Yg6P"),a("2tESM"),a("hwTRf");
//# sourceMappingURL=index.0ccc0e72.js.map
