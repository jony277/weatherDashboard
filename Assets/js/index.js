var key = '64f2ee2a8261daa4d9f780f5b365f275';
var city = "Denver";

var date = moment().format('dddd, MMMM Do YYYY');

var cityHist = [];

$('.search').on("click", function(event) {
    event.preventDefault();
    city = $('.textVal').val().trim();
    if (city === "") {
        return;
    }
    cityHist.push(city);
    localStorage.setItem('city', JSON.stringify(cityHist));
    getHistory();
    getWeatherToday();
});

var contHistEl = $('.cityHist');

function getHistory() {
    contHistEl.empty();
    for (let i = 0; i < cityHist.length; i++) {
        var rowEl = $('<row>');
        var btnEl = $('<button>').text(`${cityHist[i]}`);
        rowEl.addClass('row histBtnRow');
        btnEl.addClass('btn btn-outline-secondary histBtn');
        btnEl.attr('type', 'button');
        contHistEl.prepend(rowEl);
        rowEl.append(btnEl);
    }
    $('.histBtn').on("click", function(event) {
        event.preventDefault();
        city = $(this).text();
        getWeatherToday();
    });
};

var cardTodayBody = $('.cardBodyToday');

function getWeatherToday() {
    var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
    $(cardTodayBody).empty();
    $.ajax({
        url: getUrlCurrent,
        method: 'GET',
    }).then(function(response) {
        $('.cardTodayCityName').text(response.name);
        $('.cardTodayDate').text(date);
        $('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
        var pEl = $('<p>').text(`Temperature: ${response.main.temp} °F`);
        cardTodayBody.append(pEl);
        var pElHumid = $('<p>').text(`Humidity: ${response.main.humidity} %`);
        cardTodayBody.append(pElHumid);
        var pElWind = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
        cardTodayBody.append(pElWind);
    });
};

function initLoad() {
    var cityHistStore = JSON.parse(localStorage.getItem('city'));
    if (cityHistStore !== null) {
        cityHist = cityHistStore;
    }
    getHistory();
    getWeatherToday();
};

initLoad();
