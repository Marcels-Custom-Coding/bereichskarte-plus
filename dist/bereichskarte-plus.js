var mt=Object.defineProperty;var _t=(o,e,i)=>e in o?mt(o,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[e]=i;var x=(o,e,i)=>_t(o,typeof e!="symbol"?e+"":e,i);var Z=globalThis,G=Z.ShadowRoot&&(Z.ShadyCSS===void 0||Z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,de=Symbol(),Ne=new WeakMap,N=class{constructor(e,i,s){if(this._$cssResult$=!0,s!==de)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=i}get styleSheet(){let e=this.o,i=this.t;if(G&&e===void 0){let s=i!==void 0&&i.length===1;s&&(e=Ne.get(i)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Ne.set(i,e))}return e}toString(){return this.cssText}},De=o=>new N(typeof o=="string"?o:o+"",void 0,de),D=(o,...e)=>{let i=o.length===1?o[0]:e.reduce((s,t,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(t)+o[n+1],o[0]);return new N(i,o,de)},Oe=(o,e)=>{if(G)o.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(let i of e){let s=document.createElement("style"),t=Z.litNonce;t!==void 0&&s.setAttribute("nonce",t),s.textContent=i.cssText,o.appendChild(s)}},pe=G?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let i="";for(let s of e.cssRules)i+=s.cssText;return De(i)})(o):o;var{is:gt,defineProperty:bt,getOwnPropertyDescriptor:vt,getOwnPropertyNames:yt,getOwnPropertySymbols:wt,getPrototypeOf:xt}=Object,Y=globalThis,Re=Y.trustedTypes,kt=Re?Re.emptyScript:"",$t=Y.reactiveElementPolyfillSupport,O=(o,e)=>o,ue={toAttribute(o,e){switch(e){case Boolean:o=o?kt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let i=o;switch(e){case Boolean:i=o!==null;break;case Number:i=o===null?null:Number(o);break;case Object:case Array:try{i=JSON.parse(o)}catch{i=null}}return i}},He=(o,e)=>!gt(o,e),Ue={attribute:!0,type:String,converter:ue,reflect:!1,useDefault:!1,hasChanged:He};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;var w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,i=Ue){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(e,i),!i.noAccessor){let s=Symbol(),t=this.getPropertyDescriptor(e,s,i);t!==void 0&&bt(this.prototype,e,t)}}static getPropertyDescriptor(e,i,s){let{get:t,set:n}=vt(this.prototype,e)??{get(){return this[i]},set(r){this[i]=r}};return{get:t,set(r){let a=t?.call(this);n?.call(this,r),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ue}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let e=xt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let i=this.properties,s=[...yt(i),...wt(i)];for(let t of s)this.createProperty(t,i[t])}let e=this[Symbol.metadata];if(e!==null){let i=litPropertyMetadata.get(e);if(i!==void 0)for(let[s,t]of i)this.elementProperties.set(s,t)}this._$Eh=new Map;for(let[i,s]of this.elementProperties){let t=this._$Eu(i,s);t!==void 0&&this._$Eh.set(t,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let i=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let t of s)i.unshift(pe(t))}else e!==void 0&&i.push(pe(e));return i}static _$Eu(e,i){let s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,i=this.constructor.elementProperties;for(let s of i.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Oe(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,i,s){this._$AK(e,s)}_$ET(e,i){let s=this.constructor.elementProperties.get(e),t=this.constructor._$Eu(e,s);if(t!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:ue).toAttribute(i,s.type);this._$Em=e,n==null?this.removeAttribute(t):this.setAttribute(t,n),this._$Em=null}}_$AK(e,i){let s=this.constructor,t=s._$Eh.get(e);if(t!==void 0&&this._$Em!==t){let n=s.getPropertyOptions(t),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ue;this._$Em=t;let a=r.fromAttribute(i,n.type);this[t]=a??this._$Ej?.get(t)??a,this._$Em=null}}requestUpdate(e,i,s,t=!1,n){if(e!==void 0){let r=this.constructor;if(t===!1&&(n=this[e]),s??=r.getPropertyOptions(e),!((s.hasChanged??He)(n,i)||s.useDefault&&s.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,s))))return;this.C(e,i,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,i,{useDefault:s,reflect:t,wrapped:n},r){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??i??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(i=void 0),this._$AL.set(e,i)),t===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,n]of this._$Ep)this[t]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[t,n]of s){let{wrapped:r}=n,a=this[t];r!==!0||this._$AL.has(t)||a===void 0||this.C(t,void 0,n,a)}}let e=!1,i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(i)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(i)}willUpdate(e){}_$AE(e){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(i=>this._$ET(i,this[i])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[O("elementProperties")]=new Map,w[O("finalized")]=new Map,$t?.({ReactiveElement:w}),(Y.reactiveElementVersions??=[]).push("2.1.2");var ye=globalThis,We=o=>o,J=ye.trustedTypes,Ie=J?J.createPolicy("lit-html",{createHTML:o=>o}):void 0,qe="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,Ze="?"+k,St=`<${Ze}>`,E=document,U=()=>E.createComment(""),H=o=>o===null||typeof o!="object"&&typeof o!="function",we=Array.isArray,At=o=>we(o)||typeof o?.[Symbol.iterator]=="function",fe=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Be=/-->/g,Ve=/>/g,S=RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fe=/'/g,Ke=/"/g,Ge=/^(?:script|style|textarea|title)$/i,xe=o=>(e,...i)=>({_$litType$:o,strings:e,values:i}),d=xe(1),ke=xe(2),di=xe(3),T=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),je=new WeakMap,A=E.createTreeWalker(E,129);function Ye(o,e){if(!we(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ie!==void 0?Ie.createHTML(e):e}var Et=(o,e)=>{let i=o.length-1,s=[],t,n=e===2?"<svg>":e===3?"<math>":"",r=R;for(let a=0;a<i;a++){let l=o[a],c,p,h=-1,f=0;for(;f<l.length&&(r.lastIndex=f,p=r.exec(l),p!==null);)f=r.lastIndex,r===R?p[1]==="!--"?r=Be:p[1]!==void 0?r=Ve:p[2]!==void 0?(Ge.test(p[2])&&(t=RegExp("</"+p[2],"g")),r=S):p[3]!==void 0&&(r=S):r===S?p[0]===">"?(r=t??R,h=-1):p[1]===void 0?h=-2:(h=r.lastIndex-p[2].length,c=p[1],r=p[3]===void 0?S:p[3]==='"'?Ke:Fe):r===Ke||r===Fe?r=S:r===Be||r===Ve?r=R:(r=S,t=void 0);let m=r===S&&o[a+1].startsWith("/>")?" ":"";n+=r===R?l+St:h>=0?(s.push(c),l.slice(0,h)+qe+l.slice(h)+k+m):l+k+(h===-2?a:m)}return[Ye(o,n+(o[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},W=class o{constructor({strings:e,_$litType$:i},s){let t;this.parts=[];let n=0,r=0,a=e.length-1,l=this.parts,[c,p]=Et(e,i);if(this.el=o.createElement(c,s),A.currentNode=this.el.content,i===2||i===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(t=A.nextNode())!==null&&l.length<a;){if(t.nodeType===1){if(t.hasAttributes())for(let h of t.getAttributeNames())if(h.endsWith(qe)){let f=p[r++],m=t.getAttribute(h).split(k),v=/([.?@])?(.*)/.exec(f);l.push({type:1,index:n,name:v[2],strings:m,ctor:v[1]==="."?_e:v[1]==="?"?ge:v[1]==="@"?be:z}),t.removeAttribute(h)}else h.startsWith(k)&&(l.push({type:6,index:n}),t.removeAttribute(h));if(Ge.test(t.tagName)){let h=t.textContent.split(k),f=h.length-1;if(f>0){t.textContent=J?J.emptyScript:"";for(let m=0;m<f;m++)t.append(h[m],U()),A.nextNode(),l.push({type:2,index:++n});t.append(h[f],U())}}}else if(t.nodeType===8)if(t.data===Ze)l.push({type:2,index:n});else{let h=-1;for(;(h=t.data.indexOf(k,h+1))!==-1;)l.push({type:7,index:n}),h+=k.length-1}n++}}static createElement(e,i){let s=E.createElement("template");return s.innerHTML=e,s}};function M(o,e,i=o,s){if(e===T)return e;let t=s!==void 0?i._$Co?.[s]:i._$Cl,n=H(e)?void 0:e._$litDirective$;return t?.constructor!==n&&(t?._$AO?.(!1),n===void 0?t=void 0:(t=new n(o),t._$AT(o,i,s)),s!==void 0?(i._$Co??=[])[s]=t:i._$Cl=t),t!==void 0&&(e=M(o,t._$AS(o,e.values),t,s)),e}var me=class{constructor(e,i){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:i},parts:s}=this._$AD,t=(e?.creationScope??E).importNode(i,!0);A.currentNode=t;let n=A.nextNode(),r=0,a=0,l=s[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new I(n,n.nextSibling,this,e):l.type===1?c=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(c=new ve(n,this,e)),this._$AV.push(c),l=s[++a]}r!==l?.index&&(n=A.nextNode(),r++)}return A.currentNode=E,t}p(e){let i=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,i),i+=s.strings.length-2):s._$AI(e[i])),i++}},I=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,i,s,t){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=s,this.options=t,this._$Cv=t?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,i=this._$AM;return i!==void 0&&e?.nodeType===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=M(this,e,i),H(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==T&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):At(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&H(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){let{values:i,_$litType$:s}=e,t=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=W.createElement(Ye(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===t)this._$AH.p(i);else{let n=new me(t,this),r=n.u(this.options);n.p(i),this.T(r),this._$AH=n}}_$AC(e){let i=je.get(e.strings);return i===void 0&&je.set(e.strings,i=new W(e)),i}k(e){we(this._$AH)||(this._$AH=[],this._$AR());let i=this._$AH,s,t=0;for(let n of e)t===i.length?i.push(s=new o(this.O(U()),this.O(U()),this,this.options)):s=i[t],s._$AI(n),t++;t<i.length&&(this._$AR(s&&s._$AB.nextSibling,t),i.length=t)}_$AR(e=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);e!==this._$AB;){let s=We(e).nextSibling;We(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,i,s,t,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=i,this._$AM=t,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(e,i=this,s,t){let n=this.strings,r=!1;if(n===void 0)e=M(this,e,i,0),r=!H(e)||e!==this._$AH&&e!==T,r&&(this._$AH=e);else{let a=e,l,c;for(e=n[0],l=0;l<n.length-1;l++)c=M(this,a[s+l],i,l),c===T&&(c=this._$AH[l]),r||=!H(c)||c!==this._$AH[l],c===u?e=u:e!==u&&(e+=(c??"")+n[l+1]),this._$AH[l]=c}r&&!t&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},_e=class extends z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},ge=class extends z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},be=class extends z{constructor(e,i,s,t,n){super(e,i,s,t,n),this.type=5}_$AI(e,i=this){if((e=M(this,e,i,0)??u)===T)return;let s=this._$AH,t=e===u&&s!==u||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==u&&(s===u||t);t&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ve=class{constructor(e,i,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){M(this,e)}};var Tt=ye.litHtmlPolyfillSupport;Tt?.(W,I),(ye.litHtmlVersions??=[]).push("3.3.3");var B=(o,e,i)=>{let s=i?.renderBefore??e,t=s._$litPart$;if(t===void 0){let n=i?.renderBefore??null;s._$litPart$=t=new I(e.insertBefore(U(),n),n,void 0,i??{})}return t._$AI(o),t};var $e=globalThis,y=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=B(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}};y._$litElement$=!0,y.finalized=!0,$e.litElementHydrateSupport?.({LitElement:y});var Ct=$e.litElementPolyfillSupport;Ct?.({LitElement:y});($e.litElementVersions??=[]).push("4.2.2");var g={temperature:{label:"Temperatur",icon:"mdi:thermometer",deviceClass:"temperature"},humidity:{label:"Luftfeuchte",icon:"mdi:water-percent",deviceClass:"humidity"},power:{label:"Leistung (Summe)",icon:"mdi:flash",deviceClass:"power"},entity:{label:"Beliebiger Sensor",icon:"mdi:eye"}},Xe=[{type:"temperature"},{type:"humidity"},{type:"power"}],Mt={mW:.001,W:1,kW:1e3,MW:1e6,GW:1e9},Qe=o=>o&&!["unavailable","unknown"].includes(o.state),Q=o=>Qe(o)&&o.state!==""&&!Number.isNaN(Number(o.state));function zt(o){let e=o.locale?.language||o.language||"de";switch(o.locale?.number_format){case"comma_decimal":return["en-US","en"];case"decimal_comma":return["de","es","it"];case"space_comma":return["fr","sv","cs"];case"system":return;default:return e}}function et(o,e,i=1){return new Intl.NumberFormat(zt(o),{maximumFractionDigits:i}).format(e)}var Se=(o,e)=>e?`${o}${e==="\xB0"?"":" "}${e}`:o;function $(o,e){if(Qe(e))return typeof o.formatEntityState=="function"?o.formatEntityState(e):Se(e.state,e.attributes.unit_of_measurement)}var Je=new WeakMap;function ee(o,e,i){let s=Je.get(o.entities);return s||(s=new Map,Je.set(o.entities,s)),s.has(e)||s.set(e,i()),s.get(e)}function Ae(o,e,i){return!o||!e?[]:ee(o,`sensor|${e}|${i??""}`,()=>Pt(o,e,i))}function Pt(o,e,i){let s=[];for(let[t,n]of Object.entries(o.entities||{})){if(!t.startsWith("sensor.")||n.entity_category||n.hidden||(n.area_id||(n.device_id?o.devices?.[n.device_id]?.area_id:void 0))!==e)continue;let a=o.states[t];a&&(i&&a.attributes.device_class!==i||s.push(t))}return s}function Lt(o){let e=[...o].sort((s,t)=>s-t),i=Math.floor(e.length/2);return e.length%2?e[i]:(e[i-1]+e[i])/2}function tt(o,e,i,s){let t=new Set(i.exclude||[]),n=Ae(o,e,s).filter(r=>!t.has(r));for(let r of i.include||[])!n.includes(r)&&!t.has(r)&&n.push(r);return n}function Ee(o,e,i){return tt(o,e,i,"power")}var Te=o=>!!(o.exclude?.length||o.include?.length);function Ce(o,e){let i=0,s=0;for(let t of e){let n=o.states[t];if(!Q(n))continue;let r=Mt[n.attributes.unit_of_measurement]??1;i+=Number(n.state)*r,s++}return s?i:void 0}function P(o,e){return Se(et(o,e,Math.abs(e)>=10?0:1),"W")}var X=o=>typeof o=="string"?o.replace(/^(-?[\d.,]+)[\s ]+(\S{1,6})$/,"$1\u2009$2"):o;function V(o,e,i){let s=g[i.type]?i.type:"entity",t=i.icon||g[s].icon;if(s==="entity"){let l=i.entity?o.states[i.entity]:void 0;return{text:X($(o,l)),icon:i.icon||l?.attributes.icon||g.entity.icon}}if(s==="power"){let l=Ce(o,Ee(o,e.area_id,i));return{text:l===void 0?void 0:X(P(o,l)),icon:t}}let n=i.entity||!Te(i)&&e[`${s}_entity_id`];if(n)return{text:X($(o,o.states[n])),icon:t};let r=[],a;for(let l of tt(o,e.area_id,i,g[s].deviceClass)){let c=o.states[l];if(!Q(c))continue;let p=c.attributes.unit_of_measurement;a??=p,p===a&&r.push(Number(c.state))}return r.length?{text:X(Se(et(o,Lt(r)),a)),icon:t}:{text:void 0,icon:t}}function b(o){return Array.isArray(o?.sensors)?o.sensors:(o?.sensor_classes||["temperature","humidity"]).filter(i=>g[i]&&i!=="entity").map(i=>({type:i}))}function L(o,e,i){return!o||!e?[]:ee(o,`domain|${e}|${i}`,()=>Nt(o,e,i))}function Nt(o,e,i){return Object.entries(o.entities||{}).filter(([s,t])=>!s.startsWith(`${i}.`)||t.entity_category||t.hidden?!1:(t.area_id||(t.device_id?o.devices?.[t.device_id]?.area_id:void 0))===e&&o.states[s]).map(([s])=>s)}function te(o,e){if(!(!o||!e))return ee(o,`climate|${e}`,()=>Dt(o,e))}function Dt(o,e){let i=L(o,e,"climate");return i.find(s=>o.states[s].attributes.hvac_modes?.includes("cool"))||i[0]}function ie(o,e){if(!(!o||!e))return ee(o,`power|${e}`,()=>Ot(o,e))}function Ot(o,e){let i=o.entities?.[e]?.device_id;if(!i)return;let s=Object.entries(o.entities).filter(([t,n])=>n.device_id===i&&t.startsWith("sensor.")&&o.states[t]?.attributes.device_class==="power").map(([t])=>t);return s.find(t=>!/mittel|avg|average|mean/i.test(t))||s[0]}var _=Math.PI/180;function F(o,e,i){let s=o.getTime()/864e5+24405875e-1-2451545,t=(357.529+.98560028*s)%360,r=(280.459+.98564736*s)%360+1.915*Math.sin(t*_)+.02*Math.sin(2*t*_),a=23.439-36e-8*s,l=Math.atan2(Math.cos(a*_)*Math.sin(r*_),Math.cos(r*_))/_,c=Math.asin(Math.sin(a*_)*Math.sin(r*_))/_,h=((((18.697374558+24.06570982441908*s)%24+24)%24*15+i-l)%360+540)%360-180,f=Math.asin(Math.sin(e*_)*Math.sin(c*_)+Math.cos(e*_)*Math.cos(c*_)*Math.cos(h*_))/_;return{az:(Math.atan2(-Math.sin(h*_),Math.tan(c*_)*Math.cos(e*_)-Math.sin(e*_)*Math.cos(h*_))/_+360)%360,el:f}}var Me=(o,e)=>Math.abs((o-e+540)%360-180),Rt=["Nord","Nordnordost","Nordost","Ostnordost","Ost","Osts\xFCdost","S\xFCdost","S\xFCds\xFCdost","S\xFCd","S\xFCds\xFCdwest","S\xFCdwest","Wests\xFCdwest","West","Westnordwest","Nordwest","Nordnordwest"],ne=o=>Rt[Math.round(o/22.5)%16],C={position:30,lux_threshold:2e4,spread:70,min_elevation:5,reopen:!0,reopen_position:100,pause_minutes:60};function se(o,e){return o.el>e.min_elevation&&Me(o.az,e.direction)<e.spread}function it(o,e,i,s,t=C){let n={...C,...t,direction:s},r=[],a=null;for(let l=0;l<=1440;l+=5){let c=new Date(o.getFullYear(),o.getMonth(),o.getDate(),0,l),p=se(F(c,e,i),n);p&&!a&&(a=c),!p&&a&&(r.push([a,c]),a=null)}return r}function st(o,e,i,s){if(!e||e.enabled===!1||typeof e.direction!="number"||typeof i!="number")return null;let t={...C,...e},n=o.config?.latitude,r=o.config?.longitude;if(typeof n!="number"||typeof r!="number")return null;let a=new Date,l=F(a,n,r),c=!0;if(t.lux_entity){let f=Number(o.states[t.lux_entity]?.state);c=!Number.isNaN(f)&&f>=t.lux_threshold}else t.weather_entity&&(c=["sunny","partlycloudy","clear-day"].includes(o.states[t.weather_entity]?.state));let p=typeof t.min_temp!="number"||typeof s=="number"&&s>=t.min_temp;if(se(l,t)&&c&&p&&i>t.position+2)return{kind:"close",target:t.position};if(!se(l,t)&&t.reopen&&l.el>0){let f=F(new Date(a.getTime()-54e5),n,r),m=Math.abs(i-t.position)<=5;if(se(f,t)&&m&&i<t.reopen_position-2)return{kind:"open",target:t.reopen_position}}return null}var oe=new Map,ze=new Map,Ut=o=>{let e=[...o].sort((s,t)=>s-t),i=Math.floor(e.length/2);return e.length%2?e[i]:(e[i-1]+e[i])/2};function Ht(o){let e={opening:[],closing:[]},i,s={};for(let n of o){n.a&&(s=n.a);let r={state:n.s,pos:s.current_position,t:n.lu??n.lc};if(i&&r.state===i.state&&e[r.state]&&typeof r.pos=="number"&&typeof i.pos=="number"&&r.pos!==i.pos){let a=r.t-i.t;a>.3&&a<5&&e[r.state].push(Math.abs(r.pos-i.pos)/a)}i=r}let t=n=>n.length>=3?100/Ut(n):void 0;return{open:t(e.opening),close:t(e.closing),samples:e.opening.length+e.closing.length}}function re(o,e,i){let s=oe.get(e);if(s&&Date.now()-s.at<6*36e5)return s;if(!s)try{let t=JSON.parse(localStorage.getItem(`bkp-travel-${e}`));if(t&&Date.now()-t.at<24*36e5)return oe.set(e,t),t}catch{}if(!ze.has(e)){let t=new Date,n=new Date(t.getTime()-10*864e5);ze.set(e,o.callWS({type:"history/history_during_period",start_time:n.toISOString(),end_time:t.toISOString(),entity_ids:[e],minimal_response:!1,no_attributes:!1,significant_changes_only:!1}).then(r=>{let a={...Ht(r[e]||[]),at:Date.now()};oe.set(e,a);try{localStorage.setItem(`bkp-travel-${e}`,JSON.stringify(a))}catch{}i?.(a)}).catch(()=>oe.set(e,{at:Date.now()})).finally(()=>ze.delete(e)))}return s}function Wt(o,e){return(e?o?.open:o?.close)??(e?o?.close:o?.open)??20}function nt(o,e){let i=o.attributes.current_position;if(typeof i!="number")return;let s=o.state==="opening";if(!s&&o.state!=="closing")return i;let t=(Date.now()-Date.parse(o.last_updated))/1e3,n=Math.min(Math.max(t,0),3),r=100/Wt(e,s)*n;return Math.min(100,Math.max(0,i+(s?r:-r)))}var It={cool:"mdi:snowflake",heat:"mdi:fire",heat_cool:"mdi:sun-snowflake-variant",auto:"mdi:thermostat-auto",dry:"mdi:water-percent",fan_only:"mdi:fan",off:"mdi:power"},Bt={cool:"K\xFChlen",heat:"Heizen",heat_cool:"Heizen/K\xFChlen",auto:"Automatik",dry:"Entfeuchten",fan_only:"L\xFCften",off:"Aus"},ae=o=>It[o]||"mdi:thermostat",K=o=>Bt[o]||o,ot=o=>o.toLocaleString("de-DE",{minimumFractionDigits:1,maximumFractionDigits:1});function Vt(o){let e=[],i=o._sunTip();i&&e.push(d`<button
      class="bkp-pill sun"
      @click=${t=>o._openView(t,"shutter")}
    >
      <ha-icon icon="mdi:white-balance-sunny"></ha-icon>
      ${i.kind==="close"?`Sonnenschutz ${i.target} %?`:"Wieder \xF6ffnen?"}
    </button>`);let s=o._climate();if(s){let t=["unavailable","unknown"].includes(s.st.state),n=!t&&s.st.state!=="off";e.push(d`<button
      class="bkp-pill climate ${n?`on m-${s.st.state}`:""}"
      @click=${r=>o._openView(r,"climate")}
    >
      <ha-icon .icon=${n?ae(s.st.state):"mdi:air-conditioner"}></ha-icon>
      ${n?d`${typeof s.target=="number"?`${ot(s.target)}\xB0`:""}${s.power?d`<span class="dot">·</span>${s.power}`:u}`:t?"Klima nicht erreichbar":"Klima aus"}
    </button>`)}return e.length?d`<div class="bkp-pills">${e}</div>`:u}function Ft(o,e){let s=100-o._shownPos(e);return d`<div
    class="bkp-win ${e.canSet?"drag":""} ${e.moving||o._dragPos!=null?"moving":""}"
    @pointerdown=${t=>o._windowDown(t)}
    title=${e.canSet?"Ziehen, um die H\xF6he einzustellen":""}
  >
    <div class="bkp-outside"></div>
    <div class="bkp-shutter" style="height:${s}%"></div>
    ${e.canSet?d`<div class="bkp-grip" style="top:${s}%"></div>`:u}
  </div>`}function Kt(o){let e=o._cover();if(!e)return u;let i=o._sunTip(),s=Math.round(o._shownPos(e)),t=s===0?"geschlossen":s===100?"ganz offen":"offen",n;return i?.kind==="close"?n=d`<small>Sonne steht auf dem Fenster</small>
      <b>Empfohlen ${i.target} %</b>
      <small>jetzt ${s} % offen</small>
      <button class="bkp-cta" @click=${()=>o._coverTo(i.target,!0)}>
        Übernehmen
      </button>`:i?.kind==="open"?n=d`<small>Die Sonne ist weg</small>
      <b>Wieder öffnen?</b>
      <small>jetzt ${s} % offen</small>
      <button class="bkp-cta" @click=${()=>o._coverTo(i.target,!0)}>
        Auf ${i.target} %
      </button>`:n=d`<div class="bkp-num"><span class="bkp-numv">${s}</span><span>%</span></div>
      <small>${e.moving?e.st.state==="opening"?"f\xE4hrt hoch \u2026":"f\xE4hrt runter \u2026":t}</small>
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
    ${Ft(o,e)}
    <div class="bkp-side">${n}</div>
  </div>`}function jt(o,e){let i=o._history?.points;if(!i||i.length<2)return d`<div class="bkp-hist"><small>Leistung</small><div class="bkp-hist-empty">
      ${o._history?.error?"kein Verlauf":"l\xE4dt \u2026"}
    </div></div>`;let s=i[0][0],t=i[i.length-1][0],n=Math.max(...i.map(c=>c[1]),1),r=c=>(c-s)/Math.max(t-s,1)*100,a=c=>38-c/n*34,l=`M0,${a(i[0][1]).toFixed(1)}`;for(let c=1;c<i.length;c++)l+=` H${r(i[c][0]).toFixed(1)} V${a(i[c][1]).toFixed(1)}`;return l+=" H100",d`<div class="bkp-hist">
    <small>Leistung · ${o._climateCfg().history_hours} h</small>
    <svg viewBox="0 0 100 40" preserveAspectRatio="none">
      ${ke`<path class="area" d="${l} V40 H0 Z"></path><path class="line" d="${l}"></path>`}
    </svg>
    <small class="max">max ${o._formatWatt(n)}</small>
  </div>`}function qt(o){let e=o._climate();if(!e)return u;let i=o._climateCfg(),s=e.st,t=["unavailable","unknown"].includes(s.state),n=t?"off":s.state,r=n!=="off",a=s.attributes.hvac_action,l=r&&(!a||!["idle","off"].includes(a)),c=o._pendingTarget??e.target,p=(s.attributes.hvac_modes||[]).filter(f=>f!=="off"),h=o._onMode(e);return d`<div
    class="bkp-view bkp-climateview m-${r?n:"off"} ${i.show_history?"with-hist":""}"
  >
    <div class="bkp-stage">
      <div class="bkp-unit"><i></i></div>
      ${l?d`<svg class="bkp-air" viewBox="0 0 100 60" aria-hidden="true">
            ${ke`<path d="M28,4 C24,18 34,26 29,40"></path>
              <path d="M50,4 C46,18 56,26 51,40"></path>
              <path d="M72,4 C68,18 78,26 73,40"></path>`}
          </svg>`:u}
    </div>
    <span class="bkp-chip">
      ${t?"Nicht erreichbar":r?K(n):"Aus"}${e.power?d` · ${e.power}`:u}${e.average?d` · <span title="Mittel der letzten 60 Minuten">Ø ${e.average}</span>`:u}${r&&a==="idle"?" \xB7 wartet":""}
    </span>
    ${i.show_history?jt(o,e):u}
    <div class="bkp-bar">
      <button
        class="bkp-rb ${r?"power-on":""}"
        ?disabled=${t}
        title=${r?"Ausschalten":`Einschalten: ${K(h)}`}
        @click=${()=>o._climateToggle()}
      >
        <ha-icon icon="mdi:power"></ha-icon>
        ${!r&&!t&&h?d`<span class="bkp-badge m-${h}"
              ><ha-icon .icon=${ae(h)}></ha-icon
            ></span>`:u}
      </button>
      <button class="bkp-rb flat" title="Kälter" ?disabled=${t||typeof c!="number"} @click=${()=>o._climateStep(-1)}>
        <ha-icon icon="mdi:minus"></ha-icon>
      </button>
      <span class="bkp-target">${typeof c=="number"?d`${ot(c)}<span class="unit"> °C</span>`:"\u2013"}</span>
      <button class="bkp-rb flat" title="Wärmer" ?disabled=${t||typeof c!="number"} @click=${()=>o._climateStep(1)}>
        <ha-icon icon="mdi:plus"></ha-icon>
      </button>
      <button
        class="bkp-rb flat"
        title="Betriebsart wählen"
        ?disabled=${t||!p.length}
        @click=${()=>o._toggleModeMenu()}
      >
        <ha-icon .icon=${ae(r?n:h)}></ha-icon>
      </button>
    </div>
    ${o._modeMenu&&!t?d`<div class="bkp-menu" @click=${()=>o._toggleModeMenu()}>
          ${p.map(f=>d`<button
              class="bkp-mode m-${f} ${r&&f===n?"current":""}"
              @click=${m=>{m.stopPropagation(),o._setMode(f)}}
            >
              <ha-icon .icon=${ae(f)}></ha-icon>${K(f)}
            </button>`)}
        </div>`:u}
  </div>`}function rt(o){let e=o._view;return d`
    ${e==="home"?Vt(o):u}
    ${e!=="home"?d`<div class="bkp-layer" @pointerdown=${()=>o._bump()}>
          ${e==="shutter"?Kt(o):qt(o)}
          <button
            class="bkp-close"
            title=${e===o._defaultView()?"Bild zeigen":"Zur\xFCck"}
            @click=${()=>o._setView(e===o._defaultView()?"home":o._defaultView())}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
          ${o._sticky()?u:d`<div class="bkp-timer" style="--bkp-t:${o._timeout()}s"></div>`}
        </div>`:u}
  `}var at=`
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
  /* Lamellen h\xE4ngen an der Unterkante: f\xE4hrt der Rollladen, laufen sie mit. */
  .bkp-shutter { position: absolute; left: 0; right: 0; top: 0; z-index: 2; background-image: linear-gradient(#d6cfc3 0 9px, #bcb4a6 9px 11px); background-size: 100% 11px; background-position: left bottom; background-repeat: repeat-y; border-bottom: 4px solid #9d9485; box-sizing: border-box; box-shadow: 0 2px 4px rgb(0 0 0 / 0.25); transition: height 0.4s ease-out; }
  .bkp-win.moving .bkp-shutter { transition: none; }
  .bkp-shutter[style*="height:0%"], .bkp-shutter[style*="height: 0%"] { border-bottom-width: 0; }
  .bkp-grip { position: absolute; left: 50%; z-index: 3; width: 30px; height: 6px; margin: -3px 0 0 -15px; border-radius: 3px; background: #fff; box-shadow: 0 1px 3px rgb(0 0 0 / 0.35); }
  .bkp-side { position: relative; display: grid; gap: 6px; justify-items: start; min-width: 0; }
  .bkp-side small { font-size: 12px; opacity: 0.8; }
  .bkp-side b { font-size: 18px; font-weight: 500; }
  .bkp-num { font-size: 40px; font-weight: 300; line-height: 1; font-variant-numeric: tabular-nums; }
  .bkp-num span:not(.bkp-numv) { font-size: 18px; margin-left: 2px; }
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
  .bkp-rb { position: relative; }
  .bkp-badge { position: absolute; right: -4px; top: -4px; width: 18px; height: 18px; border-radius: 50%; display: grid; place-items: center; color: #fff; background: var(--bc, #2f86d4); box-shadow: 0 0 0 2px #fff; }
  .bkp-badge ha-icon { --mdc-icon-size: 12px !important; }
  .m-cool { --bc: #2f86d4; } .m-heat { --bc: #e2692f; } .m-auto, .m-heat_cool { --bc: #6b55c9; } .m-dry, .m-fan_only { --bc: #2a9d8f; }
  .bkp-menu { position: absolute; inset: 0; z-index: 4; display: grid; grid-template-columns: repeat(auto-fit, minmax(96px, 1fr)); gap: 6px; padding: 8px; box-sizing: border-box; align-content: center; background: rgb(255 255 255 / 0.82); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
  .bkp-mode { min-height: 44px; border: 0; border-radius: 14px; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 14px; font-weight: 500; background: #fff; color: #2d3440; box-shadow: 0 1px 3px rgb(0 0 0 / 0.16); }
  .bkp-mode ha-icon { color: var(--bc); }
  .bkp-mode.current { background: var(--bc); color: #fff; }
  .bkp-mode.current ha-icon { color: #fff; }
  .bkp-mode:active { transform: scale(0.97); }
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
    .bkp-num span:not(.bkp-numv) { font-size: 12px; }
    .bkp-num span:not(.bkp-numv) { font-size: 14px; }
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
  .bkp-overlay.dark .bkp-menu { background: rgb(20 22 26 / 0.8); }
  .bkp-overlay.dark .bkp-mode { background: #3a3f47; color: #e8ecf2; }
  .bkp-overlay.dark .bkp-mode.current { background: var(--bc); color: #fff; }
  .bkp-overlay.dark .bkp-rb { background: #3a3f47; color: #e8ecf2; }
  .bkp-overlay.dark .bkp-bar .bkp-rb.flat { background: transparent; }
  .bkp-overlay.dark .bkp-bar .bkp-rb.power-on { background: var(--mc); color: #fff; }

  @media (prefers-reduced-motion: reduce) {
    .bkp-air path, .bkp-layer { animation: none; }
  }
`;var ct="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4",Zt=["https://overpass-api.de/api/interpreter","https://overpass.private.coffee/api/interpreter"],Pe=Math.PI/180,lt;function Gt(){return window.L?.map?Promise.resolve(window.L):(lt||=new Promise((o,e)=>{let i=document.createElement("script");i.src=`${ct}/leaflet.min.js`,i.onload=()=>o(window.L),i.onerror=()=>e(new Error("Leaflet nicht ladbar")),document.head.appendChild(i)}),lt)}var j=class extends y{constructor(){super(),this._satellite=!0,this._status="Lade Karte \u2026"}async firstUpdated(){let e;try{e=await Gt()}catch{this._status="Die Karte lie\xDF sich nicht laden. Trag die Gradzahl direkt ein.";return}this.L=e;let i=this.hass.config.latitude,s=this.hass.config.longitude;this.home=[i,s];let t=e.map(this.renderRoot.querySelector("#map"),{maxZoom:21}).setView(this.home,19);this.map=t,this.sat=e.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxNativeZoom:19,maxZoom:21,attribution:"Luftbild \xA9 Esri"}).addTo(t),this.plain=e.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{maxNativeZoom:20,maxZoom:21,subdomains:"abcd",attribution:"\xA9 OpenStreetMap \xA9 CARTO"}),e.circleMarker(this.home,{radius:5,color:"#fff",weight:2,fillColor:"#6b55c9",fillOpacity:1}).addTo(t).bindTooltip("Zuhause"),this.walls=e.layerGroup().addTo(t),this.sel=e.layerGroup().addTo(t),this.tmp=e.layerGroup().addTo(t),t.on("click",n=>this._mapClick(n)),setTimeout(()=>t.invalidateSize(),200),this._loadBuildings()}_toXY([e,i]){return[(i-this.home[1])*Math.cos(this.home[0]*Pe)*111320,(e-this.home[0])*110540]}_toLL([e,i]){return[this.home[0]+i/110540,this.home[1]+e/(Math.cos(this.home[0]*Pe)*111320)]}async _loadBuildings(){this._status="Lade Geb\xE4ude aus OpenStreetMap \u2026";let[e,i]=this.home,s=`[out:json][timeout:25];(way(around:120,${e},${i})["building"];relation(around:120,${e},${i})["building"];);out geom;`,t;for(let r of Zt)try{let a=await fetch(r,{method:"POST",body:`data=${encodeURIComponent(s)}`,headers:{"Content-Type":"application/x-www-form-urlencoded"},signal:AbortSignal.timeout(2e4)});if(a.ok){t=await a.json();break}}catch{}if(!t){this._status="error";return}let n=0;for(let r of t.elements)if(r.type==="way"&&r.geometry&&(this._addRing(r.geometry.map(a=>[a.lat,a.lon])),n++),r.type==="relation")for(let a of r.members||[])a.role==="outer"&&a.geometry&&(this._addRing(a.geometry.map(l=>[l.lat,l.lon])),n++);this._status=n?"Tipp auf die Hauswand, in der das Fenster ist.":"Keine Geb\xE4ude gefunden. Zeichne die Wand selbst ein."}_addRing(e){let i=this.L;if(e.length<3)return;let s=e.map(r=>this._toXY(r)),t=0;for(let r=0;r<s.length-1;r++)t+=s[r][0]*s[r+1][1]-s[r+1][0]*s[r][1];let n=t>0;i.polygon(e,{color:"#fff",weight:1.5,opacity:.9,fillColor:"#6b55c9",fillOpacity:.12,interactive:!1}).addTo(this.walls);for(let r=0;r<e.length-1;r++){let a=s[r+1][0]-s[r][0],l=s[r+1][1]-s[r][1],c=Math.hypot(a,l);if(c<.5)continue;let p=n?[l/c,-a/c]:[-l/c,a/c],h=e[r],f=e[r+1],m=i.polyline([h,f],{color:"#f0a020",weight:14,opacity:0}).addTo(this.walls);m.on("mouseover",()=>m.setStyle({opacity:.55})),m.on("mouseout",()=>m.setStyle({opacity:0})),m.on("click",v=>{i.DomEvent.stop(v),this._drawing||this._show(h,f,p)})}}_mapClick(e){if(!this._drawing)return;let i=this.L;if(this._points=[...this._points||[],[e.latlng.lat,e.latlng.lng]],i.circleMarker(e.latlng,{radius:5,color:"#fff",weight:2,fillColor:"#f0a020",fillOpacity:1}).addTo(this.tmp),this._points.length===2){let[s,t]=this._points,n=this._toXY(s),r=this._toXY(t),a=r[0]-n[0],l=r[1]-n[1],c=Math.hypot(a,l)||1;this.tmp.clearLayers(),this._drawing=!1,this._points=[],this._show(s,t,[l/c,-a/c])}}_toggleDraw(){this._drawing=!this._drawing,this._points=[],this.tmp?.clearLayers()}_show(e,i,s){let t=this.L,n=(Math.atan2(s[0],s[1])/Pe+360)%360;this._result={a:e,b:i,normal:s,az:n},this.sel.clearLayers(),t.polyline([e,i],{color:"#f0a020",weight:7,opacity:.95}).addTo(this.sel);let r=this._toXY(e),a=this._toXY(i),l=[(r[0]+a[0])/2,(r[1]+a[1])/2],c=Math.max(4,Math.min(9,Math.hypot(a[0]-r[0],a[1]-r[1])*.6)),p=[l[0]+s[0]*c,l[1]+s[1]*c],h=[-s[1],s[0]],f=[p[0]-s[0]*1.6+h[0]*1.1,p[1]-s[1]*1.6+h[1]*1.1],m=[p[0]-s[0]*1.6-h[0]*1.1,p[1]-s[1]*1.6-h[1]*1.1];t.polyline([this._toLL(l),this._toLL(p)],{color:"#6b55c9",weight:4}).addTo(this.sel),t.polygon([this._toLL(p),this._toLL(f),this._toLL(m)],{color:"#6b55c9",fillColor:"#6b55c9",fillOpacity:1,weight:1}).addTo(this.sel)}_flip(){let e=this._result;e&&this._show(e.a,e.b,[-e.normal[0],-e.normal[1]])}_accept(){this.dispatchEvent(new CustomEvent("direction-picked",{detail:{value:Math.round(this._result.az)},bubbles:!0,composed:!0}))}_layer(e){this._satellite=e,this.map&&(e?(this.map.removeLayer(this.plain),this.sat.addTo(this.map)):(this.map.removeLayer(this.sat),this.plain.addTo(this.map)))}_sunRows(){let{latitude:e,longitude:i}=this.hass.config,s=new Date().getFullYear(),t=n=>n.toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"});return[["Heute",new Date],["21. Juni",new Date(s,5,21)],["21. Dezember",new Date(s,11,21)]].map(([n,r])=>{let a=it(r,e,i,this._result.az);return d`<div><span>${n}</span><span>${a.length?a.map(([l,c])=>`${t(l)}\u2013${t(c)}`).join(", "):"gar nicht"}</span></div>`})}render(){let e=this._result;return d`
      <link rel="stylesheet" href="${ct}/leaflet.min.css" />
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
      ${e?d`<div class="result">
            <div class="deg"><b>${Math.round(e.az)}°</b><span>${ne(e.az)}</span></div>
            <div class="hint">Der Pfeil zeigt nach draußen. Zeigt er ins Haus, tippe „Andere Seite“.</div>
            <div class="sun"><b>Sonne auf dieser Wand</b>${this._sunRows()}</div>
            <div class="bar">
              <button class="primary" @click=${this._accept}>${Math.round(e.az)}° übernehmen</button>
              <button @click=${this._flip}>Andere Seite</button>
            </div>
          </div>`:u}
    `}};x(j,"properties",{hass:{attribute:!1},_result:{state:!0},_status:{state:!0},_satellite:{state:!0},_drawing:{state:!0}}),x(j,"styles",D`
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
  `);customElements.define("bkp-direction-map",j);var Yt="bereichskarte-plus-editor",Jt="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z",Xt="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z",Qt="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",ei="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",ht=["sensors","show_icons","shutter_view","climate_view","view_timeout","default_view"];function dt(o,e){return o.filter(i=>i.name!==e).map(i=>Array.isArray(i.schema)?{...i,schema:dt(i.schema,e)}:i)}var q=class extends y{setConfig(e){this._config=e,this._native?.setConfig(this._nativeConfig(e))}_nativeConfig(e){let i={...e,type:"area"};for(let s of ht)delete i[s];return i}_ensureNative(){if(this._native)return;let e=document.createElement("hui-area-card-editor"),i=e._schema;if(typeof i=="function"){let s,t;e._schema=(...n)=>{let r=i(...n);return r!==s&&(s=r,t=dt(r,"sensor_classes")),t}}e.addEventListener("config-changed",s=>{s.stopPropagation();let t={...s.detail.config,type:this._config.type};delete t.sensor_classes;for(let n of ht)this._config[n]!==void 0&&(t[n]=this._config[n]);this._fire(t)}),e.hass=this.hass,e.setConfig(this._nativeConfig(this._config)),this._native=e}shouldUpdate(e){if(this.hasUpdated&&e.size===1&&e.has("hass")){let i=e.get("hass"),s=this.hass,t=!i||!s||i.entities!==s.entities||i.devices!==s.devices||i.areas!==s.areas||i.localize!==s.localize||i.themes!==s.themes||i.config!==s.config,n=Date.now()-(this._hassRendered||0);if(!t&&n<1500)return this._hassTimer||(this._hassTimer=setTimeout(()=>{this._hassTimer=void 0,this.requestUpdate("hass",i)},1500-n)),!1}return e.has("hass")&&(this._hassRendered=Date.now()),!0}updated(e){e.has("hass")&&this._native&&(this._native.hass=this.hass)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._hassTimer),this._hassTimer=void 0}_fire(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_setSensors(e){let i={...this._config,sensors:e};delete i.sensor_classes,this._fire(i)}_updateItem(e,i){let s=[...b(this._config)],t={...s[e],...i};for(let[n,r]of Object.entries(t))(r===void 0||r===""||Array.isArray(r)&&!r.length)&&delete t[n];s[e]=t,this._setSensors(s)}_changeKind(e,i){let s=[...b(this._config)];s[e]={type:i},this._setSensors(s)}_move(e,i){let s=[...b(this._config)],t=e+i;t<0||t>=s.length||([s[e],s[t]]=[s[t],s[e]],this._setSensors(s))}_remove(e){let i=[...b(this._config)];i.splice(e,1),this._setSensors(i)}_add(){let e=[...b(this._config)],i=new Set(e.map(t=>t.type)),s=["temperature","humidity","power"].find(t=>!i.has(t))||"entity";e.push({type:s}),this._setSensors(e)}_togglePower(e,i,s){let t=b(this._config)[e],n=new Set(t.exclude||[]);s?n.delete(i):n.add(i),this._updateItem(e,{exclude:[...n]})}_renderPool(e,i,s,t,n){let r=Ae(this.hass,s?.area_id,t),a=new Set(e.exclude||[]);return d`
      ${r.length?d`<div class="power-list">
            ${r.map(l=>{let c=!a.has(l);return d`<label class="power-row ${c?"":"off"}">
                <ha-switch
                  .checked=${c}
                  @change=${p=>this._togglePower(i,l,p.target.checked)}
                ></ha-switch>
                <span class="power-name" title=${l}>${this._name(l)}</span>
                <span class="power-value"
                  >${$(this.hass,this.hass.states[l])??"\u2013"}</span
                >
              </label>`})}
          </div>`:d`<div class="hint">Im Bereich gibt es keine ${n}.</div>`}
      ${this._selector({entity:{multiple:!0,filter:{domain:"sensor",device_class:t}}},e.include||[],`Weitere ${n}`,"Sensoren aus anderen Bereichen, die hier mitz\xE4hlen sollen.",l=>this._updateItem(i,{include:l}))}
    `}_name(e){return this.hass.states[e]?.attributes.friendly_name||e}_stable(e){this._selectors||=new Map;let i=JSON.stringify(e);return this._selectors.has(i)||this._selectors.set(i,e),this._selectors.get(i)}_selector(e,i,s,t,n){return e=this._stable(e),d`<ha-selector
      .hass=${this.hass}
      .required=${!1}
      .selector=${e}
      .value=${i}
      .label=${s}
      .helper=${t}
      @value-changed=${r=>{r.stopPropagation(),n(r.detail.value)}}
    ></ha-selector>`}_renderPower(e,i,s){let t=Ce(this.hass,Ee(this.hass,s?.area_id,e));return d`
      <div class="hint">
        Alle Leistungssensoren im Bereich werden zusammengezählt. Schalte ab,
        was doppelt zählt (zum Beispiel ein Mittelwert-Sensor neben dem
        eigentlichen Messwert).
      </div>
      ${this._renderPool(e,i,s,"power","Leistungssensoren")}
      <div class="total">
        Summe jetzt: <b>${t===void 0?"\u2013":P(this.hass,t)}</b>
      </div>
    `}_renderClimate(e,i,s){let t=g[e.type],n=s?.[`${e.type}_entity_id`],r=Te(e),a=e.entity?"Dieser Sensor z\xE4hlt allein.":n&&!r?`Leer: nimmt \u201E${this._name(n)}\u201C aus den Bereichseinstellungen. Schaltest du unten etwas um, gilt stattdessen der Mittelwert deiner Auswahl.`:"Leer: Mittelwert der unten eingeschalteten Sensoren.",l=this._selector({entity:{filter:{domain:"sensor",device_class:t.deviceClass}}},e.entity||"","Fester Sensor",a,h=>this._updateItem(i,{entity:h}));if(e.entity)return l;let c=`${t.label}-Sensoren`,p=s?V(this.hass,s,e).text:void 0;return d`
      ${l}
      <div class="hint">
        Schalte ab, was den Mittelwert verfälscht (zum Beispiel einen
        Außenfühler oder einen Schimmelindikator).
      </div>
      ${this._renderPool(e,i,s,t.deviceClass,c)}
      <div class="total">Mittelwert jetzt: <b>${p??"\u2013"}</b></div>
    `}_renderItem(e,i,s,t){let n=g[e.type]?e.type:"entity",r=t?V(this.hass,t,e).text:void 0;return d`
      <div class="item">
        <div class="item-head">
          <ha-icon
            class="item-icon"
            .icon=${e.icon||g[n].icon}
          ></ha-icon>
          <div class="item-kind">
            ${this._selector({select:{mode:"dropdown",options:Object.entries(g).map(([a,l])=>({value:a,label:l.label}))}},n,"Wert",void 0,a=>a&&a!==n&&this._changeKind(i,a))}
          </div>
          <span class="current" title="Wird gerade so angezeigt"
            >${r??"\u2013"}</span
          >
          <ha-icon-button
            .path=${Jt}
            .label=${"Nach vorne"}
            title="Nach vorne"
            .disabled=${i===0}
            @click=${()=>this._move(i,-1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${Xt}
            .label=${"Nach hinten"}
            title="Nach hinten"
            .disabled=${i===s-1}
            @click=${()=>this._move(i,1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${Qt}
            .label=${"Entfernen"}
            title="Entfernen"
            @click=${()=>this._remove(i)}
          ></ha-icon-button>
        </div>
        <div class="item-body">
          ${n==="power"?this._renderPower(e,i,t):n==="entity"?this._selector({entity:{}},e.entity||"","Sensor","Zeigt den Zustand genau dieses Sensors.",a=>this._updateItem(i,{entity:a})):this._renderClimate(e,i,t)}
          ${this._config.show_icons?this._selector({icon:{placeholder:g[n].icon}},e.icon||"","Symbol","Leer lassen f\xFCr das Standardsymbol.",a=>this._updateItem(i,{icon:a})):u}
        </div>
      </div>
    `}_setSub(e,i){let s={...this._config[e]||{},...i};for(let[n,r]of Object.entries(s))(r===void 0||r===""||r===null)&&delete s[n];let t={...this._config,[e]:s};Object.keys(s).length||delete t[e],this._fire(t)}_setTip(e){let i={...this._config.shutter_view?.sun_tip||{},...e};for(let[s,t]of Object.entries(i))(t===void 0||t===""||t===null)&&delete i[s];this._setSub("shutter_view",{sun_tip:Object.keys(i).length?i:void 0})}_num(e,i,s,t,n="slider"){return{number:{min:e,max:i,step:s,mode:n,unit_of_measurement:t}}}_sunNow(e){let{latitude:i,longitude:s}=this.hass.config,t=F(new Date,i,s);if(t.el<=0)return"Gerade ist die Sonne untergegangen.";let n=typeof e=="number"&&Me(t.az,e)<70;return`Gerade steht die Sonne bei ${Math.round(t.az)}\xB0 (${ne(t.az)}), ${Math.round(t.el)}\xB0 hoch${typeof e=="number"?n?" und scheint auf dieses Fenster.":", also nicht auf dieses Fenster.":"."}`}_renderSunTip(e){let i=e.sun_tip||{},s=!!e.sun_tip&&i.enabled!==!1,t=C,n=i.lux_entity?$(this.hass,this.hass.states[i.lux_entity]):void 0;return d`
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
                ></bkp-direction-map>`:u}
            <div class="hint">${this._sunNow(i.direction)}</div>
            ${this._selector(this._num(0,100,5,"%"),i.position??t.position,"Sonnenschutz-H\xF6he","Diese H\xF6he schl\xE4gt die Karte vor. 0 % ist ganz zu.",r=>this._setTip({position:r}))}
            ${this._selector({entity:{filter:{domain:"sensor",device_class:"illuminance"}}},i.lux_entity||"","Helligkeitssensor drau\xDFen","Damit die Karte wei\xDF, ob die Sonne wirklich scheint. Ohne Sensor z\xE4hlt nur der Sonnenstand.",r=>this._setTip({lux_entity:r}))}
            ${i.lux_entity?this._selector(this._num(0,15e4,500,"lx","box"),i.lux_threshold??t.lux_threshold,"Sonne scheint ab",`Ab dieser Helligkeit gilt die Sonne als scheinend. Gerade misst der Sensor ${n??"nichts"}. Schau an einem sonnigen Tag, welcher Wert dann kommt.`,r=>this._setTip({lux_threshold:r})):this._selector({entity:{filter:{domain:"weather"}}},i.weather_entity||"","Wetter (Ersatz)","Ohne Helligkeitssensor: z\xE4hlt nur bei \u201Esonnig\u201C oder \u201Eteils sonnig\u201C.",r=>this._setTip({weather_entity:r}))}
            ${this._selector(this._num(30,90,5,"\xB0"),i.spread??t.spread,"Seitlicher Winkel","Wie schr\xE4g die Sonne noch aufs Fenster scheinen darf.",r=>this._setTip({spread:r}))}
            ${this._selector(this._num(0,40,1,"\xB0"),i.min_elevation??t.min_elevation,"Sonne ab H\xF6he","Darunter verdecken Nachbarh\xE4user oder B\xE4ume die Sonne. H\xF6her stellen, wenn bei dir etwas im Weg steht.",r=>this._setTip({min_elevation:r}))}
            ${this._selector(this._num(10,35,.5,"\xB0C","box"),i.min_temp,"Nur wenn der Raum w\xE4rmer ist als","Leer lassen: Tipp auch im Winter. Gemessen mit der Temperatur aus der Infozeile.",r=>this._setTip({min_temp:r}))}
            ${this._selector(this._num(0,240,5,"min","box"),i.pause_minutes??t.pause_minutes,"Nach einer Fahrt pausieren","F\xE4hrst du den Rollladen selbst oder f\xE4hrt er von allein, schweigt der Tipp so lange. W\xE4hrend der Fahrt kommt nie einer.",r=>this._setTip({pause_minutes:r}))}
            ${this._selector({boolean:{}},i.reopen??t.reopen,"Danach wieder \xF6ffnen vorschlagen","Ist die Sonne weg, fragt die Karte, ob der Rollladen wieder hoch soll.",r=>this._setTip({reopen:r}))}
            ${i.reopen??t.reopen?this._selector(this._num(0,100,5,"%"),i.reopen_position??t.reopen_position,"Wieder \xF6ffnen auf",void 0,r=>this._setTip({reopen_position:r})):u}
          </div>`:u}
    `}_travelHint(e){if(!e)return u;let i=re(this.hass,e,()=>this.requestUpdate()),s=n=>n.toLocaleString("de-DE",{maximumFractionDigits:1}),t;return i?i.open||i.close?t=`Fahrzeit aus dem Verlauf des Rollladens: ganz hoch ${i.open?`${s(i.open)} s`:"unbekannt"}, ganz runter ${i.close?`${s(i.close)} s`:"unbekannt"}. Damit l\xE4uft die Animation so schnell wie der echte Rollladen.`:t="Noch keine Fahrten im Verlauf gefunden. Bis dahin rechnet die Animation mit 20 Sekunden.":t="Fahrzeiten werden aus dem Verlauf gelesen \u2026",d`<div class="hint">${t}</div>`}_renderShutterSection(e){let i=this._config.shutter_view||{},s=L(this.hass,e?.area_id,"cover")[0],t=i.enabled!==!1;return d`<details class="section" ?open=${this._openShutter} @toggle=${n=>this._toggleSection("_openShutter",n)}>
      <summary><ha-icon icon="mdi:window-shutter"></ha-icon>Rollladen-Ansicht</summary>
      ${this._openShutter?d`<div class="body">
        ${this._selector({boolean:{}},t,"Rollladen-Ansicht zeigen","F\xE4hrst du den Rollladen \xFCber die Taste unten, zeigt das Bild ein Fenster, an dem du die H\xF6he ziehen kannst.",n=>this._setSub("shutter_view",{enabled:n?void 0:!1}))}
        ${t?d`
              ${this._selector({entity:{filter:{domain:"cover"}}},i.entity||"","Rollladen",s?`Leer lassen: \u201E${this._name(s)}\u201C aus dem Bereich.`:"Im Bereich ist kein Rollladen. W\xE4hle einen aus.",n=>this._setSub("shutter_view",{entity:n}))}
              ${this._travelHint(i.entity||s)}
              ${this._selector({boolean:{}},!!i.follow_moves,"Auch zeigen, wenn er von selbst f\xE4hrt","Sonst nur, wenn du ihn \xFCber die Taste unten f\xE4hrst.",n=>this._setSub("shutter_view",{follow_moves:n||void 0}))}
              ${this._renderSunTip(i)}
            `:u}
      </div>`:u}
    </details>`}_toggleSection(e,i){this[e]=i.target.open,this.requestUpdate()}_toggleExclude(e,i){let s=new Set(this._config.exclude_entities||[]);i?s.delete(e):s.add(e);let t={...this._config,exclude_entities:[...s]};t.exclude_entities.length||delete t.exclude_entities,this._fire(t)}_renderControlsSection(e){let i=[["light","Licht","mdi:lightbulb"],["switch","Schalter","mdi:toggle-switch"],["cover","Rolll\xE4den und Tore","mdi:window-shutter"],["fan","L\xFCfter","mdi:fan"]],s=new Set(this._config.exclude_entities||[]),t=i.map(([n,r,a])=>({label:r,icon:a,ids:L(this.hass,e?.area_id,n)})).filter(n=>n.ids.length);return d`<details class="section" ?open=${this._openControls} @toggle=${n=>this._toggleSection("_openControls",n)}>
      <summary><ha-icon icon="mdi:gesture-tap-button"></ha-icon>Tasten unten</summary>
      ${this._openControls?d`<div class="body">
        <div class="hint">
          Jede Taste unten schaltet alle Geräte ihrer Art im Bereich auf
          einmal. Schalte ab, was die Taste in Ruhe lassen soll.
        </div>
        ${t.length?t.map(n=>d`<div class="ctl-head">
                  <ha-icon .icon=${n.icon}></ha-icon>${n.label}
                </div>
                <div class="power-list">
                  ${n.ids.map(r=>{let a=!s.has(r);return d`<label class="power-row ${a?"":"off"}">
                      <ha-switch
                        .checked=${a}
                        @change=${l=>this._toggleExclude(r,l.target.checked)}
                      ></ha-switch>
                      <span class="power-name" title=${r}>${this._name(r)}</span>
                      <span class="power-value"
                        >${$(this.hass,this.hass.states[r])??"\u2013"}</span
                      >
                    </label>`})}
                </div>`):d`<div class="hint">Im Bereich gibt es nichts, was die Tasten schalten könnten.</div>`}
      </div>`:u}
    </details>`}_renderClimateSection(e){let i=this._config.climate_view||{},s=te(this.hass,e?.area_id),t=i.entity||s,n=t?ie(this.hass,t):void 0,r=i.enabled!==!1;return d`<details class="section" ?open=${this._openClimate} @toggle=${a=>this._toggleSection("_openClimate",a)}>
      <summary><ha-icon icon="mdi:air-conditioner"></ha-icon>Klima-Ansicht</summary>
      ${this._openClimate?d`<div class="body">
        ${this._selector({boolean:{}},r,"Klima-Ansicht zeigen","Oben rechts im Bild erscheint ein kleines Klima-Feld. Ein Tipp darauf \xF6ffnet die Bedienung: an und aus, Betriebsart, Zieltemperatur, Leistung.",a=>this._setSub("climate_view",{enabled:a?void 0:!1}))}
        ${r?d`
              ${this._selector({entity:{filter:{domain:"climate"}}},i.entity||"","Klimager\xE4t",s?`Leer lassen: \u201E${this._name(s)}\u201C aus dem Bereich.`:"Im Bereich ist kein Klimager\xE4t. W\xE4hle eines aus.",a=>this._setSub("climate_view",{entity:a}))}
              ${this._selector({entity:{filter:{domain:"sensor",device_class:"power"}}},i.power_entity||"","Leistungssensor",n?`Leer lassen: \u201E${this._name(n)}\u201C vom selben Ger\xE4t.`:"W\xE4hle den Sensor, der die Leistung der Anlage misst.",a=>this._setSub("climate_view",{power_entity:a}))}
              ${this._selector({select:{mode:"dropdown",options:[{value:"last",label:"Zuletzt genutzter Modus"},...(this.hass.states[t]?.attributes.hvac_modes||[]).filter(a=>a!=="off").map(a=>({value:a,label:K(a)}))]}},i.on_mode||"last","Einschalten mit","In diesem Modus startet der Ein-Knopf. Der Knopf zeigt ihn als kleines Symbol an.",a=>this._setSub("climate_view",{on_mode:!a||a==="last"?void 0:a}))}
              ${this._selector({boolean:{}},!!i.show_history,"Leistungsverlauf an der Seite","Zeigt rechts neben dem Ger\xE4t, wie viel die Anlage in den letzten Stunden gezogen hat.",a=>this._setSub("climate_view",{show_history:a||void 0}))}
              ${i.show_history?this._selector(this._num(1,48,1,"h"),i.history_hours??6,"Verlauf \xFCber",void 0,a=>this._setSub("climate_view",{history_hours:a})):u}
              ${this._selector({boolean:{}},!!i.stay_while_on,"Ansicht bleibt, solange die Anlage l\xE4uft","Sonst geht die Karte nach der eingestellten Zeit zur\xFCck zum Bild.",a=>this._setSub("climate_view",{stay_while_on:a||void 0}))}
            `:u}
      </div>`:u}
    </details>`}_renderGeneral(){return d`${this._selector({select:{mode:"dropdown",options:[{value:"home",label:"Bild (Foto, Kamera oder Symbol)"},{value:"climate",label:"Klima-Ansicht"}]}},this._config.default_view||"home","Startansicht","Was die Karte normalerweise zeigt. Rollladen- und andere Ansichten kehren nach der eingestellten Zeit hierher zur\xFCck. Mit dem \xD7 kommst du jederzeit zum Bild.",e=>this._fire({...this._config,default_view:e==="home"?void 0:e}))}${this._selector(this._num(5,120,5,"s"),this._config.view_timeout??20,"Zur\xFCck zum Bild nach","So lange bleibt eine andere Ansicht ohne Ber\xFChrung offen, dann kommt wieder die Startansicht.",e=>this._fire({...this._config,view_timeout:e}))}`}render(){if(!this.hass||!this._config)return u;this._ensureNative();let e=this.hass.areas?.[this._config.area],i=b(this._config);return d`
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
        ${i.map((s,t)=>this._renderItem(s,t,i.length,e))}
        <button class="add" @click=${this._add}>
          <ha-svg-icon .path=${ei}></ha-svg-icon>
          Wert hinzufügen
        </button>
      </div>
      <div class="own">
        ${this._renderControlsSection(e)}
      </div>
      <div class="own">
        <div class="own-title">
          <ha-icon icon="mdi:image-filter-center-focus"></ha-icon>
          Ansichten im Bild
        </div>
        ${this._renderShutterSection(e)}
        ${this._renderClimateSection(e)}
        ${this._renderGeneral()}
      </div>
    `}};x(q,"properties",{hass:{attribute:!1},_config:{state:!0}}),x(q,"styles",D`
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
    .ctl-head {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
      font-weight: var(--ha-font-weight-medium, 500);
    }
    .ctl-head ha-icon {
      color: var(--secondary-text-color);
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
  `);customElements.define(Yt,q);var ti="0.3.8",le="bereichskarte-plus",ii=`${le}-editor`,pt={mW:.001,W:1,kW:1e3,MW:1e6},ft=new CSSStyleSheet;ft.replaceSync(`
  /* Passt nicht alles in eine Zeile, rutscht der Rest in die n\xE4chste,
     statt mit \u201E\u2026\u201C abgeschnitten zu werden. */
  .bkp-values {
    display: flex;
    flex-wrap: wrap;
    column-gap: 4px;
    width: 100%;
  }
  .bkp-value {
    display: inline-flex;
    align-items: center;
    gap: 0;
    white-space: nowrap;
  }
  .bkp-value ha-icon {
    --mdc-icon-size: 13px;
    color: var(--secondary-text-color);
  }
  ${at}
`);async function si(){return customElements.get("hui-area-card")||(await window.loadCardHelpers()).createCardElement({type:"area",area:""}),customElements.whenDefined("hui-area-card")}var ut;function ni(){customElements.whenDefined("hui-area-controls-card-feature").then(o=>{let e=o.prototype,i=Object.getOwnPropertyDescriptor(e,"_controls");if(!i?.get||i.set||e._bkpPatched)return;let s;Object.defineProperty(e,"_controls",{configurable:!0,get(){return this._config?.controls?this._config.controls:(s||(s=i.get.call(this)),s)}}),e._bkpPatched=!0})}function oi(o){class e extends o{constructor(){super(...arguments);x(this,"_view","home")}static get styles(){return[...[super.styles].flat(),ft]}static async getConfigElement(){return await o.getConfigElement(),document.createElement(ii)}static getStubConfig(t){let n=Object.values(t.areas||{})[0];return{type:`custom:${le}`,area:n?.area_id||"",display_type:"picture",sensors:Xe,show_icons:!0,features:[{type:"area-controls"}]}}disconnectedCallback(){super.disconnectedCallback?.(),clearTimeout(this._viewTimer),clearInterval(this._histTimer),this._raf&&cancelAnimationFrame(this._raf),this._raf=null}_items(){let t=this.hass?.areas?.[this._config?.area];return t?b(this._config).map(n=>V(this.hass,t,n)).filter(n=>n.text):[]}_computeSensorsDisplay(){return Array.isArray(this._config?.sensors)?this._items().map(t=>t.text).join(" \xB7 "):super._computeSensorsDisplay()}_renderIcons(){let t=this.shadowRoot?.querySelector("ha-tile-info");if(!t)return;let n=t.querySelector(":scope > .bkp-values");if(!this._config?.show_icons||!Array.isArray(this._config.sensors)){n?.remove();return}n||(n=document.createElement("span"),n.slot="secondary",n.className="bkp-values",t.appendChild(n)),B(d`${this._items().map(r=>d`<span class="bkp-value"
              ><ha-icon .icon=${r.icon}></ha-icon>${r.text}</span
            >`)}`,n)}_shutterCfg(){let t=this._config?.shutter_view||{};if(t.enabled===!1)return null;let n=t.entity||L(this.hass,this._config.area,"cover")[0];return n?{...t,entity:n}:null}_cover(){let t=this._shutterCfg(),n=t&&this.hass.states[t.entity];if(!n)return null;let r=n.attributes.current_position,a=typeof r=="number"?r:n.state==="closed"?0:100;return{st:n,pos:a,moving:n.state==="opening"||n.state==="closing",canSet:!!((n.attributes.supported_features??0)&4),times:re(this.hass,t.entity,()=>this.requestUpdate())}}_shownPos(t){return this._dragPos!=null?this._dragPos:this._pendingPos!=null&&!t.moving?this._pendingPos:t.moving?nt(t.st,t.times)??t.pos:t.pos}_tick(){this._raf=null;let t=this._cover();if(!t?.moving||this._view!=="shutter"||this._dragPos!=null)return;let n=this._shownPos(t),r=this.shadowRoot,a=r?.querySelector(".bkp-shutter");a&&(a.style.height=`${100-n}%`);let l=r?.querySelector(".bkp-grip");l&&(l.style.top=`${100-n}%`);let c=r?.querySelector(".bkp-numv"),p=c&&[...c.childNodes].find(h=>h.nodeType===3);p&&(p.nodeValue=String(Math.round(n))),this._raf=requestAnimationFrame(()=>this._tick())}_roomTemp(){let t=this.hass.areas?.[this._config.area],r=b(this._config).find(l=>l.type==="temperature")?.entity||t?.temperature_entity_id,a=r?Number(this.hass.states[r]?.state):NaN;return Number.isNaN(a)?void 0:a}_sunTip(){let t=this._cover();return!t||t.moving||this._dragPos!=null||Date.now()<this._tipPausedUntil()?null:st(this.hass,this._shutterCfg().sun_tip,this._shownPos(t),this._roomTemp())}_tipPauseKey(){return`bkp-tip-pause-${this._shutterCfg()?.entity}`}_tipPausedUntil(){if(this._tipPause==null){let t=0;try{t=Number(localStorage.getItem(this._tipPauseKey()))}catch{}this._tipPause=Number.isFinite(t)?t:0}return this._tipPause}_pauseTip(){let t=this._shutterCfg();if(!t)return;let n=t.sun_tip?.pause_minutes??C.pause_minutes;this._tipPause=Date.now()+n*6e4;try{localStorage.setItem(this._tipPauseKey(),String(this._tipPause))}catch{}}_coverCmd(t){let n=this._shutterCfg();this._pendingPos=null,this._pauseTip(),this.hass.callService("cover",t,{},{entity_id:n.entity}),this._bump()}_coverTo(t,n=!1){let r=this._shutterCfg();n?this._tipMoveUntil=Date.now()+9e4:this._pauseTip(),this._pendingPos=t,this._pendingSince=Date.now(),this.hass.callService("cover","set_cover_position",{position:t},{entity_id:r.entity}),this.requestUpdate(),this._bump()}_windowDown(t){if(!this._cover()?.canSet)return;t.preventDefault();let r=t.currentTarget;r.setPointerCapture(t.pointerId);let a=c=>{let p=r.getBoundingClientRect(),h=1-(c.clientY-p.top)/p.height;this._dragPos=Math.round(Math.min(1,Math.max(0,h))*100),this.requestUpdate()},l=()=>{r.removeEventListener("pointermove",a),r.removeEventListener("pointerup",l),r.removeEventListener("pointercancel",l);let c=this._dragPos;this._dragPos=null,c!=null&&this._coverTo(c)};r.addEventListener("pointermove",a),r.addEventListener("pointerup",l),r.addEventListener("pointercancel",l),a(t),this._bump()}_climateCfg(){let t=this._config?.climate_view||{};if(t.enabled===!1)return null;let n=t.entity||te(this.hass,this._config.area);return n?{show_history:!1,history_hours:6,stay_while_on:!1,...t,entity:n,power_entity:t.power_entity||ie(this.hass,n)}:null}_formatWatt(t){return P(this.hass,t)}_climate(){let t=this._climateCfg(),n=t&&this.hass.states[t.entity];if(!n)return null;let r=n.attributes.temperature;this._pendingTarget!=null&&(r===this._pendingTarget||this._targetSent&&Date.now()-this._targetSent>1e4)&&(this._pendingTarget=null,this._targetSent=null);let a=t.power_entity?this.hass.states[t.power_entity]:null;return{st:n,cfg:t,target:typeof r=="number"?r:void 0,power:Q(a)?$(this.hass,a):void 0,average:this._avg?.id===t.power_entity&&this._avg.value!==void 0?P(this.hass,this._avg.value):void 0}}_climateToggle(){let t=this._climate(),n=t.st.attributes.supported_features??0,r={entity_id:t.cfg.entity};if(t.st.state!=="off")n&128?this.hass.callService("climate","turn_off",{},r):this.hass.callService("climate","set_hvac_mode",{hvac_mode:"off"},r);else{let a=this._onMode(t);a?this.hass.callService("climate","set_hvac_mode",{hvac_mode:a},r):n&256&&this.hass.callService("climate","turn_on",{},r)}this._bump()}_onMode(t){let n=(t.st.attributes.hvac_modes||[]).filter(a=>a!=="off");if(n.includes(t.cfg.on_mode))return t.cfg.on_mode;let r;try{r=localStorage.getItem(`bkp-last-mode-${t.cfg.entity}`)}catch{}return n.includes(r)?r:n.includes("heat")?"heat":n[0]}_rememberMode(){let t=this._climate(),n=t?.st.state;if(!(!n||["off","unavailable","unknown"].includes(n))&&n!==this._lastMode){this._lastMode=n;try{localStorage.setItem(`bkp-last-mode-${t.cfg.entity}`,n)}catch{}}}_toggleModeMenu(){this._modeMenu=!this._modeMenu,this.requestUpdate(),this._bump()}_setMode(t){let n=this._climate();this._modeMenu=!1,t!==n.st.state&&this.hass.callService("climate","set_hvac_mode",{hvac_mode:t},{entity_id:n.cfg.entity}),this.requestUpdate(),this._bump()}async _loadAverage(){let t=this._climateCfg()?.power_entity;if(!t)return;this._avgAt=Date.now();let n=new Date,r=new Date(n.getTime()-36e5);try{let a=await this.hass.callWS({type:"history/history_during_period",start_time:r.toISOString(),end_time:n.toISOString(),entity_ids:[t],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),l=pt[this.hass.states[t]?.attributes.unit_of_measurement]??1,c=a[t]||[],p=0,h=0;c.forEach((f,m)=>{let v=Math.max((f.lu??f.lc??0)*1e3,r.getTime()),ce=c[m+1],he=ce?(ce.lu??ce.lc)*1e3:n.getTime(),Le=Number(f.s);Number.isNaN(Le)||f.s===""||he<=v||(p+=Le*l*(he-v),h+=he-v)}),this._avg={id:t,value:h?p/h:void 0}}catch{this._avg={id:t,value:void 0}}this.requestUpdate()}_climateStep(t){let n=this._climate(),r=n.st.attributes,a=r.target_temp_step||.5,l=this._pendingTarget??n.target;if(typeof l!="number")return;let c=Math.min(r.max_temp??35,Math.max(r.min_temp??7,Math.round((l+t*a)/a)*a));this._pendingTarget=c,this._targetSent=null,this.requestUpdate(),clearTimeout(this._targetTimer),this._targetTimer=setTimeout(()=>{this._targetSent=Date.now(),this.hass.callService("climate","set_temperature",{temperature:c},{entity_id:n.cfg.entity})},700),this._bump()}async _loadHistory(){let t=this._climateCfg(),n=t?.power_entity;if(!n)return;let r=new Date,a=new Date(r.getTime()-t.history_hours*36e5);try{let l=await this.hass.callWS({type:"history/history_during_period",start_time:a.toISOString(),end_time:r.toISOString(),entity_ids:[n],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),c=this.hass.states[n]?.attributes.unit_of_measurement,p=pt[c]??1,h=(l[n]||[]).map(f=>[Math.max((f.lu??f.lc??0)*1e3,a.getTime()),Number(f.s)*p]).filter(f=>!Number.isNaN(f[1]));h.length&&h.push([r.getTime(),h[h.length-1][1]]),this._history={points:h}}catch{this._history={points:[],error:!0}}this.requestUpdate()}_timeout(){return this._config?.view_timeout??20}_defaultView(){return this._config?.default_view==="climate"&&this._climate()?"climate":"home"}_sticky(){if(this._view===this._defaultView())return!0;if(this._view!=="climate")return!1;let t=this._climate();return!!(t?.cfg.stay_while_on&&t.st.state!=="off")}_openView(t,n){t.stopPropagation(),this._setView(n)}_setView(t){this._view=t,this._dragPos=null,this._modeMenu=!1,clearInterval(this._histTimer),t==="climate"&&this._climateCfg()?.show_history&&(this._history=null,this._loadHistory(),this._histTimer=setInterval(()=>this._loadHistory(),3e5)),this.requestUpdate(),this._bump()}_bump(){clearTimeout(this._viewTimer);let t=this.shadowRoot?.querySelector(".bkp-timer");t&&(t.style.animation="none",t.offsetWidth,t.style.animation=""),this._view!==this._defaultView()&&(this._viewTimer=setTimeout(()=>{this._sticky()?this._bump():this._setView(this._defaultView())},this._timeout()*1e3))}_renderOverlay(){let t=this.shadowRoot?.querySelector(".header"),n=this._shutterCfg()||this._climateCfg(),r=t?.querySelector(":scope > .bkp-overlay");if(!t||!n){r?.remove();return}r||(r=document.createElement("div"),r.className="bkp-overlay",t.appendChild(r)),r.classList.toggle("dark",!!this.hass.themes?.darkMode),B(rt(this),r)}_watchCover(){let t=this._cover();if(!t)return;let n=t.st.state;this._pendingPos!=null&&(t.moving||t.pos===this._pendingPos||Date.now()-this._pendingSince>8e3)&&(this._pendingPos=null);let r=Date.now()<(this._armedUntil||0)||this._shutterCfg().follow_moves,a=this._lastCoverState&&n!==this._lastCoverState&&t.moving;a&&Date.now()>(this._tipMoveUntil||0)&&this._pauseTip(),a&&r&&this._view!=="shutter"&&this._setView("shutter"),this._lastCoverState=n}updated(t){if(super.updated?.(t),!this._clickHooked&&this.shadowRoot&&(this._clickHooked=!0,this.shadowRoot.addEventListener("click",r=>{r.composedPath().some(a=>a.tagName==="HUI-CARD-FEATURES")&&(this._armedUntil=Date.now()+5e3)},!0)),!this.hass||!this._config)return;!ut&&this.hass.user?.is_admin&&(ut=setTimeout(()=>{o.getConfigElement().catch(()=>{})},4e3));let n=this._defaultView();if(n!==this._lastDefault){this._lastDefault=n,this._setView(n);return}this._renderIcons(),this._rememberMode(),this._climateCfg()?.power_entity&&Date.now()-(this._avgAt||0)>6e4&&this._loadAverage(),this._watchCover(),this._renderOverlay(),this._view==="shutter"&&!this._raf&&this._cover()?.moving&&(this._raf=requestAnimationFrame(()=>this._tick()))}}customElements.define(le,e)}window.customCards=window.customCards||[];window.customCards.push({type:le,name:"Bereichskarte Plus",description:"Wie die Bereichskarte, aber du w\xE4hlst selbst, welche Werte unter dem Namen stehen. Mit Rollladen- und Klima-Ansicht.",preview:!0});ni();si().then(oi);console.info(`%c BEREICHSKARTE-PLUS %c ${ti} `,"color:#fff;background:#6b55c9;font-weight:700","color:#6b55c9;background:#fff");
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
