
const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Categories >>>> CRUD', () => {

  it('post a new categorie item', () => {
    let testObj = { name: 'test name', display_name: 'test display_name', description: 'test description' };
    return mockRequest.post('/api/v1/categories')
      .send(testObj)
      .then(data => {
        let record = data.body;
        console.log('record : ', record._id);
        Object.keys(testObj).forEach(key => {
          expect(record[key]).toEqual(testObj[key]);
        });

      });
  });


  it('get a categorie item', () => {

    return mockRequest.get('/api/v1/categories')
      .then(response => {
        console.log('response.body before delete: ', response.body);
        expect(response.status).toEqual(200);
      });
  });

  it('update a new categorie item', () => {
    let testObj = { name: 'test name updated', display_name: 'test display_name updated', description: 'test description' };
    return mockRequest.put('/api/v1/categories/5e3c876d19a78d2b8072bd57')
      .send(testObj)
      .then(data => {
        // let record = data.status;
        expect(data.status).toEqual(200);


      });
  });

  it('delete a categorie item', () => {

    return mockRequest.delete('/api/v1/categories/5e3c83700ec10026175775ca')
      .then(response => {
        console.log('response.body after delete : ', response.body);
        expect(response.status).toEqual(200);
      });
  });

});



describe('Products >>>> CRUD', () => {

  it('post a new product item', () => {
    let testObj = { category: 'test category', name: 'test name', display_name: 'test display_name', description: 'test description' };
    return mockRequest.post('/api/v1/products')
      .send(testObj)
      .then(data => {
        let record = data.body;
        console.log('record : ', record._id);
        Object.keys(testObj).forEach(key => {
          expect(record[key]).toEqual(testObj[key]);
        });

      });
  });


  it('get a product item', () => {

    return mockRequest.get('/api/v1/products')
      .then(response => {
        console.log('response.body before delete: ', response.body);
        expect(response.status).toEqual(200);
      });
  });

  it('update a product item', () => {
    let testObj = { name: 'test name updated', display_name: 'test display_name updated', description: 'test description' };
    return mockRequest.put('/api/v1/products/5e3c876d19a78d2b8072bd57')
      .send(testObj)
      .then(data => {
        // let record = data.status;
        expect(data.status).toEqual(200);


      });
  });

  it('delete a product item', () => {

    return mockRequest.delete('/api/v1/products/5e3c83700ec10026175775ca')
      .then(response => {
        console.log('response.body after delete : ', response.body);
        expect(response.status).toEqual(200);
      });
  });

});