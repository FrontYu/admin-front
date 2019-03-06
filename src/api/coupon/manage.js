import {
  request,
  getRequest
} from '../../utils/request'

export const requestCouponAdd = params => {
  return request('POST', '/api/coupon/manage', params)
}

export const requestCouponQuery = params => {
  return getRequest('GET', '/api/coupon/manage', params)
}

export const requestCouponUpdate = params => {
  return request('PUT', '/api/coupon/manage', params)
}

export const requestCouponDelete = params => {
  return request('DELETE', '/api/coupon/manage', params)
}