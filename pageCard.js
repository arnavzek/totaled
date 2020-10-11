
import { css, LitElement, html } from './lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'


export class pageCard extends LitElement {

    static get properties() {
      return {
        page:{type:Object}
      }
    }

    constructor(){
        super()
    }

    async firstUpdated(){

      let readArray = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&redirects=1&prop=pageimages%7Cextracts&pithumbsize=300&titles=${this.page.title}&pilicense=any&exsentences=4&explaintext=1&exsectionformat=plain`).then(data=>data.json())
      let pageId = Object.keys(readArray.query.pages)[0]
      this.page = readArray.query.pages[pageId]

    }

    static get styles(){
      return css`

        .page:hover{
          background:#222;
          color:#fff;
        }
        .page{
          display: inline-block;
          margin: 12px;
          padding: 24px;
          font-size: 24px;
          border-radius: 30px;
          background: #fff;
          border:3px solid;
          color: #222;
          text-decoration: none;
          font-family: roboto;
          
          height:200px;

          display: grid;
          grid-template-columns: 38% 62%;
    }
        

        .page img{
          width: 100%;
          height: 200px;
          object-fit: contain;
        }

        .page .profileLink{
          font-size:80px;
        }

        .page > *{
          pointer-events:none;
          word-break: break-all;
        }

        *{
          font-family:roboto
        }

        @media (min-width:850px){
          .page{
            width:85%;
          }
        }
        

      `
    }


    render(){

        let page = this.page
      return html`

            <a @click="${Link}" class='page' href="/page/${page.title}">  
              <div class="profileLink">
              ${page.thumbnail?html`<img src="${page.thumbnail.source}">`:'🐔'}
              </div>
              <h3 class="title" >${page.title}</h3>
            </a>
            
      `
    }
  
}

customElements.define('page-card',pageCard)