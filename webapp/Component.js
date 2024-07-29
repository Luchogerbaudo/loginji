sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "project1/model/models",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, Device, models, JSONModel) {
    "use strict";

    return UIComponent.extend("project1.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            // Call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // Set the device model
            this.setModel(models.createDeviceModel(), "device");

            // Set the shared JSON model
            var oData = {
                users: [],
                usersC: 0
            };
            var oModel = new JSONModel(oData);
            this.setModel(oModel, "sharedModel");

            // Create the views based on the url/hash
            this.getRouter().initialize();
        }
    });
});
