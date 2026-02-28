document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const monthDisplay = document.getElementById("monthDisplay");
    const prevBtn = document.getElementById("prevMonth");
    const nextBtn = document.getElementById("nextMonth");

    let currentDate = new Date(); // Текуща дата

    const monthNames = [
        "Януари", "Февруари", "Март", "Април", "Май", "Юни",
        "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
    ];

    function renderCalendar() {
        calendar.innerHTML = "";
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthDisplay.innerText = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Корекция за започване от Понеделник (getDay: 0 е Неделя)
        let startingDay = firstDay === 0 ? 6 : firstDay - 1;

        // Празни клетки
        for (let i = 0; i < startingDay; i++) {
            calendar.appendChild(document.createElement("div"));
        }

        // Дните
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement("div");
            day.className = "day";
            day.innerText = i;

            // Проверка за уикенд (Събота и Неделя)
            const dateToCheck = new Date(year, month, i);
            const dayOfWeek = dateToCheck.getDay();
            if (dayOfWeek === 6 || dayOfWeek === 0) {
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

    prevBtn.onclick = () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    };

    nextBtn.onclick = () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    };

    renderCalendar();
});