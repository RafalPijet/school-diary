(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[14],{325:function(t,e,a){"use strict";var i=a(0),n=a.n(i),r=a(254),c=a(190),o=a(26),s=function(t){return{content:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-around",height:o.a.contentHeight},parent:{backgroundImage:t.palette.background.parent},teacher:{backgroundImage:t.palette.background.teacher},principal:{backgroundImage:t.palette.background.principal}}},l=a(29),u=a(10),p=a(11),m=a(6),g=a.n(m),h=a(30),b=a(82),d=a(118),f=a(42),j=function(t){var e;return{root:{padding:o.a.smallSize,backgroundColor:t.palette.primary.light},image:(e={position:"relative"},Object(f.a)(e,t.breakpoints.down("xs"),{width:"100% !important",height:100}),Object(f.a)(e,"&:hover, &$focusVisible",{zIndex:1,"& $imageBackdrop":{opacity:.15},"& $imageTitle":{fontSize:24,fontWeight:700}}),e),focusVisible:{},imageButton:{position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},imageSrc:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundSize:"cover",backgroundPosition:"center"},imageBackdrop:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:t.palette.common.black,opacity:.4,transition:t.transitions.create("opacity")},imageTitle:{position:"relative",padding:"".concat(t.spacing(2),"px ").concat(t.spacing(4),"px ").concat(t.spacing(1)+6,"px"),transition:".5s",color:t.palette.action.title}}},k=Object(r.a)((function(t){return j(t)})),y=function(t){var e=t.title,a=t.path,r=t.top,o=t.bottom,s=t.right,l=t.left,u=t.image,m=t.width,g=t.height,f=t.setPath,j=Object(i.useState)(r||0),y=Object(p.a)(j,1)[0],O=Object(i.useState)(o||0),v=Object(p.a)(O,1)[0],E=Object(i.useState)(l||0),w=Object(p.a)(E,1)[0],S=Object(i.useState)(s||0),x=Object(p.a)(S,1)[0],N=Object(i.useState)("/"),T=Object(p.a)(N,2),C=T[0],I=T[1],B=k();return n.a.createElement(c.a,{elevation:9,className:B.root},n.a.createElement(b.a,{name:e,focusRipple:!0,onClick:function(){setTimeout((function(){I(a),f(a)}),300)},className:B.image,focusVisibleClassName:B.focusVisible,style:{width:m,height:g}},n.a.createElement("span",{className:B.imageSrc,style:{backgroundImage:"url(".concat(u,")")}}),n.a.createElement("span",{className:B.imageBackdrop}),n.a.createElement("span",{className:B.imageButton,style:{bottom:v,top:y,right:x,left:w}},n.a.createElement(d.a,{component:"span",variant:"subtitle1",color:"inherit",className:B.imageTitle},e))),n.a.createElement(h.a,{to:C}))};y.propStyles={title:g.a.string.isRequired,image:g.a.any.isRequired,path:g.a.string.isRequired,top:g.a.number,bottom:g.a.number,left:g.a.number,right:g.a.number,width:g.a.number,height:g.a.number,setPath:g.a.func.isRequired};var O=y,v=Object(l.b)(null,(function(t){return{setPath:function(e){return t(Object(u.E)(e))}}}))(O),E=Object(r.a)((function(t){return s(t)}));e.a=function(t){var e=t.buttons,a=t.userType,i=E();return n.a.createElement(c.a,{elevation:9,className:function(t){switch(t){case"parent":return i.parent;case"teacher":return i.teacher;case"principal":return i.principal;default:return""}}(a)},n.a.createElement("div",{className:i.content},e.map((function(t,e){return n.a.createElement(v,{key:e,image:t.image,title:t.title,top:t.top,bottom:t.bottom,left:t.left,right:t.right,width:t.width,height:t.height,path:t.path})}))))}},359:function(t,e,a){t.exports=a.p+"static/media/classDiares.c490548d.jpg"},360:function(t,e,a){t.exports=a.p+"static/media/teacherData.1780bd21.jpg"},393:function(t,e,a){"use strict";a.r(e);var i=a(0),n=a.n(i),r=a(41),c=a(325),o=a(359),s=a.n(o),l=a(360),u=a.n(l),p=[{image:s.a,title:"Class Diaries",top:150,width:400,height:360,left:30,path:"/diaries"},{image:u.a,title:"Teacher's Data",width:350,height:300,bottom:175,left:113,path:"/data"}];e.default=function(){return n.a.createElement("div",null,n.a.createElement(r.a,null,"Teacher's Zone"),n.a.createElement(c.a,{userType:"teacher",buttons:p}))}}}]);
//# sourceMappingURL=14.cde2d769.chunk.js.map