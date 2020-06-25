const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
const {addPage, editPage, main, userList, userPages, wikiPage } = require("./views/index.js");
const getLayout = require("./views/layout");

app.get("/", (req, res) => {
    res.send(getLayout("CONTENT HERE"));
    console.log("hello world");
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

