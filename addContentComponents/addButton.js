
import { css, LitElement, html } from '../lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'

//first work on memes then bio and 
export class addButton extends LitElement {

    static get properties(){
      return {
        pageTitle: { type: String },
        contentType: { type: String },
        buttonText:{type:String},
      }
    }

    constructor(){
      super()
      this.buttonText = ''
    }

    async publish(){
      if(!this.buttonText) return U.say('button text is required')

      try{
        await U.query({$write:{ on:'buttons', put:{contentType:this.contentType, pageTitle: this.pageTitle, buttonText: this.buttonText} } })
        Link(`/page/${this.pageTitle}`)
      }catch(e){
        U.login()
      }

    }
  
    updateValue(e){
      this.buttonText = e.target.value
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
    

        <input @keyup="${this.updateValue.bind(this)}" value="${this.buttonText}" placeholder="Roast by funny button">
        <button @click="${this.publish.bind(this)}"> Publish  </button>
      </div>
      `
    }
  
}

customElements.define('add-button',addButton)