

const express = require('express');
const router = express.Router();
let auth = require('../middleware/auth.js');

const categories = require('../models/categories-model.js');
const products = require('../models/products-model.js');
/**
 * dynaminc modele route
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
function getModel(req, res, next) {
  let model = req.params.model;

  switch(model) {
  case 'categories':
    req.model = categories;
    next();
    return;
  case 'products':
    req.model = products;
    next();
    return;
  default:
    next('invalid model');
    return;
  }
}

router.param('model', getModel);

router.get('/api/v1/:model',auth() ,handleGetAll);
router.post('/api/v1/:model',auth('create') ,handlePost);
router.get('/api/v1/:model/:id',auth(), handleGetOne);
router.put('/api/v1/:model/:id', auth('update'),handleUpdate);
router.delete('/api/v1/:model/:id', auth('delete'), handleDelete);

/**
 *handler function for get all
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleGetAll(req, res, next) {
  req.model.get()
    .then(results => {
      console.log('******** results: *********', results);
      let count = results.length;
      res.status(200).json({ count, results });
    });
}
/**
 *handler function for get one modele
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleGetOne(req, res, next) {
  let id = req.params.id;
  req.model.get(id)
    .then(record => {
      res.status(200).json(record);
    }).catch(next);
}
/**
 * handler function for post modele route
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handlePost(req, res, next) {
  req.model.create(req.body)
    .then(results => {
      res.status(201).json(results);
    }).catch(next);
}
/**
 * handler function for update modele route
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleUpdate(req, res, next) {
  let id = req.params.id;
  req.model.update(id,req.body)
    .then(results => {
      res.status(200).json(results);
    }).catch(next);
}
/**
 * handler function for delete modele route
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleDelete(req, res, next) {
  let id = req.params.id;
  const message = 'Item is deleted';
  req.model.delete(id)
    .then(results => {
      res.status(200).json({message});
    }).catch(next);
}

module.exports = router;