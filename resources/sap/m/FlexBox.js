/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.FlexBox");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.FlexBox",{metadata:{library:"sap.m",properties:{"visible":{type:"boolean",group:"Appearance",defaultValue:true},"displayInline":{type:"boolean",group:"Appearance",defaultValue:false},"direction":{type:"sap.m.FlexDirection",group:"Appearance",defaultValue:sap.m.FlexDirection.Row},"fitContainer":{type:"boolean",group:"Appearance",defaultValue:false},"renderType":{type:"sap.m.FlexRendertype",group:"Misc",defaultValue:sap.m.FlexRendertype.Div},"justifyContent":{type:"sap.m.FlexJustifyContent",group:"Appearance",defaultValue:sap.m.FlexJustifyContent.Start},"alignItems":{type:"sap.m.FlexAlignItems",group:"Appearance",defaultValue:sap.m.FlexAlignItems.Stretch}},defaultAggregation:"items",aggregations:{"items":{type:"sap.ui.core.Control",multiple:true,singularName:"item"}}}});jQuery.sap.require("sap.ui.core.EnabledPropagator");jQuery.sap.require("sap.m.FlexBoxStylingHelper");sap.ui.core.EnabledPropagator.apply(sap.m.FlexBox.prototype,[true]);
sap.m.FlexBox.prototype.init=function(){if(this instanceof sap.m.HBox&&(this.getDirection()!=="Row"||this.getDirection()!=="RowReverse")){this.setDirection('Row')}if(this instanceof sap.m.VBox&&(this.getDirection()!=="Column"||this.getDirection()!=="ColumnReverse")){this.setDirection('Column')}};
sap.m.FlexBox.prototype.setDisplayInline=function(i){var d="";this.setProperty("displayInline",i,true);if(i){d="inline-flex"}else{d="flex"}sap.m.FlexBoxStylingHelper.setStyle(null,this,"display",d);return this};
sap.m.FlexBox.prototype.setDirection=function(v){this.setProperty("direction",v,true);sap.m.FlexBoxStylingHelper.setStyle(null,this,"flex-direction",v);return this};
sap.m.FlexBox.prototype.setFitContainer=function(v){this.setProperty("fitContainer",v,true);return this};
sap.m.FlexBox.prototype.setJustifyContent=function(v){this.setProperty("justifyContent",v,true);sap.m.FlexBoxStylingHelper.setStyle(null,this,"justify-content",v);return this};
sap.m.FlexBox.prototype.setAlignItems=function(v){this.setProperty("alignItems",v,true);sap.m.FlexBoxStylingHelper.setStyle(null,this,"align-items",v);return this};
sap.m.FlexBox.prototype.setAlignContent=function(v){this.setProperty("alignContent",v,true);sap.m.FlexBoxStylingHelper.setStyle(null,this,"align-content",v);return this};
