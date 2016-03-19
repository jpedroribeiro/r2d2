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
		count = 0,
		rest = [];

	// Separate Chrome from main list
	data.forEach(function (item, index) {
		if (item[0] === 'Chrome' && item[2] !== 'iOS') {
			browser.push(item);
			count = count + parseInt(item[3]);
		} else {
			rest.push(item);
		}
	});

	return {
		'data': rest,
		'count': count,
		'entries': browser
	};
}


function dealWithFirefox(data) {
	let browser = [],
		count = 0,
		rest = [];

	// Separate Firefox from main list
	data.forEach(function (item, index) {
		if (item[0] === 'Firefox') {
			browser.push(item);
			count = count + parseInt(item[3]);
		} else {
			rest.push(item);
		}
	});

	return {
		'data': rest,
		'count': count,
		'entries': browser
	};
}


function dealWithSafari(data) {
	let browser = {},
		count = {},
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
			if (count[version] === undefined){
				count[version] = parseInt(item[3]);
			} else {
				count[version] = count[version] + parseInt(item[3]);	
			}
			
		} else {
			rest.push(item);
		}
	});

	return {
		'data': rest,
		'count': count,
		'entries': browser
	};
}


function dealWithEdge(data) {
	let browser = [],
		count = 0,
		rest = [];

	// Separate Firefox from main list
	data.forEach(function (item, index) {
		if (item[0] === 'Edge') {
			browser.push(item);
			count = count + parseInt(item[3]);
		} else {
			rest.push(item);
		}
	});

	return {
		'data': rest,
		'count': count,
		'entries': browser
	};
}


function dealWithIE(data) {
	let browser = {},
		count = {},
		rest = [];

	// Separate Safari from main list
	data.forEach(function (item, index) {
		if (item[0].indexOf('Internet Explorer') >= 0) {
			// Separate by main version number
			let version = item[1].substr(0, item[1].indexOf('.'));

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
			if (count[version] === undefined){
				count[version] = parseInt(item[3]);
			} else {
				count[version] = count[version] + parseInt(item[3]);	
			}
			
		} else {
			rest.push(item);
		}
	});

	return {
		'data': rest,
		'count': count,
		'entries': browser
	};
}


function dealWithOthers(data) {
	let browser = {},
		count = {};

	data.forEach(function (item, index) {
		// Separate browser by main vendor
		let vendor = item[0];

		// Creates array if non-existent
		if (browser[vendor] === undefined) {
			browser[vendor] = [];
		}
		browser[vendor].push(item);

		// Adds to count
		if (count[vendor] === undefined){
			count[vendor] = parseInt(item[3]);
		} else {
			count[vendor] = count[vendor] + parseInt(item[3]);	
		}
	});

	return {
		'count': count,
		'entries': browser
	};
}

/*
	Gets raw data from GA and log out combined results 
*/
export function aggregator (rawdata) {
	const total = rawdata.totalsForAllResults[Object.keys(rawdata.totalsForAllResults)];

	let data = rawdata.rows,
		chrome,
		firefox,
		safari,
		edge,
		ie,
		others;

	chrome = dealWithChrome(data);
	firefox = dealWithFirefox(chrome.data);
	safari = dealWithSafari(firefox.data);
	edge = dealWithEdge(safari.data);
	ie = dealWithIE(edge.data);
	others = dealWithOthers(ie.data);

	return {
		total,
		chrome,
		firefox,
		safari,
		edge,
		ie,
		others,
	};
}