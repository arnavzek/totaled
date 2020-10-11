import { css, LitElement, html } from './lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'


export class listOfMemes extends LitElement {

    static get properties() {
      return {
        tab: { type: String },
        memes:{type:Object},
        loading:Boolean
      }
    }

    constructor(){
        super()
        this.tab = 'forYou'
        this.memes = []
        this.refresh = this.refresh.bind(this)
        
        U.readUser().then(data=>{
            if(!data) this.tab = 'trending'
            this.refresh()
        })

       
    }

 

    async refresh(){
        this.loading = true

        if(!window.userLocation) window.userLocation = await fetch('http://ip-api.com/json').then(data=>data.json())

   
        

        this.memes[0] = await U.collection('memes').find( {'userLocation.city':userLocation.city}, {sort:{'createdAt':'descending'}} )
        this.memes[1] = await U.collection('memes').find( {'userLocation.regionName':userLocation.regionName}, {sort:{'createdAt':'descending'}} )
        this.memes[2] = await U.collection('memes').find( {'userLocation.country':userLocation.country}, {sort:{'createdAt':'descending'}} )
        this.memes[3] = await U.collection('memes').find(null , {sort:{'createdAt':'descending'}} )

        console.log(this.memes)
        this.loading = false
    }


    static get styles(){
        return css`
            #memes{
                margin-top:12px;
                display: grid;
                place-items: center;
            }

            #container{
                font-family:roboto;
                display:grid;
                gird-template-colums:50% 50%;
                place-items:center;
                margin-top:22px;
            }

            
            h3{
                text-align:center;
                font-size:24px;
                font-weight:100;
                font-family:roboto;
            }

            #tabs button{
                background: no-repeat;
                border: none;
                font-size: 20px;
                padding:0;
                outline:none;
                margin-right:15px;

                color: #222;
                font-weight:200;

                font-family: roboto;
            }


            #tabs{
                margin-bottom:30px;
            }

            #tabs button[data-active="true"]{
                font-weight:900;
                color: rgb(255 63 63);;
            }

            a-meme{
                margin-bottom:24px;
                display: inline-block;
            }

            @media (min-width:850px){
                #memes{
      
                    grid-column-gap: 10px;
                    width: 90vw;
                    grid-template-columns: 1fr 1fr 1fr;
                }
            }

        `
    }

 
    render(){

        if(this.loading) return html`<h3>Loading...</h3>`

        let dontRepeatThese = []

        let  returnMemes = ()=>{
            let all = []

            for(let index of this.memes){

                index.map(item=>{
                    

                    let id
                    let memeData 
    
                    if(typeof item == 'string'){
                         id = item
                    }else{
                         id = item._id
                         memeData = item
                    }

                    if(dontRepeatThese.includes(id)) return

                    dontRepeatThese.push(id)
    
                    all.push( html` <a-meme .contentId=${id} .memeData=${memeData}> </a-meme>`)
                })
                
            }

            return all

        }

        return html`
        <div id="container">
            <div id='memes'>
            ${returnMemes()}
            </div>
        </div>
        `
    }
  
}

customElements.define('list-of-memes',listOfMemes)