import{s as c}from"./index.Jwv1W95a.js";import{e as b,d as l,U as o,f as a,C as i,m as f,u as _}from"./runtime.Irf3Z8oC.js";import{d}from"./singletons.dj2Fvbyd.js";function N(s,n,t){let e=t[n];const u=e===void 0;u&&(e={store:null,last_value:null,value:f(o),unsubscribe:i},t[n]=e),(u||e.store!==s)&&(e.unsubscribe(),e.store=s??null,e.unsubscribe=g(s,e.value));const r=l(e.value);return r===o?e.last_value:r}function g(s,n){return s==null?(a(n,void 0),i):c(s,t=>a(n,t))}function U(s){p(()=>{let n;for(n in s)s[n].unsubscribe()})}function p(s){b(()=>()=>_(s))}const m=()=>{const s=d;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},k={subscribe(s){return m().page.subscribe(s)}};export{k as p,N as s,U as u};
