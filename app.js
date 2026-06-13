const apiKey    = "9aaf8762ee5b5a8a33c4f7209f6f6f29";
const apiUrl    = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search .btn");
const themeMap = {
  "Clouds":      "w-clouds",
  "Clear":       "w-clear",
  "Rain":        "w-rain",
  "Drizzle":     "w-drizzle",
  "Mist":        "w-mist",
  "Fog":         "w-mist",
  "Haze":        "w-mist",
  "Snow":        "w-snow",
  "Thunderstorm":"w-thunder",
};

function setTheme(main) {
  document.body.classList.forEach(c => {
    if (c.startsWith("w-")) document.body.classList.remove(c);
  });
  const cls = themeMap[main];
  if (cls) document.body.classList.add(cls);
}

async function checkWeather(city) {
  city = city.trim();
  if (!city) return;

  try {
    const response = await fetch(`${apiUrl}&q=${encodeURIComponent(city)}&appid=${apiKey}`);

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".Weather").style.display = "none";
      return;
    }

    const data = await response.json();
    const main = data.weather[0].main;        
    const icon = data.weather[0].icon;        
    const desc = data.weather[0].description; 

    document.querySelector(".city").textContent      = data.name;
    document.querySelector(".temp").textContent      = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent  = data.main.humidity + "%";
    document.querySelector(".wind").textContent = Math.round(data.wind.speed * 3.6) + " km/h";
    document.querySelector(".condition").textContent =
      desc.charAt(0).toUpperCase() + desc.slice(1);
    document.querySelector(".Weather-icon").src =
      `https://openweathermap.org/img/wn/${icon}@2x.png`;

    setTheme(main);

    document.querySelector(".Weather").style.display = "block";
    document.querySelector(".error").style.display   = "none";

  } catch (err) {
    document.querySelector(".error").style.display   = "block";
    document.querySelector(".Weather").style.display = "none";
  }
}
searchBtn.addEventListener("click", () => checkWeather(searchBox.value));
searchBox.addEventListener("keydown", e => {
  if (e.key === "Enter") checkWeather(searchBox.value);
});
