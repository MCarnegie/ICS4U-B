import{_,i as f,j as p,k as h,c,l as m,w as r,S as g,o,a as e,F as k,n as x,b as d,d as u,t as b,r as y}from"./index-CBdreY3s.js";const v="https://backend-of-mevn-scheduale.onrender.com",$={setup(){const a=f(null),s=document.URL;let n;return n=s.slice(s.lastIndexOf("/")+1),console.log(n),p(async()=>{try{const t=await h.get(`${v}/api/league/${n}`);a.value=t.data,console.log(t)}catch(t){console.error("Error fetching data:",t)}}),{teams:a,link:s}}},B={class:"section"},w={class:"container is-flex is-justify-content-center"},N={class:"table is-centered is-size-4 has-text-centered is-bordered"},V=e("thead",null,[e("tr",null,[e("th",null,"Teams Available")])],-1),j={class:"container is-flex is-justify-content-center"};function L(a,s,n,t,S,T){const i=y("router-link");return o(),c("body",null,[(o(),m(g,null,{default:r(()=>[e("section",B,[e("div",w,[e("table",N,[V,e("tbody",null,[(o(!0),c(k,null,x(t.teams,l=>(o(),c("tr",{key:l},[e("td",null,[e("strong",null,[d(i,{to:`/league/${l}/events`},{default:r(()=>[u(b(l),1)]),_:2},1032,["to"])])])]))),128))])])]),e("div",j,[d(i,{to:"/league"},{default:r(()=>[u(" Go Back")]),_:1})])])]),_:1}))])}const C=_($,[["render",L]]);export{C as default};