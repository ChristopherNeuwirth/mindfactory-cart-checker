# Mindfactory Horseman

## Requirements

- Setup a Mindfactory account
- Save a shopping cart with stuff you want

## How to
1. Install node-forever https://github.com/foreverjs/forever and dependencies

``` bash
  npm install forever -g && npm install
```

2. Set parameters
- Rename example.config.env.js to .env
- Setup up USERNAME, PASSWORD and PRICE
- Price must be integer or point seperated value

3. Start the script
Check every hour:
``` bash
  forever --minUptime 10000 --spinSleepTime 3600000 start index.js
```

Stop the script
``` bash
  forever stop index.js
```
