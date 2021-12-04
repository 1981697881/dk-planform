import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 产品信息-获取列表
export function getGoodsList(params, data) {
  const url = '/productInput/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('dkrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 产品信息-新增
export function addCommodity(params) {
  const url = '/productInput/insertProductMessage'
  return request({
    url: url,
    headers: {
      'authorization': getToken('dkrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 产品信息-生产录入
export function insertProductionMessage(params) {
  const url = '/productInput/insertProductionMessage'
  return request({
    url: url,
    headers: {
      'authorization': getToken('dkrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 产品信息-销售录入
export function insertSaleMessage(params) {
  const url = '/productInput/insertSaleMessage'
  return request({
    url: url,
    headers: {
      'authorization': getToken('dkrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 产品信息-刪除
export function deleteCommodity(params) {
  const url = '/productInput/deleteProductMessage'
  return request({
    url: url,
    headers: {
      'authorization': getToken('dkrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
