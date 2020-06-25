const express = require('express');
const router = express.Router();
const { addPage } = require("../views");
// const getLayout = require("./views/layout");

router.get('/', (req, res, next) => {
  res.send('got to GET /wiki/');
  // res.send(getLayout("CONTENT HERE"));
  // console.log("hello world");
});

router.post('/', (req, res, next) => {
  res.send('got to POST /wiki/');
});

router.get('/add', (req, res, next) => {
  res.send('got to GET /wiki/add');
});

// router.get("/add", (req, res, next) => {
// res.send(addPage());
// });


module.exports = router;
