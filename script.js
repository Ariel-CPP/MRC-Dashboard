// Display current time
function updateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString('en-GB', options);
    document.getElementById('current-time').textContent = `${time} - ${date}`;
}
setInterval(updateTime, 1000);
updateTime();

// Fetch weather data
const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Suak,Lampung,ID&units=metric&appid=77d988f2a3d7db4fcd909c288c1f0d31';
axios.get(weatherAPI)
    .then(response => {
        const weather = response.data;
        document.getElementById('weather-info').innerHTML = `
            <p><strong>${weather.weather[0].description}</strong></p>
            <p>Temperature: ${weather.main.temp} &#8451;</p>
            <p>Humidity: ${weather.main.humidity}%</p>
        `;
    })
    .catch(error => {
        document.getElementById('weather-info').textContent = 'Unable to fetch weather data.';
    });

// Initialize calendar
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [
            { title: 'New Year', start: '2024-01-01', color: 'red', textColor: 'white' },
            { title: 'Independence Day', start: '2024-08-17', color: 'red', textColor: 'white' },
            // Add more holidays here...
        ]
    });
    calendar.render();
});

// Handle agenda form submission
document.getElementById('agenda-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const date = document.getElementById('agenda-date').value;
    const time = document.getElementById('agenda-time').value;
    const details = document.getElementById('agenda-details').value;

    const calendar = FullCalendar.Calendar.getCalendar(document.getElementById('calendar'));
    calendar.addEvent({
        title: details,
        start: `${date}T${time}`
    });

    alert('Agenda added to calendar!');
});
