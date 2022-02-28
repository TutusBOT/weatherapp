let city = document.getElementById("city");
let temperature = document.getElementById("temperature");
let weatherState = document.getElementById("weather-state");
let date = document.getElementById("day");
let card = document.getElementsByClassName("card");
let day1 = document.getElementById("weather-day1");
let day2 = document.getElementById("weather-day2");
let day3 = document.getElementById("weather-day3");
let imgDay1 = document.getElementById("img-day1");
let imgDay2 = document.getElementById("img-day2");
let imgDay3 = document.getElementById("img-day3");
let weekday1 = document.getElementById("day-day1");
let weekday2 = document.getElementById("day-day2");
let weekday3 = document.getElementById("day-day3");
let wind = document.getElementById("wind");
let pressure = document.getElementById("pressure");
let humidity = document.getElementById("humidity");
let tempFeel = document.getElementById("temp-feel");
let li1 = document.getElementById("clickable-li1");
let warning = document.querySelector(".warning");

let data = getData();
let dataForecast = async (whichDayClicked) => {
	const a = await data;
	weatherDetailsInner.children[0].innerHTML =
		"Sunrise: " +
		a.forecast.forecastday[whichDayClicked].astro.sunrise +
		"<br>Sunset: " +
		a.forecast.forecastday[whichDayClicked].astro.sunset;
	weatherDetailsInner.children[1].innerHTML = "";
	for (i = 0; i < 24; i++) {
		let hour = new Date(a.forecast.forecastday[whichDayClicked].hour[i].time);
		var forecastInnerHtml;
		if (i < 10) {
			//    weatherDetailsInner.children[1].innerHTML += "<span>0"+hour.getHours()+":00 &nbsp;"+a.forecast.forecastday[whichDayClicked].hour[i].temp_c + "°</span><br>"
			forecastInnerHtml =
				"<div id='span-hour'><span>0" +
				hour.getHours() +
				":00 &nbsp;" +
				a.forecast.forecastday[whichDayClicked].hour[i].temp_c +
				"°</span>";
		} else {
			forecastInnerHtml =
				"<div id='span-hour'>" +
				hour.getHours() +
				":00 &nbsp;" +
				a.forecast.forecastday[whichDayClicked].hour[i].temp_c +
				"°";
		}
		weatherCondition(
			a.forecast.forecastday[whichDayClicked].hour[i].condition.code,
			1,
			"forecast",
			forecastInnerHtml
		);
	}
};

async function getData(userLocation) {
	const userLocationParsed = userLocation || "Warsaw";

	const response = await fetch(
		"https://api.weatherapi.com/v1/forecast.json?key=[APIKEY]&days=3&q=" +
			userLocationParsed
	).catch(() => {
		console.log("ERROR");
	});

	if (response.ok == false) {
		warning.classList.add("active");
		setTimeout(() => {
			warning.classList.remove("active");
		}, 2000);
	} else {
		const results = await response.json().catch(() => {
			console.log("JSON error");
		});

		// let weekdayDate1 = new Date(results.forecast.forecastday[0].date) always today
		let weekdayDate2 = new Date(results.forecast.forecastday[1].date);
		let weekdayDate3 = new Date(results.forecast.forecastday[2].date);
		// console.log(results); logs out data from api in object

		let localTime = results.location.localtime;
		city.innerText = results.location.name;
		temperature.innerText = results.current.temp_c + "°";

		weatherCondition(
			results.current.condition.code,
			results.current.is_day,
			"today"
		);
		weatherCondition(
			results.forecast.forecastday[0].day.condition.code,
			results.current.is_day,
			"day1"
		);
		weatherCondition(
			results.forecast.forecastday[1].day.condition.code,
			results.current.is_day,
			"day2"
		);
		weatherCondition(
			results.forecast.forecastday[2].day.condition.code,
			results.current.is_day,
			"day3"
		);
		date.innerText = localTime;

		day1.innerText = results.forecast.forecastday[0].day.avgtemp_c + "°";
		day2.innerText = results.forecast.forecastday[1].day.avgtemp_c + "°";
		day3.innerText = results.forecast.forecastday[2].day.avgtemp_c + "°";
		wind.innerText = results.current.wind_kph + "KM/H";
		pressure.innerText = results.current.pressure_mb + "mbar";
		humidity.innerText = results.current.humidity + "%";
		tempFeel.innerText = results.current.feelslike_c + "°";
		// dateToDay(weekdayDate1.getDay(), weekday1)    always today
		dateToDay(weekdayDate2.getDay(), weekday2);
		dateToDay(weekdayDate3.getDay(), weekday3);

		return results;
	}
}

async function changeLocation() {
	let location = document.getElementById("location");
	await getData(location.value);
}

async function weatherCondition(code, isDay, whichDay, forecastInnerHtml) {
	const conditions = await fetch("weather-conditions.json");
	const conditionsJson = await conditions.json();
	let currentConditionImg;
	let currentConditionText;
	if (code == 1000) {
		if (isDay == 0) {
			currentConditionText = conditionsJson[0].night;
			currentConditionImg = 114;
		} else {
			currentConditionText = conditionsJson[0].day;
			currentConditionImg = 113;
		}
	} else if (code == 1003) {
		currentConditionText = conditionsJson[1].night;
		if (isDay == 0) {
			currentConditionImg = 117;
		} else {
			currentConditionImg = 116;
		}
	} else if (code == 1006) {
		currentConditionText = conditionsJson[2].night;
		currentConditionImg = 119;
	} else if (code == 1009) {
		currentConditionText = conditionsJson[3].night;
		currentConditionImg = 119;
	} else if (code == 1030) {
		currentConditionText = conditionsJson[4].night;
		currentConditionImg = 248;
	} else if (code == 1063) {
		currentConditionText = conditionsJson[5].night;
		currentConditionImg = 308;
	} else if (code == 1066) {
		currentConditionText = conditionsJson[6].night;
		currentConditionImg = 332;
	} else if (code == 1069) {
		currentConditionText = conditionsJson[7].night;
		currentConditionImg = 320;
	} else if (code == 1072) {
		currentConditionText = conditionsJson[8].night;
		currentConditionImg = 308;
	} else if (code == 1087) {
		currentConditionText = conditionsJson[9].night;
		currentConditionImg = 389;
	} else if (code == 1114) {
		currentConditionText = conditionsJson[10].night;
		currentConditionImg = 332;
	} else if (code == 1117) {
		currentConditionText = conditionsJson[11].night;
		currentConditionImg = 332;
	} else if (code == 1135) {
		currentConditionText = conditionsJson[12].night;
		currentConditionImg = 248;
	} else if (code == 1147) {
		currentConditionText = conditionsJson[13].night;
		currentConditionImg = 248;
	} else if (code == 1150) {
		currentConditionText = conditionsJson[14].night;
		currentConditionImg = 308;
	} else if (code == 1153) {
		currentConditionText = conditionsJson[15].night;
		currentConditionImg = 308;
	} else if (code == 1168) {
		currentConditionText = conditionsJson[16].night;
		currentConditionImg = 308;
	} else if (code == 1171) {
		currentConditionText = conditionsJson[17].night;
		currentConditionImg = 308;
	} else if (code == 1180) {
		currentConditionText = conditionsJson[18].night;
		currentConditionImg = 308;
	} else if (code == 1183) {
		currentConditionText = conditionsJson[19].night;
		currentConditionImg = 308;
	} else if (code == 1186) {
		currentConditionText = conditionsJson[20].night;
		currentConditionImg = 308;
	} else if (code == 1189) {
		currentConditionText = conditionsJson[21].night;
		currentConditionImg = 308;
	} else if (code == 1192) {
		currentConditionText = conditionsJson[22].night;
		currentConditionImg = 308;
	} else if (code == 1195) {
		currentConditionText = conditionsJson[23].night;
		currentConditionImg = 308;
	} else if (code == 1198) {
		currentConditionText = conditionsJson[24].night;
		currentConditionImg = 308;
	} else if (code == 1201) {
		currentConditionText = conditionsJson[25].night;
		currentConditionImg = 308;
	} else if (code == 1204) {
		currentConditionText = conditionsJson[26].night;
		currentConditionImg = 320;
	} else if (code == 1207) {
		currentConditionText = conditionsJson[27].night;
		currentConditionImg = 320;
	} else if (code == 1210) {
		currentConditionText = conditionsJson[28].night;
		currentConditionImg = 332;
	} else if (code == 1213) {
		currentConditionText = conditionsJson[29].night;
		currentConditionImg = 332;
	} else if (code == 1216) {
		currentConditionText = conditionsJson[30].night;
		currentConditionImg = 332;
	} else if (code == 1219) {
		currentConditionText = conditionsJson[31].night;
		currentConditionImg = 332;
	} else if (code == 1222) {
		currentConditionText = conditionsJson[32].night;
		currentConditionImg = 332;
	} else if (code == 1225) {
		currentConditionText = conditionsJson[33].night;
		currentConditionImg = 332;
	} else if (code == 1237) {
		currentConditionText = conditionsJson[34].night;
		currentConditionImg = 350;
	} else if (code == 1240) {
		currentConditionText = conditionsJson[35].night;
		currentConditionImg = 308;
	} else if (code == 1243) {
		currentConditionText = conditionsJson[36].night;
		currentConditionImg = 308;
	} else if (code == 1246) {
		currentConditionText = conditionsJson[37].night;
		currentConditionImg = 308;
	} else if (code == 1249) {
		currentConditionText = conditionsJson[38].night;
		currentConditionImg = 320;
	} else if (code == 1252) {
		currentConditionText = conditionsJson[39].night;
		currentConditionImg = 320;
	} else if (code == 1255) {
		currentConditionText = conditionsJson[40].night;
		currentConditionImg = 332;
	} else if (code == 1258) {
		currentConditionText = conditionsJson[41].night;
		currentConditionImg = 332;
	} else if (code == 1261) {
		currentConditionText = conditionsJson[42].night;
		currentConditionImg = 350;
	} else if (code == 1264) {
		currentConditionText = conditionsJson[43].night;
		currentConditionImg = 350;
	} else if (code == 1273) {
		currentConditionText = conditionsJson[44].night;
		currentConditionImg = 389;
	} else if (code == 1276) {
		currentConditionText = conditionsJson[45].night;
		currentConditionImg = 389;
	} else if (code == 1279) {
		currentConditionText = conditionsJson[46].night;
		currentConditionImg = 389;
	} else {
		currentConditionText = conditionsJson[47].night;
		currentConditionImg = 389;
	}
	if (whichDay != "forecast") {
		if (currentConditionImg == 332 || currentConditionImg == 320) {
			for (i = 0; i < 3; i++) {
				card[i].style.background = "linear-gradient(145deg, #afc9c4, #6a8a84)";
			}
		} else if (currentConditionImg == 113) {
			for (i = 0; i < 3; i++) {
				card[i].style.background = "linear-gradient(145deg, #fad57f, #f0a93a)";
			}
		} else if (currentConditionImg == 114) {
			for (i = 0; i < 3; i++) {
				card[i].style.background = "linear-gradient(145deg, #181575, #02003b)";
			}
		} else if (currentConditionImg == 308) {
			for (i = 0; i < 3; i++) {
				card[i].style.background = "linear-gradient(145deg, #2d689c, #093963)";
			}
		} else if (
			currentConditionImg == 116 ||
			currentConditionImg == 117 ||
			currentConditionImg == 119
		) {
			for (i = 0; i < 3; i++) {
				card[i].style.background = "linear-gradient(145deg, #486e8a, #252d33)";
			}
		} else if (currentConditionImg == 350) {
			for (i = 0; i < 3; i++) {
				card[i].style.background = "linear-gradient(145deg, #99e0e0, #48b0b0)";
			}
		} else if (currentConditionImg == 389) {
			for (i = 0; i < 3; i++) {
				card[i].style.background = "linear-gradient(145deg, #0d105c, #00011c)";
			}
		} else {
			for (i = 0; i < 3; i++) {
				card[i].style.background = "linear-gradient(145deg, #8b8b8f, #434347)";
			}
		}
	}

	if (whichDay == "today") {
		weatherState.innerHTML =
			"<span>" +
			currentConditionText +
			"</span><img src='weathericons/" +
			currentConditionImg +
			".png'>";
	} else if (whichDay == "day1") {
		imgDay1.src = "weathericons/" + currentConditionImg + ".png";
	} else if (whichDay == "day2") {
		imgDay2.src = "weathericons/" + currentConditionImg + ".png";
	} else if (whichDay == "forecast") {
		weatherDetailsInner.children[1].innerHTML +=
			forecastInnerHtml +
			"<img src='weathericons/" +
			currentConditionImg +
			".png'></div>";
	} else {
		imgDay3.src = "weathericons/" + currentConditionImg + ".png";
	}
}

function dateToDay(day, htmlweekday) {
	var weekday;
	if (day == 0) {
		weekday = "Sunday";
	} else if (day == 1) {
		weekday = "Monday";
	} else if (day == 2) {
		weekday = "Tuesday";
	} else if (day == 3) {
		weekday = "Wednesday";
	} else if (day == 4) {
		weekday = "Thursday";
	} else if (day == 5) {
		weekday = "Friday";
	} else if (day == 6) {
		weekday = "Saturday";
	}
	htmlweekday.innerText = weekday;
}

let clickCounter = 0;
window.addEventListener("click", function (e) {
	clickCounter++;
	if (clickCounter == 2) {
		if (weatherDetailsInner.contains(e.target)) {
			// Clicked in box
			clickCounter = 1;
		} else {
			// Clicked outside the box

			hideWeatherDetails();
		}
	}
	return;
});

let weatherDetailsInner = document.getElementById("weather-details-inner");
let weatherDetails = document.getElementById("weather-details");
function showWeatherDetails() {
	weatherDetails.classList.remove("hide");
	clickCounter = 0;
}

function hideWeatherDetails() {
	weatherDetails.classList.add("hide");
}
