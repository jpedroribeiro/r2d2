Rapid Reporting Device Dashboard [R2D2]
======

Work in progress.

nodejs application reading Google Analytics browser/devide data and displaying results.

**Usage**
(1) Create a new project on Google Developer Console to get your credentials in JSON format, save it into your node_modules folder;
(2) Go to the Admin panel in Google Analytics > View > View Settings > View ID, and copy this value;
(3) On index.js, replace the **key** path to your JSON;
(4) Create a file called ga_viewid.json and paste your View ID there as a json object with view_id as key;
(5) npm install
(6) run babel-node index.js
