import { css, LitElement, html } from './lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'


export class renderMeme extends LitElement{

    static get properties(){
        return {
            mouseMoving:Function,
            mouseRemoved:Function,
            mouseClicked:Function,
            memeData:Object,
            upload:Function,
            DPlink:String,
            showTemplate:Boolean,
            templateMemeSelected:Function,
            templateMemeLinks:Array,
            memeSearchQuery:String,
            viewType:String,
            memesLimit:Number,
            editmode:Boolean,
            firstUpdateFinished:Boolean
            
        }
    }

    constructor() {
        super()
        this.showTemplate = false
        this.firstUpdateFinished = false
        this.centerElement = this.centerElement.bind(this)
        this.parentsVW = this.parentsVW.bind(this)
        this.memeSearchQuery = ''
        this.memesLimit = 10
    }


    async firstUpdated(){
      if(!this.viewType) this.viewType = 'meme'

      let pages = await fetch('https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch='+this.memeData.pageTitle+'&gpslimit=20').then(data=>data.json())
      if(!pages.query) return
      pages = pages.query.pages
      if(!pages[0].thumbnail) return
      this.DPlink = pages[0].thumbnail.source
      if(this.DPlink.length == 0) return console.log(this.DPlink, this.memeData.pageTitle, 'page deleted')
      this.DPlink = this.DPlink[0].DPlink

      
    }



    static get styles(){
        return css`

            .memeContainer[type="collection"] > *{
              pointer-events: none;
            }



            .memeContainer{
                position: relative;
                font-family:roboto;
                overflow:hidden;
                display:grid;
                place-items:center;
                border-radius: 12px;
                box-shadow: 0 6px 50px #88888859;
                width:94vw;
                color: #222;
                height:94vw;
                text-decoration:none;
                background: linear-gradient(45deg, rgb(199 199 199), rgb(222 222 222));
            }



            

            .memeContainer[type="collection"]{
              width:50vw;
              height:50vw;
              border-radius: 0;
              box-shadow: unset;
            }

            .overlays div{
              outline:none !important;
              background:#fff;
              border-radius:10px;
              z-index:2;
              padding:10px 20px;
              font-weight:900;
            }

            .memeContainer[type="collection"] .overlays img{
              height:50px !important;
              width:50px !important;
            }

            .memeContainer .mainImage{
                object-fit: cover;
                height:inherit;
                width:inherit;
            }



            .overlays{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }


            .overlays img, .overlays div{
              position:absolute;
              text-align:center;
              transition: transform 0.5s ease, font-size 0.5s ease;
              
              background:#fff;
              color:#222;
            }


            .overlays img{
              width: 50px;
              border-radius: 500px;
              height: 50px;
              object-fit: cover;
            }

            input{
              outline:none;
              width: 100%;
              padding: 15px;
              text-align: center;
              border: none;
              box-sizing: border-box;
            }
    
            .memeContainer[data-editmode="true"] .overlays *{
              cursor:move;
            }



            .overlays input{
              border:none;
              transition: all 0.25s ease;
            }


            .custom-file-input {
                width:61%;
                color: transparent;
                outline:none;
              }

              .custom-file-input::-webkit-file-upload-button {
                visibility: hidden;
              }
              .custom-file-input::before {
                content: 'Upload file';
                color: black;
                display: inline-block;

            
                border-radius: 3px;
                padding: 5px;
                outline: none;
                white-space: nowrap;
                -webkit-user-select: none;
                cursor: pointer;
          


                width:82%;
                text-align:center;

                font-size: 18px;
                border-width: 2px;
                border-style: solid;
                border-color: rgb(0, 0, 0);
                background: transparent;
                padding: 6px 12px;
                border-radius: 14px;

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


              .addImage button{
                width:62%;
              }


              button{
                font-size: 18px;
                border-width: 2px;
                border-style: solid;
                border-color: rgb(0, 0, 0);
                background: transparent;
                padding: 6px 12px;
                border-radius: 14px;
              }






              .memeTemplate{
                  position:absolute;
                  z-index:5;
                  top:0;
                  left:0;
                  height:100%;
                  width:100%;
                  background:#222;
                  overflow-y:scroll;
                  color: #fff;
                  display: grid;
                  place-items: center;
                  font-family: roboto;
              }

      

              .memeTemplate img{

                  width:100%;
                  height:auto;
                  float:left;
                  object-fit:cover;
              }

              @media (min-width: 850px) {
                .memeContainer {
                  width:400px;
                  height:400px;
                }
  
                
                .memeContainer[type="collection"]{
                  width:300px;
                  height:300px;
                }
  
                .memeContainer[type="collection"] .overlays div{
                  font-size:24px;
                }
  
                .memeContainer .overlays div{
                  font-size:24px;
                }
  
              }
   
        `
    }





    centerElement(overlay,element,newText){
      if(newText.length < 6) return
      if(newText.length > 18) return
      overlay.width = newText.length * 13

      overlay.left = ((element.parentElement.offsetWidth - overlay.width) / 2)

      overlay.left = (overlay.left/element.parentElement.offsetWidth) * 100

    }

    parentsVW(percentage){
      
      let element = this.shadowRoot.querySelector('.memeContainer')
      console.log(element,this.memeData)
      let width = element? element.offsetWidth : 500

      return (width*(percentage/100))
    }

    renderMeme(){
        let overlays = this.memeData.overlays
        let overlayRenderArray = []

        let baseFontSize = this.parentsVW(5)

        //if(this.viewType == 'collection') baseFontSize = this.parentsVW(1.5)
  
        for(let index in overlays){
  
          let currentOverlay = overlays[index]

 

          if(typeof currentOverlay.rotate == 'undefined'){
            currentOverlay.rotate = 0
            this.centerElement(currentOverlay,{parentElement:this.shadowRoot.querySelector('.overlays') },'type here')
          }


          if(typeof currentOverlay.width == 'undefined' &&  currentOverlay.type == 'text') currentOverlay.width = 25
          if(!currentOverlay.text) currentOverlay.text = ''
          
          

          switch(currentOverlay.type){
            case 'text':
              overlayRenderArray.push(html`
              
              
              
      
              
                    <div  
                    tabIndex="-1"
                    @mousedown='${this.mouseClicked}' @touchstart="${this.mouseClicked}"
                    data-index="${index}" 
                    style="${currentOverlay.invertColor?'filter:invert(1);':''} width:auto; top:${currentOverlay.top}%; left:${currentOverlay.left}%; font-size:${currentOverlay.scale*baseFontSize}px; transform: rotate(${currentOverlay.rotate}deg);" 
                    placeholder="type here" 
                    >${currentOverlay.text}</div>
              
              
            
                    
                
                    
                    `)
              break
            case 'profilePhoto':
              overlayRenderArray.push(html` <img ondragstart="return false;"  @touchstart='${this.mouseClicked}'   @mousedown='${this.mouseClicked}' data-index="${index}" src="${U.CDN(this.DPlink)}"  style="top:${currentOverlay.top}%; left:${currentOverlay.left}%; transform:scale(${currentOverlay.scale}) rotate(${currentOverlay.rotate}deg);"> `)
              break
          }
        }


       
        return overlayRenderArray
    }

    async renderCanvas(){

      let node = this.shadowRoot.querySelector('.memeContainer')
      domtoimage.toPng(node)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        //document.body.appendChild(img);
        U.setMetaTag({property:"og:image"},{content:dataUrl})
        //adds meta tag for facebook and twitter that includes the roast content
    })
    .catch(function (error) {
        console.warn('oops, something went wrong!', error.message);
    });

    
    }



    render(){

      let memesRendered = 0

      if(!this.firstUpdateFinished){

        setTimeout(()=>{
          this.firstUpdateFinished = true
        },10)
        
        return html` <a class="memeContainer"   type="${this.viewType}"> </a>`
      }
    

        
        return html`
        <a class="memeContainer" data-editmode="${this.editmode}"   type="${this.viewType}">

        ${this.memeData.imageLink? html`
        
        ${this.viewType == 'collection'? html`

            <img @click="${Link}" href="/meme/${this.memeData._id}" class='mainImage' @load="${this.renderCanvas.bind(this)}" src='${this.memeData.imageLink}'>

        `:html`
          
          <img class='mainImage' @load="${this.renderCanvas.bind(this)}" src='${this.memeData.imageLink}'>

        
        `}
        
        <div @touchend='${this.mouseRemoved}' @touchmove='${(e)=>{this.mouseMoving && this.mouseMoving(e,this.shadowRoot)}}'   @mouseup='${this.mouseRemoved}'   @mousemove='${(e)=>{this.mouseMoving && this.mouseMoving(e,this.shadowRoot)}}'  class="overlays">
        
          ${this.renderMeme.call(this)}
        
        </div>
        
        `:html` 
        
        <center class='addImage'>
            <input type="file" class="custom-file-input" @change="${this.upload}">
            <h3>OR</h3>
            <button @click="${()=>{
              
              
              this.chooseTemplate().then(()=>{
                whenToLoad(this.shadowRoot.querySelector('.memeTemplate'),()=>{
                  console.log('increase limit')
                  this.memesLimit += 10
                })
              })
            
            
            }}"> Trending GIFS</button>
        </center>
        `}




        ${this.showTemplate?html`

            
            
            <div class='memeTemplate'>

              ${this.templateMemeLinks? html`
                  <input @keyup="${(e)=>{

                    if(e.keyCode !== 13) return
                    this.memesLimit = 10
                    this.memeSearchQuery = e.target.value
                    this.chooseTemplate(e.target.value)
                  
                  }}" placeholder="Search trending Gifs" value="${this.memeSearchQuery}">

                  ${this.templateMemeLinks.map(file=>{
                    memesRendered+= 1
                    if(memesRendered > this.memesLimit) return null

                    return html`
                  <img data-src='${file.images.fixed_width.webp}' @click='${this.templateMemeSelected}' src='${file.images.fixed_width.webp}'>
                  `})}

                `:html`loading...`}    
            </div>
            
        
        
        `:html``}
        
        </a>
      `
    }
}


customElements.define('render-meme',renderMeme)

