const apiKey = `77e966656b8645bc9f5180035252508`;
const locationEl = document.getElementById("location");
const iconEl = document.getElementById("icon");
const tempEl = document.getElementById("temp");
const conditionEl = document.getElementById("condition");
const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("search");
const clear_button = document.getElementById("clear_button");

// Géolocalisation météo actuelle
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((pos) => {
    fetchWeather(`${pos.coords.latitude},${pos.coords.longitude}`);
  });
}

// Recherche manuelle
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

function fetchWeather(query) {
  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&lang=fr`)
    .then((res) => res.json())
    .then((data) => {
      locationEl.textContent = `${data.location.name}, ${data.location.country}`;
      iconEl.src = `https:${data.current.condition.icon}`;
      tempEl.textContent = `🌡️ ${data.current.temp_c}°C (ressenti ${data.current.feelslike_c}°C)`;
      conditionEl.textContent = data.current.condition.text;
    })
    .catch(() => {
      locationEl.textContent = "Ville introuvable ❌";
    });
}
