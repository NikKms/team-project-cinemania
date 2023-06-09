const footerLink = document.querySelector('.footer-link');
const backdropTeam = document.querySelector('.backdrop-team');
const closeButtonTeam = document.querySelector('.close-button-team');

footerLink.addEventListener('click', closeModalTeam);
backdropTeam.addEventListener('click', closeModalTeam);
closeButtonTeam.addEventListener('click', closeButtonTeamOnClick);

function toggleModalTeam() {
  backdropTeam.classList.toggle('is-hidden');
  if (!backdropTeam.classList.contains('is-hidden')) {
    document.addEventListener('keydown', handleKeyModalTeam);
  } else {
    document.removeEventListener('keydown', handleKeyModalTeam);
  }
}

function closeModalTeam(e) {
  if (e.target === backdropTeam || e.target === footerLink) {
    toggleModalTeam();
  }
}

function handleKeyModalTeam(e) {
  if (e.key === 'Escape') {
    toggleModalTeam();
  }
}
function closeButtonTeamOnClick() {
  backdropTeam.classList.add('is-hidden');
}
