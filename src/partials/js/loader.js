import { Loading } from 'notiflix/build/notiflix-loading-aio';

function onLoader() {
  Loading.dots({
    svgColor: 'orange',
    svgSize: '100px',
    messageFontSize: '25px',
    clickToClose: true,
  });
}

function removeLoader() {
  Loading.remove();
}

export { onLoader, removeLoader };
