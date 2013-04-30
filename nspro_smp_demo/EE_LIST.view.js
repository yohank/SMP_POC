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
					footerText : "Copyright 2013 /N SPRO"
				});



//		var oModel = new sap.ui.model.json.JSONModel();
//		var	 oModel = new sap.ui.model.odata.ODataModel(  
//				"https://smp-p1640909369trial.hanatrial.ondemand.com/public/Flight?sap-client=100");
//
//		oModel.setHeaders(
//				{
//					"X-SUP-APPCID" : "e9483a12-9c1a-4da4-a458-45a5e1d2b08e"}
//
//
//		);

		var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog('busyDialog',{text:'Loading Employees...', title: 'Loading'});

		var oModel = new sap.ui.model.odata.ODataModel(
		"http://tst.nspro.it/sap/opu/odata/sap/ZBIDDER_SRV?sap-client=100",
		false, "WEIW", "a12345");


//		var oModelTwitter = new sap.ui.model.json.JSONModel("http://search.twitter.com/search.json?q=nsproWeb");

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
				//alert(oPernr.getText());

				//	var oModel2 = new sap.ui.model.odata.ODataModel(
				//			"http://tst.nspro.it/sap/opu/odata/sap/ZBIDDER_SRV/UserPhoto('00000001')?sap-client=100`",
				//			false, "WEIW", "a12345");
				//	var toto = oModel2.getProperty("DataLength");
				//	alert(toto);
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
			template: itemTemplate
		});


		var urImage = "data:image/png;base64,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";
		var oImage =  new sap.m.Image({
			src: urImage,
			alt: "test image",
			decorative: false,
			width: "150px",
			height: "150px",
			densityAware: false
		});
		oImage.addStyleClass("displayed");

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



		oPage.addContent(oListHtml);

		var oImageWithoutDensityAware = new sap.m.Image({
			src: "images/SAPLogo.jpg",
			alt: "test image",
			decorative: false,
			width: "150px",
			height: "74px",
			densityAware: false
		});

		var list = new sap.m.List({inset: true});


		//	list.addItem(new sap.m.InputListItem({label: 'EE Number', content: [
		//			new sap.m.Input({type: "Text", placeholder: "No Data",value: "{Pernr}",Enabled:false})
		//		]}));
		//		list.addItem(new sap.m.InputListItem({label: 'LastName', content: [
		//		     new sap.m.Input({type: "Text", placeholder: "No Data",value: "{LastName}",Enabled:false})
		// 		 ]}));

		//		list.addItem(new sap.m.InputListItem({label: 'FirstName', content: [
		//		  new sap.m.Input({type: "Text", placeholder: "No Data",value: "{FirstName}",Enabled:false})
		//	                                                    		]}));

		list.addItem(
				new sap.m.DisplayListItem({
					id : "Image",
					label : "",
					value : oImage,

				}));

		list.addItem(
				new sap.m.DisplayListItem({
					id : "First",
					label : "First Name",
					value : "{FirstName}",



				}));

		list.addItem(
				new sap.m.DisplayListItem({
					id : "LastName",
					label : "Last Name",
					value : "{LastName}",



				}));



		list.addItem(new sap.m.DisplayListItem({
			label : "Tel",
			value : "{Telnr}",
			type : "Active",
			Enabled:false,
			placeholder: "No Data",
			tap : function() {
				sap.m.URLHelper.triggerTel("{Telnr}");
			}
		}));                                                    		

		list.addItem(new sap.m.DisplayListItem({
			label : "SMS",
			value : "{Telnr}",
			type : "Active",
			Enabled:false,
			placeholder: "No Data",
			tap : function() {
				sap.m.URLHelper.triggerSms("{Telnr}");
			}
		}));  		                                                   


		list.addItem(new sap.m.DisplayListItem({
			id : "email",
			label : "E-mail",
			value : "{Email}",
			type : "Active",
			tap : function() {
				sap.m.URLHelper.triggerEmail("{Email}", "Info", "Dear " + "{FirstName}" + ",");

			}

		}));

		list.addItem(
				new sap.m.DisplayListItem({
					id : "Address",
					label : "Address",
					value : "{Address}",
					type : "Active",
				}));





		var oPernr = new sap.m.Label({
			text: "{Pernr}",

			design: "Bold",
			textAlign: "Center"
		});
		var oLastName = new sap.m.Label({
			text: "{LastName}",

			design: "Bold",
			textAlign: "Center"
		});
		var oFirstName = new sap.m.Label({
			text: "{FirstName}",
			design: "Bold",
			textAlign: "Center"
		});
		var oVBox2 = new sap.m.VBox("vbox2", {
			items:[

			       oFirstName,
			       oLastName,
			       oPernr,

			       ]
		});


		var oHBox2 = new sap.m.HBox("hbox2", {
			items:[
			       oImage,
			       //oVBox2,

			       ]
		});
		oPage2.addContent(oImage);
		oPage2.addContent(list);
		// oPage2.addContent(oAddress);
		function handleTap(e) {
			//  alert("test Nicolas");
		};
		var app = new sap.m.App("mobile");
		return  app.addPage(oPage).addPage(oPage2);;
	}




});