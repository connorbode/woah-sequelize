var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
var woah = require('../lib');
var models = require('./setup/models');
var db;

beforeEach(done => {
  db = woah(models);
  done();
});

afterEach(done => {
  models.Test
    .destroy({ where: {} })
    .then(() => {
      done();
    });
});

describe('transactions', () => {
  it('runs an empty transaction', (done) => {
    db.transaction(function * () {
      
    }).then(() => {
      done();
    });
  });

  it('runs a query on an empty db', (done) => {
    db.transaction(function * () {
      var test = yield db.Test.findAll();
      expect(test).to.be.empty;
    }).then(() => {
      done();
    });
  });

  it('creates an instance then retrieves it', (done) => {
    db.transaction(function * () {
      var instance = yield db.Test.create({
        name: 'Bottles',
        age: 99,
        sex: 'Male'
      });
      var retrieved = yield db.Test.findAll();
      expect(retrieved.length).to.equal(1);
    }).then(() => {
      done();
    });
  });
});