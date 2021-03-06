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
	let aggregated, temp;

	analytics.data.ga.get(query, function (err, response){
		if (err) {
			console.log(err);
			return;
		}

		// Aggregate data
		aggregated = aggregator(response);

		// "Total"
		console.log(`Total: ${aggregated.total} (100%)`);

		// "Chrome"
		console.log(`Chrome: ${aggregated.chrome.count} (${(aggregated.chrome.count/aggregated.total*100)}%)`);

		// "Firefox"
		console.log(`Firefox: ${aggregated.firefox.count} (${(aggregated.firefox.count/aggregated.total*100)}%)`);

		// "Safari"
		for (let browser in aggregated.safari.count) {
			console.log(`Safari ${browser}: ${aggregated.safari.count[browser]} (${(aggregated.safari.count[browser]/aggregated.total*100)}%)`);
		}

		// "Edge"
		console.log(`Edge: ${aggregated.edge.count} (${(aggregated.edge.count/aggregated.total*100)}%)`);

		// "IE"
		for (let browser in aggregated.ie.count) {
			console.log(`IE ${browser}: ${aggregated.ie.count[browser]} (${(aggregated.ie.count[browser]/aggregated.total*100)}%)`);
		}

		// "Others"
		console.log('Others:');
		for (let browser in aggregated.others.count) {
			console.log(`| ${browser}: ${aggregated.others.count[browser]} (${(aggregated.others.count[browser]/aggregated.total*100)}%)`);
		}
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
