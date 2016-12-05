var API_KEY = "1b854b48156d82c4e1459a95fa829b14";
var cel = false;
var wd;

function displayTemp(num, c) {
    'use strict';
    if (c) {
        return Math.round((num - 32) * (5 / 9)) + "&deg;" + " C";
    } else {
        return Math.round(num) + "&deg;" + " F";
    }
}

function render(wd, cel) {
    'use strict';
    var currentLocation = wd.name;
    var currentWeather = wd.weather[0].description;
    var currentTemp = displayTemp(wd.main.temp, cel);
    var high = displayTemp(wd.main.temp_max, cel);
    var low = displayTemp(wd.main.temp_min, cel);
    var icon = wd.weather[0].icon;
    
    $('#currentLocation').html(currentLocation);
    $('#currentTemp').html(currentTemp);
    $('#currentWeather').html(currentWeather);
    $('#high-low').html(high + " / " + low);
    $("#icon").attr('src', 'http://openweathermap.org/img/w/' + icon + '.png');
    
     
}
$(function () {
  // get the lat and long
    'use strict';
    var loc;
    $.getJSON('http://ipinfo.io', function (d) {
        loc = d.loc.split(",");
        console.log(loc);
    
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat='
            +  loc[0] + '&lon=' + loc[1] + '&APPID=' + API_KEY, function (apiData) {
                wd = apiData;
    
                render(apiData, cel);
                $('#toggle').click(function () {
                    cel = !cel;
                    render(wd, cel);
                });
            });
    });
});
