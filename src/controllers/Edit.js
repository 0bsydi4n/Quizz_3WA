import app from '../../app/app.js'
  
export default class Edit {
  
  show() {
    app.mvc.loadView('edit').then(() => {
      this.execute()
    })
  }
  
  execute() {
       document.getElementById('submit_formq').addEventListener('click', this.sendFormQ)
  }
  
    sendFormQ(formQ){
      console.log(formQ);
        //      localStorage.setItem(, formQ);
    }
}