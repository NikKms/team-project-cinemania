import { refs } from '../refs';

refs.btnClear.addEventListener('click', () => {
  console.log('hi');
  refs.input.value = '';
});
