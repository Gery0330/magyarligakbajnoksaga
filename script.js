// COUNTDOWN
const raceDate = new Date("2026-04-10T18:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = raceDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerText = "Futam elkezdődött!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  document.getElementById("countdown").innerText =
    `${days} nap ${hours} óra ${minutes} perc`;
}

setInterval(updateCountdown, 1000);

// MOBILE MENU
function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

// HÍREK (LOCAL)
function loadNews() {
  const news = JSON.parse(localStorage.getItem("news")) || [];
  const container = document.getElementById("news-container");

  news.forEach(n => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${n.title}</h3><p>${n.text}</p>`;
    container.appendChild(div);
  });
}

loadNews();
