!function(){function n(n){return n&&n.__esModule?n.default:n}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},r=e.parcelRequire8a95;null==r&&((r=function(n){if(n in t)return t[n].exports;if(n in a){var e=a[n];delete a[n];var r={id:n,exports:{}};return t[n]=r,e.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+n+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(n,e){a[n]=e},e.parcelRequire8a95=r),r("i6wQM");var o=r("bpxeT"),i=r("2TvXO"),c=r("dIxxU"),s=r("jyO6b"),u={pagination:document.getElementById("pagination"),catalogFilms:document.querySelector(".catalog-films")},l=function(n){var e,t=n.map((function(n){return"<div data-id=".concat(n.id,' class="catalog-card">\n      <img src=\'https://image.tmdb.org/t/p/original').concat(n.poster,"' alt=\"").concat(n.title,'" loading="lazy" />\n      <div class="catalog-info">\n        <div>\n          <p class="catalog-info-name">\n            <b>').concat(n.title,'</b>\n          </p>\n          <p class="catalog-info-details">\n            <span>').concat(n.genres,'</span>\n            <span class="catalog-info-border" >').concat(n.date,'</span>\n          </p>\n        </div>\n        <div\n          class="Stars"\n          style="--rating: ').concat(n.rating,'"\n          aria-label="Rating of this product is 2.3 out of 5."\n        ></div>\n      </div>\n    </div>')})).join("");e=t,u.catalogFilms.innerHTML=e,console.log(t)};var d,p="88b8a7c5d221d3120fb29d734050dc7d",f=document.querySelector(".search-form"),g=(d=n(o)(n(i).mark((function e(t){var a;return n(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,s.getByQuery)(t,1);case 2:a=n.sent.results,v(a).then((function(n){return console.log(n)}));case 4:case"end":return n.stop()}}),e)}))),function(n){return d.apply(this,arguments)}),v=function(){var e=n(o)(n(i).mark((function e(t){var a,r;return n(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log(t),n.next=3,m();case 3:a=n.sent,r=t.map((function(n){var e=n.id,t=n.title,r=n.poster_path,o=n.vote_average,i=n.genre_ids,c=n.release_date;return{id:e,title:t,poster:r,rating:o,genres:h(a,i),date:w(c)}})),l(r);case 6:case"end":return n.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),m=function(){var e=n(o)(n(i).mark((function e(){var t,a;return n(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,c.default.get("https://api.themoviedb.org/3/genre/movie/list?api_key=".concat(p));case 2:return t=n.sent.data,a=t.genres,n.abrupt("return",a);case 5:case"end":return n.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),h=function(n,e){var t=[];return n.map((function(n){var a=n.id,r=n.name;-1!==e.indexOf(a)&&t.push(r)})),t.join(",")},w=function(n){return new Date(n).getFullYear()},y=function(){var e=n(o)(n(i).mark((function e(){var t,a;return n(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,c.default.get("https://api.themoviedb.org/3/movie/now_playing?api_key=".concat(p,"&language=en-US"));case 2:t=n.sent.data,a=t.results,v(a),console.log(a);case 6:case"end":return n.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();f.addEventListener("submit",(function(n){n.preventDefault();var e=new FormData(n.target),t=Object.fromEntries(e.entries()).searchMovies;t.length?g(t):y()})),window.addEventListener("load",y),r("hVzVa"),r("h8OCG")}();
//# sourceMappingURL=catalog.01961f4f.js.map