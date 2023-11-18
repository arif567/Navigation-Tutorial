sap.ui.define(["nav/test/controller/BaseController"], function (Controller) {
    "use strict";

    return Controller.extend("nav.test.controller.EmployeeList", {
        onListItemPressed : function(oEvent){
            var oItem, oCtx;
            oItem =oEvent.getSource();
            oCtx=oItem.getBindingContext();
            this.getRouter().navTo("EmployeeDetails", {
                employeeId : oCtx.getProperty("EmployeeID")
            });


        }

    });
});
