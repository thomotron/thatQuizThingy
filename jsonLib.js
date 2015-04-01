function saveJSON(cookieName, object, expiry) {
	object = JSON.stringify(object);
	setCookie(cookieName,object,expiry);
}

function getJSON(cookieName) {
	if (!doesCookieExist(cookieName)) {
		return null;
	} else {
		return JSON.parse(getCookieValue(cookieName));
	}
}
