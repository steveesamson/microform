import{I as h,ab as T,ac as N,g as d,aa as b,F as m,a0 as E,ad as w,ae as A}from"./runtime.Irf3Z8oC.js";let o=!1;function S(e){o=e}let i=null;function D(e){i=e}function _(e){if(e.nodeType!==8)return e;var t=e;if(t.data!==h)return e;for(var n=[],r=0;(t=t.nextSibling)!==null;){if(t.nodeType===8){var a=t.data;if(a===h)r+=1;else if(a[0]===T){if(r===0)return i=n,t;r-=1}}n.push(t)}N()}var s,l,v,y,p,g,x,C;function M(){s===void 0&&(s=Node.prototype,l=Element.prototype,v=Text.prototype,s.appendChild,y=s.cloneNode,C=document,l.__click=void 0,v.__nodeValue=" ",l.__className="",l.__attributes=null,p=d(s,"firstChild").get,g=d(s,"nextSibling").get,x=d(s,"textContent").set,d(l,"className").set)}function I(e,t){return y.call(e,t)}function u(){return document.createTextNode("")}function P(e){const t=p.call(e);return o?t===null?e.appendChild(u()):_(t):t}function k(e,t){if(!o)return p.call(e);const n=e[0];if(t&&n?.nodeType!==3){const r=u();return i.unshift(r),n?.before(r),r}return _(n)}function F(e,t=!1){const n=g.call(e);if(!o)return n;if(t&&n?.nodeType!==3){const r=u();if(n){const a=i.indexOf(n);i.splice(a,0,r),n.before(r)}else i.push(r);return r}return _(n)}function L(e){x.call(e,"")}function c(e,t=E){var n=t.dom;return n===null?t.dom=e:(m(n)||(n=t.dom=[n]),m(e)?n.push(...e):n.push(e)),e}function H(e,t){var n=(t&w)!==0,r=(t&A)!==0,a;return()=>{if(o)return c(n?i:i[0]);a||(a=b(e),n||(a=a.firstChild));var f=r?document.importNode(a,!0):I(a,!0);return c(n?[...f.childNodes]:f),f}}function U(e){if(!o)return c(u());var t=i[0];return t||e.before(t=u()),c(t)}function V(){if(o)return c(i);var e=document.createDocumentFragment(),t=u();return e.append(t),c([t]),e}function Y(e,t){o||e.before(t)}const O="5";typeof window<"u"&&(window.__svelte||={v:new Set}).v.add(O);export{C as $,Y as a,P as b,V as c,U as d,u as e,k as f,_ as g,o as h,i,S as j,L as k,M as l,D as m,c as p,F as s,H as t};