sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator}
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("fioridemo.ui5.invoices.controller.MainView", {
            onInit: function () {
                const oJSONModel = new sap.ui.model.json.JSONModel();
                const oView = this.getView();

                oJSONModel.loadData("../model/SelectionScreenMenu.json");
                oView.setModel(oJSONModel, "selectionScreen");
                
                oJSONModel.attachRequestCompleted(function() {
                    console.log(oJSONModel.getData());
                });

               /*
               var oData = {
                    "ProductCollection": [
                    {
                        "ProductId": "HT-1000",
                        "Name": "Notebook Basic 15"
                    },
                    {
                        "ProductId": "HT-1001",
                        "Name": "Notebook Basic 17"
                    },
                    {
                        "ProductId": "HT-1002",
                        "Name": "Notebook Basic 18"
                    },
                    {
                        "ProductId": "HT-1003",
                        "Name": "Notebook Basic 19"
                    },
                    {
                        "ProductId": "HT-1007",
                        "Name": "ITelO Vault"
                    }
                    ]
                };

                var oModel = new sap.ui.model.json.JSONModel(oData);
			    this.getView().setModel(oModel);

                */
            },

            onFilter: function (oEvent) {
                const oData = this.getView().getModel("selectionScreen").getData();
                let filters = [];

                if (oData.ShipName != "") {
                    filters.push(new Filter("ShipName", FilterOperator.Contains, oData.ShipName));
                }

                if (oData.CountryKey != "") {
                    filters.push(new Filter("Country", FilterOperator.EQ, oData.CountryKey));
                }

                const oList = this.getView().byId("invoicesList");
                const oBinding = oList.getBinding("items");
                oBinding.filter(filters);
            },

            onClearFilter: function() {
                const oModelSelScreen = this.getView().getModel("selectionScreen");
                oModelSelScreen.setProperty("/ShipName", "");
                oModelSelScreen.setProperty("/CountryKey", "");

                const oList = this.getView().byId("invoicesList");
                const oBinding = oList.getBinding("items");
                oBinding.filter([]);
            }

        });
    });
