import './styles.css';

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('#site-menu');
const mobileNavigation = window.matchMedia('(max-width: 820px)');

let lastScrollY = window.scrollY;

const setMenuState = (isOpen) => {
  if (!header || !menuToggle) return;

  header.classList.toggle('nav-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Menu schliessen' : 'Menu offnen');

  if (isOpen) {
    header.classList.remove('is-scrolled-out');
  }
};

menuToggle?.addEventListener('click', () => {
  setMenuState(!header?.classList.contains('nav-open'));
});

siteMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

window.addEventListener(
  'scroll',
  () => {
    if (!header || !mobileNavigation.matches) {
      header?.classList.remove('is-scrolled-out');
      lastScrollY = window.scrollY;
      return;
    }

    const currentScrollY = Math.max(window.scrollY, 0);
    const scrollingDown = currentScrollY > lastScrollY + 4;
    const scrollingUp = currentScrollY < lastScrollY - 4;

    if (currentScrollY <= 12 || scrollingUp) {
      header.classList.remove('is-scrolled-out');
    } else if (scrollingDown && currentScrollY > 96) {
      setMenuState(false);
      header.classList.add('is-scrolled-out');
    }

    lastScrollY = currentScrollY;
  },
  { passive: true },
);

mobileNavigation.addEventListener('change', () => {
  setMenuState(false);
  header?.classList.remove('is-scrolled-out');
  lastScrollY = window.scrollY;
});

const inquiryForm = document.querySelector('.inquiry-form');

inquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!inquiryForm.checkValidity()) {
    inquiryForm.reportValidity();
    return;
  }

  const formData = new FormData(inquiryForm);
  const valueFor = (fieldName) => String(formData.get(fieldName) || '').trim();
  const recipient = inquiryForm.dataset.recipient;
  const subject = `Pentest-Anfrage von ${valueFor('name') || 'der Website'}`;
  const body = [
    `Name: ${valueFor('name')}`,
    `E-Mail: ${valueFor('email')}`,
    `Unternehmen: ${valueFor('company') || '-'}`,
    `Leistung: ${valueFor('service')}`,
    '',
    'Anfrage:',
    valueFor('inquiry'),
  ].join('\n');

  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
