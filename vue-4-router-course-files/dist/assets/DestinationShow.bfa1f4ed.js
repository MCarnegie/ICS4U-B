import{c as t,a as e,t as o,o as s,s as g,h as k,F as $,i as v,r as i,w as C}from"./index.4e5a2b15.js";const _={props:{experience:{type:Object,required:!0}}},b={class:"card"},w={class:"card__text"};function y(r,c,a,u,p,n){return s(),t("div",b,[e("img",{src:`/images/${a.experience.image}`,alt:a.experience.name},null,8,["src","alt"]),e("span",w,o(a.experience.name),1)])}_.render=y;const l={},B={class:"go-back"};function E(r,c){return s(),t("span",B,[e("button",{onClick:c[1]||(c[1]=a=>r.$router.back())},"go back")])}l.render=E;const G={components:{ExperienceCard:_,GoBack:l},props:{id:{type:Number,required:!0}},computed:{destination(){return g.destinations.find(r=>r.id===this.id)}}},N={key:0,class:"destination"},q={class:"destination-details"},D={class:"experiences"},F={class:"cards"};function S(r,c,a,u,p,n){const m=i("GoBack"),x=i("ExperienceCard"),h=i("router-link"),f=i("router-view");return s(),t("div",null,[n.destination?(s(),t("section",N,[e("h1",null,o(n.destination.name),1),e(m),e("div",q,[e("img",{src:`/images/${n.destination.image}`,alt:n.destination.name},null,8,["src","alt"]),e("p",null,o(n.destination.description),1)])])):k("",!0),e("section",D,[e("h2",null,"Top Experiences in "+o(n.destination.name),1),e("div",F,[(s(!0),t($,null,v(n.destination.experiences,d=>(s(),t(h,{key:d.slug,to:{name:"experience.show",params:{experienceSlug:d.slug}}},{default:C(()=>[e(x,{experience:d},null,8,["experience"])]),_:2},1032,["to"]))),128))]),e(f)])])}G.render=S;export{G as default};
