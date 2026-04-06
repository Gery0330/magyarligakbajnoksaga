const supabase = window.supabase.createClient(
  "https://YOUR_PROJECT.supabase.co",
  "YOUR_ANON_KEY"
);

async function showCategory(cat) {
  const content = document.getElementById("category-content");

  content.innerHTML = "<p>Betöltés...</p>";

  // STANDINGS
  const { data: standings } = await supabase
    .from("standings")
    .select("*")
    .eq("category", cat)
    .order("points", { ascending: false });

  // CALENDAR
  const { data: calendar } = await supabase
    .from("calendar")
    .select("*")
    .eq("category", cat);

  // HTML GENERÁLÁS
  let html = `<h2>${cat.toUpperCase()}</h2>`;

  html += "<h3>🏆 Pontállás</h3><ul>";
  standings.forEach(d => {
    html += `<li>${d.driver} - ${d.points} pont</li>`;
  });
  html += "</ul>";

  html += "<h3>📅 Versenynaptár</h3><ul>";
  calendar.forEach(r => {
    html += `<li>${r.track} - ${r.date}</li>`;
  });
  html += "</ul>";

  content.innerHTML = html;
}

const ADMIN_CODE = "MLBZq7!Lp9#Vm2$KxR8@MLB";

function unlockAdmin() {
  const code = prompt("Admin kód:");
  if (code === ADMIN_CODE) {
    document.getElementById("admin-panel").style.display = "block";
  }
}

async function addDriver() {
  const driver = document.getElementById("driver").value;
  const points = document.getElementById("points").value;

  await supabase.from("standings").insert([
    { driver, points, category: "f1" }
  ]);

  alert("Hozzáadva!");
}

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

// ADMIN SHORTCUT
document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
    window.location.href = "pages/admin.html";
  }
});

loadNews();
