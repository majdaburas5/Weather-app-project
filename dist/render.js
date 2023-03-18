class Renderer {
  constructor() {}
  renderer(citiesData) {
    const source = $("#city-data").html();
    let template = Handlebars.compile(source);
    const newHTML = template({ cities: citiesData });
    $(".city-container").empty().append(newHTML);
  }
}
