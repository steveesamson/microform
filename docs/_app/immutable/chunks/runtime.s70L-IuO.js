var rt=Array.isArray,et=Array.from,ut=Object.isFrozen,lt=Object.defineProperty,st=Object.getOwnPropertyDescriptor,Rn=Object.getOwnPropertyDescriptors,ot=Object.prototype,it=Array.prototype,Nn=Object.getPrototypeOf;const ft=()=>{};function at(n){return n()}function en(n){for(var t=0;t<n.length;t++)n[t]()}const g=2,un=4,b=8,ln=16,y=32,V=64,T=128,L=256,w=512,k=1024,C=2048,F=4096,D=8192,jn=16384,sn=32768,_t=65536,In=1<<18,J=Symbol("$state"),ct=Symbol("$state.frozen"),vt=Symbol("");function on(n){return n===this.v}function Ln(n,t){return n!=n?t==t:n!==t||n!==null&&typeof n=="object"||typeof n=="function"}function fn(n){return!Ln(n,this.v)}function Mn(n){throw new Error("effect_in_teardown")}function Yn(){throw new Error("effect_in_unowned_derived")}function Pn(n){throw new Error("effect_orphan")}function Bn(){throw new Error("effect_update_depth_exceeded")}function pt(){throw new Error("hydration_failed")}function ht(n){throw new Error("props_invalid_value")}function Hn(){throw new Error("state_unsafe_mutation")}function an(n){return{f:0,v:n,reactions:null,equals:on,version:0}}function dt(n){const t=an(n);return t.equals=fn,v!==null&&v.l!==null&&(v.l.s??=[]).push(t),t}function wt(n,t){return Un(n,Xn(()=>Dn(n))),t}function Un(n,t){return f!==null&&$()&&f.f&g&&Hn(),n.equals(t)||(n.v=t,n.version=qn(),_n(n,k),$()&&i!==null&&i.f&w&&!(i.f&y)&&(_!==null&&_.includes(n)?(h(i,k),U(i)):E===null?Zn([n]):E.push(n))),t}function _n(n,t){var r=n.reactions;if(r!==null)for(var e=$(),u=r.length,l=0;l<u;l++){var s=r[l],o=s.f;o&k||!e&&s===i||(h(s,t),o&(w|T)&&(o&g?_n(s,C):U(s)))}}function cn(n){i===null&&f===null&&Pn(),f!==null&&f.f&T&&Yn(),W&&Mn()}function Q(n,t){var r=t.last;r===null?t.last=t.first=n:(r.next=n,n.prev=r,t.last=n)}function R(n,t,r,e=!0){var u=(n&V)!==0,l={ctx:v,deps:null,nodes:null,f:n|k,first:null,fn:t,last:null,next:null,parent:u?null:i,prev:null,teardown:null,transitions:null,version:0};if(r){var s=S;try{X(!0),H(l),l.f|=jn}catch(a){throw P(l),a}finally{X(s)}}else t!==null&&U(l);var o=r&&l.deps===null&&l.first===null&&l.nodes===null&&l.teardown===null;return!o&&!u&&e&&(i!==null&&Q(l,i),f!==null&&f.f&g&&Q(l,f)),l}function yt(n){const t=R(b,null,!1);return h(t,w),t.teardown=n,t}function Et(n){cn();var t=i!==null&&(i.f&b)!==0&&v!==null&&!v.m;if(t){var r=v;(r.e??=[]).push(n)}else{var e=vn(n);return e}}function kt(n){return cn(),pn(n)}function mt(n){const t=R(V,n,!0);return()=>{P(t)}}function vn(n){return R(un,n,!1)}function pn(n){return R(b,n,!0)}function gt(n){return pn(n)}function Tt(n,t=0){return R(b|ln|t,n,!0)}function xt(n,t=!0){return R(b|y,n,!0,t)}function hn(n){var t=n.teardown;if(t!==null){const r=W,e=f;nn(!0),tn(null);try{t.call(null)}finally{nn(r),tn(e)}}}function P(n,t=!0){var r=!1;if((t||n.f&In)&&n.nodes!==null){for(var e=n.nodes.start,u=n.nodes.end;e!==null;){var l=e===u?null:e.nextSibling;e.remove(),e=l}r=!0}if(Z(n,t&&!r),B(n,0),h(n,D),n.transitions)for(const o of n.transitions)o.stop();hn(n);var s=n.parent;s!==null&&n.f&y&&s.first!==null&&dn(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.parent=n.fn=n.nodes=null}function dn(n){var t=n.parent,r=n.prev,e=n.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),t!==null&&(t.first===n&&(t.first=e),t.last===n&&(t.last=r))}function qt(n,t){var r=[];wn(n,r,!0),zn(r,()=>{P(n),t&&t()})}function zn(n,t){var r=n.length;if(r>0){var e=()=>--r||t();for(var u of n)u.out(e)}else t()}function wn(n,t,r){if(!(n.f&F)){if(n.f^=F,n.transitions!==null)for(const s of n.transitions)(s.is_global||r)&&t.push(s);for(var e=n.first;e!==null;){var u=e.next,l=(e.f&sn)!==0||(e.f&y)!==0;wn(e,t,l?r:!1),e=u}}}function Ot(n){yn(n,!0)}function yn(n,t){if(n.f&F){n.f^=F,j(n)&&H(n);for(var r=n.first;r!==null;){var e=r.next,u=(r.f&sn)!==0||(r.f&y)!==0;yn(r,u?t:!1),r=e}if(n.transitions!==null)for(const l of n.transitions)(l.is_global||t)&&l.in()}}const Kn=typeof requestIdleCallback>"u"?n=>setTimeout(n,1):requestIdleCallback;let M=!1,Y=!1,z=[],K=[];function En(){M=!1;const n=z.slice();z=[],en(n)}function kn(){Y=!1;const n=K.slice();K=[],en(n)}function St(n){M||(M=!0,queueMicrotask(En)),z.push(n)}function At(n){Y||(Y=!0,Kn(kn)),K.push(n)}function $n(){M&&En(),Y&&kn()}function Gn(n){let t=g|k;i===null&&(t|=T);const r={deps:null,deriveds:null,equals:on,f:t,first:null,fn:n,last:null,reactions:null,v:null,version:0};if(f!==null&&f.f&g){var e=f;e.deriveds===null?e.deriveds=[r]:e.deriveds.push(r)}return r}function Ft(n){const t=Gn(n);return t.equals=fn,t}function mn(n){Z(n);var t=n.deriveds;if(t!==null){n.deriveds=null;for(var r=0;r<t.length;r+=1)Vn(t[r])}}function gn(n){mn(n);var t=On(n),r=(O||n.f&T)&&n.deps!==null?C:w;h(n,r),n.equals(t)||(n.v=t,n.version=qn())}function Vn(n){mn(n),B(n,0),h(n,D),n.first=n.last=n.deps=n.reactions=n.fn=null}const Tn=0,Wn=1;let I=Tn,N=!1,S=!1,W=!1;function X(n){S=n}function nn(n){W=n}let m=[],A=0,f=null;function tn(n){f=n}let i=null,_=null,c=0,E=null;function Zn(n){E=n}let xn=0,O=!1,v=null;function qn(){return xn++}function $(){return v!==null&&v.l===null}function j(n){var t=n.f;if(t&k)return!0;if(t&C){var r=n.deps;if(r!==null){var e=(t&T)!==0,u;if(t&L){for(u=0;u<r.length;u++)(r[u].reactions??=[]).push(n);n.f^=L}for(u=0;u<r.length;u++){var l=r[u];if(j(l)&&gn(l),l.version>n.version)return!0;e&&!O&&!l?.reactions?.includes(n)&&(l.reactions??=[]).push(n)}}h(n,w)}return!1}function Jn(n,t,r){throw n}function On(n){var t=_,r=c,e=E,u=f,l=O;_=null,c=0,E=null,f=n.f&(y|V)?null:n,O=!S&&(n.f&T)!==0;try{var s=(0,n.fn)(),o=n.deps;if(_!==null){var a,p;if(o!==null){var x=c===0?_:o.slice(0,c).concat(_),q=x.length>16?new Set(x):null;for(p=c;p<o.length;p++)a=o[p],(q!==null?!q.has(a):!x.includes(a))&&Sn(n,a)}if(o!==null&&c>0)for(o.length=c+_.length,p=0;p<_.length;p++)o[c+p]=_[p];else n.deps=o=_;if(!O)for(p=c;p<o.length;p++){a=o[p];var d=a.reactions;d===null?a.reactions=[n]:d[d.length-1]!==n&&!d.includes(n)&&d.push(n)}}else o!==null&&c<o.length&&(B(n,c),o.length=c);return s}finally{_=t,c=r,E=e,f=u,O=l}}function Sn(n,t){const r=t.reactions;let e=0;if(r!==null){e=r.length-1;const u=r.indexOf(n);u!==-1&&(e===0?t.reactions=null:(r[u]=r[e],r.pop()))}e===0&&t.f&g&&(h(t,C),t.f&(T|L)||(t.f^=L),B(t,0))}function B(n,t){var r=n.deps;if(r!==null)for(var e=t===0?null:r.slice(0,t),u=new Set,l=t;l<r.length;l++){var s=r[l];u.has(s)||(u.add(s),(e===null||!e.includes(s))&&Sn(n,s))}}function Z(n,t=!1){var r=n.first;for(n.first=n.last=null;r!==null;){var e=r.next;P(r,t),r=e}}function H(n){var t=n.f;if(!(t&D)){h(n,w);var r=n.ctx,e=i,u=v;i=n,v=r;try{t&ln||Z(n),hn(n);var l=On(n);n.teardown=typeof l=="function"?l:null,n.version=xn}catch(s){Jn(s)}finally{i=e,v=u}}}function An(){A>1e3&&(A=0,Bn()),A++}function Fn(n){var t=n.length;if(t!==0){An();var r=S;S=!0;try{for(var e=0;e<t;e++){var u=n[e];if(u.first===null&&!(u.f&y))rn([u]);else{var l=[];bn(u,l),rn(l)}}}finally{S=r}}}function rn(n){var t=n.length;if(t!==0)for(var r=0;r<t;r++){var e=n[r];!(e.f&(D|F))&&j(e)&&(H(e),e.deps===null&&e.first===null&&e.nodes===null&&(e.teardown===null?dn(e):e.fn=null))}}function Qn(){if(N=!1,A>1001)return;const n=m;m=[],Fn(n),N||(A=0)}function U(n){I===Tn&&(N||(N=!0,queueMicrotask(Qn)));for(var t=n;t.parent!==null;){t=t.parent;var r=t.f;if(r&y){if(!(r&w))return;h(t,C)}}m.push(t)}function bn(n,t){var r=n.first,e=[];n:for(;r!==null;){var u=r.f,l=(u&(D|F))===0,s=u&y,o=(u&w)!==0,a=r.first;if(l&&(!s||!o)){if(s&&h(r,w),u&b){if(!s&&j(r)&&(H(r),a=r.first),a!==null){r=a;continue}}else if(u&un)if(s||o){if(a!==null){r=a;continue}}else e.push(r)}var p=r.next;if(p===null){let d=r.parent;for(;d!==null;){if(n===d)break n;var x=d.next;if(x!==null){r=x;continue n}d=d.parent}}r=p}for(var q=0;q<e.length;q++)a=e[q],t.push(a),bn(a,t)}function Cn(n){var t=I,r=m;try{An();const u=[];I=Wn,m=u,N=!1,Fn(r);var e=n?.();return $n(),(m.length>0||u.length>0)&&Cn(),A=0,e}finally{I=t,m=r}}async function bt(){await Promise.resolve(),Cn()}function Dn(n){var t=n.f;if(t&D)return n.v;if(f!==null){var r=f.deps;_===null&&r!==null&&r[c]===n?c++:(r===null||c===0||r[c-1]!==n)&&(_===null?_=[n]:_[_.length-1]!==n&&_.push(n)),E!==null&&i!==null&&i.f&w&&!(i.f&y)&&E.includes(n)&&(h(i,k),U(i))}if(t&g){var e=n;j(e)&&gn(e)}return n.v}function Xn(n){const t=f;try{return f=null,n()}finally{f=t}}const nt=~(k|C|w);function h(n,t){n.f=n.f&nt|t}function tt(n){return typeof n=="object"&&n!==null&&typeof n.f=="number"}function Ct(n,t=!1,r){v={p:v,c:null,e:null,m:!1,s:n,x:null,l:null},t||(v.l={s:null,u:null,r1:[],r2:an(!1)})}function Dt(n){const t=v;if(t!==null){n!==void 0&&(t.x=n);const e=t.e;if(e!==null){t.e=null;for(var r=0;r<e.length;r++)vn(e[r])}v=t.p,t.m=!0}return n||{}}function Rt(n){if(!(typeof n!="object"||!n||n instanceof EventTarget)){if(J in n)G(n);else if(!Array.isArray(n))for(let t in n){const r=n[t];typeof r=="object"&&r&&J in r&&G(r)}}}function G(n,t=new Set){if(typeof n=="object"&&n!==null&&!(n instanceof EventTarget)&&!t.has(n)){t.add(n),n instanceof Date&&n.getTime();for(let e in n)try{G(n[e],t)}catch{}const r=Nn(n);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Rn(r);for(let u in e){const l=e[u].get;if(l)try{l.call(n)}catch{}}}}}function Nt(n){return tt(n)?Dn(n):n}export{In as $,yt as A,ft as B,rt as C,Ot as D,sn as E,i as F,wn as G,zn as H,F as I,ut as J,ct as K,_t as L,Rt as M,Ln as N,Nt as O,wt as P,ot as Q,it as R,J as S,Nn as T,vt as U,At as V,en as W,at as X,pt as Y,et as Z,mt as _,xt as a,Tt as b,ht as c,Dn as d,vn as e,Un as f,st as g,Gn as h,Ft as i,Cn as j,lt as k,Ct as l,dt as m,kt as n,Et as o,qt as p,St as q,pn as r,fn as s,bt as t,Xn as u,Dt as v,an as w,gt as x,v as y,P as z};