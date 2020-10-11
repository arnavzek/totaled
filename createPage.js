
import { css, LitElement, html } from './lit-element/lit-element.js';
import { Link, Routal } from '/routal.js'
import {pageCard} from '/pageCard.js'

export class createPage extends LitElement {

    static get properties(){
        return {
            fullName:String,
            similarPages:Object
        }
    }

    constructor() {
        super()


        this.fullName = ''
        this.similarPages = ''
    }

    setValue(event){

        let prop = event.target.getAttribute('id')
        this[prop] = event.target.value
        
        let searchQuery = this.fullName+' '+this.description+' '+this.instagramHandle
        U.query( { $search: {on:'pages', where:searchQuery, fields:['description','fullName','instagramHandle'] } } ).then(data=>{
            this.similarPages = data
        })


    }

    async requestNewPage(){
        return
        let putQuery = {fullName:this.fullName, description:this.description, instagramHandle:this.instagramHandle }
        let newPage = await U.query({$write:{ on:'pages', put:putQuery }})
        if(newPage.error){
            return U.say(newPage.error)
        }
        Link('/page/'+newPage.title)
    }

    static get styles(){
        return css`

            center{
                font-family:roboto;
            }

            h3{
                font-weight:100;
            }

            input,button{
                display: inherit;
                width: 62%;
                border: 1px solid #000;
                padding: 14px 21px;
                font-size: 20px;
                border-radius: 300px;
                margin: 12px 0;
                outline:none;
                box-sizing: border-box;
            }

            button{
                border: none;
                background: #fe5542;
                color: #fff;
                padding: 12px 24px;
                display: inline-block;
                cursor:pointer;
            }

            .type button{
                width:100%;
                background: #99999921;
                color:#222;
            }

            .type{
                display:grid;
                width:62%;
                grid-template-columns:50% 50%;
            }

            .type button[data-active=true]{
                background:tomato;
                color:#fff;
            }

            .type > :first-child{
                border-radius:50px 0 0 50px;
            }

            .type > :nth-child(2){
                border-radius:0 50px 50px 0;
            }

            @media (min-width:850px){
                input,button,.type{
                    width:38vw;
                }

            }
        `
    }


    render(){
    

    
      return html`
      <center>
            <h3> Create Roasting Page </h3>
            
            <input @keyup="${this.setValue.bind(this)}" id="fullName" placeholder="Name">

     
         


            <button @click="${this.requestNewPage.bind(this)}"> create </button>
            
            <div>
                ${this.similarPages.length > 0?html`
                    <h1>Similar pages</h1>

                        ${this.similarPages.map(similarPage=>html`

                            <page-card .page='${similarPage}'> </page-card>
                    
                        `)}

                `:html``}
            </div>
        </center>
      `
    }
  
  }

  //instagram id is an essential field as users can easily find new photos that
  //could be used as roasts 

  customElements.define('create-page',createPage)