(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{119:function(e,t,n){},126:function(e,t,n){"use strict";(function(e){var c=n(2),a=n.n(c),r=n(5),s=n(7),i=n(1),l=n(85),o=n(20),u=n.n(o),j=n(24),b=n(13),d=n(69),O=n(26),h=(n(218),n(54),n(31)),p=n(25),m=n(30),x=n(22),f=n(17),g=n(88),v=n.n(g),y=n(3),N=Uint8Array.from(e.from("I agree with Terms & Services of CookiMania.")),w=new b.a(Object(b.g)("devnet"),"confirmed"),S=new b.d("68a5pCnjnshTw3JXmht5j9rCJH9e9mzmguwQE8LighJX");t.a=function(){var e=Object(l.b)(),t=Object(i.useState)(!1),n=Object(s.a)(t,2),c=n[0],o=n[1],g=Object(i.useState)(!1),E=Object(s.a)(g,2),A=E[0],_=E[1],C=Object(i.useState)(!1),K=Object(s.a)(C,2),k=K[0],L=K[1],D=Object(i.useState)(0),T=Object(s.a)(D,2),B=T[0],P=T[1],M=Object(i.useState)("none"),G=Object(s.a)(M,2),U=G[0],R=G[1],F=Object(i.useState)(!1),I=Object(s.a)(F,2),W=I[0],H=I[1],Y=Object(i.useState)(0),z=Object(s.a)(Y,2),J=z[0],V=z[1],X=Object(i.useState)(0),q=Object(s.a)(X,2),Q=q[0],Z=q[1],$=Object(i.useState)("0"),ee=Object(s.a)($,2),te=ee[0],ne=ee[1],ce=Object(i.useState)("none"),ae=Object(s.a)(ce,2),re=ae[0],se=ae[1],ie=Object(i.useState)(0),le=Object(s.a)(ie,2),oe=le[0],ue=le[1],je=Object(i.useState)(null),be=Object(s.a)(je,2),de=be[0],Oe=be[1],he=Object(j.b)(),pe=Object(j.c)((function(e){return e.user})),me=Object(j.c)((function(e){return e.associatedKeypair})),xe=Object(j.c)((function(e){return e.sockets})),fe=function(){var t=Object(r.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return he({type:"LOAD_WALLET",payload:e}),he({type:"LOAD_USER",payload:n}),ge(),ve(n),t.abrupt("return",_(!0));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),ge=function(){var e=Object(r.a)(a.a.mark((function e(){var t,n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("/api/u/associatedKeypair");case 2:t=e.sent.data,n=b.b.fromSecretKey(Uint8Array.from(t.secretKey)),he({type:"LOAD_ASSOCIATED_KEYPAIR",payload:n});case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ve=function(e){xe&&xe.user&&(xe.user.emit("subscribeToProfile",e._id),xe.user.on("balanceChange",(function(e,t){he({type:"UPDATE_USER_BALANCE",payload:e}),console.log({amount:e,fromDeposit:t,depositModalOpen:k}),t&&R("validated")})))},ye=function(){var t=Object(r.a)(a.a.mark((function t(){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e&&e.publicKey&&B){t.next=2;break}return t.abrupt("return");case 2:if(!(B<.01*b.c)){t.next=4;break}return t.abrupt("return",f.b.error("Minimum deposit amount is 0.01"));case 4:return t.prev=4,n=(new b.f).add(b.e.transfer({fromPubkey:e.publicKey,toPubkey:S,lamports:B})),t.next=8,e.sendTransaction(n,w);case 8:console.log({transaction:n}),R("sent"),t.next=16;break;case 12:t.prev=12,t.t0=t.catch(4),f.b.error(t.t0.response.data.message.toString()),R("failed");case 16:case"end":return t.stop()}}),t,null,[[4,12]])})));return function(){return t.apply(this,arguments)}}(),Ne=function(){var t=Object(r.a)(a.a.mark((function t(){var n,c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e&&e.publicKey){t.next=2;break}return t.abrupt("return");case 2:return se("withdrawing"),t.next=5,w.getBalance(me.publicKey);case 5:return n=t.sent,(c=(new b.f).add(b.e.transfer({fromPubkey:me.publicKey,toPubkey:new b.d(pe.publicKey),lamports:n}))).feePayer=new b.d(pe.publicKey),t.next=10,e.sendTransaction(c,w,{signers:[me]});case 10:Z(n),se("withdrawn");case 12:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),we=function(){var t=Object(r.a)(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e&&e.publicKey&&J){t.next=2;break}return t.abrupt("return");case 2:if(!(J<.01*b.c)){t.next=4;break}return t.abrupt("return",f.b.error("Minimum withdraw is 0.01 SOLs"));case 4:if(!(J>pe.balance)){t.next=6;break}return t.abrupt("return",f.b.error("Balance needs to be higher than the withdraw amount"));case 6:return t.prev=6,se("withdrawing"),ue(J),t.next=11,u.a.post("/u/requestWithdraw",{amount:J});case 11:return t.next=13,new Promise((function(e){return setTimeout((function(){return e(1)}),1e3)}));case 13:Ne(),t.next=19;break;case 16:t.prev=16,t.t0=t.catch(6),f.b.error(t.t0.response.data.message.toString());case 19:case"end":return t.stop()}}),t,null,[[6,16]])})));return function(){return t.apply(this,arguments)}}(),Se=function(){var e=Object(r.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",w.getBalance(me.publicKey));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ee=function(){var e=Object(r.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Se();case 2:(t=e.sent)>.01?(ue(t),se("hasPending")):se("none"),H(!0);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(i.useEffect)((function(){(function(){var e=Object(r.a)(a.a.mark((function e(t){var n,r,s,i,l;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t&&t.signMessage&&t.publicKey&&!c){e.next=3;break}return e.abrupt("return");case 3:return o(!0),e.next=6,u.a.get("/api/auth/state");case 6:if(n=e.sent.data,r=n.authenticated,s=n.user,console.log({authenticated:r}),!r){e.next=18;break}if(s.publicKey!==t.publicKey.toBase58()){e.next=15;break}return e.next=14,fe(s);case 14:return e.abrupt("return");case 15:return console.log("PUBLIC KEYS ARE NOT THE SAME!"),e.next=18,u.a.get("/api/auth/logout");case 18:return i=t.publicKey.toBytes(),e.next=21,t.signMessage(N);case 21:return l=e.sent,e.next=24,u.a.post("/api/auth/login",{publicKey:Array.from(i),signedMessage:Array.from(l)});case 24:return s=e.sent.data,e.next=27,fe(s);case 27:e.next=33;break;case 29:e.prev=29,e.t0=e.catch(0),f.b.error(e.t0.response.data.message.toString()),console.log(e.t0);case 33:case"end":return e.stop()}}),e,null,[[0,29]])})));return function(t){return e.apply(this,arguments)}})()(e)}),[e]),Object(i.useEffect)((function(){pe&&(null!=de&&(console.log("Balance Update!",pe.balance-de),pe.balance-de>=0?ne("1"):ne("-1")),Oe(pe.balance))}),[null===pe||void 0===pe?void 0:pe.balance]),Object(y.jsxs)("div",{className:"Navbar",children:[Object(y.jsxs)("div",{className:"logo",children:[Object(y.jsx)(x.b,{to:"/",children:Object(y.jsx)("img",{src:"/logo.png"})}),Object(y.jsx)("h3",{className:"title",children:"solasphere"})]}),A&&(null===e||void 0===e?void 0:e.publicKey)?Object(y.jsxs)("div",{className:"user",children:[Object(y.jsxs)("div",{className:"balance",children:[Object(y.jsx)("img",{src:"/img/coins.png"}),Object(y.jsx)("h4",{"data-balancechanged":te,onAnimationEnd:function(){return ne("0")},className:"amount",children:Number(((null===pe||void 0===pe?void 0:pe.balance)/b.c).toFixed(5))})]}),Object(y.jsx)("button",{onClick:function(){L(!0),R("none")},className:"depositB",children:"Deposit"}),Object(y.jsx)("button",{onClick:function(){return Ee()},className:"withdrawB",children:"Withdraw"}),Object(y.jsxs)(x.b,{to:"/u/".concat(e.publicKey.toString()),className:"profile",children:[Object(y.jsx)(h.a,{src:Object(p.createAvatar)(m,{seed:e.publicKey.toString()})}),Object(y.jsx)("h4",{children:Object(O.a)(e.publicKey.toBase58())})]})]}):Object(y.jsx)(d.b,{}),Object(y.jsxs)("div",{className:"modal",style:{display:k?"flex":"none"},children:[Object(y.jsx)("div",{className:"container",children:Object(y.jsxs)("div",{className:"wrapper",children:[Object(y.jsx)("button",{className:"closeB",onClick:function(){return L(!1)},children:Object(y.jsx)("svg",{width:"14",height:"14",children:Object(y.jsx)("path",{d:"M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"})})}),Object(y.jsx)("div",{className:"logo",children:Object(y.jsx)("img",{alt:"logo",src:"/logo.png"})}),Object(y.jsx)("h1",{className:"title",children:"Deposit"}),"none"===U?Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("input",{type:"number",value:null===B?"":B/b.c,onChange:function(e){return function(e){if(!e)return P(null);console.log({input:e}),Number(e)>=0?P(Number(e)*b.c):P(0)}(e.target.value)}}),Object(y.jsx)("button",{className:"depositB",onClick:function(){return ye()},children:"Deposit"})]}):"sent"===U?Object(y.jsx)(y.Fragment,{children:Object(y.jsxs)("h3",{className:"status",children:["Validating ",Object(y.jsx)(v.a,{size:13,color:"#27244f"})]})}):"validated"===U?Object(y.jsx)("h3",{className:"status",children:"Succesfully validated"}):Object(y.jsx)("h3",{className:"status",children:"Failed"})]})}),Object(y.jsx)("div",{className:"overlay"})]}),Object(y.jsxs)("div",{className:"modal",style:{display:W?"flex":"none"},children:[Object(y.jsx)("div",{className:"container",children:Object(y.jsxs)("div",{className:"wrapper",children:[Object(y.jsx)("button",{className:"closeB",onClick:function(){return H(!1)},children:Object(y.jsx)("svg",{width:"14",height:"14",children:Object(y.jsx)("path",{d:"M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"})})}),Object(y.jsx)("div",{className:"logo",children:Object(y.jsx)("img",{alt:"logo",src:"/logo.png"})}),Object(y.jsx)("h1",{className:"title",children:"Withdraw"}),"none"===re?Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("input",{type:"number",value:null===J?"":J/b.c,onChange:function(e){return function(e){if(!e)return V(null);console.log({input:e}),Number(e)>=0?V(Number(e)*b.c):V(0)}(e.target.value)}}),Object(y.jsx)("button",{className:"depositB",onClick:function(){return we()},children:"Withdraw"})]}):"hasPending"===re||"withdrawing"===re?Object(y.jsxs)("div",{className:"pending",children:[Object(y.jsxs)("h2",{children:["Pending: ",oe/b.c," SOL"]}),Object(y.jsxs)("button",{className:"depositB",disabled:"withdrawing"===re,onClick:function(){return Ne()},children:[Object(y.jsx)("span",{className:"withdrawLabel",children:"Withdraw"})," ","withdrawing"===re?Object(y.jsx)(v.a,{size:13,color:"#27244f"}):null]})]}):"withdrawn"===re?Object(y.jsxs)("h2",{children:["Succesfully withdrawn ",Q?Q/b.c:null]}):Object(y.jsx)("h3",{className:"status",children:"Failed"})]})}),Object(y.jsx)("div",{className:"overlay"})]})]})}}).call(this,n(8).Buffer)},138:function(e,t,n){},139:function(e,t){},143:function(e,t){},156:function(e,t){},172:function(e,t){},173:function(e,t){},194:function(e,t,n){},218:function(e,t,n){},234:function(e,t,n){},235:function(e,t,n){},236:function(e,t,n){},237:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n(42),r=n.n(a),s=(n(138),n(249)),i=n(245),l=n(131),o=n(246),u=n(247),j=n(248),b=n(69),d=n(13),O=(n(192),n(72)),h=n(17),p=(n(193),n(194),n(126)),m=n(18),x=n(2),f=n.n(x),g=n(5),v=n(7),y=n(85),N=n(20),w=n.n(N),S=n(24),E=(n(119),n(63),n(54),n(11)),A=n(26),_=n(129),C=n(31),K=n(25),k=n(30),L=n(22),D=n(3);var T=function(e){var t,n,a,r=Object(c.useState)(),s=Object(v.a)(r,2),i=s[0],l=s[1],o=Object(y.b)(),u=[["spin1080","spin1440","spin1800","spin2160"],["spin900","spin1260","spin1620","spin1980"]],j=Object(c.useState)([]),b=Object(v.a)(j,2),O=(b[0],b[1],Object(S.b)()),p=Object(S.c)((function(e){return e.user}));Object(c.useEffect)((function(){l(e.game)}),[e.game]);var m=function(t){var n;i&&((null===(n=i.winner)||void 0===n?void 0:n._id)===p._id&&"revealed"===t&&O({type:"UPDATE_USER_BALANCE",payload:2*i.amount}),"revealed"===t&&setTimeout((function(){e.removeGame(i)}),2e3),l(Object(E.a)(Object(E.a)({},i),{},{status:t})))},x=function(){var e=Object(g.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o&&o.publicKey&&i){e.next=2;break}return e.abrupt("return");case 2:if(p._id!==i.creator._id){e.next=4;break}return e.abrupt("return",h.b.error("You can not join your game"));case 4:if(!(p.balance<i.amount)){e.next=6;break}return e.abrupt("return",h.b.error("Balance needs to be higher than the game bet"));case 6:return e.prev=6,e.next=9,w.a.post("/api/game/join",{gameId:i._id});case 9:h.b.success("Joined the game"),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(6),h.b.error(e.t0.response.data.message.toString());case 15:case"end":return e.stop()}}),e,null,[[6,12]])})));return function(){return e.apply(this,arguments)}}(),N=function(){var e=Object(g.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o&&o.publicKey&&i){e.next=2;break}return e.abrupt("return");case 2:if(i.creator._id===p._id){e.next=4;break}return e.abrupt("return",h.b.error("You can not cancel another person`s game"));case 4:return e.prev=4,e.next=7,w.a.post("/api/game/cancel",{gameId:i._id});case 7:h.b.success("Game has been cancelled"),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(4),h.b.error(e.t0.response.data.message.toString());case 13:case"end":return e.stop()}}),e,null,[[4,10]])})));return function(){return e.apply(this,arguments)}}();return Object(D.jsx)(D.Fragment,{children:i&&"ended"!==i.status?Object(D.jsxs)("div",{className:"gameWrapper",children:[i.creator._id===(null===p||void 0===p?void 0:p._id)&&"active"===i.status?Object(D.jsx)("button",{className:"closeB",onClick:function(){return N()},children:Object(D.jsx)("svg",{width:"14",height:"14",children:Object(D.jsx)("path",{d:"M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"})})}):null,Object(D.jsxs)("div",{className:"bet",children:[Object(D.jsx)("img",{src:"./img/coins.png"}),Object(D.jsxs)("h3",{children:["Bet: ",i.amount/d.c]})]}),Object(D.jsxs)("div",{className:"game",children:[Object(D.jsxs)("div",{className:"revealed"!==i.status?"player":(null===(t=i.winner)||void 0===t?void 0:t._id)==i.creator._id?"player winner":"player loser",children:[Object(D.jsx)("img",{src:"./img/coin".concat(i.creatorChoice,".png"),className:"choice"}),Object(D.jsx)(C.a,{src:Object(K.createAvatar)(k,{seed:i.creator.publicKey})}),Object(D.jsx)(L.b,{to:"/u/".concat(i.creator.publicKey),className:"address",children:Object(A.a)(i.creator.publicKey)})]}),Object(D.jsx)("div",{className:"middle",children:"active"===i.status||"joined"===i.status?Object(D.jsx)("h3",{className:"vsTag",children:"VS"}):"countdown"===i.status?Object(D.jsx)(_.a,{date:Date.now()+3e3,onComplete:function(){return m("flipping")},renderer:function(e){return Object(D.jsx)("h3",{children:e.seconds})}}):Object(D.jsxs)("div",{onAnimationEnd:function(){return m("revealed")},id:"coinFlip",className:function(e){if(null===e.result||void 0===e.result)throw"Game is not loaded";var t=parseInt(e.privateSeedHash,36)%u[e.result].length;return u[e.result][t]}(i),children:[Object(D.jsx)("div",{className:"coin0",children:Object(D.jsx)("img",{src:"./img/coin0.png"})}),Object(D.jsx)("div",{className:"coin1",children:Object(D.jsx)("img",{src:"./img/coin1.png"})})]})}),Object(D.jsx)("div",{className:"revealed"!==i.status?"player":(null===(n=i.winner)||void 0===n?void 0:n._id)==(null===(a=i.opponent)||void 0===a?void 0:a._id)?"player winner":"player loser",children:i.opponent?Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)("img",{src:"./img/coin".concat(1-i.creatorChoice,".png"),className:"choice"}),Object(D.jsx)(C.a,{src:Object(K.createAvatar)(k,{seed:i.opponent.publicKey})}),Object(D.jsx)(L.b,{to:"/u/".concat(i.opponent.publicKey),className:"address",children:Object(A.a)(i.opponent.publicKey)})]}):Object(D.jsx)(D.Fragment,{children:Object(D.jsx)("button",{onClick:function(){return x()},className:"joinB",children:"Join"})})})]})]},i._id):null})},B=["active","joined","countdown","flipping"];var P=function(){var e=Object(y.b)(),t=Object(c.useState)([]),n=Object(v.a)(t,2),a=n[0],r=n[1],s=Object(c.useState)([]),i=Object(v.a)(s,2),l=i[0],o=i[1],u=Object(c.useState)([]),j=Object(v.a)(u,2),b=j[0],O=j[1],p=Object(c.useState)([]),x=Object(v.a)(p,2),N=x[0],E=x[1],_=Object(c.useState)(!1),P=Object(v.a)(_,2),M=P[0],G=P[1],U=Object(c.useState)(0),R=Object(v.a)(U,2),F=R[0],I=R[1],W=Object(c.useState)("none"),H=Object(v.a)(W,2),Y=H[0],z=(H[1],Object(c.useState)(0)),J=Object(v.a)(z,2),V=J[0],X=J[1],q=Object(S.c)((function(e){return e.user})),Q=Object(S.c)((function(e){return e.sockets})),Z=function(){var t=Object(g.a)(f.a.mark((function t(){return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e&&e.publicKey&&F){t.next=2;break}return t.abrupt("return");case 2:if(!(q.balance<F)){t.next=4;break}return t.abrupt("return",h.b.error("Balance needs to be higher than the game bet"));case 4:return t.prev=4,t.next=7,w.a.post("/game",{amount:F,creatorChoice:V});case 7:h.b.success("Game created"),G(!1),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(4),h.b.error(t.t0.response.data.message.toString());case 14:case"end":return t.stop()}}),t,null,[[4,11]])})));return function(){return t.apply(this,arguments)}}(),$=function(e){r((function(t){return t.filter((function(t){return t._id!==e._id}))})),o((function(t){return[e].concat(Object(m.a)(t.slice(0,30)))}))};return Object(c.useEffect)((function(){(function(){var e=Object(g.a)(f.a.mark((function e(){var t,n,c,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([w.a.get("/api/game/allActive"),w.a.get("/api/game/lastEnded")]);case 2:t=e.sent,n=Object(v.a)(t,2),c=n[0],a=n[1],console.log({activeGames:c.data}),r(c.data),o(a.data);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(c.useEffect)((function(){Q.game&&(Q.game.on("newGame",(function(e){return r((function(t){return[].concat(Object(m.a)(t),[e])}))})),Q.game.on("gameUpdate",(function(e){return function(e){r((function(t){return t.map((function(t){return t._id===e._id?("ended"===e.status&&(e.status="countdown"),console.log(e),e):t}))}))}(e)})))}),[Q.game]),Object(c.useEffect)((function(){var e=[],t=[];a.forEach((function(n){"ended"!==n.status&&"cancelled"!==n.status&&(n.creator._id===(null===q||void 0===q?void 0:q._id)?e.push(n):t.push(n))})),O(e),E(t)}),[q,a]),Object(D.jsxs)("div",{className:"ActiveGames",children:[q?Object(D.jsx)("button",{className:"createGameB",onClick:function(){return G(!0)},children:"Create Game"}):null,Object(D.jsxs)("h3",{className:"typeHeader",children:["MY GAMES ",Object(D.jsx)("span",{className:"gamesCounter",children:b.length})]}),b.length>0?Object(D.jsx)("div",{className:"games",children:b.map((function(e){return B.includes(e.status)?Object(D.jsx)(T,{game:e,removeGame:$},e._id):null}))}):Object(D.jsx)("div",{className:"typePlaceHolder",children:Object(D.jsx)("p",{children:"Your CoinFlip games will appear here"})}),Object(D.jsxs)("h3",{className:"typeHeader",children:["OPEN GAMES ",Object(D.jsx)("span",{className:"gamesCounter",children:N.length})]}),N.length>0?Object(D.jsx)("div",{className:"games",children:N.map((function(e){return B.includes(e.status)?Object(D.jsx)(T,{game:e,removeGame:$},e._id):null}))}):Object(D.jsx)("div",{className:"typePlaceHolder",children:Object(D.jsx)("p",{children:"No open Coinflip games at the moment"})}),Object(D.jsxs)("h3",{className:"typeHeader",children:["RECENT GAMES ",Object(D.jsx)("span",{className:"gamesCounter",children:l.length})]}),Object(D.jsxs)("table",{className:"recentGames",children:[Object(D.jsx)("thead",{children:Object(D.jsxs)("tr",{children:[Object(D.jsx)("th",{children:"Creator"}),Object(D.jsx)("th",{children:"Opponent"}),Object(D.jsx)("th",{children:"Bet"}),Object(D.jsx)("th",{children:"Result"}),Object(D.jsx)("th",{children:"Winner"})]})}),Object(D.jsx)("tbody",{children:l.map((function(e){return e.opponent&&e.winner&&e.result?Object(D.jsxs)("tr",{className:"recentGame",children:[Object(D.jsx)("td",{children:Object(D.jsxs)("div",{className:"user tdContent",children:[Object(D.jsx)(C.a,{src:Object(K.createAvatar)(k,{seed:e.creator.publicKey})})," ",Object(D.jsxs)(L.b,{to:"/u/".concat(e.creator.publicKey),children:[" ",Object(A.a)(e.creator.publicKey)]})]})}),Object(D.jsx)("td",{children:Object(D.jsxs)("div",{className:"user tdContent",children:[Object(D.jsx)(C.a,{src:Object(K.createAvatar)(k,{seed:e.opponent.publicKey})})," ",Object(D.jsxs)(L.b,{to:"/u/".concat(e.opponent.publicKey),children:[" ",Object(A.a)(e.opponent.publicKey)]})]})}),Object(D.jsx)("td",{children:Object(D.jsxs)("div",{className:"coin tdContent",children:[e.amount/d.c," ",Object(D.jsx)("img",{src:"./img/coins.png"})]})}),Object(D.jsx)("td",{children:Object(D.jsx)("div",{className:"result tdContent",children:Object(D.jsx)("img",{src:"./img/coin".concat(e.result,".png")})})}),Object(D.jsx)("td",{children:Object(D.jsxs)("div",{className:"user tdContent",children:[Object(D.jsx)(C.a,{src:Object(K.createAvatar)(k,{seed:e.winner.publicKey})})," ",Object(D.jsxs)(L.b,{to:"/u/".concat(e.winner.publicKey),children:[" ",Object(A.a)(e.winner.publicKey)]})]})})]},e._id):null}))})]}),Object(D.jsxs)("div",{className:"modal",style:{display:M?"flex":"none"},children:[Object(D.jsx)("div",{className:"container",children:Object(D.jsxs)("div",{className:"wrapper",children:[Object(D.jsx)("button",{className:"closeB",onClick:function(){return G(!1)},children:Object(D.jsx)("svg",{width:"14",height:"14",children:Object(D.jsx)("path",{d:"M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"})})}),Object(D.jsx)("div",{className:"logo",children:Object(D.jsx)("img",{alt:"logo",src:"./logo.png"})}),Object(D.jsx)("h1",{className:"title",children:"Create Game"}),"none"===Y?Object(D.jsxs)(D.Fragment,{children:[Object(D.jsxs)("div",{className:"coinChooser",children:[Object(D.jsx)("img",{onClick:function(){return X(0)},className:0===V?"chosen":"",src:"./img/coin0.png"}),Object(D.jsx)("img",{onClick:function(){return X(1)},className:1===V?"chosen":"",src:"./img/coin1.png"})]}),Object(D.jsx)("input",{type:"number",value:null===F?"":F/d.c,onChange:function(e){return function(e){if(!e)return I(null);console.log({input:e}),Number(e)>=0?I(Number(e)*d.c):I(0)}(e.target.value)}}),Object(D.jsx)("button",{className:"depositB",onClick:function(){return Z()},children:"Create"})]}):"sent"===Y?Object(D.jsx)(D.Fragment,{children:Object(D.jsxs)("h3",{className:"status",children:["Your deposit was sent ",Object(D.jsx)("br",{}),"It will be validated within 60 seconds"]})}):Object(D.jsx)("h3",{className:"status",children:"Failed"})]})}),Object(D.jsx)("div",{className:"overlay"})]})]})},M=n(132);n(234);var G=function(){var e=Object(c.useRef)(null),t=Object(c.useState)(""),n=Object(v.a)(t,2),a=n[0],r=n[1],s=Object(c.useState)([]),i=Object(v.a)(s,2),l=i[0],o=i[1],u=Object(S.c)((function(e){return e.user})),j=Object(S.c)((function(e){return e.sockets})),b=function(){var e=Object(g.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a.length<3)){e.next=2;break}return e.abrupt("return",h.b.error("Message is too short"));case 2:return e.next=4,w.a.post("/message",{content:a});case 4:r("");case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(){e.current&&(e.current.scrollTop=e.current.scrollHeight)};return Object(c.useEffect)((function(){(function(){var e=Object(g.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.get("/api/message/last");case 2:t=e.sent.data,console.log({messages:t}),o(t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()(),d()}),[]),Object(c.useEffect)((function(){d()}),[l]),Object(c.useEffect)((function(){j.message&&j.message.on("newMessage",(function(e){o((function(t){return[].concat(Object(m.a)(t),[e])}))}))}),[j]),Object(D.jsx)("div",{className:"Chat",children:Object(D.jsxs)("div",{className:"chat",children:[Object(D.jsx)("div",{ref:e,className:"messages",children:l.map((function(e){return Object(D.jsxs)("div",{className:"message",children:[Object(D.jsx)("div",{className:"avatar",children:Object(D.jsx)(C.a,{className:"avatar",src:Object(K.createAvatar)(k,{seed:e.creator.publicKey})})}),Object(D.jsxs)("p",{className:"content",children:[Object(D.jsx)(L.b,{to:"/u/".concat(e.creator.publicKey),className:"address",children:Object(A.a)(e.creator.publicKey)}),e.content]})]},e._id)}))}),Object(D.jsx)("div",{className:"inputMessage",children:u?Object(D.jsx)(M.a,{onChange:function(e){return function(e){var t=e.split(" ").map((function(e){return e.trim()}));r(t.join(" "))}(e.target.value)},onKeyPress:function(e){return"Enter"===e.key?b():null},value:a,placeholder:"Type Message..."}):Object(D.jsx)("h4",{children:"You have to Log In"})})]})})},U=n(14),R=(n(235),n(236),n(130)),F=n.n(R);var I=function(e){return Object(D.jsxs)("table",{className:"UserGames",children:[Object(D.jsx)("thead",{children:Object(D.jsxs)("tr",{children:[Object(D.jsx)("th",{children:"Date"}),Object(D.jsx)("th",{children:"Bet"}),Object(D.jsx)("th",{children:"Picked Side"}),Object(D.jsx)("th",{children:"Opponent"}),Object(D.jsx)("th",{children:"Result"}),Object(D.jsx)("th",{children:"Win Amount"}),Object(D.jsx)("th",{children:"Private Seed"}),Object(D.jsx)("th",{children:"Private Seed Hash"}),Object(D.jsx)("th",{children:"Solana Blockhash"})]})}),Object(D.jsx)("tbody",{children:e.games.map((function(t){var n;return Object(D.jsxs)("tr",{className:"game",children:[Object(D.jsx)("td",{children:F()(t.createdAt).format("lll")}),Object(D.jsx)("td",{children:t.amount/d.c}),Object(D.jsx)("td",{children:t.creator._id===e.user._id?t.creatorChoice:1-t.creatorChoice}),Object(D.jsx)("td",{children:t.creator._id===e.user._id?t.opponent?Object(D.jsx)(L.b,{to:"/u/".concat(t.opponent.publicKey),children:Object(A.a)(t.opponent.publicKey)}):"-":Object(D.jsx)(L.b,{to:"/u/".concat(t.creator.publicKey),children:Object(A.a)(t.creator.publicKey)})}),Object(D.jsx)("td",{children:"ended"===t.status?t.result:t.status.charAt(0).toUpperCase()+t.status.slice(1)}),Object(D.jsx)("td",{children:"ended"===t.status?(null===(n=t.winner)||void 0===n?void 0:n._id)===e.user._id?Object(D.jsx)("span",{className:"win",children:2*t.amount/d.c}):Object(D.jsx)("span",{className:"lose",children:-t.amount/d.c}):0}),Object(D.jsx)("td",{children:t.privateSeed}),Object(D.jsx)("td",{children:t.privateSeedHash}),Object(D.jsx)("td",{children:t.blockhash||"-"})]})}))})]})};var W=function(){var e=Object(U.g)().publicKey,t=Object(c.useState)(),n=Object(v.a)(t,2),a=n[0],r=n[1],s=Object(c.useState)([]),i=Object(v.a)(s,2),l=i[0],o=i[1],u=Object(c.useState)(!1),j=Object(v.a)(u,2),b=j[0],d=j[1],O=Object(c.useState)(0),h=Object(v.a)(O,2),p=h[0],m=h[1],x=Object(c.useState)(0),y=Object(v.a)(x,2),N=y[0],S=y[1];return Object(c.useEffect)((function(){e&&function(){var e=Object(g.a)(f.a.mark((function e(t){var n,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.get("/api/u/".concat(t));case 2:return n=e.sent.data,e.next=5,w.a.get("/api/game/u/".concat(t));case 5:c=e.sent.data,n||d(!0),r(n),o(c);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()(e)}),[e]),Object(c.useEffect)((function(){if(l&&a){var e=0,t=0;l.forEach((function(n){"ended"===n.status&&n.winner&&(n.winner._id===a._id?e++:t++)})),m(e),S(t)}}),[a,l]),Object(D.jsxs)(D.Fragment,{children:[a?Object(D.jsxs)("div",{className:"Profile",children:[Object(D.jsxs)("div",{className:"profileBox",children:[Object(D.jsx)(C.a,{className:"avatar",src:Object(K.createAvatar)(k,{seed:a.publicKey.toString()})}),Object(D.jsxs)("div",{className:"info",children:[Object(D.jsxs)("div",{className:"address",children:[Object(D.jsx)("h1",{children:a.publicKey}),Object(D.jsx)("a",{className:"scanLink",target:"_blank",rel:"noopener noreferrer",href:"https://solscan.io/account/".concat(a.publicKey.toString()),children:Object(D.jsx)("img",{src:"/img/solscan.png"})})]}),Object(D.jsxs)("div",{className:"gameStats",children:[Object(D.jsxs)("div",{className:"gameStat",children:[Object(D.jsx)("h2",{children:"Games Won:"}),Object(D.jsx)("h2",{children:p})]}),Object(D.jsx)("div",{className:"statCircle",style:{backgroundImage:l.length>0?"linear-gradient(#041b37, #041b37), linear-gradient( 45deg, green, green ".concat(p/(p+N)*100,"%, red ").concat(N/(p+N)*100,"% )"):"linear-gradient(#041b37, #041b37), linear-gradient( 45deg, gray, gray 100% )"}}),Object(D.jsxs)("div",{className:"gameStat",children:[Object(D.jsx)("h2",{children:"Games Lost:"}),Object(D.jsx)("h2",{children:N})]})]})]})]}),l.length>0?Object(D.jsx)(I,{user:a,games:l}):null]}):null,b?Object(D.jsxs)("div",{className:"Profile",children:[Object(D.jsx)("h1",{className:"notFound",children:"User was not found"})," "]}):null]})},H=l.b.Devnet;var Y,z=function(){var e=Object(c.useMemo)((function(){return Object(d.g)(H)}),[H]),t=Object(c.useMemo)((function(){return[Object(o.a)(),Object(u.a)(),Object(j.a)()]}),[H]),n=Object(S.b)();return Object(c.useEffect)((function(){var e=Object(O.a)("https://solasphere-ponweb.vercel.app/game"),t=Object(O.a)("https://solasphere-ponweb.vercel.app/user"),c=Object(O.a)("https://solasphere-ponweb.vercel.app/message");n({type:"LOAD_GAME_SOCKET",payload:e}),n({type:"LOAD_USER_SOCKET",payload:t}),n({type:"LOAD_MESSAGE_SOCKET",payload:c})}),[]),Object(D.jsx)("div",{className:"App",children:Object(D.jsx)(s.a,{endpoint:e,children:Object(D.jsxs)(i.a,{wallets:t,autoConnect:!0,children:[Object(D.jsx)(b.a,{children:Object(D.jsxs)(L.a,{children:[Object(D.jsx)(p.a,{}),Object(D.jsxs)("div",{className:"Body",children:[Object(D.jsx)(G,{}),Object(D.jsxs)(U.c,{children:[Object(D.jsx)(U.a,{path:"/",element:Object(D.jsx)(P,{})}),Object(D.jsx)(U.a,{path:"/u/:publicKey",element:Object(D.jsx)(W,{})})]})]})]})}),Object(D.jsx)(h.a,{autoClose:1500})]})})})},J=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,250)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),r(e),s(e)}))},V=n(90);!function(e){e.LOAD_USER="LOAD_USER",e.UPDATE_USER_BALANCE="UPDATE_USER_BALANCE"}(Y||(Y={}));var X;!function(e){e.LOAD_ASSOCIATED_KEYPAIR="LOAD_ASSOCIATED_KEYPAIR"}(X||(X={}));var q;!function(e){e.LOAD_WALLET="LOAD_WALLET"}(q||(q={}));var Q;!function(e){e.LOAD_GAME_SOCKET="LOAD_GAME_SOCKET",e.LOAD_USER_SOCKET="LOAD_USER_SOCKET",e.LOAD_MESSAGE_SOCKET="LOAD_MESSAGE_SOCKET"}(Q||(Q={}));var Z={user:void 0,game:void 0,message:void 0},$=Object(V.a)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Y.LOAD_USER:return t.payload;case Y.UPDATE_USER_BALANCE:return console.log("prev balance:",null===e||void 0===e?void 0:e.balance),console.log("balance change: ",t.payload),e&&Object(E.a)(Object(E.a)({},e),{},{balance:e.balance+t.payload});default:return e}},wallet:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case q.LOAD_WALLET:return t.payload;default:return e}},associatedKeypair:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case X.LOAD_ASSOCIATED_KEYPAIR:return t.payload;default:return e}},sockets:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Q.LOAD_GAME_SOCKET:return Object(E.a)(Object(E.a)({},e),{},{game:t.payload});case Q.LOAD_USER_SOCKET:return Object(E.a)(Object(E.a)({},e),{},{user:t.payload});case Q.LOAD_MESSAGE_SOCKET:return Object(E.a)(Object(E.a)({},e),{},{message:t.payload});default:return e}}}),ee=Object(V.b)($);r.a.render(Object(D.jsx)(c.StrictMode,{children:Object(D.jsx)(S.a,{store:ee,children:Object(D.jsx)(z,{})})}),document.getElementById("root")),J()},26:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var c=function(e){return e.slice(0,5)+"..."+e.slice(-5)}},54:function(e,t,n){},63:function(e,t,n){}},[[237,1,2]]]);
//# sourceMappingURL=main.e818f760.chunk.js.map