(function(e){function t(t){for(var r,s,a=t[0],u=t[1],c=t[2],d=0,m=[];d<a.length;d++)s=a[d],i[s]&&m.push(i[s][0]),i[s]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);l&&l(t);while(m.length)m.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var u=n[a];0!==i[u]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},i={app:0},o=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],u=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var l=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"0c5f":function(e,t,n){},2245:function(e,t,n){},"23f2":function(e,t,n){},3755:function(e,t,n){"use strict";var r=n("0c5f"),i=n.n(r);i.a},"3d14":function(e,t,n){"use strict";var r=n("2245"),i=n.n(r);i.a},"3ffc":function(e,t,n){"use strict";var r=n("cf3c"),i=n.n(r);i.a},4758:function(e,t,n){"use strict";var r=n("23f2"),i=n.n(r);i.a},"5ed9":function(e,t,n){"use strict";var r=n("704e"),i=n.n(r);i.a},"691e":function(e,t,n){"use strict";var r=n("7690"),i=n.n(r);i.a},"704e":function(e,t,n){},7690:function(e,t,n){},"99b7":function(e,t,n){"use strict";var r=n("a4e7"),i=n.n(r);i.a},a4e7:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mdl-layout mdl-js-layout mdl-layout--fixed-header has-drawer is-upgraded is-small-screen",attrs:{id:"app"}},[n("Header"),n("Drawer"),n("div",{staticClass:"main-editor-container mdl-layout__content"},[n("router-view")],1),e.isModalOpen?n("Modal"):e._e()],1)},o=[],s=n("9ab4"),a=n("2f62"),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",{class:["show"===e.view_mode.mode?"hovershow":"","mdl-layout__header"]},[e._m(0),n("div",{staticClass:"mdl-layout__header-row"},[n("span",{staticClass:"mdl-layout-title"},[e._v("SlideCloud")]),n("div",{staticClass:"mdl-layout-spacer"}),n("button",{staticClass:"mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect",on:{click:function(t){return e.toggleVuewMode()}}},[n("i",{staticClass:"material-icons"},[e._v(e._s("show"==e.view_mode.mode?"fullscreen_exit":"fullscreen"))])]),e._m(1),e.user?n("ul",{staticClass:"mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect",attrs:{for:"more-button"}},[n("li",{staticClass:"mdl-menu__item"},[e._v(e._s(e.user.name))]),n("li",{staticClass:"mdl-menu__item",on:{click:function(t){return e.signout()}}},[e._v("Sign Out")])]):n("ul",{staticClass:"mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect",attrs:{for:"more-button"}},[n("li",{staticClass:"mdl-menu__item",on:{click:function(t){return e.openSignupModal()}}},[e._v("Sign Up")]),n("li",{staticClass:"mdl-menu__item",on:{click:function(t){return e.openSigninModal()}}},[e._v("Sign In")])])])])},c=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mdl-layout__drawer-button"},[n("i",{staticClass:"material-icons"},[e._v("dehaze")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect",attrs:{id:"more-button"}},[n("i",{staticClass:"material-icons"},[e._v("more_vert")])])}],l="OPEN_SIGNUP_ MODAL",d="OPEN_SIGNIN_MODAL",m="SIGN_UP",p="SIGN_IN",f="SIGN_OUT",v="CHANGE_VIEW_MODE",h="TOGGLE_VIEW_MODE",w="CHANGE_EDITOR_CONTENT",_="CHANGE_SLIDE_NUMBER",g=r["a"].extend({name:"Header",computed:s["a"]({},Object(a["e"])(["user","view_mode"])),methods:s["a"]({},Object(a["d"])({toggleVuewMode:h}),Object(a["b"])({openSigninModal:d,openSignupModal:l,signout:f}))}),b=g,S=(n("5ed9"),n("2877")),E=Object(S["a"])(b,u,c,!1,null,"1591e8e2",null),y=E.exports,j=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},C=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mdl-layout__drawer"},[n("span",{staticClass:"mdl-layout-title"},[e._v("SlideCloud")])])}],O=r["a"].extend({name:"Drawer"}),M=O,x=Object(S["a"])(M,j,C,!1,null,null,null),k=x.exports,N=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modal",on:{click:function(t){return t.target!==t.currentTarget?null:e.closeModal()}}},[n("div",{staticClass:"content"},["signup"===e.modalType?n("SignupForm"):"signin"===e.modalType?n("SigninForm"):e._e()],1)])},P=[],T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.hasSignupError?n("p",{staticClass:"error-message"},[e._v("Failed to regiser")]):e._e(),n("div",{staticClass:"row"},[e._v("\n    username\n    "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"input",attrs:{type:"text"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})]),n("div",{staticClass:"row"},[e._v("\n    password\n    "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"input",attrs:{type:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),n("button",{staticClass:"button",on:{click:function(t){return t.preventDefault(),e.postSignup()}}},[e._v("register")])])},$=[],I=r["a"].extend({name:"SignupForm",data:function(){return{username:"",password:""}},computed:s["a"]({},Object(a["e"])(["hasSignupError"])),methods:s["a"]({},Object(a["b"])({signup:m}),Object(a["d"])(["hideSignupError"]),{postSignup:function(){return s["b"](this,void 0,void 0,function(){var e;return s["c"](this,function(t){return e={username:this.username,password:this.password},this.signup(e),[2]})})}}),watch:{username:function(){this.hideSignupError()},password:function(){this.hideSignupError()}}}),R=I,D=(n("691e"),Object(S["a"])(R,T,$,!1,null,"70196996",null)),A=D.exports,G=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.hasSigninError?n("p",{staticClass:"error-message"},[e._v("Failed to login")]):e._e(),n("div",{staticClass:"row"},[e._v("\n    username\n    "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"input",attrs:{type:"text",autofocus:"true"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})]),n("div",{staticClass:"row"},[e._v("\n    password\n    "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"input",attrs:{type:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),n("button",{staticClass:"button",on:{click:function(t){return t.preventDefault(),e.postSignin()}}},[e._v("Login")])])},U=[],L=r["a"].extend({name:"SigninForm",data:function(){return{username:"",password:""}},computed:s["a"]({},Object(a["e"])(["hasSigninError"])),methods:s["a"]({},Object(a["b"])({signin:p}),Object(a["d"])(["closeModal","showSigninError","hideSigninError"]),{postSignin:function(){return s["b"](this,void 0,void 0,function(){var e;return s["c"](this,function(t){switch(t.label){case 0:return e={username:this.username,password:this.password},[4,this.signin(e)];case 1:return t.sent(),[2]}})})}}),watch:{username:function(){this.hideSigninError()},password:function(){this.hideSigninError()}}}),H=L,F=(n("4758"),Object(S["a"])(H,G,U,!1,null,"25aebbe7",null)),V=F.exports,W=r["a"].extend({name:"Modal",components:{SignupForm:A,SigninForm:V},computed:s["a"]({},Object(a["e"])(["modalType"])),methods:s["a"]({},Object(a["d"])(["closeModal"]))}),z=W,J=(n("3ffc"),Object(S["a"])(z,N,P,!1,null,"ebbab0f8",null)),q=J.exports,B=r["a"].extend({name:"App",components:{Header:y,Drawer:k,Modal:q},computed:s["a"]({},Object(a["e"])(["isModalOpen"]))}),K=B,X=Object(S["a"])(K,i,o,!1,null,null,null),Q=X.exports,Y=n("8c4f"),Z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mdl-grid"},[n("div",{staticClass:"mdl-cell"},[n("Editor",{attrs:{"editor-id":"main-editor"}})],1),n("div",{class:["edit"===e.view_mode.mode?"mdl-cell":"fullsize","mdl-cell"],on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"space",32,t.key,[" ","Spacebar"])?null:e.TOGGLE_VIEW_MODE()}}},[n("Preview")],1)])},ee=[],te=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"editor",attrs:{id:e.editorId}})},ne=[],re=n("061c"),ie=(n("c1a9"),n("62a2"),n("0f22"),r["a"].extend({name:"Editor",props:{editorId:String},data:function(){return{editor:re["edit"](document.createElement("div")),yamlSlideIncrement:0}},methods:s["a"]({},Object(a["d"])({changeEditorContent:w,changeSlideNumber:_})),mounted:function(){var e=this;this.editor=re["edit"](this.editorId),this.editor.getSession().setMode("ace/mode/markdown"),this.editor.setTheme("ace/theme/github"),this.editor.setKeyboardHandler("ace/keyboard/vim"),this.editor.getSession().on("change",function(){e.changeEditorContetn(e.editor.getValue())});var t=function(t){for(var n=e.editor.getValue().split("\n"),r="",i=0,o=0,s=0;s<=t;s++)"---"===r.substring(0,3)?(i+=1,o=0):"==="===r.substring(0,3)&&(o+=1),r=n[s];return{h:i+e.yamlSlideIncrement,v:o}};this.editor.getSession().selection.on("changeCursor",function(n){var r=e.editor.getCursorPosition().row,i=t(r);e.changeSlideNumber(i)})}})),oe=ie,se=(n("99b7"),Object(S["a"])(oe,te,ne,!1,null,"7d4c55b4",null)),ae=se.exports,ue=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},ce=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"reveal"},[n("div",{staticClass:"slides"})])}];window.Reveal=window.Reveal||{},window.RevealMarkdown=window.RevealMarkdown||{};var le=r["a"].extend({name:"Preview",data:function(){return{is_script_loading:!1}},computed:s["a"]({},Object(a["c"])(["editor_content","slide_number","view_mode"])),created:function(){var e=this;this.$root.$on("loading_script",function(t){e.is_script_loading=!0})},mounted:function(){var e=this;e.setContent(this.editor_content),e.$store.watch(function(){return e.editor_content},function(){e.setContent(e.editor_content),e.updateSlides()}),e.$store.watch(function(){return e.slide_number},function(){return window.Reveal.slide(e.slide_number.h,e.slide_number.v)}),e.$store.watch(function(){return e.view_mode.mode},function(){return window.Reveal.sync()}),window.Reveal.initialize({width:1280,height:800,controls:!0,progress:!0,history:!0,mouseWheel:!0,center:!0,overview:!0,previewLinks:!0,slideNumber:"c/t",transition:"none",math:{mathjax:"https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js",config:"TeX-AMS_HTML-full"},dependencies:[{src:"reveal.js/plugin/markdown/marked.js",condition:function(){return!!document.querySelector("[data-markdown]")}},{src:"reveal.js/plugin/markdown/markdown.js",condition:function(){return!!document.querySelector("[data-markdown]")}},{src:"reveal.js/plugin/highlight/highlight.js",async:!0},{src:"reveal.js/plugin/notes/notes.js",async:!0},{src:"reveal.js/plugin/math/math.js",async:!0}]})},methods:{setContent:function(e){var t=document.createElement("script");t.setAttribute("type","text/template"),t.textContent=e;var n=document.createElement("section");n.setAttribute("data-markdown",""),n.setAttribute("data-separator","^---"),n.setAttribute("data-separator-vertical","^==="),n.setAttribute("data-separator-notes","^Note:"),n.appendChild(t);var r=document.getElementsByClassName("slides")[0];r&&(r.textContent=null,r.appendChild(n))},updateSlides:function(){window.RevealMarkdown.init().then(function(){window.Reveal.toggleOverview(),window.Reveal.toggleOverview(),window.Reveal.sync()})}}}),de=le,me=(n("3755"),Object(S["a"])(de,ue,ce,!1,null,"dd05da48",null)),pe=me.exports,fe=r["a"].extend({name:"edit",computed:s["a"]({},Object(a["c"])(["view_mode"])),methods:s["a"]({},Object(a["d"])([h])),components:{Header:y,Drawer:k,Editor:ae,Preview:pe}}),ve=fe,he=(n("3d14"),Object(S["a"])(ve,Z,ee,!1,null,"1db67799",null)),we=he.exports;r["a"].use(Y["a"]);var _e,ge,be=new Y["a"]({routes:[{path:"*",name:"edit",component:we}]}),Se=n("bc3a"),Ee=n.n(Se);r["a"].use(a["a"]);var ye=new a["a"].Store({state:{user:null,hasSigninError:!1,hasSignupError:!1,isModalOpen:!1,modalType:"signup",editor_content:"# Hello, world.",slide_number:{h:0,v:0},view_mode:{mode:"edit"}},mutations:(_e={openModal:function(e){e.isModalOpen=!0},closeModal:function(e){e.isModalOpen=!1},setModalType:function(e,t){e.modalType=t},showSigninError:function(e){e.hasSigninError=!0},hideSigninError:function(e){e.hasSigninError=!1},showSignupError:function(e){e.hasSignupError=!0},hideSignupError:function(e){e.hasSignupError=!1},setUser:function(e,t){e.user=t},unsetUser:function(e){e.user=null}},_e[w]=function(e,t){e.editor_content=t},_e[_]=function(e,t){e.slide_number=t},_e[v]=function(e,t){e.view_mode=t},_e[h]=function(e){e.view_mode.mode="edit"===e.view_mode.mode?"show":"edit"},_e),actions:(ge={},ge[l]=function(e){var t=e.commit;t("setModalType","signup"),t("openModal")},ge[d]=function(e){var t=e.commit;t("setModalType","signin"),t("openModal")},ge[m]=function(e,t){var n=e.commit;return s["b"](this,void 0,void 0,function(){var e,r,i;return s["c"](this,function(o){switch(o.label){case 0:e=new URLSearchParams,e.append("name",t.username),e.append("password",t.password),o.label=1;case 1:return o.trys.push([1,5,,6]),[4,Ee.a.post("http://localhost/api/signup",e)];case 2:return r=o.sent(),200!==r.status?[3,4]:[4,this.dispatch(p,t)];case 3:o.sent(),o.label=4;case 4:return[3,6];case 5:throw i=o.sent(),n("showSignupError"),i;case 6:return[2]}})})},ge[p]=function(e,t){var n=e.commit;return s["b"](this,void 0,void 0,function(){var e,r,i;return s["c"](this,function(o){switch(o.label){case 0:e=new URLSearchParams,e.append("name",t.username),e.append("password",t.password),o.label=1;case 1:return o.trys.push([1,3,,4]),[4,Ee.a.post("http://localhost/api/signin",e)];case 2:return r=o.sent(),200===r.status&&(n("setUser",r.data),n("closeModal")),[3,4];case 3:throw i=o.sent(),n("showSigninError"),i;case 4:return[2]}})})},ge[f]=function(e){var t=e.commit;return s["b"](this,void 0,void 0,function(){var e,n,r;return s["c"](this,function(i){switch(i.label){case 0:e=new URLSearchParams,i.label=1;case 1:return i.trys.push([1,3,,4]),[4,Ee.a.post("http://localhost/api/signout",e)];case 2:return n=i.sent(),200===n.status&&t("unsetUser"),[3,4];case 3:throw r=i.sent(),r;case 4:return[2]}})})},ge),getters:{editor_content:function(e){return e.editor_content},slide_number:function(e){return e.slide_number},view_mode:function(e){return e.view_mode}}});r["a"].config.productionTip=!1,new r["a"]({router:be,store:ye,render:function(e){return e(Q)}}).$mount("#app")},cf3c:function(e,t,n){}});
//# sourceMappingURL=app.6190d107.js.map