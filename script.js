// Menampilkan Tanggal dan Jam
function updateTime() {
    const now = new Date();
    document.getElementById('tanggal').textContent = `Tanggal: ${now.toLocaleDateString()}`;
    document.getElementById('jam').textContent = `Jam: ${now.toLocaleTimeString()}`;
}
setInterval(updateTime, 1000);

// Mengambil Data Cuaca
async function getWeather() {
    const API_KEY = 77d988f2a3d7db4fcd909c288c1f0d31;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Suak,Sidomulyo,Lampung&units=metric&appid=${API_KEY}`);
    const data = await response.json();
    const description = data.weather[0].description;
    const temp = data.main.temp;
    document.getElementById('cuaca').textContent = `Cuaca: ${description}, ${temp}°C`;
}
getWeather();

// Mengambil Data Absensi dari Google Sheets
async function getAbsensi() {
    const SHEET_ID = '1iIRjxpmRaGuqjAxxqzhzCbmLXsE8sLeUqJ6ajxBmC4w';
    const API_KEY = '1097877629845-87tt9aof8lecp9c9eih9lqnltjdejbs6.apps.googleusercontent.com';
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!C:M?key=${API_KEY}`);
    const data = await response.json();
    const rows = data.values;

    const absensiContainer = document.getElementById('absensi');
    rows.slice(1).forEach(row => {
        const nama = row[0];
        const kehadiran = row[9]; // Sesuaikan kolom sesuai data
        const entry = document.createElement('p');
        entry.textContent = `${nama}: ${kehadiran}`;
        absensiContainer.appendChild(entry);
    });
}
getAbsensi();

// Kalender dengan FullCalendar
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [] // Tambahkan event dari API Google Calendar jika diperlukan
    });
    calendar.render();
});

// Menambahkan Agenda
document.getElementById('agenda-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const tanggal = document.getElementById('agenda-tanggal').value;
    const jam = document.getElementById('agenda-jam').value;
    const desc = document.getElementById('agenda-desc').value;

    if (tanggal && jam && desc) {
        alert(`Agenda berhasil ditambahkan:\n${tanggal} ${jam} - ${desc}`);
    } else {
        alert('Harap lengkapi semua bidang.');
    }
});
