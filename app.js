const express = require("express");
const morgan = require("morgan");
const Sequelize = require('sequelize');
const wikiRouter = require('./routes/wiki');
// const userRouter = require('./routes/user');
const app = express();

const getLayout = require("./views/layout");

const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

// Where your server and express app are being defined:
const models = require('./models');
// models.db.sync({ force: true }) // this drops all tables then recreates them based on our JS definitions
// DON'T sync things twice!


// const { Page, User } = models;

app.use('/wiki', wikiRouter);
// app.use('/user', userRouter);
app.get("/", (req, res) => {
  res.redirect("/wiki");
});

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

// parses json bodies
app.use(express.json())

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
// const { addPage, editPage, main, userList, userPages, wikiPage } = require("./views/index.js");

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
  try {
    /* console.log("ENTERED INIT");

    await models.User.sync();
    console.log("SYNCED USERS");

    await models.Page.sync();
    console.log("SYNCED PAGE"); */
    await models.db.sync({ force: true });
    app.listen(PORT, () => { // app is name of our app
      console.log(`Server is listening on port ${PORT}!`);
    });
  } catch (err) {
    // console.log(err);
  }


  // await models.db.sync();
  // console.log("SYNCED DB");

  // make sure that you have a PORT constant and to replace the name below with your express app

}

init();

// app.listen(PORT, () => {
  // console.log(`App listening in port ${PORT}`);
// });
