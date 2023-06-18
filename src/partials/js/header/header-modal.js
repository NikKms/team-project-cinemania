const headerModalRef = {
  menuLink: document.querySelector('.mobile-menu'),
  backdropMobileMenu: document.querySelector('.backdrop-mobile'),
  modalMobile: document.querySelector('.modal-mobile-menu'),
};

headerModalRef.menuLink.addEventListener('click', toggleMobileMenu);
headerModalRef.backdropMobileMenu.addEventListener('click', closeMobileMenu);

function toggleMobileMenu() {
  document.body.classList.toggle('is-scroll-block');
  headerModalRef.backdropMobileMenu.classList.toggle('active');
  headerModalRef.modalMobile.classList.toggle('active');

  if (headerModalRef.backdropMobileMenu.classList.contains('active')) {
    document.addEventListener('keydown', handleKeyDown);
  } else {
    document.removeEventListener('keydown', handleKeyDown);
  }
}

function closeMobileMenu(e) {
  if (e.target === headerModalRef.backdropMobileMenu) {
    toggleMobileMenu();
  }
}

function handleKeyDown(e) {
  if (e.key === 'Escape') {
    toggleMobileMenu();
  }
}
