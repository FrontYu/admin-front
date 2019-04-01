import {
  request
} from '../utils/request'

export const requestLogin = params => {
  return request('POST', '/api/user/login', params).then(data => {
    localStorage.setItem('user-token', JSON.stringify(data.token))
    return data
  })
}

export const requestRegister = params => {
  return request('POST', '/api/user/register', params)
}

export const requestUserInfo = params => {
  return request('GET', '/api/auth/info', params).then((data) => {
    sessionStorage.setItem('user-info', JSON.stringify(data))
    return data
  })
}

export const requestLogout = params => {
  return request('POST', '/api/user/logout', params)
}

export const requestChangePassword = params => {
  return request('POST', '/api/user/changePassword', params).then(data => {
    localStorage.setItem('user-token', JSON.stringify(data.token))
    return data
  })
}

export const requestUserQuery = params => {
  return request('GET', '/api/user/query', params)
}
