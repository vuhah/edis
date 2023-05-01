export function setAccessToken(token) {
	var expiresIn = 90 * 24 * 60 * 60 // 90 days in seconds
	var expires = ''
	if (expiresIn) {
		var date = new Date()
		date.setTime(date.getTime() + expiresIn * 1000)
		expires = '; expires=' + date.toUTCString()
	}
	document.cookie = 'accessToken=' + (token || '') + expires + '; path=/'
}

export function getAccessToken() {
	var nameEQ = 'accessToken' + '='
	var ca = document.cookie.split(';')
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i]
		while (c.charAt(0) == ' ') c = c.substring(1, c.length)
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
	}
	return null
}

export function deleteAccessToken() {
	document.cookie =
		'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
