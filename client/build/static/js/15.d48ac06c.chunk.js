(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[15],{320:function(e,t,a){"use strict";var n=a(83),r=a(0),l=a.n(r),c=a(254),i=a(310),o=a(345),s=a(338),u=a(336),m=a(337),d=a(335),p=a(262),f=l.a.forwardRef((function(e,t){return l.a.createElement(p.a,Object.assign({direction:"up",ref:t},e))})),g=Object(c.a)((function(e){return{buttonRemove:{color:e.palette.action.light}}}));t.a=function(e){var t=e.isOpen,a=e.isConfirm,r=e.description,c=Object(n.a)(e,["isOpen","isConfirm","description"]),p=g();return l.a.createElement("div",null,l.a.createElement(o.a,Object.assign({open:t,TransitionComponent:f,onClose:function(){return a(!1)},keepMounted:!0,"aria-labelledby":"alert-dialog-slide-title","aria-describedby":"alert-dialog-slide-description"},c),l.a.createElement(d.a,{id:"alert-dialog-slide-title"},"Are you sure?"),l.a.createElement(u.a,null,l.a.createElement(m.a,{id:"alert-dialog-slide-description"},r)),l.a.createElement(s.a,null,l.a.createElement(i.a,{className:p.buttonRemove,onClick:function(){return a(!0)}},"Delete"),l.a.createElement(i.a,{color:"primary",onClick:function(){return a(!1)}},"Cancel"))))}},323:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(254),c=a(33),i=a(261),o=a(342),s=a.n(o),u=a(341),m=a.n(u),d=a(344),p=a.n(d),f=a(343),g=a.n(f),b=Object(l.a)((function(e){return{root:{flexShrink:0,marginLeft:e.spacing(2.5)}}}));t.a=function(e){var t=b(),a=Object(c.a)(),n=e.count,l=e.page,o=e.rowsPerPage,u=e.onChangePage;return r.a.createElement("div",{className:t.root},r.a.createElement(i.a,{onClick:function(e){u(e,0)},disabled:0===l,"aria-label":"first page"},"rtl"===a.direction?r.a.createElement(m.a,null):r.a.createElement(s.a,null)),r.a.createElement(i.a,{onClick:function(e){u(e,l-1)},disabled:0===l,"aria-label":"previous page"},"rtl"===a.direction?r.a.createElement(g.a,null):r.a.createElement(p.a,null)),r.a.createElement(i.a,{onClick:function(e){u(e,l+1)},disabled:l>=Math.ceil(n/o)-1,"aria-label":"next page"},"rtl"===a.direction?r.a.createElement(p.a,null):r.a.createElement(g.a,null)),r.a.createElement(i.a,{onClick:function(e){u(e,Math.max(0,Math.ceil(n/o)-1))},disabled:l>=Math.ceil(n/o)-1,"aria-label":"last page"},"rtl"===a.direction?r.a.createElement(s.a,null):r.a.createElement(m.a,null)))}},409:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(41),c=a(29),i=a(11),o=a(190),s=a(294),u=a(118),m=a(363),d=a(318),p=a(364),f=a(399),g=a(361),b=a(418),E=a(254),O=a(414),j=a(5),h=a(64),N=a(419),v=a(404),y=a(298),S=a(405),C=a(377),k=a.n(C),w=a(7),P=a.n(w),x=a(38),A=a(16),I=a(261),z=a(299),L=a(376),B=a.n(L),q=a(347),D=a.n(q),M=a(297),R=a(26),T=function(e){return{root:{display:"flex",alignItems:"center",backgroundColor:e.palette.secondary.dark,padding:"".concat(R.a.smallSize," 0")},formControl:{margin:e.spacing(1),minWidth:120},addButton:{color:e.palette.action.dark},removeButton:{color:e.palette.action.light},tooltip:{backgroundColor:e.palette.secondary.light},progress:{cursor:"progress"}}},F=Object(E.a)((function(e){return T(e)})),H=function(e){var t=e.list,a=e.selectName,l=e.buttonName,c=e.confirmSelect,s=e.isDisabled,u=e.isAdd,m=e.parentId,p=Object(n.useState)(null),f=Object(i.a)(p,2),g=f[0],b=f[1],E=F();Object(n.useEffect)((function(){s&&b(null)}),[s]);return r.a.createElement(o.a,{variant:"outlined",className:Object(j.a)(E.root,s&&E.progress)},r.a.createElement(O.a,{disabled:s,id:m,value:g,renderInput:function(e){return r.a.createElement(d.a,Object.assign({},e,{label:a}))},getOptionLabel:function(e){return"".concat(e.lastName," ").concat(e.firstName)},options:t,style:{width:240,paddingLeft:"15px"},size:"small",onChange:function(e,t){return function(e){b(e)}(t)}}),r.a.createElement(z.a,{title:l,arrow:!0,classes:{tooltip:E.tooltip},placement:"top",TransitionComponent:M.a,TransitionProps:{timeout:1e3}},r.a.createElement("span",{className:s?E.progress:""},r.a.createElement(I.a,{className:u?E.addButton:E.removeButton,disabled:s||null===g,"aria-label":l,onClick:function(){c(g)}},u?r.a.createElement(D.a,null):r.a.createElement(B.a,null)))))},U=a(321),J=a.n(U),W=a(320),G=function(e){return{root:{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"},button:{color:e.palette.action.light,backgroundColor:e.palette.primary.light},info:{backgroundColor:e.palette.secondary.dark,width:"300px",height:"60px",padding:e.spacing(1),overflow:"auto"},second:{fontSize:R.a.baseSize,color:e.palette.primary.light},tooltip:{backgroundColor:e.palette.secondary.light},spinner:{display:"flex",justifyContent:"center",alignItems:"center"},progress:{cursor:"progress"}}},K=Object(E.a)((function(e){return G(e)})),Q=function(e){var t=e.parent,a=e.allStudents,l=e.updateUser,c=e.updateStudent,s=e.request,m=e.deleteParent,d=e.page,p=Object(n.useState)([]),f=Object(i.a)(p,2),g=f[0],b=f[1],E=Object(n.useState)(!1),O=Object(i.a)(E,2),N=O[0],v=O[1],y=Object(n.useState)(t.students.map((function(e){return e.id}))),S=Object(i.a)(y,2),C=S[0],k=S[1],w=K();Object(n.useEffect)((function(){k(t.students.map((function(e){return e.id})))}),[t.students]),Object(n.useEffect)((function(){var e=a.filter((function(e){return!C.includes(e.id)}));b(e)}),[a,t.students,C]);var L=function(){var e=Object(A.a)(P.a.mark((function e(a){var n,r;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={studentName:"".concat(a.lastName," ").concat(a.firstName),parentName:"".concat(t.lastName," ").concat(t.firstName),isAdd:!0},r=[].concat(Object(x.a)(t.students),[a]),e.next=4,l(t.id,r,n);case 4:c(a.id,t,!0);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),B=function(){var e=Object(A.a)(P.a.mark((function e(a){var n,r;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={studentName:"".concat(a.lastName," ").concat(a.firstName),parentName:"".concat(t.lastName," ").concat(t.firstName),isAdd:!1},r=t.students.filter((function(e){return e.id!==a.id})),e.next=4,l(t.id,r,n);case 4:c(a.id,t,!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:w.root},r.a.createElement(z.a,{disabled:s.adding,title:"Remove parent",arrow:!0,classes:{tooltip:w.tooltip},placement:"top-start",TransitionComponent:M.a,TransitionProps:{timeout:1e3}},r.a.createElement("span",{className:s.adding?w.progress:""},r.a.createElement(I.a,{disabled:s.adding,"aria-label":"remove",className:w.button,onClick:function(){return v(!0)}},r.a.createElement(J.a,{fontSize:"small"})))),r.a.createElement(H,{parentId:"".concat(t.id," add"),list:g,isAdd:!0,selectName:"unassigned students",buttonName:"Assign",isDisabled:s.adding,confirmSelect:L}),r.a.createElement(H,{parentId:t.id,list:t.students,isAdd:!1,selectName:"assigned students",buttonName:"Unassign",confirmSelect:B,isDisabled:s.adding}),r.a.createElement(o.a,{variant:"outlined",className:Object(j.a)(w.info,s.adding&&w.spinner)},s.adding?r.a.createElement(h.a,null):t.students.length?t.students.map((function(e,t){return r.a.createElement("div",{key:t},r.a.createElement(u.a,{className:w.second,display:"inline"},"".concat(t+1,". ")),r.a.createElement(u.a,{variant:"subtitle2",display:"inline"},"".concat(e.firstName," ").concat(e.lastName)),r.a.createElement(u.a,{className:w.second,display:"inline"}," ".concat(e.birthDate.substring(0,10),", ").concat(e.className)))})):r.a.createElement(u.a,{variant:"subtitle2"},"The parent has no student assigned"))),r.a.createElement(W.a,{isOpen:N,isConfirm:function(e){v(!1),e&&(t.students.length&&t.students.forEach((function(e){c(e.id,t,!1)})),m(t.id,d))},description:"Are you sure you want to delete the parent ".concat(t.lastName," ").concat(t.firstName,"?")}))},V=a(27),X=a(54),Y=a(2),Z=Object(c.b)((function(e){return{allStudents:Object(V.g)(e),request:Object(Y.n)(e)}}),(function(e){return{updateUser:function(t,a,n){return e(Object(X.P)(t,a,n))},updateStudent:function(t,a,n){return e(Object(X.M)(t,a,n))},deleteParent:function(t,a){return e(Object(X.h)(t,a))}}}))(Q),$=function(e){return{root:{width:"100%",margin:"".concat(e.spacing(.2),"px 0")},item:{backgroundColor:e.palette.secondary.dark},select:{width:"100%",margin:"".concat(e.spacing(1),"px 0")},selected:{fontWeight:"800"}}},_=Object(E.a)((function(e){return $(e)})),ee=function(e){var t=e.parent,a=e.i,l=e.selectedItem,c=e.collapseHandling,i=e.page,o=_();Object(n.useEffect)((function(){}),[l]);return r.a.createElement("div",{className:l===a?o.select:o.root},r.a.createElement(N.a,{className:o.item,expanded:l===a,onChange:function(){c(a)}},r.a.createElement(v.a,{expandIcon:r.a.createElement(k.a,null)},r.a.createElement(s.a,{container:!0},r.a.createElement(s.a,{item:!0,lg:1},r.a.createElement(u.a,{className:l===a?o.selected:"",align:"left",variant:"subtitle1",color:"primary"},a+1)),l===a?r.a.createElement(s.a,{item:!0,lg:4},r.a.createElement(u.a,{className:o.selected,align:"center",variant:"subtitle1",color:"primary"},"".concat(t.lastName," ").concat(t.firstName))):r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,{item:!0,lg:2},r.a.createElement(u.a,{align:"left",variant:"subtitle1",color:"primary"},t.lastName.length>12?"".concat(t.lastName.substring(0,13),"..."):t.lastName)),r.a.createElement(s.a,{item:!0,lg:2},r.a.createElement(u.a,{align:"left",variant:"subtitle1",color:"primary"},t.firstName.length>12?"".concat(t.firstName.substring(0,13),"..."):t.firstName))),r.a.createElement(s.a,{item:!0,lg:2},r.a.createElement(u.a,{className:l===a?o.selected:"",align:"center",variant:"subtitle1",color:"primary"},t.telephone)),r.a.createElement(s.a,{item:!0,lg:3},r.a.createElement(u.a,{className:l===a?o.selected:"",align:"center",variant:"subtitle1",color:"primary"},r.a.createElement(y.a,{href:"mailto:".concat(t.email)},t.email))),r.a.createElement(s.a,{item:!0,lg:1},r.a.createElement(u.a,{className:l===a?o.selected:"",align:"center",variant:"subtitle1",color:"primary"},t.students.length)))),r.a.createElement(S.a,null,r.a.createElement(Z,{page:i,parent:t}))))},te=a(65),ae=function(e){return{root:{backgroundColor:e.palette.secondary.light},info:{padding:"".concat(R.a.smallSize," 0 0 22px")},content:{justifyContent:"space-between",flexDirection:"column",padding:"0 ".concat(R.a.baseSize),height:"515px"},footer:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"52px",marginBottom:R.a.smallSize},spinner:{justifyContent:"center !important"},noFull:{justifyContent:"flex-start !important"}}},ne=a(323),re=Object(E.a)((function(e){return ae(e)})),le=function(e){var t=e.loadParents,a=e.loadParent,l=e.loadStudents,c=e.loadParentName,E=e.request,N=e.parents,v=e.parentsName,y=e.resetRequest,S=e.allStudents,C=e.clearParents,k=e.clearStudents,w=e.clearParentsName,P=e.alertSuccess,x=e.setAlertSuccess,A=e.available,I=e.clearAvailable,z=Object(n.useState)(0),L=Object(i.a)(z,2),B=L[0],q=L[1],D=Object(n.useState)(null),M=Object(i.a)(D,2),R=M[0],T=M[1],F=Object(n.useState)(0),H=Object(i.a)(F,2),U=H[0],J=H[1],W=Object(n.useState)(!1),G=Object(i.a)(W,2),K=G[0],Q=G[1],V=Object(n.useState)(!1),X=Object(i.a)(V,2),Y=X[0],Z=X[1],$=Object(n.useState)(!1),_=Object(i.a)($,2),ae=_[0],le=_[1],ce=re();Object(n.useEffect)((function(){S.length||K||A.length||(l(),Q(!0))}),[S.length]),Object(n.useEffect)((function(){A.length&&!ae&&(le(!0),l(),A.forEach((function(e,t){t<7&&a(e,!0)}))),v.length||A.length||c("parent"),K&&S.length&&(t(U+1,7),Q(!1)),E.pending&&(q(0),I([]),le(!1)),null===R&&Y&&!A.length&&(t(U+1,7),Z(!1))}),[S.length,N.length,U,E.pending,R,A.length,K]),Object(n.useEffect)((function(){return function(){y(),C([]),k([]),w([]),I([])}}),[]);var ie=function(e){q(e)};return r.a.createElement(o.a,{variant:"outlined",className:ce.root},r.a.createElement(s.a,{container:!0,className:ce.info},r.a.createElement(s.a,{item:!0,lg:1},r.a.createElement(u.a,{variant:"subtitle2",color:"primary"},"Pos")),r.a.createElement(s.a,{item:!0,lg:2},r.a.createElement(u.a,{variant:"subtitle2",color:"primary"},"Last name")),r.a.createElement(s.a,{item:!0,lg:2},r.a.createElement(u.a,{variant:"subtitle2",color:"primary"},"First name")),r.a.createElement(s.a,{item:!0,lg:2},r.a.createElement(u.a,{style:{paddingLeft:"26px"},variant:"subtitle2",color:"primary"},"Phone")),r.a.createElement(s.a,{item:!0,lg:2},r.a.createElement(u.a,{align:"center",variant:"subtitle2",color:"primary"},"Email")),r.a.createElement(s.a,{item:!0,lg:3},r.a.createElement(u.a,{style:{paddingLeft:"34px"},variant:"subtitle2",color:"primary"},"Students"))),r.a.createElement(s.a,{container:!0,className:Object(j.a)(ce.content,!E.working&&!E.pending&&N.length<7?ce.noFull:"",E.pending||E.working?ce.spinner:"")},E.pending||E.working?r.a.createElement(h.a,null):N.map((function(e,t){return r.a.createElement(ee,{i:t,key:t,parent:e,page:U,selectedItem:B,collapseHandling:ie})}))),r.a.createElement(m.a,{className:ce.footer,component:o.a},r.a.createElement(O.a,{hidden:E.working,id:"search-parent",renderInput:function(e){return r.a.createElement(d.a,Object.assign({},e,{label:"Search parent"}))},options:v,getOptionLabel:function(e){return e.name},size:"small",style:{width:300,paddingLeft:"15px"},onChange:function(e,t){return function(e){T(e),null!==e&&(a(e.id,!1),Z(!0),J(0))}(t)}}),r.a.createElement(p.a,null,r.a.createElement(f.a,null,r.a.createElement(g.a,null,r.a.createElement(b.a,{hidden:E.working||null!==R,rowsPerPageOptions:[7],colSpan:3,count:v.length,rowsPerPage:7,page:U,SelectProps:{inputProps:{"aria-label":"rows per page"},native:!0},onChangePage:function(e,t){k([]),Q(!1),J(t)},ActionsComponent:ne.a}))))),r.a.createElement(te.a,{isOpenAlert:null!==E.error||P.isOpen,variant:E.error?"error":"success",message:E.error?E.error:P.message,handleCloseHandling:function(){E.error?y():x(!1,"")}}))},ce=a(12),ie=a(10),oe=Object(c.b)((function(e){return{request:Object(Y.n)(e),parents:Object(ce.p)(e),allStudents:Object(V.g)(e),alertSuccess:Object(ie.m)(e),parentsName:Object(ce.v)(e),available:Object(ie.n)(e)}}),(function(e){return{loadParents:function(t,a){return e(Object(X.B)(t,a))},loadParent:function(t,a){return e(Object(X.A)(t,a))},loadStudents:function(){return e(Object(X.l)())},loadParentName:function(t){return e(Object(X.v)(t))},resetRequest:function(){return e(Object(Y.o)())},clearParents:function(t){return e(Object(ce.w)(t))},clearStudents:function(t){return e(Object(V.k)(t))},clearParentsName:function(t){return e(Object(ce.y)(t))},setAlertSuccess:function(t,a){return e(Object(ie.A)(t,a))},clearAvailable:function(t){return e(Object(ie.B)(t))}}}))(le);t.default=function(){return r.a.createElement("div",null,r.a.createElement(l.a,null,"Parents"),r.a.createElement(oe,null))}}}]);
//# sourceMappingURL=15.d48ac06c.chunk.js.map