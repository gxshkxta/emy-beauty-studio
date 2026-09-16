// ПЪТ КЪМ ТВОИТЕ СНИМКИ
const IMAGE_PATH = "assets/images/"; 
const PHOTO_COUNT = 19;

/* МЕНЮ */
function toggleMenu() {
    const tabs = document.getElementById('sideTabs');
    if(tabs) tabs.classList.toggle('active');
}

/* ГАЛЕРИЯ - ЗАРЕЖДАНЕ */
function loadGallery() {
    const track = document.getElementById('galleryTrack');
    if (!track) return;

    for (let i = 1; i <= PHOTO_COUNT; i++) {
        const img = document.createElement('img');
        // Тук добавяме проверка за името
        img.src = IMAGE_PATH + "photo" + i + ".jpg"; 
        img.alt = "Работа на студиото";
        
        // Ако снимката не се зареди, няма да спира целия код
        img.onerror = function() {
            console.log("Липсва снимка: " + this.src);
            this.remove(); 
        };
        track.appendChild(img);
    }
    // Дублиране за безкраен ефект
    track.innerHTML += track.innerHTML;
}