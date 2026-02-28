document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");

    menuToggle.onclick = () => sidebar.classList.toggle("open");

    const daysGrid = document.getElementById("daysGrid");
    const monthTitle = document.getElementById("monthTitle");
    let viewDate = new Date();

    function draw() {
        daysGrid.innerHTML = "";
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        
        monthTitle.innerText = new Intl.DateTimeFormat('bg-BG', { month: 'long', year: 'numeric' }).format(viewDate);

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        let offset = firstDay === 0 ? 6 : firstDay - 1;

        for (let i = 0; i < offset; i++) {
            daysGrid.appendChild(document.createElement("div"));
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement("div");
            day.className = "day-cell";
            day.innerText = i;
            
            const dow = new Date(year, month, i).getDay();
            if (dow === 0 || dow === 6) day.classList.add("sun");
            
            daysGrid.appendChild(day);
        }
    }

    document.getElementById("prev").onclick = () => { viewDate.setMonth(viewDate.getMonth() - 1); draw(); };
    document.getElementById("next").onclick = () => { viewDate.setMonth(viewDate.getMonth() + 1); draw(); };
    draw();
});