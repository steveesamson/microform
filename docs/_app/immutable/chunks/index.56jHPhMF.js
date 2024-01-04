import{r as p,n as x,k as E,l as C,j as b,m as M,p as T,q as B,v as D,w as N,x as P,y as j,z as I}from"./scheduler.yEHThLPp.js";let $=!1;function O(){$=!0}function R(){$=!1}function q(e,t,n,i){for(;e<t;){const s=e+(t-e>>1);n(s)<=i?e=s+1:t=s}return e}function z(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const r=[];for(let a=0;a<t.length;a++){const u=t[a];u.claim_order!==void 0&&r.push(u)}t=r}const n=new Int32Array(t.length+1),i=new Int32Array(t.length);n[0]=-1;let s=0;for(let r=0;r<t.length;r++){const a=t[r].claim_order,u=(s>0&&t[n[s]].claim_order<=a?s+1:q(1,s,_=>t[n[_]].claim_order,a))-1;i[r]=n[u]+1;const o=u+1;n[o]=r,s=Math.max(o,s)}const c=[],l=[];let f=t.length-1;for(let r=n[s]+1;r!=0;r=i[r-1]){for(c.push(t[r-1]);f>=r;f--)l.push(t[f]);f--}for(;f>=0;f--)l.push(t[f]);c.reverse(),l.sort((r,a)=>r.claim_order-a.claim_order);for(let r=0,a=0;r<l.length;r++){for(;a<c.length&&l[r].claim_order>=c[a].claim_order;)a++;const u=a<c.length?c[a]:null;e.insertBefore(l[r],u)}}function G(e,t){if($){for(z(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function F(e,t,n){e.insertBefore(t,n||null)}function U(e,t,n){$&&!n?G(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function m(e){e.parentNode&&e.parentNode.removeChild(e)}function S(e){return document.createElement(e)}function V(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function g(e){return document.createTextNode(e)}function ne(){return g(" ")}function ie(){return g("")}function se(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function re(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function le(e){return e.dataset.svelteH}function ae(e,t,n){const i=new Set;for(let s=0;s<e.length;s+=1)e[s].checked&&i.add(e[s].__value);return n||i.delete(t),Array.from(i)}function ce(e){let t;return{p(...n){t=n,t.forEach(i=>e.push(i))},r(){t.forEach(n=>e.splice(e.indexOf(n),1))}}}function W(e){return Array.from(e.childNodes)}function H(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function L(e,t,n,i,s=!1){H(e);const c=(()=>{for(let l=e.claim_info.last_index;l<e.length;l++){const f=e[l];if(t(f)){const r=n(f);return r===void 0?e.splice(l,1):e[l]=r,s||(e.claim_info.last_index=l),f}}for(let l=e.claim_info.last_index-1;l>=0;l--){const f=e[l];if(t(f)){const r=n(f);return r===void 0?e.splice(l,1):e[l]=r,s?r===void 0&&e.claim_info.last_index--:e.claim_info.last_index=l,f}}return i()})();return c.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,c}function J(e,t,n,i){return L(e,s=>s.nodeName===t,s=>{const c=[];for(let l=0;l<s.attributes.length;l++){const f=s.attributes[l];n[f.name]||c.push(f.name)}c.forEach(l=>s.removeAttribute(l))},()=>i(t))}function fe(e,t,n){return J(e,t,n,S)}function K(e,t){return L(e,n=>n.nodeType===3,n=>{const i=""+t;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>g(t),!0)}function oe(e){return K(e," ")}function A(e,t,n){for(let i=n;i<e.length;i+=1){const s=e[i];if(s.nodeType===8&&s.textContent.trim()===t)return i}return-1}function ue(e,t){const n=A(e,"HTML_TAG_START",0),i=A(e,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new y(t);H(e);const s=e.splice(n,i-n+1);m(s[0]),m(s[s.length-1]);const c=s.slice(1,s.length-1);if(c.length===0)return new y(t);for(const l of c)l.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1;return new y(t,c)}function de(e,t){t=""+t,e.data!==t&&(e.data=t)}function _e(e,t){e.value=t??""}function he(e,t,n,i){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,i?"important":"")}function me(e,t,n){e.classList.toggle(t,!!n)}function pe(e,t){const n=[];let i=0;for(const s of t.childNodes)if(s.nodeType===8){const c=s.textContent.trim();c===`HEAD_${e}_END`?(i-=1,n.push(s)):c===`HEAD_${e}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class Q{is_svg=!1;e=void 0;n=void 0;t=void 0;a=void 0;constructor(t=!1){this.is_svg=t,this.e=this.n=null}c(t){this.h(t)}m(t,n,i=null){this.e||(this.is_svg?this.e=V(n.nodeName):this.e=S(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(t)),this.i(i)}h(t){this.e.innerHTML=t,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(t){for(let n=0;n<this.n.length;n+=1)F(this.t,this.n[n],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(m)}}class y extends Q{l=void 0;constructor(t=!1,n){super(t),this.e=this.n=null,this.l=n}c(t){this.l?this.n=this.l:super.c(t)}i(t){for(let n=0;n<this.n.length;n+=1)U(this.t,this.n[n],t)}}function $e(e,t){return new e(t)}const h=new Set;let d;function ye(){d={r:0,c:[],p:d}}function xe(){d.r||p(d.c),d=d.p}function X(e,t){e&&e.i&&(h.delete(e),e.i(t))}function ge(e,t,n,i){if(e&&e.o){if(h.has(e))return;h.add(e),d.c.push(()=>{h.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function ve(e){e&&e.c()}function we(e,t){e&&e.l(t)}function Y(e,t,n){const{fragment:i,after_update:s}=e.$$;i&&i.m(t,n),T(()=>{const c=e.$$.on_mount.map(P).filter(b);e.$$.on_destroy?e.$$.on_destroy.push(...c):p(c),e.$$.on_mount=[]}),s.forEach(T)}function Z(e,t){const n=e.$$;n.fragment!==null&&(B(n.after_update),p(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function k(e,t){e.$$.dirty[0]===-1&&(j.push(e),I(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Ee(e,t,n,i,s,c,l=null,f=[-1]){const r=D;N(e);const a=e.$$={fragment:null,ctx:[],props:c,update:x,not_equal:s,bound:E(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(r?r.$$.context:[])),callbacks:E(),dirty:f,skip_bound:!1,root:t.target||r.$$.root};l&&l(a.root);let u=!1;if(a.ctx=n?n(e,t.props||{},(o,_,...v)=>{const w=v.length?v[0]:_;return a.ctx&&s(a.ctx[o],a.ctx[o]=w)&&(!a.skip_bound&&a.bound[o]&&a.bound[o](w),u&&k(e,o)),_}):[],a.update(),u=!0,p(a.before_update),a.fragment=i?i(a.ctx):!1,t.target){if(t.hydrate){O();const o=W(t.target);a.fragment&&a.fragment.l(o),o.forEach(m)}else a.fragment&&a.fragment.c();t.intro&&X(e.$$.fragment),Y(e,t.target,t.anchor),R(),C()}N(r)}class Te{$$=void 0;$$set=void 0;$destroy(){Z(this,1),this.$destroy=x}$on(t,n){if(!b(n))return x;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(t){this.$$set&&!M(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ee="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ee);export{pe as A,ue as B,_e as C,se as D,ce as E,ae as F,y as H,Te as S,U as a,xe as b,oe as c,X as d,ie as e,m as f,S as g,fe as h,Ee as i,W as j,re as k,he as l,g as m,K as n,de as o,ye as p,$e as q,ve as r,ne as s,ge as t,we as u,Y as v,Z as w,le as x,me as y,G as z};