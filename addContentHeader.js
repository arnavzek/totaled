
import { css, LitElement, html } from './lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'

export class addContentHeader extends LitElement {

    static get properties() {
      return {
        pageTitle: { type: String },
        contentType: { type: String },
        currentTab:String
      }
    }

    ifActive(tab){
      if(tab==this.currentTab) return true;
      return false
    }

    static get styles(){
      return css`
          #tabs button{
            background: no-repeat;
            border: none;
            font-size: 20px;
            padding:0;
            outline:none;
            margin-right:15px;

            color: #222;
            font-weight:200;
            cursor:pointer;
            font-family: roboto;
        }


        #tabs{
            margin-bottom:30px;
        }

        #tabs button[data-active="true"]{
            font-weight:900;
            color: rgb(255 63 63);;
        }
      `
    }

    render(){

        return html`
        <center>
            <div id="tabs">
                <button data-active=${this.ifActive('meme')} href="/addContent/${this.pageTitle}/${this.contentType}/meme" @click='${Link}'>Meme</button>
                <button data-active=${this.ifActive('bio')} href="/addContent/${this.pageTitle}/${this.contentType}/bio" @click='${Link}'>Bio</button>
                <button data-active=${this.ifActive('button')} href="/addContent/${this.pageTitle}/${this.contentType}/button" @click='${Link}'>Button</button>
            </div>
        </center>
        `
    }
  
}

customElements.define('add-content-header',addContentHeader)