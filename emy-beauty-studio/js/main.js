document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("gallerySlider");
    const totalPhotos = 19;
    const photoPaths = [];

    for (let i = 1; i <= totalPhotos; i++) {
        photoPaths.push(`assets/images/photo${i}.jpg`);
    }

    function fillSlider(paths) {
        paths.forEach(path => {
            const item = document.createElement("div");
            item.className = "gallery-item";
            const img = document.createElement("img");
            img.src = path;
            img.alt = "Studio Gallery";
            img.onerror = () => item.style.display = "none";
            item.appendChild(img);
            slider.appendChild(item);
        });
    }

    // Дублираме за безкраен ефект
    fillSlider(photoPaths);
    fillSlider(photoPaths);
});