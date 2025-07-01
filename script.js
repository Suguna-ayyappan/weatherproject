

// Predefined cities for datalist (optional)
const locations = ["New York", "London", "Chennai", "Delhi", "Paris", "Tokyo","Karnataka"];
const datalist = document.getElementById("locationList");

locations.forEach(city => {
  const option = document.createElement("option");
  option.value = city;
  datalist.appendChild(option);
});

function getWeather() {
  const city = document.getElementById("locationInput").value.trim();
  const resultBox = document.getElementById("weatherResult");

  if (city === "") {
    resultBox.innerHTML = "<p>Please enter a location.</p>";
    return;
  }
  const apiKey = '7baedf95c394f45accb45ff5053d8092';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const output = `
          <h3>${data.name}, ${data.sys.country}</h3>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Weather: ${data.weather[0].main}</p>
          <p>Description: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        resultBox.innerHTML = output;
      } else {
        resultBox.innerHTML = `<p>City not found. Try another one.</p>`;
      }
    })
    .catch(error => {
      console.error("Error:", error);
      resultBox.innerHTML = "<p>Could not fetch weather data.</p>";
    });
}
