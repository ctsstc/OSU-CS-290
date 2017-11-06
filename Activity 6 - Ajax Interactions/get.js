
// Dry up some redundancies
HTMLDivElement.prototype.firstByClass = function(className) {
  return this.getElementsByClassName(className)[0];
};

class WeatherMe {

  constructor(container) {
    this.container = container;
    this.apiKey = 'fa7d80c48643dfadde2cced1b1be6ca1';
    this.mapAPIURI = 'http://api.openweathermap.org/data/2.5/weather';

    this.bindUI();
    this.UIEvents();
  }

  bindUI() {
    this.cityStateZip = this.container.firstByClass('city-state-zip');
    this.submit = this.container.firstByClass('submit');
  }

  UIEvents() {
    // Thanks Week 4! with the bind :party-parrot: ᕕ( ᐛ )ᕗ
    this.submit.addEventListener('click', this.findWeather.bind(this));
  }

  buildAPIQuery(query) {
    return `${this.mapAPIURI}?q=${query}&appid=${this.apiKey}`;
  }

  findWeather() {
    let query = this.cityStateZip.value;
    let req = new XMLHttpRequest();
    let uri = this.buildAPIQuery(query);

    req.open('GET', uri, true);
    //req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        let response = JSON.parse(req.responseText);
        console.log(response);
      } 
      else {
        console.error("Error in network request: " + req.statusText);
      }});
    req.send();
  }

}

let weatherContainer = document.getElementById('myWeather');
new WeatherMe(weatherContainer);