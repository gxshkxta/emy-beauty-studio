document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const sideMenu = document.getElementById("sideMenu");

    // Отваряне/Затваряне на менюто
    menuToggle.addEventListener("click", () => {
        sideMenu.classList.toggle("active");
    });

    const calendar = document.getElementById("calendar");
    const monthDisplay = document.getElementById("monthDisplay");
    let currentDate = new Date();

    function renderCalendar() {
        calendar.innerHTML = "";
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthDisplay.innerText = new Intl.DateTimeFormat('bg-BG', { month: 'long', year: 'numeric' }).format(currentDate);

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Превръщаме Неделя (0) в 6, а Понеделник в 0
        let startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        // Празни клетки
        for (let i = 0; i < startDay; i++) {
            const empty = document.createElement("div");
            calendar.appendChild(empty);
        }

        // Дните от месеца
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement("div");
            day.className = "day";
            day.innerText = i;
            
            const d = new Date(year, month, i).getDay();
            if (d === 0 || d === 6) day.classList.add("weekend");
            
            calendar.appendChild(day);
        }
    }

    document.getElementById("prevMonth").onclick = () => { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); };
    document.getElementById("nextMonth").onclick = () => { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); };

    renderCalendar();
});