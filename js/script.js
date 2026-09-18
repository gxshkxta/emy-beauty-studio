const IMAGE_PATH = "assets/images/";
const PHOTO_COUNT = 19;
let currentDate = new Date();

const academyData = {
    basic: { name: 'Базов курс', description: 'Стабилна основа за уверено начало в професионалния маникюр.', audience: 'За начинаещи и любители.', learning: 'Хигиена, подготовка, основни техники и продукти.', practice: 'Упражнения върху модел с обратна връзка.', duration: '2 дни', seats: 6 },
    advanced: { name: 'Надграждащ курс', description: 'По-прецизна работа, по-бърза техника и уверен резултат.', audience: 'За курсисти с базови умения.', learning: 'Комбинирани техники, корекции и издръжливост.', practice: 'Реални казуси с професионални продукти.', duration: '3 дни', seats: 4 },
    masterclass: { name: 'Masterclass', description: 'Интензивно обучение за следващо ниво на техника и стил.', audience: 'За напреднали професионалисти.', learning: 'Авторски подходи, сложни дизайни и оптимизация.', practice: 'Демонстрация, задача и персонална обратна връзка.', duration: '1 ден', seats: 2 }
};

const academyWizardState = { goal: '', experience: '', course: 'basic' };

function renderAcademyCourses() {
    const coursesContainer = document.getElementById('academyCourses');
    if (!coursesContainer) return;

    coursesContainer.innerHTML = Object.entries(academyData).map(([key, course]) => `
        <article class="academy-course-card glass" id="${key === 'basic' ? 'basic-course' : key === 'advanced' ? 'advanced-course' : 'masterclass'}">
            <div class="academy-course-heading"><h2>${course.name}</h2><span class="seats-counter">Свободни места: <span>${course.seats}</span></span></div>
            <p class="academy-course-description">${course.description}</p>
            <dl class="academy-course-details"><div><dt>За кого е</dt><dd>${course.audience}</dd></div><div><dt>Какво се учи</dt><dd>${course.learning}</dd></div><div><dt>Практика</dt><dd>${course.practice}</dd></div><div><dt>Продължителност</dt><dd>${course.duration}</dd></div></dl>
            <button class="academy-course-cta" type="button" data-course="${key}">Запиши се</button>
        </article>`).join('');

    coursesContainer.querySelectorAll('[data-course]').forEach(button => {
        button.addEventListener('click', () => selectAcademyCourse(button.dataset.course));
    });
}

function selectAcademyCourse(courseKey) {
    if (!academyData[courseKey]) return;
    academyWizardState.course = courseKey;
    const courseSelect = document.getElementById('enrollmentCourse');
    if (courseSelect) courseSelect.value = courseKey;
    const wizard = document.getElementById('enroll-wizard');
    if (wizard) wizard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showAcademyStep(stepNumber) {
    document.querySelectorAll('.wizard-step').forEach(step => {
        const active = step.dataset.wizardStep === String(stepNumber);
        step.hidden = !active;
        step.classList.toggle('active', active);
    });
    document.querySelectorAll('.wizard-progress-step').forEach((step, index) => step.classList.toggle('active', index < stepNumber));
}

function setupAcademyWizard() {
    const wizard = document.getElementById('enroll-wizard');
    if (!wizard) return;
    wizard.querySelectorAll('[data-answer-key]').forEach(button => button.addEventListener('click', () => {
        academyWizardState[button.dataset.answerKey] = button.dataset.answer;
        if (button.dataset.answerKey === 'experience') {
            academyWizardState.course = academyWizardState.experience === 'clients' || academyWizardState.goal === 'professional' ? 'masterclass' : academyWizardState.experience === 'some' || academyWizardState.goal !== 'start' ? 'advanced' : 'basic';
            const course = academyData[academyWizardState.course];
            document.getElementById('wizardRecommendation').innerHTML = `<strong>${course.name}</strong><p>${course.description}</p><span>Продължителност: ${course.duration} | Свободни места: ${course.seats}</span>`;
            const courseSelect = document.getElementById('enrollmentCourse');
            if (courseSelect) courseSelect.value = academyWizardState.course;
            showAcademyStep(3);
        } else showAcademyStep(2);
    }));
    wizard.querySelectorAll('[data-next-step]').forEach(button => button.addEventListener('click', () => showAcademyStep(Number(button.dataset.nextStep))));
    const showForm = document.getElementById('showEnrollmentForm');
    const form = document.getElementById('academyEnrollmentForm');
    if (showForm && form) {
        showForm.addEventListener('click', () => { form.hidden = false; showForm.hidden = true; });
        form.addEventListener('submit', event => { event.preventDefault(); form.reset(); document.getElementById('enrollmentCourse').value = academyWizardState.course; document.getElementById('academyFormSuccess').hidden = false; });
    }
}

// ПОДМЕНЮТА
function toggleSub(id) {
    document.querySelectorAll('.sub-menu').forEach(menu => {
        if(menu.id !== id) menu.classList.remove('open');
    });
    document.getElementById(id).classList.toggle('open');
}

// 1. Функция за главното меню (Показване/Скриване)
window.toggleMenu = function() {
    const tabs = document.getElementById('sideTabs');
    if (tabs) {
        tabs.classList.toggle('active');
        // По желание: добавяме малко вибрация или лог за проверка
        console.log("Менюто се превключи!");
    } else {
        console.error("Грешка: Не намерих елемент с ID sideTabs!");
    }
};

// 2. Функция за подменютата (Маникюр, Педикюр и т.н.)
window.toggleSub = function(id) {
    const sub = document.getElementById(id);
    if (sub) {
        // Затваряме всички други подменюта, за да е подредено
        document.querySelectorAll('.sub-menu').forEach(menu => {
            if (menu.id !== id) menu.classList.remove('open');
        });
        // Отваряме избраното
        sub.classList.toggle('open');
    }
};
// КАЛЕНДАР
function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const display = document.getElementById('monthDisplay');
    if (!grid || !display) return;

    grid.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    display.innerText = currentDate.toLocaleString('bg-BG', { month: 'long', year: 'numeric' });

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= daysInMonth; d++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'day glass';
        const dateObj = new Date(year, month, d);
        if (dateObj.getDay() === 0 || dateObj.getDay() === 6) dayEl.classList.add('weekend');
        dayEl.innerText = d;
        dayEl.onclick = () => openBooking(d, display.innerText);
        grid.appendChild(dayEl);
    }
}

function changeMonth(step) {
    currentDate.setMonth(currentDate.getMonth() + step);
    renderCalendar();
}

// МОДАЛ
function openBooking(day, month) {
    document.getElementById('selectedDateText').innerText = `${day} ${month}`;
    document.getElementById('bookingModal').style.display = 'flex';
}
function closeModal() { document.getElementById('bookingModal').style.display = 'none'; }
function sendBooking() { alert("Часът е заявен успешно!"); closeModal(); }

// ГАЛЕРИЯ
let scrollPos = 0;
let isPaused = false;

function initGallery() {
    const track = document.getElementById('galleryTrack');
    if (!track) return;
    for (let i = 1; i <= PHOTO_COUNT; i++) {
        const img = document.createElement('img');
        img.src = `${IMAGE_PATH}photo${i}.jpg`;
        img.onerror = function() { this.remove(); };
        track.appendChild(img);
    }
    track.innerHTML += track.innerHTML;
    animateGallery();
}

function animateGallery() {
    const track = document.getElementById('galleryTrack');
    if (!track) return;
    if (!isPaused) {
        scrollPos -= 1;
        if (Math.abs(scrollPos) >= track.scrollWidth / 2) scrollPos = 0;
        track.style.transform = `translateX(${scrollPos}px)`;
    }
    requestAnimationFrame(animateGallery);
}

function moveManual(dir) {
    const track = document.getElementById('galleryTrack');
    const wrap = document.getElementById('galleryWrap');
    const step = wrap.offsetWidth / 5;
    scrollPos += (dir * -step);
    track.style.transition = "0.5s ease";
    track.style.transform = `translateX(${scrollPos}px)`;
    setTimeout(() => { track.style.transition = "none"; }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
    initGallery();
    renderAcademyCourses();
    setupAcademyWizard();
    const wrap = document.getElementById('galleryWrap');
    if (wrap) {
        wrap.addEventListener('mouseenter', () => isPaused = true);
        wrap.addEventListener('mouseleave', () => isPaused = false);
    }
});
// ФУНКЦИЯ ЗА ПОКАЗВАНЕ/СКРИВАНЕ НА МЕНЮТО
function toggleMenu() {
    const tabs = document.getElementById('sideTabs');
    if (tabs) {
        tabs.classList.toggle('active');
        // Добавяме клас на body, ако искаш да промениш целия изглед при отворено меню
        document.body.classList.toggle('menu-open');
    }
}

// Функцията за подменютата остава същата
function toggleSub(id) {
    const sub = document.getElementById(id);
    if (!sub) return;
    
    // Затваряме другите подменюта, ако има отворени
    document.querySelectorAll('.sub-menu').forEach(menu => {
        if(menu.id !== id) menu.classList.remove('open');
    });
    
    sub.classList.toggle('open');
}

// Cookie Banner Logic
function acceptCookies() {
    localStorage.setItem('emyCookiesAccepted', 'true');
    document.getElementById('cookieBanner').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
    if (!localStorage.getItem('emyCookiesAccepted')) {
        const banner = document.getElementById('cookieBanner');
        if (banner) banner.style.display = 'flex';
    }
});

// Contact Modal Logic
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) modal.style.display = 'flex';
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) modal.style.display = 'none';
}function openMyEmyModal() {
    const modal = document.getElementById('myEmyModal');
    if (modal) modal.style.display = 'flex';
}

function closeMyEmyModal() {
    const modal = document.getElementById('myEmyModal');
    if (modal) modal.style.display = 'none';
}