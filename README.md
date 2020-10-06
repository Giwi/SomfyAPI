# SomfyAPI

Rest API for Somfy Home Alarm

## Prerequisites

Create a developer account and an app at https://developer.somfy.com/

Get the Consumer Key and the Consumer Secret.

Set the Callback URL to http://<your server>:<port>/redirect, (ie: http://127.0.0.1:3000/redirect)

Install [NodeJS](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/getting-started/install) 
 
## Setup

Copy `conf.template.json` to `conf.json` and complete data:

    {
      "consumerKey": "<your consumer key>",
      "consumerSecret": "<your consumer secret>",
      "server": "http://127.0.0.1",
      "port": 3000
    }

Your server address must match the callback url: 

    "server": "http://127.0.0.1",
    "port": 3000

Callback url: `http://127.0.0.1:3000/redirect`;

Then:

    $ yarn install
    $ yarn dev

Open your browser to http://127.0.0.1:3000 to authorize your app.

Now explore the [API](./API.md)

## Contribute

Contribution via pull requests are welcome. 
