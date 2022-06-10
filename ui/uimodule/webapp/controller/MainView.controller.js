// @ts-nocheck
sap.ui.define(
    ["./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/BusyIndicator",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel 
 * @param {typeof sap.m.MessageBox} MessageBox 
 * @param {typeof sap.ui.core.BusyIndicator} BusyIndicator
 */
    function (Controller, JSONModel, MessageBox, BusyIndicator) {
        "use strict";

        return Controller.extend("com.sap.easyfranchise.controller.MainView", {
            onInit: function () {
                this.getView().setModel(new JSONModel(), "franchiseModel");
                this.getView().setModel(new JSONModel(), "newFranchiseModel");
                this.getView().setModel(new JSONModel(), "mentorsModel");
                this.csrfToken = this.getCsrf();
                this.getImage();
                this.getTitle();
                this.loadFranchiseModel();
                this.loadNewFranchiseModel();
                this.loadMentors();
            },
            arrayToBase64: function(array){
                return btoa(
                  array.reduce((element, byte) => element + String.fromCharCode(byte), '')
                );
            },
            getImage: function() {
                var that = this;
                this.getView().setModel(new sap.ui.model.json.JSONModel({}), "image");
                jQuery.ajax({
                    url: "/admin/api/v1/image",
                    type: "GET",
                    success: function(data) {
                        if(data.length>0){
                            const encodedBuffer = that.arrayToBase64(data[0].FILE_CONTENT.data);
                            that.getView().byId("_IDGenImage1").setSrc(`data:image/png;base64,${encodedBuffer}`);
                        }    
                    },
                    error: function(error) {
                     MessageBox.error("Error while getting image");
                    },
                });
        },
        getTitle: function() {
            var that = this;
            jQuery.ajax({
                url: "/admin/api/v1/title",
                type: "GET",
                success: function(data) {
                    if(data.length>0){
                        that.getView().byId("_IDGenText1").setText(`${data[0]['TITLE']}-Easy Franchise`);
                    }else{
                        MessageBox.information("No title found, Please go to admin panel and add title");
                    }
                },
                error: function(error) {
                 MessageBox.error("Error while getting title");
                },
            });
    },
            getCsrf: function () {
                var token = null;
                jQuery.ajax({
                  url: "/businesspartner/",
                  type: "GET",
                  async: false,
                  beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-CSRF-Token", "Fetch");
                  },
                  complete: function (xhr) {
                    token = xhr.getResponseHeader("X-CSRF-Token");
                  }
                });
                return token;
              },
            loadFranchiseModel: function () {
                var that = this;
                jQuery.ajax({
                    type: "GET",
                     url: "/businesspartner/api/v1/bp/mentors",
                     success: function (data) {
                         // @ts-ignore
                         that.getView().getModel("franchiseModel").setData(data);
                         that.getView().getModel("franchiseModel").refresh(true);
                     },
                     error: function (err) {
                       MessageBox.error(err.responseText);
                     }
                });
            },
            loadMentors: function () {
                var that = this;
                jQuery.ajax({
                    type: "GET",
                     url: "/businesspartner/api/v1/mentors",
                     success: function (data) {
                         // @ts-ignore
                         that.getView().getModel("mentorsModel").setData(data);
                         that.getView().getModel("mentorsModel").refresh(true);
                     },
                     error: function (err) {
                         MessageBox.error(err.responseText);
                     }
                });
            },
            loadNewFranchiseModel: function () {
                var that = this;
                jQuery.ajax({
                    type: "GET",
                     url: "/businesspartner/api/v1/new/notifications",
                     success: function (data) {
                         // @ts-ignore
                         BusyIndicator.hide();
                         that.getView().getModel("newFranchiseModel").setData(data);
                         that.getView().getModel("newFranchiseModel").refresh(true);
                     },
                     error: function (err) {
                         BusyIndicator.hide();
                         MessageBox.error(err.responseText);
                     }
                });
            },
            handleMentorChange: function(oEvent){
                var that = this;
                BusyIndicator.show();
                var mentorName = oEvent.getParameter("selectedItem").getText();
                var mentorID = oEvent.getParameter("selectedItem").getKey();
                var businesspartner= oEvent.getSource().getParent().getModel("newFranchiseModel").getProperty(oEvent.getSource().getParent().getBindingContextPath());
                jQuery.ajax({
                    type: "PUT",
                    data: JSON.stringify({
                        "BPID": businesspartner.BUSINESSPARTNERID,
                        "MENTORNAME": mentorName.slice(0,13),
                        "MENTORID": mentorID,
                    }),
                    headers: {
                        "x-csrf-token": this.csrfToken,
                        "Content-Type": "application/json"
                      },
                     url: "/businesspartner/api/v1/bp/mentors",
                     success: function (res) {
                         // @ts-ignore
                         MessageBox.information(`Business Partner : ${businesspartner.BUSINESSPARTNERNAME} has been assigned to mentor: ${mentorName}`);
                         that.loadFranchiseModel();
                         that.loadNewFranchiseModel();
                         BusyIndicator.hide();
                     },
                     error: function (err) {
                         BusyIndicator.hide();
                         MessageBox.error(`Business Partner : ${businesspartner.BUSINESSPARTNERNAME} has not been assigned to mentor: ${mentorName}`, err);
                     }
                });
            },
            onRefreshPress: function(){
                var that = this;
                BusyIndicator.show();
                jQuery.ajax({
                    type: "GET",
                     url: "/businesspartner/api/v1/new/bp",
                     success: function (data) {
                         // @ts-ignore
                         MessageBox.information(data);
                         that.loadNewFranchiseModel();
                     },
                     error: function (err) {
                         MessageBox.error("Error Fetching new Franchise from Remote System", err);
                         BusyIndicator.hide();
                     }
                });
            }
        });
    }
);
