import app from '../../app/app.js';
import Question from '../models/Question.js'
import Theme from '../models/Theme.js'

export default class Edit {

  show() {
    app.mvc.loadView('edit').then(() => {
      this.listener()
      this.listQuestion();
      this.listTheme();
    })
  }

  listener() {
    /*=============================
                THEME
    ================================*/

    //Apparition du formulaire
    document.getElementById('submit_addT').addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById('formT').style.display = 'flex';
      document.getElementById('formT').style.flexDirection = "column";
      document.getElementById('formT').style.textAlign = "center";
      document.getElementById('formQ').style.display = 'none';
    })

    //Ajout d'un nouveau thème
    let themeId;
    document.getElementById('submit_formT').addEventListener('click', (event) => {
      if (!(themeId == "undefined")) {
        localStorage.removeItem(themeId);
      }
      this.addTheme(document.getElementById('formT'));
      document.getElementById('formT').idTheme.value = "undefined";
      document.getElementById('formT').nameT.value = "";
      document.getElementById('formT').imageT.value = "";
      this.listTheme();
    })

    //Selectionner un theme
    let theme;
    let listTheme = document.getElementById('idTheme');
    listTheme.addEventListener('change', (event) => {
      themeId = listTheme.options[listTheme.selectedIndex].value;
      if (!(themeId == "undefined")) {
        theme = JSON.parse(localStorage.getItem(themeId));
        document.getElementById('nameT').value = theme.name;
      } else {
        document.getElementById('nameT').value = "";
        document.getElementById('imageT').value = "";
      }
    });

    //Supprimer un theme
    document.getElementById('submit_supprT').addEventListener('click', (event) => {
      if (!(themeId == "undefined")) {
        localStorage.removeItem(themeId);
      }
      document.getElementById('nameT').value = "";
        document.getElementById('imageT').value = "";
      this.listTheme();
    })


    /*============================
            QUESTION
    ==============================*/

    //Apparition du formulaire
    document.getElementById('submit_addQ').addEventListener('click', (event) => {
      document.getElementById('formQ').style.display = 'flex';
      document.getElementById('formQ').style.flexDirection = "column";
      document.getElementById('formQ').style.textAlign = "center";
      document.getElementById('formT').style.display = 'none';
    })


    //Envoi de la question
    document.getElementById('submit_formQ').addEventListener('click', (event) => {
      if (!(questionId == 'undefined')) {
        localStorage.removeItem(questionId);
      }
      this.addQuestion(document.getElementById('formQ'));
      document.getElementById('formQ').question.value = "";
      document.getElementById('formQ').theme.value = "undefined";
      document.getElementById('formQ').reponse.value = "";
      document.getElementById('formQ').prop1.value = "";
      document.getElementById('formQ').prop2.value = "";
      document.getElementById('formQ').prop3.value = "";
      this.listQuestion();
    })

    //Supprimer une question
    document.getElementById('submit_supprQ').addEventListener('click', (event) => {
      if (!(questionId == "undefined")) {
        localStorage.removeItem(questionId);
      }
      document.getElementById('formQ').theme.value = "undefined";
      document.getElementById('formQ').question.value = "";
      document.getElementById('formQ').reponse.value = "";
      document.getElementById('formQ').prop1.value = "";
      document.getElementById('formQ').prop2.value = "";
      document.getElementById('formQ').prop3.value = "";
      this.listQuestion();
    })

    // modifier une question
    let question;
    let questionId;
    let listId = document.getElementById('idQuestion');
    listId.addEventListener('change', (event) => {
      questionId = listId.options[listId.selectedIndex].value;
      if (!(questionId == "undefined")) {
        question = JSON.parse(localStorage.getItem(questionId));
        document.getElementById('theme').value = question.theme;
        document.getElementById('question').value = question.question;
        document.getElementById('reponse').value = question.reponse;
        document.getElementById('prop1').value = question.prop1;
        document.getElementById('prop2').value = question.prop2;
        document.getElementById('prop3').value = question.prop3;
      } else {
        document.getElementById('theme').value = "undefined";
        document.getElementById('question').value = "";
        document.getElementById('reponse').value = "";
        document.getElementById('prop1').value = "";
        document.getElementById('prop2').value = "";
        document.getElementById('prop3').value = "";
      }
    });
  }

  addQuestion(formQ) {
    var question = new Question;
    var id = `Question_${Math.random().toString(36).substr(2, 9)}`;
    question.theme = formQ.theme.value;
    question.question = formQ.question.value;
    question.reponse = formQ.reponse.value;
    question.prop1 = formQ.prop1.value;
    question.prop2 = formQ.prop2.value;
    question.prop3 = formQ.prop3.value;
    localStorage.setItem(id, JSON.stringify(question));
  }

  addTheme(formT) {
    var theme = new Theme;
    var id = `Theme_${Math.random().toString(36).substr(2, 9)}`;
    theme.name = formT.nameT.value;
    theme.image = formT.imageT.value;
    console.log(theme);
    localStorage.setItem(id, JSON.stringify(theme));
  }

  listQuestion() {
    let length = localStorage.length;
    let i;
    let key;
    let option;
    let question;

    document.getElementById('idQuestion').innerHTML = '';
    // ajouter le undefined
    option = document.createElement('option');
    option.className = 'option';
    option.value = "undefined";
    option.innerHTML = `====| Nouvelle Question |====`;
    document.getElementById('idQuestion').appendChild(option);

    for (i = 0; i < length; i++) {
      key = localStorage.key(i);
      if (0 == key.indexOf('Question')) {
      question = JSON.parse(localStorage.getItem(key));
      option = document.createElement('option');
      option.className = 'option';
      option.value = key;
      option.innerHTML = `${question.question}`;
      document.getElementById('idQuestion').appendChild(option);
      }
    }
  }

  listTheme() {
    let length = localStorage.length;
    let i;
    let key;
    let option;
    let theme;
    let clone;

    document.getElementById('idTheme').innerHTML = '';

    for (i = 0; i < length; i++) {
      key = localStorage.key(i);
      if (0 == key.indexOf('Theme')) {
        theme = JSON.parse(localStorage.getItem(key));
        option = document.createElement('option');
        option.className = 'option';
        option.value = key;
        option.innerHTML = theme.name;
        //clone = option.cloneNode(true);
        document.getElementById('idTheme').appendChild(option);
      }
    }
    document.getElementById('theme').innerHTML = document.getElementById('idTheme').innerHTML;

    // ajouter le undefined
    option = document.createElement('option');
    option.className = 'option';
    option.value = "undefined";
    option.selected = true
    option.innerHTML = `====| Nouveau Theme|====`;
    document.getElementById('idTheme').prepend(option);

  }

}
