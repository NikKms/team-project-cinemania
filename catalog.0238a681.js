!function(){function n(n){return n&&n.__esModule?n.default:n}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},a=e.parcelRequire8a95;null==a&&((a=function(n){if(n in t)return t[n].exports;if(n in r){var e=r[n];delete r[n];var a={id:n,exports:{}};return t[n]=a,e.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+n+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(n,e){r[n]=e},e.parcelRequire8a95=a),a("i6wQM");var o=a("bpxeT"),i=a("2TvXO"),c=a("dIxxU"),s=a("jyO6b"),u={pagination:document.getElementById("pagination"),catalogFilms:document.querySelector(".catalog-films")},l=function(n){var e,t=n.map((function(n){return"<div data-id=".concat(n.id,' class="catalog-card">\n      <img src=\'https://image.tmdb.org/t/p/original').concat(n.poster,"' alt=\"").concat(n.title,'" loading="lazy" />\n      <div class="catalog-info">\n        <div>\n          <p class="catalog-info-name">\n            <b>').concat(n.title,'</b>\n          </p>\n          <p class="catalog-info-details">\n            <span>').concat(n.genres,'</span>\n            <span class="catalog-info-border" >').concat(n.date,'</span>\n          </p>\n        </div>\n        <div\n          class="Stars"\n          style="--rating: ').concat(n.rating,'"\n          aria-label="Rating of this product is 2.3 out of 5."\n        ></div>\n      </div>\n    </div>')})).join("");e=t,u.catalogFilms.innerHTML=e,console.log(t)};var d,f=document.querySelector(".search-form"),p=(d=n(o)(n(i).mark((function e(t){var r;return n(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,s.getByQuery)(t,1);case 2:r=n.sent.results,g(r).then((function(n){return console.log(n)}));case 4:case"end":return n.stop()}}),e)}))),function(n){return d.apply(this,arguments)}),g=function(){var e=n(o)(n(i).mark((function e(t){var r,a;return n(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log(t),n.next=3,v();case 3:r=n.sent,a=t.map((function(n){var e=n.id,t=n.title,a=n.poster_path,o=n.vote_average,i=n.genre_ids,c=n.release_date;return{id:e,title:t,poster:a,rating:o,genres:m(r,i),date:h(c)}})),l(a);case 6:case"end":return n.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),v=function(){var e=n(o)(n(i).mark((function e(){var t,r;return n(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,c.default.get("https://api.themoviedb.org/3/genre/movie/list?api_key=".concat("88b8a7c5d221d3120fb29d734050dc7d"));case 2:return t=n.sent.data,r=t.genres,n.abrupt("return",r);case 5:case"end":return n.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=function(n,e){var t=[];return n.map((function(n){var r=n.id,a=n.name;-1!==e.indexOf(r)&&t.push(a)})),t.join(",")},h=function(n){return new Date(n).getFullYear()};f.addEventListener("submit",(function(n){n.preventDefault();var e=new FormData(n.target),t=Object.fromEntries(e.entries()).searchMovies;p(t)})),a("hVzVa"),a("h8OCG")}();
//# sourceMappingURL=catalog.0238a681.js.map