// only needed https://open-meteo.com/en/docs#
// TODO: Sunset/rise , cloud coverage
document.addEventListener("DOMContentLoaded", () => {
	const weatherElement = document.querySelector("#weather")

	let testLocation = ''
	const testArray = testLocation.split("&")
	if (testLocation !== '') {
		var lat = testArray[0].split('=')[1]
		var long = testArray[1].split('=')[1]
	} else {
		var lat = 52.5244
		var long = 13.4105
	}
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace('/','%2F')
	const current = 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m'
	const daily = 'sunrise,sunset'
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=${current}&daily=${daily}&timezone=${timezone}`
	
	updateWeather(url, weatherElement);
	// call limit per day so 8460ms is the lowset call freq
	setInterval(() => updateWeather(url, weatherElement), 60000);
});

const updateWeather = (url, weatherElement) => {
	fetch(url)
		.then(response => response.json())
		.then(data => {
			// weather
			switch(data.current.weather_code) {
				case 0:
					weatherDiscription = 'Clear'
					if (data.current.is_day === 1) { weatherIcon = '' } else { weatherIcon = '' }
					break;
				case 1: case 2: case 3:
					weatherDiscription = 'Mainly clear'
					if (data.current.is_day === 1) { weatherIcon = '' } else { weatherIcon = '' }
					break;
				case 45: case 48:
					weatherDiscription = 'Fog'
					if (data.current.is_day === 1) { weatherIcon = '' } else { weatherIcon = '' }
					break;
				case 51: case 53: case 55:
					weatherDiscription = 'Drizzle'
					if (data.current.is_day === 1) { weatherIcon = '' } else { weatherIcon = '' }
					break;
				case 56: case 57:
					weatherDiscription = 'Freezing Drizzle'
					if (data.current.is_day === 1) { weatherIcon = '' } else { weatherIcon = '' }
					break;
				case 61: case 63: case 65:
					weatherDiscription = 'Rain'
					if (data.current.is_day === 1) { weatherIcon = '' } else { weatherIcon = '' }
					break;
				case 66: case 67:
					weatherDiscription = 'Freezing Rain'
					if (data.current.is_day === 1) { weatherIcon = '' } else { weatherIcon = '' }
					break;
				case 71: case 73: case 75:
					weatherDiscription = 'Snow fall'
					if (data.current.is_day === 1) { weatherIcon = '' } else { weatherIcon = '' }
					break;
				case 77:
					weatherDiscription = 'Snow grains'
					if (data.current.is_day === 1) { weatherIcon = '' } else { weatherIcon = '' }
					break;
				case 80: case 81: case 82:
					weatherDiscription = 'Rain showers'
					if (data.current.is_day === 1) { weatherIcon = '' } else { weatherIcon = '' }
					break;
				case 85: case 86:
					weatherDiscription = 'Snow showers'
					if (data.current.is_day === 1) { weatherIcon = '' } else { weatherIcon = '' }
					break;
				case 95: case 96: case 99:
					weatherDiscription = 'Thunderstorm'
					if (data.current.is_day === 1) { weatherIcon = '' } else { weatherIcon = '' }
					break;
				default:
					weatherText = 'N/A'
			}
			weatherText = `${weatherIcon} ${weatherDiscription}`
			// downfall
			if (data.current.rain > 0) {
				downfall = data.current.rain + data.current_units.rain
				downfallText = `${downfall} of rain`
			}
			else if (data.current.showers > 0) { 
				downfall = data.current.showers + data.current_units.showers
				downfallText = `${downfall} of showers`
			}
			else if (data.current.snow > 0) {
				downfall = data.current.snow + data.current_units.snow
				downfallText = `${downfall} of snow`
			}
			else {
				downfall = 'N/A'
				downfallText = `no downfall`
			}
			// humidity
			humidity = data.current.relative_humidity_2m + data.current_units.relative_humidity_2m
			humidityText = `a humidity of ${humidity}`
			// wind
			wind = data.current.wind_speed_10m + data.current_units.wind_speed_10m
			wind_direction = data.current.wind_direction_10m + data.current_units.wind_direction_10m
			windText = `with a wind of ${wind}`
			// temperature
			temperature = data.current.temperature_2m + data.current_units.temperature_2m
			apparent_temperature = data.current.apparent_temperature + data.current_units.apparent_temperature
			temperatureText = `(${apparent_temperature})`
			// push weatherInfo to element
			const weatherInfo = `${weatherText} ${temperatureText}, ${windText}, ${humidityText} and ${downfallText}.`
			weatherElement.textContent = weatherInfo
			//console.log(data)
		})
		.catch(error => {
			weatherElement.textContent = "look out the window dawg :)"
			console.log(error)
		});
}
