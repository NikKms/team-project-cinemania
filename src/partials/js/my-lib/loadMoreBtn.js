class LoadMoreBtn {
  static classes = {
    hidden: 'lib-btn-hidden',
  };

  constructor({ btnEl, isHidden = false }) {
    this.button = btnEl;
    isHidden && this.hideBtn();
  }

  getBtn(selector) {
    return document.querySelector(selector);
  }

  hideBtn() {
    this.button.classList.add(LoadMoreBtn.classes.hidden);
  }

  showBtn() {
    this.button.classList.remove(LoadMoreBtn.classes.hidden);
  }

  disableBtn() {
    this.button.disabled = true;
    this.button.textContent = 'Loading...';
  }

  enableBtn() {
    this.button.disabled = false;
    this.button.textContent = 'Load more';
  }
}

export { LoadMoreBtn };
