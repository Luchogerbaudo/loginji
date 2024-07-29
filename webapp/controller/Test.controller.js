sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("project1.controller.Test", {
        onInit: function () {
            var oModel = new JSONModel({
                showR: false,
                showL: true,
                register: {
                    username: '',
                    password: '',
                    passwordC: ''
                },
                login: {
                    username: '',
                    password: ''
                }
            });

            this.getView().setModel(oModel);
        },

        onPressRegister: function () {
            var oModel = this.getView().getModel();
            if (oModel.getProperty("/showR")) {
                oModel.setProperty("/showL", false);
            } else {
                oModel.setProperty("/showR", true);
                oModel.setProperty("/showL", false);
            }
        },

        onPressLogin: function () {
            var oModel = this.getView().getModel();
            if (oModel.getProperty("/showL")) {
                oModel.setProperty("/showR", false);
            } else {
                oModel.setProperty("/showL", true);
                oModel.setProperty("/showR", false);
            }
        },
        
        onPressBtnRegister: function () {
            var oViewModel = this.getView().getModel();
            var oSharedModel = this.getOwnerComponent().getModel("sharedModel");
            
            var username = oViewModel.getProperty("/register/username");
            var password = oViewModel.getProperty("/register/password");
            var passwordC = oViewModel.getProperty("/register/passwordC");
            var users = oSharedModel.getProperty("/users");
            var usersC = oSharedModel.getProperty("/usersC");
            var usuarioEnUso = false;

            for (var i = 0; i < users.length; i++) {
                if (username === users[i].username) {
                    usuarioEnUso = true;
                }
            }

            if(password.length > 0 && passwordC.length > 0){
                if (password && password === passwordC) {
                    if (usuarioEnUso) {
                        MessageToast.show("Usuario ya en uso");
                    } else {
                        users.push({ username: username, password: password });
                        usersC++;
                        MessageToast.show("Registrado");
                        oViewModel.setProperty("/showL", true);
                        oViewModel.setProperty("/showR", false);
                        oSharedModel.setProperty("/users", users);
                        oSharedModel.setProperty("/usersC", usersC);
                    }
                } else {
                    MessageToast.show("Las contraseñas no coinciden");
                }
            }else{
                MessageToast.show("Llenar los campos");
            }

        },

        onPressBtnLogin: function () {
            var oViewModel = this.getView().getModel();
            var oSharedModel = this.getOwnerComponent().getModel("sharedModel");
            
            var username = oViewModel.getProperty("/login/username");
            var password = oViewModel.getProperty("/login/password");
            var users = oSharedModel.getProperty("/users");
            var usuarioEncontrado = false;

            if (users.length === 0) {
                MessageToast.show("Aún no hay usuarios registrados");
                return;
            }

            for (var i = 0; i < users.length; i++) {
                if (username === users[i].username) {
                    usuarioEncontrado = true;
                    if (password === users[i].password) {
                        MessageToast.show("Loggeado");
                        window.location.href = "https://www.promiedos.com.ar/";
                    } else {
                        MessageToast.show("Contraseña incorrecta");
                    }
                }
            }

            if (!usuarioEncontrado) {
                MessageToast.show("Usuario no encontrado");
            }
        },

        onPressBtnUsuarios: function () {
            var password = prompt("Ingresar contraseña:");
            if (password === "elpepe") {
                try {
                    this.getOwnerComponent().getRouter().navTo("UserList");
                } catch (e) {
                    MessageToast.show("error: " + e.message);
                }
            } else {
                MessageToast.show("Contraseña incorrecta");
            }
        }
    });
});
