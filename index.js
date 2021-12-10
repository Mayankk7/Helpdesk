const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: false }));

const accountsid = "AC23560dcb904b95b9234c975102dd8c3b";
const authToken = "076f12b2b7ad78e4c5f72ee3d7502fe3";

const client = require("twilio")(accountsid, authToken);
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const users = [];

const findusers = (sender) => {
  users.findIndex((user) => user.sender === sender);
}

const createuser = () => {
  return (users.push({ sender, }) - 1);
}

app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/receive", (req, res) => {

  console.log(req.body.Body);
  const sender = req.body.ProfileName;
  const UserIndex = findusers(sender);

  const twiml = new MessagingResponse();

  if(UserIndex === -1){
      createuser(sender);
      twiml.message("Hi ! How can we help you today ?");
  }else if(req.body.Body == "problem"){
    twiml.message("Send us your discord id ");
  }else if(req.body.Body == "contact"){
    twiml.message("Contact us at ");
  }
  
  res.writeHead(200, { "Content-type": "text/xml" });
  res.end(twiml.toString());

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
