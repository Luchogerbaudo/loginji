sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/StandardListItem",
    "sap/m/List",
    "sap/m/ButtonType"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast, Dialog, Button, StandardListItem, List, ButtonType) {
    "use strict";

    return Controller.extend("project1.controller.UserList", {
        onInit: function () {
            // modelo compartido
            this.getView().setModel(this.getOwnerComponent().getModel("sharedModel"), "sharedModel");
        },
        onPressBtnInicio: function () {
            try {
                this.getOwnerComponent().getRouter().navTo("RouteTest");
            } catch (e) {
                MessageToast.show("error: " + e.message);
            }
        },
        onChangeSearch: function (oEvent) {
            // Obtener el valor ingresado en el campo de búsqueda
            var sQuery = oEvent.getParameter("newValue");

            // Crear un array de filtros
            var aFilters = [];
            if (sQuery && sQuery.length > 0) {
                aFilters.push(new Filter("username", FilterOperator.StartsWith, sQuery));
            }

            // Obtener la tabla y su modelo de enlace
            var oTable = this.byId("userTable");
            var oBinding = oTable.getBinding("items");

            // Aplicar el filtro al modelo de la tabla
            oBinding.filter(aFilters);
        },
        
        onPressRegistro: function (oEvent) {
            var oItem = oEvent.getSource();
            var oCtx = oItem.getBindingContext("sharedModel");
            var uUsername = oCtx.getProperty("username");
            var uPassword = oCtx.getProperty("password");
            // var imgUser = sap.ui.require.toUrl("project1/webapp/assets/user.webp"); 
            
                this.oDraggableDialog = new Dialog({
                    title: "Info de usuario",
                    contentWidth: "auto",
                    contentHeight: "auto",
                    draggable: true,
                    content: new List({
                        items: [
                            new StandardListItem({
                                title: "Usuario: " + uUsername,
                                description: "Contraseña: " + uPassword,
                            }),
                            // new Image({
                            //     src: imgUser,
                            //     height: "100px",
                            //     width: "100px"
                            // }),
                        ]
                    }),
                    endButton: new Button({
                        type: ButtonType.Emphasized,
                        text: "Cerrar",
                        press: function () {
                            this.oDraggableDialog.close();
                        }.bind(this)
                    }),
                    beginButton: new Button({
                        text: "Editar",
                        press: this.onPressBtnEdit.bind(this)
                    }),
                });
                this.getView().addDependent(this.oDraggableDialog);
            this.oDraggableDialog.open();
        },

        onPressBtnEdit: function(){
            MessageToast.show("Jijo")    
        }
    });
});
