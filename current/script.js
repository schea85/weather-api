const displayInfo = document.querySelector(".display-info-container");

navigator.geolocation.getCurrentPosition(position =>{
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    async function getCurrentData(){
        try {
            let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,snowfall,showers,rain,precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
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

        data = data.current;
        let currentTemp = data.temperature_2m;
        let feels_like = data.apparent_temperature;
        let cloud_cover = data.cloud_cover;
        let precipitation = data.precipitation;
        let pressure = data.pressure_msl;
        let humidity = data.relative_humidity_2m;
        let wind = data.wind_speed_10m;
        
        displayInfo.innerHTML = `
            <p>Current Temperature: ${currentTemp}°F</p>
            <p>Feels like: ${feels_like}°F</p>
            <p>Cloud Coverage: ${cloud_cover}%</p>
            <p>Total Precipitation: ${precipitation} inch</p>
            <p>Pressure: ${pressure} hPa</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind: ${wind} mp/h
        `

    }

    displayWeather();

});





