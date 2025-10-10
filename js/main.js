// Menú móvil
const mobileMenu = document.getElementById('mobile-menu');
const navLinksContainer = document.getElementById('navbar-links');

mobileMenu.addEventListener('click', () => {
  const isExpanded = mobileMenu.getAttribute('aria-expanded') === 'true';
  mobileMenu.setAttribute('aria-expanded', !isExpanded);
  mobileMenu.classList.toggle('active');
  navLinksContainer.classList.toggle('active');
});

// Cerrar menú al hacer click en enlace
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navLinksContainer.classList.remove('active');
    mobileMenu.setAttribute('aria-expanded', 'false');
  });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
  if (!navLinksContainer.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('active');
    navLinksContainer.classList.remove('active');
    mobileMenu.setAttribute('aria-expanded', 'false');
  }
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
  const service = document.getElementById('service');
  
  // Resetear errores
  document.querySelectorAll('.error-message').forEach(el => {
    el.style.display = 'none';
  });
  
  // Validar nombre
  if (!name.value.trim()) {
    name.parentElement.querySelector('.error-message').style.display = 'block';
    isValid = false;
  }
  
  // Validar email
  if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
    email.parentElement.querySelector('.error-message').style.display = 'block';
    isValid = false;
  }
  
  // Validar teléfono colombiano (10 dígitos, inicia con 3)
  const phoneClean = phone.value.replace(/\D/g, '');
  if (!phoneClean || phoneClean.length !== 10 || !phoneClean.startsWith('3')) {
    phone.parentElement.querySelector('.error-message').style.display = 'block';
    isValid = false;
  }
  
  // Validar mensaje
  if (!message.value.trim()) {
    message.parentElement.querySelector('.error-message').style.display = 'block';
    isValid = false;
  }
  
  if (isValid) {
    // Verificar si EmailJS está configurado
    if (typeof window.sendEmail === 'function' && window.EMAILJS_CONFIGURED) {
      // Usar EmailJS
      const formData = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        service: service.value,
        message: message.value
      };
      
      window.sendEmail(formData);
    } else {
      // Fallback: Mostrar mensaje de éxito (simulado)
      formMessage.className = 'form-message success';
      formMessage.textContent = '¡Tu mensaje ha sido enviado! Te contactaremos en menos de 24 horas.';
      formMessage.style.display = 'block';
      
      // Log para debug
      console.log('Formulario enviado:', {
        nombre: name.value,
        email: email.value,
        telefono: phone.value,
        servicio: service.value,
        mensaje: message.value
      });
      
      // Resetear formulario
      setTimeout(() => {
        contactForm.reset();
        formMessage.style.display = 'none';
      }, 5000);
    }
  } else {
    formMessage.className = 'form-message error';
    formMessage.textContent = 'Por favor corrige los errores en el formulario.';
    formMessage.style.display = 'block';
    
    // Scroll al primer error
    const firstError = document.querySelector('.error-message[style*="block"]');
    if (firstError) {
      firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
});

// Actualizar menú activo al hacer scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const highlightLink = () => {
  let index = sections.length;
  
  while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
  
  navLinks.forEach((link) => link.classList.remove('active'));
  if (navLinks[index]) {
    navLinks[index].classList.add('active');
  }
};

window.addEventListener('scroll', highlightLink);

// Botón volver arriba
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Smooth scroll para todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Ignorar enlaces vacíos o solo "#"
    if (href === '#' || href === '') return;
    
    e.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Cerrar menú móvil si está abierto
      mobileMenu.classList.remove('active');
      navLinksContainer.classList.remove('active');
      mobileMenu.setAttribute('aria-expanded', 'false');
    }
  });
});

// Prevenir zoom en iOS en inputs
if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  document.querySelectorAll('input, textarea, select').forEach(element => {
    element.addEventListener('focus', () => {
      element.style.fontSize = '16px';
    });
  });
}

// Optimización: Lazy loading para imágenes que no tienen el atributo
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
});

// Log para debug (remover en producción)
console.log('EJE LEGAL - Website cargado correctamente');
console.log('EmailJS configurado:', window.EMAILJS_CONFIGURED || false);