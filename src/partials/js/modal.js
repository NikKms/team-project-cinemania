import { getInfoByMovie } from './api';

const refs = {
  openModal: document.querySelector('[data-modal-open]'),
  closeModal: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('[data-modal]'),
};

refs.openModal.addEventListener('click', onOpenModal);
refs.closeModal.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal(event) {
  const cardId = event.target.closest('Li').dataset.id;
  getMovieById(cardId);

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

async function getMovieById(id) {
  const data = await getInfoByMovie(id);
  console.log(data);
}
