(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3739],{676:(e,a,s)=>{Promise.resolve().then(s.bind(s,9380))},9380:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>d});var r=s(5155),t=s(7068),l=s.n(t),i=s(5985),o=s(2115),c=s(9557),n=s(6046);function d(){let[e,a]=(0,o.useState)(null),[s,t]=(0,o.useState)(""),[d,u]=(0,o.useState)("true"),[h,_]=(0,o.useState)([]);(0,n.useRouter)();let p=async()=>{let e=await (0,c.w)("/listaraula",{status:"true"===d||"false"!==d&&void 0,nome_aula:s});e?_(e):alert("Erro ao receber Lista de aulas do servi\xe7o ")};(0,o.useEffect)(()=>{p()},[]);let m=()=>{};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.Header,{}),(0,r.jsxs)("main",{className:l().dados,children:[(0,r.jsx)("div",{className:l().titulo,children:(0,r.jsx)("h1",{children:"Aulas"})}),(0,r.jsx)("div",{className:l().barraFuncoes,children:(0,r.jsx)("form",{onSubmit:e=>{e.preventDefault(),p()},children:(0,r.jsxs)("div",{children:[(0,r.jsxs)("select",{className:l().inputPesquisaSelect,value:d,onChange:e=>u(e.target.value),children:[(0,r.jsx)("option",{value:"true",children:"Ativo"}),(0,r.jsx)("option",{value:"false",children:"Inativo"})]}),(0,r.jsx)("input",{type:"text",placeholder:"Pesquisar Aulas",className:l().inputPesquisa,value:s,onChange:e=>t(e.target.value)}),(0,r.jsx)("button",{type:"submit",className:l().btn,children:"Buscar"}),(0,r.jsx)("button",{className:"".concat(l().btn," ").concat(l().imprimir),onClick:()=>window.print(),children:"Imprimir"})]})})}),(0,r.jsx)("section",{className:l().grid,children:(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{scope:"col",children:"ID"}),(0,r.jsx)("th",{scope:"col",children:"Aula"}),(0,r.jsx)("th",{scope:"col",children:"Sistema"}),(0,r.jsx)("th",{scope:"col",children:"Modulo"}),(0,r.jsx)("th",{scope:"col",children:"Submodulo"}),(0,r.jsx)("th",{scope:"col",className:"acoes",children:"A\xe7\xf5es"})]})}),(0,r.jsx)("tbody",{children:h.map(e=>(0,r.jsxs)("tr",{className:l().griditens,children:[(0,r.jsx)("td",{"data-label":"ID",children:e.id_aula}),(0,r.jsx)("td",{"data-label":"Aula",children:e.nome_aula}),(0,r.jsx)("td",{"data-label":"Sistema",children:e.nome_sistema}),(0,r.jsx)("td",{"data-label":"Modulo",children:e.nome_modulo}),(0,r.jsx)("td",{"data-label":"Submodulo",children:e.nome_submodulo}),(0,r.jsx)("td",{children:(0,r.jsx)("button",{className:"".concat(l().btn," ").concat(l().alterar),onClick:()=>m,children:"Visualizar"})})]},e.id_aula))})]})})]})]})}},5985:(e,a,s)=>{"use strict";s.d(a,{Header:()=>m});var r=s(5155),t=s(7232),l=s.n(t),i=s(8173),o=s.n(i),c=s(5565),n=s(7440),d=s(3250),u=s(5236),h=s(3030),_=s(6046),p=s(2115);function m(){let e=(0,_.useRouter)();async function a(){(0,h.deleteCookie)("sessaoEad",{path:"/"}),e.replace("/")}let s=(0,p.useRef)(null);return(0,r.jsx)("header",{className:l().headerContainer,children:(0,r.jsxs)("div",{className:l().headerConteudo,children:[(0,r.jsx)(o(),{href:"/dashboard",children:(0,r.jsx)(c.default,{alt:"Logo Gestores Ead",src:n.default,width:200,height:50,priority:!0,style:{borderRadius:"4px"}})}),(0,r.jsx)("div",{className:l().icon,onClick:function(){s.current?s.current.classList.toggle(l().showMenu):console.error("Ref n\xe3o encontrou o elemento!")},children:"☰"}),(0,r.jsxs)("nav",{ref:s,className:l().headerNav,children:[(0,r.jsx)(o(),{href:"/dashboard",children:"Dashboard"}),(0,r.jsx)(o(),{href:"/releases",children:"Releases"}),(0,r.jsx)(o(),{href:"/videos",children:"Videos"}),(0,r.jsx)(o(),{href:"/faqs",children:"Faqs"}),(0,r.jsx)(o(),{href:"/provas",children:"Provas"}),(0,r.jsxs)(o(),{href:"/meucadastro",className:l().usuario,children:[(0,r.jsx)(d.A,{size:40,color:"#FFF"}),(0,r.jsx)("p",{children:"Usuario"})]}),(0,r.jsx)("form",{action:a,children:(0,r.jsx)("button",{type:"submit",children:(0,r.jsx)(u.A,{size:24,color:"#FFF"})})})]})]})})}},9999:(e,a,s)=>{"use strict";s.d(a,{F:()=>r});let r=s(2651).A.create({baseURL:"http://localhost:3333"})},9557:(e,a,s)=>{"use strict";s.d(a,{w:()=>l});var r=s(9999),t=s(2781);let l=async(e,a)=>{try{let s=await (0,t.K)();return(await r.F.get(e,{headers:{Authorization:"Bearer ".concat(s)},params:a})).data||[]}catch(a){console.log("Erro ao buscar dados de ".concat(e))}}},7232:e=>{e.exports={headerContainer:"styles_headerContainer___8Jus",headerConteudo:"styles_headerConteudo__NQud8",headerNav:"styles_headerNav__QUYkC",icon:"styles_icon__baXze",usuario:"styles_usuario__ah6Zz",showMenu:"styles_showMenu__G94ci"}},7068:e=>{e.exports={conteinerCentral:"page_conteinerCentral__r1q6E",login:"page_login__YmZVk",toplogin:"page_toplogin__zbRb4",dados:"page_dados__LeY4T",titulo:"page_titulo__NKczC",barraFuncoes:"page_barraFuncoes__rUg_q",btn:"page_btn__8GLw4",incluir:"page_incluir__DOXQl",imprimir:"page_imprimir__XzUdY",alterar:"page_alterar__SwjnZ",excluir:"page_excluir__alK_Y",inputPesquisa:"page_inputPesquisa__sG2Ml",inputPesquisaSelect:"page_inputPesquisaSelect__BuAEd",inputPesquisaSelectForm:"page_inputPesquisaSelectForm___Krpu",listaSistemas:"page_listaSistemas__2h3EM",grid:"page_grid__umSuY",conteudoHtml:"page_conteudoHtml__EGFUX",gridCadastros:"page_gridCadastros__CK6f9",checks:"page_checks__sebGV",cabecalhoFormCadastro:"page_cabecalhoFormCadastro__6OLUP",formCadastro:"page_formCadastro__N1CA6",error:"page_error__err8O",acoes:"page_acoes__wpQgV"}},2781:(e,a,s)=>{"use strict";s.d(a,{K:()=>t});var r=s(5828);let t=(0,r.createServerReference)("00d00ed9f317bf5a63a04960412dba5b4ac6277463",r.callServer,void 0,r.findSourceMapURL,"getCookieServer")},7440:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>r});let r={src:"/_next/static/media/Logo.aabca874.png",height:60,width:318,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAMAAABSSm3fAAAAG1BMVEXX4+nJ3OTe6u/S1eHB1NzAxNOmtbbT0M3P3+bJF8ieAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGklEQVR4nGNgYGJgYmBmZmdgYWRhZGRlZQMAAUAALd68s1MAAAAASUVORK5CYII=",blurWidth:8,blurHeight:2}}},e=>{var a=a=>e(e.s=a);e.O(0,[4226,7970,4135,4572,8441,1517,7358],()=>a(676)),_N_E=e.O()}]);