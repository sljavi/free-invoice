(this["webpackJsonpfree-invoice"]=this["webpackJsonpfree-invoice"]||[]).push([[0],{24:function(e,t,a){e.exports=a.p+"static/media/printer.42497fb3.svg"},25:function(e,t,a){e.exports=a.p+"static/media/save.1731195f.svg"},26:function(e,t,a){e.exports=a(47)},31:function(e,t,a){},43:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){},47:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(22),l=a.n(o),c=(a(31),a(3)),s=a(4),i=a(6),m=a(5),u=a(7),d=a(12),p=a(16),f=a(1),g=a.n(f),h=a(23),E=(a(41),a(42),a(43),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).getTemplate=function(){return localStorage.getItem("template")?localStorage.getItem("template"):"{{MMM D, YYYY}} - Daily work"},a.getTime=function(){return localStorage.getItem("time")?localStorage.getItem("time"):"{{MMM D, YYYY}}"},a.getPrice=function(){if(localStorage.getItem("price")){var e=parseFloat(localStorage.getItem("price"));if(!isNaN(e))return e}return 100},a.getFrom=function(){if(localStorage.getItem("from")){var e=+localStorage.getItem("from");if(!isNaN(e))return e}return Date.now()},a.getTo=function(){if(localStorage.getItem("to")){var e=+localStorage.getItem("to");if(!isNaN(e))return e}return Date.now()},a.getWeekends=function(){return!localStorage.getItem("weekends")||"true"===localStorage.getItem("template")},a.state={template:a.getTemplate(),time:a.getTime(),price:a.getPrice(),from:a.getFrom(),to:a.getTo(),weekends:a.getWeekends()},a.canGenerateRows=function(){var e=g()(a.state.from);return g()(a.state.to).diff(e,"days")>0},a.generateRows=function(){var e=g()(a.state.from),t=g()(a.state.to).diff(e,"days")+1;if(t>0){var n=Object(d.a)(new Array(t)).map((function(t,n){var r=g()(e).add(n,"day");if(!a.state.weekends||a.state.weekends&&r.day()>=1&&r.day()<=5){var o="",l=a.state.template;return a.state.time&&(o=r.format(a.state.time.replace("{{","").replace("}}","")),l=a.state.template.replace(a.state.time,o)),{name:l,price:a.state.price,key:r.format("X")}}})).filter((function(e){return e}));a.props.onGenerateRows(n),a.props.hideGenerateRowsModal()}},a.updateFrom=function(e){var t=e.getTime();a.setState({from:t}),localStorage.setItem("from",t),a.props.onUpdateState()},a.updateTo=function(e){var t=e.getTime();a.setState({to:t}),localStorage.setItem("to",t),a.props.onUpdateState()},a.updateTemplate=function(e){var t=e.target.value,n=t.indexOf("{{"),r=t.indexOf("}}"),o="";n>=0&&n<r&&(o=t.slice(n,r+2)),a.setState({template:t,time:o}),localStorage.setItem("template",t),localStorage.setItem("time",o),a.props.onUpdateState()},a.onUpdatePrice=function(e){var t=parseFloat(e.target.value);a.setState({price:t}),localStorage.setItem("price",t),a.props.onUpdateState()},a.changeWeekends=function(e){var t=e.target.checked;a.setState({weekends:t}),localStorage.setItem("weekends",t),a.props.onUpdateState()},a.updateDates=function(e){a.updateFrom(e.selection.startDate),a.updateTo(e.selection.endDate)},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"generate-rows-outside",onClick:this.props.hideGenerateRowsModal}),r.a.createElement("div",{className:"generate-rows"},r.a.createElement("label",null,r.a.createElement("span",null,"Template"),r.a.createElement("input",{type:"text",value:this.state.template,onChange:this.updateTemplate})),r.a.createElement("label",null,r.a.createElement("span",null,"Amount"),r.a.createElement("input",{type:"number",value:this.state.price,onChange:this.onUpdatePrice})),r.a.createElement(h.DateRange,{editableDateInputs:!0,onChange:this.updateDates,moveRangeOnFirstSelection:!1,ranges:[{startDate:new Date(this.state.from),endDate:new Date(this.state.to),key:"selection"}]}),r.a.createElement("label",{className:"weekend"},r.a.createElement("span",null,r.a.createElement("input",{type:"checkbox",checked:this.state.weekends,onChange:this.changeWeekends})),"Exclude weekends"),r.a.createElement("p",null,r.a.createElement("button",{onClick:this.generateRows,disabled:!this.canGenerateRows()},"Generate"))))}}]),t}(r.a.PureComponent)),v=(a(44),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).getRowList=function(){var e=localStorage.getItem("rows");if(e)try{return JSON.parse(e)}catch(t){return console.error(t),[]}return[]},a.state={rows:a.getRowList(),showGenerateRowsModal:!1},a.onChangeRowName=function(e,t){var n=a.state.rows.map((function(a){return a.key===t?Object(p.a)({},a,{name:e.currentTarget.textContent}):a}));a.updateRows(n)},a.onChangeRowPrice=function(e,t){var n=a.state.rows.map((function(a){return a.key===t?Object(p.a)({},a,{price:parseFloat(e.currentTarget.textContent)}):a}));a.updateRows(n)},a.getRows=function(){return a.state.rows.map((function(e){return r.a.createElement("tr",{className:e.key},r.a.createElement("td",null,r.a.createElement("span",{contentEditable:!0,onBlur:function(t){return a.onChangeRowName(t,e.key)}},e.name),r.a.createElement("div",{className:"controls"},r.a.createElement("button",{className:"right",onClick:function(){return a.removeRow(e.key)}},"x"))),r.a.createElement("td",null,"$",r.a.createElement("span",{contentEditable:!0,onBlur:function(t){return a.onChangeRowPrice(t,e.key)}},e.price)))}))},a.addRow=function(){var e=[].concat(Object(d.a)(a.state.rows),[{name:"Daily work",price:20,key:Date.now()}]);a.updateRows(e)},a.getTotal=function(){return a.state.rows.reduce((function(e,t){return e+t.price}),0)},a.removeRow=function(e){var t=a.state.rows.filter((function(t){var a=t.key;return e!==a}));a.updateRows(t)},a.removeRows=function(){a.updateRows([])},a.toggleGenerateRowsModal=function(){a.setState({showGenerateRowsModal:!a.state.showGenerateRowsModal})},a.hideGenerateRowsModal=function(){a.setState({showGenerateRowsModal:!1})},a.onGenerateRows=function(e){a.updateRows([].concat(Object(d.a)(a.state.rows),Object(d.a)(e)))},a.updateRows=function(e){a.setState({rows:e}),localStorage.setItem("rows",JSON.stringify(e)),a.props.onUpdateState()},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Description"),r.a.createElement("th",null,"Amount"))),r.a.createElement("tbody",null,this.getRows())),r.a.createElement("div",{className:"add-row-table-controls"},r.a.createElement("button",{className:"left",onClick:this.addRow},"Add row")),r.a.createElement("div",{className:"generate-rows-table-controls"},r.a.createElement("button",{className:"left",onClick:this.toggleGenerateRowsModal},"Generate rows")),this.state.showGenerateRowsModal&&r.a.createElement(E,{hideGenerateRowsModal:this.hideGenerateRowsModal,onGenerateRows:this.onGenerateRows,onUpdateState:this.props.onUpdateState}),this.state.rows.length>0&&r.a.createElement("div",{className:"right-table-controls"},r.a.createElement("button",{className:"right",onClick:this.removeRows},"Remove rows")),r.a.createElement("p",{className:"total"},r.a.createElement("span",null,"Total: "),r.a.createElement("span",{className:"total-number"},"$",this.getTotal())))}}]),t}(r.a.PureComponent)),w=a(11),S=(a(45),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={fromName:localStorage.getItem("fromName")||"Your name",fromAddress:localStorage.getItem("fromAddress")||"123 Street, City, State, Country, Zip Code",fromTelephone:localStorage.getItem("fromTelephone")||"(+1) 123 123 1234",fromEmail:localStorage.getItem("fromEmail")||"your.mail@gmail.com",toName:localStorage.getItem("toName")||"Company name",toAddress:localStorage.getItem("toAddress")||"123 Street, City, State, Country, Zip Code",toTelephone:localStorage.getItem("toTelephone")||"(+1) 123 123 1234",toEmail:localStorage.getItem("toEmail")||"company@gmail.com"},a.updateState=function(e,t){var n=t.target.textContent;a.setState(Object(w.a)({},e,n)),localStorage.setItem(e,n),a.props.onUpdateState()},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"from-to"},r.a.createElement("div",{className:"from"},r.a.createElement("h3",null,"From"),r.a.createElement("p",{className:"name",contentEditable:!0,onBlur:function(t){return e.updateState("fromName",t)}},this.state.fromName),r.a.createElement("p",{className:"address",contentEditable:!0,onBlur:function(t){return e.updateState("fromAddress",t)}},this.state.fromAddress),r.a.createElement("p",{className:"telephone",contentEditable:!0,onBlur:function(t){return e.updateState("fromTelephone",t)}},this.state.fromTelephone),r.a.createElement("p",{className:"email",contentEditable:!0,onBlur:function(t){return e.updateState("fromEmail",t)}},this.state.fromEmail)),r.a.createElement("div",{className:"to"},r.a.createElement("h3",null,"To"),r.a.createElement("p",{className:"name",contentEditable:!0,onBlur:function(t){return e.updateState("toName",t)}},this.state.toName),r.a.createElement("p",{className:"address",contentEditable:!0,onBlur:function(t){return e.updateState("toAddress",t)}},this.state.toAddress),r.a.createElement("p",{className:"telephone",contentEditable:!0,onBlur:function(t){return e.updateState("toTelephone",t)}},this.state.toTelephone),r.a.createElement("p",{className:"email",contentEditable:!0,onBlur:function(t){return e.updateState("toEmail",t)}},this.state.toEmail)))}}]),t}(r.a.PureComponent)),b=(a(46),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).getInvoiceNumber=function(){var e=localStorage.getItem("number")||"INV-1";return document.title="Invoice ".concat(e),e},a.state={date:localStorage.getItem("date")||g()().format("MMM D, YYYY"),dueDate:localStorage.getItem("dueDate")||g()().format("MMM D, YYYY"),number:a.getInvoiceNumber()},a.updateState=function(e,t){a.setState(Object(w.a)({},e,t)),localStorage.setItem(e,t),a.props.onUpdateState()},a.updateNumber=function(e){var t=e.target.textContent;a.updateState("number",t),document.title="Invoice ".concat(t)},a.onChangeDate=function(e){var t=e.target.textContent;a.updateState("date",t)},a.getDueDate=function(){return g()(a.state.dueDate).format("MMM D, YYYY")},a.set30days=function(){var e=g()().add(30,"days").format("MMM D, YYYY");a.updateState("dueDate",e)},a.updateDueDate=function(e){var t=e.target.textContent;a.updateState("dueDate",t)},a.increaseInvoiceNumber=function(){var e=a.state.number,t=e.replace(/\D/g,"");if(!Number.isNaN(+t)){var n=+t+1,r=e.replace(t,n);a.updateState("number",r)}},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"invoice"},r.a.createElement("p",{className:"number"},r.a.createElement("div",{className:"controls"},r.a.createElement("button",{className:"left",onClick:this.increaseInvoiceNumber},"Increase")),r.a.createElement("span",null,"Invoice #: "),r.a.createElement("span",{className:"invoiceNumber",contentEditable:!0,onBlur:this.updateNumber},this.state.number)),r.a.createElement("p",{className:"date"},r.a.createElement("div",{className:"controls"},r.a.createElement("button",{className:"left",onClick:function(){return e.updateState("date",g()().format("MMM D, YYYY"))}},"Set today")),r.a.createElement("span",null,"Date: "),r.a.createElement("span",{contentEditable:!0,onBlur:this.onChangeDate},this.state.date)),r.a.createElement("p",{className:"due"},r.a.createElement("div",{className:"controls"},r.a.createElement("button",{className:"left",onClick:this.set30days},"Set 30 days")),r.a.createElement("span",null,"Due: "),r.a.createElement("span",{contentEditable:!0,onBlur:this.updateDueDate},this.state.dueDate)))}}]),t}(r.a.PureComponent)),N=a(24),y=a.n(N),I=a(25),k=a.n(I),R=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={title:localStorage.getItem("title")||"Invoice",saved:0},a.updateTitle=function(e){var t=e.target.textContent;a.setState({title:t}),localStorage.setItem("title",t),a.onUpdateState()},a.onUpdateState=function(){a.setState({saved:0}),setTimeout((function(){a.setState({saved:Date.now()+2e3}),setTimeout((function(){Date.now()>a.state.saved&&a.setState({saved:0})}),2500)}),300)},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"page"},r.a.createElement("h1",{contentEditable:!0,onBlur:this.updateTitle},this.state.title),r.a.createElement(S,{onUpdateState:this.onUpdateState}),r.a.createElement(b,{onUpdateState:this.onUpdateState}),r.a.createElement(v,{onUpdateState:this.onUpdateState})),r.a.createElement("img",{className:"print",src:y.a,onClick:function(){return window.print()},alt:"print"})),!!this.state.saved&&r.a.createElement("img",{className:"save",src:k.a,alt:"save"}))}}]),t}(r.a.PureComponent);l.a.render(r.a.createElement(R,null),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.e11308eb.chunk.js.map