var te=Object.defineProperty;var ee=(o,t,i)=>t in o?te(o,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[t]=i;var w=(o,t,i)=>ee(o,typeof t!="symbol"?t+"":t,i);var F=globalThis,q=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,nt=Symbol(),$t=new WeakMap,L=class{constructor(t,i,s){if(this._$cssResult$=!0,s!==nt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o,i=this.t;if(q&&t===void 0){let s=i!==void 0&&i.length===1;s&&(t=$t.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&$t.set(i,t))}return t}toString(){return this.cssText}},kt=o=>new L(typeof o=="string"?o:o+"",void 0,nt),M=(o,...t)=>{let i=o.length===1?o[0]:t.reduce((s,e,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+o[n+1],o[0]);return new L(i,o,nt)},St=(o,t)=>{if(q)o.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(let i of t){let s=document.createElement("style"),e=F.litNonce;e!==void 0&&s.setAttribute("nonce",e),s.textContent=i.cssText,o.appendChild(s)}},ot=q?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let i="";for(let s of t.cssRules)i+=s.cssText;return kt(i)})(o):o;var{is:ie,defineProperty:se,getOwnPropertyDescriptor:ne,getOwnPropertyNames:oe,getOwnPropertySymbols:re,getPrototypeOf:ae}=Object,Z=globalThis,At=Z.trustedTypes,le=At?At.emptyScript:"",ce=Z.reactiveElementPolyfillSupport,N=(o,t)=>o,rt={toAttribute(o,t){switch(t){case Boolean:o=o?le:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let i=o;switch(t){case Boolean:i=o!==null;break;case Number:i=o===null?null:Number(o);break;case Object:case Array:try{i=JSON.parse(o)}catch{i=null}}return i}},Ct=(o,t)=>!ie(o,t),Et={attribute:!0,type:String,converter:rt,reflect:!1,useDefault:!1,hasChanged:Ct};Symbol.metadata??=Symbol("metadata"),Z.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=Et){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){let s=Symbol(),e=this.getPropertyDescriptor(t,s,i);e!==void 0&&se(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){let{get:e,set:n}=ne(this.prototype,t)??{get(){return this[i]},set(r){this[i]=r}};return{get:e,set(r){let a=e?.call(this);n?.call(this,r),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Et}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;let t=ae(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){let i=this.properties,s=[...oe(i),...re(i)];for(let e of s)this.createProperty(e,i[e])}let t=this[Symbol.metadata];if(t!==null){let i=litPropertyMetadata.get(t);if(i!==void 0)for(let[s,e]of i)this.elementProperties.set(s,e)}this._$Eh=new Map;for(let[i,s]of this.elementProperties){let e=this._$Eu(i,s);e!==void 0&&this._$Eh.set(e,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let i=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let e of s)i.unshift(ot(e))}else t!==void 0&&i.push(ot(t));return i}static _$Eu(t,i){let s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,i=this.constructor.elementProperties;for(let s of i.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return St(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$ET(t,i){let s=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,s);if(e!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:rt).toAttribute(i,s.type);this._$Em=t,n==null?this.removeAttribute(e):this.setAttribute(e,n),this._$Em=null}}_$AK(t,i){let s=this.constructor,e=s._$Eh.get(t);if(e!==void 0&&this._$Em!==e){let n=s.getPropertyOptions(e),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:rt;this._$Em=e;let a=r.fromAttribute(i,n.type);this[e]=a??this._$Ej?.get(e)??a,this._$Em=null}}requestUpdate(t,i,s,e=!1,n){if(t!==void 0){let r=this.constructor;if(e===!1&&(n=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??Ct)(n,i)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,i,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:s,reflect:e,wrapped:n},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??i??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(i=void 0),this._$AL.set(t,i)),e===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,n]of this._$Ep)this[e]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[e,n]of s){let{wrapped:r}=n,a=this[e];r!==!0||this._$AL.has(e)||a===void 0||this.C(e,void 0,n,a)}}let t=!1,i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(i)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(i=>this._$ET(i,this[i])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[N("elementProperties")]=new Map,y[N("finalized")]=new Map,ce?.({ReactiveElement:y}),(Z.reactiveElementVersions??=[]).push("2.1.2");var ut=globalThis,Tt=o=>o,G=ut.trustedTypes,zt=G?G.createPolicy("lit-html",{createHTML:o=>o}):void 0,Ht="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,Dt="?"+x,he=`<${Dt}>`,S=document,O=()=>S.createComment(""),H=o=>o===null||typeof o!="object"&&typeof o!="function",ft=Array.isArray,de=o=>ft(o)||typeof o?.[Symbol.iterator]=="function",at=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Lt=/-->/g,Mt=/>/g,$=RegExp(`>|${at}(?:([^\\s"'>=/]+)(${at}*=${at}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Nt=/'/g,Pt=/"/g,Rt=/^(?:script|style|textarea|title)$/i,mt=o=>(t,...i)=>({_$litType$:o,strings:t,values:i}),d=mt(1),_t=mt(2),Ve=mt(3),A=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Ot=new WeakMap,k=S.createTreeWalker(S,129);function Wt(o,t){if(!ft(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return zt!==void 0?zt.createHTML(t):t}var pe=(o,t)=>{let i=o.length-1,s=[],e,n=t===2?"<svg>":t===3?"<math>":"",r=P;for(let a=0;a<i;a++){let l=o[a],c,u,h=-1,f=0;for(;f<l.length&&(r.lastIndex=f,u=r.exec(l),u!==null);)f=r.lastIndex,r===P?u[1]==="!--"?r=Lt:u[1]!==void 0?r=Mt:u[2]!==void 0?(Rt.test(u[2])&&(e=RegExp("</"+u[2],"g")),r=$):u[3]!==void 0&&(r=$):r===$?u[0]===">"?(r=e??P,h=-1):u[1]===void 0?h=-2:(h=r.lastIndex-u[2].length,c=u[1],r=u[3]===void 0?$:u[3]==='"'?Pt:Nt):r===Pt||r===Nt?r=$:r===Lt||r===Mt?r=P:(r=$,e=void 0);let _=r===$&&o[a+1].startsWith("/>")?" ":"";n+=r===P?l+he:h>=0?(s.push(c),l.slice(0,h)+Ht+l.slice(h)+x+_):l+x+(h===-2?a:_)}return[Wt(o,n+(o[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},D=class o{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let n=0,r=0,a=t.length-1,l=this.parts,[c,u]=pe(t,i);if(this.el=o.createElement(c,s),k.currentNode=this.el.content,i===2||i===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(e=k.nextNode())!==null&&l.length<a;){if(e.nodeType===1){if(e.hasAttributes())for(let h of e.getAttributeNames())if(h.endsWith(Ht)){let f=u[r++],_=e.getAttribute(h).split(x),C=/([.?@])?(.*)/.exec(f);l.push({type:1,index:n,name:C[2],strings:_,ctor:C[1]==="."?ct:C[1]==="?"?ht:C[1]==="@"?dt:z}),e.removeAttribute(h)}else h.startsWith(x)&&(l.push({type:6,index:n}),e.removeAttribute(h));if(Rt.test(e.tagName)){let h=e.textContent.split(x),f=h.length-1;if(f>0){e.textContent=G?G.emptyScript:"";for(let _=0;_<f;_++)e.append(h[_],O()),k.nextNode(),l.push({type:2,index:++n});e.append(h[f],O())}}}else if(e.nodeType===8)if(e.data===Dt)l.push({type:2,index:n});else{let h=-1;for(;(h=e.data.indexOf(x,h+1))!==-1;)l.push({type:7,index:n}),h+=x.length-1}n++}}static createElement(t,i){let s=S.createElement("template");return s.innerHTML=t,s}};function T(o,t,i=o,s){if(t===A)return t;let e=s!==void 0?i._$Co?.[s]:i._$Cl,n=H(t)?void 0:t._$litDirective$;return e?.constructor!==n&&(e?._$AO?.(!1),n===void 0?e=void 0:(e=new n(o),e._$AT(o,i,s)),s!==void 0?(i._$Co??=[])[s]=e:i._$Cl=e),e!==void 0&&(t=T(o,e._$AS(o,t.values),e,s)),t}var lt=class{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??S).importNode(i,!0);k.currentNode=e;let n=k.nextNode(),r=0,a=0,l=s[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new R(n,n.nextSibling,this,t):l.type===1?c=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(c=new pt(n,this,t)),this._$AV.push(c),l=s[++a]}r!==l?.index&&(n=k.nextNode(),r++)}return k.currentNode=S,e}p(t){let i=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}},R=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=T(this,t,i),H(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):de(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){let{values:i,_$litType$:s}=t,e=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=D.createElement(Wt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{let n=new lt(e,this),r=n.u(this.options);n.p(i),this.T(r),this._$AH=n}}_$AC(t){let i=Ot.get(t.strings);return i===void 0&&Ot.set(t.strings,i=new D(t)),i}k(t){ft(this._$AH)||(this._$AH=[],this._$AR());let i=this._$AH,s,e=0;for(let n of t)e===i.length?i.push(s=new o(this.O(O()),this.O(O()),this,this.options)):s=i[e],s._$AI(n),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){let s=Tt(t).nextSibling;Tt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,i=this,s,e){let n=this.strings,r=!1;if(n===void 0)t=T(this,t,i,0),r=!H(t)||t!==this._$AH&&t!==A,r&&(this._$AH=t);else{let a=t,l,c;for(t=n[0],l=0;l<n.length-1;l++)c=T(this,a[s+l],i,l),c===A&&(c=this._$AH[l]),r||=!H(c)||c!==this._$AH[l],c===p?t=p:t!==p&&(t+=(c??"")+n[l+1]),this._$AH[l]=c}r&&!e&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ct=class extends z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},ht=class extends z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},dt=class extends z{constructor(t,i,s,e,n){super(t,i,s,e,n),this.type=5}_$AI(t,i=this){if((t=T(this,t,i,0)??p)===A)return;let s=this._$AH,e=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==p&&(s===p||e);e&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},pt=class{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){T(this,t)}};var ue=ut.litHtmlPolyfillSupport;ue?.(D,R),(ut.litHtmlVersions??=[]).push("3.3.3");var W=(o,t,i)=>{let s=i?.renderBefore??t,e=s._$litPart$;if(e===void 0){let n=i?.renderBefore??null;s._$litPart$=e=new R(t.insertBefore(O(),n),n,void 0,i??{})}return e._$AI(o),e};var bt=globalThis,v=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=W(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};v._$litElement$=!0,v.finalized=!0,bt.litElementHydrateSupport?.({LitElement:v});var fe=bt.litElementPolyfillSupport;fe?.({LitElement:v});(bt.litElementVersions??=[]).push("4.2.2");var b={temperature:{label:"Temperatur",icon:"mdi:thermometer",deviceClass:"temperature"},humidity:{label:"Luftfeuchte",icon:"mdi:water-percent",deviceClass:"humidity"},power:{label:"Leistung (Summe)",icon:"mdi:flash",deviceClass:"power"},entity:{label:"Beliebiger Sensor",icon:"mdi:eye"}},Ut=[{type:"temperature"},{type:"humidity"},{type:"power"}],me={mW:.001,W:1,kW:1e3,MW:1e6,GW:1e9},It=o=>o&&!["unavailable","unknown"].includes(o.state),Y=o=>It(o)&&o.state!==""&&!Number.isNaN(Number(o.state));function _e(o){let t=o.locale?.language||o.language||"de";switch(o.locale?.number_format){case"comma_decimal":return["en-US","en"];case"decimal_comma":return["de","es","it"];case"space_comma":return["fr","sv","cs"];case"system":return;default:return t}}function Bt(o,t,i=1){return new Intl.NumberFormat(_e(o),{maximumFractionDigits:i}).format(t)}var gt=(o,t)=>t?`${o}${t==="\xB0"?"":" "}${t}`:o;function E(o,t){if(It(t))return typeof o.formatEntityState=="function"?o.formatEntityState(t):gt(t.state,t.attributes.unit_of_measurement)}function X(o,t,i){if(!o||!t)return[];let s=[];for(let[e,n]of Object.entries(o.entities||{})){if(!e.startsWith("sensor.")||n.entity_category||n.hidden||(n.area_id||(n.device_id?o.devices?.[n.device_id]?.area_id:void 0))!==t)continue;let a=o.states[e];a&&(i&&a.attributes.device_class!==i||s.push(e))}return s}function be(o){let t=[...o].sort((s,e)=>s-e),i=Math.floor(t.length/2);return t.length%2?t[i]:(t[i-1]+t[i])/2}function vt(o,t,i){let s=new Set(i.exclude||[]),e=X(o,t,"power").filter(n=>!s.has(n));for(let n of i.include||[])!e.includes(n)&&!s.has(n)&&e.push(n);return e}function yt(o,t){let i=0,s=0;for(let e of t){let n=o.states[e];if(!Y(n))continue;let r=me[n.attributes.unit_of_measurement]??1;i+=Number(n.state)*r,s++}return s?i:void 0}function U(o,t){return gt(Bt(o,t),"W")}function J(o,t,i){let s=b[i.type]?i.type:"entity",e=i.icon||b[s].icon;if(s==="entity"){let l=i.entity?o.states[i.entity]:void 0;return{text:E(o,l),icon:i.icon||l?.attributes.icon||b.entity.icon}}if(s==="power"){let l=yt(o,vt(o,t.area_id,i));return{text:l===void 0?void 0:U(o,l),icon:e}}let n=i.entity||t[`${s}_entity_id`];if(n)return{text:E(o,o.states[n]),icon:e};let r=[],a;for(let l of X(o,t.area_id,b[s].deviceClass)){let c=o.states[l];if(!Y(c))continue;let u=c.attributes.unit_of_measurement;a??=u,u===a&&r.push(Number(c.state))}return r.length?{text:gt(Bt(o,be(r)),a),icon:e}:{text:void 0,icon:e}}function g(o){return Array.isArray(o?.sensors)?o.sensors:(o?.sensor_classes||["temperature","humidity"]).filter(i=>b[i]&&i!=="entity").map(i=>({type:i}))}function I(o,t,i){return!o||!t?[]:Object.entries(o.entities||{}).filter(([s,e])=>!s.startsWith(`${i}.`)||e.entity_category||e.hidden?!1:(e.area_id||(e.device_id?o.devices?.[e.device_id]?.area_id:void 0))===t&&o.states[s]).map(([s])=>s)}function Q(o,t){let i=I(o,t,"climate");return i.find(s=>o.states[s].attributes.hvac_modes?.includes("cool"))||i[0]}function tt(o,t){let i=o.entities?.[t]?.device_id;if(!i)return;let s=Object.entries(o.entities).filter(([e,n])=>n.device_id===i&&e.startsWith("sensor.")&&o.states[e]?.attributes.device_class==="power").map(([e])=>e);return s.find(e=>!/mittel|avg|average|mean/i.test(e))||s[0]}var m=Math.PI/180;function B(o,t,i){let s=o.getTime()/864e5+24405875e-1-2451545,e=(357.529+.98560028*s)%360,r=(280.459+.98564736*s)%360+1.915*Math.sin(e*m)+.02*Math.sin(2*e*m),a=23.439-36e-8*s,l=Math.atan2(Math.cos(a*m)*Math.sin(r*m),Math.cos(r*m))/m,c=Math.asin(Math.sin(a*m)*Math.sin(r*m))/m,h=((((18.697374558+24.06570982441908*s)%24+24)%24*15+i-l)%360+540)%360-180,f=Math.asin(Math.sin(t*m)*Math.sin(c*m)+Math.cos(t*m)*Math.cos(c*m)*Math.cos(h*m))/m;return{az:(Math.atan2(-Math.sin(h*m),Math.tan(c*m)*Math.cos(t*m)-Math.sin(t*m)*Math.cos(h*m))/m+360)%360,el:f}}var wt=(o,t)=>Math.abs((o-t+540)%360-180),ge=["Nord","Nordnordost","Nordost","Ostnordost","Ost","Osts\xFCdost","S\xFCdost","S\xFCds\xFCdost","S\xFCd","S\xFCds\xFCdwest","S\xFCdwest","Wests\xFCdwest","West","Westnordwest","Nordwest","Nordnordwest"],it=o=>ge[Math.round(o/22.5)%16],j={position:30,lux_threshold:2e4,spread:70,min_elevation:5,reopen:!0,reopen_position:100};function et(o,t){return o.el>t.min_elevation&&wt(o.az,t.direction)<t.spread}function jt(o,t,i,s,e=j){let n={...j,...e,direction:s},r=[],a=null;for(let l=0;l<=1440;l+=5){let c=new Date(o.getFullYear(),o.getMonth(),o.getDate(),0,l),u=et(B(c,t,i),n);u&&!a&&(a=c),!u&&a&&(r.push([a,c]),a=null)}return r}function Vt(o,t,i,s){if(!t||t.enabled===!1||typeof t.direction!="number"||typeof i!="number")return null;let e={...j,...t},n=o.config?.latitude,r=o.config?.longitude;if(typeof n!="number"||typeof r!="number")return null;let a=new Date,l=B(a,n,r),c=!0;if(e.lux_entity){let f=Number(o.states[e.lux_entity]?.state);c=!Number.isNaN(f)&&f>=e.lux_threshold}else e.weather_entity&&(c=["sunny","partlycloudy","clear-day"].includes(o.states[e.weather_entity]?.state));let u=typeof e.min_temp!="number"||typeof s=="number"&&s>=e.min_temp;if(et(l,e)&&c&&u&&i>e.position+2)return{kind:"close",target:e.position};if(!et(l,e)&&e.reopen&&l.el>0){let f=B(new Date(a.getTime()-54e5),n,r),_=Math.abs(i-e.position)<=5;if(et(f,e)&&_&&i<e.reopen_position-2)return{kind:"open",target:e.reopen_position}}return null}var ve={cool:"mdi:snowflake",heat:"mdi:fire",heat_cool:"mdi:sun-snowflake-variant",auto:"mdi:thermostat-auto",dry:"mdi:water-percent",fan_only:"mdi:fan",off:"mdi:power"},ye={cool:"K\xFChlen",heat:"Heizen",heat_cool:"Heizen/K\xFChlen",auto:"Automatik",dry:"Entfeuchten",fan_only:"L\xFCften",off:"Aus"},Kt=o=>ve[o]||"mdi:thermostat",we=o=>ye[o]||o,Ft=o=>o.toLocaleString("de-DE",{minimumFractionDigits:1,maximumFractionDigits:1});function xe(o){let t=[],i=o._sunTip();i&&t.push(d`<button
      class="bkp-pill sun"
      @click=${e=>o._openView(e,"shutter")}
    >
      <ha-icon icon="mdi:white-balance-sunny"></ha-icon>
      ${i.kind==="close"?`Sonnenschutz ${i.target} %?`:"Wieder \xF6ffnen?"}
    </button>`);let s=o._climate();if(s){let e=s.st.state!=="off";t.push(d`<button
      class="bkp-pill climate ${e?`on m-${s.st.state}`:""}"
      @click=${n=>o._openView(n,"climate")}
    >
      <ha-icon .icon=${e?Kt(s.st.state):"mdi:air-conditioner"}></ha-icon>
      ${e?d`${typeof s.target=="number"?`${Ft(s.target)}\xB0`:""}${s.power?d`<span class="dot">·</span>${s.power}`:p}`:"Klima aus"}
    </button>`)}return t.length?d`<div class="bkp-pills">${t}</div>`:p}function $e(o,t){let s=100-o._shownPos(t);return d`<div
    class="bkp-win ${t.canSet?"drag":""}"
    @pointerdown=${e=>o._windowDown(e)}
    title=${t.canSet?"Ziehen, um die H\xF6he einzustellen":""}
  >
    <div class="bkp-outside"></div>
    <div class="bkp-shutter" style="height:${s}%"></div>
    ${t.canSet?d`<div class="bkp-grip" style="top:${s}%"></div>`:p}
  </div>`}function ke(o){let t=o._cover();if(!t)return p;let i=o._sunTip(),s=o._shownPos(t),e=s===0?"geschlossen":s===100?"ganz offen":"offen",n;return i?.kind==="close"?n=d`<small>Sonne steht auf dem Fenster</small>
      <b>Empfohlen ${i.target} %</b>
      <small>jetzt ${s} % offen</small>
      <button class="bkp-cta" @click=${()=>o._coverTo(i.target)}>
        Übernehmen
      </button>`:i?.kind==="open"?n=d`<small>Die Sonne ist weg</small>
      <b>Wieder öffnen?</b>
      <small>jetzt ${s} % offen</small>
      <button class="bkp-cta" @click=${()=>o._coverTo(i.target)}>
        Auf ${i.target} %
      </button>`:n=d`<div class="bkp-num">${s}<span>%</span></div>
      <small>${t.moving?t.st.state==="opening"?"f\xE4hrt hoch \u2026":"f\xE4hrt runter \u2026":e}</small>
      <div class="bkp-row">
        <button class="bkp-rb" title="Auf" @click=${()=>o._coverCmd("open_cover")}>
          <ha-icon icon="mdi:arrow-up"></ha-icon>
        </button>
        <button class="bkp-rb" title="Stopp" @click=${()=>o._coverCmd("stop_cover")}>
          <ha-icon icon="mdi:stop"></ha-icon>
        </button>
        <button class="bkp-rb" title="Zu" @click=${()=>o._coverCmd("close_cover")}>
          <ha-icon icon="mdi:arrow-down"></ha-icon>
        </button>
      </div>`,d`<div class="bkp-view bkp-shutterview ${i?"sunny":""}">
    ${$e(o,t)}
    <div class="bkp-side">${n}</div>
  </div>`}function Se(o,t){let i=o._history?.points;if(!i||i.length<2)return d`<div class="bkp-hist"><small>Leistung</small><div class="bkp-hist-empty">
      ${o._history?.error?"kein Verlauf":"l\xE4dt \u2026"}
    </div></div>`;let s=i[0][0],e=i[i.length-1][0],n=Math.max(...i.map(c=>c[1]),1),r=c=>(c-s)/Math.max(e-s,1)*100,a=c=>38-c/n*34,l=`M0,${a(i[0][1]).toFixed(1)}`;for(let c=1;c<i.length;c++)l+=` H${r(i[c][0]).toFixed(1)} V${a(i[c][1]).toFixed(1)}`;return l+=" H100",d`<div class="bkp-hist">
    <small>Leistung · ${o._climateCfg().history_hours} h</small>
    <svg viewBox="0 0 100 40" preserveAspectRatio="none">
      ${_t`<path class="area" d="${l} V40 H0 Z"></path><path class="line" d="${l}"></path>`}
    </svg>
    <small class="max">max ${o._formatWatt(n)}</small>
  </div>`}function Ae(o){let t=o._climate();if(!t)return p;let i=o._climateCfg(),s=t.st,e=s.state,n=e!=="off",r=s.attributes.hvac_action,a=n&&(!r||!["idle","off"].includes(r)),l=o._pendingTarget??t.target,c=(s.attributes.hvac_modes||[]).filter(u=>u!=="off");return d`<div
    class="bkp-view bkp-climateview m-${n?e:"off"} ${i.show_history?"with-hist":""}"
  >
    <div class="bkp-stage">
      <div class="bkp-unit"><i></i></div>
      ${a?d`<svg class="bkp-air" viewBox="0 0 100 60" aria-hidden="true">
            ${_t`<path d="M28,4 C24,18 34,26 29,40"></path>
              <path d="M50,4 C46,18 56,26 51,40"></path>
              <path d="M72,4 C68,18 78,26 73,40"></path>`}
          </svg>`:p}
    </div>
    <span class="bkp-chip">
      ${n?we(e):"Aus"}${t.power?d` · ${t.power}`:p}${n&&r==="idle"?" \xB7 wartet":""}
    </span>
    ${i.show_history?Se(o,t):p}
    <div class="bkp-bar">
      <button
        class="bkp-rb ${n?"power-on":""}"
        title=${n?"Ausschalten":"Einschalten"}
        @click=${()=>o._climateToggle()}
      >
        <ha-icon icon="mdi:power"></ha-icon>
      </button>
      <button class="bkp-rb flat" title="Kälter" ?disabled=${typeof l!="number"} @click=${()=>o._climateStep(-1)}>
        <ha-icon icon="mdi:minus"></ha-icon>
      </button>
      <span class="bkp-target">${typeof l=="number"?d`${Ft(l)}<span class="unit"> °C</span>`:"\u2013"}</span>
      <button class="bkp-rb flat" title="Wärmer" ?disabled=${typeof l!="number"} @click=${()=>o._climateStep(1)}>
        <ha-icon icon="mdi:plus"></ha-icon>
      </button>
      <button
        class="bkp-rb flat"
        title="Betriebsart wechseln"
        ?disabled=${c.length<2&&n}
        @click=${()=>o._climateCycle(c)}
      >
        <ha-icon .icon=${Kt(n?e:c[0])}></ha-icon>
      </button>
    </div>
  </div>`}function qt(o){let t=o._view;return d`
    ${t==="home"?xe(o):p}
    ${t!=="home"?d`<div class="bkp-layer" @pointerdown=${()=>o._bump()}>
          ${t==="shutter"?ke(o):Ae(o)}
          <button class="bkp-close" title="Zurück zum Bild" @click=${()=>o._setView("home")}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
          ${o._sticky()?p:d`<div class="bkp-timer" style="--bkp-t:${o._timeout()}s"></div>`}
        </div>`:p}
  `}var Zt=`
  .bkp-overlay { position: absolute; inset: 0; z-index: 2; pointer-events: none; font-family: var(--ha-font-family-body, Roboto, sans-serif); }
  .bkp-overlay button { font: inherit; cursor: pointer; }
  .bkp-overlay ha-icon { --mdc-icon-size: 18px; display: inline-flex; }
  .bkp-pills { position: absolute; top: 8px; right: 8px; display: flex; flex-direction: column; align-items: flex-end; gap: 6px; pointer-events: auto; }
  .bkp-pill { display: inline-flex; align-items: center; gap: 4px; border: 0; border-radius: 999px; padding: 5px 10px 5px 8px; font-size: 12px; font-weight: 500; background: rgb(255 255 255 / 0.85); color: #2d3440; box-shadow: 0 1px 4px rgb(0 0 0 / 0.18); backdrop-filter: blur(6px); }
  .bkp-pill ha-icon { --mdc-icon-size: 16px; }
  .bkp-pill .dot { margin: 0 2px; }
  .bkp-pill.climate.on { color: #fff; background: #2f86d4; }
  .bkp-pill.climate.on.m-heat { background: #e2692f; }
  .bkp-pill.climate.on.m-auto, .bkp-pill.climate.on.m-heat_cool { background: #6b55c9; }
  .bkp-pill.climate.on.m-dry, .bkp-pill.climate.on.m-fan_only { background: #2a9d8f; }
  .bkp-pill.sun { background: #ffd56b; color: #4a3510; }

  .bkp-layer { position: absolute; inset: 0; pointer-events: auto; animation: bkp-in 0.25s ease-out; }
  @keyframes bkp-in { from { opacity: 0; } to { opacity: 1; } }
  .bkp-view { position: absolute; inset: 0; overflow: hidden; container-type: inline-size; }
  .bkp-close { position: absolute; top: 8px; right: 8px; z-index: 3; width: 28px; height: 28px; border-radius: 50%; border: 0; display: grid; place-items: center; background: rgb(0 0 0 / 0.3); color: #fff; }
  .bkp-close ha-icon { --mdc-icon-size: 16px; }
  .bkp-timer { position: absolute; left: 0; bottom: 0; height: 3px; background: var(--primary-color); z-index: 3; animation: bkp-count var(--bkp-t, 20s) linear forwards; }
  @keyframes bkp-count { from { width: 100%; } to { width: 0; } }

  .bkp-rb { width: 36px; height: 36px; border-radius: 50%; border: 0; display: grid; place-items: center; background: #fff; color: #2d3440; box-shadow: 0 1px 2px rgb(0 0 0 / 0.12); flex: none; }
  .bkp-rb:disabled { opacity: 0.4; cursor: default; }
  .bkp-rb:active { transform: scale(0.94); }
  .bkp-row { display: flex; gap: 8px; }

  /* Rollladen */
  .bkp-shutterview { background: #ece6dd; color: #3a342b; display: flex; align-items: center; gap: 6%; padding: 0 6%; box-sizing: border-box; }
  .bkp-shutterview.sunny { background: linear-gradient(135deg, #fff1cf, #ffd497); color: #4a3510; }
  .bkp-shutterview.sunny::before { content: ""; position: absolute; right: -24px; top: -24px; width: 96px; height: 96px; border-radius: 50%; background: radial-gradient(circle, #fff6c9 35%, rgb(255 214 102 / 0.6) 36%, transparent 70%); }
  .bkp-win { position: relative; height: 80%; aspect-ratio: 4 / 5; border: 6px solid #fff; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 8px rgb(0 0 0 / 0.14); flex: none; touch-action: none; }
  .bkp-win.drag { cursor: ns-resize; }
  .bkp-outside { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 38% at 25% 104%, #77a95f 60%, transparent 61%), radial-gradient(ellipse 70% 32% at 88% 104%, #5d9450 60%, transparent 61%), linear-gradient(#8ec5f2, #dcefff); }
  .bkp-win::after { content: ""; position: absolute; left: 50%; top: 0; bottom: 0; width: 4px; margin-left: -2px; background: #fff; z-index: 1; }
  .bkp-shutter { position: absolute; left: 0; right: 0; top: 0; z-index: 2; background: repeating-linear-gradient(#d6cfc3 0 9px, #bcb4a6 9px 11px); box-shadow: 0 2px 4px rgb(0 0 0 / 0.25); transition: height 0.2s; }
  .bkp-grip { position: absolute; left: 50%; z-index: 3; width: 30px; height: 6px; margin: -3px 0 0 -15px; border-radius: 3px; background: #fff; box-shadow: 0 1px 3px rgb(0 0 0 / 0.35); }
  .bkp-side { position: relative; display: grid; gap: 6px; justify-items: start; min-width: 0; }
  .bkp-side small { font-size: 12px; opacity: 0.8; }
  .bkp-side b { font-size: 18px; font-weight: 500; }
  .bkp-num { font-size: 40px; font-weight: 300; line-height: 1; font-variant-numeric: tabular-nums; }
  .bkp-num span { font-size: 18px; margin-left: 2px; }
  .bkp-cta { border: 0; border-radius: 999px; padding: 7px 14px; background: #4a3510; color: #fff3d6; font-size: 12.5px; font-weight: 500; }

  /* Klima */
  .bkp-climateview { background: linear-gradient(#e7f2fb, #d3e8f8); color: #2d3440; --mc: #2f86d4; }
  .bkp-climateview.m-heat { background: linear-gradient(#fdf0e6, #f8dcc6); --mc: #e2692f; }
  .bkp-climateview.m-auto, .bkp-climateview.m-heat_cool { background: linear-gradient(#efedfb, #e0dbf6); --mc: #6b55c9; }
  .bkp-climateview.m-dry, .bkp-climateview.m-fan_only { background: linear-gradient(#e6f5f2, #d2ece7); --mc: #2a9d8f; }
  .bkp-climateview.m-off { background: linear-gradient(#eeedf0, #e1dfe4); --mc: #8d8996; }
  .bkp-stage { position: absolute; left: 0; right: 0; top: 0; bottom: 56px; }
  .with-hist .bkp-stage { right: 40%; }
  .bkp-unit { position: absolute; left: 50%; top: 14%; width: 62%; height: 26%; transform: translateX(-50%); background: #fff; border-radius: 10px 10px 16px 16px; box-shadow: 0 3px 8px rgb(40 60 90 / 0.15); }
  .bkp-unit::after { content: ""; position: absolute; left: 10%; right: 10%; bottom: 18%; height: 3px; border-radius: 2px; background: #d6dde5; }
  .bkp-unit i { position: absolute; right: 10%; top: 26%; width: 6px; height: 6px; border-radius: 50%; background: var(--mc); }
  .bkp-air { position: absolute; left: 19%; width: 62%; top: 42%; height: 52%; overflow: visible; }
  .bkp-air path { fill: none; stroke: var(--mc); stroke-width: 2.2; stroke-linecap: round; stroke-dasharray: 6 8; vector-effect: non-scaling-stroke; animation: bkp-blow 1.4s linear infinite; }
  .bkp-air path:nth-child(2) { animation-delay: -0.5s; opacity: 0.7; }
  .bkp-air path:nth-child(3) { animation-delay: -0.9s; opacity: 0.5; }
  @keyframes bkp-blow { to { stroke-dashoffset: -28; } }
  .bkp-chip { position: absolute; left: 10px; top: 10px; background: rgb(255 255 255 / 0.8); border-radius: 999px; padding: 5px 10px; font-size: 12px; font-weight: 500; }
  .bkp-hist { position: absolute; right: 10px; top: 44px; bottom: 64px; width: calc(40% - 16px); background: rgb(255 255 255 / 0.7); border-radius: 12px; padding: 6px 8px; box-sizing: border-box; display: flex; flex-direction: column; gap: 2px; }
  .bkp-hist small { font-size: 10.5px; opacity: 0.75; }
  .bkp-hist small.max { text-align: right; }
  .bkp-hist svg { flex: 1; width: 100%; min-height: 0; }
  .bkp-hist .area { fill: var(--mc); opacity: 0.18; }
  .bkp-hist .line { fill: none; stroke: var(--mc); stroke-width: 1.6; vector-effect: non-scaling-stroke; }
  .bkp-hist-empty { flex: 1; display: grid; place-items: center; font-size: 11px; opacity: 0.6; }
  .bkp-bar { position: absolute; left: 10px; right: 10px; bottom: 10px; height: 46px; border-radius: 16px; background: rgb(255 255 255 / 0.78); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: space-between; padding: 0 5px; box-sizing: border-box; }
  .bkp-bar .bkp-rb.flat { background: transparent; box-shadow: none; }
  .bkp-bar .bkp-rb.power-on { background: var(--mc); color: #fff; }
  .bkp-target { font-size: 20px; font-variant-numeric: tabular-nums; white-space: nowrap; }

  /* schmale Karten */
  @container (max-width: 300px) {
    .bkp-hist { display: none; }
    .with-hist .bkp-stage { right: 0; }
  }
  @container (max-width: 260px) {
    .bkp-rb { width: 30px; height: 30px; }
    .bkp-overlay ha-icon, .bkp-rb ha-icon { --mdc-icon-size: 16px; }
    .bkp-bar { left: 6px; right: 6px; bottom: 6px; height: 40px; padding: 0 3px; border-radius: 14px; }
    .bkp-target { font-size: 16px; }
    .bkp-target .unit { display: none; }
    .bkp-chip { left: 6px; top: 6px; padding: 4px 8px; font-size: 11px; max-width: calc(100% - 50px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; box-sizing: border-box; }
    .bkp-stage { bottom: 46px; }
    .bkp-unit { top: 38%; width: 66%; height: 22%; }
    .bkp-air { top: 56%; height: 40%; }
    .bkp-shutterview { gap: 5%; padding: 0 5%; }
    .bkp-shutterview:not(.sunny) { padding-right: 40px; }
    .bkp-win { height: 56%; border-width: 4px; }
    .bkp-side { gap: 4px; position: static; }
    .bkp-shutterview .bkp-row { position: absolute; right: 6px; bottom: 6px; flex-direction: column; gap: 4px; }
    .bkp-shutterview .bkp-rb { width: 28px; height: 28px; }
    .bkp-num { font-size: 22px; }
    .bkp-num span { font-size: 12px; }
    .bkp-num span { font-size: 14px; }
    .bkp-side small { font-size: 11px; }
    .bkp-side b { font-size: 14px; }
    .bkp-row { gap: 4px; }
    .bkp-cta { padding: 5px 10px; font-size: 11.5px; }
  }

  /* dunkles Design */
  .bkp-overlay.dark .bkp-shutterview { background: #2b2723; color: #ece4d8; }
  .bkp-overlay.dark .bkp-shutterview.sunny { background: linear-gradient(135deg, #43361f, #5a3f17); color: #ffe6b5; }
  .bkp-overlay.dark .bkp-cta { background: #ffd56b; color: #3a2a0c; }
  .bkp-overlay.dark .bkp-win, .bkp-overlay.dark .bkp-win::after { border-color: #d9d4cc; }
  .bkp-overlay.dark .bkp-climateview { background: linear-gradient(#1d2a38, #16212c); color: #e8ecf2; --mc: #62adf0; }
  .bkp-overlay.dark .bkp-climateview.m-heat { background: linear-gradient(#3a261b, #2c1c14); --mc: #ff8d55; }
  .bkp-overlay.dark .bkp-climateview.m-off { background: linear-gradient(#26252a, #1e1d22); --mc: #8d8996; }
  .bkp-overlay.dark .bkp-unit { background: #3a3f47; }
  .bkp-overlay.dark .bkp-unit::after { background: #555b64; }
  .bkp-overlay.dark .bkp-chip, .bkp-overlay.dark .bkp-hist, .bkp-overlay.dark .bkp-bar { background: rgb(0 0 0 / 0.35); }
  .bkp-overlay.dark .bkp-rb { background: #3a3f47; color: #e8ecf2; }
  .bkp-overlay.dark .bkp-bar .bkp-rb.flat { background: transparent; }
  .bkp-overlay.dark .bkp-bar .bkp-rb.power-on { background: var(--mc); color: #fff; }

  @media (prefers-reduced-motion: reduce) {
    .bkp-air path, .bkp-layer { animation: none; }
  }
`;var Yt="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4",Ee=["https://overpass-api.de/api/interpreter","https://overpass.private.coffee/api/interpreter"],xt=Math.PI/180,Gt;function Ce(){return window.L?.map?Promise.resolve(window.L):(Gt||=new Promise((o,t)=>{let i=document.createElement("script");i.src=`${Yt}/leaflet.min.js`,i.onload=()=>o(window.L),i.onerror=()=>t(new Error("Leaflet nicht ladbar")),document.head.appendChild(i)}),Gt)}var V=class extends v{constructor(){super(),this._satellite=!0,this._status="Lade Karte \u2026"}async firstUpdated(){let t;try{t=await Ce()}catch{this._status="Die Karte lie\xDF sich nicht laden. Trag die Gradzahl direkt ein.";return}this.L=t;let i=this.hass.config.latitude,s=this.hass.config.longitude;this.home=[i,s];let e=t.map(this.renderRoot.querySelector("#map"),{maxZoom:21}).setView(this.home,19);this.map=e,this.sat=t.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxNativeZoom:19,maxZoom:21,attribution:"Luftbild \xA9 Esri"}).addTo(e),this.plain=t.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{maxNativeZoom:20,maxZoom:21,subdomains:"abcd",attribution:"\xA9 OpenStreetMap \xA9 CARTO"}),t.circleMarker(this.home,{radius:5,color:"#fff",weight:2,fillColor:"#6b55c9",fillOpacity:1}).addTo(e).bindTooltip("Zuhause"),this.walls=t.layerGroup().addTo(e),this.sel=t.layerGroup().addTo(e),this.tmp=t.layerGroup().addTo(e),e.on("click",n=>this._mapClick(n)),setTimeout(()=>e.invalidateSize(),200),this._loadBuildings()}_toXY([t,i]){return[(i-this.home[1])*Math.cos(this.home[0]*xt)*111320,(t-this.home[0])*110540]}_toLL([t,i]){return[this.home[0]+i/110540,this.home[1]+t/(Math.cos(this.home[0]*xt)*111320)]}async _loadBuildings(){this._status="Lade Geb\xE4ude aus OpenStreetMap \u2026";let[t,i]=this.home,s=`[out:json][timeout:25];(way(around:120,${t},${i})["building"];relation(around:120,${t},${i})["building"];);out geom;`,e;for(let r of Ee)try{let a=await fetch(r,{method:"POST",body:`data=${encodeURIComponent(s)}`,headers:{"Content-Type":"application/x-www-form-urlencoded"},signal:AbortSignal.timeout(2e4)});if(a.ok){e=await a.json();break}}catch{}if(!e){this._status="error";return}let n=0;for(let r of e.elements)if(r.type==="way"&&r.geometry&&(this._addRing(r.geometry.map(a=>[a.lat,a.lon])),n++),r.type==="relation")for(let a of r.members||[])a.role==="outer"&&a.geometry&&(this._addRing(a.geometry.map(l=>[l.lat,l.lon])),n++);this._status=n?"Tipp auf die Hauswand, in der das Fenster ist.":"Keine Geb\xE4ude gefunden. Zeichne die Wand selbst ein."}_addRing(t){let i=this.L;if(t.length<3)return;let s=t.map(r=>this._toXY(r)),e=0;for(let r=0;r<s.length-1;r++)e+=s[r][0]*s[r+1][1]-s[r+1][0]*s[r][1];let n=e>0;i.polygon(t,{color:"#fff",weight:1.5,opacity:.9,fillColor:"#6b55c9",fillOpacity:.12,interactive:!1}).addTo(this.walls);for(let r=0;r<t.length-1;r++){let a=s[r+1][0]-s[r][0],l=s[r+1][1]-s[r][1],c=Math.hypot(a,l);if(c<.5)continue;let u=n?[l/c,-a/c]:[-l/c,a/c],h=t[r],f=t[r+1],_=i.polyline([h,f],{color:"#f0a020",weight:14,opacity:0}).addTo(this.walls);_.on("mouseover",()=>_.setStyle({opacity:.55})),_.on("mouseout",()=>_.setStyle({opacity:0})),_.on("click",C=>{i.DomEvent.stop(C),this._drawing||this._show(h,f,u)})}}_mapClick(t){if(!this._drawing)return;let i=this.L;if(this._points=[...this._points||[],[t.latlng.lat,t.latlng.lng]],i.circleMarker(t.latlng,{radius:5,color:"#fff",weight:2,fillColor:"#f0a020",fillOpacity:1}).addTo(this.tmp),this._points.length===2){let[s,e]=this._points,n=this._toXY(s),r=this._toXY(e),a=r[0]-n[0],l=r[1]-n[1],c=Math.hypot(a,l)||1;this.tmp.clearLayers(),this._drawing=!1,this._points=[],this._show(s,e,[l/c,-a/c])}}_toggleDraw(){this._drawing=!this._drawing,this._points=[],this.tmp?.clearLayers()}_show(t,i,s){let e=this.L,n=(Math.atan2(s[0],s[1])/xt+360)%360;this._result={a:t,b:i,normal:s,az:n},this.sel.clearLayers(),e.polyline([t,i],{color:"#f0a020",weight:7,opacity:.95}).addTo(this.sel);let r=this._toXY(t),a=this._toXY(i),l=[(r[0]+a[0])/2,(r[1]+a[1])/2],c=Math.max(4,Math.min(9,Math.hypot(a[0]-r[0],a[1]-r[1])*.6)),u=[l[0]+s[0]*c,l[1]+s[1]*c],h=[-s[1],s[0]],f=[u[0]-s[0]*1.6+h[0]*1.1,u[1]-s[1]*1.6+h[1]*1.1],_=[u[0]-s[0]*1.6-h[0]*1.1,u[1]-s[1]*1.6-h[1]*1.1];e.polyline([this._toLL(l),this._toLL(u)],{color:"#6b55c9",weight:4}).addTo(this.sel),e.polygon([this._toLL(u),this._toLL(f),this._toLL(_)],{color:"#6b55c9",fillColor:"#6b55c9",fillOpacity:1,weight:1}).addTo(this.sel)}_flip(){let t=this._result;t&&this._show(t.a,t.b,[-t.normal[0],-t.normal[1]])}_accept(){this.dispatchEvent(new CustomEvent("direction-picked",{detail:{value:Math.round(this._result.az)},bubbles:!0,composed:!0}))}_layer(t){this._satellite=t,this.map&&(t?(this.map.removeLayer(this.plain),this.sat.addTo(this.map)):(this.map.removeLayer(this.sat),this.plain.addTo(this.map)))}_sunRows(){let{latitude:t,longitude:i}=this.hass.config,s=new Date().getFullYear(),e=n=>n.toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"});return[["Heute",new Date],["21. Juni",new Date(s,5,21)],["21. Dezember",new Date(s,11,21)]].map(([n,r])=>{let a=jt(r,t,i,this._result.az);return d`<div><span>${n}</span><span>${a.length?a.map(([l,c])=>`${e(l)}\u2013${e(c)}`).join(", "):"gar nicht"}</span></div>`})}render(){let t=this._result;return d`
      <link rel="stylesheet" href="${Yt}/leaflet.min.css" />
      <div class="bar">
        <button class=${this._satellite?"on":""} @click=${()=>this._layer(!0)}>Luftbild</button>
        <button class=${this._satellite?"":"on"} @click=${()=>this._layer(!1)}>Karte</button>
        <button class=${this._drawing?"on":""} @click=${this._toggleDraw}>Wand selbst einzeichnen</button>
      </div>
      <div id="map"></div>
      <div class="status">
        ${this._drawing?"Tipp auf den Anfang der Wand, dann auf ihr Ende.":this._status==="error"?d`Gebäude ließen sich nicht laden.
                <button @click=${this._loadBuildings}>Nochmal versuchen</button>
                oder zeichne die Wand selbst ein.`:this._status}
      </div>
      ${t?d`<div class="result">
            <div class="deg"><b>${Math.round(t.az)}°</b><span>${it(t.az)}</span></div>
            <div class="hint">Der Pfeil zeigt nach draußen. Zeigt er ins Haus, tippe „Andere Seite“.</div>
            <div class="sun"><b>Sonne auf dieser Wand</b>${this._sunRows()}</div>
            <div class="bar">
              <button class="primary" @click=${this._accept}>${Math.round(t.az)}° übernehmen</button>
              <button @click=${this._flip}>Andere Seite</button>
            </div>
          </div>`:p}
    `}};w(V,"properties",{hass:{attribute:!1},_result:{state:!0},_status:{state:!0},_satellite:{state:!0},_drawing:{state:!0}}),w(V,"styles",M`
    :host { display: grid; gap: 8px; }
    #map { height: 320px; border-radius: 12px; overflow: hidden; z-index: 0; }
    .bar { display: flex; flex-wrap: wrap; gap: 6px; }
    button { font: inherit; font-size: 13px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); border-radius: 999px; padding: 5px 12px; cursor: pointer; }
    button.on { border-color: var(--primary-color); color: var(--primary-color); }
    button.primary { background: var(--primary-color); border-color: var(--primary-color); color: var(--text-primary-color, #fff); }
    .status, .hint { font-size: 13px; color: var(--secondary-text-color); }
    .result { display: grid; gap: 8px; border: 1px solid var(--divider-color); border-radius: 12px; padding: 12px; }
    .deg { display: flex; align-items: baseline; gap: 8px; }
    .deg b { font-size: 32px; font-weight: 300; }
    .sun { display: grid; gap: 2px; font-size: 13px; }
    .sun div { display: flex; justify-content: space-between; gap: 8px; }
    .sun span:last-child { color: var(--secondary-text-color); font-variant-numeric: tabular-nums; }
  `);customElements.define("bkp-direction-map",V);var Te="bereichskarte-plus-editor",ze="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z",Le="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z",Me="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",Ne="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",Xt=["sensors","show_icons","shutter_view","climate_view","view_timeout"];function Jt(o,t){return o.filter(i=>i.name!==t).map(i=>Array.isArray(i.schema)?{...i,schema:Jt(i.schema,t)}:i)}var K=class extends v{setConfig(t){this._config=t,this._native?.setConfig(this._nativeConfig(t))}_nativeConfig(t){let i={...t,type:"area"};for(let s of Xt)delete i[s];return i}_ensureNative(){if(this._native)return;let t=document.createElement("hui-area-card-editor"),i=t._schema;if(typeof i=="function"){let s,e;t._schema=(...n)=>{let r=i(...n);return r!==s&&(s=r,e=Jt(r,"sensor_classes")),e}}t.addEventListener("config-changed",s=>{s.stopPropagation();let e={...s.detail.config,type:this._config.type};delete e.sensor_classes;for(let n of Xt)this._config[n]!==void 0&&(e[n]=this._config[n]);this._fire(e)}),t.hass=this.hass,t.setConfig(this._nativeConfig(this._config)),this._native=t}updated(t){t.has("hass")&&this._native&&(this._native.hass=this.hass)}_fire(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_setSensors(t){let i={...this._config,sensors:t};delete i.sensor_classes,this._fire(i)}_updateItem(t,i){let s=[...g(this._config)],e={...s[t],...i};for(let[n,r]of Object.entries(e))(r===void 0||r===""||Array.isArray(r)&&!r.length)&&delete e[n];s[t]=e,this._setSensors(s)}_changeKind(t,i){let s=[...g(this._config)];s[t]={type:i},this._setSensors(s)}_move(t,i){let s=[...g(this._config)],e=t+i;e<0||e>=s.length||([s[t],s[e]]=[s[e],s[t]],this._setSensors(s))}_remove(t){let i=[...g(this._config)];i.splice(t,1),this._setSensors(i)}_add(){let t=[...g(this._config)],i=new Set(t.map(e=>e.type)),s=["temperature","humidity","power"].find(e=>!i.has(e))||"entity";t.push({type:s}),this._setSensors(t)}_togglePower(t,i,s){let e=g(this._config)[t],n=new Set(e.exclude||[]);s?n.delete(i):n.add(i),this._updateItem(t,{exclude:[...n]})}_name(t){return this.hass.states[t]?.attributes.friendly_name||t}_selector(t,i,s,e,n){return d`<ha-selector
      .hass=${this.hass}
      .required=${!1}
      .selector=${t}
      .value=${i}
      .label=${s}
      .helper=${e}
      @value-changed=${r=>{r.stopPropagation(),n(r.detail.value)}}
    ></ha-selector>`}_renderPower(t,i,s){let e=X(this.hass,s?.area_id,"power"),n=new Set(t.exclude||[]),r=yt(this.hass,vt(this.hass,s?.area_id,t));return d`
      <div class="hint">
        Alle Leistungssensoren im Bereich werden zusammengezählt. Schalte ab,
        was doppelt zählt (zum Beispiel ein Mittelwert-Sensor neben dem
        eigentlichen Messwert).
      </div>
      ${e.length?d`<div class="power-list">
            ${e.map(a=>{let l=!n.has(a);return d`<label class="power-row ${l?"":"off"}">
                <ha-switch
                  .checked=${l}
                  @change=${c=>this._togglePower(i,a,c.target.checked)}
                ></ha-switch>
                <span class="power-name" title=${a}>${this._name(a)}</span>
                <span class="power-value"
                  >${E(this.hass,this.hass.states[a])??"\u2013"}</span
                >
              </label>`})}
          </div>`:d`<div class="hint">Im Bereich gibt es keine Leistungssensoren.</div>`}
      ${this._selector({entity:{multiple:!0,filter:{domain:"sensor",device_class:"power"}}},t.include||[],"Weitere Leistungssensoren","Sensoren aus anderen Bereichen, die hier mitgez\xE4hlt werden sollen.",a=>this._updateItem(i,{include:a}))}
      <div class="total">
        Summe jetzt: <b>${r===void 0?"\u2013":U(this.hass,r)}</b>
      </div>
    `}_renderClimate(t,i,s){let e=b[t.type],n=s?.[`${t.type}_entity_id`],r=n?`Leer lassen: nimmt \u201E${this._name(n)}\u201C aus den Bereichseinstellungen.`:`Leer lassen: Mittelwert aller ${e.label}-Sensoren im Bereich.`;return this._selector({entity:{filter:{domain:"sensor",device_class:e.deviceClass}}},t.entity||"","Sensor",r,a=>this._updateItem(i,{entity:a}))}_renderItem(t,i,s,e){let n=b[t.type]?t.type:"entity",r=e?J(this.hass,e,t).text:void 0;return d`
      <div class="item">
        <div class="item-head">
          <ha-icon
            class="item-icon"
            .icon=${t.icon||b[n].icon}
          ></ha-icon>
          <div class="item-kind">
            ${this._selector({select:{mode:"dropdown",options:Object.entries(b).map(([a,l])=>({value:a,label:l.label}))}},n,"Wert",void 0,a=>a&&a!==n&&this._changeKind(i,a))}
          </div>
          <span class="current" title="Wird gerade so angezeigt"
            >${r??"\u2013"}</span
          >
          <ha-icon-button
            .path=${ze}
            .label=${"Nach vorne"}
            title="Nach vorne"
            .disabled=${i===0}
            @click=${()=>this._move(i,-1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${Le}
            .label=${"Nach hinten"}
            title="Nach hinten"
            .disabled=${i===s-1}
            @click=${()=>this._move(i,1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${Me}
            .label=${"Entfernen"}
            title="Entfernen"
            @click=${()=>this._remove(i)}
          ></ha-icon-button>
        </div>
        <div class="item-body">
          ${n==="power"?this._renderPower(t,i,e):n==="entity"?this._selector({entity:{}},t.entity||"","Sensor","Zeigt den Zustand genau dieses Sensors.",a=>this._updateItem(i,{entity:a})):this._renderClimate(t,i,e)}
          ${this._config.show_icons?this._selector({icon:{placeholder:b[n].icon}},t.icon||"","Symbol","Leer lassen f\xFCr das Standardsymbol.",a=>this._updateItem(i,{icon:a})):p}
        </div>
      </div>
    `}_setSub(t,i){let s={...this._config[t]||{},...i};for(let[n,r]of Object.entries(s))(r===void 0||r===""||r===null)&&delete s[n];let e={...this._config,[t]:s};Object.keys(s).length||delete e[t],this._fire(e)}_setTip(t){let i={...this._config.shutter_view?.sun_tip||{},...t};for(let[s,e]of Object.entries(i))(e===void 0||e===""||e===null)&&delete i[s];this._setSub("shutter_view",{sun_tip:Object.keys(i).length?i:void 0})}_num(t,i,s,e,n="slider"){return{number:{min:t,max:i,step:s,mode:n,unit_of_measurement:e}}}_sunNow(t){let{latitude:i,longitude:s}=this.hass.config,e=B(new Date,i,s);if(e.el<=0)return"Gerade ist die Sonne untergegangen.";let n=typeof t=="number"&&wt(e.az,t)<70;return`Gerade steht die Sonne bei ${Math.round(e.az)}\xB0 (${it(e.az)}), ${Math.round(e.el)}\xB0 hoch${typeof t=="number"?n?" und scheint auf dieses Fenster.":", also nicht auf dieses Fenster.":"."}`}_renderSunTip(t){let i=t.sun_tip||{},s=!!t.sun_tip&&i.enabled!==!1,e=j,n=i.lux_entity?E(this.hass,this.hass.states[i.lux_entity]):void 0;return d`
      ${this._selector({boolean:{}},s,"Sonnenschutz-Tipp","Scheint die Sonne aufs Fenster, schl\xE4gt die Karte eine H\xF6he vor. Sie f\xE4hrt nur, wenn du \u201E\xDCbernehmen\u201C tippst.",r=>this._setTip({enabled:r}))}
      ${s?d`<div class="sub">
            <div class="dir-row">
              ${this._selector(this._num(0,359,1,"\xB0","box"),i.direction,"Fensterrichtung","Wohin die Wand mit dem Fenster zeigt: 0 = Nord, 90 = Ost, 180 = S\xFCd, 270 = West.",r=>this._setTip({direction:r}))}
              <button class="ghost" @click=${()=>(this._mapOpen=!this._mapOpen,this.requestUpdate())}>
                <ha-icon icon="mdi:map-marker-radius"></ha-icon>
                ${this._mapOpen?"Karte schlie\xDFen":"Auf Karte w\xE4hlen"}
              </button>
            </div>
            ${this._mapOpen?d`<bkp-direction-map
                  .hass=${this.hass}
                  @direction-picked=${r=>{this._mapOpen=!1,this._setTip({direction:r.detail.value})}}
                ></bkp-direction-map>`:p}
            <div class="hint">${this._sunNow(i.direction)}</div>
            ${this._selector(this._num(0,100,5,"%"),i.position??e.position,"Sonnenschutz-H\xF6he","Diese H\xF6he schl\xE4gt die Karte vor. 0 % ist ganz zu.",r=>this._setTip({position:r}))}
            ${this._selector({entity:{filter:{domain:"sensor",device_class:"illuminance"}}},i.lux_entity||"","Helligkeitssensor drau\xDFen","Damit die Karte wei\xDF, ob die Sonne wirklich scheint. Ohne Sensor z\xE4hlt nur der Sonnenstand.",r=>this._setTip({lux_entity:r}))}
            ${i.lux_entity?this._selector(this._num(0,15e4,500,"lx","box"),i.lux_threshold??e.lux_threshold,"Sonne scheint ab",`Ab dieser Helligkeit gilt die Sonne als scheinend. Gerade misst der Sensor ${n??"nichts"}. Schau an einem sonnigen Tag, welcher Wert dann kommt.`,r=>this._setTip({lux_threshold:r})):this._selector({entity:{filter:{domain:"weather"}}},i.weather_entity||"","Wetter (Ersatz)","Ohne Helligkeitssensor: z\xE4hlt nur bei \u201Esonnig\u201C oder \u201Eteils sonnig\u201C.",r=>this._setTip({weather_entity:r}))}
            ${this._selector(this._num(30,90,5,"\xB0"),i.spread??e.spread,"Seitlicher Winkel","Wie schr\xE4g die Sonne noch aufs Fenster scheinen darf.",r=>this._setTip({spread:r}))}
            ${this._selector(this._num(0,40,1,"\xB0"),i.min_elevation??e.min_elevation,"Sonne ab H\xF6he","Darunter verdecken Nachbarh\xE4user oder B\xE4ume die Sonne. H\xF6her stellen, wenn bei dir etwas im Weg steht.",r=>this._setTip({min_elevation:r}))}
            ${this._selector(this._num(10,35,.5,"\xB0C","box"),i.min_temp,"Nur wenn der Raum w\xE4rmer ist als","Leer lassen: Tipp auch im Winter. Gemessen mit der Temperatur aus der Infozeile.",r=>this._setTip({min_temp:r}))}
            ${this._selector({boolean:{}},i.reopen??e.reopen,"Danach wieder \xF6ffnen vorschlagen","Ist die Sonne weg, fragt die Karte, ob der Rollladen wieder hoch soll.",r=>this._setTip({reopen:r}))}
            ${i.reopen??e.reopen?this._selector(this._num(0,100,5,"%"),i.reopen_position??e.reopen_position,"Wieder \xF6ffnen auf",void 0,r=>this._setTip({reopen_position:r})):p}
          </div>`:p}
    `}_renderShutterSection(t){let i=this._config.shutter_view||{},s=I(this.hass,t?.area_id,"cover")[0],e=i.enabled!==!1;return d`<details class="section" ?open=${this._openShutter} @toggle=${n=>this._openShutter=n.target.open}>
      <summary><ha-icon icon="mdi:window-shutter"></ha-icon>Rollladen-Ansicht</summary>
      <div class="body">
        ${this._selector({boolean:{}},e,"Rollladen-Ansicht zeigen","F\xE4hrst du den Rollladen \xFCber die Taste unten, zeigt das Bild ein Fenster, an dem du die H\xF6he ziehen kannst.",n=>this._setSub("shutter_view",{enabled:n?void 0:!1}))}
        ${e?d`
              ${this._selector({entity:{filter:{domain:"cover"}}},i.entity||"","Rollladen",s?`Leer lassen: \u201E${this._name(s)}\u201C aus dem Bereich.`:"Im Bereich ist kein Rollladen. W\xE4hle einen aus.",n=>this._setSub("shutter_view",{entity:n}))}
              ${this._selector({boolean:{}},!!i.follow_moves,"Auch zeigen, wenn er von selbst f\xE4hrt","Sonst nur, wenn du ihn \xFCber die Taste unten f\xE4hrst.",n=>this._setSub("shutter_view",{follow_moves:n||void 0}))}
              ${this._renderSunTip(i)}
            `:p}
      </div>
    </details>`}_renderClimateSection(t){let i=this._config.climate_view||{},s=Q(this.hass,t?.area_id),e=i.entity||s,n=e?tt(this.hass,e):void 0,r=i.enabled!==!1;return d`<details class="section" ?open=${this._openClimate} @toggle=${a=>this._openClimate=a.target.open}>
      <summary><ha-icon icon="mdi:air-conditioner"></ha-icon>Klima-Ansicht</summary>
      <div class="body">
        ${this._selector({boolean:{}},r,"Klima-Ansicht zeigen","Oben rechts im Bild erscheint ein kleines Klima-Feld. Ein Tipp darauf \xF6ffnet die Bedienung: an und aus, Betriebsart, Zieltemperatur, Leistung.",a=>this._setSub("climate_view",{enabled:a?void 0:!1}))}
        ${r?d`
              ${this._selector({entity:{filter:{domain:"climate"}}},i.entity||"","Klimager\xE4t",s?`Leer lassen: \u201E${this._name(s)}\u201C aus dem Bereich.`:"Im Bereich ist kein Klimager\xE4t. W\xE4hle eines aus.",a=>this._setSub("climate_view",{entity:a}))}
              ${this._selector({entity:{filter:{domain:"sensor",device_class:"power"}}},i.power_entity||"","Leistungssensor",n?`Leer lassen: \u201E${this._name(n)}\u201C vom selben Ger\xE4t.`:"W\xE4hle den Sensor, der die Leistung der Anlage misst.",a=>this._setSub("climate_view",{power_entity:a}))}
              ${this._selector({boolean:{}},!!i.show_history,"Leistungsverlauf an der Seite","Zeigt rechts neben dem Ger\xE4t, wie viel die Anlage in den letzten Stunden gezogen hat.",a=>this._setSub("climate_view",{show_history:a||void 0}))}
              ${i.show_history?this._selector(this._num(1,48,1,"h"),i.history_hours??6,"Verlauf \xFCber",void 0,a=>this._setSub("climate_view",{history_hours:a})):p}
              ${this._selector({boolean:{}},!!i.stay_while_on,"Ansicht bleibt, solange die Anlage l\xE4uft","Sonst geht die Karte nach der eingestellten Zeit zur\xFCck zum Bild.",a=>this._setSub("climate_view",{stay_while_on:a||void 0}))}
            `:p}
      </div>
    </details>`}_renderGeneral(){return this._selector(this._num(5,120,5,"s"),this._config.view_timeout??20,"Zur\xFCck zum Bild nach","So lange bleibt die Rollladen- oder Klima-Ansicht ohne Ber\xFChrung offen.",t=>this._fire({...this._config,view_timeout:t}))}render(){if(!this.hass||!this._config)return p;this._ensureNative();let t=this.hass.areas?.[this._config.area],i=g(this._config);return d`
      ${this._native}
      <div class="own">
        <div class="own-title">
          <ha-icon icon="mdi:format-list-bulleted"></ha-icon>
          Werte in der Infozeile
        </div>
        <div class="hint">
          Diese Werte stehen unter dem Namen des Bereichs, in dieser
          Reihenfolge.
        </div>
        ${this._selector({boolean:{}},!!this._config.show_icons,"Symbole vor den Werten","Zeigt vor jedem Wert ein kleines Symbol, damit man sie auseinanderh\xE4lt.",s=>this._fire({...this._config,show_icons:s}))}
        ${i.map((s,e)=>this._renderItem(s,e,i.length,t))}
        <button class="add" @click=${this._add}>
          <ha-svg-icon .path=${Ne}></ha-svg-icon>
          Wert hinzufügen
        </button>
      </div>
      <div class="own">
        <div class="own-title">
          <ha-icon icon="mdi:image-filter-center-focus"></ha-icon>
          Ansichten im Bild
        </div>
        ${this._renderShutterSection(t)}
        ${this._renderClimateSection(t)}
        ${this._renderGeneral()}
      </div>
    `}};w(K,"properties",{hass:{attribute:!1},_config:{state:!0}}),w(K,"styles",M`
    .section {
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-lg, 12px);
    }
    .section summary {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      cursor: pointer;
      font-weight: var(--ha-font-weight-medium, 500);
      list-style: none;
    }
    .section summary::-webkit-details-marker {
      display: none;
    }
    .section summary::after {
      content: "▾";
      margin-left: auto;
      color: var(--secondary-text-color);
      transition: transform 0.2s;
    }
    .section[open] summary::after {
      transform: rotate(180deg);
    }
    .section .body {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 0 14px 14px;
    }
    .sub {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding-left: 12px;
      border-left: 2px solid var(--divider-color);
    }
    .dir-row {
      display: flex;
      gap: 8px;
      align-items: flex-start;
    }
    .dir-row ha-selector {
      flex: 1;
      min-width: 0;
    }
    .ghost {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
      background: transparent;
      color: var(--primary-color);
      font: inherit;
      white-space: nowrap;
      cursor: pointer;
    }
    .own {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .own-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: var(--ha-font-size-l, 18px);
      font-weight: var(--ha-font-weight-medium, 500);
    }
    .hint {
      color: var(--secondary-text-color);
      font-size: var(--ha-font-size-s, 13px);
      line-height: 1.4;
    }
    .item {
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-lg, 12px);
      padding: 8px 8px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .item-head {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .item-icon {
      color: var(--state-icon-color, var(--secondary-text-color));
      margin-right: 6px;
    }
    .item-kind {
      flex: 1;
      min-width: 0;
    }
    .current {
      margin: 0 6px;
      color: var(--secondary-text-color);
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }
    .item-body {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-right: 4px;
    }
    .power-list {
      display: flex;
      flex-direction: column;
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--secondary-background-color);
      padding: 4px 0;
    }
    .power-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 12px;
      cursor: pointer;
    }
    .power-row.off .power-name,
    .power-row.off .power-value {
      opacity: 0.45;
      text-decoration: line-through;
    }
    .power-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .power-value {
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
      color: var(--secondary-text-color);
    }
    .total {
      text-align: right;
    }
    .add {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px 8px 12px;
      border: none;
      border-radius: 999px;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font: inherit;
      font-weight: var(--ha-font-weight-medium, 500);
      cursor: pointer;
    }
    .add:hover {
      filter: brightness(1.08);
    }
    .add:active {
      transform: scale(0.97);
    }
  `);customElements.define(Te,K);var Pe="0.2.4",st="bereichskarte-plus",Oe=`${st}-editor`,He={mW:.001,W:1,kW:1e3,MW:1e6},Qt=new CSSStyleSheet;Qt.replaceSync(`
  .bkp-values {
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .bkp-value {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    vertical-align: middle;
  }
  .bkp-value ha-icon {
    --mdc-icon-size: 15px;
    color: var(--secondary-text-color);
  }
  .bkp-sep {
    margin: 0 5px;
    vertical-align: middle;
  }
  ${Zt}
`);async function De(){return customElements.get("hui-area-card")||(await window.loadCardHelpers()).createCardElement({type:"area",area:""}),customElements.whenDefined("hui-area-card")}function Re(o){class t extends o{constructor(){super(...arguments);w(this,"_view","home")}static get styles(){return[...[super.styles].flat(),Qt]}static async getConfigElement(){return await o.getConfigElement(),document.createElement(Oe)}static getStubConfig(e){let n=Object.values(e.areas||{})[0];return{type:`custom:${st}`,area:n?.area_id||"",display_type:"picture",sensors:Ut,show_icons:!0,features:[{type:"area-controls"}]}}disconnectedCallback(){super.disconnectedCallback?.(),clearTimeout(this._viewTimer),clearInterval(this._histTimer)}_items(){let e=this.hass?.areas?.[this._config?.area];return e?g(this._config).map(n=>J(this.hass,e,n)).filter(n=>n.text):[]}_computeSensorsDisplay(){return Array.isArray(this._config?.sensors)?this._items().map(e=>e.text).join(" \xB7 "):super._computeSensorsDisplay()}_renderIcons(){let e=this.shadowRoot?.querySelector("ha-tile-info");if(!e)return;let n=e.querySelector(":scope > .bkp-values");if(!this._config?.show_icons||!Array.isArray(this._config.sensors)){n?.remove();return}n||(n=document.createElement("span"),n.slot="secondary",n.className="bkp-values",e.appendChild(n)),W(d`${this._items().map((r,a)=>d`${a?d`<span class="bkp-sep">·</span>`:p}<span
                class="bkp-value"
                ><ha-icon .icon=${r.icon}></ha-icon>${r.text}</span
              >`)}`,n)}_shutterCfg(){let e=this._config?.shutter_view||{};if(e.enabled===!1)return null;let n=e.entity||I(this.hass,this._config.area,"cover")[0];return n?{...e,entity:n}:null}_cover(){let e=this._shutterCfg(),n=e&&this.hass.states[e.entity];if(!n)return null;let r=n.attributes.current_position,a=typeof r=="number"?r:n.state==="closed"?0:100;return{st:n,pos:a,moving:n.state==="opening"||n.state==="closing",canSet:!!((n.attributes.supported_features??0)&4)}}_shownPos(e){return this._dragPos!=null?this._dragPos:this._pendingPos!=null&&!e.moving?this._pendingPos:e.pos}_roomTemp(){let e=this.hass.areas?.[this._config.area],r=g(this._config).find(l=>l.type==="temperature")?.entity||e?.temperature_entity_id,a=r?Number(this.hass.states[r]?.state):NaN;return Number.isNaN(a)?void 0:a}_sunTip(){let e=this._cover();return e?Vt(this.hass,this._shutterCfg().sun_tip,this._shownPos(e),this._roomTemp()):null}_coverCmd(e){let n=this._shutterCfg();this._pendingPos=null,this.hass.callService("cover",e,{},{entity_id:n.entity}),this._bump()}_coverTo(e){let n=this._shutterCfg();this._pendingPos=e,this._pendingSince=Date.now(),this.hass.callService("cover","set_cover_position",{position:e},{entity_id:n.entity}),this.requestUpdate(),this._bump()}_windowDown(e){if(!this._cover()?.canSet)return;e.preventDefault();let r=e.currentTarget;r.setPointerCapture(e.pointerId);let a=c=>{let u=r.getBoundingClientRect(),h=1-(c.clientY-u.top)/u.height;this._dragPos=Math.round(Math.min(1,Math.max(0,h))*100),this.requestUpdate()},l=()=>{r.removeEventListener("pointermove",a),r.removeEventListener("pointerup",l),r.removeEventListener("pointercancel",l);let c=this._dragPos;this._dragPos=null,c!=null&&this._coverTo(c)};r.addEventListener("pointermove",a),r.addEventListener("pointerup",l),r.addEventListener("pointercancel",l),a(e),this._bump()}_climateCfg(){let e=this._config?.climate_view||{};if(e.enabled===!1)return null;let n=e.entity||Q(this.hass,this._config.area);return n?{show_history:!1,history_hours:6,stay_while_on:!1,...e,entity:n,power_entity:e.power_entity||tt(this.hass,n)}:null}_formatWatt(e){return U(this.hass,e)}_climate(){let e=this._climateCfg(),n=e&&this.hass.states[e.entity];if(!n)return null;let r=n.attributes.temperature;this._pendingTarget!=null&&(r===this._pendingTarget||this._targetSent&&Date.now()-this._targetSent>1e4)&&(this._pendingTarget=null,this._targetSent=null);let a=e.power_entity?this.hass.states[e.power_entity]:null;return{st:n,cfg:e,target:typeof r=="number"?r:void 0,power:Y(a)?E(this.hass,a):void 0}}_climateToggle(){let e=this._climate(),n=e.st.attributes.supported_features??0,r={entity_id:e.cfg.entity};if(e.st.state!=="off")n&128?this.hass.callService("climate","turn_off",{},r):this.hass.callService("climate","set_hvac_mode",{hvac_mode:"off"},r);else if(n&256)this.hass.callService("climate","turn_on",{},r);else{let a=(e.st.attributes.hvac_modes||[]).find(l=>l!=="off");a&&this.hass.callService("climate","set_hvac_mode",{hvac_mode:a},r)}this._bump()}_climateStep(e){let n=this._climate(),r=n.st.attributes,a=r.target_temp_step||.5,l=this._pendingTarget??n.target;if(typeof l!="number")return;let c=Math.min(r.max_temp??35,Math.max(r.min_temp??7,Math.round((l+e*a)/a)*a));this._pendingTarget=c,this._targetSent=null,this.requestUpdate(),clearTimeout(this._targetTimer),this._targetTimer=setTimeout(()=>{this._targetSent=Date.now(),this.hass.callService("climate","set_temperature",{temperature:c},{entity_id:n.cfg.entity})},700),this._bump()}_climateCycle(e){let n=this._climate();if(!e.length)return;let r=n.st.state,a=r==="off"?e[0]:e[(e.indexOf(r)+1)%e.length];this.hass.callService("climate","set_hvac_mode",{hvac_mode:a},{entity_id:n.cfg.entity}),this._bump()}async _loadHistory(){let e=this._climateCfg(),n=e?.power_entity;if(!n)return;let r=new Date,a=new Date(r.getTime()-e.history_hours*36e5);try{let l=await this.hass.callWS({type:"history/history_during_period",start_time:a.toISOString(),end_time:r.toISOString(),entity_ids:[n],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),c=this.hass.states[n]?.attributes.unit_of_measurement,u=He[c]??1,h=(l[n]||[]).map(f=>[Math.max((f.lu??f.lc??0)*1e3,a.getTime()),Number(f.s)*u]).filter(f=>!Number.isNaN(f[1]));h.length&&h.push([r.getTime(),h[h.length-1][1]]),this._history={points:h}}catch{this._history={points:[],error:!0}}this.requestUpdate()}_timeout(){return this._config?.view_timeout??20}_sticky(){if(this._view!=="climate")return!1;let e=this._climate();return!!(e?.cfg.stay_while_on&&e.st.state!=="off")}_openView(e,n){e.stopPropagation(),this._setView(n)}_setView(e){this._view=e,this._dragPos=null,clearInterval(this._histTimer),e==="climate"&&this._climateCfg()?.show_history&&(this._history=null,this._loadHistory(),this._histTimer=setInterval(()=>this._loadHistory(),3e5)),this.requestUpdate(),this._bump()}_bump(){clearTimeout(this._viewTimer);let e=this.shadowRoot?.querySelector(".bkp-timer");e&&(e.style.animation="none",e.offsetWidth,e.style.animation=""),this._view!=="home"&&(this._viewTimer=setTimeout(()=>{this._sticky()?this._bump():this._setView("home")},this._timeout()*1e3))}_renderOverlay(){let e=this.shadowRoot?.querySelector(".header"),n=this._shutterCfg()||this._climateCfg(),r=e?.querySelector(":scope > .bkp-overlay");if(!e||!n){r?.remove();return}r||(r=document.createElement("div"),r.className="bkp-overlay",e.appendChild(r)),r.classList.toggle("dark",!!this.hass.themes?.darkMode),W(qt(this),r)}_watchCover(){let e=this._cover();if(!e)return;let n=e.st.state;this._pendingPos!=null&&(e.moving||e.pos===this._pendingPos||Date.now()-this._pendingSince>8e3)&&(this._pendingPos=null);let r=Date.now()<(this._armedUntil||0)||this._shutterCfg().follow_moves;this._lastCoverState&&n!==this._lastCoverState&&e.moving&&r&&this._view==="home"&&this._setView("shutter"),this._lastCoverState=n}updated(e){super.updated?.(e),!this._clickHooked&&this.shadowRoot&&(this._clickHooked=!0,this.shadowRoot.addEventListener("click",n=>{n.composedPath().some(r=>r.tagName==="HUI-CARD-FEATURES")&&(this._armedUntil=Date.now()+5e3)},!0)),!(!this.hass||!this._config)&&(this._renderIcons(),this._watchCover(),this._renderOverlay())}}customElements.define(st,t)}window.customCards=window.customCards||[];window.customCards.push({type:st,name:"Bereichskarte Plus",description:"Wie die Bereichskarte, aber du w\xE4hlst selbst, welche Werte unter dem Namen stehen. Mit Rollladen- und Klima-Ansicht.",preview:!0});De().then(Re);console.info(`%c BEREICHSKARTE-PLUS %c ${Pe} `,"color:#fff;background:#6b55c9;font-weight:700","color:#6b55c9;background:#fff");
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
