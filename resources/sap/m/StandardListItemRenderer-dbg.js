/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */

jQuery.sap.declare("sap.m.StandardListItemRenderer");
jQuery.sap.require("sap.ui.core.Renderer");
jQuery.sap.require("sap.m.ListItemBaseRenderer");

/**
 * @class StandardListItem renderer.
 * @static
 */
sap.m.StandardListItemRenderer = sap.ui.core.Renderer.extend(sap.m.ListItemBaseRenderer);

/**
 * Renders the HTML for the given control, using the provided
 * {@link sap.ui.core.RenderManager}.
 * 
 * @param {sap.ui.core.RenderManager}
 *          oRenderManager the RenderManager that can be used for writing to the
 *          Render-Output-Buffer
 * @param {sap.ui.core.Control}
 *          oControl an object representation of the control that should be
 *          rendered
 */
sap.m.StandardListItemRenderer.renderLIAttributes = function(rm, oLI) {
	rm.addClass("sapMSLI");
};

sap.m.StandardListItemRenderer.renderLIContent = function(rm, oLI) {

	// image
	if (oLI.getIcon()) {
		if (oLI.getIconInset()) {
			rm.renderControl(oLI._getImage((oLI.getId() + "-img"), "sapMSLIImg", oLI.getIcon(), oLI.getIconDensityAware()));
		} else {
			rm.renderControl(oLI._getImage((oLI.getId() + "-img"), "sapMSLIImgThumb", oLI.getIcon(), oLI.getIconDensityAware()));
		}
	}

	var isDescription = oLI.getTitle() && oLI.getDescription();

	if (isDescription) {
		rm.write("<div");
		rm.addClass("sapMSLIDiv");
		rm.writeClasses();
		rm.write(">");
	}

	// List item text (also written when no title for keeping the space)
	rm.write("<h1");
	if (isDescription) {
		rm.addClass("sapMSLITitle");
	} else {
		rm.addClass("sapMSLIDiv");
		rm.addClass("sapMSLITitleOnly");
	}

	rm.writeClasses();
	rm.write(">");
	rm.writeEscaped(oLI.getTitle());
	rm.write("</h1>");

	// List item text
	if (isDescription) {
		rm.write("<p");
		rm.addClass("sapMSLIDescription");
		rm.writeClasses();
		rm.write(">");
		rm.writeEscaped(oLI.getDescription());
		rm.write("</p>");
	}

	if (isDescription) {
		rm.write("</div>");
	}
};
