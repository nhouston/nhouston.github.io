    $(document).ready(function () {

        /* Time */

        var currentTime = new Date(),
            hours = currentTime.getHours(),
            minutes = currentTime.getMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        time = "";

        if (3 < hours && hours < 13) {
            time = "morning";
        } else if (12 < hours && hours < 18) {
            time = "afternoon";
        } else if (18 < hours && hours < 24 || hours == 0) {
            time = "evening";
        }

        document.getElementById("scriptText").innerHTML = "Good " + time + ", Neil";
        document.getElementById('time').innerHTML = hours + ":" + minutes;


        /* DAY OF THE WEEK & DATE & YEAR */


        Date.longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        function long_Days(dt) {
            return Date.longDays[dt.getDay()];
        }

        dt = new Date();
        dts = new Date();
        month = new Date();

        function long_Date(date) {
            return dts.getDate();
        }

        document.getElementById('day').innerHTML = long_Days(dt) + " ";

        document.getElementById('date').innerHTML = long_Date(dts) + " " + months[month.getMonth()];


        /* WEATHER */
        const key = 'ec31c32648242d42006847fbd1edb8ea';

        var getIP = 'http://ip-api.com/json/';

        function weatherBallon(IP) {
            $.getJSON(getIP).done(function (location) {
                fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location.city + '&appid=' + key)
                    .then(function (resp) {
                        return resp.json()
                    }) // Convert data to json
                    .then(function (data) {
                        drawWeather(data);
                    })
                    .catch(function () {
                        // catch any errors
                    });
            })
        }


        function drawWeather(d) {
            var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
            var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);
            var description = d.weather[0].description;
            var iconcode = d.weather[0].icon;
            var dict = {
                '01d': 'wi-day-sunny',
                '02d': 'wi-day-cloudy',
                '03d': 'wi-cloud',
                '04d': 'wi-cloudy',
                '09d': 'wi-showers',
                '10d': 'wi-day-rain-mix',
                '11d': 'wi-thunderstorm',
                '13d': 'wi-snow',
                '50d': 'wi-fog',
                '01n': 'wi-night-clear',
                '02n': 'wi-night-alt-cloudy',
                '03n': 'wi-night-alt-cloudy-high',
                '04n': 'wi-cloudy',
                '09n': 'wi-night-alt-sprinkle',
                '10n': 'wi-night-alt-showers',
                '11n': 'wi-night-alt-thunderstorm',
                '13n': 'wi-night-alt-snow',
                '50n': 'wi-night-fog'
            };

            $('#icon').attr('class', "wi " + dict[iconcode]);

            document.getElementById('description').innerHTML = description;
            document.getElementById('temp').innerHTML = celcius + '&deg;';
            document.getElementById('location').innerHTML = d.name;


        }
        window.onload = function () {
            weatherBallon(6167865);
        }
    });
