sap.ui.define(
    ["./BaseController"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("nav.test.controller.MainView", {
            onInit: function () {

            },

		onNavToEmployees: function(oEvent) {

            this.getRouter().navTo("EmployeeList");

		},
        });
    },
);
