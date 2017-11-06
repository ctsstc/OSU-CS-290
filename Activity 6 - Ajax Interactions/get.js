
// Dry up some redundancies
HTMLDivElement.prototype.firstByClass = function(className) {
  return this.getElementsByClassName(className)[0];
};

class WeatherMe {

  constructor(container) {
    this.container = container;

    this.bindUI();
    this.UIEvents();
  }

  bindUI() {
    this.city = this.container.firstByClass('city');
    this.zip = this.container.firstByClass('zip');
    this.submit = this.container.firstByClass('submit');
  }

  UIEvents() {
    // Thanks Week 4! with the bind :party-parrot: ᕕ( ᐛ )ᕗ
    this.submit.addEventListener('click', this.findWeather.bind(this));
  }

  findWeather() {
    let query = this.city.value || this.zip.value;
    console.log("QUERY", query);
  }

}

//       req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Corvallis,or&appid=fa7d80c48643dfadde2cced1b1be6ca1", false);


let weatherContainer = document.getElementById('myWeather');
new WeatherMe(weatherContainer);