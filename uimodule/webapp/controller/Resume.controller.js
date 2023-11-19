sap.ui.define([
    "nav/test/controller/BaseController",
    "sap/ui/model/json/JSONModel"

], function (Controller, JSONModel) {
    "use strict";

    var _aValidTabKeys = ["Info", "Projects", "Hobbies", "Notes"];

    return Controller.extend("nav.test.controller.Resume", {

        onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("Resume").attachMatched(this._onRouteMatched, this);
            this.getView().setModel(new JSONModel(), "view");
		},
		_onRouteMatched : function (oEvent) {
			var oArgs, oView, oQuery;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();

			oView.bindElement({
				path : "/Employees(" + oArgs.employeeId + ")",
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
			});
            oQuery = oArgs["?query"];
			if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1){
				oView.getModel("view").setProperty("/selectedTabKey", oQuery.tab);
			} else {
				// the default query param should be visible at all time
				this.getRouter().navTo("employeeResume", {
					employeeId: oArgs.employeeId,
					"?query": {
						tab: _aValidTabKeys[0]
					}
				}, true /*no history*/);
			}
		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
        onTabSelect: function(oEvent){
            var oCtx = this.getView().getBindingContext();
			this.getRouter().navTo("employeeResume", {
				employeeId: oCtx.getProperty("EmployeeID"),
				"?query": {
					tab: oEvent.getParameter("selectedKey")
				}
			}, true /*without history*/);


        }

    });
});
