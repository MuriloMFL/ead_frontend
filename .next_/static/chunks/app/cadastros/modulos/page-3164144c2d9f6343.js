(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3613],{4641:(e,a,s)=>{Promise.resolve().then(s.bind(s,3218))},3218:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>u});var r=s(5155),t=s(7068),o=s.n(t),i=s(5985),c=s(2115),l=s(9557),n=s(6046),d=s(1661);function u(){let[e,a]=(0,c.useState)("true"),[s,t]=(0,c.useState)(null),[u,h]=(0,c.useState)(""),[_,m]=(0,c.useState)([]),p=async()=>{m(await (0,l.w)("/listarmodulo",{status:"true"===e||"false"!==e&&void 0,nome_modulo:u}))};(0,c.useEffect)(()=>{p()},[]);let x=(0,n.useRouter)(),g=async e=>{if(!e){console.error("ID do modulo inv\xe1lido");return}await (0,d.w)("/trocarstatusmodulo",{id_modulo:e})&&p()},A=async e=>{document.cookie="id_modulo=".concat(e,"; path=/; max-age=86400;"),x.push("/cadastros/modulos/incluir")};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.Header,{}),(0,r.jsxs)("main",{className:o().dados,children:[(0,r.jsx)("div",{className:o().titulo,children:(0,r.jsx)("h1",{children:"Cadastro de modulos"})}),(0,r.jsxs)("div",{className:o().barraFuncoes,children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("button",{className:"".concat(o().btn," ").concat(o().incluir),onClick:()=>{document.cookie="id_modulo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",t(null),x.push("/cadastros/modulos/incluir")},children:"Incluir"}),(0,r.jsx)("button",{className:"".concat(o().btn," ").concat(o().imprimir),onClick:()=>window.print(),children:"Imprimir"})]}),(0,r.jsx)("form",{onSubmit:e=>{e.preventDefault(),p()},children:(0,r.jsxs)("div",{children:[(0,r.jsxs)("select",{className:o().inputPesquisaSelect,value:e,onChange:e=>a(e.target.value),children:[(0,r.jsx)("option",{value:"true",children:"Ativo"}),(0,r.jsx)("option",{value:"false",children:"Inativo"})]}),(0,r.jsx)("input",{type:"text",placeholder:"Pesquisar Modulos",className:o().inputPesquisa,value:u,onChange:e=>h(e.target.value)}),(0,r.jsx)("button",{type:"submit",className:o().btn,children:"Buscar"})]})})]}),(0,r.jsx)("section",{className:o().grid,children:(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{scope:"col",children:"ID"}),(0,r.jsx)("th",{scope:"col",children:"Modulo"}),(0,r.jsx)("th",{scope:"col",children:"Sistema"}),(0,r.jsx)("th",{scope:"col",className:"acoes",children:"A\xe7\xf5es"})]})}),(0,r.jsx)("tbody",{children:_.map(e=>(0,r.jsxs)("tr",{className:o().griditens,children:[(0,r.jsx)("td",{"data-label":"ID",children:e.id_modulo}),(0,r.jsx)("td",{"data-label":"Modulo",children:e.nome_modulo}),(0,r.jsx)("td",{"data-label":"Sistema",children:e.nome_sistema}),(0,r.jsxs)("td",{children:[(0,r.jsx)("button",{className:"".concat(o().btn," ").concat(o().alterar),onClick:()=>A(Number(e.id_modulo)),children:"Alterar"}),(0,r.jsx)("button",{className:"".concat(o().btn," ").concat(e.status?o().excluir:o().incluir),onClick:()=>g(e.id_modulo),children:e.status?"Excluir":"Ativar"})]})]},e.id_modulo))})]})})]})]})}},5985:(e,a,s)=>{"use strict";s.d(a,{Header:()=>p});var r=s(5155),t=s(7232),o=s.n(t),i=s(8173),c=s.n(i),l=s(5565),n=s(7440),d=s(3250),u=s(5236),h=s(3030),_=s(6046),m=s(2115);function p(){let e=(0,_.useRouter)();async function a(){(0,h.deleteCookie)("sessaoEad",{path:"/"}),e.replace("/")}let s=(0,m.useRef)(null);return(0,r.jsx)("header",{className:o().headerContainer,children:(0,r.jsxs)("div",{className:o().headerConteudo,children:[(0,r.jsx)(c(),{href:"/dashboard",children:(0,r.jsx)(l.default,{alt:"Logo Gestores Ead",src:n.default,width:200,height:50,priority:!0,style:{borderRadius:"4px"}})}),(0,r.jsx)("div",{className:o().icon,onClick:function(){s.current?s.current.classList.toggle(o().showMenu):console.error("Ref n\xe3o encontrou o elemento!")},children:"☰"}),(0,r.jsxs)("nav",{ref:s,className:o().headerNav,children:[(0,r.jsx)(c(),{href:"/dashboard",children:"Dashboard"}),(0,r.jsx)(c(),{href:"/releases",children:"Releases"}),(0,r.jsx)(c(),{href:"/videos",children:"Videos"}),(0,r.jsx)(c(),{href:"/faqs",children:"Faqs"}),(0,r.jsx)(c(),{href:"/provas",children:"Provas"}),(0,r.jsxs)(c(),{href:"/meucadastro",className:o().usuario,children:[(0,r.jsx)(d.A,{size:40,color:"#FFF"}),(0,r.jsx)("p",{children:"Usuario"})]}),(0,r.jsx)("form",{action:a,children:(0,r.jsx)("button",{type:"submit",children:(0,r.jsx)(u.A,{size:24,color:"#FFF"})})})]})]})})}},9999:(e,a,s)=>{"use strict";s.d(a,{F:()=>r});let r=s(2651).A.create({baseURL:"http://localhost:3333"})},9557:(e,a,s)=>{"use strict";s.d(a,{w:()=>o});var r=s(9999),t=s(2781);let o=async(e,a)=>{try{let s=await (0,t.K)();return(await r.F.get(e,{headers:{Authorization:"Bearer ".concat(s)},params:a})).data||[]}catch(a){console.log("Erro ao buscar dados de ".concat(e))}}},1661:(e,a,s)=>{"use strict";s.d(a,{w:()=>o});var r=s(9999),t=s(2781);let o=async(e,a)=>{try{let s=await (0,t.K)();if(!confirm("Deseja trocar o status?"))return;return(await r.F.put(e,a,{headers:{Authorization:"Bearer ".concat(s)}})).data||[]}catch(a){console.error("Erro ao buscar dados de ".concat(e,":"),a)}}},7232:e=>{e.exports={headerContainer:"styles_headerContainer___8Jus",headerConteudo:"styles_headerConteudo__NQud8",headerNav:"styles_headerNav__QUYkC",icon:"styles_icon__baXze",usuario:"styles_usuario__ah6Zz",showMenu:"styles_showMenu__G94ci"}},7068:e=>{e.exports={conteinerCentral:"page_conteinerCentral__r1q6E",login:"page_login__YmZVk",toplogin:"page_toplogin__zbRb4",dados:"page_dados__LeY4T",titulo:"page_titulo__NKczC",barraFuncoes:"page_barraFuncoes__rUg_q",btn:"page_btn__8GLw4",incluir:"page_incluir__DOXQl",imprimir:"page_imprimir__XzUdY",alterar:"page_alterar__SwjnZ",excluir:"page_excluir__alK_Y",inputPesquisa:"page_inputPesquisa__sG2Ml",inputPesquisaSelect:"page_inputPesquisaSelect__BuAEd",inputPesquisaSelectForm:"page_inputPesquisaSelectForm___Krpu",listaSistemas:"page_listaSistemas__2h3EM",grid:"page_grid__umSuY",conteudoHtml:"page_conteudoHtml__EGFUX",gridCadastros:"page_gridCadastros__CK6f9",checks:"page_checks__sebGV",cabecalhoFormCadastro:"page_cabecalhoFormCadastro__6OLUP",formCadastro:"page_formCadastro__N1CA6",error:"page_error__err8O",acoes:"page_acoes__wpQgV"}},2781:(e,a,s)=>{"use strict";s.d(a,{K:()=>t});var r=s(5828);let t=(0,r.createServerReference)("00d00ed9f317bf5a63a04960412dba5b4ac6277463",r.callServer,void 0,r.findSourceMapURL,"getCookieServer")},7440:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>r});let r={src:"/_next/static/media/Logo.aabca874.png",height:60,width:318,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAMAAABSSm3fAAAAG1BMVEXX4+nJ3OTe6u/S1eHB1NzAxNOmtbbT0M3P3+bJF8ieAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGklEQVR4nGNgYGJgYmBmZmdgYWRhZGRlZQMAAUAALd68s1MAAAAASUVORK5CYII=",blurWidth:8,blurHeight:2}}},e=>{var a=a=>e(e.s=a);e.O(0,[4226,7970,4135,4572,8441,1517,7358],()=>a(4641)),_N_E=e.O()}]);