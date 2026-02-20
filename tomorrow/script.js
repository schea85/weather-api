const displayInfo = document.querySelector(".display-info-container");

navigator.geolocation.getCurrentPosition(position =>{
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    async function getCurrentData(){
        try {
            let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,apparent_temperature_max,apparent_temperature_min,daylight_duration,sunshine_duration,wind_speed_10m_max&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
            let data = await response.json();
            console.log(data);
            return data;
        } catch(error){
            console.error(error);
        }
    }

    async function displayWeather(){
        let data = await getCurrentData();

        console.log(data)
        if (!data){
            displayInfo.textContent = "Unable to fetch data.  Try again."
        }

        let maxTemp = data.daily.temperature_2m_max[1];
        let minTemp = data.daily.temperature_2m_min[1];
        let sunrise = data.daily.sunrise[1];
        let sunset = data.daily.sunset[1];
        let precipitationProbability = data.daily.precipitation_probability_max[1];
        let wind = data.daily.wind_speed_10m_max[1];
        let uv = data.daily.uv_index_max[1];
        
        let sunriseDate = new Date(sunrise);
        let sunriseTime = sunriseDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
        let sunsetDate = new Date(sunset);
        let sunsetTime = sunsetDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });


        displayInfo.innerHTML = `
            <p>Maximum Temperature: ${maxTemp}°F</p>
            <p>Minimum Temperature: ${minTemp}°F</p>
            <p>Sunrise: ${sunriseTime}</p>
            <p>Sunset: ${sunsetTime}</p>
            <p>Precipitation Probability: ${precipitationProbability}%</p>
            <p>Wind: ${wind} mp/h</p>
            <p>UV Index: ${uv}</p>
        `
        

    }

    displayWeather();

});





