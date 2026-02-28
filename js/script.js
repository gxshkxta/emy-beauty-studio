let currentDate = new Date();
const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

function renderCalendar(){
  calendar.innerHTML="";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Показваме месеца на български
  monthYear.textContent = currentDate.toLocaleDateString('bg-BG',{month:'long',year:'numeric'});

  const days = new Date(year,month+1,0).getDate();

  for(let i=1;i<=days;i++){
    const day = document.createElement("div");
    day.className="day";
    day.innerHTML=`<div class="day-number">${i}</div>`;
    day.onclick=()=>openModal();
    calendar.appendChild(day);
  }
}

function changeMonth(dir){
  currentDate.setMonth(currentDate.getMonth()+dir);
  renderCalendar();
}

function toggleTab(tab){
  const content = tab.querySelector(".menu-content");
  content.style.display = content.style.display === "block" ? "none" : "block";
}

function openModal(){
  document.getElementById("modal").style.display="flex";
}

function closeModal(){
  document.getElementById("modal").style.display="none";
}

/* Автоматична ротация на галерията */
let index = 0;
const track = document.getElementById("track");

setInterval(()=>{
  const imagesCount = track.children.length;
  index++;
  if(index >= imagesCount) index = 0;
  // 320px е широчината на снимката (300px) + разстоянието (20px)
  track.style.transform = `translateX(-${index * 320}px)`;
}, 3000);

// Стартираме календара при зареждане
renderCalendar();