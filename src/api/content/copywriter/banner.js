import {
  getRequest
} from '../../../utils/request'

export const requestBannerQuery = params => {
  return getRequest('GET', '/api/content/copywriter/banner', params)
}
