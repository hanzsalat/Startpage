// only needed https://open-meteo.com/en/docs#
// TODO: Add extra reports like sunset of today and more
document.addEventListener('DOMContentLoaded', () => {
	const lat = 52.5244
	const long = 13.4105
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace('/','%2F')
	const current = 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m'
	const daily = 'sunrise,sunset'
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=${current}&daily=${daily}&timezone=${timezone}`

	fetch(url)
		.then(response => response.json())
		.then(data => {
			switch(data.current.weather_code) {
				case 0:
					var weather = 'Clear'
					break;
				case 1: case 2: case 3:
					var weather = 'Mainly clear'
					break;
				case 45: case 48:
					var weather = 'Fog'
					break;
				case 51: case 53: case 55:
					var weather = 'Drizzle'
					break;
				case 56: case 57:
					var weather = 'Freezing Drizzle'
					break;
				case 61: case 63: case 65:
					var weather = 'Rain'
					break;
				case 66: case 67:
					var weather = 'Freezing Rain'
					break;
				case 71: case 73: case 75:
					var weather = 'Snow fall'
					break;
				case 77:
					var weather = 'Snow grains'
					break;
				case 80: case 81: case 82:
					var weather = 'Rain showers'
					break;
				case 85: case 86:
					var weather = 'Snow showers'
					break;
				case 95: case 96: case 99:
					var weather = 'Thunderstorm'
					break;
				default:
					var weather = 'N/A'
			}
			const temperature = data.current.temperature_2m + data.current_units.temperature_2m
			const wind = data.current.wind_speed_10m + data.current_units.wind_speed_10m
			const wind_direction = data.current.wind_direction_10m + data.current_units.wind_direction_10m
			const rain = data.current.rain + data.current_units.rain
			const weatherInfo = `${weather} (${temperature}), with a wind of ${wind} (${wind_direction}) and ${rain} of rain.`
			const weatherElement = document.getElementById('weather');
			weatherElement.textContent = weatherInfo;
			console.log(data);
		})
		.catch(error => {
			const weatherElement = document.getElementById('weather');
			weatherElement.textContent = "look out the window dawg :)";
			console.log(error);
		});
})
