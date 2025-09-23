// Menú móvil
const mobileMenu = document.getElementById('mobile-menu');
const navLinksContainer = document.getElementById('navbar-links');

mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navLinksContainer.classList.toggle('active');
});

// Cerrar menú al hacer click en enlace
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navLinksContainer.classList.remove('active');
  });
});

// Efecto en navbar al hacer scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Animaciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.animate-fade-in-up, .animate-slide-left, .animate-fade-in').forEach(el => {
  observer.observe(el);
});

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Validación básica
  let isValid = true;
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');
  
  // Resetear errores
  document.querySelectorAll('.error-message').forEach(el => {
    el.style.display = 'none';
  });
  
  // Validar campos
  if (!name.value.trim()) {
    name.parentElement.querySelector('.error-message').style.display = 'block';
    isValid = false;
  }
  
  if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
    email.parentElement.querySelector('.error-message').style.display = 'block';
    isValid = false;
  }
  
  if (!phone.value.trim() || !/^\d{10}$/.test(phone.value.replace(/\D/g, ''))) {
    phone.parentElement.querySelector('.error-message').style.display = 'block';
    isValid = false;
  }
  
  if (!message.value.trim()) {
    message.parentElement.querySelector('.error-message').style.display = 'block';
    isValid = false;
  }
  
  if (isValid) {
    // Simular envío
    formMessage.className = 'form-message success';
    formMessage.textContent = '¡Tu mensaje ha sido enviado! Te contactaremos en menos de 24 horas.';
    formMessage.style.display = 'block';
    
    // Resetear formulario
    setTimeout(() => {
      contactForm.reset();
      formMessage.style.display = 'none';
    }, 5000);
  } else {
    formMessage.className = 'form-message error';
    formMessage.textContent = 'Por favor corrige los errores en el formulario.';
    formMessage.style.display = 'block';
    
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
});

// Actualizar menú activo al hacer scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const makeActive = (link) => {
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  link.classList.add('active');
};

const highlightLink = () => {
  let index = sections.length;
  
  while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
  
  navLinks.forEach((link) => link.classList.remove('active'));
  navLinks[index].classList.add('active');
};

window.addEventListener('scroll', highlightLink);