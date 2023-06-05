const upBtn = {
  btnRef: document.querySelector('.up-btn'),
  show() {
    this.btnRef.classList.remove('up-btn_hide');
  },
  hide() {
    this.btnRef.classList.add('up-btn_hide');
  },
  addEventListener() {
    window.addEventListener('scroll', () => {
      window.scrollY || document.documentElement.scrollTop > 400
        ? this.show()
        : this.hide();
    });

    document.querySelector('.up-btn').onclick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };
  },
};
upBtn.addEventListener();
