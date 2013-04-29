/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.SelectRenderer");sap.m.SelectRenderer={};
sap.m.SelectRenderer.render=function(r,s){var n=s.getName(),t=s.getTitle(),I=s.getItems(),S=s.getSelectedItem(),a=(S instanceof sap.ui.core.Item)?S.getText():s._sNoData,b=s.getAssociation("selectedItem"),c=I.length,i;if(!s.getVisible()){return}r.write("<div");r.addClass("sapMSlt");if(!s.getEnabled()){r.addClass("sapMSltDisabled")}r.addStyle("width",s.getWidth());r.addStyle("max-width",s.getMaxWidth());r.writeControlData(s);r.writeStyles();r.writeClasses();r.write(">");r.write('<span class="sapMSltText">');r.writeEscaped(a);r.write('</span>');r.write('<span class="sapMSltIcon"></span>');if(c!==0){r.write("<select");if(n!==""){r.writeAttributeEscaped("name",n)}if(t!==""){r.writeAttributeEscaped("title",t)}if(!s.getEnabled()){r.write(" disabled")}r.write(">");for(i=0;i<c;i++){r.write("<option");r.writeAttribute("id",I[i].getId());r.writeAttributeEscaped("value",I[i].getKey());if(I[i].getId()===b){r.write(" selected")}if(!I[i].getEnabled()){r.write(" disabled")}r.write(">");r.writeEscaped(I[i].getText());r.write("</option>")}r.write("</select>")}r.write("</div>")};
