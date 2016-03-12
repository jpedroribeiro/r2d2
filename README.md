# Rapid Reporting Device Dashboard [R2D2]

**r2d2** is an nodejs application reading Google Analytics browser/devide data and displaying results. It's written using _ES2015_ standards.

## Usage
- Create a new project on [Google Developer Console] to get your credentials in JSON format, save it into your _node_modules_ folder;
- Go to the Admin panel in Google Analytics > View > View Settings > View ID, and copy this value;
- On index.js, replace the **key** path to your JSON;
- Create a file called ga_viewid.json and paste your View ID there as a json object with view_id as key;
- Run:
```sh
$ npm install
babel-node index.js
```

## Rules
WIP (TODO)
## Contact
[@jpedroribeiro]

> **R2-D2**: “Beep bop boop beep beep beep.”

_Star Wars: Episode V - The Empire Strikes Back (1980)_

[Google Developer Console]: <https://console.developers.google.com/>
[@jpedroribeiro]: <http://www.twitter.com/jpedroribeiro>