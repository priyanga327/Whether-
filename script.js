const cityInput = document.getElementById("cityInput");
const getWeatherButton = document.getElementById("getWeather");
const locationDisplay = document.getElementById("location");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");

getWeatherButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

async function getWeatherData(city) {
    const apiKey = "YOUR_REAL_API_KEY"; // Put your actual API key here
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    // Use a free proxy to avoid CORS issues
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;

    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (data.cod === 200) {
            locationDisplay.textContent = `Location: ${data.name}, ${data.sys.country}`;
            temperatureDisplay.textContent = `Temperature: ${data.main.temp}°C`;
            descriptionDisplay.textContent = `Description: ${data.weather[0].description}`;
        } else {
            locationDisplay.textContent = `Error: ${data.message}`;
            temperatureDisplay.textContent = "";
            descriptionDisplay.textContent = "";
        }
    } catch (error) {
        locationDisplay.textContent = "Network or API error.";
        temperatureDisplay.textContent = "";
        descriptionDisplay.textContent = "";
    }
}


