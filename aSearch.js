
import { css, LitElement, html } from './lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'
import {pageCard} from '/pageCard.js'

export class aSearch extends LitElement {

    static get properties() {
      return {
        query: { type: String },
        pages:{type:Object}
      }
    }

    constructor(){
        super()
        this.refresh= this.refresh.bind(this)
    }

    async refresh(){
      this.pages = await wikiSearch(this.query)
      this.pages = this.pages.query.search
    }



    updated(changedProperties){

      changedProperties.forEach((oldValue, propName) => {
        if(propName == 'query'){
          this.pages = null
          this.refresh()
        }


      })

    }

    static get styles(){
      return css`

      #main{
        margin-top:50px;
      }

      *{
        font-family:roboto;
      }

      page-card{
        width:100%;
      } 

      @media (min-width:850px){
        #main{
          display:grid;
          place-items:center;
          grid-template-columns:33% 33% 33%;
          width:100vw;
        }

      
      }

      `
    }




    render(){

      if(!this.pages) return html`<center> <h1> Searching for ${this.query} </h1> </center>`

      return html`
        <center id="main">  
        ${this.pages.length == 0? html`
        
        <h1> Sorry can't find ${this.query}
        
        </h1>`:html``}
          
            ${this.pages.map(page=>html`

            <page-card .page='${page}'> </page-card>
            
            `)}
         
        </center>
      `
    }
  
}

customElements.define('a-search',aSearch)