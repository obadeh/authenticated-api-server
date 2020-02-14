
const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('test error handlers',()=>{
  it('it should send 500 error',()=>{
    return mockRequest.get('/api/v1/error')
      .then(response => {
        expect(response.status).toEqual(500);

      });
  });

  it('it should send 404 notfound',()=>{
    return mockRequest.get('/api/404')
      .then(response => {
        expect(response.status).toEqual(404);

      });
  });


});
