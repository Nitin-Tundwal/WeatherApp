const weatherBtn = document.querySelector("#your-weather");
const searchWeather = document.querySelector("#search-weather");
const searchForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const searchBtn = document.querySelector("#search-btn");
const loader = document.querySelector(".loading-page");
const accessPage = document.querySelector(".grant-location");
const locationAccessBtn = document.querySelector("#grant-access");
const yourWeather = document.querySelector(".your-weather");
const cityName = document.querySelector("#city-name");
const flag = document.querySelector("#flag");
const weather = document.querySelector("#weather");
const weatherImg = document.querySelector("#weather-img");
const temprature = document.querySelector("#temp");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
const cloud = document.querySelector("#cloud");
const yourWeatherBtn = document.querySelector("#your-weather");
const searchWeatherBtn = document.querySelector("#search-weather");

const API_KEY = "e715826f584b6bbb8c1359a030ce1157";

accessPage.classList.add("active");

function handleYourLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    console.log("api is not supporting");
  }
  accessPage.classList.remove("active");
  loader.classList.add("active");
  yourWeather.classList.add("active");
  loader.classList.remove("active");
}

let lat = "";
let lon = "";
function getPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  fetchApi();
}

locationAccessBtn.addEventListener("click", handleYourLocation);

const currentTab = yourWeather;
const oldTab = searchForm;

function handleYourLocationBtn() {
  handleYourLocation();
  loader.classList.add("loading-page-yw");
  yourWeather.classList.remove("your-weather-fs");
  searchWeatherBtn.classList.remove("click-btn");
  yourWeatherBtn.classList.add("click-btn");
  accessPage.classList.remove("active");
  searchForm.classList.remove("active");
  yourWeather.classList.add("active");
  loader.classList.add("active");
  loader.classList.remove("active");
}

weatherBtn.addEventListener("click", handleYourLocationBtn);

async function fetchApi() {
  loader.classList.add("active");
  try {
    const responce = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    console.log(responce);
    const data = await responce.json();
    // console.log(data);
    loader.classList.remove("active");
    yourWeather.classList.add("active");
    fetchUserWeather(data);
  } catch (e) {
    if (lat && lon == "") {
      alert("Location Not Found");
    }
  }
}

function fetchUserWeather(userWeather) {
  cityName.innerHTML = userWeather?.name;
  flag.src = `https://flagcdn.com/144x108/${userWeather?.sys?.country.toLowerCase()}.png`;
  weather.innerHTML = userWeather?.weather?.[0]?.description;
  weatherImg.src = `http://openweathermap.org/img/w/${userWeather?.weather?.[0]?.icon}.png`;
  temprature.innerHTML = `${userWeather?.main?.temp} °C`;
  wind.innerHTML = `${userWeather?.wind?.speed} m/s`;
  humidity.innerHTML = `${userWeather?.main?.humidity} %`;
  cloud.innerHTML = `${userWeather?.clouds?.all} %`;
}

function handleSearchLocation() {
  loader.classList.remove("loading-page-yw");
  yourWeatherBtn.classList.remove("click-btn");
  searchWeatherBtn.classList.add("click-btn");
  loader.classList.add("active");
  accessPage.classList.remove("active");
  yourWeather.classList.add("your-weather-fs");
  yourWeather.classList.remove("active");
  searchForm.classList.add("active");
  loader.classList.remove("active");
}

searchWeather.addEventListener("click", handleSearchLocation);

function fetchWeatherByCity(e) {
  e.preventDefault();
  let cityName = searchInput.value;
  if (cityName == "") {
    return;
  } else {
    cityApi(cityName);
  }
  document.querySelector("#reset").reset();
}

searchForm.addEventListener("submit", fetchWeatherByCity);

async function cityApi(city) {
  loader.classList.add("active");

  try {
    const responce = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await responce.json();
    loader.classList.remove("active");
    yourWeather.classList.add("active");
    fetchUserWeather(data);
  } catch (e) {
    alert("City Not Found");
  }
}
