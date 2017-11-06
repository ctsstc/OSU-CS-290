
// Dry up some redundancies
HTMLDivElement.prototype.firstByClass = function(className) {
  return this.getElementsByClassName(className)[0];
};

class Echoer {

  constructor(container) {
    this.container = container;
    this.apiEndpoint = 'http://httpbin.org/post';

    this.bindUI();
    this.UIEvents();
  }

  bindUI() {
    this.faveAnimal = this.container.firstByClass('favorite-animal');
    this.faveColor = this.container.firstByClass('favorite-color');
    this.faveSmell = this.container.firstByClass('favorite-smell');
    this.submit = this.container.firstByClass('submit');
    this.output = this.container.firstByClass('output');
  }

  UIEvents() {
    // Thanks Week 4! with the bind :party-parrot: ᕕ( ᐛ )ᕗ
    this.submit.addEventListener('click', this.echoPost.bind(this));
  }

  buildAPIQuery(query) {
    return `${this.mapAPIURI}?q=${query}&appid=${this.apiKey}&units=${this.units}`;
  }

  echoPost(event) {
    let req = new XMLHttpRequest();
    let uri = this.apiEndpoint;
    let payload = {
      favorite: {
        animal: this.faveAnimal.value,
        color: this.faveColor.value,
        smell: this.faveSmell.value
      }
    };

    req.open('POST', uri, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', () => {
      if(req.status >= 200 && req.status < 400) {
        let response = JSON.parse(req.responseText);
        console.log(response);
        this.display(JSON.parse(response.data));
      } 
      else {
        console.error("Error in network request: " + req.statusText);
      }});
    req.send(JSON.stringify(payload));
      
    event.preventDefault();
  }

  display(response) {
    this.output.innerText = JSON.stringify(response, null, ' ');
  }

}

let weatherContainer = document.getElementById('babyComeBack');
new Echoer(weatherContainer);