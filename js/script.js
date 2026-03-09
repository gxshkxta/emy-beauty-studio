const IMAGE_PATH = "assets/images/";
const PHOTO_COUNT = 19;
let currentDate = new Date();

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