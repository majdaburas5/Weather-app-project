class ApiManager {
  constructor() {
    this.cities = [];
  }

  getCities() {
    return $.get("/getCityData").then((cities) => {
      this.cities = [];
      this.cities.forEach((c) => {
        c["newCity"] = false;
      });
      this.cities.push(...cities);
      return this.cities;
    });
  }

  getCity(cityNameInput) {
    return $.get(`/getWeather/${cityNameInput}`).then((cityData) => {
      cityData["newCity"] = true;
      this.cities.push(cityData);
      return this.cities;
    });
  }

  saveCityData(cityName) {
    $.post(`/addNewCity`, {
      name: cityName,
    });
  }

  deleteCity(cityName) {
    $.ajax({
      url: `/deleteCity/${cityName}`,
      type: "DELETE",
      success: function (result) {},
    });
  }
}
