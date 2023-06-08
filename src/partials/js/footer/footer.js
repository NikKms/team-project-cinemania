// MODAL WINDOW FOOTER

// ШАГ 1. Думаем, на какие места мы будем жать и ждать действий. Это наш спан в футере, кнопка закрытия модалки, бэкдроп и кнопка ESC. Для этих кнопок нужно получить ссылки.
refs = {
  footerLink: document.querySelector('.footer-link'),
  closeButton: document.querySelector('.close-button-team'),
  backdropTeam: document.querySelector('.backdrop-team'),
};

// Шаг2. Чтобы получить действия по клику, нужно словить клики Листенером и добавить функции, которые будут делать определенные действия. Одна функция будет убирать is-hidden, а другая будет добавлять. На футерлинк у нас будет убираться, а на крестик и бэкдроп добавляться класс is-hidden. Класс будет добавляться и исчезать на элементе бэкдроп.

// refs.footerLink.addEventListener('click', removeIsHiddenOnClick);
// refs.closeButton.addEventListener('click', addIsHiddenOnClick);
// refs.backdropTeam.addEventListener('click', addIsHiddenOnClick);

// Шаг 3. Внизу расписываем сами функции. Первая убирает класс, вторая - добавляет.

// function removeIsHiddenOnClick(e) {
//   refs.backdropTeam.classList.remove('is-hidden');

//   document.addEventListener('keydown', e => {
//     if (
//       e.code === 'Escape'
//       // refs.backdropTeam.classList.contains('is-hidden')//
//     ) {
//       addIsHiddenOnClick();
//     }
//   });
// }

// function addIsHiddenOnClick(e) {
//   if (!e.target.classList.contains("modal-team"))
//   { refs.backdropTeam.classList.add('is-hidden') };
// }
// function toggleIsHiddenOnClick(e) {
//   refs.backdropTeam.classList.toggle('is-hidden');

// }

// function addIsHiddenOnClick(e) {
//   refs.backdropTeam.classList.add('is-hidden');
// }

// function isItABackdrop(e) {
//   if (
//     e.target.classList.contains('backdropTeam') &&
//     !e.target.classList.contains('modal-team')
//   ) {
//     toggleIsHiddenOnClick();
//   }
// }

//Шаг 4 добавляем функцию закрывания кнопкой ESC
