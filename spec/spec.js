var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
var woah = require('../lib');
var models = require('./setup/models');

beforeEach(done => {
  var db = woah(models);
  done();
});

afterEach(done => {
  models.Test
    .destroy({ where: {} })
    .then(() => {
      done();
    });
});

describe('test', () => {
  it('tests', () => {
    expect(true).to.equal(true);
  });
});