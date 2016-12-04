// requirements
require('dotenv').config()

let Horseman = require('node-horseman');
let horseman = new Horseman({ timeout: 10000 });
let notifier = require('node-notifier');
let path = require('path');
let open = require('open');

let username = process.env.USERNAME;
let password = process.env.PASSWORD;
let acceptedPrice = process.env.PRICE;

let baseUrl = 'https://www.mindfactory.de/login.php';
let shoppingCartUrl = 'https://www.mindfactory.de/shopping_cart.php';

let successMessage = (value) => {
  return {
    title: 'Mindfactory Warenwert gesunken!',
    subtitle: '🚨 🤘😄🤘 🚨',
    message: `Gesamtkosten jetzt ${value} Euro`,
    icon: path.join('./', 'icon.png'),
    wait: 'true',
    sound: 'true'
  }
};
let failingMessage = (value) => {
  return {
    title: 'Mindfactory Check',
    subtitle: '😡',
    icon: path.join('./', 'icon.png'),
    wait: 'true',
    message: `Gesamtkosten derzeit ${value} Euro`
  }
};

console.log('Checking cart value...');

horseman
  .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
  .open(baseUrl)
  .type('input[name="login_email_address"]', username)
  .type('input[name="login_password"]', password)
  .click('input[alt="Anmeldung"]')
  .waitForNextPage()
  .open(shoppingCartUrl)
  .waitForNextPage()
  .text('#cart_quantity > div.backgrey.pal10 > div.floatLeft.width760.colorblue.pat10.backgrey > div.floatRight.width235 > div.floatRight > div:nth-child(1) > span')
  .then((text) => {
    let value = text.substring(2);
    value = value.replace(/,/g, '.');
    if(value < acceptedPrice) {
      value = value.replace(/\./g, ',');
      notifier.notify(successMessage(value));
    } else {
      notifier.notify(failingMessage(value));
    }
  })
  .close();

  notifier.on('click', (notifierObject, options) => {
    console.log('click');
    open(shoppingCartUrl);
  });
