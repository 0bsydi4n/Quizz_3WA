import app from '../../app/app.js';
export default class Game {

  show() {
    app.mvc.loadView(`game`).then(() => {
    });
  }
}
