navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(response => response.json())
        .then(data => {

            let fahrenheit = cToF(data.current_weather.temperature);
            let weatherCode = data.current_weather.weathercode;
            
            // weatherCode description
            function getWeatherDescription(weatherCode){
                if (weatherCode === 0){
                    return "Clear sky"
                } else if ([1,2,3].includes(weatherCode)){
                    return "Mainly clear, partly cloudy, and overcast";
                } else if ([45, 48].includes(weatherCode)){
                    return "Fog and depositing rime fog"
                } else if ([51, 53, 55].includes(weatherCode)){
                    return "Drizzle: Light, moderate, and dense intensity";
                } else if ([56, 57].includes(weatherCode)){
                    return "Freezing Drizzle: Light and dense intensity";
                } else if ([61, 63, 65].includes(weatherCode)){
                    return "Rain: Slight, moderate and heavy intensity";
                } else if ([66, 67].includes(weatherCode)){
                    return "Freezing Rain: Light and heavy intensity";
                } else if ([71, 73, 75].includes(weatherCode)){
                    return "Snow fall: Slight, moderate, and heavy intensity";
                } else if ([77].includes(weatherCode)){
                    return "Snow grains";
                } else if ([80, 81, 82].includes(weatherCode)){
                    return "Rain showers: Slight, moderate, and violent";
                } else if ([85, 86].includes(weatherCode)){
                    return "Snow showers slight and heavy";
                } else if ([95].includes(weatherCode)){
                    return "Thunderstorm: Slight or moderate";
                } else if ([96, 99].includes(weatherCode)){
                    return "Thunderstorm with slight and heavy hail";
                }
            };

            let description = getWeatherDescription(weatherCode);

            // weather info DOM
            const display = document.querySelector(".thermometer");
            const icon = document.querySelector(".icon")
            display.innerHTML = `
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="150px" viewBox="0 -960 960 960" width="150px" fill="#e3e3e3"><path d="M338.5-138.5Q280-197 280-280q0-51 23-96t68-67v-328q0-45.42 32-77.21Q435-880 480-880t77 31.79q32 31.79 32 77.21v328q45 22 68 67t23 96q0 83-58.5 141.5T480-80q-83 0-141.5-58.5ZM431-515h98v-53h-49v-39h49v-87h-49v-38.5h49V-771q0-20.83-14.12-34.91-14.13-14.09-35-14.09Q459-820 445-805.91q-14 14.08-14 34.91v256Z"/></svg>
            <h2>${fahrenheit}&deg;F</h2>
            <p>${description}</p>`

            console.log(description);
        })
        .catch(error =>
            console.error(error)
        )
})

function cToF(celsius){
    return Math.round((celsius * 9/5) + 32);
}