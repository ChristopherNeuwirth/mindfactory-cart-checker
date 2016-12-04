# Mindfactory Horseman
This little watcher can be run as a deamon of node forever to notify you via notification center if a mindfactory cart value has fallen beneath a defined limit.

![Example](https://github.com/ChristopherNeuwirth/mindfactory-cart-checker/blob/master/example.notification.png)

## Requirements

- NodeJS must be installed an your maschine (https://nodejs.org)
- Setup a Mindfactory account
- Save a shopping cart with stuff you want

## How to
**Install node-forever https://github.com/foreverjs/forever and dependencies**

``` bash
  npm install forever -g && npm install
```

**Set parameters**
- Rename example.config.env.js to .env
- Setup up USERNAME, PASSWORD and PRICE
- Price must be integer or point seperated value

**Start the script**
Check every hour:
``` bash
  forever --minUptime 10000 --spinSleepTime 3600000 start index.js
```

Stop the script
``` bash
  forever stop index.js
```
