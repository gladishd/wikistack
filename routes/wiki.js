const express = require('express');
const router = express.Router();
const addPage = require("../views").addPage;
const getLayout = require("../views/layout");

router.get('/', (req, res, next) => {
  res.send(getLayout("CONTENT HERE"));
  // console.log("hello world");
});

// refer to /add instead of /
router.post('/', async (req, res, next) => {
  try {
    res.json(req.body);
    console.log(req.body);
    // res.send('got to POST /wiki/');
  } catch (err) {
    console.log(err);
  }
});

router.get('/add', async (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
