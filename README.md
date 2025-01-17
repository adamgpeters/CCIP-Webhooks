# Alchemy Webhooks Example: Following CCIP Events on EVM Chains

This sample app listens to `CCIPSendReqested` events from Ethereum to Arbitrum on a local express server in 3 simple steps
1. Start the local server
2. Port forwarding with ngrok
3. Create the Alchemy Webhook

**Prerequisites**: [Node.js](https://nodejs.org/en/).

## Getting Started

To install this sample, run the following commands:

```bash
npm i
```

This will get the project installed locally.

## Launching the app

Now you can launch the app:

```bash
npm start
```

The app runs by default on port 3000

## Making this app public with ngrok

If you do not already have an ngrok account, follow [these instructions](https://ngrok.com/docs/integrations/alchemy/webhooks/#start-ngrok) to set things up. 

To make your app public using ngrok, enter:

```bash
ngrok http 3000
```

Make sure to keep track of the forwarding address, for example `https://9cde-2a09-bac0-1000-318-00-1d0-b2.ngrok-free.app`

## Creating the Alchemy Webhook
Go to [your alchemy dashboard](https://dashboard.alchemy.com/webhooks) and create a new Custom Webhook with the following schema:

```
{
  block {
    hash,
    number,
    timestamp,
    logs(filter: {addresses: ["0x69eCC4E2D8ea56E2d0a05bF57f4Fd6aEE7f2c284"], topics: ["0xd0c3c799bf9e2639de44391e7f524d229b2b55f5b1ea94b2bf7da42f7243dddd"]}) { 
      data,
      topics,
    }
  }
}
```
For a "Webhook URL", use the **same** forwarding address from ngrok. Now create your webhook!

If you have not already, start your app with `npm start`, and start listening to Eth --> Arb CCIP events 🚀

## Notes
This webhook follows the `CCIPSendRequested` event (`0xd0c3c799bf9e2639de44391e7f524d229b2b55f5b1ea94b2bf7da42f7243dddd`) for the Arbitrum onramp address (`0x69eCC4E2D8ea56E2d0a05bF57f4Fd6aEE7f2c284`). This webhook could be altered to follow multiple network onramps. For instance, 
```
addresses: ["0x69eCC4E2D8ea56E2d0a05bF57f4Fd6aEE7f2c284", "0xD8E8720709a3d9A18a9B281E6148E94149B2E252"]
``` 
would follow Arb and Astar! See further onramp addresses [here](https://docs.chain.link/ccip/directory/mainnet). 

*Originally Forked from https://ngrok.com/docs/integrations/alchemy/webhooks/*
