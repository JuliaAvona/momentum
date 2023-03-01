import languages from "./languages.js"; //import languages.js;

const timeElement = document.querySelector(".time"); //Time
const dateElement = document.querySelector(".date"); //Date
const greetingElement = document.querySelector(".greeting"); //Greeting
const allGreetingContainer = document.querySelector(".greeting-container"); //Greeting-all-block
const nameElement = document.querySelector(".name"); //Name
const slidePrev = document.querySelector(".slide-prev"); //button slide Prev
const slideNext = document.querySelector(".slide-next"); //button slide Next
const weatherIcon = document.querySelector(".weather-icon"); //WeatherIcon
const temperature = document.querySelector(".temperature"); //Temperature
const weatherDescription = document.querySelector(".weather-description"); //WeatherDescription
const city = document.querySelector(".city"); //City
const wind = document.querySelector(".wind"); //Wind
const allWeatherContainer = document.querySelector(".weather"); //Wind
const humidity = document.querySelector(".humidity"); //Humidity
const quoteText = document.querySelector(".quote"); //Quote
const quoteAuthor = document.querySelector(".author"); //Author
const allQuoteContainer = document.querySelector(".phrases"); //Author
const changeQuote = document.querySelector(".change-quote"); //change-quote
const allPlayerContainer = document.querySelector(".player");
const allToDoContainer = document.querySelector(".todo-list-section");

let TimeOfDay; //get TimeOfDay from function showGreeting
let randomNum;
let englishLang = "en";

// Checkbox - items - const
const checkboxTime = document.querySelector(".checkbox-time");
const checkboxDate = document.querySelector(".checkbox-date");
const checkboxPlayer = document.querySelector(".checkbox-player");
const checkboxGreeting = document.querySelector(".checkbox-greeting");
const checkboxQuote = document.querySelector(".checkbox-quote");
const checkboxWeather = document.querySelector(".checkbox-weather");
const checkboxToDo = document.querySelector(".checkbox-todo");

//Getting background image from API - const

const buttonGithub = document.querySelector(".github");
const buttonUnsplash = document.querySelector(".unsplash");
const buttonFlickr = document.querySelector(".flickr");
const typeOfApiButtons = document.querySelectorAll(".radio-buttons");
const searchPanel = document.querySelector(".search_panel");
const searchPanelWords = document.querySelector(".search_panel-words");

//Site - translater - const
const languagesBtnsContainer = document.querySelector(".languages");
const languageBtns = document.querySelectorAll(".languages-item");

//Setting menu - const
const settingPanel = document.querySelector(".settings");
const settingButton = document.querySelector(".setting-button");
let imageSearch = "food";

//Todo - const
const toDoButton = document.querySelector(".todo-list-button");
let list = document.querySelector(".todo-list");
let todoListWrapper = document.querySelector(".todo-list-wrapper");
let items = list.children;
let emptyListMessage = document.querySelector(".empty-tasks");
let newItemForm = document.querySelector(".add-form");
let newItemTitle = newItemForm.querySelector(".add-form-input");
let taskTemplate = document.querySelector(".task-template").content;
let newItemTemplate = taskTemplate.querySelector(".todo-list-item");

//1. Clock and calendar --- start

function showTime() {
  const date = new Date(); // get Time in this moment
  const currentTime = date.toLocaleTimeString(); // get only current TIME
  timeElement.textContent = currentTime; // write current TIME in html class 'time'
  setTimeout(showTime, 1000); // repeat every 1s
}
showTime();

function showDate() {
  const date = new Date(); // get Time in this moment
  const options = { weekday: "long", month: "long", day: "numeric" }; // date's format
  let currentDate = date.toLocaleDateString("Ru-Ru", options); //det date in Rus
  if (englishLang == "en") {
    currentDate = date.toLocaleDateString("en-Us", options); //det date in English
  }
  dateElement.textContent = currentDate; // write current Date in html class 'date'
  setTimeout(showDate, 100); // repeat every 1s
}
showDate();

//1. Clock and calendar --- finish

//2. Greetings and working with local storage --- start

function showGreeting() {
  const date = new Date(); // get Time in this moment
  const hours = date.getHours(); // get how Hours in this moment
  let partOfDay = [
    "Good night,",
    "Доброй ночи,",
    "Good morning,",
    "Доброе утро,",
    "Good afternoon,",
    "Добрый день,",
    "Good evening,",
    "Добрый вечер,",
  ];
  if (hours >= 0 && hours < 6) {
    // 00:00 -- 5:59 - Good night / Доброй/Спокойной ночи
    greetingPhraseLang(partOfDay[0], partOfDay[1], "night");
  } else if (hours >= 6 && hours < 12) {
    // 6:00 -- 11:59 - Good morning / Доброе утро
    greetingPhraseLang(partOfDay[2], partOfDay[3], "morning");
  } else if (hours >= 12 && hours < 18) {
    // 12:00 -- 17:59 - Good afternoon / Добрый день
    greetingPhraseLang(partOfDay[4], partOfDay[5], "afternoon");
  } else {
    // 18:00 -- 23:59 - Good evening / Добрый вечер
    greetingPhraseLang(partOfDay[6], partOfDay[7], "evening");
  }
  setTimeout(showGreeting, 1);
}
showGreeting();

function greetingPhraseLang(partOfDayEng, partOfDayRu, phrase) {
  TimeOfDay = phrase;
  if (englishLang == "en") {
    greetingElement.textContent = partOfDayEng;
  } else {
    greetingElement.textContent = partOfDayRu;
  }
}

function nameElementValueLang() {
  if (englishLang == "en") {
    nameElement.value = "[ENTER name]";
  } else {
    nameElement.value = "[Введите имя]";
  }
}

function setLocalStorage() {
  //before reloading or closing the page (beforeunload event), the data must be saved
  localStorage.setItem("name", nameElement.value); // - save a key/value pairs.
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  //before loading the page (load event), the data needs to be restored and displayed
  if (localStorage.getItem("name")) {
    //– get data by key key.
    nameElement.value = localStorage.getItem("name");
  }

  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
}

window.addEventListener("load", getLocalStorage);

//2. Greetings and working with local storage --- finish

//3. Image Slider --- start

function getRandomNum(num) {
  //random number from 1 to 20 inclusive
  randomNum = Math.ceil(Math.random() * num);
  return randomNum;
}
getRandomNum(20);

function setBg() {
  // Image Random Slider
  setLocalStorageValue("checkedGithub", true);
  setLocalStorageValue("checkedUnsplash", false);
  setLocalStorageValue("checkedFlickr", false);
  const img = new Image();
  buttonGithub.checked = true;
  searchPanel.disabled = true;
  let bgNum = (randomNum + "").padStart(2, 0); //the sequence number of the background image, padStart() method adds zeros to the left if the number contains 1 digit
  let urlRandom = `url('https://raw.githubusercontent.com/JuliaAvona/stage1-tasks/main/images/${TimeOfDay}/${bgNum}.jpg')`;
  img.src = `https://raw.githubusercontent.com/JuliaAvona/stage1-tasks/main/images/${TimeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    // Smooth change of background images
    document.body.style.backgroundImage = urlRandom;
  };
}

function getSlideNext() {
  //increases the random number by 1 until the result is 20. If the result of the addition is 20, assign the value 1 to the next number.
  if (buttonGithub.checked) {
    randomNum++;
    if (randomNum === 21) {
      randomNum = 1;
    }
    setBg();
  } else if (buttonUnsplash.checked) {
    changeUrlSource(buttonUnsplash, getLinkUnsplashAPI);
  } else {
    changeUrlSource(buttonFlickr, getLinkFlickrIAPI);
  }
}

function getSlidePrev() {
  //increases the random number by 20 until the result is 1.
  if (buttonGithub.checked) {
    randomNum--;
    if (randomNum === 0) {
      randomNum = 20;
    }
    setBg();
  } else if (buttonUnsplash.checked) {
    changeUrlSource(buttonUnsplash, getLinkUnsplashAPI);
  } else {
    changeUrlSource(buttonFlickr, getLinkFlickrIAPI);
  }
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

//3. Image Slider --- finish

//4. Weather widget ---- start

// My API link - https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=0fd32c0b07c081917772e8a8cae9d30a&units=metric

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${englishLang}&appid=0fd32c0b07c081917772e8a8cae9d30a&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === 200) {
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if (englishLang == "en") {
      wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity} %`;
    } else {
      wind.textContent = `Скорость ветра: ${data.wind.speed.toFixed(0)} m/cek`;
      humidity.textContent = `Влажность: ${data.main.humidity} %`;
    }
  } else {
    weatherIcon.className = "";
    weatherIcon.classList.remove(`owf`);
    temperature.textContent = "Error, city not found, please try another one!";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
  }
}

function setCity(event) {
  if (event.code === "Enter") {
    getWeather();
    city.blur();
  }
}

document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);

//4. Weather widget ---- finish

//5. Widget 'Phrase of the day' --- start

async function getQuotes() {
  let quotes = ""; //change EN / RU

  if (englishLang !== "en") {
    quotes = "data-ru.json";
  } else {
    quotes = "data-eng.json";
  }

  const res = await fetch(quotes);
  const data = await res.json();
  let randomQuotes = getRandomNum(data.length - 1);
  quoteText.textContent = `“ ${data[randomQuotes].text}... 	“`;
  quoteText.style.fontSize = "x-large";
  quoteAuthor.textContent = `©   ${data[randomQuotes].author}`;
}

changeQuote.addEventListener("click", function () {
  getQuotes();
});

//5. Widget 'Phrase of the day' --- finish

//6 - 7. Audio  <script type="module" src="./js/audio-pleer.js"></script>

//8. Site - translater  --- start
const getTranslate = (lng) => {
  const translatableItems = document.querySelectorAll("[data-lang]");
  translatableItems.forEach((item) => {
    item.textContent = languages[lng][item.dataset.lang];
  });
};

const removeActiveLang = () => {
  languageBtns.forEach((lng) => {
    if (lng.classList.contains("active")) {
      lng.classList.remove("active");
    }
  });
};

const activateLangStyles = (target) => {
  target.classList.add("active");
};

const chandeHtmlAttribute = () => {
  if (englishLang === "en") {
    document.all[0].setAttribute("lang", "ru");
  } else {
    document.all[0].setAttribute("lang", "en");
  }
};

languagesBtnsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("languages-item")) {
    removeActiveLang();
    chandeHtmlAttribute();
    activateLangStyles(e.target);
    englishLang = e.target.dataset.langswitch;
    getTranslate(e.target.dataset.langswitch);
    setLocalStorageValue("pageLanguade", e.target.dataset.langswitch);
    getQuotes(); // chande Phrase ENG/RU
    getWeather(); // chande WEATHER ENG/RU
    nameElementValueLang(); // chande name Value Lang
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let lang = getLocalStorageValue("pageLanguade");
  if (lang === "en") {
    activateLangStyles(languageBtns[0]);
    getTranslate("en");
  } else {
    activateLangStyles(languageBtns[1]);
    getTranslate("ru");
  }
});

getQuotes(); // Load PHRASES

function loadLanguage() {
  let lang = getLocalStorageValue("pageLanguade");
  if (lang === "en") {
    englishLang = "en";
  } else {
    englishLang = "ru";
  }
  getQuotes();
}

window.addEventListener("load", loadLanguage);

//8. Site - translater  --- finish

//9.Getting background image from API --- start

// Unsplash API
async function getLinkUnsplashAPI() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${imageSearch}&client_id=9SzGlGrNr11UOKjHYf0M1IciFfcFsaPLTNsn_pkdZ7g`;
  const res = await fetch(url);
  const data = await res.json();
  let imageURL = data.urls.regular;
  return imageURL;
}

// Flickr API
async function getLinkFlickrIAPI() {
  const id = "7a6b9356fed5842a58bb37a588e107a6";
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${id}&tags=${imageSearch}&extras=url_h&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  const photos = data.photos.photo;
  const index = Math.round(Math.random(0, 1) * photos.length);
  let imageURL = data.photos.photo[index].url_h;
  return imageURL;
}

buttonGithub.addEventListener("click", setBg);
buttonUnsplash.addEventListener("click", () =>
  changeUrlSource(buttonUnsplash, getLinkUnsplashAPI)
);
buttonFlickr.addEventListener("click", () =>
  changeUrlSource(buttonFlickr, getLinkFlickrIAPI)
);

function changeUrlSource(button, sourceLink) {
  button.checked = true;
  searchPanel.disabled = false;
  sourceLink().then((data) => {
    document.body.style.backgroundImage = `url(${data})`;
  });
  if (button == buttonUnsplash) {
    setLocalStorageValue("checkedGithub", false);
    setLocalStorageValue("checkedUnsplash", true);
    setLocalStorageValue("checkedFlickr", false);
  } else {
    setLocalStorageValue("checkedGithub", false);
    setLocalStorageValue("checkedUnsplash", false);
    setLocalStorageValue("checkedFlickr", true);
  }
}

searchPanel.addEventListener("keypress", (event) => {
  imageSearch = searchPanel.value;
  setLocalStorageValue("imageSearch", imageSearch);
  if (event.key === "Enter") {
    event.preventDefault();
    imageSearch = searchPanel.value;
    searchPanelWords.textContent = imageSearch;
    searchPanel.value = "";

    if (buttonUnsplash.checked) {
      changeUrlSource(buttonUnsplash, getLinkUnsplashAPI);
    } else if (buttonFlickr.checked) {
      changeUrlSource(buttonFlickr, getLinkFlickrIAPI);
    }
  }
});

//Save imageSearchKey Settings --- start
function loadImageSearchKey() {
  imageSearch = getLocalStorageValue("imageSearch");
  if (imageSearch !== undefined) {
    searchPanelWords.textContent = imageSearch;
  } else if (imageSearch === undefined) {
    imageSearch = "Nature";
    setLocalStorageValue("imageSearch", imageSearch);
    searchPanelWords.textContent = imageSearch;
  }
}

window.addEventListener("load", loadImageSearchKey);

//Save imageSearchKey Settings --- finish

//Save Image Sourse Settings --- start
function loadImageSourse() {
  let githubSourse = getLocalStorageValue("checkedGithub");
  let unsplashSourse = getLocalStorageValue("checkedUnsplash");
  let flickrSourse = getLocalStorageValue("checkedFlickr");

  if (githubSourse === "true") {
    buttonGithub.checked = true;
    searchPanel.disabled = true;
    setBg();
  } else if (unsplashSourse === "true") {
    changeUrlSource(buttonUnsplash, getLinkUnsplashAPI);
  } else if (flickrSourse === "true") {
    changeUrlSource(buttonFlickr, getLinkFlickrIAPI);
  } else {
    buttonGithub.checked = true;
    searchPanel.disabled = true;
    setBg();
  }
}

window.addEventListener("DOMContentLoaded", loadImageSourse);
//Save Image Sourse Settings --- finish

//9.Getting background image from API --- finish

function hiddenSettingPanel() {
  settingPanel.classList.toggle("display-none");
}

settingButton.addEventListener("click", hiddenSettingPanel);

// Show - Hidden Site's Blocks and Save Setting menu in LockalStorage --- start

function getLocalStorageValue(key) {
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key);
  }
}

function setLocalStorageValue(key, value) {
  localStorage.setItem(key, value);
}

checkboxTime.addEventListener("change", () =>
  hideShowSiteBlocks("isShowTime", timeElement, checkboxTime)
);
checkboxDate.addEventListener("change", () =>
  hideShowSiteBlocks("isShowDate", dateElement, checkboxDate)
);
checkboxPlayer.addEventListener("change", () =>
  hideShowSiteBlocks("isShowPlayer", allPlayerContainer, checkboxPlayer)
);
checkboxGreeting.addEventListener("change", () =>
  hideShowSiteBlocks("isShowGreeting", allGreetingContainer, checkboxGreeting)
);
checkboxQuote.addEventListener("change", () =>
  hideShowSiteBlocks("isShowQuote", allQuoteContainer, checkboxQuote)
);
checkboxWeather.addEventListener("change", () =>
  hideShowSiteBlocks("isShowWeather", allWeatherContainer, checkboxWeather)
);
checkboxToDo.addEventListener("change", () =>
  hideShowSiteBlocks("isShowTodo", allToDoContainer, checkboxToDo)
);

function hideShowSiteBlocks(isShowBlock, siteBlock, checkboxStatus) {
  setLocalStorageValue(isShowBlock, checkboxStatus.checked);
  let isShow = checkboxStatus.checked;
  if (!isShow) {
    siteBlock.classList.add("hidden");
  } else {
    siteBlock.classList.remove("hidden");
  }
}

window.addEventListener("load", loadSettingDate);

function loadSettingDate() {
  let isShowTime = getLocalStorageValue("isShowTime");
  let isShowDate = getLocalStorageValue("isShowDate");
  let isShowPlayer = getLocalStorageValue("isShowPlayer");
  let isShowGreeting = getLocalStorageValue("isShowGreeting");
  let isShowQuote = getLocalStorageValue("isShowQuote");
  let isShowWeather = getLocalStorageValue("isShowWeather");
  let isShowTodo = getLocalStorageValue("isShowTodo");

  loadSettings(isShowTime, checkboxTime, timeElement);
  loadSettings(isShowDate, checkboxDate, dateElement);
  loadSettings(isShowPlayer, checkboxPlayer, allPlayerContainer);
  loadSettings(isShowGreeting, checkboxGreeting, allGreetingContainer);
  loadSettings(isShowQuote, checkboxQuote, allQuoteContainer);
  loadSettings(isShowWeather, checkboxWeather, allWeatherContainer);
  loadSettings(isShowTodo, checkboxToDo, allToDoContainer);
}

function loadSettings(isShowElement, isCheck, loadElement) {
  if (isShowElement == undefined || isShowElement == "true") {
    setLocalStorageValue(isShowElement + "", false);
    isCheck.checked = true;
    loadElement.classList.remove("hidden");
  } else if (isShowElement == "false") {
    setLocalStorageValue(isShowElement + "", true);
    isCheck.checked = false;
    loadElement.classList.add("hidden");
  }
}

// Show - Hidden Site's Blocks and Save Setting menu in LockalStorage --- finish

// 11. TODO List --- start
let toggleEmptyListMessage = function () {
  if (items.length === 0) {
    emptyListMessage.classList.remove("hidden");
  } else {
    emptyListMessage.classList.add("hidden");
  }
};

let addCheckHandler = function (item) {
  let checkbox = item.querySelector(".todo-list-input");
  checkbox.addEventListener("change", function () {
    item.remove();
    toggleEmptyListMessage();
  });
};

for (let i = 0; i < items.length; i++) {
  addCheckHandler(items[i]);
}

newItemForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  let taskText = newItemTitle.value;
  let task = newItemTemplate.cloneNode(true);
  let taskDescription = task.querySelector("span");
  taskDescription.textContent = taskText;
  addCheckHandler(task);

  list.appendChild(task);
  toggleEmptyListMessage();
  newItemTitle.value = "";
});

toDoButton.addEventListener("click", hiddenTodoPanel);

function hiddenTodoPanel() {
  todoListWrapper.classList.toggle("hidden");
}

// 11. TODO List --- finish