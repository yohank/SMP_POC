/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.ListItemBase");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.ListItemBase",{metadata:{publicMethods:["setSelected","isSelected"],library:"sap.m",properties:{"type":{type:"sap.m.ListType",group:"Misc",defaultValue:sap.m.ListType.Inactive},"visible":{type:"boolean",group:"Appearance",defaultValue:true}},events:{"tap":{},"detailTap":{}}}});sap.m.ListItemBase.M_EVENTS={'tap':'tap','detailTap':'detailTap'};sap.m.ListItemBase.prototype._mode=sap.m.ListMode.None;
sap.m.ListItemBase.prototype._getRadioButton=function(r,g){var _=this._radioButton||new sap.m.RadioButton(r,{groupName:g,activeHandling:false}).setParent(this,null,true).attachSelect(this._select);return this._radioButton=_};
sap.m.ListItemBase.prototype._getCheckBox=function(b){var _=this._checkBox||new sap.m.CheckBox(b,{activeHandling:false}).setParent(this,null,true).attachSelect(this._select);return this._checkBox=_};
sap.m.ListItemBase.prototype.exit=function(){if(this._radioButton){this._radioButton.destroy()}if(this._checkBox){this._checkBox.destroy()}if(this._navImage){this._navImage.destroy()}if(this._delImage){this._delImage.destroy()}};
sap.m.ListItemBase.prototype.isSelected=function(){var s=false;if(this._mode===sap.m.ListMode.SingleSelect){s=this._radioButton.getSelected()}if(this._mode===sap.m.ListMode.MultiSelect){s=this._checkBox.getSelected()}return s};
sap.m.ListItemBase.prototype.setSelected=function(s){var l=sap.ui.getCore().byId(this._listId);l.setSelectedItem(this,s)};
sap.m.ListItemBase.prototype._getNavImage=function(i,I,s,a){if(!jQuery.os.ios&&this.getType()==sap.m.ListType.Navigation)return null;if(!this._imagePath)if(jQuery.os.ios)this._imagePath=jQuery.sap.getModulePath("sap.m",'/')+"themes/"+sap.ui.getCore().getConfiguration().getTheme()+"/img/list/ios/";else this._imagePath=jQuery.sap.getModulePath("sap.m",'/')+"themes/"+sap.ui.getCore().getConfiguration().getTheme()+"/img/list/android/";if(a){a=this._imagePath+a}var n=this._navImage||new sap.m.Image(i,{src:this._imagePath+s,activeSrc:a}).addStyleClass(I,true).setParent(this,null,true);;return this._navImage=n};
sap.m.ListItemBase.prototype._getDelImage=function(i,I,s){if(!this._imagePath)if(jQuery.os.ios)this._imagePath=jQuery.sap.getModulePath("sap.m",'/')+"themes/"+sap.ui.getCore().getConfiguration().getTheme()+"/img/list/ios/";else this._imagePath=jQuery.sap.getModulePath("sap.m",'/')+"themes/"+sap.ui.getCore().getConfiguration().getTheme()+"/img/list/android/";var d=this._delImage||new sap.m.Image(i,{src:this._imagePath+s}).addStyleClass(I,true).setParent(this,null,true).attachTap(this._delete);return this._delImage=d};
sap.m.ListItemBase.prototype.ontap=function(e){var t=this.getType();if(this._includeItemInSelection&&(this._mode===sap.m.ListMode.SingleSelect||this._mode===sap.m.ListMode.MultiSelect)){switch(this._mode){case sap.m.ListMode.SingleSelect:if(e.srcControl&&e.srcControl.getId()!==this._radioButton.getId()){this.setSelected(true)}(sap.ui.getCore().byId(this._listId))._selectTapped(this);break;case sap.m.ListMode.MultiSelect:if(e.srcControl&&e.srcControl.getId()!==this._checkBox.getId()){this.setSelected(!this.isSelected())}(sap.ui.getCore().byId(this._listId))._selectTapped(this);break}}else{switch(t){case sap.m.ListType.Inactive:break;case sap.m.ListType.Active:case sap.m.ListType.Navigation:var a=this._doActiveHandling(e);if(a&&(!this._eventHandledByControl||e.srcControl.getId()!==(this.getId()+"-imgNav"))){window.clearTimeout(this._timeoutIdStart);window.clearTimeout(this._timeoutIdEnd);this._event=e;this._active=true;this._activeHandling();if(t===sap.m.ListType.Navigation){this._activeHandlingNav()}this._activeHandlingInheritor();var b=this}if(!this._eventHandledByControl){this.fireTap({})}if(a&&(!this._eventHandledByControl||e.srcControl.getId()!==(this.getId()+"-imgNav"))){window.setTimeout(function(){b._active=false;b._activeHandling();if(t===sap.m.ListType.Navigation){b._inactiveHandlingNav()}b._inactiveHandlingInheritor()},180)}break;case sap.m.ListType.Detail:if(e.srcControl&&e.srcControl.getId()===(this.getId()+"-imgDet")){this.fireDetailTap({})}break;case sap.m.ListType.DetailAndActive:if(e.srcControl&&e.srcControl.getId()===(this.getId()+"-imgDet")){this.fireDetailTap({})}else{var a=this._doActiveHandling(e);if(a&&(!this._eventHandledByControl)){window.clearTimeout(this._timeoutIdStart);window.clearTimeout(this._timeoutIdEnd);this._event=e;this._active=true;this._activeHandling();this._activeHandlingInheritor();var b=this}if(!this._eventHandledByControl){this.fireTap({})}if(a&&(!this._eventHandledByControl)){window.setTimeout(function(){b._active=false;b._activeHandling();b._inactiveHandlingInheritor()},180)}}break;default:}}};
sap.m.ListItemBase.prototype.ontouchstart=function(e){this._eventHandledByControl=e.originalEvent._sapui_handledByControl;this._active=true;var t=this;var _=e;if(!t._touchEndProxy){t._touchEndProxy=jQuery.proxy(t._ontouchend,t)}jQuery(window.document).bind("vmouseup touchcancel",t._touchEndProxy);if(!t._touchMoveProxy){t._touchMoveProxy=jQuery.proxy(t._ontouchmove,t)}jQuery(window.document).bind("vmousemove",t._touchMoveProxy);this._timeoutIdStart=window.setTimeout(function(){if(!(t._includeItemInSelection&&(t._mode===sap.m.ListMode.SingleSelect||t._mode===sap.m.ListMode.MultiSelect))&&((_.targetTouches&&_.targetTouches.length===1)||!_.targetTouches)){var a=t.getType();switch(a){case sap.m.ListType.Inactive:case sap.m.ListType.Detail:break;case sap.m.ListType.Active:case sap.m.ListType.Navigation:var b=t._doActiveHandling(e);if(b&&(!t._eventHandledByControl||e.srcControl.getId()!==(t.getId()+"-imgNav"))){t._event=e;t._activeHandling();if(a===sap.m.ListType.Navigation){t._activeHandlingNav()}t._activeHandlingInheritor()}break;case sap.m.ListType.DetailAndActive:var b=t._doActiveHandling(e);if(b&&e.srcControl.getId()!==(t.getId()+"-imgDet")&&(!t._eventHandledByControl)){t._event=e;t._activeHandling();t._activeHandlingInheritor()}break;default:}}},100)};
sap.m.ListItemBase.prototype._ontouchmove=function(e){if(this._active||this._timeoutIdStart){window.clearTimeout(this._timeoutIdStart);this._active=false;this._activeHandling();if(this.getType()===sap.m.ListType.Navigation){this._inactiveHandlingNav()}this._inactiveHandlingInheritor();this._timeoutIdStart=null;this._timeoutIdEnd=null}};
sap.m.ListItemBase.prototype._ontouchend=function(e){if((e.targetTouches&&e.targetTouches.length===0)||!e.targetTouches){var t=this.getType();var a=this;switch(t){case sap.m.ListType.Active:case sap.m.ListType.Navigation:case sap.m.ListType.DetailAndActive:this._timeoutIdEnd=window.setTimeout(function(){a._event=e;a._active=false;a._activeHandling();a._inactiveHandlingNav();a._inactiveHandlingInheritor()},100);break;case sap.m.ListType.Detail:case sap.m.ListType.Inactive:default:}jQuery(window.document).unbind("vmouseup touchcancel",this._touchEndProxy);jQuery(window.document).unbind("vmousemove",this._touchMoveProxy)}};
sap.m.ListItemBase.prototype._inactiveHandlingNav=function(){this._active=false;if(jQuery.os.ios){var i=sap.ui.getCore().byId(this.getId()+"-imgNav");if(i){i.setSrc(this._imagePath+"disclosure_indicator.png")}}};
sap.m.ListItemBase.prototype._activeHandlingNav=function(){if(jQuery.os.ios){var i=sap.ui.getCore().byId(this.getId()+"-imgNav");if(i){i.setSrc(this._imagePath+"disclosure_indicator_pressed.png")}}};
sap.m.ListItemBase.prototype._activeHandlingInheritor=function(){};
sap.m.ListItemBase.prototype._inactiveHandlingInheritor=function(){};
sap.m.ListItemBase.prototype._activeHandling=function(){this.$().toggleClass('sapMLIBActive',this._active)};
sap.m.ListItemBase.prototype._doActiveHandling=function(e){if(e.srcControl&&(!e.srcControl.getActiveHandling||e.srcControl.getActiveHandling&&e.srcControl.getActiveHandling()!==false)&&e.srcControl.getId()!==(this.getId()+"-imgDel")){return true}return false};
