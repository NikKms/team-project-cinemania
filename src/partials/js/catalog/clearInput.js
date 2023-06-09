import { refs } from '../refs';

refs.btnClear.addEventListener('click', () => {
  refs.input.value = '';
});

refs.input.addEventListener('input', () => {
  if (refs.input.value === '') {
    console.log('hyyy');
    refs.inputIcon.classList.add('icon-hidden');
  } else {
    console.log('heee');
    refs.inputIcon.classList.remove('icon-hidden');
  }
});
