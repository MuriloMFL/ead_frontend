(()=>{var e={};e.id=5581,e.ids=[5581],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},94735:e=>{"use strict";e.exports=require("events")},29021:e=>{"use strict";e.exports=require("fs")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},91645:e=>{"use strict";e.exports=require("net")},33873:e=>{"use strict";e.exports=require("path")},27910:e=>{"use strict";e.exports=require("stream")},83997:e=>{"use strict";e.exports=require("tty")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},72168:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d});var r=s(70260),a=s(28203),o=s(25155),i=s.n(o),n=s(67292),l={};for(let e in n)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);s.d(t,l);let d=["",{children:["cadastros",{children:["questoes",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,12742)),"D:\\ead\\frontend\\src\\app\\cadastros\\questoes\\page.tsx"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,70440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,71354)),"D:\\ead\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(s.t.bind(s,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(s.t.bind(s,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,70440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["D:\\ead\\frontend\\src\\app\\cadastros\\questoes\\page.tsx"],u={require:s,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/cadastros/questoes/page",pathname:"/cadastros/questoes",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},12953:(e,t,s)=>{"use strict";s.r(t),s.d(t,{"00d00ed9f317bf5a63a04960412dba5b4ac6277463":()=>o});var r=s(21590);s(70376);var a=s(42385);async function o(){let e=await (0,a.UL)();return e.get("sessaoEad")?.value||null}(0,s(99344).D)([o]),(0,r.A)(o,"00d00ed9f317bf5a63a04960412dba5b4ac6277463",null)},15129:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,13219,23)),Promise.resolve().then(s.t.bind(s,34863,23)),Promise.resolve().then(s.t.bind(s,25155,23)),Promise.resolve().then(s.t.bind(s,40802,23)),Promise.resolve().then(s.t.bind(s,9350,23)),Promise.resolve().then(s.t.bind(s,48530,23)),Promise.resolve().then(s.t.bind(s,88921,23))},51577:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,66959,23)),Promise.resolve().then(s.t.bind(s,33875,23)),Promise.resolve().then(s.t.bind(s,88903,23)),Promise.resolve().then(s.t.bind(s,57174,23)),Promise.resolve().then(s.t.bind(s,84178,23)),Promise.resolve().then(s.t.bind(s,87190,23)),Promise.resolve().then(s.t.bind(s,61365,23))},32694:(e,t,s)=>{Promise.resolve().then(s.bind(s,84860))},79550:(e,t,s)=>{Promise.resolve().then(s.bind(s,52728))},84309:(e,t,s)=>{Promise.resolve().then(s.bind(s,12742))},26165:(e,t,s)=>{Promise.resolve().then(s.bind(s,10114))},10114:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>u});var r=s(45512),a=s(58009),o=s(96679),i=s.n(o),n=s(61757),l=s(79334),d=s(18049),c=s(15983);function u(){let[e,t]=(0,a.useState)(null),[s,o]=(0,a.useState)(""),[u,p]=(0,a.useState)("true"),[h,m]=(0,a.useState)([]),_=(0,l.useRouter)(),x=async e=>{await (0,c.w)("/trocarstatusquestao",{id_questao:e}),f()},b=e=>{document.cookie=`id_questao=${e}; max-age=86000;`,_.push("/cadastros/questoes/incluir")},f=async()=>{m(await (0,d.w)("/listarquestao",{status:"true"===u||"false"!==u&&void 0,questoes:s}))};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.Header,{}),(0,r.jsxs)("main",{className:i().dados,children:[(0,r.jsx)("div",{className:i().titulo,children:(0,r.jsx)("h1",{children:"Cadastros de Quest\xf5es"})}),(0,r.jsxs)("div",{className:i().barraFuncoes,children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("button",{className:`${i().btn} ${i().incluir}`,onClick:()=>{document.cookie="id_questao=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",t(null),setTimeout(()=>{_.push("/cadastros/questoes/incluir")},100)},children:"Incluir"}),(0,r.jsx)("button",{className:`${i().btn} ${i().imprimir}`,onClick:()=>window.print(),children:"Imprimir"})]}),(0,r.jsx)("form",{onSubmit:e=>{e.preventDefault(),f()},children:(0,r.jsxs)("div",{children:[(0,r.jsxs)("select",{className:i().inputPesquisaSelect,value:u,onChange:e=>p(e.target.value),children:[(0,r.jsx)("option",{value:"true",children:"Ativo"}),(0,r.jsx)("option",{value:"false",children:"Inativo"})]}),(0,r.jsx)("input",{type:"text",placeholder:"Pesquisar Quest\xe3o",className:i().inputPesquisa,value:s,onChange:e=>o(e.target.value)}),(0,r.jsx)("button",{type:"submit",className:i().btn,children:"Buscar"})]})})]}),(0,r.jsx)("section",{className:i().grid,children:(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{scope:"col",children:"ID"}),(0,r.jsx)("th",{scope:"col",children:"Quest\xe3o"}),(0,r.jsx)("th",{scope:"col",children:"Sistema"}),(0,r.jsx)("th",{scope:"col",children:"Modulo"}),(0,r.jsx)("th",{scope:"col",children:"SubModulo"}),(0,r.jsx)("th",{scope:"col",className:"acoes",children:"A\xe7\xf5es"})]})}),(0,r.jsx)("tbody",{children:h.map(e=>(0,r.jsxs)("tr",{className:i().griditens,children:[(0,r.jsx)("td",{"data-label":"ID",children:e.id_questao}),(0,r.jsx)("td",{"data-label":"Quest\xe3o",children:e.questoes.length>100?`${e.questoes.slice(0,100)}...`:e.questoes}),(0,r.jsx)("td",{"data-label":"Sistema",children:e.nome_sistema}),(0,r.jsx)("td",{"data-label":"Modulo",children:e.nome_modulo}),(0,r.jsx)("td",{"data-label":"SubModulo",children:e.nome_submodulo}),(0,r.jsxs)("td",{children:[(0,r.jsx)("button",{className:`${i().btn} ${i().alterar}`,onClick:()=>b(Number(e.id_questao)),children:"Alterar"}),(0,r.jsx)("button",{className:`${i().btn} ${e.status?i().excluir:i().incluir}`,onClick:()=>x(Number(e.id_questao)),children:e.status?"Excluir":"Incluir"})]})]},e.id_questao))})]})})]})]})}},52728:(e,t,s)=>{"use strict";s.d(t,{default:()=>o});var r=s(45512),a=s(68578);function o(){return(0,r.jsx)(a.N9,{})}},61757:(e,t,s)=>{"use strict";s.d(t,{Header:()=>_});var r=s(45512),a=s(97099),o=s.n(a),i=s(28531),n=s.n(i),l=s(45103),d=s(88237),c=s(52852),u=s(30722),p=s(50066),h=s(79334),m=s(58009);function _(){let e=(0,h.useRouter)();async function t(){(0,p.deleteCookie)("sessaoEad",{path:"/"}),e.replace("/")}let s=(0,m.useRef)(null);return(0,r.jsx)("header",{className:o().headerContainer,children:(0,r.jsxs)("div",{className:o().headerConteudo,children:[(0,r.jsx)(n(),{href:"/dashboard",children:(0,r.jsx)(l.default,{alt:"Logo Gestores Ead",src:d.default,width:200,height:50,priority:!0,style:{borderRadius:"4px"}})}),(0,r.jsx)("div",{className:o().icon,onClick:function(){s.current?s.current.classList.toggle(o().showMenu):console.error("Ref n\xe3o encontrou o elemento!")},children:"☰"}),(0,r.jsxs)("nav",{ref:s,className:o().headerNav,children:[(0,r.jsx)(n(),{href:"/dashboard",children:"Dashboard"}),(0,r.jsx)(n(),{href:"/releases",children:"Releases"}),(0,r.jsx)(n(),{href:"/videos",children:"Videos"}),(0,r.jsx)(n(),{href:"/faqs",children:"Faqs"}),(0,r.jsx)(n(),{href:"/provas",children:"Provas"}),(0,r.jsxs)(n(),{href:"/meucadastro",className:o().usuario,children:[(0,r.jsx)(c.A,{size:40,color:"#FFF"}),(0,r.jsx)("p",{children:"Usuario"})]}),(0,r.jsx)("form",{action:t,children:(0,r.jsx)("button",{type:"submit",children:(0,r.jsx)(u.A,{size:24,color:"#FFF"})})})]})]})})}},20065:(e,t,s)=>{"use strict";s.d(t,{F:()=>r});let r=s(85668).A.create({baseURL:"http://localhost:3333"})},18049:(e,t,s)=>{"use strict";s.d(t,{w:()=>o});var r=s(20065),a=s(70776);let o=async(e,t)=>{try{let s=await (0,a.K)();return(await r.F.get(e,{headers:{Authorization:`Bearer ${s}`},params:t})).data||[]}catch(t){console.log(`Erro ao buscar dados de ${e}`)}}},15983:(e,t,s)=>{"use strict";s.d(t,{w:()=>o});var r=s(20065),a=s(70776);let o=async(e,t)=>{try{let s=await (0,a.K)();if(!confirm("Deseja trocar o status?"))return;return(await r.F.put(e,t,{headers:{Authorization:`Bearer ${s}`}})).data||[]}catch(t){console.error(`Erro ao buscar dados de ${e}:`,t)}}},97099:e=>{e.exports={headerContainer:"styles_headerContainer___8Jus",headerConteudo:"styles_headerConteudo__NQud8",headerNav:"styles_headerNav__QUYkC",icon:"styles_icon__baXze",usuario:"styles_usuario__ah6Zz",showMenu:"styles_showMenu__G94ci"}},96679:e=>{e.exports={conteinerCentral:"page_conteinerCentral__r1q6E",login:"page_login__YmZVk",toplogin:"page_toplogin__zbRb4",dados:"page_dados__LeY4T",titulo:"page_titulo__NKczC",barraFuncoes:"page_barraFuncoes__rUg_q",btn:"page_btn__8GLw4",incluir:"page_incluir__DOXQl",imprimir:"page_imprimir__XzUdY",alterar:"page_alterar__SwjnZ",excluir:"page_excluir__alK_Y",inputPesquisa:"page_inputPesquisa__sG2Ml",inputPesquisaSelect:"page_inputPesquisaSelect__BuAEd",inputPesquisaSelectForm:"page_inputPesquisaSelectForm___Krpu",listaSistemas:"page_listaSistemas__2h3EM",grid:"page_grid__umSuY",conteudoHtml:"page_conteudoHtml__EGFUX",gridCadastros:"page_gridCadastros__CK6f9",checks:"page_checks__sebGV",cabecalhoFormCadastro:"page_cabecalhoFormCadastro__6OLUP",formCadastro:"page_formCadastro__N1CA6",error:"page_error__err8O",acoes:"page_acoes__wpQgV"}},12742:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"D:\\\\ead\\\\frontend\\\\src\\\\app\\\\cadastros\\\\questoes\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"D:\\ead\\frontend\\src\\app\\cadastros\\questoes\\page.tsx","default")},84860:(e,t,s)=>{"use strict";s.d(t,{default:()=>r});let r=(0,s(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"D:\\\\ead\\\\frontend\\\\src\\\\app\\\\clientToast.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"D:\\ead\\frontend\\src\\app\\clientToast.tsx","default")},71354:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c,metadata:()=>d});var r=s(62740),a=s(76381),o=s.n(a),i=s(93704),n=s.n(i);s(17478);var l=s(84860);s(56070);let d={title:"Ead",description:"Ead"};function c({children:e}){return(0,r.jsx)("html",{lang:"pt-br",children:(0,r.jsxs)("body",{className:`${o().variable??""} ${n().variable??""}`,children:[(0,r.jsx)(l.default,{}),e]})})}},70776:(e,t,s)=>{"use strict";s.d(t,{K:()=>a});var r=s(26248);let a=(0,r.createServerReference)("00d00ed9f317bf5a63a04960412dba5b4ac6277463",r.callServer,void 0,r.findSourceMapURL,"getCookieServer")},88237:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r={src:"/_next/static/media/Logo.aabca874.png",height:60,width:318,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAMAAABSSm3fAAAAG1BMVEXX4+nJ3OTe6u/S1eHB1NzAxNOmtbbT0M3P3+bJF8ieAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGklEQVR4nGNgYGJgYmBmZmdgYWRhZGRlZQMAAUAALd68s1MAAAAASUVORK5CYII=",blurWidth:8,blurHeight:2}},70440:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var r=s(88077);let a=async e=>[{type:"image/x-icon",sizes:"256x256",url:(0,r.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},17478:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[638,3234,2512,4191,190],()=>s(72168));module.exports=r})();