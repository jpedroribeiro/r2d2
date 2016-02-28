/*

Grouping Rules

Chrome: All desktop, all mobile except iOS
Firefox: Everything!!
Safari: By version. Rounded by the major version number.
IE/Edge:

*/

function dealWithChrome (data) {
	let browser = [],
		browserCount = 0,
		rest = [];

	// Separate Chrome from main list
	data.forEach(function (item, index) {
		if (item[0] === 'Chrome' && item[2] !== 'iOS') {
			browser.push(item);
			browserCount = browserCount + parseInt(item[3]);
		} else {
			rest.push(item);
		}
	});

	return {
		'data': rest,
		'browser': browserCount
	};
}


function dealWithFirefox(data) {
	let browser = [],
		browserCount = 0,
		rest = [];

	// Separate Firefox from main list
	data.forEach(function (item, index) {
		if (item[0] === 'Firefox') {
			browser.push(item);
			browserCount = browserCount + parseInt(item[3]);
		} else {
			rest.push(item);
		}
	});

	return {
		'data': rest,
		'browser': browserCount
	};
}


function dealWithSafari(data) {
	let browser = [],
		browserCount = 0,
		rest = [];

	// Separate Safari from main list
	data.forEach(function (item, index) {
		if (item[0].indexOf('Safari')) {
			browser.push(item);
			browserCount = browserCount + parseInt(item[3]);
		} else {
			rest.push(item);
		}
	});

	// TODO HERE: dynamically separate by version

	return {
		'data': rest,
		'browser': browserCount
	};
}

export function aggregator (rawdata) {
	const total = rawdata.totalsForAllResults[Object.keys(rawdata.totalsForAllResults)];

	let data = rawdata.rows,
		tempData,
		chromeCount,
		firefoxCount,
		safariCountObject;

	// Chrome
	tempData = dealWithChrome(data);
	chromeCount = tempData.browser;
	data = tempData.data;
	console.log('Chrome: ', chromeCount);

	// Firefox
	tempData = dealWithFirefox(data);
	firefoxCount = tempData.browser;
	data = tempData.data;
	console.log('Firefox: ', firefoxCount);

	// Safari
	// tempData = dealWithSafari(data);
	// safariCountObject = tempData.browser;
	// data = tempData.data;
console.log(data);
	
}