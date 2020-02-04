process.env.NODE_ENV ='test'; //ensures the correct config obj will be exported from the knexfile
const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

//seed function in a project can be run using knex CLI
//knex will invoke the seed with a connection object, using the dbConfig
//to query the db directly (e.g. in the model), we have to create this conenction object ourselves
//here we will also need to query the db in our tests

after(() => {
  connection.destroy();
}); //after running our tests, we need to end this database connection

//tests!

describe('/api', () => {
  describe('/topics', () => {
    it('GET returns status 200 and all topics', () => {
      return request(app).get('/api/topics').expect(200).then(res => {
        expect(res.body).to.be.an('object');
        expect(res.body.topics[0]).to.have.all.keys('slug', 'description');
        expect(res.body.topics).to.be.an('array');
      })
    });
  });
});
//to have all keys - slug and description
//needs to have topics as the key, with an array of objects on that key




