(this["webpackJsonpinput-prank"]=this["webpackJsonpinput-prank"]||[]).push([[0],{24:function(e){e.exports=JSON.parse('["asdf","password1","password123","SuPeRpAsSwOrD","qwerty","1p2a3s4s5w6o7r8d","username","9999","My First Password","admin"]')},27:function(e,t,n){e.exports=n(43)},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(21),u=n.n(l),s=(n(32),n(8)),c=n(1),o=(n(33),n(13)),m=n(14),i=n(26),p=n(25),d=function(e){Object(i.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={hasError:!1},a}return Object(m.a)(n,[{key:"componentDidCatch",value:function(e,t){}},{key:"render",value:function(){return this.state.hasError?a.createElement("h1",null,"Something went wrong."):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}]),n}(a.Component),h=n(6),E=n(18),g=n(5),f={user:null,users:[],signupAttempts:0,loginAttempts:0,usedNames:[]},v=function(e,t){switch(t.type){case"DROP_TABLES":return f;case"SIGNUP":return Object(g.a)(Object(g.a)({},e),{},{users:[].concat(Object(E.a)(e.users),[t.payload])});case"LOGIN":return Object(g.a)(Object(g.a)({},e),{},{user:t.payload});case"LOGOUT":return Object(g.a)(Object(g.a)({},e),{},{user:null});case"SIGNUP_ATTEMPT":return Object(g.a)(Object(g.a)({},e),{},{signupAttempts:e.signupAttempts+1});case"LOGIN_ATTEMPT":return Object(g.a)(Object(g.a)({},e),{},{loginAttempts:e.loginAttempts+1});case"USERNAME_USED":return Object(g.a)(Object(g.a)({},e),{},{usedNames:[].concat(Object(E.a)(e.usedNames),[t.payload])})}},b=a.createContext((function(){})),w=a.createContext(f);function y(e){var t=e.children,n=a.useReducer(v,f),r=Object(h.a)(n,2),l=r[0],u=r[1];return a.createElement(a.Fragment,null,a.createElement(b.Provider,{value:u},a.createElement(w.Provider,{value:l},t)))}n(34);var O=[{path:"/",name:"Home",exact:!0},{path:"/signup",name:"Sign up",exact:!0}],j=function(e){var t=e.path,n=e.name,r=e.exact,l=e.image;return a.createElement(s.b,{className:"menu-link",activeClassName:"menu-link-active",to:t,exact:r},l?a.createElement("img",{src:l,alt:n}):n)};function N(e){var t=e.item,n=e.menuChildren,r=a.useState(!1),l=Object(h.a)(r,2),u=l[0],s=l[1];return a.createElement(a.Fragment,null,a.createElement("span",{key:t.name,className:"menu-item menu-item-".concat(t.name),onMouseEnter:function(){s(!0)},onMouseLeave:function(){s(!1)}},a.createElement("div",{className:"menu-parent"},a.createElement(j,{path:t.path,name:t.name,exact:t.exact,image:t.image})),u&&n?a.createElement("div",{className:"menu-children"},a.createElement("ul",null,n.map((function(e){return a.createElement("li",{key:e.path,className:"menu-child ".concat(u?"menu-child-active":"")},a.createElement(j,{path:e.path,name:e.name,exact:e.exact,image:e.image}))})))):null))}function S(){var e=a.useContext(w),t=a.useContext(b),n=Object(c.f)();return a.createElement(a.Fragment,null,a.createElement("div",{className:"menu"},O.map((function(e){return a.createElement(N,{key:e.path,item:e,menuChildren:e.children})}))),e.user?a.createElement("span",{className:"logout menu-item"},a.createElement("header",null,e.user.username),a.createElement("button",{onClick:function(){t({type:"LOGOUT"}),n.push("/")}},"Logout")):null)}var T=function(){function e(t,n){Object(o.a)(this,e),this.id=void 0,this.username=void 0,this.password=void 0,this.id=++e.count,this.username=t,this.password=n}return Object(m.a)(e,null,[{key:"isPasswordvalid",value:function(e){return e.length>=5}},{key:"isUsernameValid",value:function(e){return e.length>=4}}]),e}();function k(){var e=["The goose got loose","Hackers are in the mainframe","The system is busy","Rebels are infiltrating the Death Star","There was an unknown error","Try again","Low system power","Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn"];return e[Math.floor(Math.random()*e.length)]}T.count=0;n(40);function x(){var e=a.useContext(w),t=a.useContext(b),n=a.useState(""),r=Object(h.a)(n,2),l=r[0],u=r[1],s=a.useState(""),c=Object(h.a)(s,2),o=c[0],m=c[1],i=a.useState(""),p=Object(h.a)(i,2),d=p[0],E=p[1],g=function(e){E(""),"username"===e.currentTarget.name?u(e.currentTarget.value):"password"===e.currentTarget.name&&m(e.currentTarget.value)};return a.createElement(a.Fragment,null,a.createElement("form",{id:"login",onSubmit:function(n){return n.preventDefault(),t({type:"LOGIN_ATTEMPT"}),e.users.find((function(e){return e.username===l&&e.password===o}))?!e.loginAttempts||Math.random()<.6?(u(""),m(""),void E(k())):Math.random()<.1?(t({type:"DROP_TABLES"}),u(""),m(""),void E("DROP TABLE Users\nQuery completed.")):void t({type:"LOGIN",payload:new T(l,o)}):(u(""),m(""),void E("Incorrect username or password"))}},a.createElement("label",{htmlFor:"username"},"username"),a.createElement("input",{type:"text",name:"username",id:"username",placeholder:"username",value:l,onChange:g,autoFocus:!0}),a.createElement("label",{htmlFor:"password"},"password"),a.createElement("input",{type:"password",name:"password",id:"password",placeholder:"password",value:o,onChange:g}),a.createElement("button",{type:"submit"},"Log in"),a.createElement("div",{className:"errormessage"},d)))}function C(){var e=a.useContext(w),t=e.user?a.createElement("span",null,"You made it! Now, what could the reward be?"):a.createElement("span",null,"Something valuable is hidden here, ",a.createElement("br",null),"but the system is not cooperative\u2026");return a.createElement(a.Fragment,null,a.createElement("h1",null,"The Log In Challenge"),a.createElement(x,null),a.createElement("h4",{className:"home-message"},t),e.user?a.createElement("div",{id:"reward"},a.createElement(s.b,{to:"/secret"},a.createElement("button",null,"Continue!"))):null)}n(41);function A(){var e=a.useContext(w);return e.user?a.createElement(a.Fragment,null,a.createElement("div",{className:"secret-greetings"},a.createElement("h3",null,"You made it!"),a.createElement("p",null,"You tried ",e.signupAttempts," times to sign up and"," ",e.loginAttempts," times to log in")),a.createElement("div",{className:"video-wrapper"},a.createElement("div",{className:"youtube-embed"},a.createElement("iframe",{src:"https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",frameBorder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,title:"Rickroll"})))):a.createElement(a.Fragment,null,a.createElement("div",null,a.createElement("h1",null,"You are not supposed to be here\u2026")))}var P=n(23),F=n(24);n(42);function M(){var e=a.useContext(w),t=a.useContext(b),n=Object(c.f)(),r=a.useRef(null),l=a.useState(""),u=Object(h.a)(l,2),s=u[0],o=u[1],m=a.useState(""),i=Object(h.a)(m,2),p=i[0],d=i[1],E=a.useState(""),g=Object(h.a)(E,2),f=g[0],v=g[1];a.useEffect((function(){if(s.length>3&&Math.random()<.3){for(var e=s.split(""),t=0;t<2;++t)e.splice(Math.floor(Math.random()*e.length),1);o(e.join(""))}}),[s]),a.useEffect((function(){r.current&&0===s.length&&(r.current.children[0].value="")}),[s]);var y=function(e){if(v(""),"username"===e.currentTarget.name){var t=function(e){var t,n="",a=Object(P.a)(e);try{for(a.s();!(t=a.n()).done;){n+=t.value.value}}catch(r){a.e(r)}finally{a.f()}return n}(Array.from(r.current.children));o(t),T.isUsernameValid(t)||v("username is too short")}else"password"===e.currentTarget.name&&(T.isPasswordvalid(e.currentTarget.value)||v("password is too short"),d(e.currentTarget.value))};return a.createElement(a.Fragment,null,a.createElement("form",{id:"signup",onSubmit:function(a){if(a.preventDefault(),t({type:"SIGNUP_ATTEMPT"}),T.isUsernameValid(s)&&T.isPasswordvalid(p))if(e.users.find((function(e){return e.username===s}))||e.usedNames.find((function(e){return e===s})))v("username taken");else{if(t({type:"USERNAME_USED",payload:s}),!e.signupAttempts||Math.random()<.3)return o(""),d(""),void v(k());t({type:"SIGNUP",payload:new T(s,p)}),n.push("/")}else v("username or password invalid")}},a.createElement("label",{htmlFor:"username"},"username"),a.createElement("div",{className:"signup-username",ref:r},function(e){for(var t=[],n=0;n<e;n++){var r=a.createElement("input",{key:n,className:s.length>=1?"generated-input":void 0,type:"text",name:"username",placeholder:s.length<1?"username":void 0,onChange:y,maxLength:1});t.push(r)}return t}(s.length+1)),a.createElement("label",{htmlFor:"password"},"password"),a.createElement("select",{name:"password",id:"password",placeholder:"password",value:p,onChange:y},a.createElement("option",{value:""}),F.map((function(e){return a.createElement("option",{key:e,value:e},e)}))),a.createElement("button",{type:"submit"},"Signup"),a.createElement("div",null,f)))}function L(){return a.createElement(a.Fragment,null,a.createElement("h2",null,"Sign up"),a.createElement(M,null))}var U=function(){return a.createElement(a.Fragment,null,a.createElement(d,null,a.createElement(y,null,a.createElement(s.a,{basename:"/input-prank"},a.createElement("nav",null,a.createElement(S,null)),a.createElement("main",null,a.createElement(c.c,null,a.createElement(c.a,{exact:!0,path:"/"},a.createElement(C,null)),a.createElement(c.a,{path:"/signup"},a.createElement(L,null)),a.createElement(c.a,{path:"/secret"},a.createElement(A,null))))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[27,1,2]]]);
//# sourceMappingURL=main.604094e5.chunk.js.map