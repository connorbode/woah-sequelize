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

describe('querying', () => {
  it('finds a model by id', (done) => {
    db.transaction(function * () {
      var test = yield db.Test.create({
        name: 'Test',
        age: 12,
        sex: 'undeclared'
      });
    });
  });
});