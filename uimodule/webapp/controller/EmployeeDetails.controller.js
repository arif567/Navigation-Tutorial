sap.ui.define(["nav/test/controller/BaseController"], function (Controller) {
    "use strict";

    return Controller.extend("nav.test.controller.EmployeeDetails", {
        onInit: function(){
            var oRouter =this.getRouter();
            oRouter.getRoute("EmployeeDetails").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched : function(oEvent){
            var oArgs, oView;
            oArgs= oEvent.getParameter("arguments");
            oView=this.getView();
            oView.bindElement({
                path: "/Employees(" + oArgs.employeeId +")",
                events: {
                    change: this._onBindingChange.bind(this),
                    dataRequested: function(oEvent){
                        oView.setBusy(true);
                    },
                    dataReceived: function(oEvent){
                        oView.setBusy(false);
                    }
                }
            });
        },
        _onBindingChange: function(oEvent){
            if (!this.getView ().getBindingCOntext()) {
                this.getRouter().getTargets().display("notFound");
            }
        }
    });
});
