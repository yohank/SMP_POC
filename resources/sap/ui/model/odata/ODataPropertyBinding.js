/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.model.odata.ODataPropertyBinding");jQuery.sap.require("sap.ui.model.PropertyBinding");
sap.ui.model.odata.ODataPropertyBinding=function(m,p,c){sap.ui.model.PropertyBinding.apply(this,arguments);this.oValue=this._getValue()};
sap.ui.model.odata.ODataPropertyBinding.prototype=jQuery.sap.newObject(sap.ui.model.PropertyBinding.prototype);sap.ui.base.Object.defineClass("sap.ui.model.odata.ODataPropertyBinding",{baseType:"sap.ui.model.PropertyBinding",publicMethods:[]});
sap.ui.model.odata.ODataPropertyBinding.prototype.getValue=function(){return this.oValue};
sap.ui.model.odata.ODataPropertyBinding.prototype._getValue=function(){return this.oModel._getObject(this.sPath,this.oContext)};
sap.ui.model.odata.ODataPropertyBinding.prototype.setValue=function(v){if(this.oValue!=v){if(!this.oModel.setProperty(this.sPath,v,this.oContext)){this._fireChange()}}};
sap.ui.model.odata.ODataPropertyBinding.prototype.setContext=function(c){this.oContext=c;this.checkUpdate()};
sap.ui.model.odata.ODataPropertyBinding.prototype.checkUpdate=function(f){var v=this._getValue();if(v!==this.oValue||f){this.oValue=v;this._fireChange()}};
sap.ui.model.odata.ODataPropertyBinding.prototype._refresh=function(){this.checkUpdate()};
