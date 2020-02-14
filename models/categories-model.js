

const schema = require('./categories-schema.js');
const dataModel = require('./model.js');

class Categories extends dataModel {}

module.exports = new Categories(schema);