const { ethers } = require("ethers");
const abi = require("./abi.json");

var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

const contractInterface = new ethers.Interface(abi);

app.all('/*', function (req, res) {
   console.log("-------------- New Request --------------");
   console.log("Headers:" + JSON.stringify(req.headers, null, 3));
   console.log("Body:" + JSON.stringify(req.body, null, 3));
   const payload = req.body;

   // // Decode the event data and topics
   payload.event.data.block.logs.forEach(log => {
      console.log("-------------- Parsed Log --------------");
      const decodedLog = contractInterface.parseLog({
         data: log.data,
         topics: log.topics
      });

      // CCIPSendRequested event logs. 
      console.log(decodedLog.args);
   });
})

app.listen(port, function () {
   console.log(`Example app listening at ${port}`)
})
