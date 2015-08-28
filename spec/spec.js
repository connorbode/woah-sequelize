var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
var Woah = require('../lib');
var db = require('./setup/models');
var woah;

beforeEach(done => {
  woah = Woah(db);
  done();
});

afterEach(done => {
  db.Test
    .destroy({ where: {} })
    .then(() => {
      done();
    });
});

describe('transactions', () => {
  it('runs an empty transaction', (done) => {
    woah.transaction(function * () {
      
    }).then(() => {
      done();
    });
  });

  it('runs a query on an empty db', (done) => {
    woah.transaction(function * () {
      var test = yield db.Test.findAll();
      expect(test).to.be.empty;
    }).then(() => {
      done();
    });
  });

  it('creates an instance then retrieves it', (done) => {
    woah.transaction(function * (t) {
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

  it('rolls back', (done) => {
    woah.transaction(function * (t) {
      var instance = yield db.Test.create({
        name: 'Bottles',
        age: 99,
        sex: 'Male'
      }, { transaction: t });
      var instance2 = yield db.Test.create({
        name: 9
      }, { transaction: t });
    }).then(() => {
      throw "Should not succeed..";
    }).catch((err) => {
      var retrieved;
      woah.transaction(function * () {
        retrieved = yield db.Test.findAll();
      }).then(() => {
        expect(retrieved).to.be.empty;
        done();
      });
    });
  });
});