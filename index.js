// Require modules
import google from 'googleapis';
import config from './config.json';
import {aggregator} from './data-aggregator.js'

let client,
	query,
	queryData;


client = new google.auth.JWT(config.client_email, null, config.private_key, ['https://www.googleapis.com/auth/analytics.readonly'], null);

// Config should not be changed or it might affect the Aggregator script
query = {
	'auth': client,
	'ids': config.view_id,
	'dimensions': 'ga:browser,ga:browserVersion,ga:operatingSystem',
	'metrics': 'ga:sessions',
	'start-date': '30daysAgo',
	'end-date': 'yesterday',
	'sort': '-ga:sessions',
};

queryData = function (analytics) {
	analytics.data.ga.get(query, function (err, response){
		if (err) {
			console.log(err);
			return;
		}
		// console.log(JSON.stringify(response, null, 4));

		aggregator(response);
		
		// TODO
		// #1 group
		// #2 pretty print (cli-color) with percentage and bar
		// #3 live data? (current users)
	});
}

// Authorize and query data
client.authorize(function (err, tokens) {
	if (err) {
		console.log(err);
		return;
	}
	// No errors found, we can do our query
	let analytics = google.analytics('v3');
	queryData(analytics);
});
