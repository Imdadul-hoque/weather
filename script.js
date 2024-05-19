async function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    const apiKey = '61ad039c650d490a9ba53215241905'; 
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error);
    }
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = `
        <div><strong>Location:</strong> ${data.location.name}, ${data.location.country}</div>
        <div><strong>Temperature:</strong> ${data.current.temp_c} °C</div>
        <div><strong>Condition:</strong> ${data.current.condition.text}</div>
        <div><strong>Humidity:</strong> ${data.current.humidity} %</div>
        <div><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</div>
        <img src="${data.current.condition.icon}" alt="Weather icon">
    `;
}

function displayError(error) {
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = `<div class="error-message">Error: ${error.message}</div>`;
}
