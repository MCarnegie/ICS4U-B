import{_ as y,A as U,i as m,j as L,k as u,c as r,a as e,e as p,f as o,v as n,q as g,F as b,n as f,o as c,t as D}from"./index-DXyJi94Y.js";const v="http://localhost:3000",T={setup(){let d=localStorage.getItem("token");d=U.decodeToken(d),console.log(d.role);let s=m(),_=m(),t=m({name:"",id:0,whatLeague:""}),l=m({name:"",description:"",time:"",location:"",date:"",teams:"",notes:"",imageUrl:"",id:0,whatTeam:""});async function h(){try{console.log("creating team..."),await u.post(`${v}/api/teams`,{name:t.value.name+` (${t.value.whatLeague})`,id:t.value.id,whatLeague:t.value.whatLeague,role:d.role}),location.reload()}catch(i){console.error("Error fetching data:",i)}}async function a(){try{console.log("creating event..."),await u.post(`${v}/api/events`,{name:l.value.name,description:l.value.description,time:l.value.time,location:l.value.location,date:l.value.date,teams:l.value.teams,notes:l.value.notes,imageUrl:l.value.imageUrl,id:"",whatTeam:l.value.whatTeam,role:d.role}),location.reload()}catch(i){console.error("Error fetching data:",i)}}return L(async()=>{try{const i=await u.get(`${v}/api/allteams`);s.value=i.data;const w=await u.get(`${v}/api/league`);_.value=w.data}catch(i){console.error("Error fetching data:",i)}}),{createTeam:h,createEvent:a,teamData:t,eventData:l,teamNames:s,leagueNames:_}}},V={class:"columns"},x={class:"column"},E={class:"card"},q={class:"card-content"},N=e("h1",{class:"title"},"Create a Team",-1),C={class:"field"},k=e("label",{for:"email",class:"label"},"Name:",-1),S={class:"control"},A={class:"field"},M=e("label",{for:"email",class:"label"},"Create New League",-1),B={class:"field"},F=e("label",{for:"email",class:"label"},"Choose Existing League",-1),I={class:"select"},Y=["value"],j=e("button",{type:"submit",class:"button"},"Create Your Team",-1),P={class:"column"},R={class:"card"},W={class:"card-content"},z=e("h1",{class:"title"},"Create an Event",-1),G={class:"field"},H=e("label",{class:"label"},"Name:",-1),J={class:"field"},K=e("label",{class:"label"},"Description",-1),O={class:"field"},Q=e("label",{class:"label"},"Time",-1),X={class:"field"},Z=e("label",{class:"label"},"Location",-1),$={class:"field"},ee=e("label",{class:"label"},"Date",-1),te={class:"field"},ae=e("label",{class:"label"},"teams",-1),se={class:"field"},le=e("label",{class:"label"},"notes",-1),oe={class:"field"},ne=e("label",{class:"label"},"What team is this for And which team is this league in ",-1),ie={class:"select"},de=["value"],re=e("button",{type:"submit",class:"button"},"Create Your Event",-1);function ce(d,s,_,t,l,h){return c(),r("body",null,[e("div",V,[e("div",x,[e("div",E,[e("div",q,[N,e("form",{onSubmit:s[3]||(s[3]=p((...a)=>t.createTeam&&t.createTeam(...a),["prevent"]))},[e("div",C,[k,e("div",S,[o(e("input",{class:"input",type:"test",id:"email","onUpdate:modelValue":s[0]||(s[0]=a=>t.teamData.name=a),required:""},null,512),[[n,t.teamData.name]])])]),e("div",A,[M,o(e("input",{type:"text","onUpdate:modelValue":s[1]||(s[1]=a=>t.teamData.whatLeague=a),class:"input"},null,512),[[n,t.teamData.whatLeague]])]),e("div",B,[F,e("div",I,[o(e("select",{name:"leagues",id:"leagues","onUpdate:modelValue":s[2]||(s[2]=a=>t.teamData.whatLeague=a)},[(c(!0),r(b,null,f(t.leagueNames,a=>(c(),r("option",{value:a},D(a),9,Y))),256))],512),[[g,t.teamData.whatLeague]])])]),j],32)])])]),e("div",P,[e("div",R,[e("div",W,[z,e("form",{onSubmit:s[12]||(s[12]=p((...a)=>t.createEvent&&t.createEvent(...a),["prevent"]))},[e("div",G,[H,o(e("input",{type:"test","onUpdate:modelValue":s[4]||(s[4]=a=>t.eventData.name=a),class:"input",required:""},null,512),[[n,t.eventData.name]])]),e("div",J,[K,o(e("input",{type:"text","onUpdate:modelValue":s[5]||(s[5]=a=>t.eventData.description=a),class:"input",required:""},null,512),[[n,t.eventData.description]])]),e("div",O,[Q,o(e("input",{type:"text","onUpdate:modelValue":s[6]||(s[6]=a=>t.eventData.time=a),class:"input",required:""},null,512),[[n,t.eventData.time]])]),e("div",X,[Z,o(e("input",{type:"text","onUpdate:modelValue":s[7]||(s[7]=a=>t.eventData.location=a),class:"input",required:""},null,512),[[n,t.eventData.location]])]),e("div",$,[ee,o(e("input",{type:"date","onUpdate:modelValue":s[8]||(s[8]=a=>t.eventData.date=a),class:"input",required:""},null,512),[[n,t.eventData.date]])]),e("div",te,[ae,o(e("input",{type:"text","onUpdate:modelValue":s[9]||(s[9]=a=>t.eventData.teams=a),class:"input",required:""},null,512),[[n,t.eventData.teams]])]),e("div",se,[le,o(e("input",{type:"text","onUpdate:modelValue":s[10]||(s[10]=a=>t.eventData.notes=a),class:"input",required:""},null,512),[[n,t.eventData.notes]])]),e("div",oe,[ne,e("div",ie,[o(e("select",{name:"teams",id:"teams","onUpdate:modelValue":s[11]||(s[11]=a=>t.eventData.whatTeam=a)},[(c(!0),r(b,null,f(t.teamNames,a=>(c(),r("option",{value:a},D(a),9,de))),256))],512),[[g,t.eventData.whatTeam]])])]),re],32)])])])])])}const ue=y(T,[["render",ce]]);export{ue as default};
