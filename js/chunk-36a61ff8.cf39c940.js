(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-36a61ff8","chunk-c33ed792"],{"03d5":function(e,t,o){"use strict";o.r(t),o.d(t,"MobilePrimitives_SelectManyResponseBlock",(function(){return I})),o.d(t,"install",(function(){return F}));var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("h3",{staticClass:"no-room-above"},[e._v(" "+e._s(e._f("trans")("flow-builder.edit-block-type",{block_type:e.trans("flow-builder."+e.block.type)}))+" ")]),o("block-name-editor",{attrs:{block:e.block}}),o("block-label-editor",{attrs:{block:e.block}}),o("block-semantic-label-editor",{attrs:{block:e.block}}),o("div",{staticClass:"prompt-resource"},[e.promptResource?o("resource-editor",{attrs:{label:e._f("trans")("flow-builder.prompt"),resource:e.promptResource,block:e.block,flow:e.flow}}):e._e()],1),o("div",{staticClass:"question-prompt-resource"},[e.questionPromptResource?o("resource-editor",{attrs:{label:e._f("trans")("flow-builder.question-prompt"),resource:e.questionPromptResource,block:e.block,flow:e.flow}}):e._e()],1),o("div",{staticClass:"choices-prompt-resource"},[e.choicesPromptResource?o("resource-editor",{attrs:{label:e._f("trans")("flow-builder.choices-prompt"),resource:e.choicesPromptResource,block:e.block,flow:e.flow}}):e._e()],1),e._l(Object.keys(e.inflatedChoices),(function(t){return o("div",{staticClass:"form-group form-inline"},[o("resource-editor",{attrs:{label:"Choice "+t,resource:e.inflatedChoices[t],block:e.block,flow:e.flow}})],1)})),o("first-block-editor-button",{attrs:{flow:e.flow,"block-id":e.block.uuid}}),o("block-id",{attrs:{block:e.block}})],2)},c=[],n=o("d4ec"),i=o("262e"),a=o("2caf"),s=o("9ab4"),l=o("60a3"),u=(o("96cf"),o("1da1")),d=o("5530"),b=o("31aa"),f=o("2ef0"),p=o("ecef"),k="MobilePrimitives\\SelectManyResponse",h=Object(d["a"])({},p["d"]),w=Object(d["a"])({},p["e"]),m=Object(d["a"])(Object(d["a"])({},p["b"]),{},{createWith:function(e,t){return Object(u["a"])(regeneratorRuntime.mark((function o(){var r,c,n,i,a,s,l,u;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return e.state,e.commit,r=e.dispatch,c=t.props,o.next=4,r("flow/flow_addBlankResourceForEnabledModesAndLangs",null,{root:!0});case 4:return n=o.sent,o.next=7,r("flow/flow_addBlankResourceForEnabledModesAndLangs",null,{root:!0});case 7:return i=o.sent,o.next=10,r("flow/flow_addBlankResourceForEnabledModesAndLangs",null,{root:!0});case 10:return a=o.sent,o.next=13,r("flow/flow_addBlankResourceForEnabledModesAndLangs",null,{root:!0});case 13:return s=o.sent,l={uuid:(new b["IdGeneratorUuidV4"]).generate(),tag:"Default",label:"Default"},u={uuid:(new b["IdGeneratorUuidV4"]).generate(),tag:"Error",label:"Error"},o.t0=f["defaults"],o.t1=c,o.t2=k,o.next=21,r("flow/block_createBlockDefaultExitWith",{props:l},{root:!0});case 21:return o.t3=o.sent,o.next=24,r("flow/block_createBlockExitWith",{props:u},{root:!0});case 24:return o.t4=o.sent,o.t5=[o.t3,o.t4],o.t6={prompt:i.uuid,questionPrompt:a.uuid,choicesPrompt:s.uuid,choices:{1:n.uuid}},o.t7={type:o.t2,name:"",label:"",semanticLabel:"",exits:o.t5,config:o.t6},o.abrupt("return",(0,o.t0)(o.t1,o.t7));case 29:case"end":return o.stop()}}),o)})))()}}),v={namespaced:!0,getters:h,mutations:w,actions:m},O=o("4bb5"),g=o("3a37"),j=o("af98"),B=o("f04e"),y=o("3411"),C=o("1b4e"),R=o("192b"),_=o("510a"),x=o("792f"),E=o("5c47"),P=Object(O["c"])("flow/".concat(k)),I=function(e){Object(i["a"])(o,e);var t=Object(a["a"])(o);function o(){return Object(n["a"])(this,o),t.apply(this,arguments)}return o}(E["default"]);Object(s["a"])([P.Getter],I.prototype,"inflatedChoices",void 0),Object(s["a"])([P.Action],I.prototype,"editSelectOneResponseBlockChoice",void 0),I=Object(s["a"])([Object(l["a"])({components:{BlockNameEditor:B["a"],BlockLabelEditor:y["a"],BlockSemanticLabelEditor:C["a"],FirstBlockEditorButton:R["a"],ResourceEditor:_["a"],BlockId:x["a"]},mixins:[g["a"]]})],I);var L=I,F=Object(j["c"])(k,v),M=L,A=o("2877"),q=Object(A["a"])(M,r,c,!1,null,null,null);t["default"]=q.exports},"5c47":function(e,t,o){"use strict";o.r(t),o.d(t,"MobilePrimitives_SelectOneResponseBlock",(function(){return y})),o.d(t,"install",(function(){return R}));var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("h3",{staticClass:"no-room-above"},[e._v(" "+e._s(e._f("trans")("flow-builder.edit-block-type",{block_type:e.trans("flow-builder."+e.block.type)}))+" ")]),o("block-name-editor",{attrs:{block:e.block}}),o("block-label-editor",{attrs:{block:e.block}}),o("block-semantic-label-editor",{attrs:{block:e.block}}),o("div",{staticClass:"prompt-resource"},[e.promptResource?o("resource-editor",{attrs:{label:e._f("trans")("flow-builder.prompt"),resource:e.promptResource,block:e.block,flow:e.flow}}):e._e()],1),o("div",{staticClass:"question-prompt-resource"},[e.questionPromptResource?o("resource-editor",{attrs:{label:e._f("trans")("flow-builder.question-prompt"),resource:e.questionPromptResource,block:e.block,flow:e.flow}}):e._e()],1),o("div",{staticClass:"choices-prompt-resource"},[e.choicesPromptResource?o("resource-editor",{attrs:{label:e._f("trans")("flow-builder.choices-prompt"),resource:e.choicesPromptResource,block:e.block,flow:e.flow}}):e._e()],1),e._l(Object.keys(e.inflatedChoices),(function(t){return o("div",{staticClass:"form-group form-inline"},[o("resource-editor",{attrs:{label:"Choice "+t,resource:e.inflatedChoices[t],block:e.block,flow:e.flow}})],1)})),o("first-block-editor-button",{attrs:{flow:e.flow,"block-id":e.block.uuid}}),o("block-id",{attrs:{block:e.block}})],2)},c=[],n=o("d4ec"),i=o("bee2"),a=o("262e"),s=o("2caf"),l=o("9ab4"),u=o("a026"),d=o("4bb5"),b=o("60a3"),f=o("ecef"),p=o("3a37"),k=o("af98"),h=o("f04e"),w=o("3411"),m=o("1b4e"),v=o("192b"),O=o("510a"),g=o("792f"),j=Object(d["c"])("flow"),B=Object(d["c"])("flow/".concat(f["a"])),y=function(e){Object(a["a"])(o,e);var t=Object(s["a"])(o);function o(){return Object(n["a"])(this,o),t.apply(this,arguments)}return Object(i["a"])(o,[{key:"onChoicesChanged",value:function(e){this.editSelectOneResponseBlockChoice()}},{key:"promptResource",get:function(){return this.resourcesByUuid[this.block.config.prompt]}},{key:"questionPromptResource",get:function(){return this.resourcesByUuid[this.block.config.questionPrompt||""]}},{key:"choicesPromptResource",get:function(){return this.resourcesByUuid[this.block.config.choicesPrompt||""]}}]),o}(u["default"]);Object(l["a"])([Object(b["b"])()],y.prototype,"block",void 0),Object(l["a"])([Object(b["b"])()],y.prototype,"flow",void 0),Object(l["a"])([Object(b["d"])("inflatedChoices",{deep:!0})],y.prototype,"onChoicesChanged",null),Object(l["a"])([j.Getter],y.prototype,"resourcesByUuid",void 0),Object(l["a"])([B.Getter],y.prototype,"inflatedChoices",void 0),Object(l["a"])([B.Action],y.prototype,"editSelectOneResponseBlockChoice",void 0),y=Object(l["a"])([Object(b["a"])({components:{BlockNameEditor:h["a"],BlockLabelEditor:w["a"],BlockSemanticLabelEditor:m["a"],FirstBlockEditorButton:v["a"],ResourceEditor:O["a"],BlockId:g["a"]},mixins:[p["a"]]})],y);var C=y,R=Object(k["c"])(f["a"],f["c"]),_=C,x=o("2877"),E=Object(x["a"])(_,r,c,!1,null,null,null);t["default"]=E.exports},ecef:function(e,t,o){"use strict";o.d(t,"a",(function(){return s})),o.d(t,"d",(function(){return l})),o.d(t,"e",(function(){return u})),o.d(t,"b",(function(){return d}));o("a623"),o("13d5"),o("45fc"),o("b64b"),o("d3b7"),o("ddb0"),o("96cf");var r=o("1da1"),c=o("9300"),n=o("31aa"),i=o("2ef0"),a=o("b199"),s="MobilePrimitives\\SelectOneResponse",l={inflatedChoices:function(e,t,o,r){var c=r["builder/activeBlock"],n={};return Object.keys(c.config.choices).reduce((function(e,t){return e[t]=r["flow/resourcesByUuid"][c.config.choices[t]],e}),n)},allChoicesHaveContent:function(e,t){return Object.keys(t.inflatedChoices).every((function(e){return Object(a["c"])(t.inflatedChoices[e].values,"value")}))},twoChoicesBlank:function(e,t,o,r){var c=0;return Object.keys(t.inflatedChoices).some((function(e){return Object(a["c"])(t.inflatedChoices[e].values,"value")||(c+=1),c>1}))}},u={deleteChoiceByKey:function(e,t){var o=t.choiceKeyToRemove,r=t.blockId,n=Object(c["findBlockOnActiveFlowWith"])(r,this.state.flow);delete n.config.choices[o];var i={};n.config.choices=Object.keys(n.config.choices).sort().reduce((function(e,t,o){return e[o+1]=n.config.choices[t],e}),i)},pushNewChoice:function(e,t){var o=t.choiceId,r=t.blockId,n=t.newIndex,i=Object(c["findBlockOnActiveFlowWith"])(r,this.state.flow);i.config.choices[n]=o}},d={popFirstEmptyChoice:function(e){return Object(r["a"])(regeneratorRuntime.mark((function t(){var o,r,c,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(o=e.commit,r=e.rootGetters,c=e.getters,n=Object(i["find"])(Object.keys(c.inflatedChoices),(function(e){return!Object(a["c"])(c.inflatedChoices[e].values,"value")})),!n){t.next=5;break}return o("deleteChoiceByKey",{choiceKeyToRemove:n,blockId:r["builder/activeBlock"].uuid}),t.abrupt("return",r["builder/activeBlock"].config.choices[n]);case 5:return t.abrupt("return",null);case 6:case"end":return t.stop()}}),t)})))()},editSelectOneResponseBlockChoice:function(e){return Object(r["a"])(regeneratorRuntime.mark((function t(){var o,r,c,a,s,l,u,d,b;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(o=e.commit,r=e.dispatch,c=e.getters,a=e.rootGetters,s=a["builder/activeBlock"],!c.allChoicesHaveContent){t.next=15;break}return l=parseInt(Object(i["max"])(Object.keys(s.config.choices))||"0")+1,t.next=6,r("flow/flow_addBlankResourceForEnabledModesAndLangs",null,{root:!0});case 6:if(u=t.sent,s.config.choices[l]){t.next=13;break}return o("pushNewChoice",{choiceId:u.uuid,blockId:s.uuid,newIndex:l}),t.next=11,r("flow/block_createBlockExitWith",{props:{uuid:(new n["IdGeneratorUuidV4"]).generate(),test:"block.value = ".concat(l-1),label:u.uuid}},{root:!0});case 11:d=t.sent,o("flow/block_pushNewExit",{blockId:s.uuid,newExit:d},{root:!0});case 13:t.next=20;break;case 15:if(!c.twoChoicesBlank){t.next=20;break}return t.next=18,r("popFirstEmptyChoice",{blockId:s.uuid});case 18:b=t.sent,b&&o("flow/block_popExitsByLabel",{blockId:s.uuid,exitLabel:b},{root:!0});case 20:return t.abrupt("return",s.config.choices);case 21:case"end":return t.stop()}}),t)})))()},createWith:function(e,t){return Object(r["a"])(regeneratorRuntime.mark((function o(){var r,c,a,l,u,d,b,f;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return e.state,e.commit,r=e.dispatch,c=t.props,o.next=4,r("flow/flow_addBlankResourceForEnabledModesAndLangs",null,{root:!0});case 4:return a=o.sent,o.next=7,r("flow/flow_addBlankResourceForEnabledModesAndLangs",null,{root:!0});case 7:return l=o.sent,o.next=10,r("flow/flow_addBlankResourceForEnabledModesAndLangs",null,{root:!0});case 10:return u=o.sent,o.next=13,r("flow/flow_addBlankResourceForEnabledModesAndLangs",null,{root:!0});case 13:return d=o.sent,b={uuid:(new n["IdGeneratorUuidV4"]).generate(),tag:"Default",label:"Default"},f={uuid:(new n["IdGeneratorUuidV4"]).generate(),tag:"Error",label:"Error"},o.t0=i["defaults"],o.t1=c,o.t2=s,o.next=21,r("flow/block_createBlockDefaultExitWith",{props:b},{root:!0});case 21:return o.t3=o.sent,o.next=24,r("flow/block_createBlockExitWith",{props:f},{root:!0});case 24:return o.t4=o.sent,o.t5=[o.t3,o.t4],o.t6={prompt:l.uuid,questionPrompt:u.uuid,choicesPrompt:d.uuid,choices:{1:a.uuid}},o.t7={type:o.t2,name:"",label:"",semanticLabel:"",exits:o.t5,config:o.t6},o.abrupt("return",(0,o.t0)(o.t1,o.t7));case 29:case"end":return o.stop()}}),o)})))()}};t["c"]={namespaced:!0,getters:l,mutations:u,actions:d}}}]);
//# sourceMappingURL=chunk-36a61ff8.cf39c940.js.map