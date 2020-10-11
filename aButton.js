
import { css, LitElement, html } from './lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'

export class aButton extends LitElement {

    static get properties() {
      return {
        contentId:{type:String},
        buttonType:{type:String},
        buttonContent:{type:Object},
        buttonText:{type:String},
        clickCount:{type:String},
        clicked:{type:Boolean},
        contentType:{type:String},
        laughorlove:{type:String}
      }
    }

    static get styles(){
      return css`


        button[data-onlytext="true"]{
          width: 45%;
          padding: 14px 0;
          border: none;
          margin-right: 34px;
          border-radius: 35px;
          background: transparent;
          border: 3px solid tomato;
        }



        #container[data-type="pages"],#container[data-type="memes"]{
          width: 35px;
        }



        #container[data-type="pages"] button,#container[data-type="memes"] button{
          border: none;
          background: transparent;
          float: left;
          cursor:pointer;
          outline:none;
        }

        #container[data-type="pages"] span,#container[data-type="memes"] span{
          display: grid;
          place-items: center;
          height: 40px;
        }

        button svg{
          height:40px;
          width:40px;
          filter: grayscale(1);
        }

        button[data-clicked="true"] svg{
          filter:unset;
        }





        /*
          for text button
        */



        
       #container[data-type="buttons"]{
        width: auto;
        }


        #container[data-type="buttons"] button[data-clicked="true"]{
          background:tomato;
          color:#fff;
          outline:none;
        }

      `
    }

    constructor(){
      super()
      this.clicked = false
      this.clickCount = ''
      this.buttonContent = ''
    }

    async clickButton(){
      this.simulateClick()
      try{
        await U.query({ $run: ['like',{contentId:this.contentId, type:this.buttonType}] })
      }catch(error){
        U.login()
      }
      
    }

    simulateClick(){
      
      this.clicked = this.clicked? false:true
      this.clickCount = this.clicked? this.clickCount + 1:this.clickCount -1
   
    }

    refresh(){
      U.readUser().then(data=>{
        if(data) this.updateData()
      })
    }

    updateData(){
      
      U.query({ $count: {on:'actions', where:{ contentId: this.contentId } } }).then(data=>{
        this.clickCount  = data
      })


      U.query({ $find: {on:'actions', where:{ contentId: this.contentId, sender:'$user.id' } } }).then(data=>{
        if(data[0]) this.clicked = true



      }).catch(error=>{
        this.clicked = false
      })
      


    }
  
    firstUpdated(){
      this.refresh()
    }

  
    render(){

     // let love = html` <img ?data-mode=${this.clicked} src='/images/buttons/love.svg'>`
      let onlyText = false

      if(this.buttonType == 'buttons'){ 
        this.buttonContent = html` ${this.buttonText} `
        onlyText = true

      }else{
        this.buttonContent = html`<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'><defs><linearGradient id='a' x1='50%' x2='50%' y1='10.25%' y2='100%'><stop offset='0%' stop-color='#FEEA70'/><stop offset='100%' stop-color='#F69B30'/></linearGradient><linearGradient id='d' x1='50%' x2='50%' y1='0%' y2='100%'><stop offset='0%' stop-color='#472315'/><stop offset='100%' stop-color='#8B3A0E'/></linearGradient><linearGradient id='e' x1='50%' x2='50%' y1='0%' y2='81.902%'><stop offset='0%' stop-color='#FC607C'/><stop offset='100%' stop-color='#D91F3A'/></linearGradient><filter id='c' width='118.8%' height='118.8%' x='-9.4%' y='-9.4%' filterUnits='objectBoundingBox'><feGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/><feOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/><feComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/><feColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.921365489 0 0 0 0 0.460682745 0 0 0 0 0 0 0 0 0.35 0'/></filter><path id='b' d='M16 8A8 8 0 110 8a8 8 0 0116 0'/></defs><g fill='none'><use fill='url(#a)' xlink:href='#b'/><use fill='black' filter='url(#c)' xlink:href='#b'/><path fill='url(#d)' d='M3 8.008C3 10.023 4.006 14 8 14c3.993 0 5-3.977 5-5.992C13 7.849 11.39 7 8 7c-3.39 0-5 .849-5 1.008'/><path fill='url(#e)' d='M4.541 12.5c.804.995 1.907 1.5 3.469 1.5 1.563 0 2.655-.505 3.459-1.5-.551-.588-1.599-1.5-3.459-1.5s-2.917.912-3.469 1.5'/><path fill='#2A3755' d='M6.213 4.144c.263.188.502.455.41.788-.071.254-.194.369-.422.371-.78.011-1.708.255-2.506.612-.065.029-.197.088-.332.085-.124-.003-.251-.058-.327-.237-.067-.157-.073-.388.276-.598.545-.33 1.257-.48 1.909-.604a7.077 7.077 0 00-1.315-.768c-.427-.194-.38-.457-.323-.6.127-.317.609-.196 1.078.026a9 9 0 011.552.925zm3.577 0a8.953 8.953 0 011.55-.925c.47-.222.95-.343 1.078-.026.057.143.104.406-.323.6a7.029 7.029 0 00-1.313.768c.65.123 1.363.274 1.907.604.349.21.342.44.276.598-.077.18-.203.234-.327.237-.135.003-.267-.056-.332-.085-.797-.357-1.725-.6-2.504-.612-.228-.002-.351-.117-.422-.37-.091-.333.147-.6.41-.788z'/></g></svg>`
      }
      
      return html`
     
          <div id="container" data-type="${this.buttonType}">  
            <button  data-onlyText='${onlyText}' data-clicked="${this.clicked}" @click="${this.clickButton.bind(this)}">${this.buttonContent}</button> <span> ${this.clickCount}</span>  
          </div>
        
      `
    }
  
}

customElements.define('a-button',aButton)