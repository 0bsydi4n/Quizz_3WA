import app from '../../app/app.js';
export default class Game {

  show() {
    app.mvc.loadView(`game`).then(() => {
      this.listener()
    });
  }
  
  listener() {
    document.getElementById('submit_formR').addEventListener('click', (event) => {
      event.preventDefault();
      var test = JSON.parse(localStorage.getItem("Question"));
      console.log(test);
    })
  }
  
}
