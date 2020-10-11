

import { css, LitElement, html } from './lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'

import {aMeme} from '/aMeme.js'
import {aButton} from '/aButton.js'

export class profileContent extends LitElement {

    static get properties(){
      return {
        title: { type: String },
        contentType: { type: String },
        bioInfo: {type:Array},
        memes: {type:Array},
        pageData: Object,
        buttons: {type:Array}
      }
    }

    constructor(){
      super()
      this.pageData = {}
        
      this.bioInfo = []
      this.memes = []
      this.buttons = []
    }

    static get styles(){
      return css`
      
 
      
      `
    }

    firstUpdated(){

      U.query({ $find: {on:'bioInfo', where:{ pageTitle: this.title, contentType:this.contentType } } }).then(data=>  this.bioInfo = data)
      U.query({ $find: {on:'buttons', where:{ pageTitle: this.title, contentType:this.contentType } } }).then(data=>  this.buttons = data)
      U.query({ $find: {on:'memes', where:{ pageTitle: this.title, contentType:this.contentType } } }).then(data=>  this.memes = data)
    
    }
  
  
    render(){
        
      return html`
       
        <div id="container">  




        </div>
        
      `
    }
  
}

customElements.define('profile-content',profileContent)