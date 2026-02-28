document.addEventListener("DOMContentLoaded", () => {
    // 1. Логика за менюто
    const menuToggle = document.getElementById("menuToggle");
    const sideMenu = document.getElementById("sideMenu");

    menuToggle.onclick = () => {
        sideMenu.classList.toggle("active");
    };

    // Затваряне при клик извън него
    document.addEventListener("click", (e) => {
        if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            sideMenu.classList.remove("active");
        }
    });

    // 2. Логика за календара (Актуализирана)
    const calendar = document.getElementById("calendar");
    const monthDisplay = document.getElementById("monthDisplay");
    let currentDate = new Date();

    function renderCalendar() {
        calendar.innerHTML = "";
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        monthDisplay.innerText = new Intl.DateTimeFormat('bg-BG', { month: 'long', year: 'numeric' }).format(currentDate);

        // Намиране на първия ден (0 е неделя, затова го превръщаме в 0=понеделник)
        let firstDayIndex = new Date(year, month, 1).getDay();
        let shift = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Празни полета за подравняване
        for (let x = 0; x < shift; x++) {
            const emptyDiv = document.createElement("div");
            calendar.appendChild(emptyDiv);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement("div");
            day.className = "day";
            day.innerText = i;
            
            const dateObj = new Date(year, month, i);
            if (dateObj.getDay() === 0 || dateObj.getDay() === 6) {
                day.classList.add("weekend");
            }

            day.onclick = () => {
                if (!day.classList.contains("weekend")) {
                    document.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
                    day.classList.add("active");
                }
            };
            calendar.appendChild(day);
        }
    }

    document.getElementById("prevMonth").onclick = () => { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); };
    document.getElementById("nextMonth").onclick = () => { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); };

    renderCalendar();
});