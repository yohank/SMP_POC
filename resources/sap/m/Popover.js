/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.Popover");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Popover",{metadata:{publicMethods:["close","openBy"],library:"sap.m",properties:{"placement":{type:"sap.m.PlacementType",group:"Behavior",defaultValue:sap.m.PlacementType.Right},"showHeader":{type:"boolean",group:"Appearance",defaultValue:true},"title":{type:"string",group:"Appearance",defaultValue:null},"modal":{type:"boolean",group:"Behavior",defaultValue:false},"offsetX":{type:"int",group:"Appearance",defaultValue:0},"offsetY":{type:"int",group:"Appearance",defaultValue:0}},defaultAggregation:"content",aggregations:{"content":{type:"sap.ui.core.Control",multiple:true,singularName:"content"},"customHeader":{type:"sap.ui.core.Control",multiple:false},"footer":{type:"sap.ui.core.Control",multiple:false}},associations:{"leftButton":{type:"sap.m.Button",multiple:false},"rightButton":{type:"sap.m.Button",multiple:false}},events:{"afterOpen":{},"afterClose":{},"beforeOpen":{},"beforeClose":{}}}});sap.m.Popover.M_EVENTS={'afterOpen':'afterOpen','afterClose':'afterClose','beforeOpen':'beforeOpen','beforeClose':'beforeClose'};jQuery.sap.require("sap.ui.core.Popup");jQuery.sap.require("sap.m.Bar");
sap.m.Popover.prototype.init=function(){this._arrowOffsetThreshold=15;this._marginTopInit=false;this._marginTop=jQuery.os.ios?44:48;this._marginLeft=10;this._marginRight=10;this._marginBottom=10;this._$window=jQuery(window);this.oPopup=new sap.ui.core.Popup();this.oPopup.setShadow(true);this.oPopup.setAutoClose(true);this.oPopup.setAnimations(this._openAnimation,this._closeAnimation);this._placements=[sap.m.PlacementType.Top,sap.m.PlacementType.Right,sap.m.PlacementType.Bottom,sap.m.PlacementType.Left];this._myPositions=["center bottom","begin center","center top","end center"];this._atPositions=["center top","end center","center bottom","begin center"];this._offsets=["0 -18","18 0","0 18","-18 0"];this._arrowOffset=18;this._fSetArrowPosition=jQuery.proxy(this._setArrowPosition,this);this._fOrientationChange=jQuery.proxy(this._onOrientationChange,this);var t=this;this.oPopup._applyPosition=function(p){sap.ui.core.Popup.prototype._applyPosition.call(this,p);t._fSetArrowPosition()}};
sap.m.Popover.prototype.onBeforeRendering=function(){if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null}};
sap.m.Popover.prototype.onAfterRendering=function(){var $,a,b;if(!this._marginTopInit){this._marginTop=2;if(this._oOpenBy){$=(this._oOpenBy instanceof sap.ui.core.Control)?this._oOpenBy.$():jQuery(this._oOpenBy);if(!($.closest("header.sapMBar").length>0)){a=$.closest(".sapMPage");if(a.length>0){b=a.children("header.sapMBar");if(b.length>0){this._marginTop+=b.outerHeight()}}}this._marginTopInit=true}}};
sap.m.Popover.prototype.exit=function(){this.oPopup.close();this.oPopup.destroy();this.oPopup=null;if(this._internalHeader){this._internalHeader.destroy();this._internalHeader=null}if(this._headerTitle){this._headerTitle.destroy()}if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null}this._$window.unbind("resize",this._fOrientationChange)};
sap.m.Popover.prototype.openBy=function(c){var p=this.oPopup,P,i;if(p.isOpen()){if(this._oOpenBy===c){return}else{this.close();this.$().css("visibility","hidden")}}if(!c){return}if(!this._oOpenBy||c!==this._oOpenBy){this._oOpenBy=c}this.fireBeforeOpen({openBy:this._oOpenBy});p.attachEvent("opened",this._handleOpened,this);i=jQuery.inArray(this.getPlacement(),this._placements);if(i>-1){P=(this._oOpenBy instanceof sap.ui.core.Control)?this._oOpenBy.getDomRef():this._oOpenBy;p.setContent(this);p.setPosition(this._myPositions[i],this._atPositions[i],P,this._calcOffset(this._offsets[i]),"fit");var t=this;var C=function(){if(p.getOpenState()===sap.ui.core.OpenState.CLOSING){setTimeout(C,150)}else{p.open();t._$window.bind("resize",t._fOrientationChange)}};C()}else{jQuery.sap.log.error(this.getPlacement()+"is not a valid value! It can only be top, right, bottom or left")}};
sap.m.Popover.prototype.close=function(){var e=this.oPopup.getOpenState();if(!(e===sap.ui.core.OpenState.CLOSED||e===sap.ui.core.OpenState.CLOSING)){this.fireBeforeClose({openBy:this._oOpenBy});this.oPopup.close()}};
sap.m.Popover.prototype._onOrientationChange=function(){var e=this.oPopup.getOpenState();if(!(e===sap.ui.core.OpenState.OPEN)){return}this.oPopup._applyPosition(this.oPopup._oLastPosition)};
sap.m.Popover.prototype._handleOpened=function(){this.oPopup.detachEvent("opened",this._handleOpened,this);this.oPopup.attachEvent("closed",this._handleClosed,this);this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),this._fSetArrowPosition);this.fireAfterOpen({openBy:this._oOpenBy})};
sap.m.Popover.prototype._handleClosed=function(){this.oPopup.detachEvent("closed",this._handleClosed,this);if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null}this.fireAfterClose({openBy:this._oOpenBy})};
sap.m.Popover.prototype._hasNavContent=function(){var c=this.getAggregation("content");if(jQuery.isArray(c)&&c.length===1&&c[0]instanceof sap.m.NavContainer){return true}else{return false}};
sap.m.Popover.prototype._calcOffset=function(o){var O=this.getOffsetX(),i=this.getOffsetY();var p=o.split(" ");return(parseInt(p[0],10)+O)+" "+(parseInt(p[1],10)+i)};
sap.m.Popover.prototype._setArrowPosition=function(){var e=this.oPopup.getOpenState();if(!(e===sap.ui.core.OpenState.OPEN||e===sap.ui.core.OpenState.OPENING)){return}var $=(this._oOpenBy instanceof sap.ui.core.Control)?this._oOpenBy.$():jQuery(this._oOpenBy),a=this.$(),p=this.getPlacement(),b=jQuery.sap.byId(this.getId()+"-arrow"),c=a.offset(),o=this.getOffsetX(),O=this.getOffsetY(),w=a.outerWidth(),h=a.outerHeight(),P;var W=this._$window.scrollLeft(),i=this._$window.scrollTop(),d=this._$window.width(),f=this._$window.height();var m=this._marginLeft,M=this._marginRight,g=this._marginTop,j=this._marginBottom;switch(p){case sap.m.PlacementType.Left:M=this._$window.width()-$.offset().left+this._arrowOffset-this.getOffsetX();break;case sap.m.PlacementType.Right:m=$.offset().left+$.outerWidth()+this._arrowOffset+this.getOffsetX();break;case sap.m.PlacementType.Top:j=this._$window.height()-$.offset().top+this._arrowOffset-this.getOffsetY();break;case sap.m.PlacementType.Bottom:g=$.offset().top+$.outerHeight()+this._arrowOffset+this.getOffsetY();break}var k=(c.left-W)<=m,l=(d-c.left-w)<=M,n=(c.top-i)<=g,q=(f-c.top-h)<=j;function r(s,t,u,v){if(p===sap.m.PlacementType.Left||p===sap.m.PlacementType.Right){if(s){a.css("left",m).css("right","")}if(t){a.css("right",M).css("left","")}if(u&&v){a.css("top",g).css("bottom","")}else{if(u){a.css("top",g).css("bottom","")}if(v){a.css("bottom",j).css("top","")}}}if(p===sap.m.PlacementType.Top||p===sap.m.PlacementType.Bottom){if(u){a.css("top",g).css("bottom","")}if(v){a.css("bottom",j).css("top","")}if(s&&t){if(($.offset().left+$.outerWidth()/2)<(jQuery(window).width()/2)){a.css("left",m).css("right","")}else{a.css("right",M).css("left","")}}else{if(s){a.css("left",m).css("right","")}if(t){a.css("right",M).css("left","")}}}}switch(p){case sap.m.PlacementType.Left:r(false,l,n,q);break;case sap.m.PlacementType.Right:r(k,false,n,q);break;case sap.m.PlacementType.Top:r(k,l,false,q);break;case sap.m.PlacementType.Bottom:r(k,l,n,false);break}if(p===sap.m.PlacementType.Left||p===sap.m.PlacementType.Right){P=$.offset().top-a.offset().top-parseInt(a.css("border-top-width"))+O+0.5*($.outerHeight(false)-b.outerHeight(false));P=Math.max(P,this._arrowOffsetThreshold);P=Math.min(P,h-this._arrowOffsetThreshold-b.outerHeight());b.css("top",P)}else if(p===sap.m.PlacementType.Top||p===sap.m.PlacementType.Bottom){P=$.offset().left-a.offset().left-parseInt(a.css("border-left-width"))+o+0.5*($.outerWidth(false)-b.outerWidth(false));P=Math.max(P,this._arrowOffsetThreshold);P=Math.min(P,w-this._arrowOffsetThreshold-b.outerWidth());b.css("left",P)}switch(p){case sap.m.PlacementType.Left:b.addClass("sapMPopoverArrRight");break;case sap.m.PlacementType.Right:b.addClass("sapMPopoverArrLeft");break;case sap.m.PlacementType.Top:b.addClass("sapMPopoverArrDown");break;case sap.m.PlacementType.Bottom:b.addClass("sapMPopoverArrUp");break}};
sap.m.Popover.prototype._isPopupElement=function(d){var p=(this._oOpenBy instanceof sap.ui.core.Control)?this._oOpenBy.getDomRef():this._oOpenBy;return!!(jQuery(d).closest(sap.ui.getCore().getStaticAreaRef()).length)||!!(jQuery(d).closest(p).length)};
sap.m.Popover.prototype._getAnyHeader=function(){if(this.getCustomHeader()){return this.getCustomHeader().addStyleClass("sapMHeader-CTX",true)}else{if(this.getShowHeader()){this._createInternalHeader();return this._internalHeader.addStyleClass("sapMHeader-CTX",true)}}};
sap.m.Popover.prototype._createInternalHeader=function(){if(!this._internalHeader){this._internalHeader=new sap.m.Bar(this.getId()+"-intHeader");this._internalHeader.setParent(this,"internalHeader",false);return true}else{return false}};
sap.m.Popover.prototype._openAnimation=function(r,R,o){setTimeout(function(){r.addClass("sapMPopoverAnimation sapMPopoverTransparent");r.css("display","block");setTimeout(function(){r.bind("webkitTransitionEnd",function(){r.unbind("webkitTransitionEnd");r.removeClass("sapMPopoverAnimation sapMPopoverOpaque");o()});r.addClass("sapMPopoverOpaque").removeClass("sapMPopoverTransparent")},0)},0)};
sap.m.Popover.prototype._closeAnimation=function(r,R,c){r.addClass("sapMPopoverAnimation sapMPopoverOpaque");setTimeout(function(){r.bind("webkitTransitionEnd",function(){r.unbind("webkitTransitionEnd");r.removeClass("sapMPopoverAnimation sapMPopoverTransparent");c()}).addClass("sapMPopoverTransparent").removeClass("sapMPopoverOpaque")},0)};
sap.m.Popover.prototype.setPlacement=function(p){this.setProperty("placement",p,true);return this};
sap.m.Popover.prototype.setTitle=function(t){if(t){this.setProperty("title",t,true);if(this._headerTitle){this._headerTitle.setText(t)}else{this._headerTitle=new sap.m.Label(this.getId()+"-title",{text:this.getTitle()});this._createInternalHeader();if(jQuery.os.ios){this._internalHeader.addContentMiddle(this._headerTitle)}else{this._internalHeader.addContentLeft(this._headerTitle)}}}return this};
sap.m.Popover.prototype.setLeftButton=function(b){if(typeof(b)==="string"){b=sap.ui.getCore().byId(b)}var o=sap.ui.getCore().byId(this.getLeftButton());if(o===b){return this}this._createInternalHeader();if(b){if(jQuery.os.ios){if(o){this._internalHeader.removeAggregation("contentLeft",o,true)}this._internalHeader.addAggregation("contentLeft",b,true)}else{if(o){this._internalHeader.removeAggregation("contentRight",o,true)}this._internalHeader.insertAggregation("contentRight",b,0,true)}this._internalHeader.invalidate()}else{if(jQuery.os.ios){this._internalHeader.removeContentLeft(o)}else{this._internalHeader.removeContentRight(o)}}this.setAssociation("leftButton",b,true);return this};
sap.m.Popover.prototype.setRightButton=function(b){if(typeof(b)==="string"){b=sap.ui.getCore().byId(b)}var o=sap.ui.getCore().byId(this.getRightButton());if(o===b){return this}this._createInternalHeader();if(b){if(o){this._internalHeader.removeAggregation("contentRight",o,true)}this._internalHeader.insertAggregation("contentRight",b,1,true);this._internalHeader.invalidate()}else{this._internalHeader.removeContentRight(o)}this.setAssociation("rightButton",b,true);return this};
sap.m.Popover.prototype.setShowHeader=function(v){if(v===this.getShowHeader()||this.getCustomHeader()){return this}if(v){if(this._internalHeader){this._internalHeader.$().show()}}else{if(this._internalHeader){this._internalHeader.$().hide()}}this.setProperty("showHeader",v,true);return this};
sap.m.Popover.prototype.setModal=function(m){if(m===this.getModal()){return this}this.oPopup.setModal(m,"sapMPopoverBLayer");this.setProperty("modal",m,true);return this};
sap.m.Popover.prototype.setOffsetX=function(v){var e=this.oPopup.getOpenState(),l,p;this.setProperty("offsetX",v,true);if(!(e===sap.ui.core.OpenState.OPEN)){return this}l=this.oPopup._oLastPosition;p=jQuery.inArray(this.getPlacement(),this._placements);if(p>-1){l.offset=this._calcOffset(this._offsets[p]);this.oPopup._applyPosition(l)}return this};
sap.m.Popover.prototype.setOffsetY=function(v){var e=this.oPopup.getOpenState(),l,p;this.setProperty("offsetY",v,true);if(!(e===sap.ui.core.OpenState.OPEN)){return this}l=this.oPopup._oLastPosition;p=jQuery.inArray(this.getPlacement(),this._placements);if(p>-1){l.offset=this._calcOffset(this._offsets[p]);this.oPopup._applyPosition(l)}return this};
