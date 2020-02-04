process.env.NODE_ENV = "test"; //ensures the correct config obj will be exported from the knexfile
//do we need to write the process.env bit?
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

/*seed function in a project can be run using knex CLI
knex will invoke the seed with a connection object, using the dbConfig
to query the db directly (e.g. in the model), we have to create this connection object ourselves as here we will also need to query the db in our tests after running our tests, we need to end this database connection*/

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
    it("GET returns status 200 and a user object matching the requested username", () => {
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
    it("GET returns status 404 and an error message if the requested user does not exist", () => {
      return request(app)
        .get("/api/users/9999")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: "Not Found" });
        });
    });
  });
  describe("/articles", () => {
    describe("/:article_id", () => {
      it("GET returns status 200 and an article object matching the requested article_id, which includes a comment_count key", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(res => {
            expect(res.body.article).to.have.all.keys(
              "article_id",
              "title",
              "topic",
              "author",
              "body",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      it("GET returns status 404 and an error message if the requested article does not exist", () => {
        return request(app)
          .get("/api/articles/99999999")
          .expect(404)
          .then(res => {
            expect(res.body).to.eql({ msg: "Not Found" });
          });
      });
      it("GET returns status 400 and a error message if the requested article is badly formatted", () => {
        return request(app)
          .get("/api/articles/hello")
          .expect(400)
          .then(res => {
            expect(res.body).to.eql({ msg: "Invalid Text Representation" });
          });
      });
      it("PATCH returns status 200 and will update the votes property on the requested article by the passed amount", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 100 })
          .expect(200)
          .then(res => {
            expect(res.body.article).to.have.all.keys(
              "article_id",
              "title",
              "topic",
              "author",
              "body",
              "created_at",
              "votes"
            );
            expect(res.body.article.votes).to.equal(200);
          });
      });
      it("PATCH returns status 400 and an error message if inc_votes is not included on the request body", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({})
          .expect(400)
          .then(res => {
            expect(res.body).to.eql({ msg: "Bad Request - No inc_votes" });
          });
      });
      it("PATCH returns status 400 and an error message if inc_votes is in an invalid format", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: "banana" })
          .expect(400)
          .then(res => {
            expect(res.body).to.eql({ msg: "Invalid Text Representation" });
          });
      });
      it("PATCH will still return status 200 when the request body contains unwanted information - as this will be ignored", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ name: "Mitch", inc_votes: 50 })
          .expect(200)
          .then(res => {
            expect(res.body.article).to.have.all.keys(
              "article_id",
              "title",
              "topic",
              "author",
              "body",
              "created_at",
              "votes"
            );
            expect(res.body.article.votes).to.equal(150);
          });
      });
      describe("/comments", () => {
        it("POST returns status 201, and responds with the newly posted comment", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({
              body: "Just testing that we can add comments to the articles!",
              author: "butter_bridge"
            })
            .expect(201)
            .then(res => {
              expect(res.body.comment).to.have.all.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body');
            });
        });
        it('POST ', () => {
          //if incorrect comment format - 406
          //



        });
      });
    });
  });
});

//PATCH ARTICLE ID - do we need to account for the comment count key?
