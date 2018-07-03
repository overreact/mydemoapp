// itemRoutes.js

var express = require('express');
var app = express();
var eventRouter = express.Router();

// Require Item model in our routes module
var Item = require('../models/Events');

// Defined store route
eventRouter.route('/add/post').post(function (req, res) {
  var item = new Item(req.body);
      item.save()
    .then(item => {
    res.json('Event added successfully');
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
eventRouter.route('/list').get(function (req, res) {
  Item.find(function (err, itms){
    if(err){
      console.log(err);
    }
    else {
      res.json(itms);
    }
  });
});

// Defined edit route
eventRouter.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Item.findById(id, function (err, item){
      res.json(item);
  });
});

//  Defined update route
eventRouter.route('/update/:id').post(function (req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      item.item = req.body.item;

      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
eventRouter.route('/delete/:id').get(function (req, res) {
  Item.findByIdAndRemove({_id: req.params.id},
       function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = eventRouter;