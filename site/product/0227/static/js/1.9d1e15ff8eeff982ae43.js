webpackJsonp([1],{"3Ea+":function(t,s,e){t.exports=e.p+"static/img/bg_daifahuo@2x.6c1e028.png"},"52IZ":function(t,s,e){t.exports=e.p+"static/img/bg_yiquxiao@2x.5797fe2.png"},"65T0":function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAA4VBMVEX////5+fn9/f37+/vv7+/y8vLm5ubQ0NAYGBj29vbq6urNzc2srKw+Pj4rKyslJSXDw8Ps7Ozk5OTV1dW+vr6zs7OpqamRkZGDg4Nra2tWVlZLS0s7Ozs4ODggICAaGhrKysq5ubmnp6eTk5NbW1tOTk5HR0c1NTUvLy8tLS0oKCgcHBzf39/c3NzIyMi1tbWlpaWjo6OXl5d/f39kZGRiYmJRUVFKSkpERERBQUEyMjLFxcWbm5uHh4d3d3dxcXFubm5AQEATExPS0tJ7e3t1dXWwsLCfn5+Ojo5nZ2deXl7/99hvAAAB50lEQVQ4y9WT53KjMBSFEd10G9MNuGFa3HuJW5Jt7/9Auwhnxwjs38n5c0fSN3OO7pWwbydC7fXFSBL7xlvtCYbv+x7r2ovftpum28lDlLRkad5ucCTJ0W1zw/bVau4lYE8MRdwyUC89+dKs4uqON2ngdzmosSvyFfne/R6HF6NM4yVdAhX5RONoaCN5LfXFjpmcoxhN4KncRbWlIQLynpkfthe7RI4WCrxUrcsaCPjKtuHRyAlNQTNFJ78ws10jYNCioe8y1DlA1PWNxWTrxlGuF8FwxWVl6FqNrNJnZ5pVrucjIdMFmZUfiQDg+nD5gPfW2VER9JfQQpC1fDTCwIJgl1WKoLSG1nxs5pnUqQYj/GLfiuAqgtnIpahTsK8AwPmfZRJpT7qHnoqzmR8Elfhsr+gg42r6M/j8wEGMxdUE5LtAS+dYUWC7vs2fmX1Y2g2kjx6DIer5HVB6AEorwEvPdrdqoHv0u6RjJRks+klAJ7JqZZAcuEzBHFf/tHisQrp/HN4nombevPqznq9G/d44tuG0qszlbu0/195A40oxg+izR2Dcl7rYQ+1brSaAXHPtGTj2WOPdRQH/OCXYmQT2TN1kOwLEKEh+1rDnEiR3Nh5IU5jgqTrh9RoKiG+l+JPdxLGvpL9w1iqWVbGPLwAAAABJRU5ErkJggg=="},"7ord":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r={render:function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("div",{staticClass:"sort"},[r("div",{staticClass:"selected-sort",on:{click:t.toggleStatusList}},[t._v(t._s(t.selectedSort)+" "),r("img",{class:{hide:t.popupVisibleSort},attrs:{src:e("CdBE"),alt:""}})]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.popupVisibleSort,expression:"popupVisibleSort"}],staticClass:"popup-sort"},[r("ul",t._l(t.statusList,function(s,e){return r("li",{key:s.id,class:{active:t.curIndex===e},on:{click:function(s){t.selecteStatus(e)}}},[t._v(t._s(s.title))])}))]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.popupVisibleSort,expression:"popupVisibleSort"}],staticClass:"popup-bg",on:{click:function(s){t.popupVisibleSort=!1}}})])},staticRenderFns:[]};var i=e("Z0/y")({data:function(){return{selectedSort:"全部",popupVisibleSort:!1,curIndex:0,statusList:[{id:"",title:"全部"},{id:"1",title:"待开奖"},{id:"2",title:"待发货"},{id:"3",title:"待收货"},{id:"4",title:"已完成"},{id:"5",title:"已取消"}]}},created:function(){this.selecteStatus(0)},methods:{toggleStatusList:function(){this.popupVisibleSort=!this.popupVisibleSort,this.$emit("closeFilter")},selecteStatus:function(t){this.popupVisibleSort=!1,this.curIndex=t,this.selectedSort=this.statusList[t].title,this.$emit("changeStatus",this.statusList[t].id)}}},r,!1,function(t){e("ND7J")},null,null).exports,a=e("kGIt"),n={data:function(){return{orderStatus:["","待开奖","待发货","待收货","已完成","已取消"]}},props:{status:{type:String,default:""},changeFlag:{type:Boolean,default:!1}},computed:{queryParamList:function(){return[{field:"status",type:"string",logic:"=",value:this.status,items:[]}]}},components:{loadmore:a.a}},o={render:function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("loadmore",{attrs:{apiMethod:"orderList",queryParamList:t.queryParamList,changeFlag:t.changeFlag},scopedSlots:t._u([{key:"item",fn:function(s){return r("div",{staticClass:"order-list-content"},[r("router-link",{staticClass:"order-list-item",attrs:{to:{path:"/order-detail",query:{id:s.item.id}}}},[r("div",{staticClass:"order-list-item-hd"},[r("span",{staticClass:"order-list-item-id"},[t._v("订单号："+t._s(s.item.orderCode))]),t._v(" "),r("div",{staticClass:"order-list-status"},[t._v("\n          "+t._s(t.orderStatus[s.item.status])+"\n        ")])]),t._v(" "),r("div",{staticClass:"order-list-item-bd product-item"},[r("div",{staticClass:"product-img-wrap"},[r("img",{attrs:{src:"/api_images"+s.item.phiOrderInfo.productImg,alt:""}})]),t._v(" "),r("div",{staticClass:"product-info-wrap"},[r("p",{staticClass:"product-title"},[t._v(t._s(s.item.phiOrderInfo.productName))]),t._v(" "),r("p",{staticClass:"product-points"},[t._v(t._s(s.item.phiOrderInfo.score)+"积分 "),s.item.phiOrderInfo.money?r("span",[t._v("+ ¥"+t._s(s.item.phiOrderInfo.money))]):t._e(),t._v(" "),r("span",{staticClass:"od-counter"},[t._v("x1")])]),t._v(" "),r("p",{staticClass:"product-price"},[t._v(t._s(s.item.createTime))])]),t._v(" "),1===s.item.phiOrderInfo.winnerStatus?r("div",{staticClass:"od-iswin"},[1===s.item.phiOrderInfo.isWin?r("img",{attrs:{src:e("ZAc4"),alt:""}}):r("img",{attrs:{src:e("uZ7H"),alt:""}})]):t._e()])])],1)}}])})},staticRenderFns:[]};var c={data:function(){return{status:"",changeFlag:!1}},components:{orderListFilter:i,orderListContent:e("Z0/y")(n,o,!1,function(t){e("TVJ6")},null,null).exports},methods:{getStatus:function(t){this.status=t,this.changeFlag=!this.changeFlag}}},l={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"order-list page"},[e("mt-header",{attrs:{fixed:"",title:"我的订单"}},[e("div",{attrs:{slot:"left"},on:{click:function(s){t.$router.back()}},slot:"left"},[e("mt-button",{attrs:{icon:"back"}})],1)]),t._v(" "),e("order-list-filter",{on:{changeStatus:t.getStatus}}),t._v(" "),e("order-list-content",{attrs:{status:t.status,changeFlag:t.changeFlag}})],1)},staticRenderFns:[]};var u=e("Z0/y")(c,l,!1,function(t){e("fa6m")},null,null);s.default=u.exports},"8M34":function(t,s){},"9z5c":function(t,s,e){t.exports=e.p+"static/img/bg_daikaijiang@2x.2f64139.png"},CdBE:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAKAgMAAADEJeYyAAAACVBMVEUAAACJiYmIiIhpZNTrAAAAAnRSTlMAgJsrThgAAAAzSURBVAjXLYkxAQAgEITOxRCmMYI5TPMhXCSlDDIwQDZQGXqmw00anMRRejB1NzvMsvJ5NC4NmX6cWhIAAAAASUVORK5CYII="},CxfT:function(t,s){},CziM:function(t,s,e){t.exports=e.p+"static/img/bg_yiwancheng@2x.95e874e.png"},GqCe:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r={render:function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("div",{staticClass:"express page"},[r("mt-header",{attrs:{fixed:"",title:"物流追踪"}},[r("div",{attrs:{slot:"left"},on:{click:function(s){t.$router.back()}},slot:"left"},[r("mt-button",{attrs:{icon:"back"}})],1)]),t._v(" "),t._m(0),t._v(" "),r("div",{staticClass:"express-pregress"},t._l(t.expressProgress,function(s,i){return r("div",{key:i,staticClass:"express-pregress-item",class:{active:s.isCur}},[t._v("\n      "+t._s(s.info)+"\n      "),r("img",{directives:[{name:"show",rawName:"v-show",value:s.isCur,expression:"item.isCur"}],staticClass:"cur-pre",attrs:{src:e("xnXG"),alt:""}}),t._v(" "),r("div",{staticClass:"time-wrap"},[r("p",{staticClass:"date"},[t._v(t._s(s.date))]),t._v(" "),r("p",{staticClass:"time"},[t._v(t._s(s.time))])])])}))],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"express-content"},[s("div",{staticClass:"express-hd"},[s("span",{staticClass:"express-code"},[this._v("顺丰快递：4684513484")]),this._v(" "),s("span",{staticClass:"express-status"},[this._v("运输中")])]),this._v(" "),s("div",{staticClass:"express-img"},[s("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/2182216-9cdbda66732f4231.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/160",alt:""}})])])}]};var i=e("Z0/y")({data:function(){return{expressProgress:[{date:"6.17",time:"12:56",info:"闵行区七宝公司合川路服务部进行签 收扫描，快件已被合作代办点签收，感谢使用 顺丰快递，期待再次为您服务。",isCur:!0},{date:"6.17",time:"10:56",info:"闵行区七宝公司合川路服务部进行签 收扫描，正在为您派件。",isCur:!1},{date:"6.17",time:"12:56",info:"闵行区七宝公司 已发出",isCur:!1},{date:"6.17",time:"10:56",info:"快件已到达 上海分拨中心。",isCur:!1},{date:"6.17",time:"10:56",info:"您的包裹已出库。",isCur:!1}]}},created:function(){this.getExpress()},methods:{getExpress:function(){var t=this;this.$api.express().then(function(s){t.expressProgress=s})}}},r,!1,function(t){e("pRqP")},null,null);s.default=i.exports},Mb1h:function(t,s){},ND7J:function(t,s){},TVJ6:function(t,s){},Vum5:function(t,s){},ZAc4:function(t,s){t.exports="data:image/png;base64,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"},dBPH:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r={name:"mt-button",methods:{handleClick:function(t){this.$emit("click",t)}},props:{icon:String,disabled:Boolean,nativeType:String,plain:Boolean,type:{type:String,default:"default",validator:function(t){return["default","danger","primary"].indexOf(t)>-1}},size:{type:String,default:"normal",validator:function(t){return["small","normal","large"].indexOf(t)>-1}}}},i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("button",{staticClass:"mint-button",class:["mint-button--"+t.type,"mint-button--"+t.size,{"is-disabled":t.disabled,"is-plain":t.plain}],attrs:{type:t.nativeType,disabled:t.disabled},on:{click:t.handleClick}},[t.icon||t.$slots.icon?e("span",{staticClass:"mint-button-icon"},[t._t("icon",[t.icon?e("i",{staticClass:"mintui",class:"mintui-"+t.icon}):t._e()])],2):t._e(),t._v(" "),e("label",{staticClass:"mint-button-text"},[t._t("default")],2)])},staticRenderFns:[]};var a=e("Z0/y")(r,i,!1,function(t){e("ozsw")},null,null).exports,n={components:{MtButton:a},props:{couponNumber:{default:String}},methods:{copyCoupon:function(){document.getElementById("couponNum").select();try{document.execCommand("copy",!1,null)?this.$toast("复制成功"):this.$toast("复制失败")}catch(t){this.$toast("出错了")}}}},o={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"coupon-number"},[e("span",{staticClass:"coupon"},[t._v("优惠券码："),e("input",{directives:[{name:"model",rawName:"v-model",value:t.couponNumber,expression:"couponNumber"}],attrs:{type:"text",readonly:"",id:"couponNum"},domProps:{value:t.couponNumber},on:{input:function(s){s.target.composing||(t.couponNumber=s.target.value)}}})]),t._v(" "),e("mt-button",{staticClass:"copy-btn",on:{click:t.copyCoupon}},[t._v("复制")])],1)},staticRenderFns:[]};var c=e("Z0/y")(n,o,!1,function(t){e("CxfT")},null,null).exports,l={data:function(){return{express:""}},props:{expressInfo:{default:Object}}},u={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"express-info"},[s("mt-cell",{attrs:{title:"物流信息",to:"/","is-link":""}},[s("img",{attrs:{slot:"icon",src:e("esCJ"),width:"20",height:"20"},slot:"icon"})])],1)},staticRenderFns:[]};var d=e("Z0/y")(l,u,!1,function(t){e("vThG")},null,null).exports,p={props:{orderInfo:{default:Object}}},f={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"order-info"},[e("router-link",{staticClass:"product-item order-list-item-bd",attrs:{tag:"div",to:{path:"product-detail",query:{id:t.orderInfo.productId}}}},[e("div",{staticClass:"product-img-wrap"},[e("img",{attrs:{src:"/api_images"+t.orderInfo.phiOrderInfo.productImg,alt:""}})]),t._v(" "),e("div",{staticClass:"product-info-wrap"},[e("p",{staticClass:"product-title"},[t._v(t._s(t.orderInfo.phiOrderInfo.productName))]),t._v(" "),e("p",{staticClass:"product-points"},[t._v(t._s(t.orderInfo.phiOrderInfo.score)+"积分 "),t.orderInfo.phiOrderInfo.money?e("span",[t._v("\n        + ¥"+t._s(t.orderInfo.phiOrderInfo.money))]):t._e(),t._v(" "),e("span",{staticClass:"od-counter"},[t._v("x1")])]),t._v(" "),e("p",{staticClass:"product-price"},[t._v("市场参考价：¥"+t._s(t.orderInfo.phiOrderInfo.marketPrice))])])])],1)},staticRenderFns:[]};var v=e("Z0/y")(p,f,!1,function(t){e("fqwF")},null,null).exports,m={data:function(){return{statusVal:"",statusClass:"",status:[{class:"",val:""},{class:"prizing",val:"待开奖"},{class:"sending",val:"待发货"},{class:"reciving",val:"待收货"},{class:"done",val:"已完成"},{class:"cancel",val:"已取消"}]}},props:{orderStatus:{type:[String,Number],default:"4"},orderInfo:{type:Object},couponNumber:{type:String}},components:{MtButton:a},created:function(){this.initStatus()},methods:{initStatus:function(){this.statusVal=this.status[1*this.orderStatus].val,this.statusClass=this.status[1*this.orderStatus].class},checkPrizeList:function(){this.$router.push({name:"prizeList",query:{id:this.orderInfo.productId}})},copyCoupon:function(){document.getElementById("couponNum").select();try{document.execCommand("copy",!1,null)?this.$toast("复制成功"):this.$toast("复制失败")}catch(t){this.$toast("出错了")}}}},A={render:function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("div",{staticClass:"od-status"},[r("div",{staticClass:"order-status",class:t.statusClass},["prizing"===t.statusClass?r("img",{staticClass:"order-status-bg",attrs:{src:e("9z5c"),alt:""}}):t._e(),t._v(" "),"sending"===t.statusClass?r("img",{staticClass:"order-status-bg",attrs:{src:e("3Ea+"),alt:""}}):t._e(),t._v(" "),"reciving"===t.statusClass?r("img",{staticClass:"order-status-bg",attrs:{src:e("in/m"),alt:""}}):t._e(),t._v(" "),"done"===t.statusClass?r("img",{staticClass:"order-status-bg",attrs:{src:e("CziM"),alt:""}}):t._e(),t._v(" "),"cancel"===t.statusClass?r("img",{staticClass:"order-status-bg",attrs:{src:e("52IZ"),alt:""}}):t._e(),t._v(" "),r("div",{staticClass:"order-status-content"},[r("p",{staticClass:"order-status-value"},[t._v(t._s(t.statusVal))]),t._v(" "),t.orderInfo?r("p",{staticClass:"order-points"},[t._v("订单金额："+t._s(t.orderInfo.phiOrderInfo.score)+"积分\n        ")]):t._e(),t._v(" "),1*t.orderStatus==4&&1*t.orderInfo.phiOrderInfo.productClass==1?r("mt-button",{staticClass:"check",on:{click:t.checkPrizeList}},[t._v("\n        查看中奖名单\n      ")]):t._e()],1)]),t._v(" "),1*t.orderInfo.phiOrderInfo.productClass!=1||1*t.orderStatus!=1&&1*t.orderStatus!=4?t._e():r("div",{staticClass:"prize-time"},[t._v("\n    开奖时间："+t._s(t.orderInfo.prizeInfo.winnerTime)+"\n    "),1*t.orderStatus==4&&1*t.orderInfo.prizeInfo.winnerStatus==2?r("span",{staticClass:"win"},[1===t.orderInfo.isWin?r("img",{attrs:{src:e("uZ7H"),alt:""}}):r("img",{attrs:{src:e("ZAc4"),alt:""}})]):t._e()]),t._v(" "),1*t.orderInfo.phiOrderInfo.productClass==2?r("div",{staticClass:"order-reciver"},[r("div",{staticClass:"reciver-info"},[r("p",{staticClass:"user-info"},[r("img",{attrs:{src:e("65T0"),alt:""}}),t._v("\n        "+t._s(t.orderInfo.phiOrderInfo.receiverName)+"-"+t._s(t.orderInfo.phiOrderInfo.tel)+"\n      ")]),t._v(" "),r("p",{staticClass:"reciver-address"},[t._v(t._s(t.orderInfo.phiOrderInfo.province)+"\n        "+t._s(t.orderInfo.phiOrderInfo.city)+t._s(t.orderInfo.phiOrderInfo.area)+t._s(t.orderInfo.phiOrderInfo.addressDetail))])]),t._v(" "),1*t.orderStatus==3||1*t.orderStatus==4?r("div",{staticClass:"express-info"},[r("mt-cell",{attrs:{title:"物流信息",to:"/express","is-link":""}},[r("img",{attrs:{slot:"icon",src:e("esCJ"),width:"20",height:"20"},slot:"icon"})])],1):t._e()]):t._e(),t._v(" "),1*t.orderInfo.phiOrderInfo.productClass!=0&&1*t.orderInfo.phiOrderInfo.productClass!=3||1*t.orderStatus!=4?t._e():r("div",{staticClass:"coupon-number"},[r("span",{staticClass:"coupon"},[t._v("优惠券码："),r("input",{directives:[{name:"model",rawName:"v-model",value:t.couponNumber,expression:"couponNumber"}],attrs:{type:"text",readonly:"",id:"couponNum"},domProps:{value:t.couponNumber},on:{input:function(s){s.target.composing||(t.couponNumber=s.target.value)}}})]),t._v(" "),r("mt-button",{staticClass:"copy-btn",on:{click:t.copyCoupon}},[t._v("复制")])],1)])},staticRenderFns:[]};var g=e("Z0/y")(m,A,!1,function(t){e("eZrW")},null,null).exports,h={data:function(){return{}},props:{prizeInfo:{default:Object}}},C={render:function(){var t=this.$createElement;return(this._self._c||t)("div")},staticRenderFns:[]};var x=e("Z0/y")(h,C,!1,function(t){e("Mb1h")},null,null).exports,b={props:{reciverInfo:{default:Object}}},I={render:function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("div",{staticClass:"reciver-info"},[r("p",{staticClass:"user-info"},[r("img",{attrs:{src:e("65T0"),alt:""}}),t._v(t._s(t.reciverInfo.reciverName)+"-"+t._s(t.reciverInfo.reciverTel))]),t._v(" "),r("p",{staticClass:"reciver-address"},[t._v(t._s(t.reciverInfo.reciverAddress))])])},staticRenderFns:[]};var S={data:function(){return{orderDetail:"",couponNumber:""}},components:{couponNumber:c,expressInfo:d,orderInfo:v,orderStatus:g,prize:x,reciverInfo:e("Z0/y")(b,I,!1,function(t){e("8M34")},null,null).exports},created:function(){this.getOrderDetail()},methods:{getOrderDetail:function(){var t=this;this.$api.orderDetail({id:this.$route.query.id}).then(function(s){t.orderDetail=s,t.couponNumber=s.phiOrderInfo.coupCode})}}},y={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"order-detail page"},[e("mt-header",{attrs:{fixed:"",title:"我的订单"}},[e("div",{attrs:{slot:"left"},on:{click:function(s){t.$router.back()}},slot:"left"},[e("mt-button",{attrs:{icon:"back"}})],1)]),t._v(" "),t.orderDetail?e("div",{staticClass:"order-detail-content"},[e("order-status",{attrs:{couponNumber:t.couponNumber,orderStatus:t.orderDetail.status,orderInfo:t.orderDetail}}),t._v(" "),e("order-info",{attrs:{orderInfo:t.orderDetail}})],1):t._e()],1)},staticRenderFns:[]};var R=e("Z0/y")(S,y,!1,function(t){e("i9Mt")},null,null);s.default=R.exports},eZrW:function(t,s){},esCJ:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAsVBMVEX/////9+3veQD1q1H60qT+8+bvewD1pkf2sFrwfgD2sl7yjxjxiArxhQPwggDwgQDyjBL848X3tGP/+/b0oj7+9enzlCP//fr/+vT/+O/+8eH98N/969T95sr72K36zZf4v3v3t2j2rVTwgAD+9Oj97tr97Nj2sV30pEPzlyn96M7837z3u3L0nDL727T0nznzkh/61Kf5yI74xYf4woH4vXb3uW71qlTzmi784cD5yZGlXXeSAAABcUlEQVQ4y93Sx3KDMBSF4Qs4xooqovdqDO7p5f0fLCwyjsMo1j7/Cs58K0nwn4uNX8URqHNeN/fXyede6baIL2d5mQo2FA/2dUNgPrsK6FFrtpTLja+AA32bLQ+mdaeAB9rMloUK7iRhgR7m9cg5L3TQl+8MiacP0MD8QBHZ585OA9cHxKQTR4egvw0LRkoDIMHCuQmjCtkhTPCMb0NjY67ANYw11sGVuek8IgTRw/tdMEGBUx1cwbYoisUW9PCSHkZJ2l2mNDH+gv3LO7a/ryaT51FmapgEiDNEjzDlYMRahnMlrCleyYDjPI7XJ4RlQ/gYKc7R95YVQEGIV1W24I8AL3R0ZrCzzaY/LXMAEIy3LecsAYjb8xFK0+p+oFt6R8NDlg97LurPxypglRvWbMxg/fbgwpXMIHyldGgIPfnTb8OEbREiJ5NGMCutKUKIbGEqG1qEWi8FZd1iL5+c75dc1vuyhz8KDd+9fPtGCP+2L2VsIPzPOXrYAAAAAElFTkSuQmCC"},fa6m:function(t,s){},fqwF:function(t,s){},i9Mt:function(t,s){},"in/m":function(t,s,e){t.exports=e.p+"static/img/bg_daishouhuo@2x.dba957b.png"},mOT3:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"prize-list page"},[e("mt-header",{attrs:{fixed:"",title:"中奖名单列表"}},[e("div",{attrs:{slot:"left"},on:{click:function(s){t.$router.back()}},slot:"left"},[e("mt-button",{attrs:{icon:"back"}})],1)]),t._v(" "),e("div",{staticClass:"list-title-wrap"},[e("p",{staticClass:"title"},[t._v(t._s(t.title))]),t._v(" "),e("p",{staticClass:"md"},[t._v("中奖名单")])]),t._v(" "),t.prizeList.list&&t.prizeList.list.length?e("div",{staticClass:"list-wrap"},[t._l(t.prizeList.list,function(s,r){return e("div",{key:s.tel,staticClass:"prize-item"},[e("span",{staticClass:"item-number"},[t._v(t._s(r+1)),e("span",{staticClass:"user-name"},[t._v(t._s(s.name))])]),t._v(" "),e("span",{staticClass:"user-tel"},[t._v(t._s(s.tel))])])}),t._v(" "),e("div",{staticClass:"toothbg"})],2):t._e()],1)},staticRenderFns:[]};var i=e("Z0/y")({data:function(){return{title:"",prizeList:""}},created:function(){this.getPrizeList()},methods:{getPrizeList:function(){var t=this,s={id:this.$route.query.id,orderBy:"",page:"",pageSize:"",queryParamList:[]};this.$api.prizeList(s).then(function(s){t.title=s.title,t.prizeList=s})}}},r,!1,function(t){e("Vum5")},null,null);s.default=i.exports},ozsw:function(t,s){},pRqP:function(t,s){},uZ7H:function(t,s){t.exports="data:image/png;base64,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"},vThG:function(t,s){},xnXG:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAMAAAAPzWOAAAAAtFBMVEUAAADxhgDxhADwhADxhADxgwDzhQDxgwDxhADwgwDwhADwgwDwgwDxhADyhQDxgwDxhQDxhQDyhAD1hQD/kgD/qgDwgwD////wiQ3++/fzmzL98OL1qlHylSb+9u73w4Xxjxj5z57xjBP737/62bH3wH799Or869b86NH74sP73br2tWf1sV/0p0rwhgf+9+/98uT87dv50qP50J/3vHbzoT7++PL+9/D87Nj61arxkh/4x4z6YmdyAAAAFnRSTlMAI+7ht4FT+fjxz8yroJiHcVw8MgcGfnVRHwAAAqBJREFUWMOU1AmugkAQBNBmdd+1BhQVxcR9N8b7n+z/BIPTwyDjO0Cni+qBilk9r1l37ErFdupNr2fRr4Z+y4HCaflDMjdo29Cy2wMy03fxhduncpaLEq5F3428KkpVvdHXNRow0viyjF+DoZpPBbr4QZe0OvhJx3RGvL8lr+fzldz2cX6KSZbTfisk2/2pLJEPVXQVimsEzle6ralBtkJjG/OOWNOjBrjxRGhNxvxe5KvzwB1DUSA8QuZJYarKHqEoFLJdqp9ALpgly6KaLCFxs7cPLhGZ2SKaBsE0WsxEJoGsr18k+qw+D/AWzD8RI80qA3BrtQq1sDVk6b+uDeaQzYjBxNmUAyRt+je0wSRKDWpp6lexh/mDX4q3OXLm4m2pHn9Ln2YWICeY6fK0iMgBcxepBTQWInWHxCGywO14j/r2d5BZ1CsoeAqNqbbkXu7tnUUqgEYgUmflFTbBhSZDQsiaVAd3MYlzgayuloONyYfdgNdjg1uZVLyCzKYKuIfJsT0gq/zVYi4pCANBEEWjrlTwQ6nRqAQNIvjFIMb738vNLKSqzQQa3wGaZKanuqqlSNqk7VMq0gZRxB9gAfqdBMQ+IgX6kYlcMfJFTJRmFeiK+2DeEXmUi+tL2wPnW71QFzlAbT+CUM7q0DYckRTQ2VrswbSCKBGv3zVeYJIgj8w5vCDloI08CEItVGu7xiWD0AsjQznZRU4Q2lMaXrHD3UAZ0hglTRCOMJjQQI8YjGsOpUPWgijZ6pQwGJPJYR7SZUpH7ZYOMsPbkN0i4ydsi6+nuIVBVyyostJnRxbUNsM83gN3EGqGQ/Mr82UQuTkMeg3DTrpg0daAEI872e753GWuwKNoDX988wdJf6T1h+s/x3z/wsG/+vAvYfzroA8mOEL+hl0QuQAAAABJRU5ErkJggg=="}});