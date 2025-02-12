
// const apiKey = 'b132df1013478a7e6084f8d60afd0e31'; 
// const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// const weatherDiv = document.getElementById('weather');
// const locationForm = document.getElementById('locationForm');
// const locationInput = document.getElementById('locationInput');

// locationForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const location = locationInput.value.trim();
//     if (location) {
//         getWeatherData(location);
//     } else {
//         weatherDiv.innerHTML = '<p>Please enter a city name.</p>';
//     }
// });

// async function getWeatherData(location) {
//     try {
//         const response = await fetch(`${weatherUrl}?q=${location}&appid=${apiKey}&units=metric`);
//         const data = await response.json();

//         if (data.cod !== 200) {
//             weatherDiv.innerHTML = `<p>${data.message}</p>`;
//             return;
//         }

//         // Fetch weather icon
//         const iconCode = data.weather[0].icon;
//         const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

//         const weatherInfo = `
//             <h2>${data.name}, ${data.sys.country}</h2>
//             <img src="${iconUrl}" alt="Weather Icon">
//             <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
//             <p><strong>Description:</strong> ${data.weather[0].description}</p>
//             <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
//             <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
//         `;
//         weatherDiv.innerHTML = weatherInfo;
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         weatherDiv.innerHTML = '<p>Unable to fetch weather data. Please check your internet connection and try again.</p>';
//     }
// }

const apiKey = 'b132df1013478a7e6084f8d60afd0e31'; // Use your OpenWeatherMap API key
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

const weatherDiv = document.getElementById('weather');
const locationForm = document.getElementById('locationForm');
const locationInput = document.getElementById('locationInput');

let currentTemperature = 0;
let isCelsius = true; // Default unit is Celsius

locationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();
    if (location) {
        getWeatherData(location);
    } else {
        weatherDiv.innerHTML = '<p>Please enter a city name.</p>';
    }
});

async function getWeatherData(location) {
    try {
        const response = await fetch(`${weatherUrl}?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod !== 200) {
            weatherDiv.innerHTML = `<p>${data.message}</p>`;
            return;
        }

        // Store the temperature
        currentTemperature = data.main.temp;

        // Fetch weather icon
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const weatherInfo = `
            <div class="weather-box">
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="${iconUrl}" alt="Weather Icon">
                <p id="temperature"><strong>Temperature:</strong> ${currentTemperature}°C</p>
                <p><strong>Description:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>

                <div class="toggle-container">
                    <span class="toggle-label">°C</span>
                    <label class="toggle-switch">
                        <input type="checkbox" id="tempToggle">
                        <span class="slider"></span>
                    </label>
                    <span class="toggle-label">°F</span>
                </div>
            </div>
        `;

        weatherDiv.innerHTML = weatherInfo;

        // Add event listener to toggle switch
        document.getElementById("tempToggle").addEventListener("change", toggleTemperature);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDiv.innerHTML = '<p>Unable to fetch weather data. Please check your internet connection and try again.</p>';
    }
}

// Function to toggle temperature between Celsius and Fahrenheit
function toggleTemperature() {
    isCelsius = !isCelsius;
    const tempElement = document.getElementById("temperature");
    
    if (isCelsius) {
        tempElement.innerHTML = `<strong>Temperature:</strong> ${currentTemperature}°C`;
    } else {
        const fahrenheitTemp = (currentTemperature * 9/5) + 32;
        tempElement.innerHTML = `<strong>Temperature:</strong> ${fahrenheitTemp.toFixed(1)}°F`;
    }
}
