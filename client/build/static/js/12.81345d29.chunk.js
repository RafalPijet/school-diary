(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[12],{325:function(t,e,a){"use strict";var n=a(0),i=a.n(n),r=a(254),o=a(190),c=a(26),s=function(t){return{content:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-around",height:c.a.contentHeight},parent:{backgroundImage:t.palette.background.parent},teacher:{backgroundImage:t.palette.background.teacher},principal:{backgroundImage:t.palette.background.principal}}},l=a(29),p=a(10),u=a(11),m=a(6),g=a.n(m),h=a(30),b=a(82),d=a(118),f=a(42),k=function(t){var e;return{root:{padding:c.a.smallSize,backgroundColor:t.palette.primary.light},image:(e={position:"relative"},Object(f.a)(e,t.breakpoints.down("xs"),{width:"100% !important",height:100}),Object(f.a)(e,"&:hover, &$focusVisible",{zIndex:1,"& $imageBackdrop":{opacity:.15},"& $imageTitle":{fontSize:24,fontWeight:700}}),e),focusVisible:{},imageButton:{position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},imageSrc:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundSize:"cover",backgroundPosition:"center"},imageBackdrop:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:t.palette.common.black,opacity:.4,transition:t.transitions.create("opacity")},imageTitle:{position:"relative",padding:"".concat(t.spacing(2),"px ").concat(t.spacing(4),"px ").concat(t.spacing(1)+6,"px"),transition:".5s",color:t.palette.action.title}}},j=Object(r.a)((function(t){return k(t)})),y=function(t){var e=t.title,a=t.path,r=t.top,c=t.bottom,s=t.right,l=t.left,p=t.image,m=t.width,g=t.height,f=t.setPath,k=Object(n.useState)(r||0),y=Object(u.a)(k,1)[0],O=Object(n.useState)(c||0),v=Object(u.a)(O,1)[0],w=Object(n.useState)(l||0),E=Object(u.a)(w,1)[0],x=Object(n.useState)(s||0),S=Object(u.a)(x,1)[0],N=Object(n.useState)("/"),I=Object(u.a)(N,2),T=I[0],C=I[1],P=j();return i.a.createElement(o.a,{elevation:9,className:P.root},i.a.createElement(b.a,{name:e,focusRipple:!0,onClick:function(){setTimeout((function(){C(a),f(a)}),300)},className:P.image,focusVisibleClassName:P.focusVisible,style:{width:m,height:g}},i.a.createElement("span",{className:P.imageSrc,style:{backgroundImage:"url(".concat(p,")")}}),i.a.createElement("span",{className:P.imageBackdrop}),i.a.createElement("span",{className:P.imageButton,style:{bottom:v,top:y,right:S,left:E}},i.a.createElement(d.a,{component:"span",variant:"subtitle1",color:"inherit",className:P.imageTitle},e))),i.a.createElement(h.a,{to:T}))};y.propStyles={title:g.a.string.isRequired,image:g.a.any.isRequired,path:g.a.string.isRequired,top:g.a.number,bottom:g.a.number,left:g.a.number,right:g.a.number,width:g.a.number,height:g.a.number,setPath:g.a.func.isRequired};var O=y,v=Object(l.b)(null,(function(t){return{setPath:function(e){return t(Object(p.E)(e))}}}))(O),w=Object(r.a)((function(t){return s(t)}));e.a=function(t){var e=t.buttons,a=t.userType,n=w();return i.a.createElement(o.a,{elevation:9,className:function(t){switch(t){case"parent":return n.parent;case"teacher":return n.teacher;case"principal":return n.principal;default:return""}}(a)},i.a.createElement("div",{className:n.content},e.map((function(t,e){return i.a.createElement(v,{key:e,image:t.image,title:t.title,top:t.top,bottom:t.bottom,left:t.left,right:t.right,width:t.width,height:t.height,path:t.path})}))))}},365:function(t,e,a){t.exports=a.p+"static/media/ratings.19d18f80.jpg"},366:function(t,e,a){t.exports=a.p+"static/media/parent.259cd116.png"},367:function(t,e,a){t.exports=a.p+"static/media/teachers.900b077e.png"},400:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),r=a(41),o=a(325),c=a(365),s=a.n(c),l=a(366),p=a.n(l),u=a(367),m=a.n(u),g=[{image:s.a,title:"Grades",bottom:200,width:400,height:280,path:"/grades"},{image:p.a,title:"Parent's Data",left:130,top:20,width:350,height:230,path:"/data"},{image:m.a,title:"Teachers",right:180,bottom:30,width:320,height:200,path:"/teachers"}];e.default=function(){return i.a.createElement("div",null,i.a.createElement(r.a,null,"Parent's Zone"),i.a.createElement(o.a,{buttons:g,userType:"parent"}))}}}]);
//# sourceMappingURL=12.81345d29.chunk.js.map