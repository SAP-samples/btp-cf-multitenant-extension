sap.ui.define(
    ["./BaseController", "sap/m/MessageToast", "sap/m/MessageBox", "sap/ui/model/json/JSONModel"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox, JSONModel) {
        "use strict";

        return Controller.extend("com.sap.adminui.controller.MainView", {
            onInit: function () {
                this.getImage();
                this.getView().setModel(new JSONModel(), "mentorModel");
                this.loadMentors();
                this.getJobs();
                this.csrfToken = this.getToken();
            },
            loadMentors: function () {
                var that = this;
                jQuery.ajax({
                    url: "/admin/api/v1/mentor",
                    type: "GET",
                    success: function (data) {
                        that.getView().getModel("mentorModel").setData(data);
                        that.getView().getModel("mentorModel").refresh(true);
                    },
                    error: function (error) {
                        MessageBox.error(error.responseText);
                    },
                });
            },
            handleUploadPress: function (oEvent) {
                var oFileUploader = this.byId("fileUploader");

                let token = this.getToken();
                let headerParma = new sap.ui.unified.FileUploaderParameter();
                headerParma.setName("x-csrf-token");
                headerParma.setValue(token);
                oFileUploader.addHeaderParameter(headerParma);
                oFileUploader
                    .checkFileReadable()
                    .then(
                        function () {
                            oFileUploader.upload();
                        },
                        function (error) {
                            MessageToast.show("The file cannot be read. It may have changed.", error);
                        }
                    )
                    .then(function () {
                        oFileUploader.clear();
                    });
            },
            handleUploadComplete: function (oEvent) {
                if (oEvent.getParameter("status") === 201) {
                    MessageToast.show(oEvent.getParameter("responseRaw"));
                    this.getImage();
                } else {
                    MessageToast.show("Upload Failed");
                }
            },
            getToken: function () {
                var token = null;
                $.ajax({
                    url: "/admin/",
                    type: "GET",
                    async: false,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("X-CSRF-Token", "Fetch");
                    },
                    complete: function (xhr) {
                        console.log(xhr);
                        token = xhr.getResponseHeader("X-CSRF-Token");
                    },
                });
                return token;
            },
            getImage: function () {
                var that = this;
                jQuery.ajax({
                    url: "/admin/api/v1/image",
                    type: "GET",
                    success: function (data) {
                        const encodedBuffer = that.arrayToBase64(data[0].FILE_CONTENT.data);
                        that.getView().byId("_IDGenImage2").setSrc(`data:image/png;base64,${encodedBuffer}`);
                        that.getView().byId("_IDGenImage1").setSrc(`data:image/png;base64,${encodedBuffer}`);
                    },
                    error: function (error) {
                        MessageBox.error("Error while getting image");
                    },
                });
            },
            // Converts array Buffer into base64 encoded string
            arrayToBase64: function (array) {
                return btoa(array.reduce((element, byte) => element + String.fromCharCode(byte), ""));
            },
            storeTitle: function () {
                var that = this;
                this.csrfToken = this.getToken();
                var title = this.getView().byId("inputTextTitle").getValue();
                jQuery.ajax({
                    url: "/admin/api/v1/title",
                    type: "PUT",
                    data: JSON.stringify({ title: title }),
                    headers: {
                        "x-csrf-token": that.csrfToken,
                        "Content-Type": "application/json",
                    },
                    success: function (data) {
                        console.log(data);
                        MessageToast.show("Title Updated");
                    },
                    error: function (error) {
                        MessageBox.error("Error while updating title");
                    },
                });
            },
            createMentors: function () {
                // create dialog lazily
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "com.sap.adminui.view.Dialog",
                    });
                }

                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },

            onCloseDialog: function (oEvent) {
                const that = this;
                if(this.getView().byId("mentorName").getValue() !== ""
                && this.validateEmail(this.getView().byId("mentorEmail").getValue())
                ){
                  this.getView().byId("mentorName").setValueState("None");
                  const data = {
                    name: this.getView().byId("mentorName").getValue(),
                    email: this.getView().byId("mentorEmail").getValue(),
                    phone: this.getView().byId("mentorPhone").getValue(),
                    experiance: this.getView().byId("mentorExperiance").getValue(),
                };
                  jQuery.ajax({
                  url: "/admin/api/v1/mentor",
                  type: "POST",
                  data: JSON.stringify(data),
                  headers: {
                      "x-csrf-token": that.csrfToken,
                      "Content-Type": "application/json",
                  },
                  success: function (data) {
                    that.loadMentors();
                    MessageBox.success("Mentor Created");
                    that.byId("mentorDialog").close();
                    that.byId("mentorDialog").destroy();
                       
                  },
                  error: function (error) {
                      MessageBox.error("Error while creating new mentor");
                  },
              });    
                }else{
                  this.getView().byId("mentorName").setValueState("Error");
                }
            },
            validateEmail: function (email) {
              var rexMail = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
              if (!email.match(rexMail)) {
                this.getView().byId("mentorEmail").setValueState("Error");
                return false;
              }else{
                return true;
              }
            },
            getJobs: function () {
                var that = this;
                this.getView().setModel(new JSONModel(), "jobModel");
                jQuery.ajax({
                    url: "/admin/api/v1/job",
                    type: "GET",
                    success: function (data) {
                        that.getView().getModel("jobModel").setData(data.results);
                        that.getView().getModel("jobModel").refresh(true);
                    },
                    error: function (error) {
                        MessageBox.error(error.responseText);
                    }
                });
            },
            scheduleJob: function () {
                var that = this;
                this.csrfToken = this.getToken();
                var frequency = parseInt(this.getView().byId("jobFrequency").getValue(), 10);
                this.getView().byId("jobFrequency").setValueState("None");
                if( typeof(frequency) === 'number' && frequency >= 5){
                jQuery.ajax({
                    url: `/admin/api/v1/job?time=${frequency}`,
                    type: "POST",
                    headers: {
                        "x-csrf-token": that.csrfToken,
                        "Content-Type": "application/json",
                    },
                    success: function (data) {
                        console.log(data);
                        MessageToast.show("Job Scheduled");
                    },
                    error: function (error) {
                        MessageBox.error("Error while creating Job");
                    },
                });
            }else {
                this.getView().byId("jobFrequency").getValueStateText('Please enter a valid number');
                this.getView().byId("jobFrequency").setValueState("Error");
            }
        }
        });
    }
);
