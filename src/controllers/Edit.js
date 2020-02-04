import app from '../../app/app.js';
import Question from '../models/Question.js'
import Theme from '../models/Theme.js'

export default class Edit {

  show() {
    app.mvc.loadView('edit').then(() => {
      this.listener()
    })
  }

  listener() {



    /*=============================
          AJOUT D'UN THEME
    ================================*/

    //Apparition du formulaire
    document.getElementById('submit_addT').addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById('formT').style.display = 'flex';
      document.getElementById('formT').style.flexDirection = "column";
      document.getElementById('formT').style.textAlign = "center";
      document.getElementById('formQ').style.display = 'none';
      document.getElementById('form_modifyQ').style.display = 'none';
    })


    /*============================
        AJOUT D'UNE QUESTION
    ==============================*/

    //Apparition du formulaire
    document.getElementById('submit_addQ').addEventListener('click', (event) => {
      document.getElementById('formQ').style.display = 'flex';
      document.getElementById('formQ').style.flexDirection = "column";
      document.getElementById('formQ').style.textAlign = "center";
      document.getElementById('formT').style.display = 'none';
      document.getElementById('form_modifyQ').style.display = 'none';
    })

    //Envoi de la question
    document.getElementById('submit_formQ').addEventListener('click', (event) => {
      event.preventDefault();
      this.addQuestion(document.getElementById('formQ'));
      document.getElementById('formQ').question.value = "";
      document.getElementById('formQ').reponse.value = "";
      document.getElementById('formQ').prop1.value = "";
      document.getElementById('formQ').prop2.value = "";
      document.getElementById('formQ').prop3.value = "";
    })


    /*============================
        MODIFIER'UNE QUESTION
    ==============================*/
    //Apparition du formulaire
    document.getElementById('submit_modifyQ').addEventListener('click', (event) => {
      document.getElementById('form_modifyQ').style.display = 'flex';
      document.getElementById('form_modifyQ').style.flexDirection = "column";
      document.getElementById('form_modifyQ').style.textAlign = "center";
      document.getElementById('formQ').style.display = 'none';
      document.getElementById('formT').style.display = 'none';
      this.listQuestion();
    })


  }
  addQuestion(formQ) {
    var question = new Question;
    var id = `${formQ.theme.value}_${Math.random().toString(36).substr(2, 9)}`;
    question.theme = formQ.theme.value;
    question.question = formQ.question.value;
    question.reponse = formQ.reponse.value;
    question.prop1 = formQ.prop1.value;
    question.prop2 = formQ.prop2.value;
    question.prop3 = formQ.prop3.value;
    localStorage.setItem(id, JSON.stringify(question));
  }

  addTheme() {}

  listQuestion() {
    var length = localStorage.length;
    var i;
    var key;
    var option;
    var question;

    for (i = 0; i < length; i++) {
      key = localStorage.key(i);
      question = JSON.parse(localStorage.getItem(key));
      option = document.createElement('option');
      option.className = 'option';
      option.value = key;
      option.innerHTML = `${question.question}`;
      document.getElementById('idQuestion').appendChild(option);
      this.formMFilling()
    }
  }

  formMFilling() {
    /*document.getElementsByClassName('option').addEventListener('select', (event)=>{
      
    })
    */


  }


}
