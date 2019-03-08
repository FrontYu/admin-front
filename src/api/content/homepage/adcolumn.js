import {
  getRequest
} from '../../../utils/request'

export const requestAdColumnQuery = params => {
  return getRequest('GET', '/api/content/homepage/adcolumn', params)
}
