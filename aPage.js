
import { css, LitElement, html } from './lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'

import { aButton } from '/aButton.js'

export class aPage extends LitElement {

    static get properties() {
      return {
        title: { type: String },
        bioInfo: {type:Array},
        memes: {type:Array},
        pageData: Object,
        buttons: {type:Array},
        contentType: { type: String }
      }
    }

    constructor(){
        super()
        this.contentType = 'roast'
        this.pageData = null

        this.bioInfo = []
        this.memes = []
        this.buttons = []
    }

    setMetaTags(){
      /*
        <meta property="og:url"                content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
        <meta property="og:type"               content="article" />
        <meta property="og:title"              content="When Great Minds Don’t Think Alike" />
        <meta property="og:description"        content="How much does culture influence creative thinking?" />
        <meta property="og:image"              content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />

      */


      U.setMetaTag({property:"og:url"},{content:`http://roasta.upon.one/page/${this.pageData.title}`})
      U.setMetaTag({property:"og:title"},{content:this.pageData.fullName})
      U.setMetaTag({property:"og:description"},{content:this.pageData.description})
      U.setMetaTag({property:"og:image"},{content:this.pageData.DPlink})
    }

    async refresh(){

      let readArray = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&redirects=1&prop=pageimages%7Cextracts&pithumbsize=300&titles=${this.title}&pilicense=any&exsentences=4&explaintext=1&exsectionformat=plain`).then(data=>data.json())
      let pageId = Object.keys(readArray.query.pages)[0]
      this.pageData = readArray.query.pages[pageId]
      if(this.pageData.thumbnail){
        this.pageData.DPlink = this.pageData.thumbnail.source 
      }else if(this.pageData.DPlink){
        this.pageData.DPlink = U.CDN(this.pageData.DPlink)
      } 
      if(!this.pageData.fullName) this.pageData.fullName = this.title

      this.setMetaTags.call(this)
    }
  
    firstUpdated(){

      U.query({ $find: {on:'bioInfo', where:{ pageTitle: this.title} } }).then(data=>  this.bioInfo = data)
      U.query({ $find: {on:'buttons', where:{ pageTitle: this.title } } }).then(data=>  this.buttons = data)
      U.query({ $find: {on:'memes', where:{ pageTitle: this.title } } }).then(data=>  this.memes = data)
    
      this.refresh()
    }

    async upload(event){

      let file = event.target.files[0]
      let compressedFile = await U.compressImage(file)
      let image = await U.upload(compressedFile,'profileImages',this.pageData.DPlink)
      await U.query({ $update: {on:'pages', where:{ title: this.title }, put:{DPlink:image.url} } })
      this.refresh()
      
    }

    static get styles(){
      return css`

      h1{
        font-family:roboto;
        font-weight:100;
      }
      #mainDescription{
        margin:0;
        font-family:roboto;
        display: grid;
        margin-top: 60px;
     
      }

      .description{
        width:100%;
        margin:12px;
        margin:0;
        padding:0;
        list-style-type:none;
        padding: 0;
        font-weight: 200;
        font-family: roboto;
        margin: 30px 0;
        margin-top:0;
      }

      .description li{
        font-size:20px;
        font-family:roboto;
        text-align: center;
      }
      .description > :nth-child(1){
        font-size: 40px;
        
      }

      .custom-file-input{
        outline:none;
      }
      .custom-file-input::-webkit-file-upload-button {
        visibility: hidden;
      }
      .custom-file-input::before {
        content: 'change profile';
        color: black;
        display: inline-block;
        background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
        border: 1px solid #999;
        border-radius: 3px;
        padding: 5px 8%;
        outline: none;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
        text-shadow: 1px 1px #fff;
        font-weight: 700;
        font-size: 10pt;
        width:82%;
        text-align:center;
      }
      .custom-file-input:hover::before {
        border-color: black;
      }
      .custom-file-input:active {
        outline: 0;
      }
      .custom-file-input:active::before {
        background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9); 
      }




      #profilePhoto{
        position:relative;
        justify-items: center;
        display: grid;
        width: 100%;
      }

      #profilePhoto .profileImage{

        text-align: center;
        font-size: 80px;
        border-radius: 0;
        
        
      }

      #profilePhoto img{
        border-radius: 10px;
        height: 100%;
        width: 100%;
        height: auto;
        width: 200px;

      }


      profile-content{
        justify-self:center;
        display:inline-block;
      }

      .fileUploadOverlay{
        opacity: 0;
      }
      
      .fileUploadOverlay:before{
        opacity:0.5;
        content:'upload';
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:1;
      }


      #bio{
        display: grid;
        justify-self: center;
        width: 100%;
        grid-template-columns: 50% 50%;
        grid-row-gap: 12px;
        padding: 10px;
     
        font-size:24px;
      }

      #bio .field{
        font-weight: 900;
      }

      #bio .value{
        font-weight: 100;
      }

      .mainButtons{
        display:grid;
        grid-template-columns:32% 68%;
        margin-top:60px;
      }


      #buttons{
        width: 100%;
        justify-self: center;
        margin: 0;
      }

      

      .mainButtons a svg{
        width: 40px;
        height: 40px;
        color: #000;
      }

      .mainButtons a-button{
        justify-self: center;
      }

      .mainButtons > :nth-child(1){
        justify-self: left;
      }

      .mainButtons > :nth-child(2){
        text-decoration: none;
        border: 3px solid;
        padding: 10px 6px;
        color: #fc7446;
        text-align: center;
        width: 90%;
        justify-self: right;
        border-radius: 30px;
      }

      #roastButton a-button{
        display: grid;
        margin: 24px 0;
        margin-bottom: 18px;
      }

      #memes{
        display: grid;
        grid-template-columns: 50% 50%;
      }


      #infoSection{
        width: 90%;
        padding: 5%;
      }

      @media (min-width:850px){

        #mainDescription{
          display:block;
        }

        #infoSection{
          padding-top: 0;
          float:right;
          width:20%;
        }

        #memes{
          width:70%;
          float:left;
          display:block;
        }

        #memes render-meme{
          float:left;
          margin-right:5px;
          margin-bottom:5px;
        }
      }

      `
    }
  
    render(){

      return html`
         
          

      
            ${this.pageData? html`

            
            <div id='mainDescription'>

              <div id="infoSection">
                <div id="profilePhoto">
                  <div class="profileImage">
                    ${this.pageData.DPlink?html`<img src="${this.pageData.DPlink}">`:html`🐔`}
                  </div>

                  <input class="fileUploadOverlay" type="file" @change="${this.upload.bind(this)}"> 
                </div>

              
                <ul class="description">
                  <li> ${U.capital(this.pageData.fullName)} </li>
                </ul>


                <div id="bio">
                  ${this.bioInfo.map(item=>{
                    return html` <span class="field">${item.field}</span><span class="value">${item.value}</span>  `
                  })}
                </div>


                <div id="buttons">
                  <div id="roastButton">

                    ${this.buttons.map(item=>{
                      return html` <a-button .buttonText="${item.buttonText}" .buttonType="${'buttons'}" contentId="${item._id}"></a-button>  `
                    })}
                  </div>



                  <div class="mainButtons">

                    <a-button .buttonType="${'pages'}" .contentId="${this.title}"></a-button>

                    <a @click="${Link}" href="/addContent/${this.title}/${this.contentType}/meme" > + Meme </a>
                  </div>
                </div>
            </div>

            <div id="memes"> 
              ${this.memes.map(item=>{
                return html` <render-meme .viewType="${'collection'}" .memeData='${item}' >   </render-meme> `
              })}
            </div>



            </div>
            
            

            `:html`<center><h1>loading..</h1></center>`}
           

        
            
       
        
      `
    }
  
}

customElements.define('a-page',aPage)