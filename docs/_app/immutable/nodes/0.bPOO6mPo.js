import{s as T,c as x,u as z,g as E,d as I,e as N}from"../chunks/scheduler.yEHThLPp.js";import{S as O,i as V,g as p,s as $,h as d,j as D,x as A,c as H,f as h,k as b,y as C,a as M,z as v,d as k,t as q}from"../chunks/index.56jHPhMF.js";import{e as L}from"../chunks/singletons.8Zw2_zZi.js";import{p as w}from"../chunks/stores.VzxRkInt.js";const P=!0,R=Object.freeze(Object.defineProperty({__proto__:null,prerender:P},Symbol.toStringTag,{value:"Module"}));function B(n){let a,l,_="<strong>µform</strong> <em>microform</em>",f,o,c="Home",i,r,S="Demo",g,m,u;const y=n[3].default,s=x(y,n,n[2],null);return{c(){a=p("nav"),l=p("div"),l.innerHTML=_,f=$(),o=p("a"),o.textContent=c,i=$(),r=p("a"),r.textContent=S,g=$(),m=p("main"),s&&s.c(),this.h()},l(e){a=d(e,"NAV",{});var t=D(a);l=d(t,"DIV",{"data-svelte-h":!0}),A(l)!=="svelte-1s4fa8s"&&(l.innerHTML=_),f=H(t),o=d(t,"A",{href:!0,title:!0,"data-svelte-h":!0}),A(o)!=="svelte-h49wex"&&(o.textContent=c),i=H(t),r=d(t,"A",{href:!0,title:!0,"data-svelte-h":!0}),A(r)!=="svelte-14t8obb"&&(r.textContent=S),t.forEach(h),g=H(e),m=d(e,"MAIN",{});var j=D(m);s&&s.l(j),j.forEach(h),this.h()},h(){b(o,"href",`${L}/`),b(o,"title","Home"),C(o,"active",n[0]==="/"),b(r,"href",`${L}/demo`),b(r,"title","Demo"),C(r,"active",n[0]==="/demo")},m(e,t){M(e,a,t),v(a,l),v(a,f),v(a,o),v(a,i),v(a,r),M(e,g,t),M(e,m,t),s&&s.m(m,null),u=!0},p(e,[t]){(!u||t&1)&&C(o,"active",e[0]==="/"),(!u||t&1)&&C(r,"active",e[0]==="/demo"),s&&s.p&&(!u||t&4)&&z(s,y,e,e[2],u?I(y,e[2],t,null):E(e[2]),null)},i(e){u||(k(s,e),u=!0)},o(e){q(s,e),u=!1},d(e){e&&(h(a),h(g),h(m)),s&&s.d(e)}}}function F(n,a,l){let _,f;N(n,w,i=>l(1,f=i));let{$$slots:o={},$$scope:c}=a;return n.$$set=i=>{"$$scope"in i&&l(2,c=i.$$scope)},n.$$.update=()=>{n.$$.dirty&2&&l(0,_=f.route.id)},[_,f,c,o]}class U extends O{constructor(a){super(),V(this,a,F,B,T,{})}}export{U as component,R as universal};
