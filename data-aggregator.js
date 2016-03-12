/*

Grouping Rules

Chrome: All desktop, all mobile except iOS
Firefox: Everything!!
Safari: By version. Rounded by the major version number. Version 7 and below are grouped.
Edge: Everything!!
IE: By version. Rounded by the major version number. Version 8 and below are grouped.
Others: Everything else. Vendor name and count number.

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
		'count': browserCount,
		'browser': browser
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
		'count': browserCount,
		'browser': browser
	};
}


function dealWithSafari(data) {
	let browser = {},
		browserCount = {},
		rest = [];

	// Separate Safari from main list
	data.forEach(function (item, index) {
		if (item[0].indexOf('Safari') >= 0) {
			// Separate by main version number
			let version = item[1].charAt(0);

			// Treat '(in app)' as latest (9)
			if (version.indexOf('(') > -1){
				version = 9;
			}

			// Treat version 7 and below as one group
			if (version <= 7) {
				version = '7 or less';
			}

			// Creates array if non-existent
			if (browser[version] === undefined) {
				browser[version] = [];
			}
			browser[version].push(item);

			// Adds to count
			if (browserCount[version] === undefined){
				browserCount[version] = parseInt(item[3]);
			} else {
				browserCount[version] = browserCount[version] + parseInt(item[3]);	
			}
			
		} else {
			rest.push(item);
		}
	});

	return {
		'data': rest,
		'count': browserCount,
		'browser': browser
	};
}


function dealWithEdge(data) {
	let browser = [],
		browserCount = 0,
		rest = [];

	// Separate Firefox from main list
	data.forEach(function (item, index) {
		if (item[0] === 'Edge') {
			browser.push(item);
			browserCount = browserCount + parseInt(item[3]);
		} else {
			rest.push(item);
		}
	});

	return {
		'data': rest,
		'count': browserCount,
		'browser': browser
	};
}


function dealWithIE(data) {
	let browser = {},
		browserCount = {},
		rest = [];

	// Separate Safari from main list
	data.forEach(function (item, index) {
		if (item[0].indexOf('Internet Explorer') >= 0) {
			// Separate by main version number
			let version = item[1].charAt(0);

			// Treat version 8 and below as one group
			if (version <= 8) {
				version = '8 or less';
			}

			// Creates array if non-existent
			if (browser[version] === undefined) {
				browser[version] = [];
			}
			browser[version].push(item);

			// Adds to count
			if (browserCount[version] === undefined){
				browserCount[version] = parseInt(item[3]);
			} else {
				browserCount[version] = browserCount[version] + parseInt(item[3]);	
			}
			
		} else {
			rest.push(item);
		}
	});

	return {
		'data': rest,
		'count': browserCount,
		'browser': browser
	};
}


function dealWithOthers(data) {
	let browser = {},
		browserCount = {};

	data.forEach(function (item, index) {
		// Separate browser by main vendor
		let vendor = item[0];

		// Creates array if non-existent
		if (browser[vendor] === undefined) {
			browser[vendor] = [];
		}
		browser[vendor].push(item);

		// Adds to count
		if (browserCount[vendor] === undefined){
			browserCount[vendor] = parseInt(item[3]);
		} else {
			browserCount[vendor] = browserCount[vendor] + parseInt(item[3]);	
		}
	});

	return {
		'count': browserCount,
		'browser': browser
	};
}

/*
	Gets raw data from GA and log out combined results 
*/
export function aggregator (rawdata) {
	const total = rawdata.totalsForAllResults[Object.keys(rawdata.totalsForAllResults)];

	let data = rawdata.rows,
		tempData,
		chromeCount,
		firefoxCount,
		safariCountObject,
		edgeCount,
		ieCountObject,
		othersCountObject;

	// Chrome
	tempData = dealWithChrome(data);
	chromeCount = tempData.count;
	data = tempData.data;
	console.log(`Chrome: ${chromeCount}`);

	// Firefox
	tempData = dealWithFirefox(data);
	firefoxCount = tempData.count;
	data = tempData.data;
	console.log(`Firefox: ${firefoxCount}`);

	// Safari
	tempData = dealWithSafari(data);
	safariCountObject = tempData.count;
	data = tempData.data;
	for (let key in safariCountObject){
		console.log(`Safari ${key}: ${safariCountObject[key]}`);
	};

	// Edge
	tempData = dealWithEdge(data);
	edgeCount = tempData.count;
	data = tempData.data;
	console.log(`Edge: ${edgeCount}`);

	// Internet Explorer
	tempData = dealWithIE(data);
	ieCountObject = tempData.count;
	data = tempData.data;
	for (let key in ieCountObject){
		console.log(`IE ${key}: ${ieCountObject[key]}`);
	};

	// Others
	tempData = dealWithOthers(data);
	othersCountObject = tempData.count;
	data = tempData.data;
	for (let key in othersCountObject){
		console.log(`${key}: ${othersCountObject[key]}`);
	};
}