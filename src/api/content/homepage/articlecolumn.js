import {
  request,
  getRequest
} from '../../../utils/request'

export const requestArticleColumnQuery = params => {
  return getRequest('GET', '/api/content/homepage/articlecolumn', params)
}

export const requestArticleColumnAdd = params => {
  return request('POST', '/api/content/homepage/articlecolumn', params)
}

export const requestArticleColumnUpdate = params => {
  return request('PUT', '/api/content/homepage/articlecolumn', params)
}

export const requestArticleColumnDelete = params => {
  return request('DELETE', '/api/content/homepage/articlecolumn', params)
}
