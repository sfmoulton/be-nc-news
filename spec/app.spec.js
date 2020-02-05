process.env.NODE_ENV = "test"; //ensures the correct config obj will be exported from the knexfile
//do we need to write the process.env bit?
const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("chai-sorted");
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

chai.use(require("sams-chai-sorted"));

/*seed function in a project can be run using knex CLI
knex will invoke the seed with a connection object, using the dbConfig
to query the db directly (e.g. in the model), we have to create this connection object ourselves as here we will also need to query the db in our tests after running our tests, we need to end this database connection*/

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

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
    it("GET returns status 200 and all articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an("array");
          expect(body.articles[0]).to.have.all.keys(
            "author",
            "title",
            "article_id",
            "topic",
            "created_at",
            "votes",
            "comment_count",
            "body"
          );
        });
    });
    it("GET will sort the articles by the passed sort_by query", () => {
      return request(app)
        .get("/api/articles?sort_by=article_id")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.sortedBy("article_id", {
            descending: true
          });
        });
    });
    it("GET returns an error status 400 and a message stating that the queried column does not exist, when the sort_by query is invalid", () => {
      return request(app)
        .get("/api/articles?sort_by=banana_hat")
        .expect(400)
        .then(({ body }) => {
          expect(body).to.eql({
            msg: "Bad Request - Undefined Column Key"
          });
        });
    });
    it("GET returns comments sorted by queried order ", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.sortedBy("created_at", {
            ascending: true
          });
        });
    });
    it("GET returns an error status 400 and a message stating that the queried order is invalid, when the order is not equal to ascending or descending", () => {
      return request(app)
        .get("/api/articles?order=banana")
        .expect(400)
        .then(({ body }) => {
          expect(body).to.eql({ msg: "Invalid Order Query" });
        });
    });
    it("GET will sort by created_at property and in descending order, by default if neither query is passed ", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    it("GET articles can be filtered by author when passed as a query", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(({ body }) => {
          body.articles.forEach(article => {
            expect(article.author).to.equal("butter_bridge");
          });
        });
    });
    it("GET returns error status 404 along with an error message, when the queried author does not exist", () => {
      return request(app)
        .get("/api/articles?author=9999")
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ msg: "Queried Author Not Found" });
        });
    });
    it("GET articles can be filtered by topic when passed as a query", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(({ body }) => {
          body.articles.forEach(article => {
            expect(article.topic).to.equal("cats");
          });
        });
    });
    it("GET returns error status 404 along with an error message, when the queried topic does not exist", () => {
      return request(app)
        .get("/api/articles?topic=9999")
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ msg: "Queried Topic Not Found" });
        });
    });
  });

  //topic
  //topic not found - invalid
  //topic found but no articles

  describe("/:article_id", () => {
    it("GET returns status 200 and an article object matching the requested article_id, which includes a comment_count key", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.have.all.keys(
            "article_id",
            "title",
            "topic",
            "author",
            "body",
            "created_at",
            "votes",
            "comment_count"
          );
          expect(body.article.article_id).to.equal(1);
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
    it("PATCH will return status 404 and an error message if the requested article does not exist ", () => {
      return request(app)
        .patch("/api/articles/999999")
        .send({ inc_votes: 100 })
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: "Not Found" });
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
            expect(res.body.comment).to.have.all.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
          });
      });
      it("POST returns status 400 and an error message if a comment object is not included on the request body", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({})
          .expect(406)
          .then(res => {
            expect(res.body).to.eql({ msg: "Request Format Not Acceptable" });
          });
      });
      it("POST returns status 400 and an error message if the passed comment object is in an invalid format", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({
            text: "Is this the wrong format?",
            who_wrote_it: "oh_no"
          })
          .expect(400)
          .then(res => {
            expect(res.body).to.eql({
              msg: "Bad Request - Undefined Column Key"
            });
          });
      });
      it("POST returns status 404 and an error message if the requested article does not exist", () => {
        return request(app)
          .post("/api/articles/999999999/comments")
          .send({
            body: "This comment should not be added.",
            author: "butter_bridge"
          })
          .expect(404)
          .then(res => {
            expect(res.body).to.eql({ msg: "Not Found" });
          });
      });
      describe("GET (including queries)", () => {
        it("GET returns status 200 and all comments for the requested article", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(res => {
              expect(res.body.comments[0]).to.have.all.keys(
                "comment_id",
                "author",
                "article_id",
                "votes",
                "created_at",
                "body"
              );
              expect(res.body.comments).to.be.an("array");
            });
        });
        it("GET returns status 404 and an error message if the requested article does not exist", () => {
          return request(app)
            .get("/api/articles/99999/comments")
            .expect(404)
            .then(res => {
              expect(res.body).to.eql({ msg: "Not Found" });
            });
        });
        it("GET returns status 400 and a error message if the requested article is badly formatted", () => {
          return request(app)
            .get("/api/articles/banana/comments")
            .expect(400)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Invalid Text Representation" });
            });
        });
        it("GET sorts by the passed sort_by query, if it is a valid column, (in descending order by default)", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=comment_id")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.sortedBy("comment_id", {
                descending: true
              });
            });
        });
        it("GET returns an error status 400 and a message stating that the queried column does not exist, when the sort_by query is invalid", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=banana_hat")
            .expect(400)
            .then(({ body }) => {
              expect(body).to.eql({
                msg: "Bad Request - Undefined Column Key"
              });
            });
        });
        it("GET sorts by the created_at column by default, if no sort_by query is passed", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.sortedBy("created_at", {
                descending: true
              });
            });
        });
        it("GET returns comments sorted by queried order", () => {
          return request(app)
            .get("/api/articles/1/comments?order=asc")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.ascendingBy("created_at");
            });
        });
        it("GET returns an error status 400 and a message stating that the queried order is invalid, when the order is not equal to ascending or descending", () => {
          return request(app)
            .get("/api/articles/1/comments?order=banana")
            .expect(400)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Invalid Order Query" });
            });
        });
      });
      describe("/:comment_id", () => {
        it("PATCH returns status 200 and will update the votes property on the requested comment by the passed amount", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 100 })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment).to.have.all.keys(
                "comment_id",
                "author",
                "article_id",
                "votes",
                "created_at",
                "body"
              );
              expect(body.comment.votes).to.equal(116);
              expect(body.comment.comment_id).to.equal(1);
            });
        });
        it("PATCH returns status 400 and an error message if inc_votes is not included on the request body", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({})
            .expect(400)
            .then(res => {
              expect(res.body).to.eql({ msg: "Bad Request - No inc_votes" });
            });
        });
        it("PATCH returns status 400 and an error message if inc_votes is in an invalid format", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: "banana" })
            .expect(400)
            .then(res => {
              expect(res.body).to.eql({ msg: "Invalid Text Representation" });
            });
        });
        it("PATCH will return status 404 and an error message if the requested article does not exist ", () => {
          return request(app)
            .patch("/api/comments/999999")
            .send({ inc_votes: 100 })
            .expect(404)
            .then(res => {
              expect(res.body).to.eql({ msg: "Not Found" });
            });
        });
        it("DELETE returns status 204 when requested comment has been deleted", () => {
          return request(app)
            .delete("/api/comments/1")
            .expect(204);
        });
        it("DELETE returns status 404 when comment requested to be deleted does not exist", () => {
          return request(app)
            .delete("/api/comments/9999")
            .expect(404)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Comment Not Found" });
            });
        });
      });
    });
  });
});

//need to add more errors!
//finish off delete...
