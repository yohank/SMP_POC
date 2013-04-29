/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.BusyIndicatorRenderer");sap.m.BusyIndicatorRenderer={};
sap.m.BusyIndicatorRenderer.render=function(r,c){if(!c.getVisible()){return}var s=(jQuery.os.ios)?13:4;r.write("<div");r.writeControlData(c);r.writeAttribute("class","sapMBusyIndicator");r.write(">");if(c.getCustomIcon()){if(!c._iconImage){var w=c.getCustomIconWidth()||'44px';var h=c.getCustomIconHeight()||'44px';c._iconImage=new sap.m.Image(c.getId()+"-icon",{src:c.getCustomIcon(),width:w,height:h,densityAware:c.getCustomIconDensityAware()}).addStyleClass('sapMBsyIndIcon')}r.renderControl(c._iconImage)}else{r.write("<div");r.writeAttribute("class","sapMSpinner");r.addStyle('width',c.getSize());r.addStyle('height',c.getSize());r.writeStyles();r.write(">");for(var i=1;i<s;i++){var b='sapMSpinBar'+i;if(!jQuery.os.ios){if(i===3){var B='sapMSpinBar'+4;r.write('<div class="'+b+'"><div class="'+B+'"></div></div>');break}}r.write('<div class="'+b+'"></div>')}r.write("</div>")}if(c.getText()){if(!c._oLabel){c._oLabel=new sap.m.Label(c.getId()+"-label",{text:c.getText()}).addStyleClass("sapMBsyIndLabel");if(c.getTextDirection()){c._oLabel.setTextDirection(c.getTextDirection())}}r.renderControl(c._oLabel)}r.write("</div>")};
