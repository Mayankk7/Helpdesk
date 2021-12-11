const accountsid = "AC23560dcb904b95b9234c975102dd8c3b";
const authToken = "076f12b2b7ad78e4c5f72ee3d7502fe3";

const client = require("twilio")(accountsid, authToken);
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const users = [];

//Create and find user function//
const findusers = (sender) => {
  users.findIndex((user) => user.sender === sender);
}

const createuser = () => {
  return (users.push({ sender, }) - 1);
}
////////////////////////////////////////////////////////////////////

const getIndex = (req, res) => {
    res.render("index.html");
}

const textMessage = () => {
    client.messages.create({
          body: 'Hello from Node',
          to: '+919643608485', // Text this number
          from: '+18334350557', // From a valid Twilio number
        })
        .then((message) => console.log(message))
}
////////////////////////////////////////////////////////////////////

const getMessage = (req,res) => {

    console.log(req.body.Body);
    const sender = req.body.ProfileName;
    const UserIndex = findusers(sender);
    
    const twiml = new MessagingResponse();

    if(UserIndex === -1){
        createuser(sender);
        twiml.message("Hi ! How can we help you today ? Type 1 to send a sms");
    }else if(req.body.Body === "1"){
        textMessage();
    }
    else{
      twiml.message("Welcome to the bot! Type 1 to continue");
    }
    
    res.writeHead(200, { "Content-type": "text/xml" });
    res.end(twiml.toString());
  
  }

//////////////////////////////////////////////////////////////////
module.exports = {getMessage, getIndex};