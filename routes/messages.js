'use strict';

const express = require('express');
const knex = require('../knex');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

  //GET all resources
  router.get('/', function(req, res, next) {
    knex('messages')
    .select(
      'id',
      'name',
      'message'
    )
    .orderBy('id', 'ASC')
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      next(err);
    });
  });

  // GET single resource
  router.get('/:id', function(req, res, next) {
    let id = parseInt(req.params.id);

    knex('messages')
    .select(
      'id',
      'name',
      'message'
    )
    .where('id', id)
    .first()
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      next(err);
    });
  });

  // POST route
  router.post('/', function(req, res, next) {
    let body = {
      name: req.body.name,
      message: req.body.message
    };

    knex('messages')
    .insert(body)
    .then(function() {
      res.send(body);
    })
    .catch(function(err) {
      next(err);
    });
  });

  // PATCH single resource
  router.patch('/:id', function(req, res, next) {
    let id = parseInt(req.params.id);
    knex('messages')
      .where('id', id)
      .first()
      .then(function() {
        return knex('messages')
          .update({ name: req.body.name, message: req.body.message })
          .where('id', id)
          .returning(['id', 'name', 'message']);
      })
      .then(function(name) {
        res.send(name[0]);
      })
      .catch(function(err) {
        next(err);
      });
  });

  // DELETE single resource
  router.delete('/:id', function(req, res, next) {
    let id = parseInt(req.params.id);
    let message;

    knex('messages')
      .where('id', id)
      .first()
      .then(function(data) {
        message = data;
        return knex('messages')
          .del()
          .where('id', id);
      })
      .then(function() {
        delete message.created_at;
        delete message.updated_at;
        res.send(message);
      })
      .catch(function(err) {
        next(err);
      });
  });

module.exports = router;
