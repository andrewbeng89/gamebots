var app = require('../app'), http = require('http'), request = require('supertest'), assert = require('assert');

describe('GET /test', function(){
  it('get test API', function(done){
    request(app)
      .get('/test')
      .expect(200, done);
  });
});