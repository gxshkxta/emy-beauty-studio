document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const monthDisplay = document.getElementById("monthDisplay");
    const prevBtn = document.getElementById("prevMonth");
    const nextBtn = document.getElementById("nextMonth");

    let currentDate = new Date();

    const monthNames = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];

    function renderCalendar() {
        calendar.innerHTML = "";
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        monthDisplay.innerText = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let startingDay = firstDay === 0 ? 6 : firstDay - 1;

        for (let i = 0; i < startingDay; i++) {
            calendar.appendChild(document.createElement("div"));
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement("div");
            day.className = "day";
            day.innerText = i;
            const dateToCheck = new Date(year, month, i);
            if (dateToCheck.getDay() === 6 || dateToCheck.getDay() === 0) day.classList.add("weekend");

            day.onclick = () => {
                if (!day.classList.contains("weekend")) {
                    document.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
                    day.classList.add("active");
                }
            };
            calendar.appendChild(day);
        }
    }

    prevBtn.onclick = () => { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); };
    nextBtn.onclick = () => { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); };
    renderCalendar();
});