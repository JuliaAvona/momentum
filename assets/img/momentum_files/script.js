const timeElement = document.querySelector(".time"); //search class Time
const dateElement = document.querySelector(".date"); //search class Date
const greetingElement = document.querySelector(".greeting"); //search class Greeting
const nameElement = document.querySelector(".name"); //search class Name
const slidePrev = document.querySelector(".slide-prev"); //button slide Prev
const slideNext = document.querySelector(".slide-next"); //button slide Next
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');


let TimeOfDay; //get TimeOfDay from function showGreeting
let randomNum;

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
  const currentDate = date.toLocaleDateString("en-Us", options); //det date in English
  dateElement.textContent = currentDate; // write current Date in html class 'date'
  setTimeout(showDate, 1000); // repeat every 1s
}
showDate();

//1. Clock and calendar --- finish

//2. Greetings and working with local storage --- start

function showGreeting() {
  const date = new Date(); // get Time in this moment
  const hours = date.getHours(); // get how Hours in this moment
  if (hours >= 0 && hours < 6) {
    // с 00:00 до 5:59 - Good night / Доброй/Спокойной ночи / Дабранач
    greetingElement.textContent = "Good night,";
    TimeOfDay = "night";
  } else if (hours >= 6 && hours < 12) {
    //с 6:00 до 11:59 - Good morning / Доброе утро / Добрай раніцы
    greetingElement.textContent = "Good morning,";
    TimeOfDay = "morning";
  } else if (hours >= 12 && hours < 18) {
    // с 12:00 до 17:59 - Good afternoon / Добрый день / Добры дзень
    greetingElement.textContent = "Good afternoon,";
    TimeOfDay = "afternoon";
  } else {
    greetingElement.textContent = "Good evening,"; // с 18:00 до 23:59 - Good evening / Добрый вечер / Добры вечар
    TimeOfDay = "evening";
  }
  setTimeout(showGreeting, 1000); // repeat every 1s
}
showGreeting();

function setLocalStorage() {
  //before reloading or closing the page (beforeunload event), the data must be saved
  localStorage.setItem("name", nameElement.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  //before loading the page (load event), the data needs to be restored and displayed
  if (localStorage.getItem("name")) {
    nameElement.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

//2. Greetings and working with local storage --- finish

//3. Image Slider --- start

function getRandomNum() { //random number from 1 to 20 inclusive
  randomNum = (Math.ceil(Math.random() * 20));
  return randomNum;
}
getRandomNum();

function setBg() { // Image Random Slider
  const img = new Image();
  let bgNum = (randomNum + "").padStart(2, 0); //the sequence number of the background image, padStart() method adds zeros to the left if the number contains 1 digit
  let urlRandom = `url('https://raw.githubusercontent.com/JuliaAvona/stage1-tasks/main/images/${TimeOfDay}/${bgNum}.jpg')`;
  img.src = `https://raw.githubusercontent.com/JuliaAvona/stage1-tasks/main/images/${TimeOfDay}/${bgNum}.jpg`;
  img.onload = () => {       // Smooth change of background images
    document.body.style.backgroundImage = urlRandom;
  }; 
  // console.log(urlRandom);
}

function getSlideNext() { //increases the random number by 1 until the result is 20. If the result of the addition is 20, assign the value 1 to the next number.
  randomNum++;
  if (randomNum === 21) {
    randomNum = 1;
  }
  setBg();
}

function getSlidePrev() { //increases the random number by 20 until the result is 1.
  randomNum--;
  if (randomNum === 0) {
    randomNum = 20;
  }
  setBg();
}

getSlideNext();
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

//3. Image Slider --- finish

//4. Weather widget ---- start

// My API link - https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=0fd32c0b07c081917772e8a8cae9d30a&units=metric

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}
getWeather();

//4. Weather widget ---- finish
