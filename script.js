// OpenWeatherMap API Key
const apiKey = '6f9776ac86b93cb8b672f485fe6b352f';

// Get DOM elements
const searchBtn = document.getElementById('searchBtn');
const loadingDiv = document.getElementById('loading');
const weatherInfoDiv = document.getElementById('weatherInfo');

// Event listener for the search button click
searchBtn.addEventListener('click', getWeather);

async function getWeather() {
    // Get city name from input field
    const city = document.getElementById('cityInput').value;
    // API endpoint URL with the city name and API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Show loading spinner and clear previous weather information
    loadingDiv.classList.remove('hidden');
    weatherInfoDiv.innerHTML = '';

    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('City not found!'); // Throw an error if city is not found
        }

        // Parse the response data as JSON
        const data = await response.json();

        // Display weather information on the webpage
        displayWeather(data);
    } catch (error) {
        // Handle errors (e.g., city not found, network issues)
        console.error('Error fetching weather data:', error.message);
        displayError(error.message); // Display error message on the webpage
    } finally {
        // Hide the loading spinner after fetching data (whether successful or not)
        loadingDiv.classList.add('hidden');
    }
}

function displayWeather(data) {
    // Extract required data from the API response
    const cityName = data.name;
    const temperatureCelsius = data.main.temp;
    // Convert celsius to Fahrenheit
    const temperature = (temperatureCelsius * 9/5) + 32;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    
    // Get the appropriate weather icon path based on weather condition ID
    const weatherIconPath = getWeatherIconClass(data.weather[0].id);

    // Create an image element for the weather icon
    const weatherIconElement = document.createElement('img');
    weatherIconElement.src = weatherIconPath;
    weatherIconElement.alt = 'Weather Icon';
    weatherInfoDiv.appendChild(weatherIconElement);

    // Update the HTML content to display weather information
    weatherInfoDiv.innerHTML += `
        <h2>Weather in ${cityName}</h2>
        <p>Temperature: ${temperature.toFixed(2)}°F</p>
        <p>Description: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}

// Function to display error messages on the webpage
function displayError(message) {
    weatherInfoDiv.innerHTML = `<p class="error">${message}</p>`;
}

// Function to determine the appropriate weather icon class based on weather condition ID
function getWeatherIconClass(weatherId) {
    // Weather condition ID ranges are used to determine the appropriate icon class
    // Weather Icons library classes are used for different weather conditions
    if (weatherId >= 200 && weatherId < 300) {
        return 'images/thunderstorm.png'; // Path to thunderstorm icon image
    } else if (weatherId >= 300 && weatherId < 400) {
        return 'images/showers.png'; // Path to showers icon image
    } else if (weatherId >= 500 && weatherId < 600) {
        return 'images/rain.png'; // Path to rain icon image
    } else if (weatherId >= 600 && weatherId < 700) {
        return 'images/snow.png'; // Path to snow icon image
    } else if (weatherId >= 700 && weatherId < 800) {
        return 'images/fog.png'; // Path to fog icon image
    } else if (weatherId === 800) {
        return 'images/day-sunny.png'; // Path to clear sky icon image
    } else if (weatherId > 800) {
        return 'images/cloudy.png'; // Path to cloudy icon image
    } else {
        return 'images/not-available.png'; // Path to not available icon image
    }
}