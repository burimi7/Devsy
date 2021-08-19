var express = require('express');
var router = express.Router();
var moment = require('moment');

var config = require('../config.json');
const { body, validationResult } = require('express-validator');

module.exports = router;

let Users = require('../Users.json');

router.get('/GetUsers', GetUsers)
router.post('/AddUser',
body('firstname').isLength({ min: 1 }),//.isEmail(),
body('lastname').isLength({ min: 1 }),//.isEmail(),
body('email').isEmail(),
body('birthday').isLength({ min: 8 }),
AddUser)
router.post('/EditUser',
body('id').isLength({ min: 1 }),//.isEmail(),
body('firstname').isLength({ min: 1 }),//.isEmail(),
body('lastname').isLength({ min: 1 }),//.isEmail(),
body('email').isEmail(),
body('birthday').isLength({ min: 8 }),
EditUser)
router.delete('/DeleteUser/:id', DeleteUser)


function GetUsers(req, res) {
  res.json(Users)
}

function AddUser(req, res) {
  console.log('add.....'+JSON.stringify(req.body))
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    console.log('Ok, adding to users')
    Users.push(req.body);
    console.log(Users)

    res.json(Users)
  }
}

function EditUser(req, res) {
  console.log(req.body)
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), message:'NOOO'});
  }
  else {
    for (var i = 0; i < Users.length; i++) {
      if (Users[i].id == req.body.id) {
        Users[i] = req.body
      }
    }
    res.json(Users)
  }
}

function DeleteUser(req, res) {
  console.log('delete...')
  console.log(req.params)
  // Finds the validation errors in this request and wraps them in an object with handy functions
  Users =  Users.filter(user=>user.id!=req.params.id)  
  res.json(Users);
}


