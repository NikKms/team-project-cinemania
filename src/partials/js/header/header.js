const navRefs = {
  navHome: document.querySelector('#nav_home'),
  navLib: document.querySelector('#nav_lib'),
  navCat: document.querySelector('#nav_cat'),
};
const toggleHeader = document.getElementById('toggle');
const body = document.getElementsByTagName('body')[0];
// // const toggleSlider = document.querySelector();

toggleHeader.addEventListener('change', toggleLightMode);

toggleHeader.checked = true;
pageNavSelector();

// function pageNavSelector() {
//   if (window.location.href.includes('/index.html')) {
//     navRefs.navHome.classList.add('current-page');
//     navRefs.navLib.classList.remove('current-page');
//     navRefs.navCat.classList.remove('current-page');
//   }
//   if (window.location.href.includes('/catalog.html')) {
//     navRefs.navHome.classList.remove('current-page');
//     navRefs.navLib.classList.remove('current-page');
//     navRefs.navCat.classList.add('current-page');
//   }
//   if (window.location.href.includes('/my-lib-page.html')) {
//     navRefs.navHome.classList.remove('current-page');
//     navRefs.navLib.classList.add('current-page');
//     navRefs.navCat.classList.remove('current-page');
//   }
// }

function toggleLightMode() {
  const isLightMode = body.classList.toggle('light-mode');
  localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
}

function pageNavSelector() {
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

  const theme = localStorage.getItem('theme');
  if (theme === 'light') {
    body.classList.add('light-mode');
    toggleHeader.cheked = false;
    console.log('ligth');
  } else {
    body.classList.remove('light-mode');
    toggleHeader.cheked = true;
    console.log('dark');
  }

  if (localStorage.getItem('checkboxState') === 'true') {
    toggleHeader.checked = true;
  } else {
    toggleHeader.checked = false;
  }
}
