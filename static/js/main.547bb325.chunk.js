(this.webpackJsonpleehepily27072020=this.webpackJsonpleehepily27072020||[]).push([[0],{58:function(e,t,a){e.exports=a(97)},63:function(e,t,a){},64:function(e,t,a){},97:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(7),l=a.n(c),i=(a(63),a(64),a(28)),r=a(37),s=a(22),u=a(141),m=a(139),d=a(137),f=a(138),h=a(133),p=a(140),E=a(33),b=a.n(E),g=a(50),v=a.n(g),y=a(51),w=(a(94),a(95),"https://servergrid.herokuapp.com/");function k(){var e=o.a.useState(),t=Object(s.a)(e,2),a=t[0],c=t[1],l=o.a.useState(),E=Object(s.a)(l,2),g=E[0],k=E[1],S=o.a.useState(),j=Object(s.a)(S,2),O=j[0],x=j[1],C=o.a.useState(!1),D=Object(s.a)(C,2),R=D[0],G=D[1],I=o.a.useState({}),N=Object(s.a)(I,2),Y=N[0],A=N[1],T=o.a.useState({sortable:!0,flex:1}),B=Object(s.a)(T,1)[0],F=function(e){e.persist(),A((function(t){return Object(r.a)(Object(r.a)({},t),{},Object(i.a)({},e.target.name,e.target.value))}))};Object(n.useEffect)((function(){b.a.get(w).then((function(e){k(e.data)})).catch((function(e){console.log(e)}));c([{field:"name",sortable:!0},{field:"date",sortable:!0},{field:"show",sortable:!0},{field:"tickets",unSortIcon:!0}])}),[]);return o.a.createElement("div",{style:{width:700,height:"100%"}},o.a.createElement("div",{style:{height:"100%",display:"flex",flexDirection:"column"}},o.a.createElement("div",{style:{marginBottom:"4px"}},o.a.createElement(h.a,null,o.a.createElement(d.a,{disableSpacing:!0},o.a.createElement(u.a,{onClick:function(){G(!R)}},"Add Items"),o.a.createElement(u.a,{onClick:function(){return function(){var e=[];O.applyTransaction({remove:O.getSelectedRows()}),O.forEachNode((function(t){e.push(t.data)})),b.a.post(w+"removeUserData",e).then((function(e){})).catch((function(e){console.log(e)}))}()}},"Remove Selected")),o.a.createElement(f.a,{in:R,timeout:"auto",unmountOnExit:!0},o.a.createElement(m.a,{style:{display:"flex",justifyContent:"space-between"}},o.a.createElement(p.a,{autoFocus:!0,name:"name",label:"Name",onChange:F,value:Y.name||""}),o.a.createElement(p.a,{name:"show",label:"Show Name",onChange:F,value:Y.show||""}),o.a.createElement(p.a,{name:"tickets",label:"Tickets",type:"number",InputProps:{inputProps:{min:1,max:10}},value:Y.tickets||"",onChange:F}),o.a.createElement(u.a,{onClick:function(){return function(){var e={name:Y.name||"no data",date:v()().format("DD/MM/YYYY"),show:Y.show||"no data",tickets:Y.tickets||"no data"};b.a.post(w+"postUserData",e).then((function(e){console.log(e.data)})).catch((function(e){console.log(e)})),O.applyTransaction({add:[e]})}()}},"Add"))))),o.a.createElement("div",{style:{flexGrow:"1"}},o.a.createElement("div",{id:"myGrid",style:{height:400,width:"100%"},className:"ag-theme-alpine"},o.a.createElement(y.AgGridReact,{rowData:g,columnDefs:a,defaultColDef:B,rowSelection:"multiple",animateRows:!0,onGridReady:function(e){x(e.api)}})))))}var S=function(){return o.a.createElement("div",null,o.a.createElement(k,null))};l.a.render(o.a.createElement(o.a.Fragment,null,o.a.createElement(S,null)),document.getElementById("root"))}},[[58,1,2]]]);
//# sourceMappingURL=main.547bb325.chunk.js.map