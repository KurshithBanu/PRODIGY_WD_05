const apiKey = '7b40ca0954e89f18a60ecb341442dd48'; // Your weather API key
const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('location');
const weatherContainer = document.getElementById('weatherContainer');
const locationName = document.getElementById('locationName');
const temperature = document.getElementById('temperature');
const conditions = document.getElementById('conditions');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        weatherContainer.innerHTML = '<p>Please enter a valid location.</p>';
    }
});

function fetchWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod !== 200) {
                throw new Error(data.message);
            }
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherContainer.innerHTML = `<p>Error fetching weather data: ${error.message}. Please try again.</p>`;
        });
}

function displayWeather(data) {
    const { name } = data;
    const { temp } = data.main;
    const { description } = data.weather[0];

    locationName.textContent = `Location: ${name}`;
    temperature.textContent = `Temperature: ${temp} °C`;
    conditions.textContent = `Conditions: ${description}`;
}
