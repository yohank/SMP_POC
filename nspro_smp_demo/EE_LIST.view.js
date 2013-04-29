sap.ui.jsview("nspro_smp_demo.EE_LIST", {

	getControllerName : function() {
		return "nspro_smp_demo.EE_LIST";
	},

	createContent : function(oController) {



		var oListHtml = new sap.m.List(
				{
					inset : false,
					//'delete': deleteItem,
					headerText : "Employee",
					footerText : "POC NSPRO TEAM"
				});



		//var oModel = new sap.ui.model.json.JSONModel();
		/*	    var	 oModel = new sap.ui.model.odata.ODataModel(  
            "https://smp-p1640909369trial.hanatrial.ondemand.com/public/Flight?sap-client=100");

oModel.setHeaders(
{

	                  		 "X-SUP-APPCID" : "e9483a12-9c1a-4da4-a458-45a5e1d2b08e"}


);*/

		var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog('busyDialog',{text:'Loading EE Data', title: 'Loading'});

		var oModel = new sap.ui.model.odata.ODataModel(
				"http://tst.nspro.it/sap/opu/odata/sap/ZBIDDER_SRV?sap-client=100",
				false, "WEIW", "a12345");


		oModel.attachRequestSent(function(){busyDialog.open();});
		oModel.attachRequestCompleted(function(){busyDialog.close();});
		oModel.attachRequestFailed(function(evt) {
			alert("Server error: " + evt.getParameter("message") + " - " + evt.getParameter("statusText"));
		});

		jQuery.sap.log.debug(oModel);
//		BusyDialog
		oModel.attachRequestSent(function(){busyDialog.open();});
		oModel.attachRequestCompleted(function(){busyDialog.close();});
		oCore = sap.ui.getCore().setModel(oModel);

		itemTemplate = new sap.m.StandardListItem({
			title : '{FirstName}',
			tap: function(oEvent) {
				oPage2.setBindingContext(oEvent.getSource().getBindingContext());
				app.to("page2");
			},
			type: "Navigation",
			description: "{FirstName}",
			customData: [
			             new sap.ui.core.CustomData({
			            	 key: "LastName",
			            	 value: "{LastName}"
			             }),
			             ]
		});
		
		oListHtml.bindAggregation("items", {
			path: "/Users?sap-client=100",
			template: itemTemplate,
			sorter: new sap.ui.model.Sorter("LastName",true)
		});
		


		var oPage =new sap.m.Page({
			title: "Employee List",
			content: [

			          ]
		});

		var oPage2 =new sap.m.Page("page2",{
			title: "Details",
			showNavButton : true,
			navButtonText : "Back",
			navButtonTap : function() {
				app.back();
			},
			content: [

			          ]
		});


		// create a simple SearchField
		var oSearch = new sap.m.SearchField("simpleSearch", {
		        enableListSuggest: false,
		        search: function(oEvent){
		                alert("Search triggered: " + oEvent.getParameter("query"));
		                var oFilter1 = new sap.ui.model.Filter("LastName", sap.ui.model.FilterOperator.Contains, "Paz");
		                var oFilter2 = new sap.ui.model.Filter("FirstName", sap.ui.model.FilterOperator.Contains, "Paz");
		                oListHtml.bindItems("/Users?sap-client=100", itemTemplate, [oFilter1,oFilter2]);
				        
		        }
		});
		oSearch.setShowMagnifier(true);
		oSearch.setPlaceholder("Search NSPRO Employees");
		//oPage.addContent(oSearch);
		oPage.addContent(oListHtml);

		var list = new sap.m.List({inset: true});


		list.addItem(new sap.m.InputListItem({label: 'EE Number', content: [
		                                                                    new sap.m.Input({type: "Text", placeholder: "No Data",value: "{Pernr}",Enabled:false})
		                                                                    ]}));
		list.addItem(new sap.m.InputListItem({label: 'LastName', content: [
		                                                                   new sap.m.Input({type: "Text", placeholder: "No Data",value: "{LastName}",Enabled:false})
		                                                                   ]}));

		list.addItem(new sap.m.InputListItem({label: 'FirstName', content: [
		                                                                    new sap.m.Input({type: "Text", placeholder: "No Data",value: "{FirstName}",Enabled:false})
		                                                                    ]}));

		list.addItem(new sap.m.InputListItem({label: 'Email', content: [
new sap.m.Button({
	text : "{Email}",
	icon : "images/action.png", /* Depends where your images are located */
	tap : function(oEvent) {
		oEvent.getSource().getBindingContext();
		sap.m.URLHelper.triggerEmail("{Email}", "Info", "Dear " + "{LastName}" + ","); 
		//sap.m.URLHelper.triggerTel("{Email}");
	}
})

//	 new sap.m.Input({type: "Email", placeholder: "No Data",value: "{Email}",Enabled:false}

//	 )
]}));

		list.addItem(new sap.m.InputListItem({label: 'Adress', content: [
		                                                                 new sap.m.Input({type: "Text", placeholder: "No Data",value: "{Address}",Enabled:false})
		                                                                 ]}));




		oPage2.addContent(list);
		// oPage2.addContent(oAddress);
		function handleTap(e) {
			alert("test Nicolas");
		};
		var app = new sap.m.App("mobile");
		return  app.addPage(oPage).addPage(oPage2);;
	}




});