var key="ec6c60a82ccc8663fc1ca5e83c4f5b39";
var locations = [];

function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var geoLocationLat=data.city.coord.lat
        var geoLocationLon=data.city.coord.lon
        var requestWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${geoLocationLat}&lon=${geoLocationLon}&exclude=hourly,daily&units=imperial&appid=${key}`;
        getWeatherAPI(requestWeatherUrl)
      })
};

function getWeatherAPI (requestWeatherUrl){

  var days=[$("#today"),$("#dayNx1"),$("#dayNx2"),$("#dayNx3"),$("#dayNx4"),$("#dayNx5")]
  var location=[$("#location"),$("#dateNx1"),$("#dateNx2"),$("#dateNx3"),$("#dateNx4"),$("#dateNx5")]
  var tempature=[$("#tempature"),$("#tempNx1"),$("#tempNx2"),$("#tempNx3"),$("#tempNx4"),$("#tempNx5")];
  var windSpeed=[$("#windSpeed"),$("#windNx1"),$("#windNx2"),$("#windNx3"),$("#windNx4"),$("#windNx5")];
  var humidity=[$("#humidity"),$("#humidNx1"),$("#humidNx2"),$("#humidNx3"),$("#humidNx4"),$("#humidNx5")];

  var currentDate = dayjs().format('DD/MM/YYYY')


    fetch(requestWeatherUrl)
        .then(function(response){
          return response.json();
        })
        .then(function(data){

            function getWeatherIcon(x) {
                var todayIcon=data.list[x].weather[0].icon;
                var img=$('<img>',{src:`https://openweathermap.org/img/wn/${todayIcon}@2x.png`})
                return img
            }

            days[0].append(getWeatherIcon(0));
            location[0].text(data.city.name+" - "+currentDate);
            tempature[0].text("Temp: "+data.list[0].main.temp+" F");
            windSpeed[0].text("Wind: "+data.list[0].wind.speed+" mph");
            humidity[0].text("Humidity: "+data.list[0].main.humidity+"%");

            for (var i = 1, x = 6; i<6; i++, x=x+8){
                days[i].append(getWeatherIcon(x));
                location[i].text(nextDay = dayjs().add(1,'d'));
                tempature[i].text("Temp: "+data.list[x].main.temp+" F");
                windSpeed[i].text("Wind: "+data.list[x].wind.speed+" mph");
                humidity[i].text("Humidity: "+data.list[x].main.humidity+"%");
            }
        })
};

$("#searchButton").on('click', function (event){
    event.preventDefault();
    var cityName = $('#search-query').val()
    locations.push(cityName)
    storeLocations()
    $('#search-list').text(locations)
    $('#search-query').val("")
    var requestGeocodeUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`;
    getApi(requestGeocodeUrl);
});

function init() {
  var storedLocations = JSON.parse(localStorage.getItem("locations"));

  if (storedLocations !== null) {
    locations = storedLocations;
    $('#search-list').text(locations)
  }
}

function storeLocations() {
  localStorage.setItem("locations", JSON.stringify(locations));
}

init()