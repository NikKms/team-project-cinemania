const navRefs = {
  navHome: document.querySelector('#nav_home'),
  navLib: document.querySelector('#nav_lib'),
  navCat: document.querySelector('#nav_cat'),
};
console.log('Yo');
pageNavSelector();

function pageNavSelector() {
  console.log(window.location.href);
  if (window.location.href.includes('/index.html')) {
    navRefs.navHome.classList.add('current-page');
    navRefs.navLib.classList.remove('current-page');
    navRefs.navCat.classList.remove('current-page');
  }
  if (window.location.href.includes('/catalog.html')) {
    navRefs.navHome.classList.remove('current-page');
    navRefs.navLib.classList.remove('current-page');
    navRefs.navCat.classList.add('current-page');
  }
  if (window.location.href.includes('/my-lib-page.html')) {
    navRefs.navHome.classList.remove('current-page');
    navRefs.navLib.classList.add('current-page');
    navRefs.navCat.classList.remove('current-page');
  }
}
