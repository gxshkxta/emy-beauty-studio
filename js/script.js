window.onload = function() {
    const track = document.getElementById('gallery-track');
    if (track) {
        for (let i = 0; i < 38; i++) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `<span style="color:rgba(255,255,255,0.3)">${(i % 19) + 1}</span>`;
            track.appendChild(item);
        }
    }
};

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('active');
}