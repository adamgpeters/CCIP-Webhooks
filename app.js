const { decodeEventLog, parseAbi } = require("viem");
var express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

const CCIP_ABI = "event CCIPSendRequested((uint64 sourceChainSelector, address sender, address receiver, uint64 sequenceNumber, uint256 gasLimit, bool strict, uint64 nonce, address feeToken, uint256 feeTokenAmount, bytes data, (address token, uint256 amount)[] tokenAmounts, bytes[] sourceTokenData, bytes32 messageId) message)"
const parsedABI = parseAbi([CCIP_ABI]);
app.all('/*', function (req, _) {
   console.log("-------------- New Request --------------");
   console.log("Headers:" + JSON.stringify(req.headers, null, 3));
   console.log("Body:" + JSON.stringify(req.body, null, 3));

   const payload = req.body;

   // // Decode the event data and topics
   payload.event.data.block.logs.forEach(log => {
      console.log("-------------- Parsed Log --------------");
      const decodedLog = decodeEventLog({
         abi: parsedABI,
         data: log.data,
         topics: log.topics
      });

      // Decoded data
      const message = decodedLog.args.message;

      // Select fields from the message
      console.log(`The sender is: ${message.sender}`);
      console.log(`The feeToken is: ${message.feeToken}\nand feeTokenAmount is: ${message.feeTokenAmount} `);
      console.log("ENTIRE MESSAGE:\n")
      console.log(message);
   });
})

app.listen(port, function () {
   console.log(`Example app listening at ${port}`)
})
