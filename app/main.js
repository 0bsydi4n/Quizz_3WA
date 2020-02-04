import app from './app.js';
import config from './config.js';
import Home from '../src/controllers/Home.js';
import Edit from '../src/controllers/Edit.js';
import Game from '../src/controllers/Game.js';

// --------------------------------------------------------------------------------------------------------------------
// INITIALISATION DE L'APPLICATION
// --------------------------------------------------------------------------------------------------------------------

function initializeRouter() {
    // Instancier ici le Vanilla Router dans l'objet "app.mvc.router"
    // ...
  app.mvc.router = new Router({
    mode: 'hash',
    root: '/index.html'
  });

  app.mvc.router.add('/', function () {
    let HomeController = new Home();
    HomeController.show();
  });
  app.mvc.router.add('/edit', function () {
    let EditController = new Edit();
    EditController.show();
  });
  app.mvc.router.add('/game', function () {
    let GameController = new Game();
    GameController.show();
  });
  app.mvc.router.add('/login', function () {
    let LoginController = new Login();
    LoginController.show();
  });

  app.mvc.router.check().addUriListener();

}


// --------------------------------------------------------------------------------------------------------------------
// CODE PRINCIPAL
// --------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    // Initialisation du routeur.
    initializeRouter();
});