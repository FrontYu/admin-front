import {
  request,
  getRequest
} from '../../../utils/request'

export const requestBannerQuery = params => {
  return getRequest('GET', '/api/content/copywriter/banner', params)
}

export const requestBannerPlaceQuery = params => {
  return getRequest('GET', '/api/content/copywriter/bannerplace', params)
}

export const requestBannerAdd = params => {
  return request('POST', '/api/content/copywriter/banner', params)
}

export const requestBannerUpdate = params => {
  return request('PUT', '/api/content/copywriter/banner', params)
}
