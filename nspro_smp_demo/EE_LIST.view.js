sap.ui.jsview("nspro_smp_demo.EE_LIST", {

	getControllerName : function() {
		return "nspro_smp_demo.EE_LIST";
	},

	createContent : function(oController) {



		var oListHtml = new sap.m.List(
				{
					inset : false,
					//'delete': deleteItem,
					//headerText : "Employee",
					footerText : "Copyright 2013 /N SPRO"
				});



//		var oModel = new sap.ui.model.json.JSONModel();
//		var	 oModel = new sap.ui.model.odata.ODataModel(  
//		"https://smp-p1640909369trial.hanatrial.ondemand.com/public/Flight?sap-client=100");

//		oModel.setHeaders(
//		{
//		"X-SUP-APPCID" : "e9483a12-9c1a-4da4-a458-45a5e1d2b08e"}
//		);

		var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog('busyDialog',{text:'Employees...', title: 'Loading'});

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

		var busyPicDialog = (busyPicDialog) ? busyPicDialog : new sap.m.BusyDialog('busyPicDialog',{text:'Employee Photo...', title: 'Loading'});
		
		itemTemplate = new sap.m.StandardListItem({
			title : '{FirstName}',
			tap: function(oEvent) {
				oPage2.setBindingContext(oEvent.getSource().getBindingContext());
				busyPicDialog.open();
				OData.read( 
						"http://tst.nspro.it/sap/opu/odata/sap/ZBIDDER_SRV/UserPhoto('"+oPernr.getValue()+"')", 
						function (data) { 
							busyPicDialog.close();
							imageData =  data.Data;
							urImage = "data:image/png;base64,"+ imageData;
							oImage.setSrc(urImage);
						}
				);
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

		var oImage =  new sap.m.Image({
			alt: "test image",
			decorative: false,
			width: "150px",
			height: "150px",
			densityAware: false
		});
		oImage.addStyleClass("displayed");

		var oPage1NavBar = new sap.m.Bar("Page1NavBar",{
			contentMiddle: new sap.m.Label("title1", {
				text: "Employee List"
			}),
			contentLeft: new sap.m.Button("companyLogo", {
				icon: "nspro.png",
				enabled: false
			})
		});
		var oPage =new sap.m.Page({
			title: "Employee List1",
			content: [  ]
		});
		oPage.setCustomHeader(oPage1NavBar);

		var oPage2NavBar = new sap.m.Bar("Page2NavBar",{
			contentMiddle: new sap.m.Label("title2", {
				text: "Employee Details"
			}),
			contentLeft:  new sap.m.Button("back", {
				text: "List",
				type: sap.m.ButtonType.Back,
				tap:  function() {
					app.back();
				}
			})
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
		oPage2.setCustomHeader(oPage2NavBar);


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


		var oPernr = 		new sap.m.DisplayListItem({
			id : "Pernr",
			label : "ID",
			value : "{Pernr}",



		});
		list.addItem(
				oPernr);



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