const { ethers } = require("ethers");
var express = require('express');
const abi = require("./abi.json");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

const contractInterface = new ethers.Interface(abi);

app.all('/*', function (req, _) {
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

      // Decoded data
      const message = decodedLog.args.message;

      // Some fields in data - see further fields below
      console.log(`The sender is: ${message.sender}`);
      console.log(`The feeToken is: ${message.feeToken}\nand feeTokenAmount is: ${message.feeTokenAmount} `);
      console.log("ENTIRE MESSAGE:\n")
      console.log(message);
   });
})

app.listen(port, function () {
   console.log(`Example app listening at ${port}`)
})

/*  Please note decodedLog.args is of the following form
   "inputs": [
      {
         "components": [
            {
               "internalType": "uint64",
               "name": "sourceChainSelector",
               "type": "uint64"
            },
            {
               "internalType": "address",
               "name": "sender",
               "type": "address"
            },
            {
               "internalType": "address",
               "name": "receiver",
               "type": "address"
            },
            {
               "internalType": "uint64",
               "name": "sequenceNumber",
               "type": "uint64"
            },
            {
               "internalType": "uint256",
               "name": "gasLimit",
               "type": "uint256"
            },
            {
               "internalType": "bool",
               "name": "strict",
               "type": "bool"
            },
            {
               "internalType": "uint64",
               "name": "nonce",
               "type": "uint64"
            },
            {
               "internalType": "address",
               "name": "feeToken",
               "type": "address"
            },
            {
               "internalType": "uint256",
               "name": "feeTokenAmount",
               "type": "uint256"
            },
            {
               "internalType": "bytes",
               "name": "data",
               "type": "bytes"
            },
            {
               "components": [
                     {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                     },
                     {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                     }
               ],
               "internalType": "struct Client.EVMTokenAmount[]",
               "name": "tokenAmounts",
               "type": "tuple[]"
            },
            {
               "internalType": "bytes[]",
               "name": "sourceTokenData",
               "type": "bytes[]"
            },
            {
               "internalType": "bytes32",
               "name": "messageId",
               "type": "bytes32"
            }
         ],
         "indexed": false,
         "internalType": "struct Internal.EVM2EVMMessage",
         "name": "message",
         "type": "tuple"
      }
   ]
*/
