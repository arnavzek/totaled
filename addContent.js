
import { css, LitElement, html } from './lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'

import {addContentHeader} from '/addContentHeader.js'

import {addMeme} from '/addContentComponents/addMeme.js'
import {addBio} from '/addContentComponents/addBio.js'
import {addButton} from '/addContentComponents/addButton.js'

export class addContent extends LitElement {

    static get properties() {
      return {
        pageTitle: { type: String },
        contentType: { type: String },
        currentTab:String
      }
    }

    constructor(){
      super()

    }
  
  
    render(){

      let mainContent = html``

      if(this.pageTitle == 'undefined') return mainContent = html`<add-meme .pageTitle="${this.pageTitle}" .contentType="${this.contentType}" >  </add-meme>`

      switch(this.currentTab){
        case 'meme':
          mainContent = html`<add-meme .pageTitle="${this.pageTitle}" .contentType="${this.contentType}" >  </add-meme>`
          break
        case 'bio':
          mainContent = html`<add-bio .pageTitle="${this.pageTitle}" .contentType="${this.contentType}" >  </add-bio>`
          break
        case 'button':
          mainContent = html`<add-button .pageTitle="${this.pageTitle}" .contentType="${this.contentType}" >  </add-button>`
          break     
      }

      return html`
      <p>
          <div id="tabs">
            <add-content-header .currentTab="${this.currentTab}" .pageTitle="${this.pageTitle}" .contentType="${this.contentType}" ></add-content-header>
          </div>
          
          <div id="container">
          ${mainContent}
          </div>
      </p>
      `
    }
  
}

customElements.define('add-content',addContent)