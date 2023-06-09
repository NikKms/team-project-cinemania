function selectHandler(e) {
  const element = e.target;
  element.parentElement.classList.toggle('select-open');

  const allOptions = element.parentElement.querySelectorAll('.select-item');
  [...allOptions].map(item => {
    item.classList.remove('select-active');
  });

  if (element.className === 'select-item') {
    element.classList.add('select-active');
    return element.dataset.value;
  }
}

function selectItem(selectElement) {
  const selectEl = selectElement;

  selectElement.innerHtml = selectElement;

  selectEl.addEventListener('click', selectHandler);
}

export { selectItem };
