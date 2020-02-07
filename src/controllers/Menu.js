import app from '../../app/app.js';
import Game from './Game.js';

export default class Menu {

  show() {
    app.mvc.loadView(`menu`).then(() => {
      this.listener();
      this.afficherTheme();
      this.afficherMode();
      this.afficherNiveau();
    });
  }

  listener() {
    let form;
    document.getElementById('submit_quizz').addEventListener('click', (event) => {
      form = document.getElementById('quizz');
      if (form.theme.value != "" && form.niveau.value != "" && form.mode.value != "") {
        let GameController = new Game();
        GameController.show(form);
      }
    });
    document.getElementById('quizz').addEventListener('change', (event => {
      form = document.getElementById('quizz');
      if (form.theme.value != "" && form.mode.value != "" && form.niveau.value != "")
        document.getElementById('button_title').innerHTML = 'Press "START" to begin';
    }));
  }

  afficherTheme() {
    let length = localStorage.length;
    let i;
    let key;
    let theme;
    let radio;
    let label;

    for (i = 0; i < length; i++) {
      key = localStorage.key(i);
      if (0 == key.indexOf('Theme')) {
        radio = document.createElement('input');
        label = document.createElement('label');
        theme = JSON.parse(localStorage.getItem(key));
        radio.name = 'theme';
        radio.type = "radio";
        radio.value = key;
        radio.id = i;
        label.setAttribute('for', i);
        label.name = `label${i}`
        label.innerHTML = theme.name;
        document.getElementById('theme').appendChild(radio);
        document.getElementById('theme').appendChild(label);
      }
    }
    //theme ALL
    radio = document.createElement('input');
    label = document.createElement('label');
    radio.name = 'theme';
    radio.type = "radio";
    radio.value = "undefined";
    radio.id = `theme${i}`;
    label.id = `labelTheme${i}`;
    label.setAttribute('for', `theme${i}`);
    label.innerHTML = "ALL";
    document.getElementById('theme').appendChild(radio);
    document.getElementById('theme').appendChild(label);
  }

  afficherMode() {
    let i;
    let radio;
    let label;
    for (i = 0; i < 4; i++) {
      radio = document.createElement('input');
      label = document.createElement('label');
      radio.name = "mode";
      radio.type = "radio";
      radio.id = `mode${i}`;
      label.setAttribute('for', `mode${i}`);
      switch (i) {
        case 0:
          radio.value = "DUO";
          label.innerHTML = "DUO";
          label.id = "labelModeDUO";
          break;
        case 1:
          radio.value = "TIERCE";
          label.innerHTML = "TIERCE";
          label.id = "labelModeTIERCE";
          break;
        case 2:
          radio.value = "CARRE";
          label.innerHTML = "CARRE";
          label.id = "labelModeCARRE";
          break;
        case 3:
          radio.value = "CHOIX";
          label.innerHTML = "CHOIX";
          label.id = "labelModeCHOIX";
          break;
      }
      document.getElementById('mode').appendChild(radio);
      document.getElementById('mode').appendChild(label);
    }
  }

  afficherNiveau() {
    let i;
    let radio;
    let label;
    for (i = 0; i < 3; i++) {
      radio = document.createElement('input');
      label = document.createElement('label');
      radio.name = "niveau";
      radio.type = "radio";
      radio.id = `niv${i}`;
      label.setAttribute('for', `niv${i}`);
      switch (i) {
        case 0:
          radio.value = "easy";
          label.innerHTML = "Mode Facile";
          label.id = "labelEasy";
          break;
        case 1:
          radio.value = "medium";
          label.innerHTML = "Mode Normal";
          label.id = "labelMedium";
          break;
        case 2:
          radio.value = "hard";
          label.innerHTML = "Mode Difficile";
          label.id = "labelHard";
          break;
      }
      document.getElementById('niveau').appendChild(radio);
      document.getElementById('niveau').appendChild(label);
    }


  }

}
