
import { css, LitElement, html } from '../lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'

//first work on memes then bio and 
export class addBio extends LitElement {

    static get properties() {
      return {
        pageTitle: { type: String },
        contentType: { type: String },
        textField:{type:String},
        textValue:{type:String}
      }
    } 

    constructor(){
      super()
      this.textField = ''
      this.textValue = ''
    }

    async publish(){
      let publishing = U.say('publishing...')
      try{
        let newContent = await U.query({$write:{ on:'bioInfo', put:{pageTitle:this.pageTitle, contentType:this.contentType, field:this.textField, value:this.textValue} } })
        publishing.kill()
        if(newContent.error) return
        Link(`/page/${this.pageTitle}`)
      }catch(error){
        U.login()
      }

    }

    updateValue(e){
      e.target.dataset.type === 'field'? this.textField = e.target.value: this.textValue = e.target.value
    }

    static get styles(){
      return css`

        #container{
          display:grid;
          place-items:center;
          font-family:roboto;
        }

        input,button{
          width: 62%;
          border: 1px solid #000;
          padding: 14px 21px;
          font-size: 20px;
          border-radius: 300px;
          margin: 12px 0;
          outline:none
      }

      button{
          border: none;
          background: #fe5542;
          color: #fff;
          padding: 12px 24px;
          display: inline-block;
          width: 67%;
      }

      `
    }
  
    render(){

      return html`
      <div id="container">
        <h3>Roast by Sarcastic Bio</h3>


        <input data-type="field" value=${this.textField} @keyup="${this.updateValue.bind(this)}" placeholder="field">
        <input data-type="value" value=${this.textValue} @keyup="${this.updateValue.bind(this)}" placeholder="value">

        <button @click="${this.publish.bind(this)}"> Add </button>

      </div>
      `
    }
  
}

customElements.define('add-bio',addBio)