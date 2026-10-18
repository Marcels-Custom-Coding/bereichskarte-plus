var Oe=Object.defineProperty;var Te=(n,e,t)=>e in n?Oe(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var B=(n,e,t)=>Te(n,typeof e!="symbol"?e+"":e,t);var M=globalThis,R=M.ShadowRoot&&(M.ShadyCSS===void 0||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),oe=new WeakMap,C=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(R&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=oe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&oe.set(t,e))}return e}toString(){return this.cssText}},ae=n=>new C(typeof n=="string"?n:n+"",void 0,V),j=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new C(t,n,V)},ce=(n,e)=>{if(R)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),i=M.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,n.appendChild(s)}},q=R?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return ae(t)})(n):n;var{is:Me,defineProperty:Re,getOwnPropertyDescriptor:Ie,getOwnPropertyNames:We,getOwnPropertySymbols:De,getPrototypeOf:ze}=Object,I=globalThis,le=I.trustedTypes,Be=le?le.emptyScript:"",Ve=I.reactiveElementPolyfillSupport,P=(n,e)=>n,K={toAttribute(n,e){switch(e){case Boolean:n=n?Be:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},de=(n,e)=>!Me(n,e),he={attribute:!0,type:String,converter:K,reflect:!1,useDefault:!1,hasChanged:de};Symbol.metadata??=Symbol("metadata"),I.litPropertyMetadata??=new WeakMap;var _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=he){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&Re(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){let{get:i,set:r}=Ie(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){let a=i?.call(this);r?.call(this,o),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??he}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let e=ze(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let t=this.properties,s=[...We(t),...De(t)];for(let i of s)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let i of s)t.unshift(q(i))}else e!==void 0&&t.push(q(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ce(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:K).toAttribute(t,s.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){let s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:K;this._$Em=i;let a=o.fromAttribute(t,r.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,s,i=!1,r){if(e!==void 0){let o=this.constructor;if(i===!1&&(r=this[e]),s??=o.getPropertyOptions(e),!((s.hasChanged??de)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:o}=r,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,r,a)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[P("elementProperties")]=new Map,_[P("finalized")]=new Map,Ve?.({ReactiveElement:_}),(I.reactiveElementVersions??=[]).push("2.1.2");var X=globalThis,pe=n=>n,W=X.trustedTypes,ue=W?W.createPolicy("lit-html",{createHTML:n=>n}):void 0,ye="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,ve="?"+$,je=`<${ve}>`,w=document,H=()=>w.createComment(""),k=n=>n===null||typeof n!="object"&&typeof n!="function",ee=Array.isArray,qe=n=>ee(n)||typeof n?.[Symbol.iterator]=="function",Z=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,me=/>/g,b=RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_e=/'/g,ge=/"/g,be=/^(?:script|style|textarea|title)$/i,te=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),u=te(1),dt=te(2),pt=te(3),S=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),$e=new WeakMap,A=w.createTreeWalker(w,129);function Ae(n,e){if(!ee(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ue!==void 0?ue.createHTML(e):e}var Ke=(n,e)=>{let t=n.length-1,s=[],i,r=e===2?"<svg>":e===3?"<math>":"",o=N;for(let a=0;a<t;a++){let c=n[a],l,p,h=-1,m=0;for(;m<c.length&&(o.lastIndex=m,p=o.exec(c),p!==null);)m=o.lastIndex,o===N?p[1]==="!--"?o=fe:p[1]!==void 0?o=me:p[2]!==void 0?(be.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=b):p[3]!==void 0&&(o=b):o===b?p[0]===">"?(o=i??N,h=-1):p[1]===void 0?h=-2:(h=o.lastIndex-p[2].length,l=p[1],o=p[3]===void 0?b:p[3]==='"'?ge:_e):o===ge||o===_e?o=b:o===fe||o===me?o=N:(o=b,i=void 0);let g=o===b&&n[a+1].startsWith("/>")?" ":"";r+=o===N?c+je:h>=0?(s.push(l),c.slice(0,h)+ye+c.slice(h)+$+g):c+$+(h===-2?a:g)}return[Ae(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},U=class n{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,o=0,a=e.length-1,c=this.parts,[l,p]=Ke(e,t);if(this.el=n.createElement(l,s),A.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=A.nextNode())!==null&&c.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(ye)){let m=p[o++],g=i.getAttribute(h).split($),T=/([.?@])?(.*)/.exec(m);c.push({type:1,index:r,name:T[2],strings:g,ctor:T[1]==="."?J:T[1]==="?"?G:T[1]==="@"?Y:E}),i.removeAttribute(h)}else h.startsWith($)&&(c.push({type:6,index:r}),i.removeAttribute(h));if(be.test(i.tagName)){let h=i.textContent.split($),m=h.length-1;if(m>0){i.textContent=W?W.emptyScript:"";for(let g=0;g<m;g++)i.append(h[g],H()),A.nextNode(),c.push({type:2,index:++r});i.append(h[m],H())}}}else if(i.nodeType===8)if(i.data===ve)c.push({type:2,index:r});else{let h=-1;for(;(h=i.data.indexOf($,h+1))!==-1;)c.push({type:7,index:r}),h+=$.length-1}r++}}static createElement(e,t){let s=w.createElement("template");return s.innerHTML=e,s}};function x(n,e,t=n,s){if(e===S)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl,r=k(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,t,s)),s!==void 0?(t._$Co??=[])[s]=i:t._$Cl=i),i!==void 0&&(e=x(n,i._$AS(n,e.values),i,s)),e}var F=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??w).importNode(t,!0);A.currentNode=i;let r=A.nextNode(),o=0,a=0,c=s[0];for(;c!==void 0;){if(o===c.index){let l;c.type===2?l=new L(r,r.nextSibling,this,e):c.type===1?l=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(l=new Q(r,this,e)),this._$AV.push(l),c=s[++a]}o!==c?.index&&(r=A.nextNode(),o++)}return A.currentNode=w,i}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},L=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=x(this,e,t),k(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):qe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&k(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=U.createElement(Ae(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{let r=new F(i,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=$e.get(e.strings);return t===void 0&&$e.set(e.strings,t=new U(e)),t}k(e){ee(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,i=0;for(let r of e)i===t.length?t.push(s=new n(this.O(H()),this.O(H()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=pe(e).nextSibling;pe(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(e,t=this,s,i){let r=this.strings,o=!1;if(r===void 0)e=x(this,e,t,0),o=!k(e)||e!==this._$AH&&e!==S,o&&(this._$AH=e);else{let a=e,c,l;for(e=r[0],c=0;c<r.length-1;c++)l=x(this,a[s+c],t,c),l===S&&(l=this._$AH[c]),o||=!k(l)||l!==this._$AH[c],l===d?e=d:e!==d&&(e+=(l??"")+r[c+1]),this._$AH[c]=l}o&&!i&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},J=class extends E{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},G=class extends E{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},Y=class extends E{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=x(this,e,t,0)??d)===S)return;let s=this._$AH,i=e===d&&s!==d||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Q=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){x(this,e)}};var Ze=X.litHtmlPolyfillSupport;Ze?.(U,L),(X.litHtmlVersions??=[]).push("3.3.3");var D=(n,e,t)=>{let s=t?.renderBefore??e,i=s._$litPart$;if(i===void 0){let r=t?.renderBefore??null;s._$litPart$=i=new L(e.insertBefore(H(),r),r,void 0,t??{})}return i._$AI(n),i};var se=globalThis,y=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=D(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};y._$litElement$=!0,y.finalized=!0,se.litElementHydrateSupport?.({LitElement:y});var Fe=se.litElementPolyfillSupport;Fe?.({LitElement:y});(se.litElementVersions??=[]).push("4.2.2");var Je="0.1.0",z="bereichskarte-plus",Se=`${z}-editor`,f={temperature:{label:"Temperatur",icon:"mdi:thermometer",deviceClass:"temperature"},humidity:{label:"Luftfeuchte",icon:"mdi:water-percent",deviceClass:"humidity"},power:{label:"Leistung (Summe)",icon:"mdi:flash",deviceClass:"power"},entity:{label:"Beliebiger Sensor",icon:"mdi:eye"}},Ge=[{type:"temperature"},{type:"humidity"},{type:"power"}],Ye={mW:.001,W:1,kW:1e3,MW:1e6,GW:1e9},xe=n=>n&&!["unavailable","unknown"].includes(n.state),Ee=n=>xe(n)&&n.state!==""&&!Number.isNaN(Number(n.state));function Qe(n){let e=n.locale?.language||n.language||"de";switch(n.locale?.number_format){case"comma_decimal":return["en-US","en"];case"decimal_comma":return["de","es","it"];case"space_comma":return["fr","sv","cs"];case"system":return;default:return e}}function Ce(n,e,t=1){return new Intl.NumberFormat(Qe(n),{maximumFractionDigits:t}).format(e)}var ne=(n,e)=>e?`${n}${e==="\xB0"?"":" "}${e}`:n;function ie(n,e){if(xe(e))return typeof n.formatEntityState=="function"?n.formatEntityState(e):ne(e.state,e.attributes.unit_of_measurement)}function re(n,e,t){if(!n||!e)return[];let s=[];for(let[i,r]of Object.entries(n.entities||{})){if(!i.startsWith("sensor.")||r.entity_category||r.hidden||(r.area_id||(r.device_id?n.devices?.[r.device_id]?.area_id:void 0))!==e)continue;let a=n.states[i];a&&(t&&a.attributes.device_class!==t||s.push(i))}return s}function Xe(n){let e=[...n].sort((s,i)=>s-i),t=Math.floor(e.length/2);return e.length%2?e[t]:(e[t-1]+e[t])/2}function Pe(n,e,t){let s=new Set(t.exclude||[]),i=re(n,e,"power").filter(r=>!s.has(r));for(let r of t.include||[])!i.includes(r)&&!s.has(r)&&i.push(r);return i}function Ne(n,e){let t=0,s=0;for(let i of e){let r=n.states[i];if(!Ee(r))continue;let o=Ye[r.attributes.unit_of_measurement]??1;t+=Number(r.state)*o,s++}return s?t:void 0}function He(n,e){return ne(Ce(n,e),"W")}function ke(n,e,t){let s=f[t.type]?t.type:"entity",i=t.icon||f[s].icon;if(s==="entity"){let c=t.entity?n.states[t.entity]:void 0;return{text:ie(n,c),icon:t.icon||c?.attributes.icon||f.entity.icon}}if(s==="power"){let c=Ne(n,Pe(n,e.area_id,t));return{text:c===void 0?void 0:He(n,c),icon:i}}let r=t.entity||e[`${s}_entity_id`];if(r)return{text:ie(n,n.states[r]),icon:i};let o=[],a;for(let c of re(n,e.area_id,f[s].deviceClass)){let l=n.states[c];if(!Ee(l))continue;let p=l.attributes.unit_of_measurement;a??=p,p===a&&o.push(Number(l.state))}return o.length?{text:ne(Ce(n,Xe(o)),a),icon:i}:{text:void 0,icon:i}}function v(n){return Array.isArray(n?.sensors)?n.sensors:(n?.sensor_classes||["temperature","humidity"]).filter(t=>f[t]&&t!=="entity").map(t=>({type:t}))}var Ue=new CSSStyleSheet;Ue.replaceSync(`
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
`);async function et(){return customElements.get("hui-area-card")||(await window.loadCardHelpers()).createCardElement({type:"area",area:""}),customElements.whenDefined("hui-area-card")}function tt(n){class e extends n{static get styles(){return[...[super.styles].flat(),Ue]}static async getConfigElement(){return await n.getConfigElement(),document.createElement(Se)}static getStubConfig(s){let i=Object.values(s.areas||{})[0];return{type:`custom:${z}`,area:i?.area_id||"",display_type:"picture",sensors:Ge,show_icons:!0,features:[{type:"area-controls"}]}}_items(){let s=this.hass?.areas?.[this._config?.area];return s?v(this._config).map(i=>ke(this.hass,s,i)).filter(i=>i.text):[]}_computeSensorsDisplay(){return Array.isArray(this._config?.sensors)?this._items().map(s=>s.text).join(" \xB7 "):super._computeSensorsDisplay()}updated(s){super.updated?.(s),this._renderIcons()}_renderIcons(){let s=this.shadowRoot?.querySelector("ha-tile-info");if(!s)return;let i=s.querySelector(":scope > .bkp-values");if(!this._config?.show_icons||!Array.isArray(this._config.sensors)){i?.remove();return}i||(i=document.createElement("span"),i.slot="secondary",i.className="bkp-values",s.appendChild(i));let r=this._items();D(u`${r.map((o,a)=>u`${a?u`<span class="bkp-sep">·</span>`:d}<span
                class="bkp-value"
                ><ha-icon .icon=${o.icon}></ha-icon>${o.text}</span
              >`)}`,i)}}customElements.define(z,e)}var st="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z",it="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z",nt="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",rt="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",we=["sensors","show_icons"];function Le(n,e){return n.filter(t=>t.name!==e).map(t=>Array.isArray(t.schema)?{...t,schema:Le(t.schema,e)}:t)}var O=class extends y{setConfig(e){this._config=e,this._native?.setConfig(this._nativeConfig(e))}_nativeConfig(e){let t={...e,type:"area"};for(let s of we)delete t[s];return t}_ensureNative(){if(this._native)return;let e=document.createElement("hui-area-card-editor"),t=e._schema;if(typeof t=="function"){let s,i;e._schema=(...r)=>{let o=t(...r);return o!==s&&(s=o,i=Le(o,"sensor_classes")),i}}e.addEventListener("config-changed",s=>{s.stopPropagation();let i={...s.detail.config,type:this._config.type};delete i.sensor_classes;for(let r of we)this._config[r]!==void 0&&(i[r]=this._config[r]);this._fire(i)}),e.hass=this.hass,e.setConfig(this._nativeConfig(this._config)),this._native=e}updated(e){e.has("hass")&&this._native&&(this._native.hass=this.hass)}_fire(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_setSensors(e){let t={...this._config,sensors:e};delete t.sensor_classes,this._fire(t)}_updateItem(e,t){let s=[...v(this._config)],i={...s[e],...t};for(let[r,o]of Object.entries(i))(o===void 0||o===""||Array.isArray(o)&&!o.length)&&delete i[r];s[e]=i,this._setSensors(s)}_changeKind(e,t){let s=[...v(this._config)];s[e]={type:t},this._setSensors(s)}_move(e,t){let s=[...v(this._config)],i=e+t;i<0||i>=s.length||([s[e],s[i]]=[s[i],s[e]],this._setSensors(s))}_remove(e){let t=[...v(this._config)];t.splice(e,1),this._setSensors(t)}_add(){let e=[...v(this._config)],t=new Set(e.map(i=>i.type)),s=["temperature","humidity","power"].find(i=>!t.has(i))||"entity";e.push({type:s}),this._setSensors(e)}_togglePower(e,t,s){let i=v(this._config)[e],r=new Set(i.exclude||[]);s?r.delete(t):r.add(t),this._updateItem(e,{exclude:[...r]})}_name(e){return this.hass.states[e]?.attributes.friendly_name||e}_selector(e,t,s,i,r){return u`<ha-selector
      .hass=${this.hass}
      .selector=${e}
      .value=${t}
      .label=${s}
      .helper=${i}
      @value-changed=${o=>{o.stopPropagation(),r(o.detail.value)}}
    ></ha-selector>`}_renderPower(e,t,s){let i=re(this.hass,s?.area_id,"power"),r=new Set(e.exclude||[]),o=Ne(this.hass,Pe(this.hass,s?.area_id,e));return u`
      <div class="hint">
        Alle Leistungssensoren im Bereich werden zusammengezählt. Schalte ab,
        was doppelt zählt (zum Beispiel ein Mittelwert-Sensor neben dem
        eigentlichen Messwert).
      </div>
      ${i.length?u`<div class="power-list">
            ${i.map(a=>{let c=!r.has(a);return u`<label class="power-row ${c?"":"off"}">
                <ha-switch
                  .checked=${c}
                  @change=${l=>this._togglePower(t,a,l.target.checked)}
                ></ha-switch>
                <span class="power-name" title=${a}>${this._name(a)}</span>
                <span class="power-value"
                  >${ie(this.hass,this.hass.states[a])??"\u2013"}</span
                >
              </label>`})}
          </div>`:u`<div class="hint">Im Bereich gibt es keine Leistungssensoren.</div>`}
      ${this._selector({entity:{multiple:!0,filter:{domain:"sensor",device_class:"power"}}},e.include||[],"Weitere Leistungssensoren","Sensoren aus anderen Bereichen, die hier mitgez\xE4hlt werden sollen.",a=>this._updateItem(t,{include:a}))}
      <div class="total">
        Summe jetzt: <b>${o===void 0?"\u2013":He(this.hass,o)}</b>
      </div>
    `}_renderClimate(e,t,s){let i=f[e.type],r=s?.[`${e.type}_entity_id`],o=r?`Leer lassen: nimmt \u201E${this._name(r)}\u201C aus den Bereichseinstellungen.`:`Leer lassen: Mittelwert aller ${i.label}-Sensoren im Bereich.`;return this._selector({entity:{filter:{domain:"sensor",device_class:i.deviceClass}}},e.entity||"","Sensor",o,a=>this._updateItem(t,{entity:a}))}_renderItem(e,t,s,i){let r=f[e.type]?e.type:"entity",o=i?ke(this.hass,i,e).text:void 0;return u`
      <div class="item">
        <div class="item-head">
          <ha-icon
            class="item-icon"
            .icon=${e.icon||f[r].icon}
          ></ha-icon>
          <div class="item-kind">
            ${this._selector({select:{mode:"dropdown",options:Object.entries(f).map(([a,c])=>({value:a,label:c.label}))}},r,"Wert",void 0,a=>a&&a!==r&&this._changeKind(t,a))}
          </div>
          <span class="current" title="Wird gerade so angezeigt"
            >${o??"\u2013"}</span
          >
          <ha-icon-button
            .path=${st}
            .label=${"Nach vorne"}
            title="Nach vorne"
            .disabled=${t===0}
            @click=${()=>this._move(t,-1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${it}
            .label=${"Nach hinten"}
            title="Nach hinten"
            .disabled=${t===s-1}
            @click=${()=>this._move(t,1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${nt}
            .label=${"Entfernen"}
            title="Entfernen"
            @click=${()=>this._remove(t)}
          ></ha-icon-button>
        </div>
        <div class="item-body">
          ${r==="power"?this._renderPower(e,t,i):r==="entity"?this._selector({entity:{}},e.entity||"","Sensor","Zeigt den Zustand genau dieses Sensors.",a=>this._updateItem(t,{entity:a})):this._renderClimate(e,t,i)}
          ${this._config.show_icons?this._selector({icon:{placeholder:f[r].icon}},e.icon||"","Symbol","Leer lassen f\xFCr das Standardsymbol.",a=>this._updateItem(t,{icon:a})):d}
        </div>
      </div>
    `}render(){if(!this.hass||!this._config)return d;this._ensureNative();let e=this.hass.areas?.[this._config.area],t=v(this._config);return u`
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
        ${t.map((s,i)=>this._renderItem(s,i,t.length,e))}
        <button class="add" @click=${this._add}>
          <ha-svg-icon .path=${rt}></ha-svg-icon>
          Wert hinzufügen
        </button>
      </div>
    `}};B(O,"properties",{hass:{attribute:!1},_config:{state:!0}}),B(O,"styles",j`
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
  `);customElements.define(Se,O);window.customCards=window.customCards||[];window.customCards.push({type:z,name:"Bereichskarte Plus",description:"Wie die Bereichskarte, aber du w\xE4hlst selbst, welche Werte unter dem Namen stehen.",preview:!0});et().then(tt);console.info(`%c BEREICHSKARTE-PLUS %c ${Je} `,"color:#fff;background:#6b5b95;font-weight:700","color:#6b5b95;background:#fff");export{re as areaEntityIds,ke as computeItem,He as formatWatt,Pe as powerEntityIds,Ne as powerSum,v as sensorsFromConfig};
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
