import{J as x,K as A,S as a,Q as D,R as N,k as v,w as b,C as I,f as u,g,d as y,F as j,u as k,T as F,b as L,D as R,a as T,p as w,E as K}from"./runtime.s70L-IuO.js";import{U as _,h as m,a as M,H as Y,o as B,m as C,p as E,b as H}from"./disclose-version.xJvkRvE8.js";function h(e,t=null,s){if(typeof e=="object"&&e!=null&&!x(e)&&!(A in e)){if(a in e){const n=e[a];if(n.t===e||n.p===e)return n.p}const f=F(e);if(f===D||f===N){const n=new Proxy(e,U);return v(e,a,{value:{s:new Map,v:b(0),a:I(e),p:n,t:e},writable:!0,enumerable:!1}),n}}return e}function O(e,t=1){u(e,e.v+t)}const U={defineProperty(e,t,s){if(s.value){const f=e[a],n=f.s.get(t);n!==void 0&&u(n,h(s.value,f))}return Reflect.defineProperty(e,t,s)},deleteProperty(e,t){const s=e[a],f=s.s.get(t),n=s.a,i=delete e[t];if(n&&i){const r=s.s.get("length"),o=e.length-1;r!==void 0&&r.v!==o&&u(r,o)}return f!==void 0&&u(f,_),i&&O(s.v),i},get(e,t,s){if(t===a)return Reflect.get(e,a);const f=e[a];let n=f.s.get(t);if(n===void 0&&(!(t in e)||g(e,t)?.writable)&&(n=b(h(e[t],f)),f.s.set(t,n)),n!==void 0){const i=y(n);return i===_?void 0:i}return Reflect.get(e,t,s)},getOwnPropertyDescriptor(e,t){const s=Reflect.getOwnPropertyDescriptor(e,t);if(s&&"value"in s){const n=e[a].s.get(t);n&&(s.value=y(n))}return s},has(e,t){if(t===a)return!0;const s=e[a],f=Reflect.has(e,t);let n=s.s.get(t);return(n!==void 0||j!==null&&(!f||g(e,t)?.writable))&&(n===void 0&&(n=b(f?h(e[t],s):_),s.s.set(t,n)),y(n)===_)?!1:f},set(e,t,s,f){const n=e[a];let i=n.s.get(t);i===void 0&&(k(()=>f[t]),i=n.s.get(t)),i!==void 0&&u(i,h(s,n));const r=n.a,o=!(t in e);if(r&&t==="length")for(let c=s;c<e.length;c+=1){const l=n.s.get(c+"");l!==void 0&&u(l,_)}var d=Reflect.getOwnPropertyDescriptor(e,t);if(d?.set?d.set.call(f,s):e[t]=s,o){if(r){const c=n.s.get("length"),l=e.length;c!==void 0&&c.v!==l&&u(c,l)}O(n.v)}return!0},ownKeys(e){const t=e[a];return y(t.v),Reflect.ownKeys(e)}};function P(e){if(e!==null&&typeof e=="object"&&a in e){var t=e[a];if(t)return t.p}return e}function q(e,t){return Object.is(P(e),P(t))}function z(e,t,s,f=null,n=!1){m&&M();var i=e,r=null,o=null,d=null,c=n?K:0;L(()=>{if(d===(d=!!t()))return;let l=!1;if(m){const S=i.data===Y;d===S&&(i=B(),C(i),E(!1),l=!0)}d?(r?R(r):r=T(()=>s(i)),o&&w(o,()=>{o=null})):(o?R(o):f&&(o=T(()=>f(i))),r&&w(r,()=>{r=null})),l&&E(!0)},c),m&&(i=H)}export{q as a,P as g,z as i,h as p};