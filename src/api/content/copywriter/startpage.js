import {
  request,
  getRequest
} from '../../../utils/request'

export const requestStartPageQuery = params => {
  return getRequest('GET', '/api/content/copywriter/startpage', params)
}

export const requestStartPageAdd = params => {
  return request('POST', '/api/content/copywriter/startpage', params)
}

export const requestStartPageUpdate = params => {
  return request('PUT', '/api/content/copywriter/startpage', params)
}

export const requestStartPageDelete = params => {
  return request('DELETE', '/api/content/copywriter/startpage', params)
}
