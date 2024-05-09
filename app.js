const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes/index");

app.use(bodyParser.json());
app.use("/user", router);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
