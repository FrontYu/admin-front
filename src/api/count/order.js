import {
  request
} from "../../utils/request";

export const requestCountOrderQuery = params => {
  return request('GET', '/api/count/order', params).then((data) => {
    return data
  })
}
