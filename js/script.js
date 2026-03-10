document.addEventListener('DOMContentLoaded', () => {
  
  // ===== Мобильное меню =====
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('nav');
  
  burger?.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('active');
    // Анимация иконки
    burger.classList.toggle('active');
  });

  // Закрытие меню при клике на ссылку
  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      burger?.setAttribute('aria-expanded', 'false');
    });
  });

  // ===== Квиз: переключение шагов =====
  const steps = document.querySelectorAll('.quiz-step');
  const nextButtons = document.querySelectorAll('.next-step');
  const prevButtons = document.querySelectorAll('.prev-step');
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle('active', i === index);
    });
    currentStep = index;
  }

  nextButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Простая валидация: проверяем, выбран ли вариант или заполнено поле
      const currentStepEl = steps[currentStep];
      const inputs = currentStepEl.querySelectorAll('input');
      let isValid = false;
      
      inputs.forEach(input => {
        if (input.type === 'radio' && input.checked) isValid = true;
        if (input.type === 'text' || input.type === 'tel') {
          if (input.hasAttribute('required')) {
            isValid = input.value.trim().length > 0;
          } else {
            isValid = true;
          }
        }
      });

      if (isValid || currentStepEl.querySelector('.input:not([required])')) {
        if (currentStep < steps.length - 1) showStep(currentStep + 1);
      } else {
        alert('Пожалуйста, выберите вариант или заполните поле');
      }
    });
  });

  prevButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) showStep(currentStep - 1);
    });
  });

  // ===== Обработка формы =====
  const form = document.getElementById('quizForm');
  const successBlock = document.getElementById('formSuccess');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Сбор данных формы
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Здесь можно отправить данные:
    // 1. На сервер (fetch/POST)
    // 2. В Telegram-бота (через прокси-скрипт)
    // 3. В Яндекс.Формы / Google Sheets
    
    console.log('Заявка:', data); // Для отладки
    
    // Имитация отправки
    form.style.display = 'none';
    successBlock.hidden = false;
    
    // Опционально: отправить мастеру в WhatsApp
    // const message = `Новая заявка с сайта:\nПлощадь: ${data.area}\nТип: ${data.type}\nРайон: ${data.district}\nТелефон: ${data.phone}\nИмя: ${data.name || '-'}`;
    // window.open(`https://wa.me/79991234567?text=${encodeURIComponent(message)}`, '_blank');
  });

  // ===== Плавный скролл для якорных ссылок (фоллбэк) =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Простая маска для телефона (опционально) =====
  const phoneInput = document.querySelector('input[type="tel"]');
  phoneInput?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) value = '+7 (' + value;
    if (value.length > 4) value = value.slice(0, 4) + ') ' + value.slice(4);
    if (value.length > 9) value = value.slice(0, 9) + '-' + value.slice(9);
    if (value.length > 12) value = value.slice(0, 12) + '-' + value.slice(12);
    if (value.length > 15) value = value.slice(0, 15);
    e.target.value = value;
  });

});