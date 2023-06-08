const navRefs = {
  navHome: document.querySelector('#nav_home'),
  navLib: document.querySelector('#nav_lib'),
  navCat: document.querySelector('#nav_cat'),
};
document.addEventListener('DOMContentLoaded', function () {
  const checkbox = document.querySelector("input[type='checkbox']");
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'ligth') {
    checkbox.checked = true;
    document.body.classList.add('ligth-mode');
    applyThemeStyles();
  }

  checkbox.addEventListener('change', function () {
    const theme = checkbox.checked ? 'ligth' : 'dark';
    document.body.classList.toggle('ligth-mode', checkbox.checked);
    localStorage.setItem('theme', theme);
    applyThemeStyles();
  });
});

function applyThemeStyles() {
  const theme = document.body.classList.contains('ligth-mode')
    ? 'ligth'
    : 'dark';

  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    element.classList.toggle('ligth-mode', theme === 'ligth');
  });
}

pageNavSelector();

function pageNavSelector() {
  const body = document.getElementsByTagName('body')[0];
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
