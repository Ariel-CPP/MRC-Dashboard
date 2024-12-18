document.addEventListener('DOMContentLoaded', function() {
    // Update current time, date, and day
    function updateTime() {
        const now = moment();
        document.getElementById('current-time').innerText = now.format('h:mm:ss a');
        document.getElementById('current-date').innerText = now.format('MMMM Do YYYY');
        document.getElementById('current-day').innerText = now.format('dddd');
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Fetch weather data
    const apiKey = '77d988f2a3d7db4fcd909c288c1f0d31'; // Replace with your OpenWeatherMap API key
    const city = 'Suak, Sidomulyo, Lampung Selatan';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(url)
        .then(response => {
            const data = response.data;
            document.getElementById('weather-info').innerText = `Temperature: ${data.main.temp}°C, Condition: ${data.weather[0].description}`;
            document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        })
        .catch(error => {
            document.getElementById('weather-info').innerText = 'Error fetching weather data.';
        });

    // Handle agenda form submission
    document.getElementById('agenda-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const date = document.getElementById('agenda-date').value;
        const time = document.getElementById('agenda-time').value;
        const details = document.getElementById('agenda-details').value;

        // Logic to add the agenda to the calendar
        console.log(`Agenda added: ${date} ${time} - ${details}`);
        alert('Agenda added successfully!');
    });
});
