webpackJsonp([1],{DD8j:function(t,e){},FKgk:function(t,e){},JWv1:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACq0lEQVRYR8WX3W0iMRDHZ7KPIIVUkM0byJZCKghUcFwFSTqACsJVEFJBuAqOVBCuAjjJBh65Ci6R2DfwRMPZ0mph116IhF/X9vw8H/+ZRTjxwhPbh9IAUsoWEd0hYgwALfuAMRFNEfFVKTUu86hgACFEExGfnFEi+oOI72yMiGJEvEzB9LTW0xCQIAAhxL01XjPGPBtjBovFYpk2UK/X4yiK+oh4BwDvRNQOgfAC2JdPAOCDiFq+SzlEADD67xg/RAjAEhFrIcadRyzEGwCMlVLtolAUAljXvwDAD6VUPySmKQje/0hED1rrYd5ZHwBndqyUqpUxznvjOK5Vq9V/RPSqte4cBCCl5Dj+1FrflwXg/VJKLslrpdRFaYBU8pV2vzMmhBhyVSilcj2d++ErAKSU2zw4CMC6kLjuZ7NZ94gQNItyyJeELDaktb46EICVcqqUcpK9c00hgHMhALTLarwr4aPKMFVK0yRJ2svlcqv9vsXnKpXKBBEvVqtVXHQuRAm5D7wQ0TBJkp4Pwhp/Q8Sm7/X8EC8Ab3LlZFtuLy8ctlU/sfFQ9QwCsBBdROSyOrcgIyLadkRWSyLqWMPctLpF8psOYTCAbbePiFioiqGhchBBAKlq4HMfxpjh2dkZJ6SbfnhK4qGENf+c5wEA6Culnn0JWwiQSai/xpjufD7nXp+7uPzYuJ2QRqvV6uGgKsgYL9WQ7NkB9wHOF631TelmZDvZ7TFS7Kqn6I69IWg0Gp0oin75erkvvrZ6eKa4zlPTvQBCCB7DLtfr9VV2+Awxmt6T6qp7x7MdAHfgmEEkCymEGCHiNyK6yQ61OwCu5DabzXdfxod6I9WY+H9hUChELvmKhohQw6nJiH9qJvuScZ8HWFxuvxLADTcA8Ds7GwQpYdkXl9l/coBPN5OaMHbe320AAAAASUVORK5CYII="},LHPf:function(t,e){},NHnr:function(t,e,s){"use strict";function a(t){s("hsBK")}function i(t){s("LHPf"),s("fJY2")}function n(t){s("FKgk")}function r(t){s("SUtC")}function o(t){s("blNW")}function c(t){s("DD8j")}Object.defineProperty(e,"__esModule",{value:!0});var l=s("7+uW"),u=s("v5o6"),d=s.n(u),h=s("/ocq"),m={name:"app"},v=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},p=[],g={render:v,staticRenderFns:p},C=g,f=s("VU/8"),A=a,_=f(m,C,!1,A,null,null),y=_.exports,T=s("Xxa5"),w=s.n(T),b=s("//Fk"),x=s.n(b),S=s("exGp"),D=s.n(S),B=s("mtWM"),E=s.n(B),H=s("Lcq9"),P=s.n(H),R=(s("UZ5h"),s("162o"),P.a,function(){function t(){return e.apply(this,arguments)}var e=D()(w.a.mark(function t(){var e,s,a,i,n,r,o,c,l,u,d,h,m,v;return w.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.name=this.$route.query.name,e=new Date,s=e.getMonth()+1,a=e.getDate(),i={name:this.name},this.openRedBag=this.time_range("05:00","08:00"),this.canJoin=this.time_range("08:00","23:50"),t.next=9,new x.a(function(t,e){E.a.post("/getInfo",i).then(function(e){t(e.data)})});case 9:n=t.sent,this.totalPeople=n.todayJoinCount,this.totalMoney=n.todayJoinCount,this.successPeople=n.hitCardDocs.length,this.failPeople=n.yesterdayJoinDocs.length-n.hitCardDocs.length,null!=n.earlestStar&&(r=n.earlestStar,this.name1=r.name,o=r.hitCardTime,o=new Date(o),c=o.getHours(),l=o.getMinutes(),c<10&&(c="0"+c),l<10&&(l="0"+l),u=String(c+":"+l),this.hitCardTime=u),null!=n.harderStar&&(d=n.harderStar,this.name3=d.name,this.hitCardCount=d.money),null!=n.luckStar&&(h=n.luckStar,this.name2=h.name,this.hitCardMoney=h.getMoney),m=new Date,v=m.getHours(),v>=8?n.todayHaveUser?this.btnText="签到":this.btnText="参与打卡挑战":n.yesterdayHaveUser?this.btnText="签到":this.btnText="参与打卡挑战",v>=5?(this.successPeople=n.hitCardDocs.length,this.failPeople=n.yesterdayJoinDocs.length-n.hitCardDocs.length):(this.successPeople=0,this.failPeople=0);case 21:case"end":return t.stop()}},t,this)}))}(),{components:{CountDown:P.a},data:function(){return{name:name,totalPeople:999999,totalMoney:999999,successPeople:0,failPeople:0,name1:"",name2:"",name3:"",hitCardTime:"",hitCardMoney:0,hitCardCount:0,btnText:"参与打卡挑战",startTime:(new Date).getTime(),currentTime:(new Date).getTime(),openRedBag:!1,canJoin:!1,headPicSrc:"../../static/picture/head.png"}},computed:{endTime:function(){var t=new Date,e=t.getMonth()+1,s=t.getDate()+1,a=t.getDate();if(t.getHours()>=8){var i=new Date("2018-"+e+"-"+s+" 05:00:00").getTime();return i}var i=new Date("2018-"+e+"-"+a+" 05:00:00").getTime();return i}},mounted:function(){function t(){return e.apply(this,arguments)}var e=D()(w.a.mark(function t(){var e,s,a,i,n,r,o,c,l,u,d,h,m,v;return w.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.name=this.$route.query.name,e=new Date,s=e.getMonth()+1,a=e.getDate(),i={name:this.name},this.openRedBag=this.time_range("05:00","08:00"),this.canJoin=this.time_range("08:00","23:50"),t.next=9,new x.a(function(t,e){E.a.post("/getInfo",i).then(function(e){t(e.data)})});case 9:n=t.sent,this.totalPeople=n.todayJoinCount,this.totalMoney=n.todayJoinCount,this.successPeople=n.hitCardDocs.length,this.failPeople=n.yesterdayJoinDocs.length-n.hitCardDocs.length,null!=n.earlestStar&&(r=n.earlestStar,this.name1=r.name,o=r.hitCardTime,o=new Date(o),c=o.getHours(),l=o.getMinutes(),c<10&&(c="0"+c),l<10&&(l="0"+l),u=String(c+":"+l),this.hitCardTime=u),null!=n.harderStar&&(d=n.harderStar,this.name3=d.name,this.hitCardCount=d.money),null!=n.luckStar&&(h=n.luckStar,this.name2=h.name,this.hitCardMoney=h.getMoney),m=new Date,v=m.getHours(),v>=8?n.todayHaveUser?this.btnText="签到":this.btnText="参与打卡挑战":n.yesterdayHaveUser?this.btnText="签到":this.btnText="参与打卡挑战",v>=5?(this.successPeople=n.hitCardDocs.length,this.failPeople=n.yesterdayJoinDocs.length-n.hitCardDocs.length):(this.successPeople=0,this.failPeople=0);case 21:case"end":return t.stop()}},t,this)}));return t}(),methods:{countDownS_cb:function(t){console.log("计时开始")},countDownE_cb:function(t){console.log("计时结束")},join:function(){if("参与打卡挑战"===this.btnText&&this.canJoin){alert("支付成功,参与挑战");var t={info:{name:this.name,money:1}};E.a.post("/join",t).then(function(t){(t.data="ok")&&window.location.reload()})}else"签到"===this.btnText&&this.openRedBag?E.a.post("/successHitCard",{name:this.name}).then(function(t){"ok"==t.data?(alert("签到成功,明天再接再厉!"),window.location.reload()):alert(t.data)}):alert("时间还没到哦")},time_range:function(t,e){var s=t.split(":");if(2!=s.length)return!1;var a=e.split(":");if(2!=a.length)return!1;var i=new Date,n=new Date,r=new Date;return i.setHours(s[0]),i.setMinutes(s[1]),n.setHours(a[0]),n.setMinutes(a[1]),r.getTime()-i.getTime()>0&&r.getTime()-n.getTime()<0},gotoMy:function(){this.$router.replace({path:"/My",query:{name:this.name}})}}}),k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contain"},[a("div",{staticClass:"head"},[a("img",{staticClass:"bg",attrs:{src:s("k7nE"),alt:""}}),t._v(" "),a("div",{staticClass:"info"},[a("div",{staticClass:"infoText1"},[t._v("明早参与打卡挑战的人数")]),t._v(" "),a("div",{staticClass:"peopleCount"},[t._v(t._s(t.totalPeople))]),t._v(" "),a("div",{staticClass:"infoText2"},[t._v("当前共有"),a("span",{staticClass:"totalMoney"},[t._v(t._s(t.totalMoney))]),t._v("元打卡金")])])]),t._v(" "),a("div",{staticClass:"body"},[a("div",{staticClass:"join"},[a("div",{staticClass:"joinText",on:{click:t.join}},[t._v("\n                "+t._s(t.btnText)+"\n            ")]),t._v(" "),a("router-link",{attrs:{to:"/Rule"}},[a("div",{staticClass:"joinRule"},[t._v("\n                    挑战规则 >>\n                ")])]),t._v(" "),a("div",[a("count-down",{staticClass:"timer",attrs:{currentTime:t.currentTime,startTime:t.startTime,endTime:t.endTime,tipText:"距离开始文字1",tipTextEnd:"距离结束文字1",endText:"结束自定义文字2",dayTxt:"天",hourTxt:"小时",minutesTxt:"分钟",secondsTxt:"秒"},on:{start_callback:function(e){t.countDownS_cb(1)},end_callback:function(e){t.countDownE_cb(1)}}})],1)],1),t._v(" "),a("div",{staticClass:"situation"},[a("div",{staticClass:"todaySituation"},[a("div",{staticClass:"title"},[t._v("今日打卡战况")]),t._v(" "),a("div",{staticClass:"situationText"},[t._v("\n                    "+t._s(t.successPeople)+"人打卡成功,"+t._s(t.failPeople)+"人打卡失败\n                ")])]),t._v(" "),a("div",{staticClass:"users"},[a("div",{staticClass:"user"},[a("div",{staticClass:"userHead"},[a("img",{staticClass:"headPic",attrs:{src:t.headPicSrc,alt:""}})]),t._v(" "),a("div",{staticClass:"userTitle color1"},[t._v("早起之星")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t.name1))]),t._v(" "),a("div",{staticClass:"describe"},[t._v(t._s(t.hitCardTime)+"打卡")])]),t._v(" "),a("div",{staticClass:"user"},[a("div",{staticClass:"userHead"},[a("img",{staticClass:"headPic",attrs:{src:t.headPicSrc,alt:""}})]),t._v(" "),a("div",{staticClass:"userTitle color2"},[t._v("运气之星")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t.name2))]),t._v(" "),a("div",{staticClass:"describe"},[t._v(t._s(t.hitCardMoney)+"元")])]),t._v(" "),a("div",{staticClass:"user"},[a("div",{staticClass:"userHead"},[a("img",{staticClass:"headPic",attrs:{src:t.headPicSrc,alt:""}})]),t._v(" "),a("div",{staticClass:"userTitle color3"},[t._v("毅力之星")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t.name3))]),t._v(" "),a("div",{staticClass:"describe"},[t._v("连续"+t._s(t.hitCardCount)+"次")])])])])]),t._v(" "),a("div",{staticClass:"foot"},[t._m(0),t._v(" "),a("div",{staticClass:"tab",on:{click:t.gotoMy}},[a("img",{staticClass:"tabIcon",attrs:{src:s("JWv1"),alt:""}}),t._v(" "),a("div",{staticClass:"tabName"},[t._v("我的")])])])])},K=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tab"},[a("img",{staticClass:"tabIconHome",attrs:{src:s("O/YH"),alt:""}}),t._v(" "),a("div",{staticClass:"tabName Home"},[t._v("首页")])])}],M={render:k,staticRenderFns:K},Q=M,U=s("VU/8"),N=i,J=U(R,Q,!1,N,"data-v-716b02b6",null),V=J.exports,Y=(function(){function t(){return e.apply(this,arguments)}var e=D()(w.a.mark(function t(){var e=this;return w.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.name=this.$route.query.name,E.a.post("/meGetInfo",{name:this.name}).then(function(t){e.hitCard=t.data.totalHitCard.length;for(var s=t.data.totalHitCard,a=0,i=0;i<s.length;i++)a+=a;e.pay=t.data.totalMoney,e.harvest=t.data.harvest,e.infos=s});case 2:case"end":return t.stop()}},t,this)}))}(),{data:function(){return{name:name,pay:0,harvest:0,hitCard:0,infos:[],headPicSrc:"../../static/picture/bg.jpg"}},mounted:function(){function t(){return e.apply(this,arguments)}var e=D()(w.a.mark(function t(){var e=this;return w.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.name=this.$route.query.name,E.a.post("/meGetInfo",{name:this.name}).then(function(t){e.hitCard=t.data.totalHitCard.length;for(var s=t.data.totalHitCard,a=0,i=0;i<s.length;i++)a+=a;e.pay=t.data.totalMoney,e.harvest=t.data.harvest,e.infos=s});case 2:case"end":return t.stop()}},t,this)}));return t}(),methods:{gotoHome:function(){this.$router.replace({path:"/Home",query:{name:this.name}})}}}),I=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contain"},[a("div",{staticClass:"head"},[a("img",{staticClass:"bg",attrs:{src:t.headPicSrc,alt:""}}),t._v(" "),a("div",{staticClass:"me"},[a("img",{staticClass:"myHeadPic",attrs:{src:s("kHPd"),alt:""}}),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                "+t._s(t.name)+"\n            ")])]),t._v(" "),a("div",{staticClass:"infos"},[a("div",{staticClass:"info"},[a("div",{staticClass:"infoTitle"},[t._v("我的付出(元)")]),t._v(" "),a("div",{staticClass:"infoCount"},[t._v(t._s(t.pay))])]),t._v(" "),a("div",{staticClass:"info"},[a("div",{staticClass:"infoTitle"},[t._v("我的收获(元)")]),t._v(" "),a("div",{staticClass:"infoCount"},[t._v(t._s(t.harvest))])]),t._v(" "),a("div",{staticClass:"info"},[a("div",{staticClass:"infoTitle"},[t._v("累计打卡(天)")]),t._v(" "),a("div",{staticClass:"infoCount"},[t._v(t._s(t.hitCard))])])])]),t._v(" "),a("div",{staticClass:"body"},[a("div",{staticClass:"title"},[t._v("战绩明细")]),t._v(" "),a("div",{staticClass:"details"},t._l(t.infos,function(e,s){return a("div",{key:s,staticClass:"detail"},[a("div",{staticClass:"date"},[t._v(t._s(new Date(e.hitCardTime).getMonth()+1)+"-"+t._s(new Date(e.hitCardTime).getDate()))]),t._v(" "),a("div",{staticClass:"hitCard"},[t._v("已打卡")]),t._v(" "),a("div",{staticClass:"money"},[t._v("+"+t._s(e.getMoney))])])}))]),t._v(" "),a("div",{staticClass:"foot"},[a("div",{staticClass:"tab",on:{click:t.gotoHome}},[a("img",{staticClass:"tabIconHome",attrs:{src:s("WmhZ"),alt:""}}),t._v(" "),a("div",{staticClass:"tabName Home"},[t._v("首页")])]),t._v(" "),t._m(0)])])},L=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tab"},[a("img",{staticClass:"tabIcon",attrs:{src:s("xYSg"),alt:""}}),t._v(" "),a("div",{staticClass:"tabName My"},[t._v("我的")])])}],j={render:I,staticRenderFns:L},O=j,q=s("VU/8"),F=n,G=q(Y,O,!1,F,"data-v-f749ad7a",null),W=G.exports,Z=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},X=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"app"},[s("div",{staticClass:"contain"},[s("div",{staticClass:"title"},[t._v("活动规则")]),t._v(" "),s("div",{staticClass:"ruleText"},[t._v("\n1、每日支付1元参与早起打卡,放入早起打卡鼓励金奖池。"),s("br"),t._v("\n2、次日早晨5:OO至8:OO为早起打卡时间用户在此期间进行\n打卡，成功打卡即可随机分得当日奖池内全部鼓励金，奖金\n设置下限最低1元，不设上限。"),s("br"),t._v("\n3、未在次日早晨5:OO至8:OO内进行打卡视为打卡失败，打\n卡失败不可参与当日鼓励金的分配。"),s("br"),t._v("\n4、当日5:OO之前不能支付不能参与当日打卡。"),s("br"),t._v("\n5、每日瓜分金额于早8点后开始结算，当日9点前下发到本\n人账户余额中。"),s("br"),t._v("\n6、用户可通过微信支付、账户余额支付参与打卡。如出现重\n复支付或全部参与用户均未打卡情况，奖金将原路返回支付\n账户中。"),s("br"),t._v("\n7、同一手机号、身份证号、微信号、设备号视为同一用户。"),s("br"),t._v("\n8、早起打卡是倡导养成早起好习惯的营销活动，系统随机\n开奖，平台不收取任何费用，仅供娱乐参与。"),s("br"),t._v("\n9、每日23:50至24:OO为系统结算时间,不可进行支付操作。"),s("br")])])])}],z={render:Z,staticRenderFns:X},$=z,tt=s("VU/8"),et=r,st=tt(null,$,!1,et,"data-v-1a52c878",null),at=st.exports,it={data:function(){return{username:"",password:"",passwordAgain:""}},methods:{logup:function(){var t=this;if(this.password.length<=4)alert("密码长度必须大于四位");else if(this.password!==this.passwordAgain)alert("两次输入的密码不一致");else{var e={username:this.username,password:this.password};E.a.post("/logup",e).then(function(e){"ok"===e.data&&(alert("注册成功"),t.$router.push({path:"/"}))})}}}},nt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"contain"},[s("h1",[t._v("注册")]),t._v(" "),s("span",{staticClass:"simpleStyle"},[t._v("用户名")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"inputStyle",attrs:{type:"text"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),t._v(" "),s("span",{staticClass:"simpleStyle"},[t._v("密码")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"inputStyle",attrs:{type:"text"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),s("span",{staticClass:"simpleStyle"},[t._v("确认密码")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.passwordAgain,expression:"passwordAgain"}],staticClass:"inputStyle",attrs:{type:"text"},domProps:{value:t.passwordAgain},on:{input:function(e){e.target.composing||(t.passwordAgain=e.target.value)}}}),t._v(" "),s("button",{staticClass:"simpleStyle btn",on:{click:t.logup}},[t._v("注册")])])},rt=[],ot={render:nt,staticRenderFns:rt},ct=ot,lt=s("VU/8"),ut=o,dt=lt(it,ct,!1,ut,"data-v-0d5d4127",null),ht=dt.exports,mt={data:function(){return{username:"",password:""}},methods:{login:function(){var t=this,e={username:this.username,password:this.password};E.a.post("/login",e).then(function(e){"ok"===e.data?(alert("登录成功"),t.$router.push({path:"/Home",query:{name:t.username}})):alert(e.data)})}}},vt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"contain"},[s("h1",[t._v("登录")]),t._v(" "),s("span",{staticClass:"simpleStyle"},[t._v("用户名")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"inputStyle",attrs:{type:"text"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),t._v(" "),s("span",{staticClass:"simpleStyle"},[t._v("密码")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"inputStyle",attrs:{type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),s("button",{staticClass:"simpleStyle btn",on:{click:t.login}},[t._v("登录")]),t._v(" "),s("router-link",{attrs:{to:"/Logup"}},[s("div",{staticClass:"gotoLogup"},[t._v("点我注册账号")])])],1)},pt=[],gt={render:vt,staticRenderFns:pt},Ct=gt,ft=s("VU/8"),At=c,_t=ft(mt,Ct,!1,At,"data-v-98a9287a",null),yt=_t.exports;l.a.use(h.a);var Tt=[{path:"/",component:yt},{path:"/My",component:W},{path:"/Rule",component:at},{path:"/Logup",component:ht},{path:"/Home",component:V}],wt=new h.a({routes:Tt});d.a.attach(document.body),l.a.config.productionTip=!1,new l.a({router:wt,render:function(t){return t(y)}}).$mount("#app-box")},"O/YH":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACF0lEQVRYR+2XQVIaQRSG/58SWWbCBRKrAlu9gXoDPEFwGVgEThA9AbgAl+AJ5AbqDcxWrDK5ANVZEiye1Y0zzvT02DNYlbiA5TD93tf///5XNcR//nHd/kHvIShtL3r6/PJvuau6O2qdWmsBBIO7PQIjknu6qYjcCnCs2vXbohCFAYLhfYMiIxJBvJkIlJDHqvVlUgSiEEB1cN8H5bunQX/WqnXzQuQC0H6z8nhJ4CBPYQGuZb51lGcuvAArv3llS26GDzA3LQFmGFOWQA59c/EqQDCcdjKK/xZIIyxuIMlrAh9skKVIR7XrZ1nKOQGiiJHN1M2AG5lvNWx5n22aENhPNRMZZ0U1BWBHLKkrTmft2ol+lrUHqoPpCYgfaUvcUU0AZEYM+CNgM4yYbw+YOpCxbYkrqhFAVsQE8lNYbqhvO7/MzQd3TYI95x6AdFW7PjbvnT98piwmBHcd/kdRpfFue3EVbjVrli+W83JH+/3aXFjjH/ltzlQWfYBfHbNkosqPw6nKmF69Wle3sVavbxfYq1mrViJHrqiyOpyKlV87Yk7J/RBQErdktU8mJD7FzyYAJBax3JL7SRKWsPKYiOoLgMQiVlByP0MygvGomhmwIraW5H4Iy5IwqjouYcR0EXsmfIWL/j9r1aLom6jaBf4lgO69ASisQNxDl/8+C+3zG4CNAhsF3p8CRXf7W9/3fpi8tYHv/BMda47MNWcRqwAAAABJRU5ErkJggg=="},SUtC:function(t,e){},UGa2:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=(String,String,String,Number,Number,Number,String,String,String,String,String,Boolean,{replace:!0,data:function(){return{tipShow:!0,msTime:{show:!1,day:"",hour:"",minutes:"",seconds:""},star:"",end:"",current:""}},watch:{currentTime:function(t,e){this.gogogo()}},props:{tipText:{type:String,default:"距离开始"},tipTextEnd:{type:String,default:"距离结束"},id:{type:String,default:"1"},currentTime:{type:Number},startTime:{type:Number},endTime:{type:Number},endText:{type:String,default:"已结束"},dayTxt:{type:String,default:":"},hourTxt:{type:String,default:":"},minutesTxt:{type:String,default:":"},secondsTxt:{type:String,default:":"},secondsFixed:{type:Boolean,default:!1}},mounted:function(){console.log(this),this.gogogo()},methods:{gogogo:function(){var t=this;10==this.startTime.toString().length?this.star=1e3*this.startTime:this.star=this.startTime,10==this.endTime.toString().length?this.end=1e3*this.endTime:this.end=this.endTime,this.currentTime?10==this.currentTime.toString().length?this.current=1e3*this.currentTime:this.current=this.currentTime:this.current=(new Date).getTime(),this.end<this.current?(this.msTime.show=!1,this.end_message()):this.current<this.star?(this.$set(this,"tipShow",!0),setTimeout(function(){t.runTime(t.star,t.current,t.start_message)},1)):(this.end>this.current&&this.star<this.current||this.star==this.current)&&(this.$set(this,"tipShow",!1),this.msTime.show=!0,this.$emit("start_callback",this.msTime.show),setTimeout(function(){t.runTime(t.end,t.star,t.end_message,!0)},1))},runTime:function(t,e,s,a){var i=this,n=this.msTime,r=t-e;if(r>0){this.msTime.show=!0,n.day=Math.floor(r/864e5),r-=864e5*n.day,n.hour=Math.floor(r/36e5),r-=36e5*n.hour,n.minutes=Math.floor(r/6e4),r-=6e4*n.minutes,n.seconds=Math.floor(r/1e3).toFixed(0),r-=1e3*n.seconds,n.hour<10&&(n.hour="0"+n.hour),n.minutes<10&&(n.minutes="0"+n.minutes),n.seconds<10&&(n.seconds="0"+n.seconds);var o=Date.now(),c=Date.now(),l=c-o;setTimeout(function(){a?i.runTime(i.end,e+=1e3,s,!0):i.runTime(i.star,e+=1e3,s)},1e3-l)}else s()},start_message:function(){var t=this;this.$set(this,"tipShow",!1),this.$emit("start_callback",this.msTime.show),setTimeout(function(){t.runTime(t.end,t.star,t.end_message,!0)},1)},end_message:function(){this.msTime.show=!1,this.currentTime<=0||this.$emit("end_callback",this.msTime.show)}}}),i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.msTime.show?s("p",[t.msTime.day>0?s("span",[s("span",[t._v(t._s(t.msTime.day))]),s("i",[t._v(t._s(t.dayTxt))])]):t._e(),t._v(" "),s("span",[t._v(t._s(t.msTime.hour))]),s("i",[t._v(t._s(t.hourTxt))]),t._v(" "),s("span",[t._v(t._s(t.msTime.minutes))]),s("i",[t._v(t._s(t.minutesTxt))]),t._v(" "),s("span",[t._v(t._s(t.msTime.seconds))]),s("i",[t._v(t._s(t.secondsTxt))])]):t._e()])},n=[],r={render:i,staticRenderFns:n},o=r,c=s("VU/8"),l=c(a,o,!1,null,null,null);e.default=l.exports},WmhZ:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACCElEQVRYR+2XUU7CQBCGZ+gjTeQG8ghsE72BegM8gXAC4QTqCcQTgCeQG4A30GQ38Ig3wKR93IyZpm3Kdsu2kKgP9IUEOrPf/v/8k4Dwxw8een673W41m81nro+iaLzZbLaH9DoIQAhxCQBTRORPIKIPABgqpfiz1lMboNvt9j3PmwJAyzhpq7UerlareR2CWgC9Xm/SaDTu9x1ARBOl1LgqRCUA9tv3/TcAuK7YeBmG4W2VuXACsN+IuLBIzt7HN0XEeBhNS4joxjUXewGEECNbcyL6AoB+2jyBXALAmQVkJKV8KVPOCpBGDBEHlsL3MAz7pryJTTyAV2YNEc3KoloAMCNmNHuSUj7yd2V7IAgC/v3BAmGN6g7Anoh9a60HacRceyDpM7NYUohqBlAWMSL61Fr31+v1hm8lhBgkc1HYAzyUSik+GDqdTtvzvDkiXljUyKKKiZSLdKvlXyai1yiKRuy3Yy6ysrzfSc0EEe8ssxRHFYMg4B1emF4i4tUa38YxF4Xe5mpOVOPtWYgqA5BxazNiZZK7dtI2b0lyCbbkPF9oAmQRqyq5i8K0xPf9najmAbKI1ZW8AsROBPNRjWfAiNihkrs4dixJo4oclzRi3MGcCVfXur9LKbPo89mFTfibAAx/AqitQN5Dm/8uC836E8BJgZMC/0+Burv92Pedf0yOPcBV/wM2CnqoedOadgAAAABJRU5ErkJggg=="},blNW:function(t,e){},fJY2:function(t,e){},hsBK:function(t,e){},k7nE:function(t,e,s){t.exports=s.p+"static/img/bg2.e130f2b.jpg"},kHPd:function(t,e,s){t.exports=s.p+"static/img/head.684f129.png"},xYSg:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC0ElEQVRYR8WWTVLbQBCFXysQlpG5QOwq5C1wgtgniHMCYIm0sU+AcwLDwmYZ5wQxJ4CcAGdrpQpyAUtZglPzUiNZtss/o5FJCm01M/313+sWvPInr2wfhQHc67DmKJ5QpCxATTtA4E6AoRLcxOfeXRGnrAHc7uhIRDpzo/wBSJwYI8oieJ/BkGzFQXVoA2IF4HZHpwLpiMAF5Uo5by7j88rjogH3+qHscNIG5IRETLBuA5ELoD13RO4J/CZZy3tUp0iIAQjaQOQClLrhIwSujfEsIkmdELe6NiLfq5tSYQTQoXdEvoD4PA68tk1OszP73bANwYUiz+Kg2t901whQ6o2GgJQj33OLGNdn3c6D6+z9iUjcRIHX2ApgvxcS4NexXz0tCqDPl3rhHYjDKPBKhQGy4tsm/LM09EZ93RVj39sY6Y0//gnAtA62AtBeJCmgXI2Dg+bWKQCOTDVkLsKkBcnIr1a2BNBKOYx8L5HsdZ8RYNZKgnpRjc9a+EVtOG8lDvm8W49blVT7cz59T/Ym94CU+LRTNt3LVcK5GLGvnndbeRCJ8beTWxE5yvNe+5ELkBZj2k4kh3SktSkdyRxQ7Gjjtu1rBZAoWy9sCtAW4J0GEUcGipJMREdYpmJDG54OraZJfhczaA+gx62aXEDErIq0S1UGYQWQdYO+pD0USh9grBwk24+jUIOOAqSRRijZB9pxUL3KK1jzNFwoKBK/KNKM/YOB6dHp8tLWGxKBAZ92zrbqgsVqLjqQ0vadXGaFGwXV48JCpCeZAB9eIsVZ95jeWJsCt/ez4YDf8mZ5Xn7TkTwaCuRQbVDTtQB6DdM5VLJTWV4+bYwunlnYKdeuZysAszH8gkVkGbLUDQci+KjI4+WldgVgNoAgn/Iq3jYas8EEtGLfuzQKUVZ8piXC1nB2br7crO4WKxH4HwDpPAlJ4PvybmClhEU9LnL+1QH+Am/7lTCajIfxAAAAAElFTkSuQmCC"}},["NHnr"]);
//# sourceMappingURL=app.02c3fb5c13c7025acbe0.js.map