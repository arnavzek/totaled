import { html } from './lit-element/lit-element.js';


function cleanFirstSlash(path){
    if(path[0] === '/') path = path.substr(1,path.length-1)
    return path
}


let Routal = new class {

    constructor(){
        this.routers = []
        this.link = this.link.bind(this)
        this.processRoutes = this.processRoutes.bind(this)
    }

    //cotainer could be a query pattern like #id of an element itself like this.querySelector('#id')
    setup(routeConfig,callback,container = document.body){



        let options = {routeConfig:routeConfig, callback:callback,container,container, data:{} }
        this.routers.push(options)
       
        if(!container) console.log('Routal warning: container not found')
        
        window.addEventListener('popstate',this.processAllRouters.bind(this))
        window.addEventListener('load',this.processAllRouters.bind(this))
        this.link = this.link.bind(this)

        this.processAllRouters()
    }

    processAllRouters(handoverRefresh){

        for(let index of this.routers){
            this.processRoutes(index)
            
        }
    }

    processRoutes(router){

        let callback = router.callback
        let container = router.container
        let routeConfig =  router.routeConfig

        
        let path = cleanFirstSlash(location.pathname)

        if(typeof container === 'string') container = document.querySelector(container)
        if(!container) console.log('Routal warning: container not found')


        for(let i = 0; i<= routeConfig.length-1; i++){

            let route = routeConfig[i]

            returnCallback = returnCallback.bind(this)

            function returnCallback(component){
                this.duration = route.duration
                this.transitionAxis = route.axis
                this.transitionType = route.transition

                let refreshComponent = (afterFlippedAngle)=>{
                    //new element must be inserted into the side that is currently visible
                    //if angle/180 is even front is the front,  if odd front is on the back
                    let newComponent

                    if(afterFlippedAngle){


                        if(!router.flipFrontComponent) router.flipFrontComponent = html``
                        if(!router.flipBackComponent) router.flipBackComponent = html``

                        if( (afterFlippedAngle/180) % 2 !== 0 ){  //if even (at 0 or 360deg) front will be in the front
                            router.flipBackComponent = component
                        }else{//if even (at 180 or 540deg) front will be the back side
                            router.flipBackComponent = component
                        }

                        newComponent = html`
                        
                        <div style="position: absolute;  left: 0; right: 0; backface-visibility: hidden;">${router.flipFront}</div> 
                        
                        
                        <div style="
                                transform: rotateY(180deg);
                                position: absolute;
                                backface-visibility: hidden;
                                left: 0;
                                right: 0;
                                ">
                                ${component}
                        </div>
                        
                        
                        `
                    }else{
                        newComponent = component
                    }

                    callback(newComponent)
                
                }

                this.animateComponent(refreshComponent,route,container)

            }
            
            

            let patternPath = cleanFirstSlash(route['pattern'])

            if(patternPath === path){
                return returnCallback(route.component(this))
            }else if(patternPath.indexOf(':') !== -1 && patternPath.split('/').length === path.split('/').length){
                let locationOfFirstColon = patternPath.indexOf(':')
                let pathBeforeColon = patternPath.substr(0,locationOfFirstColon)
                let pathBeforeColonCurrent = path.substr(0,locationOfFirstColon)

                this.params = {}
                if(pathBeforeColon === pathBeforeColonCurrent){
                    let paramPattern = patternPath.substr(locationOfFirstColon,patternPath.length).split('/')
                    let paramValues = path.substr(locationOfFirstColon,path.length).split('/')

                    for(let j = 0; j <= paramPattern.length -1; j++){
                        let paraField = paramPattern[j].replace(':','')
                        let paraValue = paramValues[j]
                        this.params[paraField] = decodeURIComponent(paraValue)
                    }
                     
                    return returnCallback(route.component(this))
                }

            }else if(patternPath.indexOf('*') !== -1){
                let locationOfFirstAsterix = patternPath.indexOf('*')
                let pathBeforeAsterix = patternPath.substr(0,locationOfFirstAsterix)
                let pathBeforeAsterixCurrent = path.substr(0,locationOfFirstAsterix)
                //format /a/b/*

                if(pathBeforeAsterix === pathBeforeAsterixCurrent){
                    return returnCallback(route.component(this))
                }

            }

            //just asterix is confusing analogy for 404, let's use 404 as a pattern instead
            if(i === routeConfig.length-1){
                let componentFor404 = null
                for(let index of routeConfig){
                    if(index.pattern === '404' || index.pattern === 404 || index.pattern === '*'){
                        componentFor404 = index.component
                    }
                }

                if(componentFor404) return returnCallback(componentFor404())
                return returnCallback(`404 Not Found`)
            }



        }
    }

    animateComponent(refresh,routeData,container){
                
        let duration = routeData.duration
        let transitionAxis = routeData.transitionAxis
        let transitionType = routeData.transitionType

        if(!transitionAxis) transitionAxis = 'x'
        
        let unit = 'vw'
        if(transitionAxis === 'y') unit = 'vh'

        if(!transitionType) transitionType = 'slide'

        container.style.display = 'block'

        function setCss(styling){//sets css for all childs of container

            styling = styling.split(';')
            for(let property of styling){
                property = property.split(':')
                if(container.children[0]) container.children[0].style[property[0]] = property[1]
            }

        }

        

        if(transitionType === 'slide'){
            if(!duration) duration = 0.15

            setCss(`
                    display:block;
                    opacity: 0; 
                    transition:opacity ${duration/1.5}s;
            `)

            container.style.transition = 'unset'
            container.style.transform = 'unset'

            setTimeout(()=>{
                container.style.transition = `all ${duration}s ease-out`
                container.style.transform = `translate${transitionAxis.toUpperCase()}(-100${unit})`

                setTimeout(()=>{
                    refresh()
                    setCss(`
                        display: block;
                        opacity:1;
                        transition:opacity ${duration/3}s;
                    `)

                    container.style.transition = 'unset'
                    container.style.transform = `translate${transitionAxis.toUpperCase()}(100${unit})`
                    setTimeout(()=>{
                        container.style.transition = `all ${duration}s ease-out`
                        container.style.transform = `unset`
                    },100)

                },duration*1000)
            },100)
            
        }else if(transitionType === 'flip'){
            
            container.parentNode.style.perspective = '500px'
            container.style.transformStyle = 'preserve-3d'
            container.style.position = 'relative'

            if(!duration) duration = 1
            container.style.transition = `all ${duration}s`
            
            let rotateY= container.style.transform.replace(/[^\d.]/g, '')
            rotateY = Number(rotateY)
            container.style.transform = `rotateY(${rotateY+180}deg)`

            refresh(rotateY+180)

            
    






        }else if(transitionType == 'blur'){
            let duration = 0.25
            container.style.transition = `all ${duration/5}s ease`
            container.style.filter = `blur(100px) opacity(0)`
            container.style.transform = `scale(10)`

            setTimeout(()=>{
                refresh()
                container.style.transition = `all ${duration*2}s ease`
                container.style.filter = `blur(0px) opacity(1)`
                container.style.transform = `scale(1)`
            },(duration * 1000 )/5 )

        }

    }

    link(e){

        if(typeof e == 'string'){
            window.history.pushState('','',e)
            this.processAllRouters()
            return
        }

        e.preventDefault()
        let path = e.target.getAttribute('href')
        window.history.pushState('','',path)
        this.processAllRouters()
    }




}

//https://javascript.info/modules-dynamic-imports


/*
Template Routes

[{pattern:'home',component:'component-name'},{}]

*/








/*
Code Briefing

X override links @ link()
X read route on popState and window.onload @ litRouter processRoutes
X Match pattern of route with location.pathname @ same depth philosophy
X return the component name to render @ second param of constructor
X Add param to the calback
X Add support for /a/b/* (on it!)

There are a lot of libraries like routal so routal needs to offer something new to the web and It's a no brainer that 
it must be native app like animation on routing 

* Add support for transition animation

( our process of taking notes also makes coming back to our own code very confortable)

* create slot element which will render the appropriate component but that will require locading lit element mostly browser will handle that with chache
(if component itself is returned it will require less code to be written by developers)

Pattern Matching Procedure

pattern matching must follow philosophy of same depth meaning /a/b/c will not be included in /a/b rather you can provide /a/b/:c
the process will be first check if route pattern has colon if not do direct match
if colon exist compare the no. of forward slashes, if quantity is same, check if everything before the first colon matches the current pathname upto the same dapth

precaution href attribute /a and a mean the same but while matching it reflection addtional depth so if the first character is / remove it

The benefit of taking planing notes inside the code itself is you can later use it as code briefing, If you want to open source it, code briefing is a must have

Let's add more animation types

* slideX
* slideY
* hangX
* hangY

links must be universally accessible and change in link from one router must update other routers as well
move all the code of link in to linkClicked(config,callback,container)

*/
let Link = Routal.link
export {Routal,Link}
