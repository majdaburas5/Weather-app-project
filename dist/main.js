const apiManager = new ApiManager();
const render = new Renderer();

const getCities = function () {
  apiManager.getCities().then((cityData) => {
    render.renderer(cityData);
  });
};

getCities();

const fetchCityData = () => {
  let cityNameInput = $("#cityNameInput").val();
  apiManager.getCity(cityNameInput).then((cityWeather) => {
    render.renderer(cityWeather);
  });
};

$(".city-container").on("click", ".plus", function () {
  let cityName = $(this).closest(".result").find(".weather").data().name;
  apiManager.saveCityData(cityName);
  render.renderer(cityname);
  getCities();
});

$(".city-container").on("click", ".minus", function () {
  let cityName = $(this).closest(".result").find(".weather").data().name;
  apiManager.deleteCity(cityName);
  getCities();
});
