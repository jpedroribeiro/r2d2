# Rapid Reporting Device Dashboard [R2D2]

**r2d2** is an nodejs application reading Google Analytics browser/devide data and displaying results. It's written using _ES2015_ standards.

## Config
1. Create a new project on [Google Developer Console] to get your credentials in JSON format; 
2. Copy **private_key** and **client_email** into **config.json**;
3. Go to the Admin panel in Google Analytics > View > View Settings > View ID, and copy this value into the **view_id** inside **config.json**.

## Running
```sh
$ npm install
babel-node index.js
```

## Aggregation Rules
WIP (TODO)
## Contact
[@jpedroribeiro]

> **R2-D2**: “Beep bop boop beep beep beep.”

_Star Wars: Episode V - The Empire Strikes Back (1980)_

[Google Developer Console]: <https://console.developers.google.com/>
[@jpedroribeiro]: <http://www.twitter.com/jpedroribeiro>