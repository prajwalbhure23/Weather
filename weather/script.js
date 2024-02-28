const apiKey = "1edb2c48cfc23eaecac06a2439ec488b";

function fetchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => {
      alert("No weather found.");
      console.error(error);
    });
}

function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  document.querySelector(".city").innerText = `Weather in ${name}`;
  document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = `${temp}°C`;
  document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
  document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
  document.querySelector(".weather").classList.remove("loading");
  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
}

document.querySelector(".search button").addEventListener("click", function() {
  const city = document.querySelector(".search-bar").value;
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    const city = document.querySelector(".search-bar").value;
    if (city) {
      fetchWeather(city);
    } else {
      alert("Please enter a city name.");
    }
  }
});

fetchWeather("Nagpur");


  