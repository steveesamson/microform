import{e as E,j as m,g as A,l as S,k as D,m as L,h as O,i as C}from"./disclose-version.JRqZrXPl.js";import{n as g,F as I,a5 as T,I as N,a6 as P,a7 as R,a8 as $,a9 as b,a as j,o as B,x as F,A as H}from"./runtime.Irf3Z8oC.js";import{r as M}from"./svelte-head.1Fvc-YN8.js";function W(){console.warn("hydration_mismatch")}function K(n){for(var e=0;e<n.length;e++)V.add(n[e]);for(var o of p)o(n)}function w(n,e){var o=n.ownerDocument,r=e.type,i=e.composedPath?.()||[],a=i[0]||e.target;e.target!==a&&g(e,"target",{configurable:!0,value:a});var _=0,u=e.__root;if(u){var f=i.indexOf(u);if(f!==-1&&(n===document||n===window)){e.__root=n;return}var y=i.indexOf(n);if(y===-1)return;f<=y&&(_=f+1)}a=i[_]||e.target,g(e,"currentTarget",{configurable:!0,get(){return a||o}});function d(t){a=t;var l=t.parentNode||t.host||null;try{var s=t["__"+r];if(s!==void 0&&!t.disabled)if(I(s)){var[h,...c]=s;h.apply(t,[e,...c])}else s.call(t,e)}finally{!e.cancelBubble&&l!==n&&l!==null&&t!==n&&d(l)}}try{d(a)}finally{e.__root=n,a=n}}const V=new Set,p=new Set;function Q(n,e){const o=n.__nodeValue,r=Y(e);O&&n.nodeValue===r?n.__nodeValue=r:o!==r&&(n.nodeValue=r,n.__nodeValue=r)}function Y(n){return typeof n=="string"?n:n==null?"":n+""}function q(n,e){const o=e.anchor??e.target.appendChild(E());return T(()=>k(n,{...e,anchor:o}),!1)}function U(n,e){const o=e.target,r=C;let i=!1;try{return T(()=>{m(!0);for(var a=o.firstChild;a&&(a.nodeType!==8||a.data!==N);)a=a.nextSibling;a||P();const _=A(a),u=k(n,{...e,anchor:_});return m(!1),i=!0,u},!1)}catch(a){if(!i&&e.recover!==!1&&a.message.includes("hydration_missing_marker_close"))return W(),S(),D(o),m(!1),q(n,e);throw a}finally{m(!!r),L(r),M()}}function k(n,{target:e,anchor:o,props:r={},events:i,context:a,intro:_=!1}){S();const u=new Set,f=w.bind(null,e),y=w.bind(null,document),d=s=>{for(let h=0;h<s.length;h++){const c=s[h];u.has(c)||(u.add(c),e.addEventListener(c,f,b.includes(c)?{passive:!0}:void 0),document.addEventListener(c,y,b.includes(c)?{passive:!0}:void 0))}};d(R(V)),p.add(d);let t;const l=$(()=>(j(()=>{if(a){B({});var s=H;s.c=a}i&&(r.$$events=i),t=n(o,r)||{},a&&F()}),()=>{for(const s of u)e.removeEventListener(s,f);p.delete(d),v.delete(t)}));return v.set(t,l),t}let v=new WeakMap;function X(n){v.get(n)?.()}export{Y as a,K as d,U as h,q as m,Q as s,X as u};
