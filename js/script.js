document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const sideMenu = document.getElementById("sideMenu");

    menuToggle.onclick = () => sideMenu.classList.toggle("active");

    const calendar = document.getElementById("calendar");
    const monthDisplay = document.getElementById("monthDisplay");
    let currentDate = new Date();

    function render() {
        calendar.innerHTML = "";
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        monthDisplay.innerText = new Intl.DateTimeFormat('bg-BG', { month: 'long', year: 'numeric' }).format(currentDate);

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let shift = firstDay === 0 ? 6 : firstDay - 1;

        for (let i = 0; i < shift; i++) calendar.appendChild(document.createElement("div"));

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement("div");
            day.className = "day";
            day.innerText = i;
            if (new Date(year, month, i).getDay() % 6 === 0) day.classList.add("weekend");
            calendar.appendChild(day);
        }
    }

    document.getElementById("prevMonth").onclick = () => { currentDate.setMonth(currentDate.getMonth() - 1); render(); };
    document.getElementById("nextMonth").onclick = () => { currentDate.setMonth(currentDate.getMonth() + 1); render(); };
    render();
});