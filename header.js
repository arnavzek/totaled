import { css, LitElement, html } from './lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'



export class header extends LitElement {

    static get properties() {

      return {
        introMessageToRender: { type: Object },
        othersField: { type: String },//sets the button in the top right corner
        loggedOutAttribute:{type:String},//used to set height of header
        searchQuery:{type:String}
      }

    }
  
  
    constructor() {

      super()
      console.log('working on header')
      this.searchQuery = ''
      this.loggedOutAttribute = ''


    }
  
  
    firstUpdated(){
  
      //intro will only be shown when user is not logged in and is on the home page

        let morePannel = [
         {h1:'Options'},
         {button:{onclick:()=>{ window.open('https://twitter.com/ableach_wip', 'meaningfulName') },innerHTML:'About Developer'}},
        ]
          this.othersField = html`<button @click='${()=>{U.ask(morePannel)}}' >
                
          <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15">
            <path d="M15 3.5H0m15 8H6m9-4H9" stroke="currentColor"></path>
          </svg>
        
        </button>`

          let gotUserName = (userName)=>{
            
            if(userName){
              morePannel.push({button:{onclick:U.logout, innerHTML:'logout'}})
            }else{
              morePannel.push({button:{onclick:U.login, innerHTML:'Login'}})
            }
          }
  
          U.readUser('username').then(gotUserName)
    }
  
    static get styles(){
  
      return css`
  
      


        #header{
          background: #f9af4e;
            height:auto;
            min-height: 120px;
            width:100vw;
            position:relative;
            font-family:Rochester, sans-serif;
            transition:all 1s ease;
            padding-top: 10px;
            padding-bottom: 10px;
        }
  
    

        #logo a{
          display:none;
        }

        #container{
          display: grid;
          place-items: center;
        }

        #logo{
          cursor:pointer;
        }
  
        #head{
          grid-template-columns: 19% 62% 19%;
          display: grid;
          padding:24px;
          padding-top:12px;
        }
  
  
        #head #logo img{
          width: 45px;
          margin-top: 3px;
        }
  
        #head #logo span{
          font-size:15px;
          color:#fff;
          padding-bottom:6px;
          font-weight:900;
          line-height:21px;
          padding-top:3px;
        }
  
        #intro{
          display: inline-block;
          width: 100%;
          margin-bottom: 0;
          width: 85vw;
          border: 2px solid #fff;
          background: #ffffff2e;
          padding: 18px 40px;
          border-radius: 38px;
          color: #F44336;
          box-sizing: border-box;
          margin-top: 40px;
        }
  
        #head #search{
          width:83%;
          border:none;
          border-radius:300px;
          text-align: center;
          outline:none;
          background:#ffffff78;
        
          margin-top: 0;
          width: 38vw;
          height: 39px;
          justify-self:center;
          padding: 0;
          height: 45px;
        }
  

  
        #flame{
          position:absolute;
          left: 0;
          width: 100vw;
          bottom: -2px;
          overflow:hidden;
          width:500vw;
        }

        #flame .image{
          object-fit: cover;
          height: auto;
          float: left;
          width: 100vw;
        }
  
        #intro h1{
     
          color:#fff;
          font-size: 40px;
          margin-bottom: 12px;
          font-size: 55px;
          text-align: center;
          margin-top: 0;
          width: 100%;
          box-sizing: border-box;
        }
  
        #intro button{
          padding:9vw 0vw;
          border:2px solid;
          width:38vw;
          font-size:6px;
          display: inline-block;
          text-decoration:none;
          border-radius:300px;
          font-family:sans-serif;
          color:#fff;
          font-size: 18px;
          width: 85vw;
          color: #fc7f48;
          background: #fff;
          border: none;
          border-radius: 40px;
          padding: 18px 0;
          margin-top: 10px;
          width: 38vw;
          padding: 15px;
          width: 100%;
          box-sizing: border-box;
          box-shadow: 1vw 1vw 20px #F44336;
      
        }
  
        button{
          cursor:pointer;
        }

        #others{

          justify-self:right;

        }
  
        #others button{
          background:transparent;
          border:none;
          justify-self: right;
          padding: 0;
          margin: 0;
          height: 40px;
        }

        #others button svg{


          color: #fff;

          height: 40px;
          width: 40px;
          outline:none;
          border: none;
        }
  
        a:hover,button:hover{
          filter:inver(1);
          transition:all 0.5s ease;
        }

        @media (min-width: 850px) {
          #flame .image{
            height: auto;
            float: left;

            width: 33vw;
            object-fit:contain;
            margin: 0;
            margin-left: -0.2vw;
          }

          #intro{
            width:38vw;
          }

          #header{
            min-height: 150px;
          }

        }
  
      `
    }

    search(event){
      this.searchQuery = event.target.value
      if(event.keyCode !== 13) return
      Link('/search/'+event.target.value)
    }
  
    render(){
  
      return html`
  
      <div id='header' class='${this.loggedOutAttribute}'>
        <div id='head'>

          <div @click="${()=>(Link('/'))}" id='logo' >
              <img src='/images/header/logo.svg'>
              <a  href="/">Totaled</a>
          </div>

         
          <input @keyup="${this.search.bind(this)}" id='search' value='${this.searchQuery}' placeholder='Search Totaled'>

          <div id='others'>${this.othersField}</div>
           

        </div>
  
        <div id='container'>
          
          ${this.introMessageToRender} 
          
        </div>
  
        <div id='flame'> 
          <img class="image" src="/images/header/flame.svg">
          <img class="image" src="/images/header/flame.svg">
          <img class="image" src="/images/header/flame.svg">
          <img class="image" src="/images/header/flame.svg">
        </div>

      </div>
  
      `
    }
  }
   
  customElements.define('the-header', header);