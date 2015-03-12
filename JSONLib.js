function saveJSON(object, cookieName, expiry) {
	array = JSON.stringify(array);
	setCookie(cookieName,object,expiry);
}

function getJSON(cookieName) {
	if (!doesCookieExist(cookieName)) {
		return null;
	} else {
		JSON.parse(getCookieValue(cookieName));
	}
}
