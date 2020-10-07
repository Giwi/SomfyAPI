# SomfyAPI

Rest API for Somfy Home Protect

Install [NodeJS](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/getting-started/install) 
 
## Setup

Copy `conf.template.json` to `conf.json` and complete data:

    {
      "server": "http://127.0.0.1",
      "port": 3000,
      "username": "my.somfy@account.com",
      "password": "myPassword"
      "client_id": "xxxxxx",
      "client_secret": "xxxx"
    }

For `client_id` and `client_secret`, see https://github.com/Mystikal57/Somfy_Home_ALARM_API/issues/2

Then:

    $ yarn install
    $ yarn dev


Now explore the [API](./API.md)

## Contribute

Contribution via pull requests are welcome. 

## Great thanks to

- https://github.com/Mystikal57/Somfy_Home_ALARM_API
