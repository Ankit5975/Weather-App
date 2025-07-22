async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "0de99d3f1d67963b9adeea5883808058";

  if (city === "") {
    document.getElementById("weatherResult").innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Use this to debug
    console.log(data);

    if (data.cod !== 200) {
      throw new Error(data.message || "City not found");
    }

    displayWeather(data);
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
  }
}

function displayWeather(data) {
  const weatherHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
  `;
  document.getElementById("weatherResult").innerHTML = weatherHTML;
}
