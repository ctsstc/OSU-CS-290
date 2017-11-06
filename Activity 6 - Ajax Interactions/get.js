
// Dry up some redundancies
HTMLDivElement.prototype.firstByClass = function(className) {
  return this.getElementsByClassName(className)[0];
};

class WeatherMe {

  constructor(container) {
    this.container = container;
    this.apiKey = 'fa7d80c48643dfadde2cced1b1be6ca1';
    this.mapAPIURI = 'http://api.openweathermap.org/data/2.5/weather';
    this.units = 'imperial';

    this.bindUI();
    this.UIEvents();
  }

  bindUI() {
    this.cityStateZip = this.container.firstByClass('city-state-zip');
    this.submit = this.container.firstByClass('submit');
    this.output = this.container.firstByClass('output');
  }

  UIEvents() {
    // Thanks Week 4! with the bind :party-parrot: ᕕ( ᐛ )ᕗ
    this.submit.addEventListener('click', this.findWeather.bind(this));
  }

  buildAPIQuery(query) {
    return `${this.mapAPIURI}?q=${query}&appid=${this.apiKey}&units=${this.units}`;
  }

  findWeather() {
    let query = this.cityStateZip.value;
    let req = new XMLHttpRequest();
    let uri = this.buildAPIQuery(query);

    req.open('GET', uri, true);
    //req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', () => {
      if(req.status >= 200 && req.status < 400) {
        let response = JSON.parse(req.responseText);
        console.log(response);
        this.displayTemp(response.main.temp);
      } 
      else {
        console.error("Error in network request: " + req.statusText);
      }});
    req.send();
  }

  displayTemp(temp) {
    let text = `${temp} °F \nIt's `;

    if (temp < 33) {
      text += 'Freezing Bob Sagget! \nYour tauntaun will freeze before you reach the first marker!';
    }
    else if (temp > 32 && temp < 65) {
      text += 'Probably Feeling Cold. \nTake a Nap and Hot CoCo';
    }
    else if (temp > 64 && temp < 81) {
      text += 'Real Nice out Right Now Go Take a Walk or Something; \nWhy Are You Here?!';
    }  
    else if (temp > 80) {
      text += 'Past Al Dante, \nMaybe You Should Stay Inside...';
    }

    this.output.innerText = text;
  }

}

let weatherContainer = document.getElementById('myWeather');
new WeatherMe(weatherContainer);