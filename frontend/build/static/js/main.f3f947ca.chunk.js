(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{22:function(e,t,a){e.exports=a(48)},27:function(e,t,a){},29:function(e,t,a){},47:function(e,t,a){},48:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(20),i=a.n(r),c=(a(27),a(21)),o=a(1),l=a.n(o),u=a(4),d=a(6),p=a(7),m=a(9),h=a(8),f=a(3),v=a(10),k=(a(29),a(5)),b=a.n(k),g=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).handleReqErrors=function(e){if(e.response)if(401===e.response.status){alert("Session expired\nKindly login again"),sessionStorage.removeItem("authToken"),a.props.sessionExpired()}else alert("Server Error");else alert("Server Error")},a.state={todoList:[],activeItem:{id:null,title:"",completed:!1},editing:!1},a.fetchTasks=a.fetchTasks.bind(Object(f.a)(a)),a.handleChange=a.handleChange.bind(Object(f.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(f.a)(a)),a.getCookie=a.getCookie.bind(Object(f.a)(a)),a.startEdit=a.startEdit.bind(Object(f.a)(a)),a.deleteItem=a.deleteItem.bind(Object(f.a)(a)),a.strikeUnstrike=a.strikeUnstrike.bind(Object(f.a)(a)),a.accessToken=sessionStorage.getItem("authToken"),a.baseUrl="https://todo-djapp.herokuapp.com/api",a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"getCookie",value:function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var a=document.cookie.split(";"),n=0;n<a.length;n++){var s=a[n].trim();if(s.substring(0,e.length+1)===e+"="){t=decodeURIComponent(s.substring(e.length+1));break}}return t}},{key:"componentDidMount",value:function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchTasks();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"fetchTasks",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.get("".concat(this.baseUrl,"/v1/task-list/"),{headers:{Authorization:"Bearer ".concat(this.accessToken)}});case 3:t=e.sent,this.setState({todoList:t.data}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),this.handleReqErrors(e.t0);case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(){return e.apply(this,arguments)}}()},{key:"handleChange",value:function(e){var t=e.target.value;this.setState({activeItem:Object(c.a)({},this.state.activeItem,{title:t})})}},{key:"handleSubmit",value:function(){var e=Object(u.a)(l.a.mark((function e(t){var a,n,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a=this.getCookie("csrftoken"),n="".concat(this.baseUrl,"/v1/task-create/"),!0===this.state.editing&&(n="".concat(this.baseUrl,"/v1/task-update/").concat(this.state.activeItem.id,"/"),this.setState({editing:!1})),s={headers:{"Content-type":"application/json","X-CSRFToken":a,Authorization:"Bearer ".concat(this.accessToken)}},e.prev=5,e.next=8,b.a.post(n,this.state.activeItem,s);case 8:return e.sent,e.next=11,this.fetchTasks();case 11:this.setState({activeItem:{id:null,title:"",completed:!1}}),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(5),this.handleReqErrors(e.t0);case 17:case"end":return e.stop()}}),e,this,[[5,14]])})));return function(t){return e.apply(this,arguments)}}()},{key:"startEdit",value:function(e){this.setState({activeItem:e,editing:!0})}},{key:"deleteItem",value:function(){var e=Object(u.a)(l.a.mark((function e(t){var a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=this.getCookie("csrftoken"),n={headers:{"Content-type":"application/json","X-CSRFToken":a,Authorization:"Bearer ".concat(this.accessToken)}},e.prev=2,e.next=5,b.a.delete("".concat(this.baseUrl,"/v1/task-delete/").concat(t.id,"/"),n);case 5:return e.sent,e.next=8,this.fetchTasks();case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),this.handleReqErrors(e.t0);case 13:case"end":return e.stop()}}),e,this,[[2,10]])})));return function(t){return e.apply(this,arguments)}}()},{key:"strikeUnstrike",value:function(){var e=Object(u.a)(l.a.mark((function e(t){var a,n,s,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.completed=!t.completed,a=this.getCookie("csrftoken"),n="".concat(this.baseUrl,"/v1/task-update/").concat(t.id,"/"),s={headers:{"Content-type":"application/json","X-CSRFToken":a,Authorization:"Bearer ".concat(this.accessToken)}},e.prev=4,r={completed:t.completed,title:t.title},e.next=8,b.a.post(n,r,s);case 8:return e.sent,e.next=11,this.fetchTasks();case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(4),this.handleReqErrors(e.t0);case 16:case"end":return e.stop()}}),e,this,[[4,13]])})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.todoList,t=this;return s.a.createElement("div",{className:"container"},s.a.createElement("div",{id:"task-container"},s.a.createElement("div",{id:"form-wrapper"},s.a.createElement("form",{onSubmit:this.handleSubmit,id:"form"},s.a.createElement("div",{className:"flex-wrapper"},s.a.createElement("div",{style:{flex:6}},s.a.createElement("input",{onChange:this.handleChange,className:"form-control",id:"title",value:this.state.activeItem.title,type:"text",name:"title",placeholder:"Add task.."})),s.a.createElement("div",null,s.a.createElement("input",{id:"submit",className:"btn btn-warning",type:"submit",name:"Add"}))))),s.a.createElement("div",{id:"list-wrapper"},null!=e&&0!==e.length&&e.map((function(e,a){return s.a.createElement("div",{key:a,className:"task-wrapper flex-wrapper"},s.a.createElement("div",{onClick:function(){return t.strikeUnstrike(e)},style:{flex:7}},!1===e.completed?s.a.createElement("span",null,e.title):s.a.createElement("strike",null,e.title)),s.a.createElement("div",{style:{flex:1}},s.a.createElement("button",{onClick:function(){return t.startEdit(e)},className:"btn btn-sm btn-outline-info"},"Edit")),s.a.createElement("div",{style:{flex:1}},s.a.createElement("button",{onClick:function(){return t.deleteItem(e)},className:"btn btn-sm btn-outline-dark delete"},"-")))})))))}}]),t}(s.a.Component),E=(a(47),function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).login=Object(u.a)(l.a.mark((function e(){var t,n,s,r,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=a.state,n=t.emailInput,s=t.passInput,0!==n.length&&0!==s.length){e.next=5;break}return"Please fill in all fields",alert("Please fill in all fields"),e.abrupt("return");case 5:return e.prev=5,a.setState({displayLoading:!0}),r={email:n,password:s},e.next=10,b.a.post("".concat(a.baseUrl,"/auth/login/"),r);case 10:i=e.sent,sessionStorage.setItem("authToken",i.data.access),sessionStorage.setItem("refreshToken",i.data.refresh),a.setState({signedIn:!0}),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(5),e.t0.response&&401===e.t0.response.status?("Invalid Credentials\nUse email: test@mail.com and password: test123",alert("Invalid Credentials\nUse email: test@mail.com and password: test123")):alert("Server Error");case 19:a.setState({displayLoading:!1});case 20:case"end":return e.stop()}}),e,null,[[5,16]])}))),a.sessionExpired=function(){a.setState({signedIn:!1})},a.renderLogin=function(){var e=a.state.displayLoading;return s.a.createElement("div",{className:"signin-body"},s.a.createElement("p",{className:"c "},"Login to access"),s.a.createElement("div",{className:"signin-form"},s.a.createElement("form",{style:{border:"1px solid #ccc"}},s.a.createElement("div",{className:"container",style:{paddingBottom:"5%"}},s.a.createElement("label",{htmlFor:"email"},s.a.createElement("b",null,"Email")),s.a.createElement("input",{type:"text",placeholder:"Use test@mail.com",name:"email",required:!0,onChange:function(e){a.setState({emailInput:e.target.value})},value:a.state.emailInput}),s.a.createElement("label",{htmlFor:"psw"},s.a.createElement("b",null,"Password")),s.a.createElement("input",{type:"password",placeholder:"Use test123",name:"psw",required:!0,onChange:function(e){a.setState({passInput:e.target.value})},value:a.state.passInput}),!e&&s.a.createElement("div",{className:"clearfix"},s.a.createElement("button",{type:"button",className:"signupbtn",onClick:a.login},"Login")),e&&s.a.createElement("div",{className:"spinner-border",role:"status"},s.a.createElement("span",{className:"sr-only"},"Loading..."))))))},a.state={signedIn:!1,emailInput:"",passInput:"",displayLoading:!1},a.baseUrl="https://todo-djapp.herokuapp.com/api",a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){null!=sessionStorage.getItem("authToken")&&this.setState({signedIn:!0})}},{key:"render",value:function(){var e=this.state.signedIn;return s.a.createElement(s.a.Fragment,null,!e&&this.renderLogin(),e&&s.a.createElement(g,{sessionExpired:this.sessionExpired}))}}]),t}(s.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[22,1,2]]]);
//# sourceMappingURL=main.f3f947ca.chunk.js.map