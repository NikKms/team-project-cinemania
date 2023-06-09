import { refs } from '../refs';

refs.btnClear.addEventListener('click', () => {
  refs.input.value = '';
});

refs.input.addEventListener('input', () => {
  if (refs.input.value === '') {
    refs.inputIcon.classList.add('icon-hidden');
  } else {
    refs.inputIcon.classList.remove('icon-hidden');
  }
});
