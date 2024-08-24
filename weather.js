document.addEventListener('DOMContentLoaded', () => {
	const city = 'Berlin';
	const language = 'en';
	const format = '%C+(%f),+with+a+wind+of+%w+and+%p+of+rain.';
	const url = `https://wttr.in/${city}?format=${format}&lang=${language}`;

	fetch(url)
		.then(response => response.text())
		.then(data => {
			const weatherInfo = data.trim();
			const weatherElement = document.getElementById('weather');
			weatherElement.textContent = weatherInfo;
		})
		.catch(error => {
			const weatherElement = document.getElementById('weather');
			weatherElement.textContent = "look out the window dawg :)";
		})
});
