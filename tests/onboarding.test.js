const { application_env_json, system_env_json } = require("./util/env");
const { xsuaa, saas, cis } = require("./util/config");
const accounts = ["testaccount1", "testaccount2"];
const apps = {
  adminSrv:
    "<admin service url>",
  businessPartnerSrv:
    "<businesspartner service url>",
  bpMock: "<mockservice url>",
};
const cisEnv = require("./util/cis.json");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
let should = chai.should();
let cis_access_token;
let access_token;
// describe("Load the env", () => {
//   test("VCAP is loaded", () => {
//     expect(system_env_json).toBeDefined();
//   });
// });
var expect = chai.expect;

describe("Get CIS token", () => {
  it("should fetch bearer token", (done) => {
    let requestHeaders = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    chai
      .request(cisEnv.uaa.url)
      .post("/oauth/token")
      .set(requestHeaders)
      .send(cis)
      .end((err, response) => {
        try {
          response.should.have.status(200);
          cis_access_token = response.body.access_token;
          done();
        } catch (err) {
          console.error(err);
          done(err);
        }
      });
  });
});
describe("Create subscription", () => {
  let url = cisEnv.endpoints.saas_registry_service_url;
  console.log(url);
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  it("Subscribe to the app", (done) => {
    let headers = {
      Authorization: "bearer " + cis_access_token,
    };
    chai
      .request(url)
      .post("/saas-manager/v1/applications/easyfranchise/subscription")
      .set(headers)
      .end((err, response) => {
        try {
          expect(response).to.be.a("Object");
          response.should.have.status(202);
          //done();
          sleep(30000).then(() => {
            done();
            runTest();
          });
        } catch (err) {
          console.error(err);
          done(err);
        }
      });
  });
});

function runTest() {
  describe("Verify Dependency injection using xsuaa token from subscriber subaccount", () => {
    it("should fetch bearer token", (done) => {
      let requestHeaders = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      let url = system_env_json.VCAP_SERVICES.xsuaa[0].credentials.url;
      url =
        "https://" +
        accounts[0] +
        ".authentication" +
        url.split("authentication")[1];
      chai
        .request(url)
        .post("/oauth/token")
        .set(requestHeaders)
        .send(xsuaa)
        .end((err, response) => {
          if (!err) {
            response.should.have.status(200);
            access_token = response.body.access_token;
            done();
          } else {
            console.error(err);
            done(err);
          }
        });
    });
  });

  describe("Test Admin Service", () => {
    it("should create mentor", (done) => {
      let headers = {
        Authorization: "bearer " + access_token,
        "content-type": "application/json",
      };
      let data = {
        name: "Test User",
        email: "testuser@sap.com",
        experiance: 5,
        phone: 1223123129,
      };
      chai
        .request(apps.adminSrv)
        .post("/api/v1/mentor")
        .set(headers)
        .send(data)
        .end((err, response) => {
          if (!err) {
            response.should.have.status(201);
            response.should.have.text("Mentor Created");
            done();
          } else {
            console.error(err);
            done(err);
          }
        });
    });
    it("should get mentors", (done) => {
      let headers = {
        Authorization: "bearer " + access_token,
      };
      chai
        .request(apps.adminSrv)
        .get("/api/v1/mentor")
        .set(headers)
        .end((err, response) => {
          if (!err) {
            response.should.have.status(200);
            let data = JSON.parse(response.text);
            expect(data).to.have.lengthOf.above(0);
            done();
          } else {
            console.error(err);
            done(err);
          }
        });
    });
    it("It should Update Title", (done) => {
      let headers = {
        Authorization: "bearer " + access_token,
        "content-type": "application/json",
      };
      chai
        .request(apps.adminSrv)
        .put("/api/v1/title")
        .send({ title: "test title" })
        .set(headers)
        .end((err, response) => {
          if (!err) {
            response.should.have.status(200);
            done();
          } else {
            console.error(err);
            done(err);
          }
        });
    });
    it("It should Get Title", (done) => {
      let headers = {
        Authorization: "bearer " + access_token,
      };
      chai
        .request(apps.adminSrv)
        .get("/api/v1/title")
        .set(headers)
        .end((err, response) => {
          if (!err) {
            response.should.have.status(200);
            done();
          } else {
            console.error(err);
            done(err);
          }
        });
    });
    it("It should schedule a job", (done) => {
      let headers = {
        Authorization: "bearer " + access_token,
      };
      chai
        .request(apps.adminSrv)
        .post(`/api/v1/job?time=5`)
        .set(headers)
        .end((err, response) => {
          if (!err) {
            response.should.have.status(200);
            response.body.schedules.should.have.lengthOf.above(0);
            done();
          } else {
            console.error(err);
            done(err);
          }
        });
    });
    it("It should have scheduled jobs", (done) => {
      let headers = {
        Authorization: "bearer " + access_token,
      };
      chai
        .request(apps.adminSrv)
        .get(`/api/v1/job`)
        .set(headers)
        .end((err, response) => {
          if (!err) {
            response.should.have.status(200);
            response.body.results.should.have.lengthOf.above(0);
            done();
          } else {
            console.error(err);
            done(err);
          }
        });
    });
  });

  describe("Test Business Partner Service", () => {
    let mentors = [];
    let franshise = [];
    let id = new Date().getMilliseconds();
    it("It Create a new mock business partner", (done) => {
      const data = {
        BusinessPartner: id.toString(),
        BusinessPartnerFullName: "ad Corp as",
        FirstName: "GOPS",
        SearchTerm1: "EFVERIFIED",
      };
      chai
        .request(apps.bpMock)
        .post("/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner")
        .send(data)
        .end((err, response) => {
          if (!err) {
            response.should.have.status(201);
            done();
          } else {
            console.error(err);
            done(err);
          }
        });
    });
    it("It Should Fetch Data from subscriber subaccount destination", (done) => {
      let headers = {
        Authorization: "bearer " + access_token,
      };

      chai
        .request(apps.businessPartnerSrv)
        .get("/api/v1/new/bp")
        .set(headers)
        .end((err, response) => {
          if (!err) {
            response.should.have.status(201);
            done();
          } else {
            console.error(err);
            done(err);
          }
        });
    });
    it("It load mentors", (done) => {
      let headers = {
        Authorization: "bearer " + access_token,
      };
      chai
        .request(apps.businessPartnerSrv)
        .get("/api/v1/mentors")
        .set(headers)
        .end((err, response) => {
          if (!err) {
            response.should.have.status(200);
            mentors = [...response.body];
            done();
          } else {
            console.error(err);
            done(err);
          }
        });
    });
    it("It should load franshise", (done) => {
      let headers = {
        Authorization: "bearer " + access_token,
      };
      chai
        .request(apps.businessPartnerSrv)
        .get("/api/v1/new/notifications")
        .set(headers)
        .end((err, response) => {
          if (!err) {
            response.should.have.status(200);
            franshise = [...response.body];
            done();
          } else {
            console.error(err);
            done(err);
          }
        });
    });
    it("It should Assign Mentor", (done) => {
      let headers = {
        Authorization: "bearer " + access_token,
      };
      let data = {
        BPID: franshise[0].BUSINESSPARTNERID,
        MENTORNAME: mentors[0].NAME.slice(0, 13),
        MENTORID: mentors[0].MENTORID,
      };
      chai
        .request(apps.businessPartnerSrv)
        .put("/api/v1/bp/mentors")
        .send(data)
        .set(headers)
        .end((err, response) => {
          if (!err) {
            response.should.have.status(204);
            done();
          } else {
            console.error(err);
            done(err);
          }
        });
    });
  });

  describe("Delete subscription", () => {
    let url = cisEnv.endpoints.saas_registry_service_url;
    console.log(url);
    it("Delete Subscription to the app", (done) => {
      let headers = {
        Authorization: "bearer " + cis_access_token,
      };
      chai
        .request(url)
        .delete("/saas-manager/v1/applications/easyfranchise/subscription")
        .set(headers)
        .end((err, response) => {
          try {
            expect(response).to.be.a("Object");
            response.should.have.status(202);
            done();
          } catch (err) {
            console.error(err);
            done(err);
          }
        });
    });
  });
}
