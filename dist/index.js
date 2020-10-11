parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Ezj7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isDirective=exports.directive=void 0;const e=new WeakMap,t=t=>(...s)=>{const i=t(...s);return e.set(i,!0),i};exports.directive=t;const s=t=>"function"==typeof t&&e.has(t);exports.isDirective=s;
},{}],"VATp":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.removeNodes=exports.reparentNodes=exports.isCEPolyfill=void 0;const e=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback;exports.isCEPolyfill=e;const o=(e,o,s=null,l=null)=>{for(;o!==s;){const s=o.nextSibling;e.insertBefore(o,l),o=s}};exports.reparentNodes=o;const s=(e,o,s=null)=>{for(;o!==s;){const s=o.nextSibling;e.removeChild(o),o=s}};exports.removeNodes=s;
},{}],"yifX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.nothing=exports.noChange=void 0;const e={};exports.noChange=e;const o={};exports.nothing=o;
},{}],"V60B":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.lastAttributeNameRegex=exports.createMarker=exports.isTemplatePartActive=exports.Template=exports.boundAttributeSuffix=exports.markerRegex=exports.nodeMarker=exports.marker=void 0;const e=`{{lit-${String(Math.random()).slice(2)}}}`;exports.marker=e;const t=`\x3c!--${e}--\x3e`;exports.nodeMarker=t;const r=new RegExp(`${e}|${t}`);exports.markerRegex=r;const s="$lit$";exports.boundAttributeSuffix=s;class o{constructor(t,o){this.parts=[],this.element=o;const i=[],l=[],p=document.createTreeWalker(o.content,133,null,!1);let c=0,d=-1,u=0;const{strings:f,values:{length:h}}=t;for(;u<h;){const t=p.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:o}=e;let i=0;for(let t=0;t<o;t++)n(e[t].name,s)&&i++;for(;i-- >0;){const e=f[u],o=x.exec(e)[2],n=o.toLowerCase()+s,i=t.getAttribute(n);t.removeAttribute(n);const a=i.split(r);this.parts.push({type:"attribute",index:d,name:o,strings:a}),u+=a.length-1}}"TEMPLATE"===t.tagName&&(l.push(t),p.currentNode=t.content)}else if(3===t.nodeType){const o=t.data;if(o.indexOf(e)>=0){const e=t.parentNode,l=o.split(r),p=l.length-1;for(let r=0;r<p;r++){let o,i=l[r];if(""===i)o=a();else{const e=x.exec(i);null!==e&&n(e[2],s)&&(i=i.slice(0,e.index)+e[1]+e[2].slice(0,-s.length)+e[3]),o=document.createTextNode(i)}e.insertBefore(o,t),this.parts.push({type:"node",index:++d})}""===l[p]?(e.insertBefore(a(),t),i.push(t)):t.data=l[p],u+=p}}else if(8===t.nodeType)if(t.data===e){const e=t.parentNode;null!==t.previousSibling&&d!==c||(d++,e.insertBefore(a(),t)),c=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(i.push(t),d--),u++}else{let r=-1;for(;-1!==(r=t.data.indexOf(e,r+1));)this.parts.push({type:"node",index:-1}),u++}}else p.currentNode=l.pop()}for(const e of i)e.parentNode.removeChild(e)}}exports.Template=o;const n=(e,t)=>{const r=e.length-t.length;return r>=0&&e.slice(r)===t},i=e=>-1!==e.index;exports.isTemplatePartActive=i;const a=()=>document.createComment("");exports.createMarker=a;const x=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;exports.lastAttributeNameRegex=x;
},{}],"q1yJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TemplateInstance=void 0;var e=require("./dom.js"),t=require("./template.js");class s{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const s of this.__parts)void 0!==s&&s.commit()}_clone(){const s=e.isCEPolyfill?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),o=[],r=this.template.parts,n=document.createTreeWalker(s,133,null,!1);let i,p=0,l=0,a=n.nextNode();for(;p<r.length;)if(i=r[p],(0,t.isTemplatePartActive)(i)){for(;l<i.index;)l++,"TEMPLATE"===a.nodeName&&(o.push(a),n.currentNode=a.content),null===(a=n.nextNode())&&(n.currentNode=o.pop(),a=n.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,i.name,i.strings,this.options));p++}else this.__parts.push(void 0),p++;return e.isCEPolyfill&&(document.adoptNode(s),customElements.upgrade(s)),s}}exports.TemplateInstance=s;
},{"./dom.js":"VATp","./template.js":"V60B"}],"KfI1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SVGTemplateResult=exports.TemplateResult=void 0;var e=require("./dom.js"),t=require("./template.js");const s=` ${t.marker} `;class r{constructor(e,t,s,r){this.strings=e,this.values=t,this.type=s,this.processor=r}getHTML(){const e=this.strings.length-1;let r="",n=!1;for(let l=0;l<e;l++){const e=this.strings[l],i=e.lastIndexOf("\x3c!--");n=(i>-1||n)&&-1===e.indexOf("--\x3e",i+1);const o=t.lastAttributeNameRegex.exec(e);r+=null===o?e+(n?s:t.nodeMarker):e.substr(0,o.index)+o[1]+o[2]+t.boundAttributeSuffix+o[3]+t.marker}return r+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}exports.TemplateResult=r;class n extends r{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const t=super.getTemplateElement(),s=t.content,r=s.firstChild;return s.removeChild(r),(0,e.reparentNodes)(s,r.firstChild),t}}exports.SVGTemplateResult=n;
},{"./dom.js":"VATp","./template.js":"V60B"}],"iaXb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.EventPart=exports.PropertyPart=exports.PropertyCommitter=exports.BooleanAttributePart=exports.NodePart=exports.AttributePart=exports.AttributeCommitter=exports.isIterable=exports.isPrimitive=void 0;var t=require("./directive.js"),e=require("./dom.js"),i=require("./part.js"),s=require("./template-instance.js"),n=require("./template-result.js"),r=require("./template.js");const o=t=>null===t||!("object"==typeof t||"function"==typeof t);exports.isPrimitive=o;const a=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);exports.isIterable=a;class h{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let s=0;s<i.length-1;s++)this.parts[s]=this._createPart()}_createPart(){return new l(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(o(t)||!a(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}exports.AttributeCommitter=h;class l{constructor(t){this.value=void 0,this.committer=t}setValue(e){e===i.noChange||o(e)&&e===this.value||(this.value=e,(0,t.isDirective)(e)||(this.committer.dirty=!0))}commit(){for(;(0,t.isDirective)(this.value);){const t=this.value;this.value=i.noChange,t(this)}this.value!==i.noChange&&this.committer.commit()}}exports.AttributePart=l;class u{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild((0,r.createMarker)()),this.endNode=t.appendChild((0,r.createMarker)())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=(0,r.createMarker)()),t.__insert(this.endNode=(0,r.createMarker)())}insertAfterPart(t){t.__insert(this.startNode=(0,r.createMarker)()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;(0,t.isDirective)(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i.noChange,t(this)}const e=this.__pendingValue;e!==i.noChange&&(o(e)?e!==this.value&&this.__commitText(e):e instanceof n.TemplateResult?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):a(e)?this.__commitIterable(e):e===i.nothing?(this.value=i.nothing,this.clear()):this.__commitText(e))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof s.TemplateInstance&&this.value.template===e)this.value.update(t.values);else{const i=new s.TemplateInstance(e,t.processor,this.options),n=i._clone();i.update(t.values),this.__commitNode(n),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new u(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){(0,e.removeNodes)(this.startNode.parentNode,t.nextSibling,this.endNode)}}exports.NodePart=u;class d{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;(0,t.isDirective)(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i.noChange,t(this)}if(this.__pendingValue===i.noChange)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=i.noChange}}exports.BooleanAttributePart=d;class c extends h{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new p(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}exports.PropertyCommitter=c;class p extends l{}exports.PropertyPart=p;let _=!1;try{const t={get capture(){return _=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(g){}class m{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this.__pendingValue=t}commit(){for(;(0,t.isDirective)(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i.noChange,t(this)}if(this.__pendingValue===i.noChange)return;const e=this.__pendingValue,s=this.value,n=null==e||null!=s&&(e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive),r=null!=e&&(null==s||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=v(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=i.noChange}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}exports.EventPart=m;const v=t=>t&&(_?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
},{"./directive.js":"Ezj7","./dom.js":"VATp","./part.js":"yifX","./template-instance.js":"q1yJ","./template-result.js":"KfI1","./template.js":"V60B"}],"Il6N":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.defaultTemplateProcessor=exports.DefaultTemplateProcessor=void 0;var e=require("./parts.js");class t{handleAttributeExpressions(t,r,s,o){const a=r[0];if("."===a){return new e.PropertyCommitter(t,r.slice(1),s).parts}return"@"===a?[new e.EventPart(t,r.slice(1),o.eventContext)]:"?"===a?[new e.BooleanAttributePart(t,r.slice(1),s)]:new e.AttributeCommitter(t,r,s).parts}handleTextExpression(t){return new e.NodePart(t)}}exports.DefaultTemplateProcessor=t;const r=new t;exports.defaultTemplateProcessor=r;
},{"./parts.js":"iaXb"}],"ePDl":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.templateFactory=t,exports.templateCaches=void 0;var e=require("./template.js");function t(t){let s=r.get(t.type);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},r.set(t.type,s));let n=s.stringsArray.get(t.strings);if(void 0!==n)return n;const a=t.strings.join(e.marker);return void 0===(n=s.keyString.get(a))&&(n=new e.Template(t,t.getTemplateElement()),s.keyString.set(a,n)),s.stringsArray.set(t.strings,n),n}const r=new Map;exports.templateCaches=r;
},{"./template.js":"V60B"}],"VEZA":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.render=exports.parts=void 0;var e=require("./dom.js"),t=require("./parts.js"),r=require("./template-factory.js");const s=new WeakMap;exports.parts=s;const o=(o,a,p)=>{let d=s.get(a);void 0===d&&((0,e.removeNodes)(a,a.firstChild),s.set(a,d=new t.NodePart(Object.assign({templateFactory:r.templateFactory},p))),d.appendInto(a)),d.setValue(o),d.commit()};exports.render=o;
},{"./dom.js":"VATp","./parts.js":"iaXb","./template-factory.js":"ePDl"}],"mC9r":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"DefaultTemplateProcessor",{enumerable:!0,get:function(){return e.DefaultTemplateProcessor}}),Object.defineProperty(exports,"defaultTemplateProcessor",{enumerable:!0,get:function(){return e.defaultTemplateProcessor}}),Object.defineProperty(exports,"SVGTemplateResult",{enumerable:!0,get:function(){return t.SVGTemplateResult}}),Object.defineProperty(exports,"TemplateResult",{enumerable:!0,get:function(){return t.TemplateResult}}),Object.defineProperty(exports,"directive",{enumerable:!0,get:function(){return r.directive}}),Object.defineProperty(exports,"isDirective",{enumerable:!0,get:function(){return r.isDirective}}),Object.defineProperty(exports,"removeNodes",{enumerable:!0,get:function(){return n.removeNodes}}),Object.defineProperty(exports,"reparentNodes",{enumerable:!0,get:function(){return n.reparentNodes}}),Object.defineProperty(exports,"noChange",{enumerable:!0,get:function(){return o.noChange}}),Object.defineProperty(exports,"nothing",{enumerable:!0,get:function(){return o.nothing}}),Object.defineProperty(exports,"AttributeCommitter",{enumerable:!0,get:function(){return i.AttributeCommitter}}),Object.defineProperty(exports,"AttributePart",{enumerable:!0,get:function(){return i.AttributePart}}),Object.defineProperty(exports,"BooleanAttributePart",{enumerable:!0,get:function(){return i.BooleanAttributePart}}),Object.defineProperty(exports,"EventPart",{enumerable:!0,get:function(){return i.EventPart}}),Object.defineProperty(exports,"isIterable",{enumerable:!0,get:function(){return i.isIterable}}),Object.defineProperty(exports,"isPrimitive",{enumerable:!0,get:function(){return i.isPrimitive}}),Object.defineProperty(exports,"NodePart",{enumerable:!0,get:function(){return i.NodePart}}),Object.defineProperty(exports,"PropertyCommitter",{enumerable:!0,get:function(){return i.PropertyCommitter}}),Object.defineProperty(exports,"PropertyPart",{enumerable:!0,get:function(){return i.PropertyPart}}),Object.defineProperty(exports,"parts",{enumerable:!0,get:function(){return u.parts}}),Object.defineProperty(exports,"render",{enumerable:!0,get:function(){return u.render}}),Object.defineProperty(exports,"templateCaches",{enumerable:!0,get:function(){return a.templateCaches}}),Object.defineProperty(exports,"templateFactory",{enumerable:!0,get:function(){return a.templateFactory}}),Object.defineProperty(exports,"TemplateInstance",{enumerable:!0,get:function(){return p.TemplateInstance}}),Object.defineProperty(exports,"createMarker",{enumerable:!0,get:function(){return s.createMarker}}),Object.defineProperty(exports,"isTemplatePartActive",{enumerable:!0,get:function(){return s.isTemplatePartActive}}),Object.defineProperty(exports,"Template",{enumerable:!0,get:function(){return s.Template}}),exports.svg=exports.html=void 0;var e=require("./lib/default-template-processor.js"),t=require("./lib/template-result.js"),r=require("./lib/directive.js"),n=require("./lib/dom.js"),o=require("./lib/part.js"),i=require("./lib/parts.js"),u=require("./lib/render.js"),a=require("./lib/template-factory.js"),p=require("./lib/template-instance.js"),s=require("./lib/template.js");(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const l=(r,...n)=>new t.TemplateResult(r,n,"html",e.defaultTemplateProcessor);exports.html=l;const c=(r,...n)=>new t.SVGTemplateResult(r,n,"svg",e.defaultTemplateProcessor);exports.svg=c;
},{"./lib/default-template-processor.js":"Il6N","./lib/template-result.js":"KfI1","./lib/directive.js":"Ezj7","./lib/dom.js":"VATp","./lib/part.js":"yifX","./lib/parts.js":"iaXb","./lib/render.js":"VEZA","./lib/template-factory.js":"ePDl","./lib/template-instance.js":"q1yJ","./lib/template.js":"V60B"}],"FNcC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.removeNodesFromTemplate=n,exports.insertNodeIntoTemplate=l;var e=require("./template.js");const t=133;function n(e,n){const{element:{content:r},parts:l}=e,u=document.createTreeWalker(r,t,null,!1);let c=o(l),d=l[c],s=-1,i=0;const a=[];let p=null;for(;u.nextNode();){s++;const e=u.currentNode;for(e.previousSibling===p&&(p=null),n.has(e)&&(a.push(e),null===p&&(p=e)),null!==p&&i++;void 0!==d&&d.index===s;)d.index=null!==p?-1:d.index-i,d=l[c=o(l,c)]}a.forEach(e=>e.parentNode.removeChild(e))}const r=e=>{let n=11===e.nodeType?0:1;const r=document.createTreeWalker(e,t,null,!1);for(;r.nextNode();)n++;return n},o=(t,n=-1)=>{for(let r=n+1;r<t.length;r++){const n=t[r];if((0,e.isTemplatePartActive)(n))return r}return-1};function l(e,n,l=null){const{element:{content:u},parts:c}=e;if(null==l)return void u.appendChild(n);const d=document.createTreeWalker(u,t,null,!1);let s=o(c),i=0,a=-1;for(;d.nextNode();){for(a++,d.currentNode===l&&(i=r(n),l.parentNode.insertBefore(n,l));-1!==s&&c[s].index===a;){if(i>0){for(;-1!==s;)c[s].index+=i,s=o(c,s);return}s=o(c,s)}}}
},{"./template.js":"V60B"}],"LKRG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"html",{enumerable:!0,get:function(){return a.html}}),Object.defineProperty(exports,"svg",{enumerable:!0,get:function(){return a.svg}}),Object.defineProperty(exports,"TemplateResult",{enumerable:!0,get:function(){return a.TemplateResult}}),exports.render=void 0;var e=require("./dom.js"),t=require("./modify-template.js"),r=require("./render.js"),n=require("./template-factory.js"),o=require("./template-instance.js"),s=require("./template.js"),a=require("../lit-html.js");const l=(e,t)=>`${e}--${t}`;let i=!0;void 0===window.ShadyCSS?i=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),i=!1);const d=e=>t=>{const r=l(t.type,e);let o=n.templateCaches.get(r);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},n.templateCaches.set(r,o));let a=o.stringsArray.get(t.strings);if(void 0!==a)return a;const d=t.strings.join(s.marker);if(void 0===(a=o.keyString.get(d))){const r=t.getTemplateElement();i&&window.ShadyCSS.prepareTemplateDom(r,e),a=new s.Template(t,r),o.keyString.set(d,a)}return o.stringsArray.set(t.strings,a),a},p=["html","svg"],c=e=>{p.forEach(r=>{const o=n.templateCaches.get(l(r,e));void 0!==o&&o.keyString.forEach(e=>{const{element:{content:r}}=e,n=new Set;Array.from(r.querySelectorAll("style")).forEach(e=>{n.add(e)}),(0,t.removeNodesFromTemplate)(e,n)})})},m=new Set,y=(e,r,n)=>{m.add(e);const o=n?n.element:document.createElement("template"),s=r.querySelectorAll("style"),{length:a}=s;if(0===a)return void window.ShadyCSS.prepareTemplateStyles(o,e);const l=document.createElement("style");for(let t=0;t<a;t++){const e=s[t];e.parentNode.removeChild(e),l.textContent+=e.textContent}c(e);const i=o.content;n?(0,t.insertNodeIntoTemplate)(n,l,i.firstChild):i.insertBefore(l,i.firstChild),window.ShadyCSS.prepareTemplateStyles(o,e);const d=i.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==d)r.insertBefore(d.cloneNode(!0),r.firstChild);else if(n){i.insertBefore(l,i.firstChild);const e=new Set;e.add(l),(0,t.removeNodesFromTemplate)(n,e)}},S=(t,n,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const a=s.scopeName,l=r.parts.has(n),p=i&&11===n.nodeType&&!!n.host,c=p&&!m.has(a),S=c?document.createDocumentFragment():n;if((0,r.render)(t,S,Object.assign({templateFactory:d(a)},s)),c){const t=r.parts.get(S);r.parts.delete(S);const s=t.value instanceof o.TemplateInstance?t.value.template:void 0;y(a,S,s),(0,e.removeNodes)(n,n.firstChild),n.appendChild(S),r.parts.set(n,t)}!l&&p&&window.ShadyCSS.styleElement(n.host)};exports.render=S;
},{"./dom.js":"VATp","./modify-template.js":"FNcC","./render.js":"VEZA","./template-factory.js":"ePDl","./template-instance.js":"q1yJ","./template.js":"V60B","../lit-html.js":"mC9r"}],"sYIy":[function(require,module,exports) {
"use strict";var t;Object.defineProperty(exports,"__esModule",{value:!0}),exports.UpdatingElement=exports.notEqual=exports.defaultConverter=void 0,window.JSCompiler_renameProperty=((t,e)=>t);const e={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}};exports.defaultConverter=e;const r=(t,e)=>e!==t&&(e==e||t==t);exports.notEqual=r;const s={attribute:!0,type:String,converter:e,reflect:!1,hasChanged:r},i=Promise.resolve(!0),a=1,o=4,n=8,p=16,h=32,c="finalized";class u extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=i,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,r)=>{const s=this._attributeNameForProperty(r,e);void 0!==s&&(this._attributeToPropertyMap.set(s,r),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=s){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const r="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[r]},set(e){const s=this[t];this[r]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(c)||t.finalize(),this[c]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const r of e)this.createProperty(r,t[r])}}static _attributeNameForProperty(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=r){return s(t,e)}static _propertyValueFromAttribute(t,r){const s=r.type,i=r.converter||e,a="function"==typeof i?i:i.fromAttribute;return a?a(t,s):t}static _propertyValueToAttribute(t,r){if(void 0===r.reflect)return;const s=r.type,i=r.converter;return(i&&i.toAttribute||e.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|h,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,r){e!==r&&this._attributeToProperty(t,r)}_propertyToAttribute(t,e,r=s){const i=this.constructor,a=i._attributeNameForProperty(t,r);if(void 0!==a){const t=i._propertyValueToAttribute(e,r);if(void 0===t)return;this._updateState=this._updateState|n,null==t?this.removeAttribute(a):this.setAttribute(a,t),this._updateState=this._updateState&~n}}_attributeToProperty(t,e){if(this._updateState&n)return;const r=this.constructor,i=r._attributeToPropertyMap.get(t);if(void 0!==i){const t=r._classProperties.get(i)||s;this._updateState=this._updateState|p,this[i]=r._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~p}}_requestUpdate(t,e){let r=!0;if(void 0!==t){const i=this.constructor,a=i._classProperties.get(t)||s;i._valueHasChanged(this[t],e,a.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==a.reflect||this._updateState&p||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,a))):r=!1}!this._hasRequestedUpdate&&r&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|o;const r=this._updatePromise;this._updatePromise=new Promise((r,s)=>{t=r,e=s});try{await r}catch(s){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(s){e(s)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&h}get _hasRequestedUpdate(){return this._updateState&o}get hasUpdated(){return this._updateState&a}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(r){throw t=!1,r}finally{this._markUpdated()}t&&(this._updateState&a||(this._updateState=this._updateState|a,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~o}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}exports.UpdatingElement=u,u[t=c]=!0;
},{}],"EeZC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.property=i,exports.query=s,exports.queryAll=c,exports.eventOptions=exports.customElement=void 0;const e=(e,t)=>(window.customElements.define(e,t),t),t=(e,t)=>{const{kind:r,elements:n}=t;return{kind:r,elements:n,finisher(t){window.customElements.define(e,t)}}},r=r=>n=>"function"==typeof n?e(r,n):t(r,n);exports.customElement=r;const n=(e,t)=>"method"!==t.kind||!t.descriptor||"value"in t.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}}:Object.assign({},t,{finisher(r){r.createProperty(t.key,e)}}),o=(e,t,r)=>{t.constructor.createProperty(r,e)};function i(e){return(t,r)=>void 0!==r?o(e,t,r):n(e,t)}function s(e){return(t,r)=>{const n={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};return void 0!==r?u(n,t,r):p(n,t)}}function c(e){return(t,r)=>{const n={get(){return this.renderRoot.querySelectorAll(e)},enumerable:!0,configurable:!0};return void 0!==r?u(n,t,r):p(n,t)}}const u=(e,t,r)=>{Object.defineProperty(t,r,e)},p=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e}),l=(e,t)=>Object.assign({},t,{finisher(r){Object.assign(r.prototype[t.key],e)}}),d=(e,t,r)=>{Object.assign(t[r],e)},y=e=>(t,r)=>void 0!==r?d(e,t,r):l(e,t);exports.eventOptions=y;
},{}],"B4lo":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.css=exports.unsafeCSS=exports.CSSResult=exports.supportsAdoptingStyleSheets=void 0;const e="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;exports.supportsAdoptingStyleSheets=e;const t=Symbol();class s{constructor(e,s){if(s!==t)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(e?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}exports.CSSResult=s;const r=e=>new s(String(e),t);exports.unsafeCSS=r;const o=e=>{if(e instanceof s)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)},n=(e,...r)=>{const n=r.reduce((t,s,r)=>t+o(s)+e[r+1],e[0]);return new s(n,t)};exports.css=n;
},{}],"fMX6":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e={LitElement:!0,html:!0,svg:!0,TemplateResult:!0,SVGTemplateResult:!0};Object.defineProperty(exports,"html",{enumerable:!0,get:function(){return t.html}}),Object.defineProperty(exports,"svg",{enumerable:!0,get:function(){return t.svg}}),Object.defineProperty(exports,"TemplateResult",{enumerable:!0,get:function(){return t.TemplateResult}}),Object.defineProperty(exports,"SVGTemplateResult",{enumerable:!0,get:function(){return t.SVGTemplateResult}}),exports.LitElement=void 0;var t=require("./lit-html/lit-html.js"),r=require("./lit-html/lib/shady-render.js"),s=require("./lib/updating-element.js");Object.keys(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&(Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(exports,t,{enumerable:!0,get:function(){return s[t]}}))});var n=require("./lib/decorators.js");Object.keys(n).forEach(function(t){"default"!==t&&"__esModule"!==t&&(Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(exports,t,{enumerable:!0,get:function(){return n[t]}}))});var o=require("./lib/css-tag.js");function i(e,t=[]){for(let r=0,s=e.length;r<s;r++){const s=e[r];Array.isArray(s)?i(s,t):t.push(s)}return t}Object.keys(o).forEach(function(t){"default"!==t&&"__esModule"!==t&&(Object.prototype.hasOwnProperty.call(e,t)||Object.defineProperty(exports,t,{enumerable:!0,get:function(){return o[t]}}))}),(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const l=e=>e.flat?e.flat(1/0):i(e);class a extends s.UpdatingElement{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const e=this.styles,t=[];if(Array.isArray(e)){l(e).reduceRight((e,t)=>(e.add(t),e),new Set).forEach(e=>t.unshift(e))}else e&&t.push(e);return t}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?o.supportsAdoptingStyleSheets?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const r=this.render();r instanceof t.TemplateResult&&this.constructor.render(r,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){}}exports.LitElement=a,console.log(a),a.finalized=!0,a.render=r.render;
},{"./lit-html/lit-html.js":"mC9r","./lit-html/lib/shady-render.js":"LKRG","./lib/updating-element.js":"sYIy","./lib/decorators.js":"EeZC","./lib/css-tag.js":"B4lo"}],"z8hT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Link=exports.Routal=void 0;var t=require("./lit-element/lit-element.js");function e(t){return"/"===t[0]&&(t=t.substr(1,t.length-1)),t}let s=new class{constructor(){this.routers=[],this.link=this.link.bind(this),this.processRoutes=this.processRoutes.bind(this)}setup(t,e,s=document.body){let i={routeConfig:t,callback:e,container:s,container:s,data:{}};this.routers.push(i),s||console.log("Routal warning: container not found"),window.addEventListener("popstate",this.processAllRouters.bind(this)),window.addEventListener("load",this.processAllRouters.bind(this)),this.link=this.link.bind(this),this.processAllRouters()}processAllRouters(t){for(let e of this.routers)this.processRoutes(e)}processRoutes(s){let i=s.callback,n=s.container,o=s.routeConfig,l=e(location.pathname);"string"==typeof n&&(n=document.querySelector(n)),n||console.log("Routal warning: container not found");for(let a=0;a<=o.length-1;a++){let p=o[a];function r(e){this.duration=p.duration,this.transitionAxis=p.axis,this.transitionType=p.transition;this.animateComponent(n=>{let o;n?(s.flipFrontComponent||(s.flipFrontComponent=t.html``),s.flipBackComponent||(s.flipBackComponent=t.html``),s.flipBackComponent=e,o=t.html`
                        
                        <div style="position: absolute;  left: 0; right: 0; backface-visibility: hidden;">${s.flipFront}</div> 
                        
                        
                        <div style="
                                transform: rotateY(180deg);
                                position: absolute;
                                backface-visibility: hidden;
                                left: 0;
                                right: 0;
                                ">
                                ${e}
                        </div>
                        
                        
                        `):o=e,i(o)},p,n)}r=r.bind(this);let u=e(p.pattern);if(u===l)return r(p.component(this));if(-1!==u.indexOf(":")&&u.split("/").length===l.split("/").length){let t=u.indexOf(":"),e=u.substr(0,t),s=l.substr(0,t);if(this.params={},e===s){let e=u.substr(t,u.length).split("/"),s=l.substr(t,l.length).split("/");for(let t=0;t<=e.length-1;t++){let i=e[t].replace(":",""),n=s[t];this.params[i]=decodeURIComponent(n)}return r(p.component(this))}}else if(-1!==u.indexOf("*")){let t=u.indexOf("*");if(u.substr(0,t)===l.substr(0,t))return r(p.component(this))}if(a===o.length-1){let t=null;for(let e of o)"404"!==e.pattern&&404!==e.pattern&&"*"!==e.pattern||(t=e.component);return r(t?t():"404 Not Found")}}}animateComponent(t,e,s){let i=e.duration,n=e.transitionAxis,o=e.transitionType;n||(n="x");let l="vw";function r(t){t=t.split(";");for(let e of t)e=e.split(":"),s.children[0]&&(s.children[0].style[e[0]]=e[1])}if("y"===n&&(l="vh"),o||(o="slide"),s.style.display="block","slide"===o)i||(i=.15),r(`\n                    display:block;\n                    opacity: 0; \n                    transition:opacity ${i/1.5}s;\n            `),s.style.transition="unset",s.style.transform="unset",setTimeout(()=>{s.style.transition=`all ${i}s ease-out`,s.style.transform=`translate${n.toUpperCase()}(-100${l})`,setTimeout(()=>{t(),r(`\n                        display: block;\n                        opacity:1;\n                        transition:opacity ${i/3}s;\n                    `),s.style.transition="unset",s.style.transform=`translate${n.toUpperCase()}(100${l})`,setTimeout(()=>{s.style.transition=`all ${i}s ease-out`,s.style.transform="unset"},100)},1e3*i)},100);else if("flip"===o){s.parentNode.style.perspective="500px",s.style.transformStyle="preserve-3d",s.style.position="relative",i||(i=1),s.style.transition=`all ${i}s`;let e=s.style.transform.replace(/[^\d.]/g,"");e=Number(e),s.style.transform=`rotateY(${e+180}deg)`,t(e+180)}else if("blur"==o){let e=.25;s.style.transition=`all ${e/5}s ease`,s.style.filter="blur(100px) opacity(0)",s.style.transform="scale(10)",setTimeout(()=>{t(),s.style.transition=`all ${2*e}s ease`,s.style.filter="blur(0px) opacity(1)",s.style.transform="scale(1)"},1e3*e/5)}}link(t){if("string"==typeof t)return window.history.pushState("","",t),void this.processAllRouters();t.preventDefault();let e=t.target.getAttribute("href");window.history.pushState("","",e),this.processAllRouters()}};exports.Routal=s;let i=s.link;exports.Link=i;
},{"./lit-element/lit-element.js":"fMX6"}],"cJDT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.header=void 0;var e=require("./lit-element/lit-element.js"),t=require("/routal.js");class i extends e.LitElement{static get properties(){return{introMessageToRender:{type:Object},othersField:{type:String},loggedOutAttribute:{type:String},searchQuery:{type:String}}}constructor(){super(),console.log("working on header"),this.searchQuery="",this.loggedOutAttribute=""}firstUpdated(){let t=[{h1:"Options"},{button:{onclick:()=>{window.open("https://twitter.com/ableach_wip","meaningfulName")},innerHTML:"About Developer"}}];this.othersField=e.html`<button @click='${()=>{U.ask(t)}}' >
                
          <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15">
            <path d="M15 3.5H0m15 8H6m9-4H9" stroke="currentColor"></path>
          </svg>
        
        </button>`;U.readUser("username").then(e=>{e?t.push({button:{onclick:U.logout,innerHTML:"logout"}}):t.push({button:{onclick:U.login,innerHTML:"Login"}})})}static get styles(){return e.css`
  
      


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
  
      `}search(e){this.searchQuery=e.target.value,13===e.keyCode&&(0,t.Link)("/search/"+e.target.value)}render(){return e.html`
  
      <div id='header' class='${this.loggedOutAttribute}'>
        <div id='head'>

          <div @click="${()=>(0,t.Link)("/")}" id='logo' >
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
  
      `}}exports.header=i,customElements.define("the-header",i);
},{"./lit-element/lit-element.js":"fMX6","/routal.js":"z8hT"}],"dSsc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.pageCard=void 0;var e=require("./lit-element/lit-element.js"),t=require("/routal.js");class i extends e.LitElement{static get properties(){return{page:{type:Object}}}constructor(){super()}async firstUpdated(){let e=await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&redirects=1&prop=pageimages%7Cextracts&pithumbsize=300&titles=${this.page.title}&pilicense=any&exsentences=4&explaintext=1&exsectionformat=plain`).then(e=>e.json()),t=Object.keys(e.query.pages)[0];this.page=e.query.pages[t]}static get styles(){return e.css`

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
        

      `}render(){let i=this.page;return e.html`

            <a @click="${t.Link}" class='page' href="/page/${i.title}">  
              <div class="profileLink">
              ${i.thumbnail?e.html`<img src="${i.thumbnail.source}">`:"🐔"}
              </div>
              <h3 class="title" >${i.title}</h3>
            </a>
            
      `}}exports.pageCard=i,customElements.define("page-card",i);
},{"./lit-element/lit-element.js":"fMX6","/routal.js":"z8hT"}],"nzKe":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createPage=void 0;var e=require("./lit-element/lit-element.js"),t=require("/routal.js"),i=require("/pageCard.js");class r extends e.LitElement{static get properties(){return{fullName:String,similarPages:Object}}constructor(){super(),this.fullName="",this.similarPages=""}setValue(e){this[e.target.getAttribute("id")]=e.target.value;let t=this.fullName+" "+this.description+" "+this.instagramHandle;U.query({$search:{on:"pages",where:t,fields:["description","fullName","instagramHandle"]}}).then(e=>{this.similarPages=e})}async requestNewPage(){}static get styles(){return e.css`

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
        `}render(){return e.html`
      <center>
            <h3> Create Roasting Page </h3>
            
            <input @keyup="${this.setValue.bind(this)}" id="fullName" placeholder="Name">

     
         


            <button @click="${this.requestNewPage.bind(this)}"> create </button>
            
            <div>
                ${this.similarPages.length>0?e.html`
                    <h1>Similar pages</h1>

                        ${this.similarPages.map(t=>e.html`

                            <page-card .page='${t}'> </page-card>
                    
                        `)}

                `:e.html``}
            </div>
        </center>
      `}}exports.createPage=r,customElements.define("create-page",r);
},{"./lit-element/lit-element.js":"fMX6","/routal.js":"z8hT","/pageCard.js":"dSsc"}],"SxI5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.aButton=void 0;var t=require("./lit-element/lit-element.js"),e=require("/routal.js");class n extends t.LitElement{static get properties(){return{contentId:{type:String},buttonType:{type:String},buttonContent:{type:Object},buttonText:{type:String},clickCount:{type:String},clicked:{type:Boolean},contentType:{type:String},laughorlove:{type:String}}}static get styles(){return t.css`


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

      `}constructor(){super(),this.clicked=!1,this.clickCount="",this.buttonContent=""}async clickButton(){this.simulateClick();try{await U.query({$run:["like",{contentId:this.contentId,type:this.buttonType}]})}catch(t){U.login()}}simulateClick(){this.clicked=!this.clicked,this.clickCount=this.clicked?this.clickCount+1:this.clickCount-1}refresh(){U.readUser().then(t=>{t&&this.updateData()})}updateData(){U.query({$count:{on:"actions",where:{contentId:this.contentId}}}).then(t=>{this.clickCount=t}),U.query({$find:{on:"actions",where:{contentId:this.contentId,sender:"$user.id"}}}).then(t=>{t[0]&&(this.clicked=!0)}).catch(t=>{this.clicked=!1})}firstUpdated(){this.refresh()}render(){let e=!1;return"buttons"==this.buttonType?(this.buttonContent=t.html` ${this.buttonText} `,e=!0):this.buttonContent=t.html`<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'><defs><linearGradient id='a' x1='50%' x2='50%' y1='10.25%' y2='100%'><stop offset='0%' stop-color='#FEEA70'/><stop offset='100%' stop-color='#F69B30'/></linearGradient><linearGradient id='d' x1='50%' x2='50%' y1='0%' y2='100%'><stop offset='0%' stop-color='#472315'/><stop offset='100%' stop-color='#8B3A0E'/></linearGradient><linearGradient id='e' x1='50%' x2='50%' y1='0%' y2='81.902%'><stop offset='0%' stop-color='#FC607C'/><stop offset='100%' stop-color='#D91F3A'/></linearGradient><filter id='c' width='118.8%' height='118.8%' x='-9.4%' y='-9.4%' filterUnits='objectBoundingBox'><feGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/><feOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/><feComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/><feColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.921365489 0 0 0 0 0.460682745 0 0 0 0 0 0 0 0 0.35 0'/></filter><path id='b' d='M16 8A8 8 0 110 8a8 8 0 0116 0'/></defs><g fill='none'><use fill='url(#a)' xlink:href='#b'/><use fill='black' filter='url(#c)' xlink:href='#b'/><path fill='url(#d)' d='M3 8.008C3 10.023 4.006 14 8 14c3.993 0 5-3.977 5-5.992C13 7.849 11.39 7 8 7c-3.39 0-5 .849-5 1.008'/><path fill='url(#e)' d='M4.541 12.5c.804.995 1.907 1.5 3.469 1.5 1.563 0 2.655-.505 3.459-1.5-.551-.588-1.599-1.5-3.459-1.5s-2.917.912-3.469 1.5'/><path fill='#2A3755' d='M6.213 4.144c.263.188.502.455.41.788-.071.254-.194.369-.422.371-.78.011-1.708.255-2.506.612-.065.029-.197.088-.332.085-.124-.003-.251-.058-.327-.237-.067-.157-.073-.388.276-.598.545-.33 1.257-.48 1.909-.604a7.077 7.077 0 00-1.315-.768c-.427-.194-.38-.457-.323-.6.127-.317.609-.196 1.078.026a9 9 0 011.552.925zm3.577 0a8.953 8.953 0 011.55-.925c.47-.222.95-.343 1.078-.026.057.143.104.406-.323.6a7.029 7.029 0 00-1.313.768c.65.123 1.363.274 1.907.604.349.21.342.44.276.598-.077.18-.203.234-.327.237-.135.003-.267-.056-.332-.085-.797-.357-1.725-.6-2.504-.612-.228-.002-.351-.117-.422-.37-.091-.333.147-.6.41-.788z'/></g></svg>`,t.html`
     
          <div id="container" data-type="${this.buttonType}">  
            <button  data-onlyText='${e}' data-clicked="${this.clicked}" @click="${this.clickButton.bind(this)}">${this.buttonContent}</button> <span> ${this.clickCount}</span>  
          </div>
        
      `}}exports.aButton=n,customElements.define("a-button",n);
},{"./lit-element/lit-element.js":"fMX6","/routal.js":"z8hT"}],"bKVv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.aPage=void 0;var t=require("./lit-element/lit-element.js"),e=require("/routal.js"),i=require("/aButton.js");class a extends t.LitElement{static get properties(){return{title:{type:String},bioInfo:{type:Array},memes:{type:Array},pageData:Object,buttons:{type:Array},contentType:{type:String}}}constructor(){super(),this.contentType="roast",this.pageData=null,this.bioInfo=[],this.memes=[],this.buttons=[]}setMetaTags(){U.setMetaTag({property:"og:url"},{content:`http://roasta.upon.one/page/${this.pageData.title}`}),U.setMetaTag({property:"og:title"},{content:this.pageData.fullName}),U.setMetaTag({property:"og:description"},{content:this.pageData.description}),U.setMetaTag({property:"og:image"},{content:this.pageData.DPlink})}async refresh(){let t=await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&redirects=1&prop=pageimages%7Cextracts&pithumbsize=300&titles=${this.title}&pilicense=any&exsentences=4&explaintext=1&exsectionformat=plain`).then(t=>t.json()),e=Object.keys(t.query.pages)[0];this.pageData=t.query.pages[e],this.pageData.thumbnail?this.pageData.DPlink=this.pageData.thumbnail.source:this.pageData.DPlink&&(this.pageData.DPlink=U.CDN(this.pageData.DPlink)),this.pageData.fullName||(this.pageData.fullName=this.title),this.setMetaTags.call(this)}firstUpdated(){U.query({$find:{on:"bioInfo",where:{pageTitle:this.title}}}).then(t=>this.bioInfo=t),U.query({$find:{on:"buttons",where:{pageTitle:this.title}}}).then(t=>this.buttons=t),U.query({$find:{on:"memes",where:{pageTitle:this.title}}}).then(t=>this.memes=t),this.refresh()}async upload(t){let e=t.target.files[0],i=await U.compressImage(e),a=await U.upload(i,"profileImages",this.pageData.DPlink);await U.query({$update:{on:"pages",where:{title:this.title},put:{DPlink:a.url}}}),this.refresh()}static get styles(){return t.css`

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

      `}render(){return t.html`
         
          

      
            ${this.pageData?t.html`

            
            <div id='mainDescription'>

              <div id="infoSection">
                <div id="profilePhoto">
                  <div class="profileImage">
                    ${this.pageData.DPlink?t.html`<img src="${this.pageData.DPlink}">`:t.html`🐔`}
                  </div>

                  <input class="fileUploadOverlay" type="file" @change="${this.upload.bind(this)}"> 
                </div>

              
                <ul class="description">
                  <li> ${U.capital(this.pageData.fullName)} </li>
                </ul>


                <div id="bio">
                  ${this.bioInfo.map(e=>t.html` <span class="field">${e.field}</span><span class="value">${e.value}</span>  `)}
                </div>


                <div id="buttons">
                  <div id="roastButton">

                    ${this.buttons.map(e=>t.html` <a-button .buttonText="${e.buttonText}" .buttonType="${"buttons"}" contentId="${e._id}"></a-button>  `)}
                  </div>



                  <div class="mainButtons">

                    <a-button .buttonType="${"pages"}" .contentId="${this.title}"></a-button>

                    <a @click="${e.Link}" href="/addContent/${this.title}/${this.contentType}/meme" > + Meme </a>
                  </div>
                </div>
            </div>

            <div id="memes"> 
              ${this.memes.map(e=>t.html` <render-meme .viewType="${"collection"}" .memeData='${e}' >   </render-meme> `)}
            </div>



            </div>
            
            

            `:t.html`<center><h1>loading..</h1></center>`}
           

        
            
       
        
      `}}exports.aPage=a,customElements.define("a-page",a);
},{"./lit-element/lit-element.js":"fMX6","/routal.js":"z8hT","/aButton.js":"SxI5"}],"pDd9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.renderMeme=void 0;var e=require("./lit-element/lit-element.js"),t=require("/routal.js");class i extends e.LitElement{static get properties(){return{mouseMoving:Function,mouseRemoved:Function,mouseClicked:Function,memeData:Object,upload:Function,DPlink:String,showTemplate:Boolean,templateMemeSelected:Function,templateMemeLinks:Array,memeSearchQuery:String,viewType:String,memesLimit:Number,editmode:Boolean,firstUpdateFinished:Boolean}}constructor(){super(),this.showTemplate=!1,this.firstUpdateFinished=!1,this.centerElement=this.centerElement.bind(this),this.parentsVW=this.parentsVW.bind(this),this.memeSearchQuery="",this.memesLimit=10}async firstUpdated(){this.viewType||(this.viewType="meme");let e=await fetch("https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch="+this.memeData.pageTitle+"&gpslimit=20").then(e=>e.json());if(e.query&&(e=e.query.pages)[0].thumbnail){if(this.DPlink=e[0].thumbnail.source,0==this.DPlink.length)return console.log(this.DPlink,this.memeData.pageTitle,"page deleted");this.DPlink=this.DPlink[0].DPlink}}static get styles(){return e.css`

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
   
        `}centerElement(e,t,i){i.length<6||i.length>18||(e.width=13*i.length,e.left=(t.parentElement.offsetWidth-e.width)/2,e.left=e.left/t.parentElement.offsetWidth*100)}parentsVW(e){let t=this.shadowRoot.querySelector(".memeContainer");return console.log(t,this.memeData),(t?t.offsetWidth:500)*(e/100)}renderMeme(){let t=this.memeData.overlays,i=[],o=this.parentsVW(5);for(let n in t){let r=t[n];switch(void 0===r.rotate&&(r.rotate=0,this.centerElement(r,{parentElement:this.shadowRoot.querySelector(".overlays")},"type here")),void 0===r.width&&"text"==r.type&&(r.width=25),r.text||(r.text=""),r.type){case"text":i.push(e.html`
              
              
              
      
              
                    <div  
                    tabIndex="-1"
                    @mousedown='${this.mouseClicked}' @touchstart="${this.mouseClicked}"
                    data-index="${n}" 
                    style="${r.invertColor?"filter:invert(1);":""} width:auto; top:${r.top}%; left:${r.left}%; font-size:${r.scale*o}px; transform: rotate(${r.rotate}deg);" 
                    placeholder="type here" 
                    >${r.text}</div>
              
              
            
                    
                
                    
                    `);break;case"profilePhoto":i.push(e.html` <img ondragstart="return false;"  @touchstart='${this.mouseClicked}'   @mousedown='${this.mouseClicked}' data-index="${n}" src="${U.CDN(this.DPlink)}"  style="top:${r.top}%; left:${r.left}%; transform:scale(${r.scale}) rotate(${r.rotate}deg);"> `)}}return i}async renderCanvas(){let e=this.shadowRoot.querySelector(".memeContainer");domtoimage.toPng(e).then(function(e){(new Image).src=e,U.setMetaTag({property:"og:image"},{content:e})}).catch(function(e){console.warn("oops, something went wrong!",e.message)})}render(){let i=0;return this.firstUpdateFinished?e.html`
        <a class="memeContainer" data-editmode="${this.editmode}"   type="${this.viewType}">

        ${this.memeData.imageLink?e.html`
        
        ${"collection"==this.viewType?e.html`

            <img @click="${t.Link}" href="/meme/${this.memeData._id}" class='mainImage' @load="${this.renderCanvas.bind(this)}" src='${this.memeData.imageLink}'>

        `:e.html`
          
          <img class='mainImage' @load="${this.renderCanvas.bind(this)}" src='${this.memeData.imageLink}'>

        
        `}
        
        <div @touchend='${this.mouseRemoved}' @touchmove='${e=>{this.mouseMoving&&this.mouseMoving(e,this.shadowRoot)}}'   @mouseup='${this.mouseRemoved}'   @mousemove='${e=>{this.mouseMoving&&this.mouseMoving(e,this.shadowRoot)}}'  class="overlays">
        
          ${this.renderMeme.call(this)}
        
        </div>
        
        `:e.html` 
        
        <center class='addImage'>
            <input type="file" class="custom-file-input" @change="${this.upload}">
            <h3>OR</h3>
            <button @click="${()=>{this.chooseTemplate().then(()=>{whenToLoad(this.shadowRoot.querySelector(".memeTemplate"),()=>{console.log("increase limit"),this.memesLimit+=10})})}}"> Trending GIFS</button>
        </center>
        `}




        ${this.showTemplate?e.html`

            
            
            <div class='memeTemplate'>

              ${this.templateMemeLinks?e.html`
                  <input @keyup="${e=>{13===e.keyCode&&(this.memesLimit=10,this.memeSearchQuery=e.target.value,this.chooseTemplate(e.target.value))}}" placeholder="Search trending Gifs" value="${this.memeSearchQuery}">

                  ${this.templateMemeLinks.map(t=>(i+=1)>this.memesLimit?null:e.html`
                  <img data-src='${t.images.fixed_width.webp}' @click='${this.templateMemeSelected}' src='${t.images.fixed_width.webp}'>
                  `)}

                `:e.html`loading...`}    
            </div>
            
        
        
        `:e.html``}
        
        </a>
      `:(setTimeout(()=>{this.firstUpdateFinished=!0},10),e.html` <a class="memeContainer"   type="${this.viewType}"> </a>`)}}exports.renderMeme=i,customElements.define("render-meme",i);
},{"./lit-element/lit-element.js":"fMX6","/routal.js":"z8hT"}],"m9bf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.aMeme=void 0;var e=require("./lit-element/lit-element.js"),t=require("/routal.js"),i=require("/renderMeme.js");class n extends e.LitElement{static get properties(){return{memeId:{type:String},memeData:Object,renderMeme:Function}}firstUpdated(){this.memeData||U.query({$find:{on:"memes",where:{_id:this.memeId}}}).then(e=>{this.memeData=e[0],U.setMetaTag({property:"og:url"},{content:`http://roasta.upon.one/meme/${this.memeData._id}`}),U.setMetaTag({property:"og:title"},{content:"Roasted"})})}static get styles(){return e.css`

  
      #pageInfo button{
        float: right;
        margin-right: 0;
        line-height: 0;
        background: transparent;
        border: none;
        cursor: pointer;
        font-family: cursive;
        line-height: 0;
        margin-top: -10px;
        outline:none;
        font-size: 60px;
      }

      #pageInfo{
        margin-bottom: 7px;
        display: inline-block;
        width: 100%;
      }


      #response a{
        float: left;
        margin-left: 7px;
        text-decoration: none;
        color: #444;
        font-weight: 900;
        max-width: 60%;
        word-break: break-all;
        font-size: 24px;
      }


      #parent{
        display: inline-block;
        margin-bottom:14px;
        width:94vw;
        font-family:roboto;
      }

      a-button{
        float:right;
        margin-right: 40px;
        margin-top: -7px;
      }

      #response{
        margin-top:20px;
      }

      @media (min-width: 850px) {
        #parent {
          width: 400px;
        }
      }

      `}render(){return this.memeData?e.html`
      <div id="parent" >

  
 

        <render-meme .memeData='${this.memeData}' >   </render-meme>


 
        <div id="response">

          <a @click="${t.Link}" href="/page/${this.memeData.pageTitle}"> ${returnFirstName(this.memeData.pageTitle)} </a>

          <a-button 

            .contentType="${this.memeData.contentType}"
            .buttonType="${"memes"}" 
            .contentId="${this.memeData._id}">

          </a-button>
        </div>


      </div>
      `:e.html`<h2>Loading...</h2>`}}exports.aMeme=n,customElements.define("a-meme",n);
},{"./lit-element/lit-element.js":"fMX6","/routal.js":"z8hT","/renderMeme.js":"pDd9"}],"T8lM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.aSearch=void 0;var e=require("./lit-element/lit-element.js"),t=require("/routal.js"),r=require("/pageCard.js");class s extends e.LitElement{static get properties(){return{query:{type:String},pages:{type:Object}}}constructor(){super(),this.refresh=this.refresh.bind(this)}async refresh(){this.pages=await wikiSearch(this.query),this.pages=this.pages.query.search}updated(e){e.forEach((e,t)=>{"query"==t&&(this.pages=null,this.refresh())})}static get styles(){return e.css`

      #main{
        margin-top:50px;
      }

      *{
        font-family:roboto;
      }

      page-card{
        width:100%;
      } 

      @media (min-width:850px){
        #main{
          display:grid;
          place-items:center;
          grid-template-columns:33% 33% 33%;
          width:100vw;
        }

      
      }

      `}render(){return this.pages?e.html`
        <center id="main">  
        ${0==this.pages.length?e.html`
        
        <h1> Sorry can't find ${this.query}
        
        </h1>`:e.html``}
          
            ${this.pages.map(t=>e.html`

            <page-card .page='${t}'> </page-card>
            
            `)}
         
        </center>
      `:e.html`<center> <h1> Searching for ${this.query} </h1> </center>`}}exports.aSearch=s,customElements.define("a-search",s);
},{"./lit-element/lit-element.js":"fMX6","/routal.js":"z8hT","/pageCard.js":"dSsc"}],"SX05":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addContentHeader=void 0;var t=require("./lit-element/lit-element.js"),e=require("/routal.js");class n extends t.LitElement{static get properties(){return{pageTitle:{type:String},contentType:{type:String},currentTab:String}}ifActive(t){return t==this.currentTab}static get styles(){return t.css`
          #tabs button{
            background: no-repeat;
            border: none;
            font-size: 20px;
            padding:0;
            outline:none;
            margin-right:15px;

            color: #222;
            font-weight:200;
            cursor:pointer;
            font-family: roboto;
        }


        #tabs{
            margin-bottom:30px;
        }

        #tabs button[data-active="true"]{
            font-weight:900;
            color: rgb(255 63 63);;
        }
      `}render(){return t.html`
        <center>
            <div id="tabs">
                <button data-active=${this.ifActive("meme")} href="/addContent/${this.pageTitle}/${this.contentType}/meme" @click='${e.Link}'>Meme</button>
                <button data-active=${this.ifActive("bio")} href="/addContent/${this.pageTitle}/${this.contentType}/bio" @click='${e.Link}'>Bio</button>
                <button data-active=${this.ifActive("button")} href="/addContent/${this.pageTitle}/${this.contentType}/button" @click='${e.Link}'>Button</button>
            </div>
        </center>
        `}}exports.addContentHeader=n,customElements.define("add-content-header",n);
},{"./lit-element/lit-element.js":"fMX6","/routal.js":"z8hT"}],"GjwY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addMeme=void 0;var e=require("../lit-element/lit-element.js"),t=require("/routal.js"),i=require("/renderMeme.js");class s extends e.LitElement{static get properties(){return{contentType:String,selectedOverlayIndex:Number,pageTitle:String,mouseDown:Boolean,offsetX:Number,offsetY:Number,overlays:Object,imageLink:String,showTemplate:Boolean,templateMemeLinks:Array,previousCursorPosition:Object,publishButton:Object,textAreaDisplay:String}}constructor(){super(),this.overlays=[],this.previousCursorPosition={x:null,y:null},this.setPreviousCursorPosition=this.setPreviousCursorPosition.bind(this),this.textAreaDisplay="none"}updatePageTitle(e){window.timeout&&clearTimeout(window.timeout);let t=e.target.value;window.timeout=setTimeout(()=>{this.updatePageTitle2.call(this,t)},1e3)}async updatePageTitle2(t){if(this.pageTitle=t,!this.pageTitle)return;let i=await wikiSearch(this.pageTitle);if(i=i.query.search,console.log(this.pageTitle,i[0].title),!i.length)return this.publishButton=e.html``;this.pageTitle=i[0].title,this.publishButton=e.html`

      <button id="publishButton" @click="${this.publish.bind(this)}"> Publish to ${this.pageTitle} </button>
      `}firstUpdated(){this.mouseDown=!1,this.selectedOverlayIndex=null,"undefined"==this.pageTitle&&(this.pageTitle=""),U.query({$find:{on:"memes",where:{id:this.memeId}}}).then(e=>{this.memeData=e[0]}),this.updatePageTitle({target:{value:this.pageTitle}})}setPreviousCursorPosition(e){this.previousCursorPosition.x=e.clientX,this.previousCursorPosition.y=e.clientY}unify(e){if(e.changedTouches){e=e.changedTouches[0]}return e}mouseClicked(e){e.preventDefault(),e.stopPropagation(),e=this.unify(e),this.setPreviousCursorPosition(e);let t=e.target.parentElement.getBoundingClientRect(),i=e.target.getBoundingClientRect();this.offsetX=e.clientX-t.left-(i.left-t.left),this.offsetY=e.clientY-t.top-(i.top-t.top),this.mouseDown=!0,this.selectedOverlayIndex=e.target.dataset.index}mouseRemoved(e){e.preventDefault(),e.stopPropagation(),e=this.unify(e),this.mouseDown=!1}mouseMoving(e){if(e.preventDefault(),e.stopPropagation(),e=this.unify(e),!this.mouseDown)return;if(null==this.selectedOverlayIndex)return;let t=e.target.parentElement;let i=e.clientX-this.previousCursorPosition.x,s=e.clientY-this.previousCursorPosition.y;console.log(s,i);let o=(a=this.overlays[this.selectedOverlayIndex].left,r=this.overlays[this.selectedOverlayIndex].top,{x:t.offsetWidth*(a/100),y:t.offsetHeight*(r/100)});var a,r;let l=function(e,i){return{y:i/t.offsetHeight*100,x:e/t.offsetWidth*100}}(o.x+i,o.y+s);this.overlays[this.selectedOverlayIndex].top=l.y,this.overlays[this.selectedOverlayIndex].left=l.x,this.setPreviousCursorPosition(e),this.overlays=[...this.overlays]}updateOverlay(e){let t=this.overlays[this.selectedOverlayIndex];switch(e.target.innerText.toLowerCase().trim()){case"scale":if(t.scale>3)return void(t.scale=1);t.scale+=.25;break;case"-rotate":t.rotate-=20;break;case"+rotate":t.rotate+=20;break;case"delete":this.overlays.splice(this.selectedOverlayIndex,1),this.selectedOverlayIndex=null;break;case"invert color":t.invertColor=!t.invertColor}this.overlays=[...this.overlays],console.log(this.overlays)}processEditor(){return null==this.selectedOverlayIndex?e.html``:e.html`
        <button @click='${this.updateOverlay.bind(this)}'> Scale </button>
        <button @click='${this.updateOverlay.bind(this)}'> -Rotate</button>
        <button @click='${this.updateOverlay.bind(this)}'> +Rotate</button>
        <button @click='${this.updateOverlay.bind(this)}'> delete </button>
        <button @click='${this.updateOverlay.bind(this)}'> Invert Color </button>
      `}closeTextarea(){this.putOptions({type:"text",top:25,left:25,scale:1,text:this.shadowRoot.querySelector("textarea").value}),this.textareaValue="",this.textAreaDisplay="none"}putText(e){13!=e.keyCode?this.textareaValue=e.target.value:this.closeTextarea()}putOptions(e){this.overlays.push(e),this.overlays=[...this.overlays],this.selectedOverlayIndex=this.overlaylength}addOverlay(e){let t=e.target.dataset,i={type:t.type,top:25,left:25,scale:1};if("profilePhoto"!=t.type)return this.textareaValue="",this.textAreaDisplay="block";i.width=4,i.height=4,i.top=48,i.left=48,this.putOptions.call(this,i)}static get styles(){return e.css`

      `}async publish(){if(window.userLocation||(window.userLocation=await fetch("http://ip-api.com/json").then(e=>e.json())),!this.imageLink)return U.say("image is required");let e,i=U.say("publishing...");try{e=await U.query({$write:{on:"memes",put:{pageTitle:this.pageTitle,overlays:this.overlays,imageLink:this.imageLink,userLocation:userLocation}}})}catch(s){return i.kill(),U.login()}if(i.kill(),e.error)return U.say(e.error);(0,t.Link)(`/meme/${e._id}`)}async upload(e){let t=e.target.files[0],i=await U.compressImage(t),s=await U.upload(i,"memeImages");this.imageLink=U.CDN(s.url)}templateMemeSelected(e){this.showTemplate=!1,this.imageLink=e.target.dataset.src}chooseTemplate(e){return new Promise(t=>{let i="search";e||(e="",i="trending"),this.templateMemeLinks=null,this.showTemplate=!0,fetch("https://api.giphy.com/v1/gifs/"+i+"?&q="+e+"&limit=100&api_key=3mIxmBZUIIPyb8R69gtxaW8Hsh74dFKV").then(e=>e.json()).then(e=>{let i=e.data;this.templateMemeLinks=i,console.log(this.templateMemeLinks,e),t()})})}static get styles(){return e.css`

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

      `}render(){return e.html`
      <div id="container">
        <h3>Roast by creating meme</h3> 

        <div id="main">
          <render-meme .editmode="${!0}" .templateMemeLinks='${this.templateMemeLinks}'  .showTemplate=${this.showTemplate} .chooseTemplate='${this.chooseTemplate.bind(this)}' .templateMemeSelected='${this.templateMemeSelected.bind(this)}' .upload=${this.upload.bind(this)} .memeData='${{imageLink:this.imageLink,pageTitle:this.pageTitle,overlays:this.overlays}}' .mouseClicked="${this.mouseClicked.bind(this)}" .mouseRemoved="${this.mouseRemoved.bind(this)}" .mouseMoving="${this.mouseMoving.bind(this)}">        </render-meme>
          
         
          <textarea placeholder="Type Here" style="display:${this.textAreaDisplay}" @keyup="${this.putText.bind(this)}" value="${this.textareaValue}"></textarea>
          
          </div>
        <center class="editor">
        ${this.processEditor.call(this)}
        </center>

        <div class="addPanel">

        <button style="display:${this.textAreaDisplay}" @click="${this.closeTextarea.bind(this)}">Done</button>

          ${this.imageLink&&"none"==this.textAreaDisplay?e.html`
            <button @click="${this.addOverlay.bind(this)}" data-type="text"> + Text</button>
            <button @click="${this.addOverlay.bind(this)}" data-type="profilePhoto"> + Profile Photo</button>
          `:e.html``}



          
        </div>

        <center>
          Page: <input class="selectPageTitle" @keyup="${this.updatePageTitle.bind(this)}" value="${this.pageTitle}" placeholder="Where to publish?">
          <br>
            ${this.publishButton}
        </center>
      </div>
      `}}exports.addMeme=s,customElements.define("add-meme",s);
},{"../lit-element/lit-element.js":"fMX6","/routal.js":"z8hT","/renderMeme.js":"pDd9"}],"RKks":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addBio=void 0;var t=require("../lit-element/lit-element.js"),e=require("/routal.js");class i extends t.LitElement{static get properties(){return{pageTitle:{type:String},contentType:{type:String},textField:{type:String},textValue:{type:String}}}constructor(){super(),this.textField="",this.textValue=""}async publish(){let t=U.say("publishing...");try{let a=await U.query({$write:{on:"bioInfo",put:{pageTitle:this.pageTitle,contentType:this.contentType,field:this.textField,value:this.textValue}}});if(t.kill(),a.error)return;(0,e.Link)(`/page/${this.pageTitle}`)}catch(i){U.login()}}updateValue(t){"field"===t.target.dataset.type?this.textField=t.target.value:this.textValue=t.target.value}static get styles(){return t.css`

        #container{
          display:grid;
          place-items:center;
          font-family:roboto;
        }

        input,button{
          width: 62%;
          border: 1px solid #000;
          padding: 14px 21px;
          font-size: 20px;
          border-radius: 300px;
          margin: 12px 0;
          outline:none
      }

      button{
          border: none;
          background: #fe5542;
          color: #fff;
          padding: 12px 24px;
          display: inline-block;
          width: 67%;
      }

      `}render(){return t.html`
      <div id="container">
        <h3>Roast by Sarcastic Bio</h3>


        <input data-type="field" value=${this.textField} @keyup="${this.updateValue.bind(this)}" placeholder="field">
        <input data-type="value" value=${this.textValue} @keyup="${this.updateValue.bind(this)}" placeholder="value">

        <button @click="${this.publish.bind(this)}"> Add </button>

      </div>
      `}}exports.addBio=i,customElements.define("add-bio",i);
},{"../lit-element/lit-element.js":"fMX6","/routal.js":"z8hT"}],"DR2W":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addButton=void 0;var t=require("../lit-element/lit-element.js"),e=require("/routal.js");class i extends t.LitElement{static get properties(){return{pageTitle:{type:String},contentType:{type:String},buttonText:{type:String}}}constructor(){super(),this.buttonText=""}async publish(){if(!this.buttonText)return U.say("button text is required");try{await U.query({$write:{on:"buttons",put:{contentType:this.contentType,pageTitle:this.pageTitle,buttonText:this.buttonText}}}),(0,e.Link)(`/page/${this.pageTitle}`)}catch(t){U.login()}}updateValue(t){this.buttonText=t.target.value}static get styles(){return t.css`

        #container{
          display:grid;
          place-items:center;
          font-family:roboto;
        }

        input,button{
          width: 62%;
          border: 1px solid #000;
          padding: 14px 21px;
          font-size: 20px;
          border-radius: 300px;
          margin: 12px 0;
          outline:none
        }

        button{
            border: none;
            background: #fe5542;
            color: #fff;
            padding: 12px 24px;
            display: inline-block;
            width: 67%;
        }
      
      `}render(){return t.html`
      <div id="container">
    

        <input @keyup="${this.updateValue.bind(this)}" value="${this.buttonText}" placeholder="Roast by funny button">
        <button @click="${this.publish.bind(this)}"> Publish  </button>
      </div>
      `}}exports.addButton=i,customElements.define("add-button",i);
},{"../lit-element/lit-element.js":"fMX6","/routal.js":"z8hT"}],"UV2R":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addContent=void 0;var e=require("./lit-element/lit-element.js"),t=require("/routal.js"),n=require("/addContentHeader.js"),d=require("/addContentComponents/addMeme.js"),i=require("/addContentComponents/addBio.js"),a=require("/addContentComponents/addButton.js");class r extends e.LitElement{static get properties(){return{pageTitle:{type:String},contentType:{type:String},currentTab:String}}constructor(){super()}render(){let t=e.html``;if("undefined"==this.pageTitle)return e.html`<add-meme .pageTitle="${this.pageTitle}" .contentType="${this.contentType}" >  </add-meme>`;switch(this.currentTab){case"meme":t=e.html`<add-meme .pageTitle="${this.pageTitle}" .contentType="${this.contentType}" >  </add-meme>`;break;case"bio":t=e.html`<add-bio .pageTitle="${this.pageTitle}" .contentType="${this.contentType}" >  </add-bio>`;break;case"button":t=e.html`<add-button .pageTitle="${this.pageTitle}" .contentType="${this.contentType}" >  </add-button>`}return e.html`
      <p>
          <div id="tabs">
            <add-content-header .currentTab="${this.currentTab}" .pageTitle="${this.pageTitle}" .contentType="${this.contentType}" ></add-content-header>
          </div>
          
          <div id="container">
          ${t}
          </div>
      </p>
      `}}exports.addContent=r,customElements.define("add-content",r);
},{"./lit-element/lit-element.js":"fMX6","/routal.js":"z8hT","/addContentHeader.js":"SX05","/addContentComponents/addMeme.js":"GjwY","/addContentComponents/addBio.js":"RKks","/addContentComponents/addButton.js":"DR2W"}],"enjv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.listOfMemes=void 0;var e=require("./lit-element/lit-element.js"),t=require("/routal.js");class i extends e.LitElement{static get properties(){return{tab:{type:String},memes:{type:Object},loading:Boolean}}constructor(){super(),this.tab="forYou",this.memes=[],this.refresh=this.refresh.bind(this),U.readUser().then(e=>{e||(this.tab="trending"),this.refresh()})}async refresh(){this.loading=!0,window.userLocation||(window.userLocation=await fetch("http://ip-api.com/json").then(e=>e.json())),this.memes[0]=await U.collection("memes").find({"userLocation.city":userLocation.city},{sort:{createdAt:"descending"}}),this.memes[1]=await U.collection("memes").find({"userLocation.regionName":userLocation.regionName},{sort:{createdAt:"descending"}}),this.memes[2]=await U.collection("memes").find({"userLocation.country":userLocation.country},{sort:{createdAt:"descending"}}),this.memes[3]=await U.collection("memes").find(null,{sort:{createdAt:"descending"}}),console.log(this.memes),this.loading=!1}static get styles(){return e.css`
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

        `}render(){if(this.loading)return e.html`<h3>Loading...</h3>`;let t=[];return e.html`
        <div id="container">
            <div id='memes'>
            ${(()=>{let i=[];for(let o of this.memes)o.map(o=>{let n,s;"string"==typeof o?n=o:(n=o._id,s=o),t.includes(n)||(t.push(n),i.push(e.html` <a-meme .contentId=${n} .memeData=${s}> </a-meme>`))});return i})()}
            </div>
        </div>
        `}}exports.listOfMemes=i,customElements.define("list-of-memes",i);
},{"./lit-element/lit-element.js":"fMX6","/routal.js":"z8hT"}],"gUQ1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.senseOfHumour=void 0;var e=require("./lit-element/lit-element.js"),t=require("/routal.js");class r extends e.LitElement{static get properties(){return{score:Number,user:Object}}constructor(){super(),this.score=null,U.readUser().then(e=>{e&&(this.user=e,U.query({$count:{on:"actions",where:{receiver:"$user.id"}}}).then(e=>{this.score=e}).catch(e=>{this.score=null}))})}static get styles(){return e.css`
        h3{
            text-align:center;
            font-family:roboto;
            font-weight:100;
        }
      `}render(){if(null!==this.score)return e.html`<h3> Your Sense of humor: ${this.score} </h3> `}}exports.senseOfHumour=r,customElements.define("sense-of-humour",r);
},{"./lit-element/lit-element.js":"fMX6","/routal.js":"z8hT"}],"AgpF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.mainContainer=void 0;var e=require("./lit-element/lit-element.js"),t=require("/routal.js"),r=require("/createPage.js"),n=require("/aPage.js"),o=require("/aMeme.js"),a=require("/aSearch.js"),i=require("/addContent.js"),s=require("/listOfMemes.js"),p=require("/senseOfHumour.js");class m extends e.LitElement{static get properties(){return{routeComponent:{type:Object}}}constructor(){super()}firstUpdated(){let r=[{pattern:"/",transitionType:"slide",transitionAxis:"x",component:()=>e.html`
            <sense-of-humour>  </sense-of-humour>
            <list-of-memes></list-of-memes>
        `},{pattern:"/search/:query",component:t=>e.html`<a-search .query="${t.params.query}"> </a-search>`},{pattern:"/meme/:id",component:t=>e.html`<br><br><center><a-meme .memeId="${t.params.id}"> </a-meme></center>`},{pattern:"/page/:title",component:t=>(console.log(t),e.html`<a-page .title="${t.params.title}"> </a-page>`)},{pattern:"/createPage",component:t=>e.html`<create-page > </create-page>`},{pattern:"/addContent/:pageTitle/:contentType/:tab",component:t=>e.html` <add-content .currentTab="${t.params.tab}" .contentType="${t.params.contentType}" .pageTitle="${t.params.pageTitle}"> </add-content>`}];setTimeout(()=>{t.Routal.setup(r,e=>{this.routeComponent=e},this.shadowRoot.querySelector("#container"))},100)}static get styles(){return e.css`

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
    `}render(){return e.html`
      <div id='container'>${this.routeComponent}</div>

      <a href="/addContent/undefined/roast/meme" class="floatButton" @click="${t.Link}"> + Meme</a>
    `}}exports.mainContainer=m,customElements.define("main-container",m);
},{"./lit-element/lit-element.js":"fMX6","/routal.js":"z8hT","/createPage.js":"nzKe","/aPage.js":"bKVv","/aMeme.js":"m9bf","/aSearch.js":"T8lM","/addContent.js":"UV2R","/listOfMemes.js":"enjv","/senseOfHumour.js":"gUQ1"}],"Focm":[function(require,module,exports) {
"use strict";var e=require("./lit-element/lit-element.js"),r=require("/routal.js"),i=require("/header.js"),t=require("/mainContainer.js");
},{"./lit-element/lit-element.js":"fMX6","/routal.js":"z8hT","/header.js":"cJDT","/mainContainer.js":"AgpF"}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map