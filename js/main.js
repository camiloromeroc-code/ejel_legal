// ==========================================
// MENÚ MÓVIL
// ==========================================
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

// ==========================================
// EFECTO NAVBAR AL SCROLL
// ==========================================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ==========================================
// ANIMACIONES AL SCROLL
// ==========================================
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

// ==========================================
// FORMULARIO DE CONTACTO CON WEB3FORMS
// ==========================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Referencias a campos
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');
    const service = document.getElementById('service');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Resetear errores
    document.querySelectorAll('.error-message').forEach(el => {
      el.style.display = 'none';
    });
    
    // Validación
    let isValid = true;
    
    // Validar nombre
    if (!name.value.trim() || name.value.trim().length < 3) {
      name.parentElement.querySelector('.error-message').style.display = 'block';
      name.parentElement.querySelector('.error-message').textContent = 'El nombre debe tener al menos 3 caracteres';
      isValid = false;
    }
    
    // Validar email
    if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
      email.parentElement.querySelector('.error-message').style.display = 'block';
      isValid = false;
    }
    
    // Validar teléfono colombiano
    const phoneClean = phone.value.replace(/\D/g, '');
    if (!phoneClean || phoneClean.length !== 10 || !phoneClean.startsWith('3')) {
      phone.parentElement.querySelector('.error-message').style.display = 'block';
      isValid = false;
    }
    
    // Validar mensaje
    if (!message.value.trim() || message.value.trim().length < 10) {
      message.parentElement.querySelector('.error-message').style.display = 'block';
      message.parentElement.querySelector('.error-message').textContent = 'El mensaje debe tener al menos 10 caracteres';
      isValid = false;
    }
    
    if (!isValid) {
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
      
      return;
    }
    
    // Deshabilitar botón y mostrar loading
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.style.cursor = 'not-allowed';
    submitButton.style.opacity = '0.7';
    
    try {
      // Crear FormData con todos los campos del formulario
      const formData = new FormData(contactForm);
      
      // Log para debug (remover en producción)
      console.log('Enviando formulario a Web3Forms...');
      
      // Enviar a Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      console.log('Respuesta de Web3Forms:', data);
      
      if (data.success) {
        // Mostrar mensaje de éxito
        formMessage.className = 'form-message success';
        formMessage.textContent = '¡Tu mensaje ha sido enviado exitosamente! Te contactaremos en menos de 24 horas.';
        formMessage.style.display = 'block';
        
        // Resetear formulario
        contactForm.reset();
        
        // Redirigir después de 2 segundos (opcional)
        setTimeout(() => {
          // Descomentar si quieres usar la página de agradecimiento
          // window.location.href = 'gracias.html';
        }, 2000);
        
        // Ocultar mensaje después de 10 segundos
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 10000);
        
      } else {
        // Error en el envío
        console.error('Error de Web3Forms:', data);
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Hubo un problema al enviar el mensaje. Por favor intenta nuevamente o contáctanos por WhatsApp.';
        formMessage.style.display = 'block';
        
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 7000);
      }
      
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      formMessage.className = 'form-message error';
      formMessage.textContent = 'Error de conexión. Por favor verifica tu internet e intenta nuevamente.';
      formMessage.style.display = 'block';
      
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 7000);
      
    } finally {
      // Restaurar botón
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
      submitButton.style.cursor = 'pointer';
      submitButton.style.opacity = '1';
    }
  });
}

// ==========================================
// MENÚ ACTIVO AL SCROLL
// ==========================================
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

// ==========================================
// BOTÓN VOLVER ARRIBA
// ==========================================
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

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
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
      
      // Cerrar menú móvil
      mobileMenu.classList.remove('active');
      navLinksContainer.classList.remove('active');
      mobileMenu.setAttribute('aria-expanded', 'false');
    }
  });
});

// ==========================================
// PREVENIR ZOOM EN iOS
// ==========================================
if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  document.querySelectorAll('input, textarea, select').forEach(element => {
    element.addEventListener('focus', () => {
      element.style.fontSize = '16px';
    });
  });
}

// ==========================================
// LAZY LOADING PARA IMÁGENES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
});

// Log inicial
console.log('EJE LEGAL - Website cargado correctamente ✓');
console.log('Web3Forms integrado correctamente ✓');