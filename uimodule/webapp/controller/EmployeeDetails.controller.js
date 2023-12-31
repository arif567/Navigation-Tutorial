sap.ui.define(["nav/test/controller/BaseController"], function (Controller) {
    "use strict";

    return Controller.extend("nav.test.controller.EmployeeDetails", {
        onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("EmployeeDetails").attachMatched(this._onRouteMatched, this);
			// Hint: we don't want to do it this way
			/*
			oRouter.attachRouteMatched(function (oEvent){
				var sRouteName, oArgs, oView;
				sRouteName = oEvent.getParameter("name");
				if (sRouteName === "employee"){
					this._onRouteMatched(oEvent);
				}
			}, this);
			*/
		},
		_onRouteMatched : function (oEvent) {
			var oArgs, oView;
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
		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
		onShowResume : function (oEvent) {
			var oCtx = this.getView().getElementBinding().getBoundContext();

			this.getRouter().navTo("Resume", {
                employeeId: oCtx.getProperty("EmployeeID")
            });
		}
    });
});
