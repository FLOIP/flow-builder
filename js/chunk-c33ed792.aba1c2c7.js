(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c33ed792"],{"5c47":function(e,t,o){"use strict";o.r(t),o.d(t,"MobilePrimitives_SelectOneResponseBlock",(function(){return C})),o.d(t,"install",(function(){return x}));var c=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("h3",{staticClass:"no-room-above"},[e._v(" "+e._s(e._f("trans")("flow-builder.edit-block-type",{block_type:e.trans("flow-builder."+e.block.type)}))+" ")]),o("block-name-editor",{attrs:{block:e.block}}),o("block-label-editor",{attrs:{block:e.block}}),o("block-semantic-label-editor",{attrs:{block:e.block}}),o("div",{staticClass:"prompt-resource"},[e.promptResource?o("resource-editor",{attrs:{label:e._f("trans")("flow-builder.prompt"),resource:e.promptResource,block:e.block,flow:e.flow}}):e._e()],1),o("div",{staticClass:"question-prompt-resource"},[e.questionPromptResource?o("resource-editor",{attrs:{label:e._f("trans")("flow-builder.question-prompt"),resource:e.questionPromptResource,block:e.block,flow:e.flow}}):e._e()],1),o("div",{staticClass:"choices-prompt-resource"},[e.choicesPromptResource?o("resource-editor",{attrs:{label:e._f("trans")("flow-builder.choices-prompt"),resource:e.choicesPromptResource,block:e.block,flow:e.flow}}):e._e()],1),e._l(Object.keys(e.inflatedChoices),(function(t){return o("div",{staticClass:"form-group form-inline"},[o("resource-editor",{attrs:{label:"Choice "+t,resource:e.inflatedChoices[t],block:e.block,flow:e.flow}})],1)})),o("first-block-editor-button",{attrs:{flow:e.flow,"block-id":e.block.uuid}}),o("block-id",{attrs:{block:e.block}})],2)},r=[],n=o("d4ec"),i=o("bee2"),s=o("262e"),a=o("2caf"),l=o("9ab4"),u=o("a026"),d=o("4bb5"),b=o("60a3"),f=o("ecef"),p=o("3a37"),k=o("af98"),h=o("f04e"),w=o("3411"),m=o("1b4e"),v=o("192b"),O=o("510a"),g=o("792f"),y=Object(d["c"])("flow"),j=Object(d["c"])("flow/".concat(f["a"])),C=function(e){Object(s["a"])(o,e);var t=Object(a["a"])(o);function o(){return Object(n["a"])(this,o),t.apply(this,arguments)}return Object(i["a"])(o,[{key:"onChoicesChanged",value:function(e){this.editSelectOneResponseBlockChoice()}},{key:"promptResource",get:function(){return this.resourcesByUuid[this.block.config.prompt]}},{key:"questionPromptResource",get:function(){return this.resourcesByUuid[this.block.config.questionPrompt||""]}},{key:"choicesPromptResource",get:function(){return this.resourcesByUuid[this.block.config.choicesPrompt||""]}}]),o}(u["default"]);Object(l["a"])([Object(b["b"])()],C.prototype,"block",void 0),Object(l["a"])([Object(b["b"])()],C.prototype,"flow",void 0),Object(l["a"])([Object(b["d"])("inflatedChoices",{deep:!0})],C.prototype,"onChoicesChanged",null),Object(l["a"])([y.Getter],C.prototype,"resourcesByUuid",void 0),Object(l["a"])([j.Getter],C.prototype,"inflatedChoices",void 0),Object(l["a"])([j.Action],C.prototype,"editSelectOneResponseBlockChoice",void 0),C=Object(l["a"])([Object(b["a"])({components:{BlockNameEditor:h["a"],BlockLabelEditor:w["a"],BlockSemanticLabelEditor:m["a"],FirstBlockEditorButton:v["a"],ResourceEditor:O["a"],BlockId:g["a"]},mixins:[p["a"]]})],C);var B=C,x=Object(k["c"])(f["a"],f["c"]),R=B,_=o("2877"),E=Object(_["a"])(R,c,r,!1,null,null,null);t["default"]=E.exports},ecef:function(e,t,o){"use strict";o.d(t,"a",(function(){return a})),o.d(t,"d",(function(){return l})),o.d(t,"e",(function(){return u})),o.d(t,"b",(function(){return d}));o("a623"),o("13d5"),o("45fc"),o("b64b"),o("d3b7"),o("ddb0"),o("96cf");var c=o("1da1"),r=o("9300"),n=o("31aa"),i=o("2ef0"),s=o("b199"),a="MobilePrimitives\\SelectOneResponse",l={inflatedChoices:function(e,t,o,c){var r=c["builder/activeBlock"],n={};return Object.keys(r.config.choices).reduce((function(e,t){return e[t]=c["flow/resourcesByUuid"][r.config.choices[t]],e}),n)},allChoicesHaveContent:function(e,t){return Object.keys(t.inflatedChoices).every((function(e){return Object(s["c"])(t.inflatedChoices[e].values,"value")}))},twoChoicesBlank:function(e,t,o,c){var r=0;return Object.keys(t.inflatedChoices).some((function(e){return Object(s["c"])(t.inflatedChoices[e].values,"value")||(r+=1),r>1}))}},u={deleteChoiceByKey:function(e,t){var o=t.choiceKeyToRemove,c=t.blockId,n=Object(r["findBlockOnActiveFlowWith"])(c,this.state.flow);delete n.config.choices[o];var i={};n.config.choices=Object.keys(n.config.choices).sort().reduce((function(e,t,o){return e[o+1]=n.config.choices[t],e}),i)},pushNewChoice:function(e,t){var o=t.choiceId,c=t.blockId,n=t.newIndex,i=Object(r["findBlockOnActiveFlowWith"])(c,this.state.flow);i.config.choices[n]=o}},d={popFirstEmptyChoice:function(e){return Object(c["a"])(regeneratorRuntime.mark((function t(){var o,c,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(o=e.commit,c=e.rootGetters,r=e.getters,n=Object(i["find"])(Object.keys(r.inflatedChoices),(function(e){return!Object(s["c"])(r.inflatedChoices[e].values,"value")})),!n){t.next=5;break}return o("deleteChoiceByKey",{choiceKeyToRemove:n,blockId:c["builder/activeBlock"].uuid}),t.abrupt("return",c["builder/activeBlock"].config.choices[n]);case 5:return t.abrupt("return",null);case 6:case"end":return t.stop()}}),t)})))()},editSelectOneResponseBlockChoice:function(e){return Object(c["a"])(regeneratorRuntime.mark((function t(){var o,c,r,s,a,l,u,d,b;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(o=e.commit,c=e.dispatch,r=e.getters,s=e.rootGetters,a=s["builder/activeBlock"],!r.allChoicesHaveContent){t.next=15;break}return l=parseInt(Object(i["max"])(Object.keys(a.config.choices))||"0")+1,t.next=6,c("flow/flow_addBlankResourceForEnabledModesAndLangs",null,{root:!0});case 6:if(u=t.sent,a.config.choices[l]){t.next=13;break}return o("pushNewChoice",{choiceId:u.uuid,blockId:a.uuid,newIndex:l}),t.next=11,c("flow/block_createBlockExitWith",{props:{uuid:(new n["IdGeneratorUuidV4"]).generate(),test:"block.value = ".concat(l-1),label:u.uuid}},{root:!0});case 11:d=t.sent,o("flow/block_pushNewExit",{blockId:a.uuid,newExit:d},{root:!0});case 13:t.next=20;break;case 15:if(!r.twoChoicesBlank){t.next=20;break}return t.next=18,c("popFirstEmptyChoice",{blockId:a.uuid});case 18:b=t.sent,b&&o("flow/block_popExitsByLabel",{blockId:a.uuid,exitLabel:b},{root:!0});case 20:return t.abrupt("return",a.config.choices);case 21:case"end":return t.stop()}}),t)})))()},createWith:function(e,t){return Object(c["a"])(regeneratorRuntime.mark((function o(){var c,r,s,l,u,d,b,f;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return e.state,e.commit,c=e.dispatch,r=t.props,o.next=4,c("flow/flow_addBlankResourceForEnabledModesAndLangs",null,{root:!0});case 4:return s=o.sent,o.next=7,c("flow/flow_addBlankResourceForEnabledModesAndLangs",null,{root:!0});case 7:return l=o.sent,o.next=10,c("flow/flow_addBlankResourceForEnabledModesAndLangs",null,{root:!0});case 10:return u=o.sent,o.next=13,c("flow/flow_addBlankResourceForEnabledModesAndLangs",null,{root:!0});case 13:return d=o.sent,b={uuid:(new n["IdGeneratorUuidV4"]).generate(),tag:"Default",label:"Default"},f={uuid:(new n["IdGeneratorUuidV4"]).generate(),tag:"Error",label:"Error"},o.t0=i["defaults"],o.t1=r,o.t2=a,o.next=21,c("flow/block_createBlockDefaultExitWith",{props:b},{root:!0});case 21:return o.t3=o.sent,o.next=24,c("flow/block_createBlockExitWith",{props:f},{root:!0});case 24:return o.t4=o.sent,o.t5=[o.t3,o.t4],o.t6={prompt:l.uuid,questionPrompt:u.uuid,choicesPrompt:d.uuid,choices:{1:s.uuid}},o.t7={type:o.t2,name:"",label:"",semanticLabel:"",exits:o.t5,config:o.t6},o.abrupt("return",(0,o.t0)(o.t1,o.t7));case 29:case"end":return o.stop()}}),o)})))()}};t["c"]={namespaced:!0,getters:l,mutations:u,actions:d}}}]);
//# sourceMappingURL=chunk-c33ed792.aba1c2c7.js.map