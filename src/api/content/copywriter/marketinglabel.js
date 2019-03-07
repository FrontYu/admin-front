import {
  getRequest
} from '../../../utils/request'

export const requestMarketingLabelQuery = params => {
  return getRequest('GET', '/api/content/copywriter/marketinglabel', params)
}
