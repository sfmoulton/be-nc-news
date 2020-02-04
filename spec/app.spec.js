process.env.NODE_ENV = "test"; //ensures the correct config obj will be exported from the knexfile
//do we need to write the process.env bit?
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

//seed function in a project can be run using knex CLI
//knex will invoke the seed with a connection object, using the dbConfig
//to query the db directly (e.g. in the model), we have to create this conenction object ourselves
//here we will also need to query the db in our tests

//after running our tests, we need to end this database connection

//THIS NEEDS TO GO IN OUR TEST BLOCK, ALONG WITH BEFORE EACH

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy()); //doesn't seem to work!

  describe("/topics", () => {
    it("GET returns status 200 and all topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.topics[0]).to.have.all.keys("slug", "description");
          expect(res.body.topics).to.be.an("array");
        });
    });
  });
  describe("/users/:username", () => {
    it("GET returns status 200 and user matching requested username ", () => {
      return request(app)
        .get("/api/users/icellusedkars")
        .expect(200)
        .then(res => {
          expect(res.body).to.eql({
            user: {
              username: "icellusedkars",
              name: "sam",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4"
            }
          });
        });
    });
    it("GET returns status 404 and an error message if user does not exist", () => {
      return request(app)
        .get("/api/users/9999")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: "Not found" });
        });
    });
  });
});
//to have all keys - slug and description
//needs to have topics as the key, with an array of objects on that key
