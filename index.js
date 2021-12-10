const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: false }));

const accountsid= "AC23560dcb904b95b9234c975102dd8c3b";
const authToken = "076f12b2b7ad78e4c5f72ee3d7502fe3";

const client = require("twilio")(accountsid,authToken);
const MessagingResponse = require("twilio").twiml.MessagingResponse;


app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/receive", (req,res) => {

  console.log(req.body.Body);

  const twiml = new MessagingResponse();

  twiml.message(`You sent ${req.body.Body}`);
  res.writeHead(200, {"Content-type" : "text/xml"});
  res.end(twiml.toString());

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
