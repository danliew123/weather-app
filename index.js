const iconSet = [
  ["snow", "snow.jpg"],
  ["rain", "rain.jpeg"],
  ["fog", "fog.jpeg"],
  ["wind", "wind.jpeg"],
  ["cloudy", "cloud.jpeg"],
  ["clear", "clear.jpeg"],
];

function formatDate(date) {
  return date.toLocaleDateString().split("/").reverse().join("-");
}

async function returnWeather(location, date = formatDate(new Date())) {
  try {
    const description = document.querySelector("#description");
    description.textContent = ".................";
    const iconImg = document.querySelector("img");
    iconImg.setAttribute("src", "loading.jpeg");
    const weatherURL = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}/${date}?unitGroup=us&key=HSHN97PHSMQV54Q795M89ZZCB&contentType=json`
    );

    const jsonWeather = await weatherURL.json();
    const descriptionWeather = jsonWeather.days[0].description;
    description.textContent = descriptionWeather;

    const icon = jsonWeather.days[0].icon;
    for (let i = 0; i < iconSet.length; i++) {
      if (icon.includes(iconSet[i][0])) {
        iconImg.setAttribute("src", iconSet[i][1]);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit");
  let country = document.querySelector("#country").value;
  let dateValue = document.querySelector("#date").value;
  console.log(country);
  console.log(dateValue);
  if (!country) {
    alert("Please input a country!");
    return;
  }
  returnWeather(country, dateValue);
});

returnWeather("africa", "2024-08-14");
