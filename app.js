const express = require("express");
const morgan = require("morgan");
const Sequelize = require('sequelize');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const getLayout = require("./views/layout");



// Where your server and express app are being defined:
const models = require('./models/index.js');
models.db.sync({ force: true }) // this drops all tables then recreates them based on our JS definitions
const { Page, User } = models;
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});



const app = express();
app.use('/wiki', wikiRouter);
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
const { addPage, editPage, main, userList, userPages, wikiPage } = require("./views/index.js");



const PORT = 3000;


app.get("/", (req, res) => {
  res.send(getLayout("CONTENT HERE"));
  console.log("hello world");
})

db.authenticate().
  then(() => {
    console.log('connected to the database');
  })

const init = async () => {
  await models.User.sync();
  await models.Page.sync();
  await models.db.sync();

  // make sure that you have a PORT constant and to replace the name below with your express app
  app.listen(PORT, () => { // app is name of our app
    console.log(`Server is listening on port ${PORT}!`);
  });
}

init();

// app.listen(PORT, () => {
  // console.log(`App listening in port ${PORT}`);
// });
