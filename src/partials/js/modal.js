const refs = {
  openModal: document.querySelector('[data-modal-open]'),
  closeModal: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('[data-modal]'),
};

refs.openModal.addEventListener('click', onOpenModal);
refs.closeModal.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal(event) {
  console.dir(event.target.dataset.id);
  window.addEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.remove('is-hidden');
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.add('is-hidden');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') onCloseModal();
}
