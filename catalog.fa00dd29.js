!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},a=n.parcelRequire8a95;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var a={id:e,exports:{}};return t[e]=a,n.call(a.exports,a,a.exports),a.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,n){r[e]=n},n.parcelRequire8a95=a);var u,o=a("bpxeT"),i=a("2TvXO"),s=a("dIxxU"),c=a("jyO6b"),d=(u=e(o)(e(i).mark((function n(){var t,r,a,u;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,(0,c.getByQuery)("ghosted",1);case 3:return t=e.sent,r=t.results,e.next=7,f();case 7:return a=e.sent,u=r.map((function(e){var n=e.id,t=e.title,r=e.poster_path,u=e.vote_average,o=e.genre_ids,i=e.release_date;return{id:n,title:t,poster:r,rating:u,genres:p(a,o),date:l(i)}})),e.abrupt("return",u);case 10:case"end":return e.stop()}}),n)}))),function(){return u.apply(this,arguments)}),f=function(){var n=e(o)(e(i).mark((function n(){var t,r;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.default.get("https://api.themoviedb.org/3/genre/movie/list?api_key=".concat("88b8a7c5d221d3120fb29d734050dc7d"));case 2:return t=e.sent.data,r=t.genres,e.abrupt("return",r);case 5:case"end":return e.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),p=function(e,n){var t=[];return e.map((function(e){var r=e.id,a=e.name;-1!==n.indexOf(r)&&t.push(a)})),t.join(",")},l=function(e){return new Date(e).getFullYear()};d().then((function(e){return console.log(e)}))}();
//# sourceMappingURL=catalog.fa00dd29.js.map
