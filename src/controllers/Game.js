import app from '../../app/app.js';
import Question from '../models/Question.js'
import Theme from '../models/Theme.js'

export default class Game {

  show(form) {
    app.mvc.loadView('game').then(() => {
      this.listener(form)
      this.templateQuizz(form);

    })
  }

  listener(form) {
    let tableau = this.tableauQuestion(form);
    let trash = this.creerQuizz(tableau, form.mode.value);
    let reponseJoueur = [];

    document.getElementById('submit_next').addEventListener('click', (event) => {
      if (document.getElementById('reponse').reponse.value != "") {
        reponseJoueur.push(document.getElementById('reponse').reponse.value);
        this.supprReponse();
        tableau.splice(trash, 1);
        if (tableau.length > 0) {
          trash = this.creerQuizz(tableau, form.mode.value);
        } else {
          this.supprQuestion();
          this.supprButton();
          this.afficherResultat(this.checkingReponse(reponseJoueur), reponseJoueur.length, form.mode.value);
        }
      }
    });

  }

  tableauQuestion(form) {
    let theme = form.theme.value;
    let mode = form.mode.value;
    let tabQuestion = [];
    let question;
    let i;
    let key;
    let length = localStorage.length;
    for (i = 0; i < length; i++) {
      key = localStorage.key(i);
      if (0 == key.indexOf('Question')) {
        question = JSON.parse(localStorage.getItem(key));
        if (question.theme == theme || theme == "undefined")
          tabQuestion.push(question);
      }
    }
    return (tabQuestion);
  }

  templateQuizz(form) {
    let theme = form.theme.value;
    JSON.parse(localStorage.getItem(theme));
    let mode = form.mode.value
    if (theme == "undefined")
      document.getElementById("title").innerHTML = `Theme ALL en mode ${mode} `;
    else
      document.getElementById("title").innerHTML = `Theme ${JSON.parse(localStorage.getItem(theme)).name} en mode ${mode} `;
  }

  creerQuizz(tab, mode) {
    /*while (tab.length) {
       
       document.getElementById("question").innerHTML = * /

     }*/
    let rand = Math.floor(Math.random() * Math.floor(tab.length));
    document.getElementById("question").innerHTML = tab[rand].question;
    let reponse = [];
    if (mode == 'DUO') {
      reponse.push(tab[rand].reponse);
      reponse.push(tab[rand].prop1);
    } else if (mode == 'TIERCE') {
      reponse.push(tab[rand].reponse);
      reponse.push(tab[rand].prop1);
      reponse.push(tab[rand].prop2);
    } else {
      reponse.push(tab[rand].reponse);
      reponse.push(tab[rand].prop1);
      reponse.push(tab[rand].prop2);
      reponse.push(tab[rand].prop3);
    }
    this.afficherReponse(reponse);
    return rand;
  }
  afficherReponse(tab) {
    let i;
    let radio;
    let label;
    let max = tab.length;
    for (i = 0; i < max; i++) {
      let rand = Math.floor(Math.random() * Math.floor(tab.length));
      radio = document.createElement('input');
      label = document.createElement('label');
      radio.name = "reponse";
      radio.type = "radio";
      radio.id = `rep${i}`;
      label.setAttribute('for', `rep${i}`);
      radio.value = rand;
      label.innerHTML = tab[rand];
      label.id = `labelRep${i}`;
      document.getElementById('reponse').appendChild(radio);
      document.getElementById('reponse').appendChild(label);
      tab.splice(rand, 1);
    }
  }

  supprReponse() {
    if (document.getElementById("rep0")) {
      document.getElementById("reponse").removeChild(document.getElementById("rep0"));
      document.getElementById("reponse").removeChild(document.getElementById("labelRep0"));
    }
    if (document.getElementById("rep1")) {
      document.getElementById("reponse").removeChild(document.getElementById("rep1"));
      document.getElementById("reponse").removeChild(document.getElementById("labelRep1"));
    }
    if (document.getElementById("rep2")) {
      document.getElementById("reponse").removeChild(document.getElementById("rep2"));
      document.getElementById("reponse").removeChild(document.getElementById("labelRep2"));
    }
    if (document.getElementById("rep3")) {
      document.getElementById("reponse").removeChild(document.getElementById("rep3"));
      document.getElementById("reponse").removeChild(document.getElementById("labelRep3"));
    }
  }
  supprQuestion() {
    document.getElementById("question").innerHTML = "";
  }

  checkingReponse(tab) {
    let bonneRep = 0;
    tab.forEach((reponse) => {
      if (reponse == 0)
        bonneRep++;
    });
    return bonneRep;
  }
  supprButton() {

    document.getElementById('submit_next').setAttribute('style', 'display:none');
  }
  afficherResultat(bonneRep, totalRep, mode) {
    let note = (bonneRep * 20) / totalRep;
    let score
    if(mode == "DUO")
      score = bonneRep * 1;
    if(mode == "TIERCE")
      score = bonneRep * 2;
    if(mode == "CARRE")
      score = bonneRep * 3;    
    document.getElementById('bonneRep').innerHTML = `Nombre de bonne réponse ${bonneRep} sur ${totalRep}`;
    document.getElementById('note').innerHTML = `Vous obtenez une note de: ${note.toFixed(2)} sur 20`;
    document.getElementById('score').innerHTML = `Vous obtenez un score de: ${score} pts`;
  }






}
