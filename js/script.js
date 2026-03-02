window.onload = function() {
    const track = document.getElementById('gallery-track');
    if (track) {
        for (let i = 0; i < 38; i++) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    // Вземаме число от 1 до 19
    const imgNum = (i % 19) + 1;
    
    // ВАЖНО: Увери се, че снимките в папка assets се казват 1.jpg, 2.jpg...
    item.style.backgroundImage = `url('assets/${imgNum}.jpg')`;
    
    track.appendChild(item);
}
        }
    }
};

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('active');
}