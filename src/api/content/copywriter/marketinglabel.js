import {
  request,
  getRequest
} from '../../../utils/request'

export const requestMarketingLabelQuery = params => {
  return getRequest('GET', '/api/content/copywriter/marketinglabel', params)
}

export const requestMarketingLabelAdd = params => {
  return request('POST', '/api/content/copywriter/marketinglabel', params)
}

export const requestMarketingLabelUpdate = params => {
  return request('PUT', '/api/content/copywriter/marketinglabel', params)
}

export const requestMarketingLabelDelete = params => {
  return request('DELETE', '/api/content/copywriter/marketinglabel', params)
}
