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
});