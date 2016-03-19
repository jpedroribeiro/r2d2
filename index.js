// Require modules
import clc from 'cli-color';
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

		process.stdout.write(clc.reset);

		// Aggregate data
		aggregated = aggregator(response);

		// "Total"
		console.log(`Total: ${aggregated.total} (100%)`);

		// "Chrome"
		console.log(`Chrome: ${aggregated.chrome.count} (${Math.round(aggregated.chrome.count/aggregated.total*100)}%)`);

		// "Firefox"
		console.log(`Firefox: ${aggregated.firefox.count} (${Math.round(aggregated.firefox.count/aggregated.total*100)}%)`);

		// "Safari"
		for (let browser in aggregated.safari.count) {
			console.log(`Safari ${browser}: ${aggregated.safari.count[browser]} (${Math.round(aggregated.safari.count[browser]/aggregated.total*100)}%)`);
		}

		// "Edge"
		console.log(`Edge: ${aggregated.edge.count} (${Math.round(aggregated.edge.count/aggregated.total*100)}%)`);

		// "IE"
		for (let browser in aggregated.ie.count) {
			console.log(`IE ${browser}: ${aggregated.ie.count[browser]} (${Math.round(aggregated.ie.count[browser]/aggregated.total*100)}%)`);
		}

		// "Others"
		console.log('Others:');
		for (let browser in aggregated.others.count) {
			console.log(`| ${browser}: ${aggregated.others.count[browser]} (${Math.round(aggregated.others.count[browser]/aggregated.total*100)}%)`);
		}
		
		// TODO
		// #1 group / order
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
