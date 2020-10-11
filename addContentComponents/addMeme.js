
import { css, LitElement, html } from '../lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'

import { renderMeme} from '/renderMeme.js'

//first work on memes then bio and 
export class addMeme extends LitElement {

    static get properties() {
      return {
        contentType: String,
        selectedOverlayIndex:Number,
        pageTitle:String,
        mouseDown:Boolean,
        offsetX:Number,
        offsetY:Number,
        overlays:Object,
        imageLink:String,
        showTemplate:Boolean,
        templateMemeLinks:Array,
        previousCursorPosition:Object,
        publishButton:Object,
        textAreaDisplay:String
      }
    }


    constructor(){
      super()
      this.overlays = []
      
      this.previousCursorPosition = {x:null,y:null}
      this.setPreviousCursorPosition = this.setPreviousCursorPosition.bind(this)
      this.textAreaDisplay = 'none'
    }

    updatePageTitle(e){

      if(window.timeout) clearTimeout(window.timeout)
      let value = e.target.value
      window.timeout = setTimeout(()=>{
        this.updatePageTitle2.call(this,value)//so that page title doesn't get decided by the previous value of input field
      },1000)
    }


    async updatePageTitle2(value){
      this.pageTitle = value
      if(!this.pageTitle) return
      
      let pages = await wikiSearch(this.pageTitle)
      
      pages = pages.query.search

      console.log(this.pageTitle, pages[0].title)
      if(!pages.length) return this.publishButton = html``

      this.pageTitle = pages[0].title
      this.publishButton = html`

      <button id="publishButton" @click="${this.publish.bind(this)}"> Publish to ${this.pageTitle} </button>
      ` 
    }

    firstUpdated(){
      this.mouseDown = false
      this.selectedOverlayIndex = null
      
      if(this.pageTitle == 'undefined') this.pageTitle = ""
  
    
      U.query({$find:{ on:'memes', where:{id:this.memeId} }}).then(data=>{
        this.memeData = data[0]
      })
      
     
      this.updatePageTitle({target:{value:this.pageTitle}})
    }

    setPreviousCursorPosition(event){
      this.previousCursorPosition.x = event.clientX
      this.previousCursorPosition.y = event.clientY
    }

    unify(event){
  
      if(event.changedTouches){
        let touches = event.changedTouches;
        event = touches[0]
      }
      return event
    }

    mouseClicked(event){

      event.preventDefault()
      event.stopPropagation()

      event = this.unify(event)

      this.setPreviousCursorPosition(event)
      let parentRect = event.target.parentElement.getBoundingClientRect();
      let childRect = event.target.getBoundingClientRect();

      this.offsetX = (event.clientX - parentRect.left) - (childRect.left - parentRect.left)
      this.offsetY = (event.clientY - parentRect.top) - (childRect.top - parentRect.top)
       
      this.mouseDown = true
      this.selectedOverlayIndex = event.target.dataset.index
    }

    mouseRemoved(event){
      event.preventDefault()
      event.stopPropagation()
      event = this.unify(event)
      this.mouseDown = false
    }

    mouseMoving(event){

      event.preventDefault()
      event.stopPropagation()

      event = this.unify(event)
      if(!this.mouseDown) return 
      if(this.selectedOverlayIndex == null) return
      let parent = event.target.parentElement

      function percentageToPixel(x,y){
        return {
          x:parent.offsetWidth*(x/100),
          y:parent.offsetHeight*(y/100)
        }
      }

      function pixelToPercentage(x,y){
        return {
          y:( y /parent.offsetHeight) * 100,
          x:( x /parent.offsetWidth) * 100
        }
      }
      


      
      let dx = event.clientX - this.previousCursorPosition.x
      let dy = event.clientY - this.previousCursorPosition.y

      console.log(dy,dx)

      let pixelPosition = percentageToPixel(this.overlays[this.selectedOverlayIndex].left, this.overlays[this.selectedOverlayIndex].top)
      let top = pixelPosition.y + dy
      let left = pixelPosition.x + dx

      
      //let element = shadowRoot.querySelector('*[data-index="'+this.selectedOverlayIndex+'"]')
      //let rect = parent.getBoundingClientRect();

      let percentagePosition = pixelToPercentage(left,top)

      this.overlays[this.selectedOverlayIndex].top = percentagePosition.y

      this.overlays[this.selectedOverlayIndex].left = percentagePosition.x

      

      //console.log(event.clientY, 'clientY' )
      //console.log(rect.top ,'offsetTop')
      //console.log(parent.offsetHeight,'offsetHeight' )
      //console.log(this.overlays[this.selectedOverlayIndex].top,'top' )
      //console.log('------------------------------' )
      //console.log('------------------------------' )
  
      // if(this.overlays[this.selectedOverlayIndex].top > 100 || this.overlays[this.selectedOverlayIndex].left > 100){
        //return
      //} 

      //element.style.top = this.overlays[this.selectedOverlayIndex].top+'%'
      //element.style.left = this.overlays[this.selectedOverlayIndex].left+'%'
      //we need shadow root



      this.setPreviousCursorPosition(event)
      this.overlays = [...this.overlays]
    }
   
    updateOverlay(e){

      let overlay = this.overlays[this.selectedOverlayIndex]
      switch(e.target.innerText.toLowerCase().trim()){
        case'scale':
          if(overlay.scale > 3){ 
            overlay.scale = 1
            return
          } 
          overlay.scale += 0.25
          break
        case'-rotate':
          overlay.rotate -= 20 //because 360 is divisible by 20
          break
        case'+rotate':
          overlay.rotate += 20 //because 360 is divisible by 20
          break
        case 'delete':
          this.overlays.splice(this.selectedOverlayIndex,1)
          this.selectedOverlayIndex = null
          break
        case 'invert color':
          overlay.invertColor = overlay.invertColor? false: true
          break
      }

      this.overlays = [...this.overlays]
      console.log(this.overlays)
    }

    processEditor(){
      if(this.selectedOverlayIndex == null) return html``

      return html`
        <button @click='${this.updateOverlay.bind(this)}'> Scale </button>
        <button @click='${this.updateOverlay.bind(this)}'> -Rotate</button>
        <button @click='${this.updateOverlay.bind(this)}'> +Rotate</button>
        <button @click='${this.updateOverlay.bind(this)}'> delete </button>
        <button @click='${this.updateOverlay.bind(this)}'> Invert Color </button>
      `
    }

    closeTextarea(){
      this.putOptions({type:'text', top:25, left:25, scale:1, text:this.shadowRoot.querySelector('textarea').value })
      this.textareaValue = ""
      this.textAreaDisplay = 'none'
    }

    putText(e){
      if(e.keyCode == 13){
        
        this.closeTextarea()

        return
      }
      this.textareaValue = e.target.value
      
    }

    putOptions(options){
      this.overlays.push(options)
      this.overlays = [...this.overlays]
      this.selectedOverlayIndex = this.overlaylength
    }

    addOverlay(e){
      let dataset = e.target.dataset
      let options = {type:dataset.type, top:25, left:25, scale:1}

      if(dataset.type == 'profilePhoto'){
        options.width = 4
        options.height = 4
        options.top = 48
        options.left = 48
      }else{
        this.textareaValue = ''
        return this.textAreaDisplay = 'block'
      }

      this.putOptions.call(this,options)

    }
    
    static get styles(){
      return css`

      `
    }

    async publish(){

      if(!window.userLocation) window.userLocation = await fetch('http://ip-api.com/json').then(data=>data.json())

      if(!this.imageLink) return U.say('image is required')
      let publishing = U.say('publishing...')
      let newpublish
      try{
        newpublish = await U.query({$write:{ on:'memes', put:{  pageTitle: this.pageTitle , overlays:this.overlays, imageLink:this.imageLink, userLocation:userLocation} } })
      }catch(error){
        publishing.kill()
        return U.login()
      }

      publishing.kill()
      if(newpublish.error) return U.say(newpublish.error)

      Link(`/meme/${newpublish._id}`)
    }

    async upload(event){
      let file = event.target.files[0]
      let compressedFile = await U.compressImage(file)
      let image = await U.upload(compressedFile,'memeImages')
      
      this.imageLink = U.CDN(image.url)
    }

    templateMemeSelected(e){
        this.showTemplate = false
        this.imageLink = e.target.dataset.src
    }

    chooseTemplate(query){

      return new Promise(resolve=>{
        let type = 'search'

        if(!query){
          query = ''
          type = 'trending'
        } 

        this.templateMemeLinks = null
        this.showTemplate = true
        
        fetch('https://api.giphy.com/v1/gifs/'+type+'?&q='+query+'&limit=100&api_key=3mIxmBZUIIPyb8R69gtxaW8Hsh74dFKV').then(data=>data.json()).then(gifData=>{
          let data = gifData.data
          this.templateMemeLinks = data
          console.log(this.templateMemeLinks,gifData)
          resolve()
        })

        
      })
    }

    static get styles(){
      return css`

        #container{
          display:grid;
          place-items:center;
          font-family:roboto;
        }

        #publishButton{
          margin: 50px;
          font-size: 24px;
          border-radius: 14px;
          padding: 6px 22px;
          border: none;
          background: tomato;
          color: #fff;
        }

        button{
          font-size:18px;
          border:2px solid #000;
          background:transparent;
          padding:6px 12px;
          border-radius:14px;
          margin:10px;
        }

        .addPanel,.editor{
          margin-top:14px;
        }

        .selectPageTitle{
          margin-top: 30px;
    margin-left: 5px;
    border: none;
    padding: 10px;
    background: #99999959;
    border-radius: 20px;
        }

        #main{
          position:relative;
        }

        textarea{
          display: block;
          position: absolute;
          width: 100%;
          left: 0;
          padding:0 50px;
          font-family: roboto;
          top: 0;
          text-align: center;
          resize: none;
          box-sizing: border-box;
          padding: 5px;
          font-size: 24px;
          height: 100%;
          color:#fff;
          border-radius: 8px;
          border: none;
          background: #000000b8;
          padding-top: 100px;
        }

        #main button{
          display: block;
          position: absolute;
          bottom: 10px;
          right: 10px;
        }

      `
    }
  
    render(){

      return html`
      <div id="container">
        <h3>Roast by creating meme</h3> 

        <div id="main">
          <render-meme .editmode="${true}" .templateMemeLinks='${this.templateMemeLinks}'  .showTemplate=${this.showTemplate} .chooseTemplate='${this.chooseTemplate.bind(this)}' .templateMemeSelected='${this.templateMemeSelected.bind(this)}' .upload=${this.upload.bind(this)} .memeData='${{imageLink: this.imageLink, pageTitle:this.pageTitle, overlays: this.overlays}}' .mouseClicked="${this.mouseClicked.bind(this)}" .mouseRemoved="${this.mouseRemoved.bind(this)}" .mouseMoving="${this.mouseMoving.bind(this)}">        </render-meme>
          
         
          <textarea placeholder="Type Here" style="display:${this.textAreaDisplay}" @keyup="${this.putText.bind(this)}" value="${this.textareaValue}"></textarea>
          
          </div>
        <center class="editor">
        ${this.processEditor.call(this)}
        </center>

        <div class="addPanel">

        <button style="display:${this.textAreaDisplay}" @click="${this.closeTextarea.bind(this)}">Done</button>

          ${(this.imageLink && this.textAreaDisplay == 'none')?html`
            <button @click="${this.addOverlay.bind(this)}" data-type="text"> + Text</button>
            <button @click="${this.addOverlay.bind(this)}" data-type="profilePhoto"> + Profile Photo</button>
          `:html``}



          
        </div>

        <center>
          Page: <input class="selectPageTitle" @keyup="${this.updatePageTitle.bind(this)}" value="${this.pageTitle}" placeholder="Where to publish?">
          <br>
            ${this.publishButton}
        </center>
      </div>
      `
    }
  
}

customElements.define('add-meme',addMeme)