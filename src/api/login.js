import request from '@/utils/request'

export function login(username, password, randomStr, code) {
	var grant_type = 'password'
	var scope = 'server'
	return request({
		//http://gateway.ezhihe.cn
		url: '/auth/oauth/token',
		headers: {
			'Authorization': 'Basic ZXpoOnNvbG9y'
		},
		method: 'post',
		params: {
			username,
			password,
			randomStr,
			code,
			grant_type,
			scope
		}
	})
}

export function getInfo(token) {
	return request({
		url: '/ims/user/info?access_token=' + token,
		method: 'get'
	})
}
export function logout(accesstoken, refreshToken) {
	return request({
		url: '/auth/authentication/removeToken',
		method: 'post',
		params: {
			accesstoken,
			refreshToken
		}
	})
}