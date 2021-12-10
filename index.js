const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes/routes");

app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
