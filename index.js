// Require modules
import google from 'googleapis';
import key from 'R2D2-c021b8657369.json'; // Create a new project on Google Developer Console to get your credentials
import ga from 'ga_viewid.json'; // Go to the Admin panel in Google Analytics > View > View Settings > View ID
import {aggregator} from './data-aggregator.js'

let client,
	config,
	queryData;


client = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/analytics.readonly'], null);

// Config should not be changed or it might affect the Aggregator script
config = {
	'auth': client,
	'ids': ga.view_id,
	'dimensions': 'ga:browser,ga:browserVersion,ga:operatingSystem',
	'metrics': 'ga:sessions',
	'start-date': '30daysAgo',
	'end-date': 'yesterday',
	'sort': '-ga:sessions',
};

queryData = function (analytics) {
	analytics.data.ga.get(config, function (err, response){
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
