import { css, LitElement, html } from './lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'

import { renderMeme} from '/renderMeme.js'
//first work on memes then bio and 
export class aMeme extends LitElement {

    static get properties() {
      return {
        memeId: { type: String },
        memeData: Object,
        renderMeme:Function
      }
    }

    firstUpdated(){
      if(this.memeData) return
      U.query({'$find':{on:'memes',where:{ _id:this.memeId} } }).then(memes=>{
        this.memeData = memes[0]

        
      U.setMetaTag({property:"og:url"},{content:`http://roasta.upon.one/meme/${this.memeData._id}`})
      U.setMetaTag({property:"og:title"},{content:'Roasted'})
      

      })
    }

    static get styles(){
      return css`

  
      #pageInfo button{
        float: right;
        margin-right: 0;
        line-height: 0;
        background: transparent;
        border: none;
        cursor: pointer;
        font-family: cursive;
        line-height: 0;
        margin-top: -10px;
        outline:none;
        font-size: 60px;
      }

      #pageInfo{
        margin-bottom: 7px;
        display: inline-block;
        width: 100%;
      }


      #response a{
        float: left;
        margin-left: 7px;
        text-decoration: none;
        color: #444;
        font-weight: 900;
        max-width: 60%;
        word-break: break-all;
        font-size: 24px;
      }


      #parent{
        display: inline-block;
        margin-bottom:14px;
        width:94vw;
        font-family:roboto;
      }

      a-button{
        float:right;
        margin-right: 40px;
        margin-top: -7px;
      }

      #response{
        margin-top:20px;
      }

      @media (min-width: 850px) {
        #parent {
          width: 400px;
        }
      }

      `
    }



    render(){

      if(!this.memeData) return html`<h2>Loading...</h2>`

      return html`
      <div id="parent" >

  
 

        <render-meme .memeData='${this.memeData}' >   </render-meme>


 
        <div id="response">

          <a @click="${Link}" href="/page/${this.memeData.pageTitle}"> ${returnFirstName(this.memeData.pageTitle)} </a>

          <a-button 

            .contentType="${this.memeData.contentType}"
            .buttonType="${'memes'}" 
            .contentId="${this.memeData._id}">

          </a-button>
        </div>


      </div>
      `
    }
  
}

customElements.define('a-meme',aMeme)