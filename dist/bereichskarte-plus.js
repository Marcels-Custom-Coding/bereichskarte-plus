var ae=Object.defineProperty;var le=(n,t,e)=>t in n?ae(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var w=(n,t,e)=>le(n,typeof t!="symbol"?t+"":t,e);var K=globalThis,q=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,at=Symbol(),Et=new WeakMap,M=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==at)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(q&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Et.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Et.set(e,t))}return t}toString(){return this.cssText}},Ct=n=>new M(typeof n=="string"?n:n+"",void 0,at),L=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new M(e,n,at)},Tt=(n,t)=>{if(q)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=K.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},lt=q?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Ct(e)})(n):n;var{is:ce,defineProperty:he,getOwnPropertyDescriptor:de,getOwnPropertyNames:pe,getOwnPropertySymbols:ue,getPrototypeOf:fe}=Object,Z=globalThis,zt=Z.trustedTypes,me=zt?zt.emptyScript:"",_e=Z.reactiveElementPolyfillSupport,P=(n,t)=>n,ct={toAttribute(n,t){switch(t){case Boolean:n=n?me:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Lt=(n,t)=>!ce(n,t),Mt={attribute:!0,type:String,converter:ct,reflect:!1,useDefault:!1,hasChanged:Lt};Symbol.metadata??=Symbol("metadata"),Z.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Mt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&he(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=de(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let a=i?.call(this);o?.call(this,r),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Mt}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let t=fe(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let e=this.properties,s=[...pe(e),...ue(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(lt(i))}else t!==void 0&&e.push(lt(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Tt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:ct).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:ct;this._$Em=i;let a=r.fromAttribute(e,o.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let r=this.constructor;if(i===!1&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??Lt)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:r}=o,a=this[i];r!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,o,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[P("elementProperties")]=new Map,y[P("finalized")]=new Map,_e?.({ReactiveElement:y}),(Z.reactiveElementVersions??=[]).push("2.1.2");var _t=globalThis,Pt=n=>n,G=_t.trustedTypes,Nt=G?G.createPolicy("lit-html",{createHTML:n=>n}):void 0,Wt="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,Bt="?"+x,ge=`<${Bt}>`,S=document,D=()=>S.createComment(""),O=n=>n===null||typeof n!="object"&&typeof n!="function",gt=Array.isArray,be=n=>gt(n)||typeof n?.[Symbol.iterator]=="function",ht=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Dt=/-->/g,Ot=/>/g,k=RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Rt=/'/g,Ht=/"/g,Vt=/^(?:script|style|textarea|title)$/i,bt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),d=bt(1),vt=bt(2),oi=bt(3),A=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Ut=new WeakMap,$=S.createTreeWalker(S,129);function It(n,t){if(!gt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Nt!==void 0?Nt.createHTML(t):t}var ve=(n,t)=>{let e=n.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",r=N;for(let a=0;a<e;a++){let l=n[a],c,p,h=-1,f=0;for(;f<l.length&&(r.lastIndex=f,p=r.exec(l),p!==null);)f=r.lastIndex,r===N?p[1]==="!--"?r=Dt:p[1]!==void 0?r=Ot:p[2]!==void 0?(Vt.test(p[2])&&(i=RegExp("</"+p[2],"g")),r=k):p[3]!==void 0&&(r=k):r===k?p[0]===">"?(r=i??N,h=-1):p[1]===void 0?h=-2:(h=r.lastIndex-p[2].length,c=p[1],r=p[3]===void 0?k:p[3]==='"'?Ht:Rt):r===Ht||r===Rt?r=k:r===Dt||r===Ot?r=N:(r=k,i=void 0);let _=r===k&&n[a+1].startsWith("/>")?" ":"";o+=r===N?l+ge:h>=0?(s.push(c),l.slice(0,h)+Wt+l.slice(h)+x+_):l+x+(h===-2?a:_)}return[It(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},R=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0,a=t.length-1,l=this.parts,[c,p]=ve(t,e);if(this.el=n.createElement(c,s),$.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=$.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(Wt)){let f=p[r++],_=i.getAttribute(h).split(x),C=/([.?@])?(.*)/.exec(f);l.push({type:1,index:o,name:C[2],strings:_,ctor:C[1]==="."?pt:C[1]==="?"?ut:C[1]==="@"?ft:z}),i.removeAttribute(h)}else h.startsWith(x)&&(l.push({type:6,index:o}),i.removeAttribute(h));if(Vt.test(i.tagName)){let h=i.textContent.split(x),f=h.length-1;if(f>0){i.textContent=G?G.emptyScript:"";for(let _=0;_<f;_++)i.append(h[_],D()),$.nextNode(),l.push({type:2,index:++o});i.append(h[f],D())}}}else if(i.nodeType===8)if(i.data===Bt)l.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(x,h+1))!==-1;)l.push({type:7,index:o}),h+=x.length-1}o++}}static createElement(t,e){let s=S.createElement("template");return s.innerHTML=t,s}};function T(n,t,e=n,s){if(t===A)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=O(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=T(n,i._$AS(n,t.values),i,s)),t}var dt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??S).importNode(e,!0);$.currentNode=i;let o=$.nextNode(),r=0,a=0,l=s[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new H(o,o.nextSibling,this,t):l.type===1?c=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(c=new mt(o,this,t)),this._$AV.push(c),l=s[++a]}r!==l?.index&&(o=$.nextNode(),r++)}return $.currentNode=S,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},H=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=T(this,t,e),O(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):be(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=R.createElement(It(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new dt(i,this),r=o.u(this.options);o.p(e),this.T(r),this._$AH=o}}_$AC(t){let e=Ut.get(t.strings);return e===void 0&&Ut.set(t.strings,e=new R(t)),e}k(t){gt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new n(this.O(D()),this.O(D()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=Pt(t).nextSibling;Pt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(t,e=this,s,i){let o=this.strings,r=!1;if(o===void 0)t=T(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==A,r&&(this._$AH=t);else{let a=t,l,c;for(t=o[0],l=0;l<o.length-1;l++)c=T(this,a[s+l],e,l),c===A&&(c=this._$AH[l]),r||=!O(c)||c!==this._$AH[l],c===u?t=u:t!==u&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}r&&!i&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},pt=class extends z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},ut=class extends z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},ft=class extends z{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=T(this,t,e,0)??u)===A)return;let s=this._$AH,i=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==u&&(s===u||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},mt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){T(this,t)}};var ye=_t.litHtmlPolyfillSupport;ye?.(R,H),(_t.litHtmlVersions??=[]).push("3.3.3");var U=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new H(t.insertBefore(D(),o),o,void 0,e??{})}return i._$AI(n),i};var yt=globalThis,v=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=U(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};v._$litElement$=!0,v.finalized=!0,yt.litElementHydrateSupport?.({LitElement:v});var we=yt.litElementPolyfillSupport;we?.({LitElement:v});(yt.litElementVersions??=[]).push("4.2.2");var g={temperature:{label:"Temperatur",icon:"mdi:thermometer",deviceClass:"temperature"},humidity:{label:"Luftfeuchte",icon:"mdi:water-percent",deviceClass:"humidity"},power:{label:"Leistung (Summe)",icon:"mdi:flash",deviceClass:"power"},entity:{label:"Beliebiger Sensor",icon:"mdi:eye"}},jt=[{type:"temperature"},{type:"humidity"},{type:"power"}],xe={mW:.001,W:1,kW:1e3,MW:1e6,GW:1e9},Kt=n=>n&&!["unavailable","unknown"].includes(n.state),Y=n=>Kt(n)&&n.state!==""&&!Number.isNaN(Number(n.state));function ke(n){let t=n.locale?.language||n.language||"de";switch(n.locale?.number_format){case"comma_decimal":return["en-US","en"];case"decimal_comma":return["de","es","it"];case"space_comma":return["fr","sv","cs"];case"system":return;default:return t}}function qt(n,t,e=1){return new Intl.NumberFormat(ke(n),{maximumFractionDigits:e}).format(t)}var wt=(n,t)=>t?`${n}${t==="\xB0"?"":" "}${t}`:n;function E(n,t){if(Kt(t))return typeof n.formatEntityState=="function"?n.formatEntityState(t):wt(t.state,t.attributes.unit_of_measurement)}var Ft=new WeakMap;function X(n,t,e){let s=Ft.get(n.entities);return s||(s=new Map,Ft.set(n.entities,s)),s.has(t)||s.set(t,e()),s.get(t)}function J(n,t,e){return!n||!t?[]:X(n,`sensor|${t}|${e??""}`,()=>$e(n,t,e))}function $e(n,t,e){let s=[];for(let[i,o]of Object.entries(n.entities||{})){if(!i.startsWith("sensor.")||o.entity_category||o.hidden||(o.area_id||(o.device_id?n.devices?.[o.device_id]?.area_id:void 0))!==t)continue;let a=n.states[i];a&&(e&&a.attributes.device_class!==e||s.push(i))}return s}function Se(n){let t=[...n].sort((s,i)=>s-i),e=Math.floor(t.length/2);return t.length%2?t[e]:(t[e-1]+t[e])/2}function xt(n,t,e){let s=new Set(e.exclude||[]),i=J(n,t,"power").filter(o=>!s.has(o));for(let o of e.include||[])!i.includes(o)&&!s.has(o)&&i.push(o);return i}function kt(n,t){let e=0,s=0;for(let i of t){let o=n.states[i];if(!Y(o))continue;let r=xe[o.attributes.unit_of_measurement]??1;e+=Number(o.state)*r,s++}return s?e:void 0}function W(n,t){return wt(qt(n,t,Math.abs(t)>=10?0:1),"W")}function Q(n,t,e){let s=g[e.type]?e.type:"entity",i=e.icon||g[s].icon;if(s==="entity"){let l=e.entity?n.states[e.entity]:void 0;return{text:E(n,l),icon:e.icon||l?.attributes.icon||g.entity.icon}}if(s==="power"){let l=kt(n,xt(n,t.area_id,e));return{text:l===void 0?void 0:W(n,l),icon:i}}let o=e.entity||t[`${s}_entity_id`];if(o)return{text:E(n,n.states[o]),icon:i};let r=[],a;for(let l of J(n,t.area_id,g[s].deviceClass)){let c=n.states[l];if(!Y(c))continue;let p=c.attributes.unit_of_measurement;a??=p,p===a&&r.push(Number(c.state))}return r.length?{text:wt(qt(n,Se(r)),a),icon:i}:{text:void 0,icon:i}}function b(n){return Array.isArray(n?.sensors)?n.sensors:(n?.sensor_classes||["temperature","humidity"]).filter(e=>g[e]&&e!=="entity").map(e=>({type:e}))}function B(n,t,e){return!n||!t?[]:X(n,`domain|${t}|${e}`,()=>Ae(n,t,e))}function Ae(n,t,e){return Object.entries(n.entities||{}).filter(([s,i])=>!s.startsWith(`${e}.`)||i.entity_category||i.hidden?!1:(i.area_id||(i.device_id?n.devices?.[i.device_id]?.area_id:void 0))===t&&n.states[s]).map(([s])=>s)}function tt(n,t){if(!(!n||!t))return X(n,`climate|${t}`,()=>Ee(n,t))}function Ee(n,t){let e=B(n,t,"climate");return e.find(s=>n.states[s].attributes.hvac_modes?.includes("cool"))||e[0]}function et(n,t){if(!(!n||!t))return X(n,`power|${t}`,()=>Ce(n,t))}function Ce(n,t){let e=n.entities?.[t]?.device_id;if(!e)return;let s=Object.entries(n.entities).filter(([i,o])=>o.device_id===e&&i.startsWith("sensor.")&&n.states[i]?.attributes.device_class==="power").map(([i])=>i);return s.find(i=>!/mittel|avg|average|mean/i.test(i))||s[0]}var m=Math.PI/180;function V(n,t,e){let s=n.getTime()/864e5+24405875e-1-2451545,i=(357.529+.98560028*s)%360,r=(280.459+.98564736*s)%360+1.915*Math.sin(i*m)+.02*Math.sin(2*i*m),a=23.439-36e-8*s,l=Math.atan2(Math.cos(a*m)*Math.sin(r*m),Math.cos(r*m))/m,c=Math.asin(Math.sin(a*m)*Math.sin(r*m))/m,h=((((18.697374558+24.06570982441908*s)%24+24)%24*15+e-l)%360+540)%360-180,f=Math.asin(Math.sin(t*m)*Math.sin(c*m)+Math.cos(t*m)*Math.cos(c*m)*Math.cos(h*m))/m;return{az:(Math.atan2(-Math.sin(h*m),Math.tan(c*m)*Math.cos(t*m)-Math.sin(t*m)*Math.cos(h*m))/m+360)%360,el:f}}var $t=(n,t)=>Math.abs((n-t+540)%360-180),Te=["Nord","Nordnordost","Nordost","Ostnordost","Ost","Osts\xFCdost","S\xFCdost","S\xFCds\xFCdost","S\xFCd","S\xFCds\xFCdwest","S\xFCdwest","Wests\xFCdwest","West","Westnordwest","Nordwest","Nordnordwest"],st=n=>Te[Math.round(n/22.5)%16],I={position:30,lux_threshold:2e4,spread:70,min_elevation:5,reopen:!0,reopen_position:100};function it(n,t){return n.el>t.min_elevation&&$t(n.az,t.direction)<t.spread}function Zt(n,t,e,s,i=I){let o={...I,...i,direction:s},r=[],a=null;for(let l=0;l<=1440;l+=5){let c=new Date(n.getFullYear(),n.getMonth(),n.getDate(),0,l),p=it(V(c,t,e),o);p&&!a&&(a=c),!p&&a&&(r.push([a,c]),a=null)}return r}function Gt(n,t,e,s){if(!t||t.enabled===!1||typeof t.direction!="number"||typeof e!="number")return null;let i={...I,...t},o=n.config?.latitude,r=n.config?.longitude;if(typeof o!="number"||typeof r!="number")return null;let a=new Date,l=V(a,o,r),c=!0;if(i.lux_entity){let f=Number(n.states[i.lux_entity]?.state);c=!Number.isNaN(f)&&f>=i.lux_threshold}else i.weather_entity&&(c=["sunny","partlycloudy","clear-day"].includes(n.states[i.weather_entity]?.state));let p=typeof i.min_temp!="number"||typeof s=="number"&&s>=i.min_temp;if(it(l,i)&&c&&p&&e>i.position+2)return{kind:"close",target:i.position};if(!it(l,i)&&i.reopen&&l.el>0){let f=V(new Date(a.getTime()-54e5),o,r),_=Math.abs(e-i.position)<=5;if(it(f,i)&&_&&e<i.reopen_position-2)return{kind:"open",target:i.reopen_position}}return null}var nt=new Map,St=new Map,ze=n=>{let t=[...n].sort((s,i)=>s-i),e=Math.floor(t.length/2);return t.length%2?t[e]:(t[e-1]+t[e])/2};function Me(n){let t={opening:[],closing:[]},e,s={};for(let o of n){o.a&&(s=o.a);let r={state:o.s,pos:s.current_position,t:o.lu??o.lc};if(e&&r.state===e.state&&t[r.state]&&typeof r.pos=="number"&&typeof e.pos=="number"&&r.pos!==e.pos){let a=r.t-e.t;a>.3&&a<5&&t[r.state].push(Math.abs(r.pos-e.pos)/a)}e=r}let i=o=>o.length>=3?100/ze(o):void 0;return{open:i(t.opening),close:i(t.closing),samples:t.opening.length+t.closing.length}}function ot(n,t,e){let s=nt.get(t);if(s&&Date.now()-s.at<6*36e5)return s;if(!s)try{let i=JSON.parse(localStorage.getItem(`bkp-travel-${t}`));if(i&&Date.now()-i.at<24*36e5)return nt.set(t,i),i}catch{}if(!St.has(t)){let i=new Date,o=new Date(i.getTime()-10*864e5);St.set(t,n.callWS({type:"history/history_during_period",start_time:o.toISOString(),end_time:i.toISOString(),entity_ids:[t],minimal_response:!1,no_attributes:!1,significant_changes_only:!1}).then(r=>{let a={...Me(r[t]||[]),at:Date.now()};nt.set(t,a);try{localStorage.setItem(`bkp-travel-${t}`,JSON.stringify(a))}catch{}e?.(a)}).catch(()=>nt.set(t,{at:Date.now()})).finally(()=>St.delete(t)))}return s}function Le(n,t){return(t?n?.open:n?.close)??(t?n?.close:n?.open)??20}function Yt(n,t){let e=n.attributes.current_position;if(typeof e!="number")return;let s=n.state==="opening";if(!s&&n.state!=="closing")return e;let i=(Date.now()-Date.parse(n.last_updated))/1e3,o=Math.min(Math.max(i,0),3),r=100/Le(t,s)*o;return Math.min(100,Math.max(0,e+(s?r:-r)))}var Pe={cool:"mdi:snowflake",heat:"mdi:fire",heat_cool:"mdi:sun-snowflake-variant",auto:"mdi:thermostat-auto",dry:"mdi:water-percent",fan_only:"mdi:fan",off:"mdi:power"},Ne={cool:"K\xFChlen",heat:"Heizen",heat_cool:"Heizen/K\xFChlen",auto:"Automatik",dry:"Entfeuchten",fan_only:"L\xFCften",off:"Aus"},Xt=n=>Pe[n]||"mdi:thermostat",De=n=>Ne[n]||n,Jt=n=>n.toLocaleString("de-DE",{minimumFractionDigits:1,maximumFractionDigits:1});function Oe(n){let t=[],e=n._sunTip();e&&t.push(d`<button
      class="bkp-pill sun"
      @click=${i=>n._openView(i,"shutter")}
    >
      <ha-icon icon="mdi:white-balance-sunny"></ha-icon>
      ${e.kind==="close"?`Sonnenschutz ${e.target} %?`:"Wieder \xF6ffnen?"}
    </button>`);let s=n._climate();if(s){let i=["unavailable","unknown"].includes(s.st.state),o=!i&&s.st.state!=="off";t.push(d`<button
      class="bkp-pill climate ${o?`on m-${s.st.state}`:""}"
      @click=${r=>n._openView(r,"climate")}
    >
      <ha-icon .icon=${o?Xt(s.st.state):"mdi:air-conditioner"}></ha-icon>
      ${o?d`${typeof s.target=="number"?`${Jt(s.target)}\xB0`:""}${s.power?d`<span class="dot">·</span>${s.power}`:u}`:i?"Klima nicht erreichbar":"Klima aus"}
    </button>`)}return t.length?d`<div class="bkp-pills">${t}</div>`:u}function Re(n,t){let s=100-n._shownPos(t);return d`<div
    class="bkp-win ${t.canSet?"drag":""} ${t.moving||n._dragPos!=null?"moving":""}"
    @pointerdown=${i=>n._windowDown(i)}
    title=${t.canSet?"Ziehen, um die H\xF6he einzustellen":""}
  >
    <div class="bkp-outside"></div>
    <div class="bkp-shutter" style="height:${s}%"></div>
    ${t.canSet?d`<div class="bkp-grip" style="top:${s}%"></div>`:u}
  </div>`}function He(n){let t=n._cover();if(!t)return u;let e=n._sunTip(),s=Math.round(n._shownPos(t)),i=s===0?"geschlossen":s===100?"ganz offen":"offen",o;return e?.kind==="close"?o=d`<small>Sonne steht auf dem Fenster</small>
      <b>Empfohlen ${e.target} %</b>
      <small>jetzt ${s} % offen</small>
      <button class="bkp-cta" @click=${()=>n._coverTo(e.target)}>
        Übernehmen
      </button>`:e?.kind==="open"?o=d`<small>Die Sonne ist weg</small>
      <b>Wieder öffnen?</b>
      <small>jetzt ${s} % offen</small>
      <button class="bkp-cta" @click=${()=>n._coverTo(e.target)}>
        Auf ${e.target} %
      </button>`:o=d`<div class="bkp-num"><span class="bkp-numv">${s}</span><span>%</span></div>
      <small>${t.moving?t.st.state==="opening"?"f\xE4hrt hoch \u2026":"f\xE4hrt runter \u2026":i}</small>
      <div class="bkp-row">
        <button class="bkp-rb" title="Auf" @click=${()=>n._coverCmd("open_cover")}>
          <ha-icon icon="mdi:arrow-up"></ha-icon>
        </button>
        <button class="bkp-rb" title="Stopp" @click=${()=>n._coverCmd("stop_cover")}>
          <ha-icon icon="mdi:stop"></ha-icon>
        </button>
        <button class="bkp-rb" title="Zu" @click=${()=>n._coverCmd("close_cover")}>
          <ha-icon icon="mdi:arrow-down"></ha-icon>
        </button>
      </div>`,d`<div class="bkp-view bkp-shutterview ${e?"sunny":""}">
    ${Re(n,t)}
    <div class="bkp-side">${o}</div>
  </div>`}function Ue(n,t){let e=n._history?.points;if(!e||e.length<2)return d`<div class="bkp-hist"><small>Leistung</small><div class="bkp-hist-empty">
      ${n._history?.error?"kein Verlauf":"l\xE4dt \u2026"}
    </div></div>`;let s=e[0][0],i=e[e.length-1][0],o=Math.max(...e.map(c=>c[1]),1),r=c=>(c-s)/Math.max(i-s,1)*100,a=c=>38-c/o*34,l=`M0,${a(e[0][1]).toFixed(1)}`;for(let c=1;c<e.length;c++)l+=` H${r(e[c][0]).toFixed(1)} V${a(e[c][1]).toFixed(1)}`;return l+=" H100",d`<div class="bkp-hist">
    <small>Leistung · ${n._climateCfg().history_hours} h</small>
    <svg viewBox="0 0 100 40" preserveAspectRatio="none">
      ${vt`<path class="area" d="${l} V40 H0 Z"></path><path class="line" d="${l}"></path>`}
    </svg>
    <small class="max">max ${n._formatWatt(o)}</small>
  </div>`}function We(n){let t=n._climate();if(!t)return u;let e=n._climateCfg(),s=t.st,i=["unavailable","unknown"].includes(s.state),o=i?"off":s.state,r=o!=="off",a=s.attributes.hvac_action,l=r&&(!a||!["idle","off"].includes(a)),c=n._pendingTarget??t.target,p=(s.attributes.hvac_modes||[]).filter(h=>h!=="off");return d`<div
    class="bkp-view bkp-climateview m-${r?o:"off"} ${e.show_history?"with-hist":""}"
  >
    <div class="bkp-stage">
      <div class="bkp-unit"><i></i></div>
      ${l?d`<svg class="bkp-air" viewBox="0 0 100 60" aria-hidden="true">
            ${vt`<path d="M28,4 C24,18 34,26 29,40"></path>
              <path d="M50,4 C46,18 56,26 51,40"></path>
              <path d="M72,4 C68,18 78,26 73,40"></path>`}
          </svg>`:u}
    </div>
    <span class="bkp-chip">
      ${i?"Nicht erreichbar":r?De(o):"Aus"}${t.power?d` · ${t.power}`:u}${r&&a==="idle"?" \xB7 wartet":""}
    </span>
    ${e.show_history?Ue(n,t):u}
    <div class="bkp-bar">
      <button
        class="bkp-rb ${r?"power-on":""}"
        ?disabled=${i}
        title=${r?"Ausschalten":"Einschalten"}
        @click=${()=>n._climateToggle()}
      >
        <ha-icon icon="mdi:power"></ha-icon>
      </button>
      <button class="bkp-rb flat" title="Kälter" ?disabled=${i||typeof c!="number"} @click=${()=>n._climateStep(-1)}>
        <ha-icon icon="mdi:minus"></ha-icon>
      </button>
      <span class="bkp-target">${typeof c=="number"?d`${Jt(c)}<span class="unit"> °C</span>`:"\u2013"}</span>
      <button class="bkp-rb flat" title="Wärmer" ?disabled=${i||typeof c!="number"} @click=${()=>n._climateStep(1)}>
        <ha-icon icon="mdi:plus"></ha-icon>
      </button>
      <button
        class="bkp-rb flat"
        title="Betriebsart wechseln"
        ?disabled=${i||p.length<2&&r}
        @click=${()=>n._climateCycle(p)}
      >
        <ha-icon .icon=${Xt(r?o:p[0])}></ha-icon>
      </button>
    </div>
  </div>`}function Qt(n){let t=n._view;return d`
    ${t==="home"?Oe(n):u}
    ${t!=="home"?d`<div class="bkp-layer" @pointerdown=${()=>n._bump()}>
          ${t==="shutter"?He(n):We(n)}
          <button
            class="bkp-close"
            title=${t===n._defaultView()?"Bild zeigen":"Zur\xFCck"}
            @click=${()=>n._setView(t===n._defaultView()?"home":n._defaultView())}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
          ${n._sticky()?u:d`<div class="bkp-timer" style="--bkp-t:${n._timeout()}s"></div>`}
        </div>`:u}
  `}var te=`
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
  .bkp-overlay.dark .bkp-rb { background: #3a3f47; color: #e8ecf2; }
  .bkp-overlay.dark .bkp-bar .bkp-rb.flat { background: transparent; }
  .bkp-overlay.dark .bkp-bar .bkp-rb.power-on { background: var(--mc); color: #fff; }

  @media (prefers-reduced-motion: reduce) {
    .bkp-air path, .bkp-layer { animation: none; }
  }
`;var ie="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4",Be=["https://overpass-api.de/api/interpreter","https://overpass.private.coffee/api/interpreter"],At=Math.PI/180,ee;function Ve(){return window.L?.map?Promise.resolve(window.L):(ee||=new Promise((n,t)=>{let e=document.createElement("script");e.src=`${ie}/leaflet.min.js`,e.onload=()=>n(window.L),e.onerror=()=>t(new Error("Leaflet nicht ladbar")),document.head.appendChild(e)}),ee)}var F=class extends v{constructor(){super(),this._satellite=!0,this._status="Lade Karte \u2026"}async firstUpdated(){let t;try{t=await Ve()}catch{this._status="Die Karte lie\xDF sich nicht laden. Trag die Gradzahl direkt ein.";return}this.L=t;let e=this.hass.config.latitude,s=this.hass.config.longitude;this.home=[e,s];let i=t.map(this.renderRoot.querySelector("#map"),{maxZoom:21}).setView(this.home,19);this.map=i,this.sat=t.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxNativeZoom:19,maxZoom:21,attribution:"Luftbild \xA9 Esri"}).addTo(i),this.plain=t.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{maxNativeZoom:20,maxZoom:21,subdomains:"abcd",attribution:"\xA9 OpenStreetMap \xA9 CARTO"}),t.circleMarker(this.home,{radius:5,color:"#fff",weight:2,fillColor:"#6b55c9",fillOpacity:1}).addTo(i).bindTooltip("Zuhause"),this.walls=t.layerGroup().addTo(i),this.sel=t.layerGroup().addTo(i),this.tmp=t.layerGroup().addTo(i),i.on("click",o=>this._mapClick(o)),setTimeout(()=>i.invalidateSize(),200),this._loadBuildings()}_toXY([t,e]){return[(e-this.home[1])*Math.cos(this.home[0]*At)*111320,(t-this.home[0])*110540]}_toLL([t,e]){return[this.home[0]+e/110540,this.home[1]+t/(Math.cos(this.home[0]*At)*111320)]}async _loadBuildings(){this._status="Lade Geb\xE4ude aus OpenStreetMap \u2026";let[t,e]=this.home,s=`[out:json][timeout:25];(way(around:120,${t},${e})["building"];relation(around:120,${t},${e})["building"];);out geom;`,i;for(let r of Be)try{let a=await fetch(r,{method:"POST",body:`data=${encodeURIComponent(s)}`,headers:{"Content-Type":"application/x-www-form-urlencoded"},signal:AbortSignal.timeout(2e4)});if(a.ok){i=await a.json();break}}catch{}if(!i){this._status="error";return}let o=0;for(let r of i.elements)if(r.type==="way"&&r.geometry&&(this._addRing(r.geometry.map(a=>[a.lat,a.lon])),o++),r.type==="relation")for(let a of r.members||[])a.role==="outer"&&a.geometry&&(this._addRing(a.geometry.map(l=>[l.lat,l.lon])),o++);this._status=o?"Tipp auf die Hauswand, in der das Fenster ist.":"Keine Geb\xE4ude gefunden. Zeichne die Wand selbst ein."}_addRing(t){let e=this.L;if(t.length<3)return;let s=t.map(r=>this._toXY(r)),i=0;for(let r=0;r<s.length-1;r++)i+=s[r][0]*s[r+1][1]-s[r+1][0]*s[r][1];let o=i>0;e.polygon(t,{color:"#fff",weight:1.5,opacity:.9,fillColor:"#6b55c9",fillOpacity:.12,interactive:!1}).addTo(this.walls);for(let r=0;r<t.length-1;r++){let a=s[r+1][0]-s[r][0],l=s[r+1][1]-s[r][1],c=Math.hypot(a,l);if(c<.5)continue;let p=o?[l/c,-a/c]:[-l/c,a/c],h=t[r],f=t[r+1],_=e.polyline([h,f],{color:"#f0a020",weight:14,opacity:0}).addTo(this.walls);_.on("mouseover",()=>_.setStyle({opacity:.55})),_.on("mouseout",()=>_.setStyle({opacity:0})),_.on("click",C=>{e.DomEvent.stop(C),this._drawing||this._show(h,f,p)})}}_mapClick(t){if(!this._drawing)return;let e=this.L;if(this._points=[...this._points||[],[t.latlng.lat,t.latlng.lng]],e.circleMarker(t.latlng,{radius:5,color:"#fff",weight:2,fillColor:"#f0a020",fillOpacity:1}).addTo(this.tmp),this._points.length===2){let[s,i]=this._points,o=this._toXY(s),r=this._toXY(i),a=r[0]-o[0],l=r[1]-o[1],c=Math.hypot(a,l)||1;this.tmp.clearLayers(),this._drawing=!1,this._points=[],this._show(s,i,[l/c,-a/c])}}_toggleDraw(){this._drawing=!this._drawing,this._points=[],this.tmp?.clearLayers()}_show(t,e,s){let i=this.L,o=(Math.atan2(s[0],s[1])/At+360)%360;this._result={a:t,b:e,normal:s,az:o},this.sel.clearLayers(),i.polyline([t,e],{color:"#f0a020",weight:7,opacity:.95}).addTo(this.sel);let r=this._toXY(t),a=this._toXY(e),l=[(r[0]+a[0])/2,(r[1]+a[1])/2],c=Math.max(4,Math.min(9,Math.hypot(a[0]-r[0],a[1]-r[1])*.6)),p=[l[0]+s[0]*c,l[1]+s[1]*c],h=[-s[1],s[0]],f=[p[0]-s[0]*1.6+h[0]*1.1,p[1]-s[1]*1.6+h[1]*1.1],_=[p[0]-s[0]*1.6-h[0]*1.1,p[1]-s[1]*1.6-h[1]*1.1];i.polyline([this._toLL(l),this._toLL(p)],{color:"#6b55c9",weight:4}).addTo(this.sel),i.polygon([this._toLL(p),this._toLL(f),this._toLL(_)],{color:"#6b55c9",fillColor:"#6b55c9",fillOpacity:1,weight:1}).addTo(this.sel)}_flip(){let t=this._result;t&&this._show(t.a,t.b,[-t.normal[0],-t.normal[1]])}_accept(){this.dispatchEvent(new CustomEvent("direction-picked",{detail:{value:Math.round(this._result.az)},bubbles:!0,composed:!0}))}_layer(t){this._satellite=t,this.map&&(t?(this.map.removeLayer(this.plain),this.sat.addTo(this.map)):(this.map.removeLayer(this.sat),this.plain.addTo(this.map)))}_sunRows(){let{latitude:t,longitude:e}=this.hass.config,s=new Date().getFullYear(),i=o=>o.toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"});return[["Heute",new Date],["21. Juni",new Date(s,5,21)],["21. Dezember",new Date(s,11,21)]].map(([o,r])=>{let a=Zt(r,t,e,this._result.az);return d`<div><span>${o}</span><span>${a.length?a.map(([l,c])=>`${i(l)}\u2013${i(c)}`).join(", "):"gar nicht"}</span></div>`})}render(){let t=this._result;return d`
      <link rel="stylesheet" href="${ie}/leaflet.min.css" />
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
            <div class="deg"><b>${Math.round(t.az)}°</b><span>${st(t.az)}</span></div>
            <div class="hint">Der Pfeil zeigt nach draußen. Zeigt er ins Haus, tippe „Andere Seite“.</div>
            <div class="sun"><b>Sonne auf dieser Wand</b>${this._sunRows()}</div>
            <div class="bar">
              <button class="primary" @click=${this._accept}>${Math.round(t.az)}° übernehmen</button>
              <button @click=${this._flip}>Andere Seite</button>
            </div>
          </div>`:u}
    `}};w(F,"properties",{hass:{attribute:!1},_result:{state:!0},_status:{state:!0},_satellite:{state:!0},_drawing:{state:!0}}),w(F,"styles",L`
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
  `);customElements.define("bkp-direction-map",F);var Ie="bereichskarte-plus-editor",Fe="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z",je="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z",Ke="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",qe="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",se=["sensors","show_icons","shutter_view","climate_view","view_timeout","default_view"];function ne(n,t){return n.filter(e=>e.name!==t).map(e=>Array.isArray(e.schema)?{...e,schema:ne(e.schema,t)}:e)}var j=class extends v{setConfig(t){this._config=t,this._native?.setConfig(this._nativeConfig(t))}_nativeConfig(t){let e={...t,type:"area"};for(let s of se)delete e[s];return e}_ensureNative(){if(this._native)return;let t=document.createElement("hui-area-card-editor"),e=t._schema;if(typeof e=="function"){let s,i;t._schema=(...o)=>{let r=e(...o);return r!==s&&(s=r,i=ne(r,"sensor_classes")),i}}t.addEventListener("config-changed",s=>{s.stopPropagation();let i={...s.detail.config,type:this._config.type};delete i.sensor_classes;for(let o of se)this._config[o]!==void 0&&(i[o]=this._config[o]);this._fire(i)}),t.hass=this.hass,t.setConfig(this._nativeConfig(this._config)),this._native=t}shouldUpdate(t){if(this.hasUpdated&&t.size===1&&t.has("hass")){let e=t.get("hass"),s=this.hass,i=!e||!s||e.entities!==s.entities||e.devices!==s.devices||e.areas!==s.areas||e.localize!==s.localize||e.themes!==s.themes||e.config!==s.config,o=Date.now()-(this._hassRendered||0);if(!i&&o<1500)return this._hassTimer||(this._hassTimer=setTimeout(()=>{this._hassTimer=void 0,this.requestUpdate("hass",e)},1500-o)),!1}return t.has("hass")&&(this._hassRendered=Date.now()),!0}updated(t){t.has("hass")&&this._native&&(this._native.hass=this.hass)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._hassTimer),this._hassTimer=void 0}_fire(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_setSensors(t){let e={...this._config,sensors:t};delete e.sensor_classes,this._fire(e)}_updateItem(t,e){let s=[...b(this._config)],i={...s[t],...e};for(let[o,r]of Object.entries(i))(r===void 0||r===""||Array.isArray(r)&&!r.length)&&delete i[o];s[t]=i,this._setSensors(s)}_changeKind(t,e){let s=[...b(this._config)];s[t]={type:e},this._setSensors(s)}_move(t,e){let s=[...b(this._config)],i=t+e;i<0||i>=s.length||([s[t],s[i]]=[s[i],s[t]],this._setSensors(s))}_remove(t){let e=[...b(this._config)];e.splice(t,1),this._setSensors(e)}_add(){let t=[...b(this._config)],e=new Set(t.map(i=>i.type)),s=["temperature","humidity","power"].find(i=>!e.has(i))||"entity";t.push({type:s}),this._setSensors(t)}_togglePower(t,e,s){let i=b(this._config)[t],o=new Set(i.exclude||[]);s?o.delete(e):o.add(e),this._updateItem(t,{exclude:[...o]})}_name(t){return this.hass.states[t]?.attributes.friendly_name||t}_stable(t){this._selectors||=new Map;let e=JSON.stringify(t);return this._selectors.has(e)||this._selectors.set(e,t),this._selectors.get(e)}_selector(t,e,s,i,o){return t=this._stable(t),d`<ha-selector
      .hass=${this.hass}
      .required=${!1}
      .selector=${t}
      .value=${e}
      .label=${s}
      .helper=${i}
      @value-changed=${r=>{r.stopPropagation(),o(r.detail.value)}}
    ></ha-selector>`}_renderPower(t,e,s){let i=J(this.hass,s?.area_id,"power"),o=new Set(t.exclude||[]),r=kt(this.hass,xt(this.hass,s?.area_id,t));return d`
      <div class="hint">
        Alle Leistungssensoren im Bereich werden zusammengezählt. Schalte ab,
        was doppelt zählt (zum Beispiel ein Mittelwert-Sensor neben dem
        eigentlichen Messwert).
      </div>
      ${i.length?d`<div class="power-list">
            ${i.map(a=>{let l=!o.has(a);return d`<label class="power-row ${l?"":"off"}">
                <ha-switch
                  .checked=${l}
                  @change=${c=>this._togglePower(e,a,c.target.checked)}
                ></ha-switch>
                <span class="power-name" title=${a}>${this._name(a)}</span>
                <span class="power-value"
                  >${E(this.hass,this.hass.states[a])??"\u2013"}</span
                >
              </label>`})}
          </div>`:d`<div class="hint">Im Bereich gibt es keine Leistungssensoren.</div>`}
      ${this._selector({entity:{multiple:!0,filter:{domain:"sensor",device_class:"power"}}},t.include||[],"Weitere Leistungssensoren","Sensoren aus anderen Bereichen, die hier mitgez\xE4hlt werden sollen.",a=>this._updateItem(e,{include:a}))}
      <div class="total">
        Summe jetzt: <b>${r===void 0?"\u2013":W(this.hass,r)}</b>
      </div>
    `}_renderClimate(t,e,s){let i=g[t.type],o=s?.[`${t.type}_entity_id`],r=o?`Leer lassen: nimmt \u201E${this._name(o)}\u201C aus den Bereichseinstellungen.`:`Leer lassen: Mittelwert aller ${i.label}-Sensoren im Bereich.`;return this._selector({entity:{filter:{domain:"sensor",device_class:i.deviceClass}}},t.entity||"","Sensor",r,a=>this._updateItem(e,{entity:a}))}_renderItem(t,e,s,i){let o=g[t.type]?t.type:"entity",r=i?Q(this.hass,i,t).text:void 0;return d`
      <div class="item">
        <div class="item-head">
          <ha-icon
            class="item-icon"
            .icon=${t.icon||g[o].icon}
          ></ha-icon>
          <div class="item-kind">
            ${this._selector({select:{mode:"dropdown",options:Object.entries(g).map(([a,l])=>({value:a,label:l.label}))}},o,"Wert",void 0,a=>a&&a!==o&&this._changeKind(e,a))}
          </div>
          <span class="current" title="Wird gerade so angezeigt"
            >${r??"\u2013"}</span
          >
          <ha-icon-button
            .path=${Fe}
            .label=${"Nach vorne"}
            title="Nach vorne"
            .disabled=${e===0}
            @click=${()=>this._move(e,-1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${je}
            .label=${"Nach hinten"}
            title="Nach hinten"
            .disabled=${e===s-1}
            @click=${()=>this._move(e,1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${Ke}
            .label=${"Entfernen"}
            title="Entfernen"
            @click=${()=>this._remove(e)}
          ></ha-icon-button>
        </div>
        <div class="item-body">
          ${o==="power"?this._renderPower(t,e,i):o==="entity"?this._selector({entity:{}},t.entity||"","Sensor","Zeigt den Zustand genau dieses Sensors.",a=>this._updateItem(e,{entity:a})):this._renderClimate(t,e,i)}
          ${this._config.show_icons?this._selector({icon:{placeholder:g[o].icon}},t.icon||"","Symbol","Leer lassen f\xFCr das Standardsymbol.",a=>this._updateItem(e,{icon:a})):u}
        </div>
      </div>
    `}_setSub(t,e){let s={...this._config[t]||{},...e};for(let[o,r]of Object.entries(s))(r===void 0||r===""||r===null)&&delete s[o];let i={...this._config,[t]:s};Object.keys(s).length||delete i[t],this._fire(i)}_setTip(t){let e={...this._config.shutter_view?.sun_tip||{},...t};for(let[s,i]of Object.entries(e))(i===void 0||i===""||i===null)&&delete e[s];this._setSub("shutter_view",{sun_tip:Object.keys(e).length?e:void 0})}_num(t,e,s,i,o="slider"){return{number:{min:t,max:e,step:s,mode:o,unit_of_measurement:i}}}_sunNow(t){let{latitude:e,longitude:s}=this.hass.config,i=V(new Date,e,s);if(i.el<=0)return"Gerade ist die Sonne untergegangen.";let o=typeof t=="number"&&$t(i.az,t)<70;return`Gerade steht die Sonne bei ${Math.round(i.az)}\xB0 (${st(i.az)}), ${Math.round(i.el)}\xB0 hoch${typeof t=="number"?o?" und scheint auf dieses Fenster.":", also nicht auf dieses Fenster.":"."}`}_renderSunTip(t){let e=t.sun_tip||{},s=!!t.sun_tip&&e.enabled!==!1,i=I,o=e.lux_entity?E(this.hass,this.hass.states[e.lux_entity]):void 0;return d`
      ${this._selector({boolean:{}},s,"Sonnenschutz-Tipp","Scheint die Sonne aufs Fenster, schl\xE4gt die Karte eine H\xF6he vor. Sie f\xE4hrt nur, wenn du \u201E\xDCbernehmen\u201C tippst.",r=>this._setTip({enabled:r}))}
      ${s?d`<div class="sub">
            <div class="dir-row">
              ${this._selector(this._num(0,359,1,"\xB0","box"),e.direction,"Fensterrichtung","Wohin die Wand mit dem Fenster zeigt: 0 = Nord, 90 = Ost, 180 = S\xFCd, 270 = West.",r=>this._setTip({direction:r}))}
              <button class="ghost" @click=${()=>(this._mapOpen=!this._mapOpen,this.requestUpdate())}>
                <ha-icon icon="mdi:map-marker-radius"></ha-icon>
                ${this._mapOpen?"Karte schlie\xDFen":"Auf Karte w\xE4hlen"}
              </button>
            </div>
            ${this._mapOpen?d`<bkp-direction-map
                  .hass=${this.hass}
                  @direction-picked=${r=>{this._mapOpen=!1,this._setTip({direction:r.detail.value})}}
                ></bkp-direction-map>`:u}
            <div class="hint">${this._sunNow(e.direction)}</div>
            ${this._selector(this._num(0,100,5,"%"),e.position??i.position,"Sonnenschutz-H\xF6he","Diese H\xF6he schl\xE4gt die Karte vor. 0 % ist ganz zu.",r=>this._setTip({position:r}))}
            ${this._selector({entity:{filter:{domain:"sensor",device_class:"illuminance"}}},e.lux_entity||"","Helligkeitssensor drau\xDFen","Damit die Karte wei\xDF, ob die Sonne wirklich scheint. Ohne Sensor z\xE4hlt nur der Sonnenstand.",r=>this._setTip({lux_entity:r}))}
            ${e.lux_entity?this._selector(this._num(0,15e4,500,"lx","box"),e.lux_threshold??i.lux_threshold,"Sonne scheint ab",`Ab dieser Helligkeit gilt die Sonne als scheinend. Gerade misst der Sensor ${o??"nichts"}. Schau an einem sonnigen Tag, welcher Wert dann kommt.`,r=>this._setTip({lux_threshold:r})):this._selector({entity:{filter:{domain:"weather"}}},e.weather_entity||"","Wetter (Ersatz)","Ohne Helligkeitssensor: z\xE4hlt nur bei \u201Esonnig\u201C oder \u201Eteils sonnig\u201C.",r=>this._setTip({weather_entity:r}))}
            ${this._selector(this._num(30,90,5,"\xB0"),e.spread??i.spread,"Seitlicher Winkel","Wie schr\xE4g die Sonne noch aufs Fenster scheinen darf.",r=>this._setTip({spread:r}))}
            ${this._selector(this._num(0,40,1,"\xB0"),e.min_elevation??i.min_elevation,"Sonne ab H\xF6he","Darunter verdecken Nachbarh\xE4user oder B\xE4ume die Sonne. H\xF6her stellen, wenn bei dir etwas im Weg steht.",r=>this._setTip({min_elevation:r}))}
            ${this._selector(this._num(10,35,.5,"\xB0C","box"),e.min_temp,"Nur wenn der Raum w\xE4rmer ist als","Leer lassen: Tipp auch im Winter. Gemessen mit der Temperatur aus der Infozeile.",r=>this._setTip({min_temp:r}))}
            ${this._selector({boolean:{}},e.reopen??i.reopen,"Danach wieder \xF6ffnen vorschlagen","Ist die Sonne weg, fragt die Karte, ob der Rollladen wieder hoch soll.",r=>this._setTip({reopen:r}))}
            ${e.reopen??i.reopen?this._selector(this._num(0,100,5,"%"),e.reopen_position??i.reopen_position,"Wieder \xF6ffnen auf",void 0,r=>this._setTip({reopen_position:r})):u}
          </div>`:u}
    `}_travelHint(t){if(!t)return u;let e=ot(this.hass,t,()=>this.requestUpdate()),s=o=>o.toLocaleString("de-DE",{maximumFractionDigits:1}),i;return e?e.open||e.close?i=`Fahrzeit aus dem Verlauf des Rollladens: ganz hoch ${e.open?`${s(e.open)} s`:"unbekannt"}, ganz runter ${e.close?`${s(e.close)} s`:"unbekannt"}. Damit l\xE4uft die Animation so schnell wie der echte Rollladen.`:i="Noch keine Fahrten im Verlauf gefunden. Bis dahin rechnet die Animation mit 20 Sekunden.":i="Fahrzeiten werden aus dem Verlauf gelesen \u2026",d`<div class="hint">${i}</div>`}_renderShutterSection(t){let e=this._config.shutter_view||{},s=B(this.hass,t?.area_id,"cover")[0],i=e.enabled!==!1;return d`<details class="section" ?open=${this._openShutter} @toggle=${o=>this._toggleSection("_openShutter",o)}>
      <summary><ha-icon icon="mdi:window-shutter"></ha-icon>Rollladen-Ansicht</summary>
      ${this._openShutter?d`<div class="body">
        ${this._selector({boolean:{}},i,"Rollladen-Ansicht zeigen","F\xE4hrst du den Rollladen \xFCber die Taste unten, zeigt das Bild ein Fenster, an dem du die H\xF6he ziehen kannst.",o=>this._setSub("shutter_view",{enabled:o?void 0:!1}))}
        ${i?d`
              ${this._selector({entity:{filter:{domain:"cover"}}},e.entity||"","Rollladen",s?`Leer lassen: \u201E${this._name(s)}\u201C aus dem Bereich.`:"Im Bereich ist kein Rollladen. W\xE4hle einen aus.",o=>this._setSub("shutter_view",{entity:o}))}
              ${this._travelHint(e.entity||s)}
              ${this._selector({boolean:{}},!!e.follow_moves,"Auch zeigen, wenn er von selbst f\xE4hrt","Sonst nur, wenn du ihn \xFCber die Taste unten f\xE4hrst.",o=>this._setSub("shutter_view",{follow_moves:o||void 0}))}
              ${this._renderSunTip(e)}
            `:u}
      </div>`:u}
    </details>`}_toggleSection(t,e){this[t]=e.target.open,this.requestUpdate()}_renderClimateSection(t){let e=this._config.climate_view||{},s=tt(this.hass,t?.area_id),i=e.entity||s,o=i?et(this.hass,i):void 0,r=e.enabled!==!1;return d`<details class="section" ?open=${this._openClimate} @toggle=${a=>this._toggleSection("_openClimate",a)}>
      <summary><ha-icon icon="mdi:air-conditioner"></ha-icon>Klima-Ansicht</summary>
      ${this._openClimate?d`<div class="body">
        ${this._selector({boolean:{}},r,"Klima-Ansicht zeigen","Oben rechts im Bild erscheint ein kleines Klima-Feld. Ein Tipp darauf \xF6ffnet die Bedienung: an und aus, Betriebsart, Zieltemperatur, Leistung.",a=>this._setSub("climate_view",{enabled:a?void 0:!1}))}
        ${r?d`
              ${this._selector({entity:{filter:{domain:"climate"}}},e.entity||"","Klimager\xE4t",s?`Leer lassen: \u201E${this._name(s)}\u201C aus dem Bereich.`:"Im Bereich ist kein Klimager\xE4t. W\xE4hle eines aus.",a=>this._setSub("climate_view",{entity:a}))}
              ${this._selector({entity:{filter:{domain:"sensor",device_class:"power"}}},e.power_entity||"","Leistungssensor",o?`Leer lassen: \u201E${this._name(o)}\u201C vom selben Ger\xE4t.`:"W\xE4hle den Sensor, der die Leistung der Anlage misst.",a=>this._setSub("climate_view",{power_entity:a}))}
              ${this._selector({boolean:{}},!!e.show_history,"Leistungsverlauf an der Seite","Zeigt rechts neben dem Ger\xE4t, wie viel die Anlage in den letzten Stunden gezogen hat.",a=>this._setSub("climate_view",{show_history:a||void 0}))}
              ${e.show_history?this._selector(this._num(1,48,1,"h"),e.history_hours??6,"Verlauf \xFCber",void 0,a=>this._setSub("climate_view",{history_hours:a})):u}
              ${this._selector({boolean:{}},!!e.stay_while_on,"Ansicht bleibt, solange die Anlage l\xE4uft","Sonst geht die Karte nach der eingestellten Zeit zur\xFCck zum Bild.",a=>this._setSub("climate_view",{stay_while_on:a||void 0}))}
            `:u}
      </div>`:u}
    </details>`}_renderGeneral(){return d`${this._selector({select:{mode:"dropdown",options:[{value:"home",label:"Bild (Foto, Kamera oder Symbol)"},{value:"climate",label:"Klima-Ansicht"}]}},this._config.default_view||"home","Startansicht","Was die Karte normalerweise zeigt. Rollladen- und andere Ansichten kehren nach der eingestellten Zeit hierher zur\xFCck. Mit dem \xD7 kommst du jederzeit zum Bild.",t=>this._fire({...this._config,default_view:t==="home"?void 0:t}))}${this._selector(this._num(5,120,5,"s"),this._config.view_timeout??20,"Zur\xFCck zum Bild nach","So lange bleibt eine andere Ansicht ohne Ber\xFChrung offen, dann kommt wieder die Startansicht.",t=>this._fire({...this._config,view_timeout:t}))}`}render(){if(!this.hass||!this._config)return u;this._ensureNative();let t=this.hass.areas?.[this._config.area],e=b(this._config);return d`
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
        ${e.map((s,i)=>this._renderItem(s,i,e.length,t))}
        <button class="add" @click=${this._add}>
          <ha-svg-icon .path=${qe}></ha-svg-icon>
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
    `}};w(j,"properties",{hass:{attribute:!1},_config:{state:!0}}),w(j,"styles",L`
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
  `);customElements.define(Ie,j);var Ze="0.3.5",rt="bereichskarte-plus",Ge=`${rt}-editor`,Ye={mW:.001,W:1,kW:1e3,MW:1e6},re=new CSSStyleSheet;re.replaceSync(`
  /* Passt nicht alles in eine Zeile, rutscht der Rest in die n\xE4chste,
     statt mit \u201E\u2026\u201C abgeschnitten zu werden. */
  .bkp-values {
    display: flex;
    flex-wrap: wrap;
    column-gap: 7px;
    width: 100%;
  }
  .bkp-value {
    display: inline-flex;
    align-items: center;
    gap: 1px;
    white-space: nowrap;
  }
  .bkp-value ha-icon {
    --mdc-icon-size: 14px;
    color: var(--secondary-text-color);
  }
  ${te}
`);async function Xe(){return customElements.get("hui-area-card")||(await window.loadCardHelpers()).createCardElement({type:"area",area:""}),customElements.whenDefined("hui-area-card")}var oe;function Je(){customElements.whenDefined("hui-area-controls-card-feature").then(n=>{let t=n.prototype,e=Object.getOwnPropertyDescriptor(t,"_controls");if(!e?.get||e.set||t._bkpPatched)return;let s;Object.defineProperty(t,"_controls",{configurable:!0,get(){return this._config?.controls?this._config.controls:(s||(s=e.get.call(this)),s)}}),t._bkpPatched=!0})}function Qe(n){class t extends n{constructor(){super(...arguments);w(this,"_view","home")}static get styles(){return[...[super.styles].flat(),re]}static async getConfigElement(){return await n.getConfigElement(),document.createElement(Ge)}static getStubConfig(i){let o=Object.values(i.areas||{})[0];return{type:`custom:${rt}`,area:o?.area_id||"",display_type:"picture",sensors:jt,show_icons:!0,features:[{type:"area-controls"}]}}disconnectedCallback(){super.disconnectedCallback?.(),clearTimeout(this._viewTimer),clearInterval(this._histTimer),this._raf&&cancelAnimationFrame(this._raf),this._raf=null}_items(){let i=this.hass?.areas?.[this._config?.area];return i?b(this._config).map(o=>Q(this.hass,i,o)).filter(o=>o.text):[]}_computeSensorsDisplay(){return Array.isArray(this._config?.sensors)?this._items().map(i=>i.text).join(" \xB7 "):super._computeSensorsDisplay()}_renderIcons(){let i=this.shadowRoot?.querySelector("ha-tile-info");if(!i)return;let o=i.querySelector(":scope > .bkp-values");if(!this._config?.show_icons||!Array.isArray(this._config.sensors)){o?.remove();return}o||(o=document.createElement("span"),o.slot="secondary",o.className="bkp-values",i.appendChild(o)),U(d`${this._items().map(r=>d`<span class="bkp-value"
              ><ha-icon .icon=${r.icon}></ha-icon>${r.text}</span
            >`)}`,o)}_shutterCfg(){let i=this._config?.shutter_view||{};if(i.enabled===!1)return null;let o=i.entity||B(this.hass,this._config.area,"cover")[0];return o?{...i,entity:o}:null}_cover(){let i=this._shutterCfg(),o=i&&this.hass.states[i.entity];if(!o)return null;let r=o.attributes.current_position,a=typeof r=="number"?r:o.state==="closed"?0:100;return{st:o,pos:a,moving:o.state==="opening"||o.state==="closing",canSet:!!((o.attributes.supported_features??0)&4),times:ot(this.hass,i.entity,()=>this.requestUpdate())}}_shownPos(i){return this._dragPos!=null?this._dragPos:this._pendingPos!=null&&!i.moving?this._pendingPos:i.moving?Yt(i.st,i.times)??i.pos:i.pos}_tick(){this._raf=null;let i=this._cover();if(!i?.moving||this._view!=="shutter"||this._dragPos!=null)return;let o=this._shownPos(i),r=this.shadowRoot,a=r?.querySelector(".bkp-shutter");a&&(a.style.height=`${100-o}%`);let l=r?.querySelector(".bkp-grip");l&&(l.style.top=`${100-o}%`);let c=r?.querySelector(".bkp-numv"),p=c&&[...c.childNodes].find(h=>h.nodeType===3);p&&(p.nodeValue=String(Math.round(o))),this._raf=requestAnimationFrame(()=>this._tick())}_roomTemp(){let i=this.hass.areas?.[this._config.area],r=b(this._config).find(l=>l.type==="temperature")?.entity||i?.temperature_entity_id,a=r?Number(this.hass.states[r]?.state):NaN;return Number.isNaN(a)?void 0:a}_sunTip(){let i=this._cover();return i?Gt(this.hass,this._shutterCfg().sun_tip,this._shownPos(i),this._roomTemp()):null}_coverCmd(i){let o=this._shutterCfg();this._pendingPos=null,this.hass.callService("cover",i,{},{entity_id:o.entity}),this._bump()}_coverTo(i){let o=this._shutterCfg();this._pendingPos=i,this._pendingSince=Date.now(),this.hass.callService("cover","set_cover_position",{position:i},{entity_id:o.entity}),this.requestUpdate(),this._bump()}_windowDown(i){if(!this._cover()?.canSet)return;i.preventDefault();let r=i.currentTarget;r.setPointerCapture(i.pointerId);let a=c=>{let p=r.getBoundingClientRect(),h=1-(c.clientY-p.top)/p.height;this._dragPos=Math.round(Math.min(1,Math.max(0,h))*100),this.requestUpdate()},l=()=>{r.removeEventListener("pointermove",a),r.removeEventListener("pointerup",l),r.removeEventListener("pointercancel",l);let c=this._dragPos;this._dragPos=null,c!=null&&this._coverTo(c)};r.addEventListener("pointermove",a),r.addEventListener("pointerup",l),r.addEventListener("pointercancel",l),a(i),this._bump()}_climateCfg(){let i=this._config?.climate_view||{};if(i.enabled===!1)return null;let o=i.entity||tt(this.hass,this._config.area);return o?{show_history:!1,history_hours:6,stay_while_on:!1,...i,entity:o,power_entity:i.power_entity||et(this.hass,o)}:null}_formatWatt(i){return W(this.hass,i)}_climate(){let i=this._climateCfg(),o=i&&this.hass.states[i.entity];if(!o)return null;let r=o.attributes.temperature;this._pendingTarget!=null&&(r===this._pendingTarget||this._targetSent&&Date.now()-this._targetSent>1e4)&&(this._pendingTarget=null,this._targetSent=null);let a=i.power_entity?this.hass.states[i.power_entity]:null;return{st:o,cfg:i,target:typeof r=="number"?r:void 0,power:Y(a)?E(this.hass,a):void 0}}_climateToggle(){let i=this._climate(),o=i.st.attributes.supported_features??0,r={entity_id:i.cfg.entity};if(i.st.state!=="off")o&128?this.hass.callService("climate","turn_off",{},r):this.hass.callService("climate","set_hvac_mode",{hvac_mode:"off"},r);else if(o&256)this.hass.callService("climate","turn_on",{},r);else{let a=(i.st.attributes.hvac_modes||[]).find(l=>l!=="off");a&&this.hass.callService("climate","set_hvac_mode",{hvac_mode:a},r)}this._bump()}_climateStep(i){let o=this._climate(),r=o.st.attributes,a=r.target_temp_step||.5,l=this._pendingTarget??o.target;if(typeof l!="number")return;let c=Math.min(r.max_temp??35,Math.max(r.min_temp??7,Math.round((l+i*a)/a)*a));this._pendingTarget=c,this._targetSent=null,this.requestUpdate(),clearTimeout(this._targetTimer),this._targetTimer=setTimeout(()=>{this._targetSent=Date.now(),this.hass.callService("climate","set_temperature",{temperature:c},{entity_id:o.cfg.entity})},700),this._bump()}_climateCycle(i){let o=this._climate();if(!i.length)return;let r=o.st.state,a=r==="off"?i[0]:i[(i.indexOf(r)+1)%i.length];this.hass.callService("climate","set_hvac_mode",{hvac_mode:a},{entity_id:o.cfg.entity}),this._bump()}async _loadHistory(){let i=this._climateCfg(),o=i?.power_entity;if(!o)return;let r=new Date,a=new Date(r.getTime()-i.history_hours*36e5);try{let l=await this.hass.callWS({type:"history/history_during_period",start_time:a.toISOString(),end_time:r.toISOString(),entity_ids:[o],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),c=this.hass.states[o]?.attributes.unit_of_measurement,p=Ye[c]??1,h=(l[o]||[]).map(f=>[Math.max((f.lu??f.lc??0)*1e3,a.getTime()),Number(f.s)*p]).filter(f=>!Number.isNaN(f[1]));h.length&&h.push([r.getTime(),h[h.length-1][1]]),this._history={points:h}}catch{this._history={points:[],error:!0}}this.requestUpdate()}_timeout(){return this._config?.view_timeout??20}_defaultView(){return this._config?.default_view==="climate"&&this._climate()?"climate":"home"}_sticky(){if(this._view===this._defaultView())return!0;if(this._view!=="climate")return!1;let i=this._climate();return!!(i?.cfg.stay_while_on&&i.st.state!=="off")}_openView(i,o){i.stopPropagation(),this._setView(o)}_setView(i){this._view=i,this._dragPos=null,clearInterval(this._histTimer),i==="climate"&&this._climateCfg()?.show_history&&(this._history=null,this._loadHistory(),this._histTimer=setInterval(()=>this._loadHistory(),3e5)),this.requestUpdate(),this._bump()}_bump(){clearTimeout(this._viewTimer);let i=this.shadowRoot?.querySelector(".bkp-timer");i&&(i.style.animation="none",i.offsetWidth,i.style.animation=""),this._view!==this._defaultView()&&(this._viewTimer=setTimeout(()=>{this._sticky()?this._bump():this._setView(this._defaultView())},this._timeout()*1e3))}_renderOverlay(){let i=this.shadowRoot?.querySelector(".header"),o=this._shutterCfg()||this._climateCfg(),r=i?.querySelector(":scope > .bkp-overlay");if(!i||!o){r?.remove();return}r||(r=document.createElement("div"),r.className="bkp-overlay",i.appendChild(r)),r.classList.toggle("dark",!!this.hass.themes?.darkMode),U(Qt(this),r)}_watchCover(){let i=this._cover();if(!i)return;let o=i.st.state;this._pendingPos!=null&&(i.moving||i.pos===this._pendingPos||Date.now()-this._pendingSince>8e3)&&(this._pendingPos=null);let r=Date.now()<(this._armedUntil||0)||this._shutterCfg().follow_moves;this._lastCoverState&&o!==this._lastCoverState&&i.moving&&r&&this._view!=="shutter"&&this._setView("shutter"),this._lastCoverState=o}updated(i){if(super.updated?.(i),!this._clickHooked&&this.shadowRoot&&(this._clickHooked=!0,this.shadowRoot.addEventListener("click",r=>{r.composedPath().some(a=>a.tagName==="HUI-CARD-FEATURES")&&(this._armedUntil=Date.now()+5e3)},!0)),!this.hass||!this._config)return;!oe&&this.hass.user?.is_admin&&(oe=setTimeout(()=>{n.getConfigElement().catch(()=>{})},4e3));let o=this._defaultView();if(o!==this._lastDefault){this._lastDefault=o,this._setView(o);return}this._renderIcons(),this._watchCover(),this._renderOverlay(),this._view==="shutter"&&!this._raf&&this._cover()?.moving&&(this._raf=requestAnimationFrame(()=>this._tick()))}}customElements.define(rt,t)}window.customCards=window.customCards||[];window.customCards.push({type:rt,name:"Bereichskarte Plus",description:"Wie die Bereichskarte, aber du w\xE4hlst selbst, welche Werte unter dem Namen stehen. Mit Rollladen- und Klima-Ansicht.",preview:!0});Je();Xe().then(Qe);console.info(`%c BEREICHSKARTE-PLUS %c ${Ze} `,"color:#fff;background:#6b55c9;font-weight:700","color:#6b55c9;background:#fff");
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
