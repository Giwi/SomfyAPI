# SomfyAPI

Rest API for Somfy Home Protect

Install [NodeJS](https://nodejs.org/en/download/) 
 
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

    $ npm install
    $ npm run start

Now explore the [API](./API.md)

You can install it as a service (modify `somfy-api.service` according to your installation path)

    $ npm run build
    $ sudo systemctl link ./somfy-api.service
    $ sudo systemctl enable somfy-api
    $ sudo systemctl start somfy-api

## Contribute

Contribution via pull requests are welcome. 

## Great thanks to

- https://github.com/Mystikal57/Somfy_Home_ALARM_API
