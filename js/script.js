document.addEventListener("DOMContentLoaded", () => {
    // Отваряне на менюто
    const menuToggle = document.getElementById("menuToggle");
    const sideMenu = document.getElementById("sideMenu");
    
    menuToggle.onclick = () => sideMenu.classList.toggle("active");

    // Календар
    const grid = document.getElementById("calendar");
    const label = document.getElementById("monthDisplay");
    let d = new Date();

    function render() {
        grid.innerHTML = "";
        const y = d.getFullYear();
        const m = d.getMonth();
        label.innerText = new Intl.DateTimeFormat('bg-BG', { month: 'long', year: 'numeric' }).format(d);

        const first = new Date(y, m, 1).getDay();
        const total = new Date(y, m + 1, 0).getDate();
        let gap = first === 0 ? 6 : first - 1;

        for (let i = 0; i < gap; i++) grid.appendChild(document.createElement("div"));

        for (let i = 1; i <= total; i++) {
            const cell = document.createElement("div");
            cell.className = "day";
            cell.innerText = i;
            grid.appendChild(cell);
        }
    }

    document.getElementById("prevMonth").onclick = () => { d.setMonth(d.getMonth() - 1); render(); };
    document.getElementById("nextMonth").onclick = () => { d.setMonth(d.getMonth() + 1); render(); };
    render();
});