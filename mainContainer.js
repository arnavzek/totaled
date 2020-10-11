import { css, LitElement, html } from './lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'



import { createPage } from '/createPage.js'
import { aPage } from '/aPage.js'
import { aMeme } from '/aMeme.js'
import { aSearch } from '/aSearch.js'
import { addContent } from '/addContent.js'
import { listOfMemes } from '/listOfMemes.js'
import { senseOfHumour } from '/senseOfHumour.js'

export class mainContainer extends LitElement {
  static get properties() {
    return {
      routeComponent: { type: Object }
    }
  }


  constructor() {
    super()
  }


  firstUpdated(){
    let config = [
      {pattern:'/',transitionType:'slide',transitionAxis:'x',component:()=>{

        return html`
            <sense-of-humour>  </sense-of-humour>
            <list-of-memes></list-of-memes>
        `}},
      {pattern:'/search/:query',component:(range)=>{ return html`<a-search .query="${range.params.query}"> </a-search>` }},
      {pattern:'/meme/:id',component:(range)=>{ return html`<br><br><center><a-meme .memeId="${range.params.id}"> </a-meme></center>` }},
      {pattern:'/page/:title',component:(range)=>{ console.log(range); return html`<a-page .title="${range.params.title}"> </a-page>` }},
      {pattern:'/createPage',component:(range)=>{ return html`<create-page > </create-page>` }},
      {pattern:'/addContent/:pageTitle/:contentType/:tab', component:(range)=>{ return html` <add-content .currentTab="${range.params.tab}" .contentType="${range.params.contentType}" .pageTitle="${range.params.pageTitle}"> </add-content>` }}
    ]



    setTimeout(()=>{

      Routal.setup(config,(component)=>{
        this.routeComponent = component

    },this.shadowRoot.querySelector('#container'))

    },100)
  }

  static get styles(){
    return css`

      .floatButton{
        position:fixed;
        bottom:10px;
        right:10px;
        text-decoration: none;
        /* border: 2px solid #FFC107; */
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        font-family: roboto;
        color: #fff;
        border-radius: 50px;
        z-index: 55;
        font-weight: 900;
        background: rgb(249, 175, 78);
        box-shadow: rgb(0 0 0 / 38%) 0vw 0vw 14px;
      }

      #container{
        padding-bottom:100px;
      }
    `
  }

  render(){
    return html`
      <div id='container'>${this.routeComponent}</div>

      <a href="/addContent/undefined/roast/meme" class="floatButton" @click="${Link}"> + Meme</a>
    `
  }

}

customElements.define('main-container',mainContainer)