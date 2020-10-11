
import { css, LitElement, html } from './lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'

export class senseOfHumour extends LitElement {

    static get properties() {
      return {
        score:Number,
        user:Object
      }
    }

    constructor(){
        super()
        this.score = null
        U.readUser().then(user=>{
            if(user){
                this.user = user
                U.query({$count:{on:'actions', where:{receiver:'$user.id'}}}).then(data=>{
                    this.score = data
                }).catch(e=>{
                  this.score = null
                })
            }
        })

    }


    static get styles(){
      return css`
        h3{
            text-align:center;
            font-family:roboto;
            font-weight:100;
        }
      `
    }


    render(){
       if(this.score !== null) return html`<h3> Your Sense of humor: ${this.score} </h3> `
    }
  
}

customElements.define('sense-of-humour',senseOfHumour)