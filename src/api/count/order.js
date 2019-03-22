import {
  getRequest
} from "../../utils/request";

export const requestCountOrderQuery = params => {
  return getRequest('GET', '/api/count/order', params).then((data) => {
    return data
  })
}
