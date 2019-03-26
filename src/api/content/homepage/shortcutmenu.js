import {
  request,
  getRequest
} from '../../../utils/request'

export const requestShortCutMenuQuery = params => {
  return getRequest('GET', '/api/content/homepage/shortcutmenu', params)
}

export const requestShortCutMenuAdd = params => {
  return request('POST', '/api/content/homepage/shortcutmenu', params)
}

export const requestShortCutMenuUpdate = params => {
  return request('PUT', '/api/content/homepage/shortcutmenu', params)
}

export const requestShortCutMenuDelete = params => {
  return request('DELETE', '/api/content/homepage/shortcutmenu', params)
}
