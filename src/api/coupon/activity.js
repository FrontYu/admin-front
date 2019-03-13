import {
  request
} from '../../utils/request'

export const requestCouponActivityQuery = params => {
  return request('GET', '/api/coupon/activity', params)
}
